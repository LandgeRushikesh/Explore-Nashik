import React from 'react'

function Category() {
  return (
    <div className='flex justify-around items-center font-serif font-semibold'>
      {["All","Modern Attractions","Cultural / Artistic","Adventure / Trekking","Natural","Religious"].map((category)=>(
        <button className='px-4 py-2 rounded-3xl shadow-lg shadow-gray-600 hover:scale-[1.02] hover:shadow-gray-600'>{category}</button>
      ))}  
    </div>
  )
}

export default Category