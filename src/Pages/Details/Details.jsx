import React from "react";
import { useLocation } from "react-router-dom";

function Details() {
  const location = useLocation();

  const { attraction } = location.state || {};

  if (!attraction) {
    return <p>Details not found...</p>;
  }

  return (
    <div className="my-28 mx-auto w-[90vw] h-full font-serif">
      <div className="heading w-full text-center my-4">
        <h2 className="font-bold text-4xl ">{attraction.Name}</h2>
      </div>
      <div className="img w-full h-[80%] bg-[url('./details-bg-img.png')] bg-no-repeat bg-center bg-cover flex justify-center items-center relative">
        <img
          className="z-10 w-full h-full lg:w-[40%] lg:h-[70%]"
          src={attraction.imgURL}
          alt="..."
        />
        <div className="overlay absolute w-full h-full inset-0 bg-slate-700 bg-opacity-80"></div>
      </div>
      <div className="short-desc w-full text-center my-4">
        <p className="text-3xl">{attraction.shortDesc}</p>
      </div>
      <div className="long-desc">{attraction.LongDesc}</div>
    </div>
  );
}

export default Details;
