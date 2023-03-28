import React,{useState,useEffect} from "react";
import netflixLogo from "../assets/react.svg";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { IoNotifications } from "react-icons/io5";
import Profile from "./Profile";

const Header = () => {
const [fixed, setfixed] = useState(false)
    function isActiveLink({isActive}:({isActive: boolean})){

        return isActive ? "font-semibold text-white":undefined
    }
    function onWindowScroll(){
      if(window.scrollY>8){
        setfixed(true)
      }
      else{
        setfixed(false)
      }
    }
    useEffect(() => {
     window.addEventListener("scroll", onWindowScroll);
     (()=> window.addEventListener("scroll", onWindowScroll))
    }, [])
    
    

  return (
    <header className={` py-1 w-full z-10 ${fixed ? "fixed top-0 bg-black": "relative bg-transparent"} transition-colors duration-500 ease-linear `}>
      <nav className="grid grid-cols-[200px_auto_400px] items-center gap-4 ">
        <section className="h-12">
          <Link to="/browser">
            <img src={netflixLogo} alt="Netflix Logo" className="h-full w-full object-contain" />
          </Link>
        </section>
        <section className="h-12">
          <ul className="flex font-semibold gap-4 py-2 text-gray-300">
            <li>
              <NavLink className={isActiveLink} to="/browse">Home</NavLink>
            </li>
            <li>
              <NavLink className={isActiveLink} to="/browse/genere">Tv Shows</NavLink>
            </li>
            <li>
              <NavLink className={isActiveLink} to="/browse/genere">Movies</NavLink>
            </li>
            <li>
              <NavLink className={isActiveLink} to="/latest">New & Popular</NavLink>
            </li>
          </ul>
        </section>

        <section className="h-12 flex items-center gap-2">
          <SearchBar />
          <IoNotifications className="text-2xl" />
         
          <Profile />
        </section>
      </nav>
    </header>
  );
};

export default Header;
