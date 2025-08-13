import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../Firebase-config";

function TopEvents() {

  const [events,setEvents] = useState([])

  const collectionRef = collection(db,"Top Events")

  useEffect(()=>{
    const fetchEvents = async()=>{
      const res = await getDocs(collectionRef)
      setEvents(res.docs.map((doc)=>({id:doc.id,...doc.data()})))
    }

    fetchEvents()
  },[])

  return (
    <div className="event-cards w-full flex justify-start items-center gap-4 overflow-x-auto px-4">
      {events.map((event) => (
        <div key={event.id} className="w-[350px] shadow-lg shadow-gray-800 my-5 mx-2 py-4 px-3 flex shrink-0 flex-col justify-center items-center hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-600 transition-all duration-300">
          <img
            src={event.imgURL}
            alt="place image"
            className="w-full h-48 object-cover"
          />
          <h3 className="text-lg text-gray-800 font-bold">{event.Name}</h3>
          <p className="text-sm text-gray-600">{event.shortDesc}</p>
        </div>
      ))}
    </div>
  );
}

export default TopEvents;
