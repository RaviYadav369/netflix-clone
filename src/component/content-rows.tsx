import React, { useState, useEffect, useRef } from "react";
import { ENDPOINT } from "../common/endpoint";
import { fetchRequest } from "../common/api";
import { MovieResults, MoviesResponse } from "../common/api";
import {IoIosArrowForward, IoIosArrowBack} from 'react-icons/io'

type RowProp = {
  endpoint: string;
  title: string;
};

export default function ContentRows({ title, endpoint }: RowProp) {
  const [translateX, settranslateX] = useState(0)
  const cardPerPage = useRef(0)
  const [rowData, setrowData] = useState<MovieResults[]>([]);

  const sliderRef = useRef<HTMLSelectElement>(null);
  async function fetchRowData() {
    const response = await fetchRequest<MoviesResponse<MovieResults[]>>(
      endpoint
    );
    setrowData(response.results);
  }
  function createImageUrl(path: string) {
    return `${import.meta.env.VITE_BASE_IMAGE_URI}/${path}`;
  }
  function onClickNext(){
    const currentTranslateX = translateX -25;
    if(sliderRef.current && currentTranslateX>=-75){
      sliderRef.current.style.transform =`translateX(${currentTranslateX}%)`
      settranslateX(currentTranslateX)

    }
  }
  function onClickPrev(){
    const currentTranslateX = translateX +25;
    if(sliderRef.current && currentTranslateX<=0){
      sliderRef.current.style.transform =`translateX(${currentTranslateX}%)`
      settranslateX(currentTranslateX)

    }
  }

  useEffect(() => {
    
  }, [rowData?.length])
  

  useEffect(() => {
    fetchRowData();
  }, []);

  return (
    <section className="row-container hover:cursor-pointer">
      <h2 className="mb-4">{title}</h2>
      
      <section  className="relative flex flex-nowrap gap-2 overflow-hidden ">
        <button onClick={onClickPrev} className="absolute opacity-0  h-full z-[1] bg-black/25"><IoIosArrowBack className="text-2xl" /></button>
        <button onClick={onClickNext} className="absolute opacity-0 right-1 z-[1] h-full bg-black/25"><IoIosArrowForward className="text-2xl" /></button>
        <section
          ref={sliderRef}
          className="flex gap-2 transition-transform delay-1000  ease-in-out"
        >
          {rowData?.map((row) => {
            const { id, title, backdrop_path } = row;
            // console.log(row);

            return (
              <section key={id} className="flex-none h-52 w-52 aspect-square overflow-hidden rounded-md">
                <img
                loading="lazy"
                  className="h-full w-full object-contain "
                  src={createImageUrl(backdrop_path)}
                  alt={title}
                />
              </section>
            );
          })}
        </section>
      </section>
    </section>
  );
}
