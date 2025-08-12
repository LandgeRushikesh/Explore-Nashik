import { GoogleMap} from "@react-google-maps/api";
import React from "react";

function MapView() {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };
  const center = {
    lat: 19.9975, // Example: Nashik
    lng: 73.7898,
  };
  return (
    // to resolve loading problem of map i am rapping whole app with loadscript instead of GoogleMap
     /*
        LoadScript is not meant to be re-mounted multiple times.

        Every time you switch back to MapView, your component is trying to run LoadScript again.

        Google Maps API detects that the script is already loaded and refuses to reload, leaving the map stuck in the "loading" state.
      */
    <div className="z-0 w-[90vw] h-[80vh] m-auto">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          scrollwheel: false,
        }}
      ></GoogleMap>
    </div>
  );
}

export default MapView;
