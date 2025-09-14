import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase-config";
import Card from "../Card/Card";

function TopAttraction() {
  const [attractions, setAttractions] = useState([]);

  const collectionRef = collection(db, "Top Attraction");

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await getDocs(collectionRef);
        setAttractions(res.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        alert(err.message);
      }
    };

    fetchPlaces();
  }, []);

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
