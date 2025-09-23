import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth } = useContext(AuthContext);
  return (
    <div className="z-30 fixed top-3 inset-x-0 bg-white mx-auto w-[90%] h-16 flex justify-between items-center px-5 py-4 font-bold rounded-lg shadow-lg shadow-gray-600 font-serif">
      <div className="logo w-1/2 text-3xl">
        <NavLink to="/">Nashik</NavLink>
      </div>
      {/* Deskstop menu */}
      <div className="w-1/3 text-lg font-semibold hidden lg:flex">
        <ul className="w-full flex justify-around items-center">
          <li className="nav-content inline-block relative">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-content inline-block relative">
            <NavLink to="/Attraction">Attractions</NavLink>
          </li>
          <li className="nav-content inline-block relative">
            <NavLink to="/Events">Events</NavLink>
          </li>
          {isAuth ? (
            <li className="border-2 border-black rounded-full px-2 py-1">
              <NavLink to="/UserPage">
                <FontAwesomeIcon icon={faUser} />
              </NavLink>
            </li>
          ) : (
            <li className="bg-red-700 px-3 py-1 text-white rounded-lg">
              <NavLink to="/Login">Log In</NavLink>
            </li>
          )}
        </ul>
      </div>
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <FontAwesomeIcon
          icon={isOpen ? faTimes : faBars}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Mobile menu  */}
      <div
        className={`lg:hidden w-full text-lg font-semibold min-md:hidden absolute top-16 left-0 bg-white bg-opacity-45 transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-80  opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="w-full flex flex-col gap-6 py-10 justify-around items-center">
          <li
            onClick={() => setIsOpen(false)}
            className="nav-content inline-block relative"
          >
            <NavLink to="/">Home</NavLink>
          </li>
          <li
            onClick={() => setIsOpen(false)}
            className="nav-content inline-block relative"
          >
            <NavLink to="/Attraction">Attractions</NavLink>
          </li>
          <li
            onClick={() => setIsOpen(false)}
            className="nav-content inline-block relative"
          >
            <NavLink to="/Events">Events</NavLink>
          </li>
          {isAuth ? (
            <li
              onClick={() => setIsOpen(false)}
              className="border-2 border-black rounded-full px-2 py-1"
            >
              <NavLink to="/UserPage">
                <FontAwesomeIcon icon={faUser} />
              </NavLink>
            </li>
          ) : (
            <li className="bg-red-700 px-3 py-1 text-white rounded-lg">
              <NavLink to="/Login">Log In</NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
