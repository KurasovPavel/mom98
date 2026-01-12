import { useEffect, useState } from "react";
import { layout } from "../config/layout";

const MOBILE_BREAKPOINT = 768;

export const useResponsiveLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return isMobile ? layout.mobile : layout.desktop;
};
