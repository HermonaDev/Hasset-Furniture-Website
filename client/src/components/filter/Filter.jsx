import React from "react";
import "./filter.scss";
import animation from "../../../public/Animation/animation_llgdtb1w.json";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Filter = ({ categories }) => {
  const { t, i18n } = useTranslation();
  let component;
  switch (categories) {
    case "Sofa":
      component = (
        <div>
          <Link to="/">
            <button className="btn1">{t("All.1")}</button>
          </Link>
          <Link to="/Sofa">
            <button className="btn2">{t("Sofa.1")}</button>
          </Link>
          <Link to="/Bed">
            <button className="btn1">{t("Bed.1")}</button>
          </Link>
          <Link to="/Table">
            <button className="btn1">{t("DiningTable.1")}</button>
          </Link>
          <Link to="/Chair">
            <button className="btn1">{t("Chair.1")}</button>
          </Link>
          <Link to="/Decorations">
            <button className="btn1">{t("Decorations.1")}</button>
          </Link>
        </div>
      );
      break;
    case "Bed":
      component = (
        <div>
          <Link to="/">
            <button className="btn1">{t("All.1")}</button>
          </Link>
          <Link to="/Sofa">
            <button className="btn1">{t("Sofa.1")}</button>
          </Link>
          <Link to="/Bed">
            <button className="btn2">{t("Bed.1")}</button>
          </Link>
          <Link to="/Table">
            <button className="btn1">{t("DiningTable.1")}</button>
          </Link>
          <Link to="/Chair">
            <button className="btn1">{t("Chair.1")}</button>
          </Link>
          <Link to="/Decorations">
            <button className="btn1">{t("Decorations.1")}</button>
          </Link>
        </div>
      );
      break;
    case "Table":
      component = (
        <div>
          <Link to="/">
            <button className="btn1">{t("All.1")}</button>
          </Link>
          <Link to="/Sofa">
            <button className="btn1">{t("Sofa.1")}</button>
          </Link>
          <Link to="/Bed">
            <button className="btn1">{t("Bed.1")}</button>
          </Link>
          <Link to="/Table">
            <button className="btn2">{t("DiningTable.1")}</button>
          </Link>
          <Link to="/Chair">
            <button className="btn1">{t("Chair.1")}</button>
          </Link>
          <Link to="/Decorations">
            <button className="btn1">{t("Decorations.1")}</button>
          </Link>
        </div>
      );
      break;
    case "Chair":
      component = (
        <div>
          <Link to="/">
            <button className="btn1">{t("All.1")}</button>
          </Link>
          <Link to="/Sofa">
            <button className="btn1">{t("Sofa.1")}</button>
          </Link>
          <Link to="/Bed">
            <button className="btn1">{t("Bed.1")}</button>
          </Link>
          <Link to="/Table">
            <button className="btn1">{t("DiningTable.1")}</button>
          </Link>
          <Link to="Chair">
            <button className="btn2">{t("Chair.1")}</button>
          </Link>
          <Link to="/Decorations">
            <button className="btn1">{t("Decorations.1")}</button>
          </Link>
        </div>
      );
      break;
    case "Decorations":
      component = (
        <div>
          <Link to="/">
            <button className="btn1">{t("All.1")}</button>
          </Link>
          <Link to="/Sofa">
            <button className="btn1">{t("Sofa.1")}</button>
          </Link>
          <Link to="/Bed">
            <button className="btn1">{t("Bed.1")}</button>
          </Link>
          <Link to="/Table">
            <button className="btn1">{t("DiningTable.1")}</button>
          </Link>
          <Link to="/Chair">
            <button className="btn1">{t("Chair.1")}</button>
          </Link>
          <Link to="/Decorations">
            <button className="btn2">{t("Decorations.1")}</button>
          </Link>
        </div>
      );
      break;
    default:
      component = (
        <div>
          <Link to="/">
            <button className="btn2">{t("All.1")}</button>
          </Link>
          <Link to="/Sofa">
            <button className="btn1">{t("Sofa.1")}</button>
          </Link>
          <Link to="/Bed">
            <button className="btn1">{t("Bed.1")}</button>
          </Link>
          <Link to="/Table">
            <button className="btn1">{t("DiningTable.1")}</button>
          </Link>
          <Link to="/Chair">
            <button className="btn1">{t("Chair.1")}</button>
          </Link>
          <Link to="/Decorations">
            <button className="btn1">{t("Decorations.1")}</button>
          </Link>
        </div>
      );
      break;
  }
  return (
    <div className="ctitle">
      {" "}
      {/* <DisableScrollToTop /> */}
      {component}
    </div>
  );
};

export default Filter;
