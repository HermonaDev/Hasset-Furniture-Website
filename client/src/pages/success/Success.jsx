import React from "react";
import "./success.scss";
import { Call, Sms, Telegram } from "@material-ui/icons";
const Success = () => {
  const gifUrl = "/fimg/success.gif";

  return (
    <div className="success">
      <div className="contact-us-section">
        <h1 className="head">Contact Us</h1>
        <br />
        <span>
          Contact our team to finalize your purchase !!
        </span>
        <div className="telegram-icon">
          <Telegram className="fab" />
          <a className="link" href="https://t.me/Her_mona" target="_blank">
            @Hasset_Furniture
          </a>
        </div>
        <div className="phone-icon">
          <Call className="fab" />
          <a className="link" href="tel:+251987654321">
            +251987654321
          </a>
        </div>
        <div className="phone-icon">
          {/* <Sms className="fab"/>  
        <span>SMS</span> */}
        </div>
      </div>
      {/* <img src={gifUrl} /> */}
    </div>
  );
};

export default Success;
