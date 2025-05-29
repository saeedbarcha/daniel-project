import React from "react";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { Avatar, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  // Determine which user info to display based on route
  const shouldShowName = location.pathname.includes("affiliates-page");
  const displayText = shouldShowName 
    ? userInfo?.user?.name || userInfo?.name || "User" 
    : userInfo?.user?.role || "Admin";

  const userInitial = (shouldShowName 
    ? userInfo?.user?.name?.charAt(0) || userInfo?.name?.charAt(0) || "U"
    : userInfo?.user?.role?.charAt(0) || "A"
  ).toUpperCase();

  const handleLogoutClick = async () => {
    setIsLoading(true);
    try {
      localStorage.clear();
      dispatch(logout());
      navigate("/admin-login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => console.log("Settings clicked")}>
        <Link to={"/profile-page"} style={{textDecoration:"none"}}>
            Settings
        </Link>    
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={handleLogoutClick}
        danger
        disabled={isLoading}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className="d-flex justify-content-between align-items-center border rounded p-3 bg-white shadow-sm mx-auto responsive-container"
          >
      {/* Logo Container */}
      <div className="d-flex align-items-center">
        <img
          src={logo}
          alt="Logo"
          style={{
            height: "60px",
            width: "60px",
            objectFit: "contain",
            borderRadius: "50%",
            border: "1px solid #e2e8f0",
            padding: "2px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        />
      </div>

      <div className="d-flex align-items-center">
        <div>
          <h4 style={{ marginRight: "10px", marginTop: "9px" }}>
            {displayText}
          </h4>
        </div>
        <div>
          {/* User Avatar with Dropdown */}
          <Dropdown overlay={menu} trigger={["click"]}>
            <div
              className="d-flex align-items-center"
              style={{ cursor: "pointer" }}
            >
              <Avatar
                style={{
                  backgroundColor: "#3b82f6",
                  color: "white",
                  fontWeight: "bold",
                  marginRight: "14px",
                }}
                size="medium"
              >
                {userInitial}
              </Avatar>
              <DownOutlined className="mr-4" style={{ color: "#64748b" }} />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;