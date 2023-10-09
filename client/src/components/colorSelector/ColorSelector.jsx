import React, { useEffect, useState } from "react";
import "./colorSelector.scss";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../../requestMethods";

const ColorSelector = ({ selectedColor, handleColorSelection }) => {
  const location = useLocation();
  // const id = useParams().id;
  const id = location.pathname.split("/")[2];
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [id]);
  if (!products || products.length === 0) {
    return <div>Loading...</div>;
  }
  // const colors = ['Dark Gray', 'Visele Beige'];
  // const images = [
  //   "/fimg/col1.jpg",
  //   "/fimg/col2.jpg"
  // ];
  const colors = products.color;
  const images = products.colorimg;
  return (
    <div className="color-selector">
      <div className="color-container">
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} />
            <br />
          </div>
        ))}{" "}
      </div>
      <div className="button-container">
        {colors.map((color) => (
          <button
            key={color}
            className={`color-button ${
              selectedColor === color ? "selected" : ""
            }`}
            onClick={() => handleColorSelection(color)}
          >
            {" "}
            {color}  
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
