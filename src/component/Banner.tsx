import React, { useState, useEffect } from "react";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";
import { fetchRequest, MovieResults, MoviesResponse } from "../common/api";
import { ENDPOINT } from "../common/endpoint";
import { createImageUrl, fetchMovieInfo } from "../common/utils";
import { MovieVideoInfo } from "./Movie-Card";

import { BiPlay } from "react-icons/bi";
import { IoInformationCircleOutline } from "react-icons/io5";

export default function Banner() {
  const [randomMovie, setrandomMovie] = useState<MovieResults>();
  const [videoInfo, setvideoInfo] = useState<MovieVideoInfo>();
  const [hidePoster, sethidePoster] = useState(false);
  const [showBackdrop, setshowBackdrop] = useState(false)
  const options: YouTubeProps["opts"] = {
    width: document.body.clientWidth,
    height: "800",
    playerVars: {
      autoplay: 0,  
      playinline: 1,
      controls: 0,
    },
  };

  function getRandomImage(last: number) {
    return Math.floor(Math.random() * (last - 1));
  }

  async function fetchPopularMovies() {
    const response = await fetchRequest<MoviesResponse<MovieResults[]>>(
      ENDPOINT.MOVIES_POPULAR
    );
    const filteredMovie = response.results.filter(
      (movie) => movie.backdrop_path
    );
    const randomSelection = filteredMovie[getRandomImage(filteredMovie.length)];
    const videoInfo = await fetchMovieInfo(randomSelection.id.toString());
    setrandomMovie(randomSelection);
    // console.log(randomMovie);

    setvideoInfo(videoInfo[0]);
    setTimeout(() => {
      sethidePoster(true);
    }, 1000);
  }

  useEffect(() => {
    fetchPopularMovies();
  }, []);
  function onStateChange(event: YouTubeEvent<number>) {
    //video has finished
    if (event.data === 0) {
        sethidePoster(false)
        setshowBackdrop(true)
    } else if (event.data === 1) {
        setshowBackdrop(false);
        sethidePoster(true)

    }
  }

  return randomMovie ? (
    <section className="relative aspect-video h-[600px] w-full">
      <img
        src={createImageUrl(randomMovie?.poster_path ?? "", 0, "original")}
        alt={randomMovie?.title}
        className={`object-fit ${hidePoster ? "h-0 invisible" : "h-full w-full visible"}`}
      />

      {videoInfo ? (
        <YouTube
          videoId={videoInfo?.key}
          id="banner-video"
          opts={options}
          className={`-mt-[7rem] absolute opacity-75 z-[1] ${
            hidePoster ? "h-full visible" : "h-0 invisible"
          }`}
          onStateChange={onStateChange}
        />
      ) : null}
      {showBackdrop? <section className=" absolute top-0 left-0 h-full w-full bg-black/60"></section> :null}
      <section className="z-[1] flex gap-2 flex-col absolute bottom-0 ml-14 max-w-sm">
        <h2 className="text-6xl">{randomMovie.original_title}</h2>
        <p className="text-sm line-clamp-3">{randomMovie.overview}</p>
        <section className="flex gap-2 mt-4">
            <button className="w-[150px] flex items-center hover:bg-red-700 bg-red-600 text-white p-2 rounded-lg"><BiPlay className="text-3xl" />Play Now</button>
            <button className="w-[150px] flex items-center hover:bg-gray-100 bg-white text-black p-2 rounded-lg"><IoInformationCircleOutline className="text-3xl" />More Info</button>
        </section>
      </section>
    </section>
  ) : null;
}
