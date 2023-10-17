import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./cart.scss";
import {
  FavoriteBorder,
  ArrowBackIos,
  ArrowForwardIos,
  LocalShipping,
  DeleteOutlined,
} from "@material-ui/icons";
import { publicRequest, userRequest } from "../../requestMethods";
import Empty_Cart from "./Empty_Cart";

const Cart = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const user = currentUser ? true : false;
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  const [carts, setCarts] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartId, setCartId] = useState([]);
  const [products, setProducts] = useState([]);
  const refresh = () => window.location.reload(true);
  useEffect(() => {
    const getCarts = async () => {
      try {
        const res = await publicRequest.get("/carts/find/" + userId);
        setCarts(res.data);
        setCartId(res.data._id);
        setTotal(res.data.products.length)
        setProducts(res.data.products)
      } catch (err) {
        console.log(err);
      }
    };
    getCarts();
  }, [userId]);
  
  if (!carts || carts.length === 0) {
    return <div>Loading...</div>;
  }
  if (!cartId) {
    return null;
  }
  const subtotal = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  
  const handleDeleteProduct = (productId) => {
    const updatedCart = { ...carts };  
    const productIndex = updatedCart.products.findIndex(
      (product) => productId === productId
    );
    updatedCart.products.splice(productIndex, 1);
      setCarts(updatedCart);
  
    userRequest
      .put("/carts/" + cartId, updatedCart)
      .then((response) => {
        console.log("Cart updated:", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    refresh()
  };
 
  return (
    <div className="cart-page">
      {products.length === 0 ? (
        <Empty_Cart />) : (
        <div className="main-container">
          <div className="header">
            <button className="btn" onClick={handleClick}>
              <ArrowBackIos className="arrow1" />
              Continue Shopping
            </button>
            <h1>Shopping Cart</h1>
            <Link to="/success">
              <button className="buton">
                Place order
                <ArrowForwardIos className="arrow2" />
              </button>
            </Link>
          </div>
          <div className="flex">
            <div className="product">
              <div className="item">
                <table>
                  <thead>
                    <tr className="head">
                      <th> ID</th>
                      <th>Image</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product,index) => (
                      <tr key={product.productId} index={index}>
                        <td className="idd">{product.productId}</td>
                        <td className="img">
                          <img src={product.img} alt="" />
                        </td>
                        <td className="quantity">{product.quantity}</td>
                        <td className="price">
                          {product.price * product.quantity} ETB
                        </td>
                        
                        <td>
                          <button
                            onClick={() => handleDeleteProduct(product.productId)}
                          >
                            <DeleteOutlined />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr />
              </div>
            </div>
            <div className="pay">
              <div className="make">
                <div className="coupon">
                  <span>Have Coupon?</span>
                  <input type="text" placeholder="Coupon Code" />
                </div>
                <button>Apply</button>
              </div>
              <div className="total">
                <div className="totalitem">
                  <span>Total Items:</span>
                  <span>{total}</span>
                </div>
                <div className="totalprice">
                  <span>Total Price:</span>
                  <span>{subtotal} ETB</span>
                </div>
                <div className="discounts">
                  <span>Discount:</span>
                  <span>None </span>
                </div>
                
                <hr />
                <div className="images">
                  <div className="totalpay">
                    <span>Total:</span>
                    <span className="spn">{subtotal} ETB</span>
                  </div>
                  {/* <img
                    src="https://ecrlib.org/wp-content/uploads/2023/03/PayPal-Logo.png"
                    alt=""
                  />
                  <img
                    src="https://usa.visa.com/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg"
                    alt=""
                  />
                  <img
                    src="https://freepngimg.com/thumb/mastercard/14-2-mastercard-download-png.png"
                    alt=""
                  />
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                  /> */}
                </div>
              </div>
            </div>{" "}
          </div>
          <div className="delivery">
            <div className="local">
              <LocalShipping className="loc" />
            </div>
            <div className="spn">
              <span>Delivery within 1-2 weeks</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
