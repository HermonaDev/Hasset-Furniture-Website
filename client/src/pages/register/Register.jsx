import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import Lootie from "lottie-react";
import animationData from "../../../public/Animation/animation_llqowsru.json";
import { useNavigate } from "react-router-dom";
import "./register.scss";
import { publicRequest } from "../../requestMethods";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const phoneNumberRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    setPhoneNumber(phoneNumberRef.current.value);
    try {
      await publicRequest.post("/auth/register", {
        email,
        username,
        password,
        phoneNumber,
      });
      navigate("/signin");
    } catch (err) {}
  };
  return (
      <div className="App">
        <section>
          <div className="register">
            <div className="col-1">
              <h2>Sign Up</h2>
              <span>register and enjoy the service</span>
              {!email ? (
                <div className="input">
                  <input
                    type="email"
                    placeholder="email address"
                    ref={emailRef}
                  />
                  <button className="btn1" onClick={handleStart}>
                    Get Started
                  </button>
                </div>
              ) : (
                <form className="input">
                  <input
                    type="username"
                    placeholder="username"
                    ref={usernameRef}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    ref={passwordRef}
                  />
                  <input
                    type="text"
                    placeholder="phoneNumber"
                    ref={phoneNumberRef}
                  />
                  <button className="btn1" onClick={handleFinish}>
                    Sign Up
                  </button>
                </form>
              )}
            </div>
            <div className="col-2">
            <Lootie className="lottie" animationData={animationData}></Lootie>
          </div>
          </div>
        </section>
      </div>
  );
}
