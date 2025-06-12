import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";
import { VscIssueReopened } from "react-icons/vsc";
import "./Header.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import trumplogo from "../../assets/background.jpg";
import trumplogo_sm from "../../assets/trumplogo-sm.jpg";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoutClick = async () => {
    setIsLoading(true);
    try {
      localStorage.clear();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="header-container">
    

      <div className="header-box header-img">
        {/* <img src={trumplogo} alt="Logo" className="desktop-logo" width={170} height={90} /> */}
        <img src={trumplogo_sm} alt="Logo" className="desktop-logo" width={146} height={70} />
        
        <img src={trumplogo_sm} alt="Mobile Logo" className="mobile-logo" width={146} height={70} />
      </div>

      <div className="header-box right-align">
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
      </div>

      <div className="nav-wrapper">
        <div className={`nav-sections ${isMenuOpen ? "open" : ""}`}>
          <button><FaStar /> Premium Payment Plan</button>
          <button><VscIssueReopened /> Regular Payment Plan</button>
          <button><AiFillMessage /> Contact Agent</button>
          <button onClick={handleLogoutClick} disabled={isLoading}>
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
