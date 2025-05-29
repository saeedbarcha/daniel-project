import React from "react";
import { FaStar } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";
import { VscIssueReopened } from "react-icons/vsc";
import "./Header.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogoutClick = async () => {
    setIsLoading(true);
    try {
      // Clear localStorage and dispatch logout action
      localStorage.clear();
      dispatch(logout());
      navigate("/"); // Admins go to admin login
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="header-container">
      <h2>Welcome, {userInfo?.user?.name || userInfo?.name || "Client"}</h2>

      <div className="nav-sections">
        <button style={{ fontSize: "14px" }}>
          <FaStar style={{ fontSize: "16px" }} /> Premium Payment Plan
        </button>
        <button style={{ fontSize: "14px" }}>
          <VscIssueReopened style={{ fontSize: "18px" }} /> Rugular Payement
          Plan
        </button>
        <button style={{ fontSize: "14px" }}>
          <AiFillMessage style={{ fontSize: "16px" }} /> Contact Agent{" "}
        </button>

        <button
          style={{ fontSize: "14px" }}
          onClick={handleLogoutClick}
          disabled={isLoading}
        >
          {isLoading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Header;
