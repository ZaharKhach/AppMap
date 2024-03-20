import React from "react";

import { Popup } from "react-map-gl";
import { Rating } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import {
  selectCurrentUser,
  selectNewPlace,
  selectNewPlaceData,
} from "../../slices/globalSlice";
import {
  newPinTitle,
  newPinDesc,
  newPinRating,
  newPin
} from "../../slices/globalSlice";

const NewPin = () => {
  const dispatch = useDispatch();
  const newPlace = useSelector(selectNewPlace);
  const currentUser = useSelector(selectCurrentUser);
  const { title, desc, rating } = useSelector(selectNewPlaceData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPinData = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.lng,
    };
    dispatch(newPin(newPinData))
  };

  return (
    <React.Fragment>
      {newPlace && (
        <Popup
          longitude={newPlace.lng}
          latitude={newPlace.lat}
          anchor="left"
          offset={[10, -7]}
        >
          <form onSubmit={handleSubmit}>
            <label className="label">Title</label>
            <input
              placeholder="Enter a title"
              onChange={(e) => dispatch(newPinTitle(e.target.value))}
            />
            <label className="label">Review</label>
            <textarea
              placeholder="Say us something about this place."
              onChange={(e) => dispatch(newPinDesc(e.target.value))}
            />
            <label className="label">Rating</label>
            <Rating
              name="simple-controlled"
              size="medium"
              value={rating}
              onChange={(e, newValue) => {
                dispatch(newPinRating(newValue));
              }}
            />
            <button className="submitButton" type="submit">
              Add pin
            </button>
          </form>
        </Popup>
      )}
    </React.Fragment>
  );
};

export default NewPin;
