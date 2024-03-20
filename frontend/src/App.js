import React from "react";

import Map from "react-map-gl";

import {  useState } from "react";

import "./app.css";
import Register from "./components/register";
import Login from "./components/login";

import { useDispatch } from "react-redux";

import Pins from "./components/pins/Pins";
import NewPin from "./components/newPin/NewPin";

import { selectView } from "./slices/globalSlice";
import { setViewState,newPlaceAdded } from "./slices/globalSlice";

import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch()

  const view = useSelector(selectView)

  // const [showRegister, setShowRegister] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);
  
  const handleAddClick = (e) => {
    dispatch(newPlaceAdded(e.lngLat))
  };

  // const handleLogoutClick = () => {
  //   myStorage.removeItem('user');
  //   setCurrentUser(null)
  // }
  return (
    <>
      <Map mapboxAccessToken={process.env.REACT_APP_MAPTOKEN}
        {...view}
        onMove={(evt) => dispatch(setViewState(evt.viewState))}
        style={{ width: "100vw", height: "100vh", position: "relative" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={handleAddClick}>

        <Pins />
        <NewPin />

        {/* BUTTONS */}
        {/* {currentUser ? (
          <button
            className="button logout"
            onClick={handleLogoutClick}
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
        } */}
        {/* BUTTONS */}

      </Map>
    </>
  );
}

export default App;
