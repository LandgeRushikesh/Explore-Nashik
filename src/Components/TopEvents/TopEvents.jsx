import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../Firebase-config";
import Card from "../Card/Card";

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
        <Card key={event.id} attraction={event} />
      ))}
    </div>
  );
}

export default TopEvents;
