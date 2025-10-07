import React, { useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import { DataContext } from "../../Context/DataContext";

function TopAttraction() {
  const [attractions, setAttractions] = useState([]);

  const { places } = useContext(DataContext);

  useEffect(() => {
    setAttractions(places.filter((place) => place.showToHome === true));
  }, [places]);

  return (
    <div className="attraction-cards w-full flex justify-start items-center gap-4 overflow-x-auto font-serif">
      {attractions.map((attraction) => (
        <Card
          key={attraction.id}
          attraction={attraction}
          collectionName={"All Places"}
        />
      ))}
    </div>
  );
}

export default TopAttraction;
