import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase-config";
import Card from "../Card/Card";
import { DataContext } from "../../Context/DataContext";

function TopAttraction() {
  const [attractions, setAttractions] = useState([]);

  const { places } = useContext(DataContext);

  useEffect(() => {
    setAttractions(places.filter((place) => place.showToHome === true));
  }, [places]);

  return (
    <div className="attraction-cards w-full flex justify-start items-center gap-4 overflow-x-auto px-6 font-serif">
      {attractions.map((attraction) => (
        <Card
          key={attraction.id}
          attraction={attraction}
          collectionName={"Top Attraction"}
        />
      ))}
    </div>
  );
}

export default TopAttraction;
