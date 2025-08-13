import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataContext";

function Events() {

  const {AllEvents} = useContext(DataContext)

  return (
    <div className="event-cards w-full mt-28 min-h-[80vh] grid grid-cols-4 px-4">
      {AllEvents.map((event) => (
        <div key={event.id} className="w-[350px] shadow-lg shadow-gray-800 my-5 mx-2 py-4 px-3 flex shrink-0 flex-col justify-center items-center hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-600 transition-all duration-300">
          <img
            src={event.imgURL}
            alt="place image"
            className="w-full h-48 object-cover"
          />
          <h3 className="text-lg text-gray-800 font-bold">{event.Name}</h3>
          <p className="text-sm text-gray-600">{event.shortDesc}</p>
        </div>
      ))}
    </div>
  );
}

export default Events;
