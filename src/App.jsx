import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Explore from "./Pages/Explore/Explore";
import Events from "./Pages/Events/Events";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import { AuthContext } from "./Context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase-config";

function App() {
  const [isAuth,setIsAuth] = useState(false)

  onAuthStateChanged(auth,(currUser)=>{
    setIsAuth(!!currUser)
  })
  return (
    <>
      <div className="min-h-screen">
        <AuthContext.Provider value={{isAuth,setIsAuth}}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="Attraction" element={<Explore />} />
                <Route path="Events" element={<Events />} />
                <Route path="Login" element={<Login />} />
                <Route path="Signup" element={<SignUp />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </div>
    </>
  );
}

export default App;
