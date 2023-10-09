import { useEffect } from "react";

export function DisableScrollToTop(disable) {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY !== 0 && disable) {
        window.scrollTo(0, 0);
      }
    });
  }, []);
}