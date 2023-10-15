import "./product.scss";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { publicRequest, userRequest } from "../../requestMethods";
import {
  FavoriteBorder,
  Favorite,
  Add,
  DragHandle,
  Share,
  StraightenOutlined,
  ColorLensOutlined,
  BuildOutlined,
  ShoppingCart,
  Flag,
  HomeOutlined,
  RateReview,
} from "@material-ui/icons";
import PathIndicator from "../../components/pathIndicator/PathIndicator";
import ImageGallery from "../../components/imageGallery/ImageGallery";
import Container from "../../components/related/Container";
import ColorSelector from "../../components/colorSelector/ColorSelector";
import Rate from "../../components/Rate/Rate";

function Product({ product }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser ? currentUser._id : null;
  const refresh = () => window.location.reload(true);
  const [quantity, setQuantity] = useState(1);
  const productId = useParams().id;
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [wishlists, setWishlists] = useState([]);
  const [wishlistId, setWishlistId] = useState([]);

  //For hidding and revealing content
  const handleToggle = () => {
    setIsFavorite(!isFavorite);
  };
  //for color selector
  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

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

  //for share button
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this furniture!",
          text: "I found this amazing furniture from Hasset Furniture website. Take a look!",
          url: "https://www.example.com/furniture",
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      console.log("Sharing not supported on this browser");
    }
  };

  //for quantity modifier

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const increaseQuantity = () => {};

  async function checkItem(productId) {
    try {
      const response = await userRequest.get(`/wishlists/find/${userId}`);
      const existingWishlist = response.data;

      if (existingWishlist) {
        const existingProduct = existingWishlist.products.some(
          (item) => item.productId === productId
        );
        return { existingProduct, existingWishlist }; // Return an object with the values
      }
      return { existingProduct: false, existingWishlist: null }; // Return default values if wishlist doesn't exist
    } catch (error) {
      console.log("Error checking if item exists in wishlist:", error);
      return { existingProduct: false, existingWishlist: null }; // Return default values in case of error
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      setQuantity(quantity + 1);
      const result = await checkItem(productId);
      console.log(result.existingProduct);
      try {
        const res = await publicRequest.get("/products/find/" + productId);
        setProducts(res.data);
        setPrice(res.data.price);
        const result = await checkItem(productId);
        setIsFavorite(result.existingProduct);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [productId]);
  //For favorite Button
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

  useEffect(() => {
    const getItems = async () => {
      try {
        const res1 = await publicRequest.get("/products");
        const filteredItems = res1.data.filter(
          (item) =>
            item.categories !== products.categories && item._id !== products._id
        );
        const num1 = Math.floor(Math.random() * filteredItems.length);
        const num2 = num1 + 2
         
        setItems(filteredItems.slice(num1, num2));
      } catch (err) {
        console.log(err);
      }
    };
    getItems();
  }, [products]);
  
  if (!products || products.length === 0) {
    return <div>Loading...</div>;
  }
  if (!items || items.length === 0) {
    return <div>Fetching Data...</div>;
  }
  const packagePrice =
    ((items[0].price + items[1].price + products.price) * 0.90).toFixed(0);

  //for path indicator
  const steps = ["Furniture /", `${products.categories}`];
  const currentStep = 1;

  //for on sale proucts percent off
  function calculatePercentageOff(sellingPrice, discountPrice) {
    // Calculate the percentage off
    const difference = sellingPrice - discountPrice;
    const percentOff = (difference / sellingPrice) * 100;
    // Round the percentage to two decimal places
    const roundedPercentOff = percentOff.toFixed(0);
    return roundedPercentOff;
  }
  const sellingPrice = products.price;
  const discountPrice = products.discountPrice;
  const percentOff = calculatePercentageOff(discountPrice, sellingPrice);
  const img = products.mainImg;
  const showAlert = () => {
    window.alert("Product found in Cart!");
  };
  const showSuccess = () => {
    window.alert("Product Successfully added to Cart!");
  };

  //To handle cart
  const handleAddToCart = async () => {
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
                  quantity,
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
          // If the user does not have an existing cart, create a new cart with the product information
          const newCart = {
            userId,
            products: [
              {
                productId,
                img,
                quantity,
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
    // refresh();
  };
  //handle is favorite
  const handleAddToFav = async () => {
    await userRequest
      .get("/wishlists/find/" + userId)
      .then((response) => {
        if (response.data) {
          const existingWishlist = response.data;
          const existingProduct = existingWishlist.products.find(
            (item) => item.productId === productId
          );

          if (existingProduct) {
            // setIsFavorite(true)
            console.log("Product already marked as favorite");
          } else {
            // If the user has an existing cart, update it with the new product information
            const wishlistId = existingWishlist._id;
            const updatedWishlist = {
              products: [
                ...existingWishlist.products,
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
          }
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
    // navigate("/wislist/userId");
  };

  const handleRemoveFav = (productId) => {
    const updatedWishlist = { ...wishlists };
    const productIndex = updatedWishlist.products.findIndex(
      (product) => productId === productId
    );
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
    handleToggle();
  };

  return (
    <>
      <Link to="/">
        <div className="back">
          <HomeOutlined />
          Home
        </div>
      </Link>
      {/* <div className="search">
        <img src="/img/search.png" alt="" />
        <input type="text" placeholder="Build your house" />
        <button>Search</button>
      </div> */}
      <PathIndicator
        className="path-indicator"
        steps={steps}
        currentStep={currentStep}
      />
      <div className="container">
        <div className="left-column">
          <div className="title">
            <span className="name">
              <b>{products.title}</b>
              {/* <b>LINANAS</b> */}
            </span>
            <div className="tnc">
              <span className="type">{products.categories},</span>
              <span className="color">
                {products.color.map((color, index) => (
                  <span className="type" key={index}>
                    {" "}
                    {color},{" "}
                  </span>
                ))}
              </span>
            </div>
          </div>
          <div className="sub-head">
            <div className="rating">{renderRatingStars(products.rating)}</div>
            <span className="rate">{products.rating}</span>
            <Link to="/reviews" className="a">
              4 Reviews
            </Link>
            <Share className="icn" onClick={handleShare} />{" "}
            <span className="link" onClick={handleShare}>
              Share
            </span>
            {/* <Link to={`/wishlist/${userId}`}> */}
            <span className="icon-button">
              {isFavorite ? (
                <Favorite
                  className="favorite"
                  onClick={() => handleRemoveFav(products.productId)}
                />
              ) : (
                <FavoriteBorder className="favorite" onClick={handleAddToFav} />
              )}
            </span>
            <span onClick={handleAddToFav} className="link">
              Save
            </span>
            {/* </Link> */}
          </div>

          <div className="image-container">
            <ImageGallery
              className="image-gallery"
              selectedColor={selectedColor}
            />
          </div>
          <div className="desc-container">
            <div className="product-detail">
              <span>
                <b> Product Overview</b>
              </span>
              <hr />
              <p>{products.desc}</p>

              <hr />
              <div className="more-detail">
                <div className="cont">
                  <StraightenOutlined className="mark" />
                  <span className="titles">
                    <b>Dimension </b>
                  </span>
                  <span> {products.size}</span>
                  {/* <span> 137 cm x 80 cm</span> */}
                </div>
                <div className="cont">
                  <BuildOutlined className="mark" />
                  <span className="titles">
                    <b>Material </b>
                  </span>
                  <span> {products.material}</span>
                  {/* <span> Polyster</span> */}
                  <br />
                </div>
                <div className="cont">
                  <ColorLensOutlined className="mark" />
                  <span className="titles">
                    <b>Choose Color</b>
                  </span>
                  <ColorSelector
                    selectedColor={selectedColor}
                    className="color-selector"
                    handleColorSelection={handleColorSelection}
                  />
                </div>
              </div>
              {/* <hr /> */}
            </div>
            <div className="other-detail">
              <span className="price">
                <b>{products.price} ETB</b>
                {/* <b>19,000 ETB</b> */}
              </span>
              <br />
              {products.onSale ? (
                <div className="disc">
                  <span className="sale">On Sale!</span>
                  <span className="discount-price">
                    {products.discountPrice}
                  </span>
                  <span className="p-off">{percentOff}%</span>
                </div>
              ) : null}

              <br />
              {/* <span className="discount-price"> 22,000 ETB</span> */}
              <hr />

              <div className="quantity-specifier">
                <button className="quantity-button" onClick={decreaseQuantity}>
                  -
                </button>
                <input
                  type="number"
                  className="quantity-input"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  readOnly
                />
                <button className="quantity-button" onClick={increaseQuantity}>
                  +
                </button>
              </div>
              <button
                data-back="Add to Cart"
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="data-front" />
              </button>
              <div className="report">
                <Flag className="icnw" />
                <span className="link">
                  <b> Report this Listing</b>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="right-column">
          <Container />
        </div>
      </div>
      {/* <hr /> */}

      <div className="package-container">
        <hr />
        <Link to="/discount" className="link">
          <span className="package-header">
            <br />
            <b>Exclusive Discount Package</b>
          </span>
        </Link>
        <div className="discount-packages">
          <div className="package">
            <img src={products.img[0]} alt="" />
            <div className="detail">
              <span>
                <b>{products.title}</b>
              </span>
            </div>
            <div className="more-info">
              <span>
                {products.categories}
                <br />
                <b> {products.price} ETB</b>
              </span>
            </div>
          </div>
          <div className="discount-packages">
            {items.map((pck) => (
              <>
                <Add className="icon" />
                <div className="package">
                  <img src={pck.img} alt="" />
                  <div className="detail">
                    <b>{pck.title}</b>
                    <div className="more-info">
                      <span>
                        {pck.categories} <br />
                        <b>{pck.price}ETB</b>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ))}
            <DragHandle className="icon" />
            <div className="offer">
              <Link to="/cart" className="link">
                <span className="dtl">claim offer for 10% off with only</span>
                <button className="discount-btn">
                  <span>
                    {packagePrice} ETB</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <Rate />
      <hr />
    </>
  );
}

export default Product;
