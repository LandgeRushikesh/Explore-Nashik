import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from "../../Firebase-config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {setIsAuth} = useContext(AuthContext)

  const navigate = useNavigate()
 
  const Registration = async(e) => {
    e.preventDefault();
    try{
      const user = await createUserWithEmailAndPassword(auth,email,password)
      console.log(user);
      setEmail("")
      setPassword("")
      navigate("/")
      setIsAuth(true)
    }
    catch(err){
      alert(err.message)
    }
  };
  return (
    <div className="min-h-[70vh] mt-24 mb-5 w-full flex justify-center items-center">
      <form
        className="w-1/3 flex flex-col justify-center items-center shadow-lg shadow-gray-700 py-10 px-8"
        onSubmit={(e) => Registration(e)}
      >
        <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
        <input
          required
          className="w-full px-4 py-2 mb-3 bg-slate-100 "
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          className="w-full px-4 py-2 mb-3 bg-slate-100 "
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-red-700 rounded-lg px-5 py-2 text-white font-bold"
          type="submit"
        >
          Sign Up
        </button>
        <p className="mt-4 hover:text-blue-500 underline">
          <Link to="/Login">Already have an Account?Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
