import React from 'react'
import HeroSection from '../../Components/HeroSection/HeroSection'
import TopAttraction from '../../Components/TopAttraction/TopAttraction'
import TopEvents from '../../Components/TopEvents/TopEvents'

function Home() {
  return (
    <div>
        <HeroSection />
        <div className='mx-5 my-3 font-serif'>
            <h1 className='text-4xl mb-3'>Top Attractions</h1>
            <TopAttraction />
        </div>
        <div className='mx-5 my-3 font-serif'>
            <h1 className='text-4xl mb-3'>Top Events</h1>
            <TopEvents />
        </div>
    </div>
  )
}

export default Home