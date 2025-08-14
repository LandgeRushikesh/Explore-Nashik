import React, { useContext } from "react";
import { auth } from "../../Firebase-config";
import { AuthContext } from "../../Context/AuthContext";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";

function User() {
  const { setIsAuth } = useContext(AuthContext);

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

  const user = auth.currentUser

  return (
    <div className="mt-28 mx-10 min-h-[70vh] font-serif">
      <div className="w-[90vw] mx-auto flex flex-col justify-between items-start shadow-lg shadow-gray-800 px-4 py-5 rounded-lg">
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-center items-center">
            <div className="text-3xl border-2 border-black rounded-full p-2">
              <FontAwesomeIcon icon={faUser}/>
            </div>
            <div className="ml-2">
              <h2 className="text-2xl font-bold">
                {user?.displayName}
              </h2>
              <h4 className="text-sm text-gray-600">{user?.email}</h4>
            </div>
          </div>
          <button onClick={HandleSignOut} className="text-2xl bg-red-700 font-bold text-white px-4 py-2 rounded-lg">
            <FontAwesomeIcon icon={faSignOut} />
          </button>
        </div>
        <div className="Wishlist mt-4">
          <h2 className="text-2xl font-bold">WishList ❤️</h2>
          <div></div>
        </div>
        <div className="Places-already-visited mt-4">
          <h2 className="text-2xl font-bold">Visited ✅</h2>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default User;
