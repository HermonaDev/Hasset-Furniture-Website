import React, { useState } from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import Gigs from "../gigs/Gigs";
import Slider from "../../components/slider/Slider";
import Lootie from "lottie-react";
import animationData from "../../../public/Animation/animation_llge9v41.json";
import animation from "../../../public/Animation/animation_llgdtb1w.json";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Filter from "../../components/filter/Filter";
import { userRequest } from "../../requestMethods";

const Home = () => {
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const [search, setSearch] = useState("");
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const categories = location.pathname.split("/")[1];
  const navigate = useNavigate();
  // const [filters, setFilters] = useState({});
  // const handleFilters = (e) => {
  //   const value = e.target.value;
  //   setFilters({
  //     [e.target]: value,
  //   });
  // };
  const [visible, setvisible] = useState(4);
  
  return (
    <div className="home">
      <Featured search={search} handleSearchChange={handleSearchChange} />
      <div className="filter">
        <span className="breadcrumbs">{t("Design.1")}</span>
        <div className="container1">
          <h1>{t("Product.1")}</h1>
        </div>
        <p>{t("Boundaries.1")}</p>
        <div className="f-title">
          <Filter categories={categories} />
        </div>
      </div>
      <Gigs categories={categories} search={search} />

      <div className="description1">
        <div className="container2">
          <div className="item1">
            <h1>{t("Furniture.1")}</h1>
            <h2>{t("Business.1")}</h2>
            <p>{t("Home.1")}</p>
            <div className="title1">
              <img src="./img/check.png" alt="" />
              {t("Shop.1")}
            </div>

            <div className="title1">
              <img src="./img/check.png" alt="" />
              {t("Get.1")}
            </div>

            <div className="title1">
              <img src="./img/check.png" alt="" />
              {t("Use.1")}
            </div>
            <Link to="/explore" className="link">
              <button>{t("Btn.1")}</button>
            </Link>
          </div>
          <div className="item1">
            <Lootie className="lootie" animationData={animationData} />
          </div>
        </div>
      </div>
      <hr />
      <Slider className="slider"/>
      <div className="discount-sec">
        <div className="container2">
          <Lootie className="lootie" animationData={animation} />
          <div className="item2">
            <h1>{t("Discount.1")}</h1>
            <h2>{t("Join.1")}</h2>
            <div className="title2">
              <input type="text" placeholder="Your email address" />
              <Link to="/discount" className="link">
                <button>{t("Now.1")}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
