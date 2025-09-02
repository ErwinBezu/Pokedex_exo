import React, { useState, useEffect } from 'react';

const useLocalStorageState = (key, initialValue) => {
  const [state, setState] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? storedValue : initialValue;
    } catch (error) {
      console.error('Erreur lors de la lecture du localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, state);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans localStorage:', error);
    }
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorageState;
