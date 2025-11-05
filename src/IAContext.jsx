import React, { createContext, useContext, useState, useEffect } from 'react';

const IAContext = createContext();

export function IAProvider({ children }) {
  const [model, setModel] = useState(() => {
    try {
      return localStorage.getItem('sapiens_model') || 'openai';
    } catch (e) {
      return 'openai';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sapiens_model', model);
    } catch (e) {}
  }, [model]);

  return (
    <IAContext.Provider value={{ model, setModel }}>
      {children}
    </IAContext.Provider>
  );
}

export function useIA() {
  return useContext(IAContext);
}
