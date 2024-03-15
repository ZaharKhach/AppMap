import React from 'react';

import Map, { Marker, Popup } from 'react-map-gl';
import LocationOn from '@material-ui/icons/LocationOn';
import Rating from '@mui/material/Rating';

import { useEffect, useState } from 'react';

import axios from 'axios';

import { format } from "timeago.js"

import './app.css'

function App() {
  let zoom = 5;
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState();

  useEffect(() => {
    const getPins = async () => {
      try {
        const response = await axios.get("/pins");
        setPins(response.data)
      } catch (error) {
        console.error(error)
      }
    };
    getPins();
  }, []);

  const handleMarkerHover = (id) => {
    console.log(id)
    setCurrentPlaceId(id);
  }

  const handleMouseLeave = () => {
    setCurrentPlaceId(null);
  }

  return (
    <>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPTOKEN}
        initialViewState={{
          longitude: 33.2304,
          latitude: 48.5,
          zoom: zoom
        }}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {pins.map((pin) => (
          <React.Fragment key={pin._id}>
            <Marker
              latitude={pin.lat}
              longitude={pin.long}
            >
              <LocationOn
                style={{
                  fontSize: zoom * 7,
                  color: 'slateblue',
                  cursor: 'pointer'
                }}
                onMouseOver={() => handleMarkerHover(pin._id)}
                onMouseLeave={() => handleMouseLeave()}

              />
            </Marker>

            {currentPlaceId === pin._id ?
              (
                <Popup
                  key={pin._id}
                  longitude={pin.long}
                  latitude={pin.lat}
                  anchor="left"
                  offset={[10, -7]}
                >
                  <div className="card">
                    <label>Place</label>
                    <h4 className='place'>{pin.title}</h4>
                    <label>Review</label>
                    <p className='desc'>{pin.desc}</p>
                    <label>Rating</label>
                    <Rating name="read-only" value={pin.rating} readOnly />
                    <label>Information</label>
                    <span className='username'>Created by <b>{pin.username}</b></span>
                    <span className='date'>{format(pin.createdAt)}</span>
                  </div>
                </Popup>
              ) :
              <>
              </>}
          </React.Fragment>
        ))}

      </Map >
    </>

  );
}

export default App;
