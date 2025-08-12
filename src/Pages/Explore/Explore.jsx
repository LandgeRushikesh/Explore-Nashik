import React, { useState } from "react";
import CardView from "../../Components/ExploreComponents/CardView";
import MapView from "../../Components/ExploreComponents/MapView";
import Category from "../../Components/ExploreComponents/Category";

function Explore() {
  const [view, setView] = useState("map");
  return (
    <div className="mt-28 mx-10 min-h-[80vh]">
      <div className="w-full flex justify-center items-center font-serif">
        <div className="w-fit shadow-lg shadow-gray-700 rounded-md font-bold ">
          <button
            className={`px-6 py-2 border-gray-400 rounded-s-md ${view === "card" ? "bg-gray-300" : "bg-white"}`}
            onClick={() => setView("card")}
          >
            Card View
          </button>
          <button className={`px-6 py-2 rounded-e-md ${view === "map" ? "bg-gray-300" : "bg-white"}`} onClick={() => setView("map")}>
            Map View
          </button>
        </div>
      </div>
        {/* Category section */}
        <div className="my-6">
          <Category />
        </div>
      {/* To resolve mounting and unmounting problem in map i am rapping this div with loadscript which will only load a script on first render */}
     <div className="my-8">{view === "card" ? <CardView /> : <MapView />}</div>
    </div>
  );
}

export default Explore;
