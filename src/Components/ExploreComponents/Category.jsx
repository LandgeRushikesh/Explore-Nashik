import React, { useContext } from "react";
import { DataContext } from "../../Context/DataContext";

function Category() {
  const { category, setCategory } = useContext(DataContext);

  return (
    <div className="flex justify-around items-center font-serif font-semibold">
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
          onClick={()=>setCategory(cat)}
          className={`px-4 py-2 rounded-3xl shadow-lg shadow-gray-600 hover:scale-[1.02] hover:shadow-gray-600 ${
            category === cat
              ? "bg-blue-600 text-white shadow-lg scale-105" // Active style
              : "bg-white text-black hover:bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default Category;
