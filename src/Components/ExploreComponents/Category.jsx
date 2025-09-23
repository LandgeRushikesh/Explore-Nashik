import React, { useContext, useEffect } from "react";
import { DataContext } from "../../Context/DataContext";

function Category() {
  const { places, category, setCategory, setFilteredPlaces } =
    useContext(DataContext);

  useEffect(() => {
    if (category === "All") {
      setFilteredPlaces(places);
    } else {
      setFilteredPlaces(places.filter((place) => place.category === category));
    }
  }, [category, places, setFilteredPlaces]);

  return (
    <>
      {/*Desktop View*/}
      <div className="hidden lg:flex justify-around items-center font-serif font-semibold ">
        {[
          "All",
          "Historical",
          "Modern Attractions",
          "Cultural / Artistic",
          "Adventure / Trekking",
          "Natural",
          "Religious",
        ].map((cat, index) => (
          <button
            key={index}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-3xl shadow-lg shadow-gray-600 ${
              category === cat
                ? "bg-blue-600 text-white shadow-lg scale-105" // Active style
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {/*Mobile view */}
      <div className="flex lg:hidden">
        <select
          name="category"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-lg shadow-md bg-white"
        >
          {[
            "All",
            "Historical",
            "Modern Attractions",
            "Cultural / Artistic",
            "Adventure / Trekking",
            "Natural",
            "Religious",
          ].map((cat, index) => (
            <option key={index} name="category" value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
export default Category;
