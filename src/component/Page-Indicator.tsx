import React from "react";

export default function PageIndicator({
  pageCount,
  currentPage,
  className
}: {
  pageCount: number;
  currentPage: number;
  className:string
}) {
  return (
    <ul className={` flex items-center justify-end gap-1 pr-4 ${className}`}>
      {Array(pageCount)
        .fill(0)
        .map((page, index) => (
          <li
            className={`h-[2px] w-3 ${
              currentPage === index ? "bg-gray-100" : " bg-gray-600 "
            }`}
            key={index}
          ></li>
        ))}
    </ul>
  );
}
