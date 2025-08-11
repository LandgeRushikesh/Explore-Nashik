import React from 'react'

function HeroSection() {
  return (
    <div className='bg-[url("/hero-sec.png")] bg-cover bg-center h-[90%] text-white flex flex-col justify-center items-center'>
        <h1 className='font-bold text-5xl mb-2'>Explore Nashik</h1>
        <h3 className='font-bold text-3xl mb-2'>Where Heritage Meets flavours</h3>
        <button className='bg-red-700 border-2 border-red-700 rounded-lg py-2 px-4 text-xl'>Start Exploring</button>
    </div>
  )
}

export default HeroSection