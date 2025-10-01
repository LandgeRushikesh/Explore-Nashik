import React, { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import Card from "../Card/Card";

function CardView() {
  const { filterdPlaces } = useContext(DataContext);

  return (
    <div className="attraction-cards w-full grid xl3:grid-cols-4 xl2:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center">
      {filterdPlaces.map((place) => (
        <Card key={place.id} attraction={place} collectionName={"All Places"} />
      ))}
    </div>
  );
}

export default CardView;
