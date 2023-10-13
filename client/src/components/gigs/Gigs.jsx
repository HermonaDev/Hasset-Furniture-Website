import React, { useEffect, useState } from "react";
import "./Gigs.scss";
import Gigcard from "../../components/gigcard/Gigcard";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { DisableScrollToTop } from "../../DisableScrollToTop";
const Gigs = ({ search }) => {
  const [visible, setvisible] = useState(4);

  const showMoreItems = () => {
    setvisible((prevValue) => prevValue + 4);
  };

  const location = useLocation();
  const category = location.pathname.split("/")[1];
  const [gigs, setGigs] = useState([]);
  // console.log(search);
  useEffect(() => {
    const getRandomGigs = async () => {
      try {
        const res = await publicRequest.get(
          `products${category ? "?category=" + category : ""}`
        );
        setGigs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomGigs();
  }, [category]);
  // console.log(gigs)

  const filteredGigs = gigs.filter((product) => {
    if (
      product.title.toLowerCase().includes(search) ||
      product.categories.toLowerCase().includes(search)
    ) 
    {
      return product;
    }
  });
  // console.log(filteredGigs)
  return (
    <div className="gigs">
      <div className="container">
        <div className="cards">
          {filteredGigs.slice(0, visible).map((product) => (
            <Gigcard key={product._id} item={product} />
          ))}
        </div>
        <button onClick={showMoreItems}>Load More...</button>
      </div>
    </div>
  );
};

export default Gigs;
