import React from "react";
import netflixLogo from "../assets/react.svg";
import { Link, NavLink } from "react-router-dom";

const Header = () => {

    function isActiveLink({isActive}:({isActive: boolean})){

        return isActive ? "font-semibold text-white":""
    }
    

  return (
    <header className="border-b-2 py-2">
      <nav className="grid grid-cols-[200px_auto_200px] items-center gap-4 ">
        <section className="h-12">
          <Link to="/browser">
            <img src={netflixLogo} alt="Netflix Logo" className="h-full w-full object-contain" />
          </Link>
        </section>
        <section>
          <ul className="flex gap-4 text-gray-300">
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

        <section>secondary nav</section>
      </nav>
    </header>
  );
};

export default Header;
