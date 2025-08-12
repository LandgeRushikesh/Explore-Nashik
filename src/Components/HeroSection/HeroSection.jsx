import React from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate()

  const StartExploring = () => {
    navigate("/Attraction")
  };

  return (
    <div className='h-[90vh] bg-[url("/hero-sec.png")] bg-cover bg-no-repeat bg-center text-white flex justify-center items-end font-serif'>
      <div className="w-fit text-center mb-24">
        <h1 className="font-bold text-5xl mb-4">Explore Nashik</h1>
        <h3 className="font-bold text-3xl mb-3">
          Where Heritage Meets flavours
        </h3>
        <button
          className="bg-red-700 border-2 border-red-700 rounded-lg py-2 px-4 text-xl font-bold"
          onClick={StartExploring}
        >
          Start Exploring
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
