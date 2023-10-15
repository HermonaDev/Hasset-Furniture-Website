import React, { useEffect, useState } from "react";
import "./checkout.scss";
import StripeCheckout from "react-stripe-checkout";
import { ArrowBack } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const navigate = useNavigate();
  const KEY =
    "pk_test_51Nlc7rK11NhiuscnLaWcQtZUIDlw9svgW6JGuT7dtxMDj85krResmXhyR4UoKzaSqh6VHnOGxkHOd1vAylTKV2sq00cVAu3M0r";
  const [stripeToken, setStripeToken] = useState(null);

  const [isContentVisible, setIsContentVisible] = useState(false);
  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2900000,
          }
        );
        console.log(res.data);
        navigate("/success");
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken,navigate]);
  const handlePaymentMethodClick = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  const handleReceiptUpload = (event) => {
    // Handle receipt image upload logic here
  };
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    city: "",
    address: "",
    phoneNumber: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleShippingAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleOrderFinalize = () => {
    // Handle order finalization logic here
    console.log("Order finalized!");
  };

  return (
    <div className="checkout-page">
      <Link to="/cart">
        <ArrowBack />
      </Link>
      <h1 className="checkout-header">Checkout</h1>
      <div className="shipping-address">
        <h2 className="section-header">Shipping Address</h2>
        <input
          type="text"
          name="name"
          value={shippingAddress.name}
          onChange={handleShippingAddressChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="city"
          value={shippingAddress.city}
          onChange={handleShippingAddressChange}
          placeholder="City"
        />
        <input
          type="text"
          name="address"
          value={shippingAddress.address}
          onChange={handleShippingAddressChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="phoneNumber"
          value={shippingAddress.phoneNumber}
          onChange={handleShippingAddressChange}
          placeholder="Phone Number"
        />
      </div>
      <div className="checkout">
        <h2>Payment Method</h2>
        <div className="payment-methods">
          <div
            className={`payment-method ${
              selectedPaymentMethod === "amole" ? "selected" : ""
            }`}
            onClick={() => handlePaymentMethodClick("amole")}
          >
            <img className="logo" src="/fimg/amole.jpeg" alt="Amole" />
            <span>Amole</span>
          </div>
          <div
            className={`payment-method ${
              selectedPaymentMethod === "cbe-birr" ? "selected" : ""
            }`}
            onClick={() => handlePaymentMethodClick("cbe-birr")}
          >
            <img className="logo" src="/fimg/cbe.jpeg" alt="CBE Birr" />
            <span>CBE Birr</span>
          </div>
          <div
            className={`payment-method ${
              selectedPaymentMethod === "telebirr" ? "selected" : ""
            }`}
            onClick={() => handlePaymentMethodClick("telebirr")}
          >
            <img className="logo" src="/fimg/telebirr.png" alt="Telebirr" />
            <span>Telebirr</span>
          </div>
          <div
            className={`payment-method ${
              selectedPaymentMethod === "cash" ? "selected" : ""
            }`}
            onClick={() => handlePaymentMethodClick("cash")}
          >
            <img className="logo" src="/fimg/cash.png" alt="Cash" />
            <span>Cash</span>
          </div>
        </div>
        {selectedPaymentMethod && (
          <div className="receipt-upload">
            <h3>Upload Receipt</h3>
            <input type="file" onChange={handleReceiptUpload} />
          </div>
        )}
      </div>
      <div className="payment-info">
        <h2 className=" section-header">or Paywith</h2>
        <img
          className="logo"
          src="/fimg/paypal.png"
          alt="Paypal"
          onClick={toggleContent}
        />
        {isContentVisible && (
          <div className="hiddenContent">
            <input
              type="text"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handlePaymentInfoChange}
              placeholder="Card Number"
            />
            <input
              type="text"
              name="expirationDate"
              value={paymentInfo.expirationDate}
              onChange={handlePaymentInfoChange}
              placeholder="Expiration Date"
            />
            <input
              type="text"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handlePaymentInfoChange}
              placeholder="CVV"
            />
          </div>
        )}
      </div>
      {stripeToken ? (
        <span> Processing. Please wait....</span>
      ) : (
        <StripeCheckout
          name="Hasset Furniture"
          image="/img/logo.png"
          billingAddress
          shippingAddress
          description="Your total is 32,000 ETB"
          amount={3200000}
          token={onToken}
          stripeKey={KEY}
        >
          <button
            className="finalize-order-button"
            onClick={handleOrderFinalize}
          >
            Finalize Order
          </button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Checkout;
