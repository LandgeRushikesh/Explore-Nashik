import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Explore from "./Pages/Explore/Explore";
import Events from "./Pages/Events/Events";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import { AuthContext } from "./Context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Firebase-config";
import User from "./Pages/User/User";
import { LoadScript } from "@react-google-maps/api";
import Details from "./Pages/Details/Details";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { DataContext } from "./Context/DataContext";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [places, setPlaces] = useState([]);

  const[AllEvents,setAllEvents] = useState([])

  const collectionRef = collection(db, "All Events");

  


    // const addPlaces = async()=>{
    //   for(const  of nashikEvents){
    //     try{
    //       const res = await addDoc(collectionRef,{Name:place.title,imgURL:place.imageUrl,category:place.category,shortDesc:place.shortDescription,LongDesc:place.longDescription})
    //     }
    //     catch(err){
    //       alert(err.message)
    //     }
    //   }
    // }

    // useEffect(()=>{
    //   addPlaces()
    // },[])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getDocs(collectionRef);
        setAllEvents(res.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        alert(err.message);
      }
    };

    fetchEvents();
  }, []);

  onAuthStateChanged(auth, (currUser) => {
    setIsAuth(!!currUser);
  });

  return (
    <>
      <div className="min-h-screen">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_KEY}>
          <DataContext.Provider value={{AllEvents}}>
            <AuthContext.Provider value={{ isAuth, setIsAuth, places }}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route path="" element={<Home />} />
                    <Route path="Attraction" element={<Explore />} />
                    <Route path="Events" element={<Events />} />
                    <Route path="Login" element={<Login />} />
                    <Route path="Signup" element={<SignUp />} />
                    <Route path="UserPage" element={<User />} />
                    <Route path="Details" element={<Details />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </AuthContext.Provider>
          </DataContext.Provider>
        </LoadScript>
      </div>
    </>
  );
}

export default App;
