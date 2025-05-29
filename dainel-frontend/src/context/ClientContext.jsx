import React, { createContext, useState } from 'react';

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [editMode, setEditMode] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  
  const startEdit = (affiliate) => {
    setEditMode(true);
    setCurrentClient(affiliate);
  };
  
  const cancelEdit = () => {
    setEditMode(false);
    setCurrentClient(null);
  };
  
  return (
    <ClientContext.Provider value={{ 
      editMode, 
      currentClient, 
      startEdit, 
      cancelEdit 
    }}>
      {children}
    </ClientContext.Provider>
  );
};