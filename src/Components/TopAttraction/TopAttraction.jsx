import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase-config";

function TopAttraction() {

  const [attractions,setAttractions] = useState([])

  const collectionRef = collection(db,"Top Attraction")

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

  const navigate = useNavigate();
  const SeeDetails = () => {
    navigate("/Details");
  };
  return (
    <div className="attraction-cards w-full flex justify-start items-center gap-4 overflow-x-auto px-6 font-serif">
      {attractions.map((attraction) => (
        <div
          key={attraction.id}
          className="w-[350px] shadow-lg shadow-gray-800 my-5 mx-2 py-4 px-3 flex flex-col shrink-0 justify-center items-center cursor-pointer  hover:shadow-xl hover:shadow-gray-600 hover:scale-[1.02] transition-all duration-300"
          onClick={SeeDetails}
        >
          <img src={attraction.imgURL} alt="place image" className="w-[100%] h-48 my-2 object-cover" />
          <h3 className="text-lg text-gray-800 font-bold">{attraction.Name}</h3>
          <p className="text-sm text-gray-600">{attraction.shortDesc}</p>
        </div>
      ))}
    </div>
  );
}

export default TopAttraction;
