import React from 'react'

function Category() {
  return (
    <div className='flex justify-around items-center font-serif font-semibold'>
        <button className='px-4 py-2 rounded-3xl shadow-lg shadow-gray-600'>All</button>
        <button className='px-4 py-2 rounded-3xl shadow-lg shadow-gray-600'>Religious</button>
        <button className='px-4 py-2 rounded-3xl shadow-lg shadow-gray-600'>Natural</button>
        <button className='px-4 py-2 rounded-3xl shadow-lg shadow-gray-600'>Adventure / Trekking</button>
        <button className='px-4 py-2 rounded-3xl shadow-lg shadow-gray-600'>Cultural / Artistic</button>
        <button className='px-4 py-2 rounded-3xl shadow-lg shadow-gray-600'>Modern Attractions</button>
    </div>
  )
}

export default Category