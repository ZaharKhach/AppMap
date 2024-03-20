import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentPlaceId,
  selectPins,
  selectZoom,
} from "../../../slices/globalSlice";
import { currentPlaceSelected } from "../../../slices/globalSlice";

import { Marker } from "react-map-gl";
import LocationOn from "@material-ui/icons/LocationOn";
import { Popup } from "react-map-gl";
import { format } from "timeago.js";
import { Rating } from "@mui/material";

const SinglePin = ({
  id,
  longitude,
  latitude,
  title,
  description,
  rating,
  username,
  date,
}) => {
  const dispatch = useDispatch();

  const zoom = useSelector(selectZoom);
  const currentUser = useSelector(selectCurrentUser);
  const currentPlaceId = useSelector(selectCurrentPlaceId);

  return (
    <React.Fragment key={id}>
      <Marker latitude={latitude} longitude={longitude}>
        <LocationOn
          style={{
            fontSize: zoom * 7,
            cursor: "pointer",
            color: username == currentUser ? "tomato" : "slateblue",
          }}
          onClick={() => {
            setTimeout(() => {
              dispatch(currentPlaceSelected(id));
            }, 10);
          }}
        />
      </Marker>

      {currentPlaceId === id && (
        <Popup
          key={id}
          longitude={longitude}
          latitude={latitude}
          anchor="left"
          offset={[10, -7]}
        >
          <div className="card">
            <label className="label">Place</label>
            <h4 className="place">{title}</h4>
            <label className="label">Review</label>
            <p className="desc">{description}</p>
            <label className="label">Rating</label>
            <Rating name="read-only" value={rating} readOnly />
            <label className="label">Information</label>
            <span className="username">
              Created by <b>{username}</b>
            </span>
            <span className="date">{format(date)}</span>
          </div>
        </Popup>
      )}
    </React.Fragment>
  );
};

export default SinglePin;
