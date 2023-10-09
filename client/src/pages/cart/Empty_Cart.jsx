import React from "react";
import "./empty_cart.scss"
import { useNavigate } from "react-router-dom";
const Empty_Cart = () => {
    const navigate = useNavigate();
   const handleClick = () => {
       navigate("/");
   }
    return (
    <div className="empty">
          <img src="/fimg/Empty_Cart.jpeg" />
          <h2>Your Cart is Empty</h2>
          <span>Looks like you have not added anything to your Cart.<br /> Go ahead and Explore our top products</span>
          <button onClick={handleClick}> Continue Shopping</button>
          
    </div>
  );
};

export default Empty_Cart;
