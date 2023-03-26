import React, { useState, useEffect } from "react";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";
import { fetchRequest, MovieResults, MoviesResponse } from "../common/api";
import { ENDPOINT } from "../common/endpoint";
import { createImageUrl, fetchMovieInfo } from "../common/utils";
import { MovieVideoInfo } from "./Movie-Card";

export default function Banner() {
  const [randomMovie, setrandomMovie] = useState<MovieResults>();
  const [videoInfo, setvideoInfo] = useState<MovieVideoInfo>();
  const [hidePoster, sethidePoster] = useState(false);
  const options: YouTubeProps["opts"] = {
    width: document.body.clientWidth,
    height: "800",
    playerVars: {
      autoplay: 1,
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
    } else if (event.data === 1) {
    }
  }

  return randomMovie ? (
    <section className="relative aspect-video h-[600px] w-full">
      <img
        src={createImageUrl(randomMovie?.poster_path ?? "", 0, "original")}
        alt={randomMovie?.title}
        className={`${hidePoster ? "h-0 invisible" : "h-full w-full visible"}`}
      />

      {videoInfo ? (
        <YouTube
          videoId={videoInfo?.key}
          id="banner-video"
          opts={options}
          className={`-mt-[7rem] absolute opacity-70 ${
            hidePoster ? "h-full visible" : "h-0 invisible"
          }`}
          onStateChange={onStateChange}
        />
      ) : null}
    </section>
  ) : null;
}
