import React, { useState } from "react";
import "./AssetsCard.css";
import trumpcard from "../../assets/card.jpeg";
import trumpAgreement from "../../assets/aggrement.png";
import trumpCertificate from "../../assets/certificate.jpeg";

const AssetsCard = ({ userData, isLoading, formatDate }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const getImageByPaymentSource = () => {
    const source = userData?.payment_source;
    switch (source) {
      case "TRUMP_CARD":
        return trumpcard;
      case "TRUMP_AGREEMENT":
        return trumpAgreement;
      case "TRUMP_CERTIFICATE":
        return trumpCertificate;
      default:
        return trumpCertificate;
    }
  };

  const getCardSizeClass = () => {
    const source = userData?.payment_source;
    switch (source) {
      case "TRUMP_CARD":
        return "card-sm";
      case "TRUMP_AGREEMENT":
        return "card-md";
      case "TRUMP_CERTIFICATE":
        return "card-lg";
      default:
        return "card-md";
    }
  };

  const handleImageClick = () => {
    setModalOpen(true);
    window.scrollTo({ top: 80, behavior: "smooth" });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const selectedImage = getImageByPaymentSource();
  const cardSizeClass = getCardSizeClass();

  return (
    <div className="assets-container">
      <div
        className={`card ${cardSizeClass} ${
          userData?.payment_source === "TRUMP_CARD" ? "trumpcard-bg" : ""
        }`}
        onClick={handleImageClick}
      >
        {userData?.payment_source !== "TRUMP_CARD" && (
          <img src={selectedImage} alt="Trump Document" />
        )}

        {userData?.payment_source === "TRUMP_CARD" && (
          <>
            <div className="card-text-overlay">
              <div className="top-left-text">
                <div className="trump-title">T R U M P</div>
                <div className="trump-subtitle-container">
                  <hr />
                  <div className="trump-subtitle">THE TRUMP ORGANIZATION</div>
                  <hr />
                </div>
              </div>

              <div className="bottom-right-text">VISA</div>
            </div>
            <div className="card-shine" />
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <button className="modal-close-button" onClick={closeModal}>
            &times;
          </button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Enlarged Document" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetsCard;
