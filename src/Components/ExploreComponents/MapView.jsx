import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataContext";

function MapView() {
  const [selectedplace, setSelectedPlace] = useState(null);
  const containerStyle = {
    width: "100%",
    height: "100%",
  };
  const center = {
    lat: 19.9975, // Example: Nashik
    lng: 73.7898,
  };

  const { filterdPlaces } = useContext(DataContext);

  const[isZoom,setIsZoom] = useState(false)


  return (
    // to resolve loading problem of map i am rapping whole app with loadscript instead of GoogleMap
    /*
        LoadScript is not meant to be re-mounted multiple times.

        Every time you switch back to MapView, your component is trying to run LoadScript again.

        Google Maps API detects that the script is already loaded and refuses to reload, leaving the map stuck in the "loading" state.
      */
    <div className="z-0 w-[90vw] h-[100vh] m-auto">
      <GoogleMap
        // onDblClick={HandleClick}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          gestureHandling:"greedy" 
        }}
      >
        {filterdPlaces.map((place, index) => (
          <Marker
            key={index}
            position={{ lat: place.location.lat, lng: place.location.lon }}
            title={place.Name}
            onClick={() => setSelectedPlace(place)}
          />
        ))}
        {selectedplace && (
          <InfoWindow
            position={{
              lat: selectedplace.location.lat,
              lng: selectedplace.location.lon,
            }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div
              className=" mx-2 py-4 px-3 flex flex-col shrink-0 justify-center items-center cursor-pointer"
            >
              <img
                src={selectedplace.imgURL}
                alt="place image"
                className="w-full h-48 my-2 object-fill"
              />
              <h3 className="text-lg text-gray-800 font-bold">{selectedplace.Name}</h3>
              <p className="text-sm text-gray-600">{selectedplace.shortDesc}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default MapView;
