import React from "react";

import Map, { Marker, Popup } from "react-map-gl";
import LocationOn from "@material-ui/icons/LocationOn";
import Rating from "@mui/material/Rating";

import { useEffect, useState } from "react";

import axios from "axios";

import { format } from "timeago.js";

import "./app.css";
import Register from "./components/register";
import Login from "./components/login";

function App() {
  const myStorage = window.localStorage;

  let zoom = 5;
  const [viewState, setViewState] = React.useState({
    longitude: 33.2304,
    latitude: 48.5,
    zoom: zoom,
  });

  const [currentUser, setCurrentUser] = useState(null);

  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState("");
  const [newPlace, setNewPlace] = useState(null);

  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const getPins = async () => {
      try {
        const response = await axios.get("/pins");
        setPins(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getPins();
  }, []);

  const handleMarkerHover = (id) => {
    setTimeout(() => {
      setCurrentPlaceId(id);
    }, 10);
  };

  const handleOnClose = () => {
    setCurrentPlaceId(null);
  };

  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    console.log("Clicked coordinates:", lng, lat);
    setNewPlace({ lng, lat });
  };

  const handleNewPlaceOnClose = () => {
    setNewPlace(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.lng,
    };

    try {
      const response = await axios.post("/pins", newPin);
      setPins([...pins, response.data]);
      setNewPlace(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Код, который нужно выполнить после обновления состояния currentPlaceId
    console.log("currentPlaceId updated to:", currentPlaceId);
  }, [currentPlaceId]);

  return (
    <>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPTOKEN}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100vw", height: "100vh", position: "relative" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={handleAddClick}
      >
        {pins.map((pin) => (
          <React.Fragment key={pin._id}>
            <Marker latitude={pin.lat} longitude={pin.long}>
              <LocationOn
                style={{
                  fontSize: zoom * 7,
                  cursor: "pointer",
                  color: pin.username == currentUser ? "tomato" : "slateblue",
                }}
                onClick={() => handleMarkerHover(pin._id)}
              />
            </Marker>

            {currentPlaceId === pin._id ? (
              <Popup
                key={pin._id}
                longitude={pin.long}
                latitude={pin.lat}
                anchor="left"
                offset={[10, -7]}
                onClose={() => handleOnClose()}
              >
                <div className="card">
                  <label className="label">Place</label>
                  <h4 className="place">{pin.title}</h4>
                  <label className="label">Review</label>
                  <p className="desc">{pin.desc}</p>
                  <label className="label">Rating</label>
                  <Rating name="read-only" value={pin.rating} readOnly />
                  <label className="label">Information</label>
                  <span className="username">
                    Created by <b>{pin.username}</b>
                  </span>
                  <span className="date">{format(pin.createdAt)}</span>
                </div>
              </Popup>
            ) : (
              <></>
            )}
          </React.Fragment>
        ))}
        {newPlace && (
          <Popup
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            anchor="left"
            offset={[10, -7]}
            onClose={() => handleNewPlaceOnClose()}
          >
            <form onSubmit={handleSubmit}>
              <label className="label">Title</label>
              <input
                placeholder="Enter a title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label className="label">Review</label>
              <textarea
                placeholder="Say us something about this place."
                onChange={(e) => setDesc(e.target.value)}
              />
              <label className="label">Rating</label>
              <Rating
                name="simple-controlled"
                size="medium"
                value={rating}
                onChange={(e, newValue) => {
                  setRating(newValue);
                  console.log(rating);
                }}
              />
              <button className="submitButton" type="submit">
                Add pin
              </button>
            </form>
          </Popup>
        )}
        {currentUser ? (
          <button
            className="button logout"
            onClick={ }
          >Log out</button>
        ) : (
          <div className="buttonsBlock__startButtons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister &&
          <Register
            setShowRegister={setShowRegister} />}
        {showLogin &&
          <Login
            setShowLogin={setShowLogin}
            myStorage={myStorage}
            setCurrentUser={setCurrentUser} />
        }
      </Map>
    </>
  );
}

export default App;
