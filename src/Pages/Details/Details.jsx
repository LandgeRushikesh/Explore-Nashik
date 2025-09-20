import React from "react";
import { useLocation } from "react-router-dom";

function Details() {
  const location = useLocation();

  const { attraction } = location.state || {};

  if (!attraction) {
    return <p>Details not found...</p>;
  }

  return (
    <div className="my-28 mx-auto w-[90vw]  min-h-[80vh] font-serif">
      <div className="w-full bg-[url('/hero-sec.png')] flex justify-center items-center relative">
        <div className="overlay bg-slate-500 w-full h-full absolute top-0 left-0 z-10"></div>
        <img className="z-20" src={attraction.imgURL} alt="..." />
      </div>
    </div>
  );
}

export default Details;
