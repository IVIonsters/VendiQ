/* eslint-disable no-unused-vars */
import React from "react";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import { useWindowSize } from "../hooks/useWindowSize";

function Header() {
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768;

  return (
    <div>
      {isMobile ? <MobileHeader /> : <DesktopHeader />}
    </div>
  );
}

export default Header;