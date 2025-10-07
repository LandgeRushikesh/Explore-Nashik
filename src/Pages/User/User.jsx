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
  const [clicked, setClicked] = useState(false);

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
      places
        ?.filter((place) => place.liked?.includes(userId))
        .map((place) => ({ ...place, collectionName: "All Places" })) || [];
    const likedVisited =
      AllEvents?.filter((event) => event.liked?.includes(userId)).map(
        (event) => ({ ...event, collectionName: "All Events" })
      ) || [];
    setLiked([...likedPlaces, ...likedVisited]);
  };

  const findVisited = () => {
    if (!user?.uid) {
      return;
    }
    const visitedPlaces =
      places
        ?.filter((place) => place.visited?.includes(userId))
        .map((place) => ({ ...place, collectionName: "All Places" })) || [];
    const visitedEvents =
      AllEvents?.filter((event) => event.visited?.includes(userId)).map(
        (event) => ({ ...event, collectionName: "All Events" })
      ) || [];
    setVisited([...visitedPlaces, ...visitedEvents]);
  };

  useEffect(() => {
    findLiked();
    findVisited();
  }, [places, AllEvents, userId]);

  return (
    <div className="my-28 md:mx-10 min-h-[70vh] font-serif">
      <div className="w-[90vw] mx-auto flex flex-col justify-between items-start shadow-lg shadow-gray-800 px-4 py-5 rounded-lg">
        <div className="w-full flex justify-between items-center">
          <div
            className="flex justify-center items-center"
            onClick={() => setClicked((prev) => !prev)}
          >
            <div className="text-3xl border-2 border-black rounded-full p-2">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="ml-2">
              <h2 className="text-2xl font-bold">{user?.displayName}</h2>
              <h4 className="text-sm text-gray-600">{user?.email}</h4>
              <button
                className={`${
                  clicked ? "opacity-100" : "opacity-0"
                } bg-white px-2 py-1 text-lg shadow-md shadow-slate-700 rounded-lg font-semibold md:hidden`}
                onClick={HandleSignOut}
              >
                Log Out
              </button>
            </div>
          </div>
          <button
            onClick={HandleSignOut}
            className="hidden md:block text-2xl bg-red-700 font-bold text-white px-4 py-2 rounded-lg"
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
                  collectionName={place.collectionName}
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
                  collectionName={place.collectionName}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
