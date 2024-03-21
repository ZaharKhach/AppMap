import React, { useEffect } from "react";

import { Map as MapGl } from "react-map-gl";

import "../app.css";

import { useDispatch } from "react-redux";

import Pins from "../components/pins/Pins";
import NewPin from "../components/newPin/NewPin";

import { selectView } from "../slices/globalSlice";
import { setViewState, newPlaceAdded } from "../slices/globalSlice";

import { useSelector } from "react-redux";

const Map = () => {
  const dispatch = useDispatch();
  const view = useSelector(selectView);
  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    console.log("Clicked coordinates:", lng, lat);
    dispatch(newPlaceAdded({ lng, lat }));
  };

  const el1 = document.querySelector(".mapboxgl-ctrl-bottom-left");
  const el2 = document.querySelector(".mapboxgl-ctrl-attrib-inner");
  useEffect(() => {
    if (el1 && el2) {
      el1.remove();
      el2.remove();
    }
  }, [el1, el2]);

  return (
    <MapGl
      mapboxAccessToken={process.env.REACT_APP_MAPTOKEN}
      {...view}
      onMove={(evt) => dispatch(setViewState(evt.viewState))}
      style={{ width: "100vw", height: "100vh", position: "relative" }}
      // mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onDblClick={handleAddClick}
    >
      <Pins />
      <NewPin />
    </MapGl>
  );
};

export default Map;
