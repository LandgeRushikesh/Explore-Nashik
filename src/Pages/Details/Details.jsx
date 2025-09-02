import React from "react";
import { useNavigate } from "react-router-dom";

function Details() {

  const navigate = useNavigate()


  return (
    <div className="mt-28 mx-auto w-[90vw]  min-h-[80vh] font-serif">
      <p>Details Page</p>
      <button onClick={()=>navigate(-1)}>return to home page</button>
    </div>
  );
}

export default Details;
