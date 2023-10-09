import React, { useContext, useEffect, useState } from "react";
import {Badge, Tooltip } from "@material-ui/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import {
  AddShoppingCart,
  Explore,
  ExploreOffOutlined,
  ExploreOutlined,
  Favorite,
  FavoriteBorderOutlined,
  LanguageOutlined,
} from "@material-ui/icons";
import newRequest from "../../utils/newRequest";
import { publicRequest, userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [openL, setOpenL] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  const refresh = () => window.location.reload(true);

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const user = currentUser ? true : false;
  const userId = user ? currentUser._id : null;

  const { t, i18n } = useTranslation();
  function handleClick(lang) {
    i18n.changeLanguage(lang);
  }
  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      refresh()
    } catch (err) {
      console.log(err);
    }
  };
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const getTotal = async () => {
      try {
        const res = await publicRequest.get("/carts/find/" + userId);
        setTotal(res.data.products.length)
      } catch (err) {
        console.log(err);
      }
    };
    getTotal();
  }, [userId]);
  const CheckCart = async () => {
    await userRequest
      .get("/carts/find/" + userId)
      .then((response) => {
        if (response.data) {
          // If the user has an existing cart, update it with the new product information
          navigate(`/cart/${userId}`);
          console.log("cart present");
          setTotal(response.data.products.length)      
          
        } else {
          navigate("/emptycart");
          console.log("cart absent");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(total);
  const CheckFav = async () => {
    await userRequest
      .get("/wishlists/find/" + userId)
      .then((response) => {
        if (response.data) {
          // If the user has an existing cart, update it with the new product information
          navigate(`/wishlist/${userId}`);
          console.log("Wishlist present");
        } else {
          navigate("/emptywishlist");
          console.log("cart absent");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="h-container">
        <div className="logo">
          <Link to="/" className="link">
            <img src="/img/logo.png" alt="" />
          </Link>
        </div>
        <div className="links">
          <Tooltip className="my-tooltip" title="Cart">
            {/* <Badge badgeContent={quantity} color="primary" overlap="rectangular"> */}
            <Badge badgeContent={total} color="primary" overlap="rectangular">
              <AddShoppingCart className="cart" onClick={CheckCart} />
            </Badge>
          </Tooltip>
          <Link className="link" to={`/wishlist/${userId}`}>
            <Tooltip className="my-tooltip" title="Wishlist">
              <FavoriteBorderOutlined className="cart" onClick={CheckFav} />
            </Tooltip>
          </Link>
          <Link to="/explore" className="link">
            <Tooltip className="my-tooltip" title="Explore">
              <ExploreOutlined className="cart" />
            </Tooltip>
            {/* <span>{t("Explore.1")}</span> */}
          </Link>
          <div className="lang-menu">
            <div className="selected-lang" onClick={() => setOpenL(!openL)}>
              <Tooltip className="my-tooltip" title="Language">
                <LanguageOutlined className="cart" />
              </Tooltip>
            </div>
            {openL && (
              <ul className="submenu">
                <li>
                  <a
                    href="#"
                    className="link"
                    onClick={() => handleClick("en")}
                  >
                    English
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="link"
                    onClick={() => handleClick("fr")}
                  >
                    French
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="link"
                    onClick={() => handleClick("አማ")}
                  >
                    አማርኛ
                  </a>
                </li>
              </ul>
            )}
          </div>

          {!currentUser && (
            <button>
              <Link to="/login" className="link">
                <span>{t("Sign in.1")}</span>
              </Link>
            </button>
          )}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  <Link className="link" to="/myAccount">
                    {t("My Account.1")}
                  </Link>
                  <Link className="link" to="/myOrder">
                    {t("My Orders.1")}
                  </Link>
                  {/* <Link className="link" to={`/wishlist/${userId}`}>
                    {t("Lists.1")}
                  </Link> */}
                  <Link className="link" to="/login" onClick={handleLogout}>
                    {t("Logout.1")}
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
