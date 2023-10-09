import React, { useEffect, useState } from "react";
import "./Discount.scss";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../../requestMethods";

const Discount = () => {
  const furnitureItems = [
    {
      id: 1,
      title: "Modern Sofa",
      price: "18,999 ETB",
      discount: "12% off",
      image: "/fimg/img1.png",
    },
    {
      id: 2,
      title: "Elegant Outdoor Dining Table",
      price: "16,399 ETB",
      discount: "15% off",
      image: "/fimg/din.jpg",
    },
    {
      id: 3,
      title: "Queen Sized Bed",
      price: "25,999 ETB",
      discount: "20% off",
      image: "/fimg/bed.jpg",
    },
    {
      id: 4,
      title: "Dining Table",
      price: "6,599 ETB",
      discount: "15% off",
      image: "/fimg/tab.jpg",
    },
    {
      id: 5,
      title: "Cozy NightStand",
      price: "3,999 ETB",
      discount: "15% off",
      image: "/fimg/nig.jpg",
    },
    {
      id: 6,
      title: "Bamboo Bed Frame",
      price: "32,399",
      discount: "15% off",
      image: "/fimg/bed2.jpg",
    },
  ];
  const location = useLocation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get("/products");
        const filteredItems = res.data.filter(item => item.onSale === true);
        setItems(filteredItems);
      } catch (err) {
        console.log(err);
      }
    };
    getItems();
  }, []);
  if (!items || items.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="discount">
      <span>Discount Offers</span>
      <div className="discount-page">
        {items.map((item) => (
          <div className="discount-item" key={item._id}>
            <div className="image">
              <img src={item.mainImg} alt={item.title} />
            </div>
            <h2 className="title">{item.title}</h2>
            <h3 className="price">{item.price} ETB</h3>
            <p className="discount">{(((item.discountPrice - item.price) / item.discountPrice) * 100).toFixed(0)}%</p>
            <Link className="link" to={`/product/${item._id}`}>
              <button className="button">Claim Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discount;
