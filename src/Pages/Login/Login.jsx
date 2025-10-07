import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faGoogle,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Firebase-config";
import { AuthContext } from "../../Context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setIsAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      setEmail("");
      setPassword("");
      setIsAuth(true);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const LoginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      console.log(res);
      setIsAuth(true);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-[70vh] mt-24 mb-5 w-full flex justify-center items-center">
      <form
        className="w-[90%] md:w-[70%] lg:w-1/3 flex flex-col justify-center items-center shadow-lg shadow-gray-700 py-10 px-8"
        onSubmit={(e) => Login(e)}
      >
        <h2 className="text-3xl font-bold mb-4">Log In</h2>
        <input
          className="w-full px-4 py-2 mb-3 bg-slate-100 "
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
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
          Log In
        </button>
        <div className="w-full h-[2px] bg-gray-600 my-4"></div>
        <h3 className="text-lg"> Or Login with</h3>
        <div className="w-full flex justify-center items-center text-3xl">
          <button className="mr-4" onClick={LoginWithGoogle}>
            <FontAwesomeIcon icon={faGoogle} />
          </button>
          <button className="mr-4">
            <FontAwesomeIcon icon={faFacebook} />
          </button>
          <button className="mr-4">
            <FontAwesomeIcon icon={faLinkedin} />
          </button>
          <button className="mr-4">
            <FontAwesomeIcon icon={faGithub} />
          </button>
        </div>
        <p className="mt-4 hover:text-blue-500 underline">
          <Link to="/Signup">Don't have Account?Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
