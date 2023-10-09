import React, { useEffect, useState } from "react";
import "./imageGallery.scss";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../../requestMethods";

const ImageGallery = ({ selectedColor }) => {
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // const darkGrayImages = [
  //   "/fimg/img1.png",
  //   "/fimg/img2.png",
  //   "/fimg/img3.png",
  //   "/fimg/img4.png",
  //   "/fimg/img5.png",
  //   "/fimg/Dimension.png",
  // ];

  // const viseleBeigeImages = [
  //   "/fimg/beige/img1.jpg",
  //   "/fimg/beige/img2.jpg",
  //   "/fimg/beige/img3.jpg",
  //   "/fimg/beige/img4.jpg",
  //   "/fimg/beige/img5.jpg",
  //   "/fimg/beige/Dimension.jpg",
  // ];
  // const darkGrayImages = `${products.img}`;

  // const viseleBeigeImages = `${products.img}`;

  // const images =
  //   selectedColor === "Dark Gray" ? darkGrayImages : viseleBeigeImages;
  if (!products || products.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="image-gallery">
      <div className="image-display">
        <img src={products.img[selectedImageIndex]} alt="Selected Image" />
      </div>
      <div className="thumbnail-grid">
        {products.img.map((image, index) => (
          <img
            key={index}
            src={image}
            className={selectedImageIndex === index ? "selected" : ""}
            onClick={() => setSelectedImageIndex(index)}
          />
        ))}
        
      </div>
    </div>
  );
};

export default ImageGallery;

//
