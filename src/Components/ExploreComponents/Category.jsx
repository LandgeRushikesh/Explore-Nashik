import React, { useContext } from 'react'
import { DataContext } from '../../Context/DataContext'

function Category() {

  const {setCategory} = useContext(DataContext)

  const HandleClick = (e) =>{
    setCategory(e.target.value)
  }

  return (
    <div className='flex justify-around items-center font-serif font-semibold'>
      {["All","Historical","Modern Attractions","Cultural / Artistic","Adventure / Trekking","Natural","Religious"].map((category,index)=>(
        <button key={index} value={category} onClick={(e)=>HandleClick(e)} className='px-4 py-2 rounded-3xl shadow-lg shadow-gray-600 hover:scale-[1.02] hover:shadow-gray-600'>{category}</button>
      ))}  
    </div>
  )
}

export default Category