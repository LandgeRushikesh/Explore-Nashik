import React from "react";

function Details() {
  return (
    <div className="mt-28 mx-auto w-[90vw]  min-h-[80vh] font-serif">
      <div className="my-4">
        <h3 className="text-3xl font-bold">
          Trimbakeshwar Jyotirlinga Temple -
          <span className="font-semibold text-2xl">
            One of the twelve sacred Jyotirlingas of Lord Shiva in India
          </span>
        </h3>
      </div>
      <div className="w-full mt-6">
        <img
          className="h-[50%] m-auto overflow-y-hidden"
          src="https://s7ap1.scene7.com/is/image/incredibleindia/1-trimbakeshwar-nashik-maharashtra-attr-hero?qlt=82&ts=1726669890287"
          alt="img"
        />
      </div>
      {/* Description */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold">About:</h2>
        <p className="text-xl leading-relaxed text-gray-600">Trimbakeshwar Temple, located in the Nashik district of Maharashtra, is one of the holiest shrines dedicated to Lord Shiva. It is famous for housing one of the twelve Jyotirlingas, making it a significant pilgrimage destination for Hindus. The temple’s architecture is built in the Nagara style and is surrounded by lush green hills.</p>
      </div>
      {/* Facts */}
      <div>
        <h2 className="text-2xl font-bold">Quick Facts:</h2>
        <ul className="text-gray-600 " >
            <li><b>Location: </b>Trimbak, Nashik, Maharashtra</li>
            <li><b>Timings: </b>5:30 AM – 9:00 PM</li>
            <li><b>Entry Fee:</b> Free</li>
            <li><b>Famous For:</b> For: Kumbh Mela, holy river Godavari origin, Narayan Nagbali rituals</li>
        </ul>
      </div>
    </div>
  );
}

export default Details;
