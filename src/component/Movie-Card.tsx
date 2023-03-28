import React, { useRef, useState, useEffect } from "react";
import YouTube from "react-youtube";
import { fetchRequest } from "../common/api";
import { ENDPOINT } from "../common/endpoint";
import { createImageUrl, fetchMovieInfo } from "../common/utils";
import YoutubeModal from "./Youtube-Modal";
import { Position } from "../common/commom-type";

import { BsPlayCircleFill } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { IoChevronDownSharp } from "react-icons/io5";

type MovieCardProp = {
  poster_path: string;
  id: number;
  CARD_WIDTH: number;
  title: string;
  movId:string;
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
  movId,
}: MovieCardProp) {
  const [isOpen, setisOpen] = useState(false);
  const [videoInfo, setvideoInfo] = useState<MovieVideoInfo | null>(null);
  const movieCardRef = useRef<HTMLSelectElement>(null);

  const [position, setposition] = useState<Position | null>(null);
  const [heightPoster, setheightPoster] = useState(false);

 

  async function onMouseEnter(event: any) {
    const [videoInfo] = await fetchMovieInfo(id.toString())
    let calculatedPosition = movieCardRef.current?.getBoundingClientRect();
    let top = (calculatedPosition?.top ?? 0) - 100;
    let left = (calculatedPosition?.left ?? 0) - 100;
    if (left < 0) {
      left = calculatedPosition?.left as number;
    }
    let totalWidth = left + 470;
    if (totalWidth > document.body.clientWidth) {
      left = left - (totalWidth - document.body.clientWidth);
    }
    setposition({ top, left });
    setvideoInfo(videoInfo);

    setisOpen(true);
  }
  useEffect(() => {
    movieCardRef.current?.addEventListener("mouseenter", onMouseEnter);
    () => movieCardRef.current?.removeEventListener("mouseenter", onMouseEnter);
  }, []);

  useEffect(() => {
    if (videoInfo?.key) {
      setTimeout(() => {
        setheightPoster(true);
      }, 800);
    }
    if (!isOpen) {
      setheightPoster(false);
    }
  }, [videoInfo,isOpen]);

  function onClose(value: boolean) {
    setisOpen(value);
  }
  function closeModal() {
    setisOpen(false);
  }

  return (
    <>
      <section
        ref={movieCardRef}
        key={movId}
        className="flex-none h-[200px] w-[200px] aspect-square overflow-hidden rounded-md"
      >
        <img
          loading="lazy"
          className="h-full w-full object-contain "
          src={createImageUrl(poster_path, CARD_WIDTH,"width")}
          alt={title}
          
        />
      </section>
      <YoutubeModal
        closeModal={closeModal}
        key={id}
        title={title}
        onClose={onClose}
        isOpen={isOpen}
        position={position}
      >
        <section className="aspect-square transition-[height] duration-700 ease-in">
          <img
            src={createImageUrl(poster_path, 400,"width")}
            alt={title}
    
            className={`${
              heightPoster ? "invisible h-0" : "visible h-full"
            } w-[400px]`}
          />
          <YouTube
            opts={{
              width: "400",
              height: "400",
              playerVars: {
                autoplay: 0,
                playinline: 1,
                controls: 0,
              },
            }}
            
            videoId={videoInfo?.key}
            className={`${
              !heightPoster ? "invisible h-0" : "visible h-[600px]"
            } w-[400px] `}
          />
          <section className="flex items-center justify-between p-4  text-white">
            <ul className="flex items-center justify-evenly gap-2">
              <li className="h-11 w-11">
                <button className="h-full w-full p-1">
                  <BsPlayCircleFill className="text-4xl" />
                </button>
              </li>
              <li className="h-9 w-9 rounded-full border-2 border-gray-400 hover:border-white p-1">
                <button className="h-full w-full p-[1px]">
                  <AiOutlinePlus className="text-2xl" />
                </button>
              </li>
              <li className="h-10 w-10 rounded-full border-2 border-gray-400 hover:border-white p-1">
                <button className="h-full w-full ">
                  <BiLike className="text-3xl" />
                </button>
              </li>
            </ul>
            <IoChevronDownSharp className="text-2xl" />
          </section>
        </section>
      </YoutubeModal>
    </>
  );
}
