import "./login.css";

import { useState, useRef } from "react";

import LocationOn from "@material-ui/icons/LocationOn";
import Close from "@material-ui/icons/Close";

import axios from "axios";

const Login = ({ setShowLogin, myStorage, setCurrentUser }) => {
  const [error, setError] = useState(false);

  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post("./users/login", user);
      myStorage.setItem("user", response.data.username);
      setCurrentUser(response.data.username);
      setShowLogin(false);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <LocationOn />
        MarkerPin
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" ref={nameRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="loginBtn">Login</button>

        {error && <span className="failure">Something went wrong</span>}
      </form>
      <Close className="loginClose" onClick={() => setShowLogin(false)} />
    </div>
  );
};

export default Login;
