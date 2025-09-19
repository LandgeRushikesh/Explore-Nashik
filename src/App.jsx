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
import { collection, onSnapshot } from "firebase/firestore";
import { DataContext } from "./Context/DataContext";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [places, setPlaces] = useState([]);
  const [AllEvents, setAllEvents] = useState([]);
  const [filterdPlaces, setFilteredPlaces] = useState([]);
  const [category, setCategory] = useState("All");
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const EventscollectionRef = collection(db, "All Events");
  const PlacescollectionRef = collection(db, "All Places");

  // Fetch Events

  useEffect(() => {
    const unsubscribePlaces = onSnapshot(PlacescollectionRef, (snapShot) => {
      setPlaces(snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    const unsubscribeEvents = onSnapshot(EventscollectionRef, (snapShot) => {
      setAllEvents(snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeEvents();
      unsubscribePlaces();
    };
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setIsAuth(!!currUser);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <div className="min-h-screen">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_KEY}>
          <DataContext.Provider
            value={{
              AllEvents,
              places,
              filterdPlaces,
              setFilteredPlaces,
              category,
              setCategory,
            }}
          >
            <AuthContext.Provider value={{ isAuth, setIsAuth, user, places }}>
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
