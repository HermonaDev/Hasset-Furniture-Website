import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!shouldDisableScrolling()) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const shouldDisableScrolling = () => {
    // Check if current page is one where scrolling should be disabled
    if (
      pathname === "/Bed" ||
      pathname === "/Chair" ||
      pathname === "/Table" ||
      pathname === "/Sofa" ||
      pathname === "/Decorations"
    ) {
      return true;
    }

    // Check if any filter components are present
    const filterComponents =
      document.getElementsByClassName("filter-component");
    if (filterComponents.length > 0) {
      return true;
    }

    return false;
  };

  return null;
};

export default ScrollToTop;

// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// }

// export default ScrollToTop;
