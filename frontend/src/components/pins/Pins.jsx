import SinglePin from "./singlePin/SinglePin";

import { useSelector } from "react-redux";
import { selectPins } from "../../slices/globalSlice";

const Pins = () => {
  const pins = useSelector(selectPins);
  return (
    <>
      {pins.map((pin) => (
        <SinglePin
          key={pin._id}
          id={pin._id}
          longitude={pin.long}
          latitude={pin.lat}
          title={pin.title}
          description={pin.desc}
          rating={pin.rating}
          username={pin.username}
          date={pin.createdAt}
        />
      ))}
    </>
  );
};

export default Pins;
