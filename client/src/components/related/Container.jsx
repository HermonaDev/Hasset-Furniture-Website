import { FavoriteBorder } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import "./container.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { FaStar } from "react-icons/fa";

const Container = () => {
  const containerRef = useRef(null);
  const location = useLocation();
  // const productId = useParams().id;
  const productId = location.pathname.split("/")[2];
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const containerTop = container.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (containerTop < windowHeight) {
        container.classList.add("reveal");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + productId);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [productId]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get("/products");
        const filteredItems = res.data.filter(
          (item) =>
            item.categories.includes(products.categories) &&
            item._id !== products._id
        );
        setItems(filteredItems);
      } catch (err) {
        console.log(err);
      }
    };
    getItems();
  }, [products]);
  if (!products || products.length === 0) {
    return <div>Loading...</div>;
  }
  //for rendering rating stars
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} className="star-icon filled" />);
      } else {
        stars.push(<FaStar key={i} className="star-icon" />);
      }
    }
    return stars;
  };

  return (
    <>
      <div className="related-item" ref={containerRef}>
        <span className="header">
          <br />
          <b>Compare Similar Items</b>
        </span>
        {items.map((product) => (
          <div className="wrap" key={product.productId}>
            <Link className="link" to={`/product/${product._id}`}>
              <div className="product">
                <img src={product.img} alt="" />
                <div className="detail">
                  <span>
                    <b>{product.title}</b>
                  </span>
                  <div className="rating">
                    {renderRatingStars(product.rating)}<br/>
                    </div>
                  {/* <FavoriteBorder className="favorite" /> */}
                </div>
                <div className="more-info">
                  <span>
                    <b> {product.price}ETB</b>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Container;
