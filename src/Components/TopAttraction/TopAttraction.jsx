import React from 'react'

function TopAttraction() {
  return (
    <div>
        <div className='w-[300px] shadow-lg shadow-black py-4 px-3 flex flex-col justify-center items-center'>
            <img src="/hero-sec.png" alt="place image" className='w-[90%]'/>
            <h3>Place Name</h3>
            <p>Place short description</p>
        </div>
    </div>
  )
}

export default TopAttraction