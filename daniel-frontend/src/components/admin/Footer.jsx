import React, { useEffect, useState } from "react";
import { MdChangeCircle } from "react-icons/md";
import "./Footer.css";

const FooterLast = () => {
  const [paraChange, setParaChange] = useState(false);

  const handleClickToggleButton = () => {
    setParaChange((prev) => !prev);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setParaChange((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="footer-last-container">
      <p className="text-center text-sm text-white py-4">
        © {new Date().getFullYear()} Company Name. All rights reserved.
      </p>
    </div>
  );
};

export default FooterLast;
