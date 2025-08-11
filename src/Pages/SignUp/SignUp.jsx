import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faGoogle,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function SignUp() {
  return (
     <div className="min-h-[70vh] mt-24 mb-5 w-full flex justify-center items-center">
      <form className="w-1/3 flex flex-col justify-center items-center shadow-lg shadow-gray-700 py-10 px-8">
        <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
        <input
          className="w-full px-4 py-2 mb-3 bg-slate-100 "
          type="email"
          placeholder="Enter your email..."
        />
        <input
          className="w-full px-4 py-2 mb-3 bg-slate-100 "
          type="password"
          placeholder="Enter your password..."
        />
        <button
          className="w-full bg-red-700 rounded-lg px-5 py-2 text-white font-bold"
          type="submit"
        >
          Sign Up
        </button>
        <p className="mt-4 hover:text-blue-500 underline"><Link to="/Login">Already have an Account?Log in</Link></p>
      </form>
    </div>
  )
}

export default SignUp