import React, { createContext, useState } from 'react';

export const AffiliateContext = createContext();

export const AffiliateProvider = ({ children }) => {
  const [editMode, setEditMode] = useState(false);
  const [currentAffiliate, setCurrentAffiliate] = useState(null);
  
  const startEdit = (affiliate) => {
    setEditMode(true);
    setCurrentAffiliate(affiliate);
  };
  
  const cancelEdit = () => {
    setEditMode(false);
    setCurrentAffiliate(null);
  };
  
  return (
    <AffiliateContext.Provider value={{ 
      editMode, 
      currentAffiliate, 
      startEdit, 
      cancelEdit 
    }}>
      {children}
    </AffiliateContext.Provider>
  );
};