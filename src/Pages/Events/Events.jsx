import React, { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import Card from "../../Components/Card/Card";

function Events() {
  const { AllEvents } = useContext(DataContext);

  return (
    <div className="event-cards w-full mt-28 min-h-[80vh] grid xl3:grid-cols-4 xl2:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center">
      {AllEvents.map((event) => (
        <Card key={event.id} attraction={event} collectionName={"All Events"} />
      ))}
    </div>
  );
}

export default Events;
