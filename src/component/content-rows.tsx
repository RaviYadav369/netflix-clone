import React, { useState, useEffect, useRef } from "react";
import { ENDPOINT } from "../common/endpoint";
import { fetchRequest } from "../common/api";
import { MovieResults, MoviesResponse } from "../common/api";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import PageIndicator from "./Page-Indicator";
import MovieCard from "./Movie-Card";

type RowProp = {
  endpoint: string;
  title: string;
};
const CARD_WIDTH = 200;



export default function ContentRows({ title, endpoint }: RowProp) {
  const [translateX, settranslateX] = useState(0);
  const cardPerPage = useRef(0);
  const [rowData, setrowData] = useState<MovieResults[]>([]);
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setcurrentPage] = useState(0);
  const sliderRef = useRef<HTMLSelectElement>(null);
  const containerRef = useRef<HTMLSelectElement>(null);
  const disablePrev = currentPage ===0;
  const disableNext = currentPage +1 ===pageCount;



  async function fetchRowData() {
    const response = await fetchRequest<MoviesResponse<MovieResults[]>>(
      endpoint
    );
    setrowData(response.results);
  }
 
  function onClickNext() {
    const currentTranslateX = translateX - getTranslateXValue();
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${currentTranslateX}%)`;
      settranslateX(currentTranslateX);
      setcurrentPage(currentPage + 1);
    }
  }
  function onClickPrev() {
    const currentTranslateX = translateX + getTranslateXValue();
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${currentTranslateX}%)`;
      settranslateX(currentTranslateX);
      setcurrentPage(currentPage - 1);
    }
  }

  function getTranslateXValue() {
    let translateX = 0;
    if (sliderRef.current) {
      translateX =
        ((cardPerPage.current * 200) / sliderRef.current.clientWidth) * 100;
    }
    return translateX;
  }

  useEffect(() => {
    if (rowData?.length) {
      if (containerRef.current) {
        cardPerPage.current = Math.floor(
          containerRef.current.clientWidth / CARD_WIDTH
        );
        setpageCount(Math.ceil(rowData.length / cardPerPage.current));
      }
    }
  }, [rowData?.length]);

  useEffect(() => {
    fetchRowData();
  }, []);

  return (
    <section className="row-container ml-12 hover:cursor-pointer">
      <h2 className="mb-4">{title}</h2>
      <PageIndicator pageCount={pageCount} currentPage={currentPage} className="mb-4 transition-opacity duration-300 ease-in opacity-0" />
      <section
        ref={containerRef}
        className="relative flex flex-nowrap gap-1 overflow-hidden "
      >
       {!disablePrev ? <button
          onClick={onClickPrev}
          className="absolute opacity-0 w-12 h-full z-[1] bg-black/25"
        >
          <IoIosArrowBack className="text-2xl" />
        </button> : null}
        { !disableNext ? <button
          onClick={onClickNext}
          className="absolute opacity-0 w-12 right-1 z-[1] h-full bg-black/25"
        >
          <IoIosArrowForward className="text-2xl" />
        </button> : null}
        <section
          ref={sliderRef}
          className="flex gap-2 transition-transform delay-700 duration-700  ease-in"
        >
          {rowData?.map((row,index) => {
            
            // console.log(row);

            return <MovieCard key={`${row.id}-${index}`} {...row} CARD_WIDTH={CARD_WIDTH} />
            
          })}
        </section>
      </section>
    </section>
  );
}
