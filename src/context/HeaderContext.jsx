import React, { createContext, useState, useContext } from 'react';

// Create the context
export const HeaderContext = createContext();

// Provider component
export const HeaderProvider = ({ children }) => {
    const [category, setCategory] = useState('');

    return (
        <HeaderContext.Provider value={{ category, setCategory }}>
            {children}
        </HeaderContext.Provider>
    );
};

// Custom hook for easier access
export const useHeader = () => {
    return useContext(HeaderContext);
};
