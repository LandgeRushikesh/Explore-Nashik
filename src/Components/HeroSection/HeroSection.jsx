import React from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  const StartExploring = () => {
    navigate("/Attraction");
  };

  return (
    <div className='h-[90vh] bg-[url("/hero-sec.png")] bg-cover bg-no-repeat bg-center text-white flex justify-center items-end font-serif'>
      <div className="w-fit text-center mb-24">
        <h1 className="font-bold text-4xl mb-4 md:text-5xl">Explore Nashik</h1>
        <h3 className="font-bold text-2xl mb-3 md:text-3xl">
          Where Heritage Meets flavours
        </h3>
        <button
          className="bg-red-700 border-2 border-red-700 rounded-lg py-1 px-2 text-lg font-bold md:py-2 md:px-4 md:text-xl"
          onClick={StartExploring}
        >
          Start Exploring
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
