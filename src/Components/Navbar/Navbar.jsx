import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const { isAuth} = useContext(AuthContext);
  return (
    <div className="z-10 fixed top-3 inset-x-0 bg-white mx-auto w-[90%] flex justify-between items-center px-5 py-4 font-bold rounded-lg shadow-lg shadow-gray-600 font-serif">
      <div className="logo w-1/2 text-3xl">
        <NavLink to="/">Nashik</NavLink>
      </div>
      <div className="w-1/3 text-lg font-semibold ">
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
            <li className="border-2 border-black rounded-full px-2 py-1"><NavLink to="/UserPage"><FontAwesomeIcon icon={faUser}/></NavLink></li>
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
