import React, { useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import { DataContext } from "../../Context/DataContext";

function TopEvents() {
  const [events, setEvents] = useState([]);

  const { AllEvents } = useContext(DataContext);

  useEffect(() => {
    setEvents(AllEvents.filter((event) => event.showToHome === true));
  }, [AllEvents]);

  return (
    <div className="event-cards w-full flex justify-start items-center gap-4 overflow-x-auto">
      {events.map((event) => (
        <Card key={event.id} attraction={event} collectionName={"All Events"} />
      ))}
    </div>
  );
}

export default TopEvents;
