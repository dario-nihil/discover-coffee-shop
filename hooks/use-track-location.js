import { useState } from "react";

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [latLng, setLatLng] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const error = () => {
    setLocationErrorMsg("Unable to retrieve youe location");
    setIsFindingLocation(false);
  };

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLng(`${latitude},${longitude}`);
    setLocationErrorMsg("");
    setIsFindingLocation(false);
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);

    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      setIsFindingLocation(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return { latLng, locationErrorMsg, handleTrackLocation, isFindingLocation };
};

export default useTrackLocation;
