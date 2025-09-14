import React, { useContext, useEffect } from "react";
import { DataContext } from "../../Context/DataContext";
import Card from "../Card/Card";

function CardView() {
  const { filterdPlaces } = useContext(DataContext);

  return (
    <div className="attraction-cards w-full grid grid-cols-4">
      {filterdPlaces.map((place) => (
        <Card attraction={place} collectionName={"All Places"} />
      ))}
    </div>
  );
}

export default CardView;
