import React, { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import Card from "../../Components/Card/Card";

function Events() {
  const { AllEvents } = useContext(DataContext);

  return (
    <div className="event-cards w-full mt-28 min-h-[80vh] grid grid-cols-4 px-4">
      {AllEvents.map((event) => (
        <Card attraction={event} collectionName={"All Events"} />
      ))}
    </div>
  );
}

export default Events;
