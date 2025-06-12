import React, { useState } from 'react';
import './AssetsCard.css';
import trumpcard from '../../assets//trumpcard.png';
import trumpAgreement from '../../assets/trump agrement.png';
import trumpCertificate from '../../assets/trump-certificate.png';

const AssetsCard = ({userData, isLoading, formatDate}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const getImageByPaymentSource = () => {
    const source = userData?.payment_source;
    switch (source) {
      case 'TRUMP_CARD':
        return trumpcard;
      case 'TRUMP_AGREEMENT':
        return trumpAgreement;
      case 'TRUMP_CERTIFICATE':
        return trumpCertificate;
      default:
        return trumpCertificate;
    }
  };

  const handleImageClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const selectedImage = getImageByPaymentSource();

  return (
    <div className="assets-container">
      <div className="card" onClick={handleImageClick}>
        <img src={selectedImage} alt="Trump Document" />
      </div>

     {isModalOpen && (
  <div className="modal-overlay" onClick={closeModal}>
    {/* Close button */}
    <button className="modal-close-button" onClick={closeModal}>
      &times;
    </button>

    {/* Modal content, click inside won't close */}
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <img src={selectedImage} alt="Enlarged Document" />
    </div>
  </div>
)}

    </div>
  );
};

export default AssetsCard;
