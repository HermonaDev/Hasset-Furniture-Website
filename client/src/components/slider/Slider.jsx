import React from "react";
import "./Slider.scss";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import images from "./images";
const Slider = () => {
  const [width, setWidth] = useState(0);
  const carousal = useRef("");

  useEffect(() => {
    setWidth(carousal.current.offsetWidth);
  }, []);

  return (
    <div className="slider">
      <Link className="link" to="/gallery"><motion.h1 animate={{ x: 540 }}>Furniture Gallery</motion.h1></Link>
      <motion.h2 animate={{ x: 600 }}>Anything you need is here</motion.h2>
      <motion.div className="carousal" whileTap={{ cursor: "grabbing" }}>
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="inner-carousal"
        >
          {images.map((image, index) => {
            return (
              <motion.div className="item" key={index}>
                <img src={image} alt="" />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slider;
