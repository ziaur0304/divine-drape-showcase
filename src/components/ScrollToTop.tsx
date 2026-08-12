import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the window to the top whenever the route (pathname) changes.
 * Placed inside <BrowserRouter> so it has access to the router context.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use "instant" so the jump happens before paint — no visible flicker.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    // Also cover any scrollable containers that might retain position.
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
