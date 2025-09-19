import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase-config";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

function Card({ attraction, collectionName }) {
  const [isHover, setIsHover] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [isVisited, setIsVisited] = useState(false);

  const { isAuth, user } = useContext(AuthContext);

  const addToFavorite = async (id) => {
    try {
      const ref = doc(db, collectionName, id);
      await updateDoc(ref, {
        liked: arrayUnion(user.uid),
      });
      console.log("Added to Favorite");
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromFavorite = async (id) => {
    try {
      const ref = doc(db, collectionName, id);
      await updateDoc(ref, {
        liked: arrayRemove(user.uid),
      });
      console.log("removed from Favorite");
    } catch (err) {
      console.log(err);
    }
  };
  const addToVisited = async (id) => {
    try {
      const ref = doc(db, collectionName, id);
      await updateDoc(ref, {
        visited: arrayUnion(user.uid),
      });
    } catch (err) {
      console.log(err);
    }
  };
  const removeFromVisited = async (id) => {
    try {
      const ref = doc(db, collectionName, id);
      await updateDoc(ref, {
        visited: arrayRemove(user.uid),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const HandleClick = (type, id) => {
    if (type === "liked") {
      setIsLiked((prev) => {
        const newState = !prev;
        if (newState) {
          addToFavorite(id);
        } else {
          removeFromFavorite(id);
        }
        return newState;
      });
    } else if (type === "visited") {
      setIsVisited((prev) => {
        const newState = !prev;
        if (newState) {
          addToVisited(id);
        } else {
          removeFromVisited(id);
        }
        return newState;
      });
    }
  };

  const navigate = useNavigate();
  const goToDetailsPage = () => {
    try {
      navigate("/Details");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="w-[350px] shadow-lg shadow-gray-800 my-5 mx-2 py-4 px-3 flex flex-col shrink-0 justify-center items-center cursor-pointer  hover:shadow-xl hover:shadow-gray-600 hover:scale-[1.02] transition-all duration-300"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onClick={goToDetailsPage}
    >
      <div className="w-full relative">
        <img
          src={attraction.imgURL}
          alt="place image"
          className={`w-[100%] h-48 my-2 object-cover  ${
            isAuth && isHover ? "opacity-40  blur-md" : "opacity-100"
          }`}
        />
        {isAuth && (
          <div
            className={`absolute inset-0 w-full h-full flex justify-center items-center ${
              isHover ? "opacity-100" : "opacity-0"
            } transition-all duration-200`}
          >
            <button
              className={`rounded-full bg-transparent shadow-lg shadow-black p-2 mr-3 hover:scale-105 text-3xl transition-all duration-200 ${
                isLiked ? "text-rose-800" : "text-white"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                HandleClick("liked", attraction.id);
              }}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button
              className={`rounded-full bg-transparent shadow-lg shadow-black p-2 hover:scale-105 text-3xl transition-all duration-200 ${
                isVisited ? "text-green-900" : "text-white"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                HandleClick("visited", attraction.id);
              }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
        )}
      </div>
      <h3 className="text-lg text-gray-800 font-bold">{attraction.Name}</h3>
      <p className="text-sm text-gray-600">{attraction.shortDesc}</p>
    </div>
  );
}

export default Card;
