import "./register.css";

import { useState, useRef } from "react";

import LocationOn from "@material-ui/icons/LocationOn";
import Close from "@material-ui/icons/Close";

import axios from "axios";

const Register = ({ setShowRegister }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await axios.post("./users/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      setError(true);
      console.log(error);
    }
  };
  return (
    <div className="registerContainer">
      <div className="logo">
        <LocationOn />
        MarkerPin
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" ref={nameRef} />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="registerBtn" >
          Register
        </button>
        {success && (
          <span className="success">Successful. You can login now</span>
        )}
        {error && <span className="failure">Something went wrong</span>}
      </form>
      <Close className="registerClose" onClick={() => setShowRegister(false)} />
    </div>
  );
};

export default Register;
