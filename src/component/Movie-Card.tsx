import React, { useRef, useState, useEffect } from "react";
import YouTube from "react-youtube";
import { fetchRequest } from "../common/api";
import { ENDPOINT } from "../common/endpoint";
import { createImageUrl } from "../common/utils";
import YoutubeModal from "./Youtube-Modal";

type MovieCardProp = {
  poster_path: string;
  id: number;
  CARD_WIDTH: number;
  title: string;
};

export type MovieVideoResult<T> = {
  id: number;
  results: T;
  [K: string]: unknown;
};
export type MovieVideoInfo = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
  [K: string]: unknown;
};

export default function MovieCard({
  poster_path,
  CARD_WIDTH,
  id,
  title,
}: MovieCardProp) {
  const [isOpen, setisOpen] = useState(false);
  const [videoInfo, setvideoInfo] = useState<MovieVideoInfo | null>(null);
  const movieCardRef = useRef<HTMLSelectElement>(null);

  async function fetchMovieInfo() {
    const response = await fetchRequest<MovieVideoResult<MovieVideoInfo[]>>(
      ENDPOINT.MOVIES_VIDEO.replace("{movie_id}", id.toString())
    );
    // console.log(response);
    return response.results.filter(
      (result) => result.site.toLowerCase() === "youtube" && result.type.toLowerCase() === "trailer" && result.official === true
    );
  }

  async function onMouseEnter(event: any) {
    const [videoInfo] = await fetchMovieInfo();
    setvideoInfo(videoInfo);

    setisOpen(true);
  }
  useEffect(() => {
    movieCardRef.current?.addEventListener("mouseenter", onMouseEnter);
    () => movieCardRef.current?.removeEventListener("mouseenter", onMouseEnter);
  }, []);

  function onClose(value: boolean) {
    setisOpen(value);
  }

  return (
    <>
      <section
        ref={movieCardRef}
        key={id}
        className="flex-none h-[200px] w-[200px] aspect-square overflow-hidden rounded-md"
      >
        <img
          loading="lazy"
          className="h-full w-full object-contain "
          src={createImageUrl(poster_path, CARD_WIDTH)}
          alt={title}
        />
      </section>
      <YoutubeModal title={title} onClose={onClose} isOpen={isOpen}>
        <YouTube
          opts={{
            width: "450",
            playerVars: {
              autoplay: 1,
              playinline: 1,
              controls: 0,
            },
          }}
          videoId={videoInfo?.key}
        />
      </YoutubeModal>
    </>
  );
}
