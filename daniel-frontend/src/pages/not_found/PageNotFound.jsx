// pages/PageNotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#f8f9fa",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "5rem", color: "#dc3545" }}>404</h1>
      <p style={{ fontSize: "1.5rem" }}>Oops! The page you are looking for does not exist.</p>
      <Link to="/" style={{ marginTop: "20px", fontSize: "1rem", color: "#007bff" }}>
        Go back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
