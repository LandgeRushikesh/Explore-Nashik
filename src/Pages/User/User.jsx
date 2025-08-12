import React, { useContext } from 'react'
import { auth } from '../../Firebase-config'
import { AuthContext } from '../../Context/AuthContext'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'

function User() {

  const {setIsAuth} = useContext(AuthContext)

  const navigate = useNavigate()

  const HandleSignOut = async() =>{
    try{
      const res = await signOut(auth)
      setIsAuth(false)
      navigate("/")
    }
    catch(err){
      alert(err.message)
    }
  }

  return (
    <div className="mt-28 mx-10 min-h-[80vh] font-serif">
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>{auth.currentUser.displayName}</h2>
        <button onClick={HandleSignOut} className='text-2xl'><FontAwesomeIcon icon={faSignOut}/></button>
      </div>
    </div>
  )
}

export default User