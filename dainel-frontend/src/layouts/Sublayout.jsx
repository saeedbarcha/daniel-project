import React from "react";
import FooterLast from "../components/admin/Footer";
import MainHeader from "../components/MainHeader";

const Sublayout = ({ children }) => {
  return (
    <>
      <MainHeader />
      <div className="editor-screen-main-layout-container">
        {children}
        </div>
      <FooterLast />
    </>
  );
};

export default Sublayout;
