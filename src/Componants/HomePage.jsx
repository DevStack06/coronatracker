import React from "react";

const HomePage = () => {
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  const [cases, setCases] = React.useState(0);
  const [recover, setRecover] = React.useState(0);
  const [color, setColor] = React.useState("rgb(255,0,0)");
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://api.mapbox.com/mapbox-gl-js/v1.11.0/mapbox-gl.js";
    script.async = true;
    script.onload = () => scriptLoaded();

    document.body.appendChild(script);
  });
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZGVlcGFrODIxIiwiYSI6ImNrYm5ydGY3ODF3MGQycWxzZGFzZnp4bTgifQ.GF_q3CERq5GsmIv_5FC1uQ";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v10",
    zoom: 1,
  });
  const scriptLoaded = () => {
    window.A.sort();
    console.log("hello");
  };
  fetch("data.json")
    .then((Response) => Response.json())
    .then((rsp) => {
      console.log(rsp.data);
      rsp.data.forEach((element) => {
        setLatitude(element.latitude);
        setLongitude(element.longitude);
        setCases(element.infected);
        setRecover(element.recovered);

        if (cases > 250) setColor("rgb(255,0,0)");
        else setColor(`rgb(${cases},0,0)`);

        // create the popup
        var popup = new mapboxgl.Popup({ offset: 25 }).setText(
          `INFECTED: ${cases} 
     RECOVER: ${recover}`
        );
        //set marker
        new mapboxgl.Marker({
          color: color,
        })
          .setLngLat([longitude, latitude])
          .setPopup(popup) //set popup
          .addTo(map);
      });
    });
  return <div id="map"></div>;
};

export default HomePage;
