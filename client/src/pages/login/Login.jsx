import React, { useState } from "react";
import "./login.scss";
import Lootie from "lottie-react";
import animationData from "../../../public/Animation/animation_llqowsru.json";
import newRequest from "../../utils/newRequest";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data);
    }
  };
  return (
    <div className="App">
      <section>
        <div className="register">
          <div className="col-1">
            <h2>Sign In</h2>
            <span>Signin and enjoy the service</span>
            <form onSubmit={handleSubmit} className="formw">
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn" type="submit">
                Sign In
              </button><br/>
              {error && error}
              <Link to="/register" className="link">
                <span>or Create New Account</span>
              </Link>
            </form>
          </div>
          <div className="col-2">
            <Lootie className="lottie" animationData={animationData}></Lootie>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
