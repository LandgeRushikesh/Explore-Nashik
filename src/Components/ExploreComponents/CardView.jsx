import React, { useContext } from "react";
import { DataContext } from "../../Context/DataContext";

function CardView() {
  const {places} = useContext(DataContext)

  return (
    <div className="attraction-cards w-full grid grid-cols-4">
      {places.map((place) => (
        <div
          key={place.id}
          className="w-[350px] shadow-lg shadow-gray-800 my-5 mx-2 py-4 px-3 flex flex-col shrink-0 justify-center items-center cursor-pointer  hover:shadow-xl hover:shadow-gray-600 hover:scale-[1.02] transition-all duration-300"
        >
          <img src={place.imgURL} alt="place image" className="w-[100%] h-48 my-2 object-cover" />
          <h3 className="text-lg text-gray-800 font-bold">{place.Name}</h3>
          <p className="text-sm text-gray-600">{place.shortDesc}</p>
        </div>
      ))}
    </div>
  );
}

export default CardView;
