import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='fixed top-3 inset-x-0 bg-white mx-auto w-[90%] flex justify-between items-center px-5 py-4 font-bold rounded-lg'>
        <div className='logo w-1/2 text-3xl'>
            Nashik
        </div>
        <div className='w-1/3 text-lg font-semibold '>
            <ul className='w-full flex justify-around items-center'>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/Attraction">Attraction</NavLink></li>
                <li><NavLink to="/Events">Events</NavLink></li>
                <li className='bg-red-700 px-3 py-1 text-white rounded-lg'><NavLink to="/Login">Log In</NavLink></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar