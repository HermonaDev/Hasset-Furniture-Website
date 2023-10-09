import React, { useEffect, useState } from "react";
import "./Featured.scss";
import { useTranslation } from "react-i18next";
import { userRequest } from "../../requestMethods";
const Featured = ({ search, handleSearchChange }) => {    

  const { t, i18n } = useTranslation();
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>{t("HASSET.1")}</h1>
          <h2>{t("Brief.1")}</h2>
          <div className="search">
            <div className="searchInput">
              <img src="/img/search.png" alt="" />
              <input type="text" value={search} onChange={handleSearchChange} />
              {/* <input
                className="input"
                placeholder="Build your house..."
                onChange={(e) => {
                  setSearch(e.target.value.toLowerCase());
                }}
              /> */}
            </div>
            <button>{t("Search.1")}</button>
          </div>
        </div>
        {/**  <div className="right">
                    <img src="/img/man.png" alt="" />
                </div>**/}
      </div>
    </div>
  );
};

export default Featured;
