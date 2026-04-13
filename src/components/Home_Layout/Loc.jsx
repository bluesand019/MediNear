import React from "react";
import { useEffect, useState } from "react";

const Loc = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (!coordinates) return;
    const API_KEY = import.meta.env.VITE_API_KEY;
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${coordinates.lat}+${coordinates.lng}&key=${API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if(data.results && data.results.length > 0) {
            setLocation(data.results[0].components.city);
        } 
        })
        .catch(error => console.error(error));
  }, [coordinates]);
  return <>
    {location ? location : "Fetching location..."}
  </>;
};

export default Loc;
