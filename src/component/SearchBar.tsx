import React, { useState, useRef,useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";

export default function SearchBar() {
  const [open, setopen] = useState(false);
  // const storeWidth = { storeWidth: ".2rem" };
  const inputref = useRef<HTMLInputElement>(null);
  function onOuterClick(event:globalThis.MouseEvent){
    if((event.target as HTMLInputElement).id !== "searchBar"){

      setopen(false);
    }
  }
  function toggelSearch(event:any) {
    event.stopPropagation()
    if (!open) {
      inputref.current?.focus();
    }
    setopen(!open);
  }
  

  useEffect(() => {
    if(open){

      window.addEventListener("click",onOuterClick);
    }
   (()=>window.removeEventListener("click",onOuterClick))
  }, [open])
  

  return (
    <section className="flex items-center justify-end w-[300px] overflow-hidden">
      <button className={`${!open ? "w-4" :"w-0" } h-8`}  onClick={toggelSearch}>
        <BiSearchAlt  />
      </button>
      <section
        className={`${
          open ? " w-full  border duration-700 ease-in-out border-white" : "w-0"
        } flex gap-2 bg-black items-center`}
      >
        <button>
          <BiSearchAlt className={`${open ? "w-4": "w-0"}`} />
        </button>
        <input
          ref={inputref}
          type="text"
          name="searchBar"
          id="searchBar"
          className="w-full bg-black outline-none"
        />
      </section>
    </section>
  );
}
