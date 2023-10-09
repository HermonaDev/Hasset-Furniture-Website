import React from "react";
import "./empty_wishlist.scss"
import { useNavigate } from "react-router-dom";
const Empty_Wishlist = () => {
    const navigate = useNavigate();
   const handleClick = () => {
       navigate("/");
   }
    return (
    <div className="empty">
          <img src="/fimg/Empty_Wishlist.png" />
          <h2>Your Wishlist is currently Empty!</h2>
          <button onClick={handleClick}> Add First Product</button>
          
    </div>
  );
};

export default Empty_Wishlist;
