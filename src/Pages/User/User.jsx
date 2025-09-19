import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../Firebase-config";
import { AuthContext } from "../../Context/AuthContext";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../../Context/DataContext";
import Card from "../../Components/Card/Card";

function User() {
  const [liked, setLiked] = useState([]);
  const [visited, setVisited] = useState([]);
  const [userId, setUserId] = useState();

  const { setIsAuth, user } = useContext(AuthContext);
  const { places, AllEvents } = useContext(DataContext);

  const navigate = useNavigate();

  const HandleSignOut = async () => {
    try {
      const res = await signOut(auth);
      setIsAuth(false);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    setUserId(user?.uid);
  }, [user]);

  const findLiked = () => {
    if (!user?.uid) {
      return;
    }
    const likedPlaces =
      places?.filter((place) => place.liked?.includes(userId)) || [];
    const likedVisited =
      AllEvents?.filter((event) => event.liked?.includes(userId)) || [];
    setLiked([...likedPlaces, ...likedVisited]);
  };

  const findVisited = () => {
    if (!user?.uid) {
      return;
    }
    const visitedPlaces =
      places?.filter((place) => place.visited?.includes(userId)) || [];
    const visitedEvents =
      AllEvents?.filter((event) => event.visited?.includes(userId)) || [];
    setVisited([...visitedPlaces, ...visitedEvents]);
  };

  useEffect(() => {
    findLiked();
    findVisited();
  }, [places, AllEvents, userId]);

  return (
    <div className="my-28 mx-10 min-h-[70vh] font-serif">
      <div className="w-[90vw] mx-auto flex flex-col justify-between items-start shadow-lg shadow-gray-800 px-4 py-5 rounded-lg">
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-center items-center">
            <div className="text-3xl border-2 border-black rounded-full p-2">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="ml-2">
              <h2 className="text-2xl font-bold">{user?.displayName}</h2>
              <h4 className="text-sm text-gray-600">{user?.email}</h4>
            </div>
          </div>
          <button
            onClick={HandleSignOut}
            className="text-2xl bg-red-700 font-bold text-white px-4 py-2 rounded-lg"
          >
            <FontAwesomeIcon icon={faSignOut} />
          </button>
        </div>
        <div className="Wishlist mt-4 w-full">
          <h2 className="text-2xl font-bold">WishList ❤️</h2>
          <div className="favorites w-full flex justify-start items-center gap-2 overflow-x-scroll">
            {liked &&
              liked.map((place) => (
                <Card
                  key={place.id}
                  attraction={place}
                  collectionName={"Places"}
                />
              ))}
          </div>
        </div>
        <div className="mt-4 w-full">
          <h2 className="text-2xl font-bold">Visited ✅</h2>
          <div className="Places-already-visited w-full flex justify-start items-center gap-2 overflow-x-scroll">
            {visited &&
              visited.map((place) => (
                <Card
                  key={place.id}
                  attraction={place}
                  collectionName={"Places"}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
