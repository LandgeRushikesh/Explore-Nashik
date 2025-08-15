import React from "react";

function Card({attraction}) {
  return (
    <div
      key={attraction.id}
      className="w-[350px] shadow-lg shadow-gray-800 my-5 mx-2 py-4 px-3 flex flex-col shrink-0 justify-center items-center cursor-pointer  hover:shadow-xl hover:shadow-gray-600 hover:scale-[1.02] transition-all duration-300"
    >
      <img
        src={attraction.imgURL}
        alt="place image"
        className="w-[100%] h-48 my-2 object-cover"
      />
      <h3 className="text-lg text-gray-800 font-bold">{attraction.Name}</h3>
      <p className="text-sm text-gray-600">{attraction.shortDesc}</p>
    </div>
  );
}

export default Card;
