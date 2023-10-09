import React, { useState } from "react";
import "./colorSlider.scss";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";

const ColorSlider = ({name}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/fimg/col1.jpg",
    "/fimg/col2.jpg"
  ];
  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  currentImageIndex === 0 ? name = "Dark Gray" : name= "Visele Beige" ;


  return (
    <div className="color-slider">
      <span className="color-name">{name} </span>
      <button className="slider-button previous" onClick={handlePrevious}>
        <ArrowLeftOutlined className="slider-arrow"/>
      </button>
      <img
        className="slider-image"
        src={images[currentImageIndex]}
        alt="Product"
      />
      <button className="slider-button next" onClick={handleNext}>
        <ArrowRightOutlined className="slider-arrow"/>
      </button>
    </div>
  );
};

export default ColorSlider;
