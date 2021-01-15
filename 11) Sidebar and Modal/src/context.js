import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // setting states
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // functions for modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // functions for sidebar
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        openModal,
        closeModal,
        openSidebar,
        closeSidebar,
        isModalOpen,
        isSidebarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook (must start with 'use')
export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
