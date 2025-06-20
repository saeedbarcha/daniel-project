import React, { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";
import { VscIssueReopened } from "react-icons/vsc";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";
import trumplogo from "../../assets/background.jpg";
import trumplogo_sm from "../../assets/trumplogo-sm.jpg";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navRef = useRef(null); 

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="container-client-header">
      <div className="header-same-size right-align">
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
        <div className="header-box heading-box">
          <h2 className="welcome-text">
            Welcome, {userInfo?.user?.name || userInfo?.name || "Client"}
          </h2>
        </div>
      </div>

      <div className="header-box header-img">
        <img
          src={trumplogo_sm}
          alt="Logo"
          className="desktop-logo"
          width={214}
          height={90}
        />
        <img
          src={trumplogo_sm}
          alt="Mobile Logo"
          className="mobile-logo"
          width={160}
          height={70}
        />
      </div>

      <div className="header-same-size">
        <div ref={navRef} className={`nav-sections ${isMenuOpen ? "open" : ""}`}>
          <div className="sidbar-image-header">
            {/* <div className="sidebar-close" onClick={() => setIsMenuOpen(false)}>
              ☰
            </div> */}
            <div>
              <img
                src={trumplogo}
                alt="Mobile Logo"
                className="bar-image"
                width={160}
                height={70}
              />
            </div>
          </div>

          <button>
            <FaStar /> Premium Payment Plan
          </button>
          <button>
            <VscIssueReopened /> Regular Payment Plan
          </button>
          <button>
            <AiFillMessage /> Contact Agent
          </button>
          <button onClick={handleLogoutClick} disabled={isLoading}>
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
