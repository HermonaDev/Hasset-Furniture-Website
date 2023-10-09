import React, { useState } from "react";
import "./Gigcard.scss";
import { Link } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
const Gigcard = ({ item }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser ? currentUser._id : null;
  const productId = item._id;
  const img = item.mainImg;
  const price = item.price;
  //For favorite Button
  const [isFavorite, setIsFavorite] = useState(false);

  //For hidding and revealing content
  const handleToggle = () => {
    setIsFavorite(!isFavorite);
  };
 //handle is favorite
 const handleAddToFav = async () => {
  await userRequest
    .get("/wishlists/find/" + userId)
    .then((response) => {
      if (response.data) {
        // If the user has an existing cart, update it with the new product information
        const wishlistId = response.data._id;
        const updatedWishlist = {
          products: [
            ...response.data.products,
            {
              productId,
              img,
              price,
            },
          ],
        };
        userRequest
          .put("/wishlists/" + wishlistId, updatedWishlist)

          .then((response) => {
            console.log("Wishlist updated:", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const newWishlist = {
          userId,
          products: [
            {
              productId,
              img,
              price,
            },
          ],
        };
        userRequest
          .post("/wishlists", newWishlist)
          .then((response) => {
            console.log("Wishlist created:", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  handleToggle();
};

  return (
    <div className="gigcard">
        <Link to={`/product/${item._id}`} className="link">
        <img src={item.img} alt="" />
          </Link>
        <div className="info">
          <div className="user">
            <span>{item.title}</span>
          </div>
          <p>{item.shortDesc}</p>
          <div className="star">
            <img src="../../../public/img/star.png" alt="" />
          <span>{item.rating}</span>
          </div>
        </div>
        <hr />
        <div className="details">
        <span className="icon-button" onClick={handleAddToFav}>
                {isFavorite ? (
                  <Favorite className="favorite" />
                ) : (
                  <FavoriteBorder className="favorite" />
                )}
              </span>
          {/* <img src="../../../public/img/heart.png" alt="" /> */}
          <div className="price">
            <span>Starting At</span>
            <h2>{item.price} birr</h2>
          </div>
        </div>
      </div>
  );
};

export default Gigcard;
