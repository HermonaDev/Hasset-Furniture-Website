import React, { useState, useEffect } from "react";
import axios from "axios";
import { userRequest } from "../../requestMethods";
const Update = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser._id;
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await userRequest.get(`/users/${userId}`);
      setUser(data);
    };
    fetchUser();
  }, [userId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      const { data } = await userRequest.put(
        `/users/${userId}`,
        updatedUser
      );
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={user.username} />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};
export default Update;
