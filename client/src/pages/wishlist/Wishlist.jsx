import React, { useEffect, useState } from "react";
import "./wishlist.scss";
import { Favorite } from "@material-ui/icons";
import { Delete } from "@material-ui/icons";
import { Email } from "@material-ui/icons";
import EmptyWishlist from "./Empty_Wishlist";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRequest, userRequest } from "../../requestMethods";
import Empty_Wishlist from "./Empty_Wishlist";
const Wishlist = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  const [wishlists, setWishlists] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistId, setWishlistId] = useState([]);
  useEffect(() => {
    const getWishlists = async () => {
      try {
        const res = await publicRequest.get("/wishlists/find/" + userId);
        setWishlists(res.data);
        setWishlistId(res.data._id);
      } catch (err) {
        console.log(err);
      }
    };
    getWishlists();
  }, [userId]);
  const products = wishlists.products;

  const handleDeleteFav = (productId) => {
    const updatedWishlist = { ...wishlists };
    console.log(updatedWishlist);
    const productIndex = updatedWishlist.products.findIndex(
      (product) => productId === product.productId
    );
    console.log(productIndex)
    updatedWishlist.products.splice(productIndex, 1);
    setWishlists(updatedWishlist);

    userRequest
      .put("/wishlists/" + wishlistId, updatedWishlist)
      .then((response) => {
        console.log("Wishlist updated:", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const refresh = () => window.location.reload(true);
  const showAlert = () => {
    window.alert("Product found in Cart!");
  };
  const showSuccess = () => {
    window.alert("Product Successfully added to Cart!");
  };
  //To handle cart
  const handleAddToCart = async (productId, img, price) => {
    await userRequest
      .get("/carts/find/" + userId)
      .then((response) => {
        if (response.data) {
          const existingCart = response.data;
          const existingProduct = existingCart.products.find(
            (item) => item.productId === productId
          );
          if (existingProduct) {
            showAlert();
          } else {
            // If the user has an existing cart, update it with the new product information
            const cartId = existingCart._id;
            const updatedCart = {
              products: [
                ...existingCart.products,
                {
                  productId,
                  img,
                  price,
                },
              ],
            };
            userRequest
              .put("/carts/" + cartId, updatedCart)

              .then((response) => {
                console.log("Cart updated:", response.data);
              })
              .catch((error) => {
                console.log(error);
              });
            refresh();
            showSuccess();
          }
        } else {
          const newCart = {
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
            .post("/carts", newCart)
            .then((response) => {
              console.log("Cart created:", response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (!wishlists || wishlists.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wishlist">
      {products.length === 0 ? (
        <Empty_Wishlist />
      ) : (
        <div className="container">
          <div className="top">
            <Favorite className="fav" />
            <h1>My Wishlist</h1>
          </div>
          <div className="middle">
            {products.map((product) => (
              <div className="list0">
                <div className="image" key={product.productId}>
                  <img src={product.img} alt="" />
                </div>
                <div className="desc">
                  <h1>{product.title}</h1>
                  <div className="desc1">
                    <span>Added on:</span>
                    <span>{product.createdAt.slice(0, 10)}</span>
                  </div>
                  <div className="desc2">
                    <span>Price:</span>
                    <span>{product.price}</span>
                  </div>
                  <div className="desc3">
                    <span>Stock:</span>
                    <span>
                      {product.inStock ? "In Stock" : "Out of Stock"}{" "}
                    </span>
                  </div>
                  <div className="desc5">
                    <button
                      onClick={() =>
                        handleAddToCart(
                          product.productId,
                          product.img,
                          product.price
                        )
                      }
                    >
                      Add to cart
                    </button>
                    <Delete
                      className="delete"
                      onClick={() => handleDeleteFav(product.productId)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bottom">
            <div className="ask">
              <button>
                <div className="for">
                  <div className="email">
                    <Email />
                  </div>
                  Ask for an estimate
                </div>
              </button>
            </div>
            <div className="add">
              <button>
               
                Add all to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
