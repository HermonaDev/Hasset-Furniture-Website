import React from "react";
import "./Footer.scss";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <footer className="footer">
      <div className="container">
        <div className="top">
                  <div className="item1">
                      <h3>Build your House</h3>
            <span>
              We bring quality artisanal goods from around the world right to your doorstep. Always ethically sourced and sustainably crafted
            </span>
          </div>
          <div className="item2">
            <h1>{t("Categories.1")}</h1>
            <span>{t("Bed.1")}</span>
            <span>{t("DiningTable.1")}</span>
            <span>{t("Sofa.1")}</span>
            <span>{t("Modern.1")}</span>
            <span>{t("Accessories.1")}</span>
          </div>
          <div className="item3">
            <h1>{t("About.1")}</h1>
            <span>{t("Our.1")}</span>
            <span>{t("Pages.1")}</span>
            <span>{t("Stores.1")}</span>
            <span>{t("Contact.1")}</span>
          </div>
          <div className="item4">
            <h1>{t("Help.1")}</h1>
            <span>FAQ</span>
            <span>{t("Terms.1")}</span>
            <span>{t("Us.1")}</span>
            <span>{t("Contact.1")}</span>
          </div>
          <div className="item5">
            <h1>{t("Newsletter.1")}</h1>
            <span>{t("Special.1")}</span>
                      <input type="text" placeholder="Email" />
                      <button>Subscribe</button>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <span className="logo">{t("Hasset.1")}</span>
            <span className="copyright">
              © {new Date().getFullYear()} {t("Copyright.1")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;