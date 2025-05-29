import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./affiliatesheader.css";
const HeaderAffiliates = () => {
  const { userInfo } = useSelector((state) => state.auth);


 

  return (
    <div className="affiliate-header">
      <div className="header-container">
        <div>
          <h1>Client Management</h1>
        </div>
        
      </div>
      <div className="header-welcome-text">
        <h4>
          Welcome, {userInfo?.user?.name || userInfo?.name || "Affiliate"}
        </h4>
        <p>Manage your clients and track your progress</p>
      </div>
    </div>
  );
};

export default HeaderAffiliates;
