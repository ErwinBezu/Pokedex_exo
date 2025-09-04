import { createContext, useContext, useMemo, useCallback } from 'react';
import useLocalStorageState from '../hooks/useLocalStorageState';

const TrainerContext = createContext(null);

const TrainerProvider = ({ children }) => {
  const [trainerName, setTrainerName] = useLocalStorageState('trainerName', 'Dresseur Pokémon');
  const [favorites, setFavorites] = useLocalStorageState('pokemonFavorites', '[]');
  const [team, setTeam] = useLocalStorageState('pokemonTeam', '[]');
  const [captureHistory, setCaptureHistory] = useLocalStorageState('captureHistory', '[]');
  
  const parsedFavorites = useMemo(() => {
    try {
      return JSON.parse(favorites || '[]');
    } catch {
      return [];
    }
  }, [favorites]);

  const parsedTeam = useMemo(() => {
    try {
      return JSON.parse(team || '[]');
    } catch {
      return [];
    }
  }, [team]);

  const parsedHistory = useMemo(() => {
    try {
      return JSON.parse(captureHistory || '[]');
    } catch {
      return [];
    }
  }, [captureHistory]);

  const addToHistory = useCallback((entry) => {
    setCaptureHistory(current => {
      const currentHistory = JSON.parse(current || '[]');
      const newHistory = [entry, ...currentHistory].slice(0, 50);
      return JSON.stringify(newHistory);
    });
  }, [setCaptureHistory]);

  const addToFavorites = useCallback((pokemon) => {
    setFavorites(current => {
      const currentFavorites = JSON.parse(current || '[]');
      if (!currentFavorites.find(p => p.id === pokemon.id)) {
        const newFavorites = [...currentFavorites, pokemon];
        
        addToHistory({
          action: 'favorite',
          pokemon: pokemon.name,
          timestamp: new Date().toISOString()
        });
        
        return JSON.stringify(newFavorites);
      }
      return current;
    });
  }, [setFavorites, addToHistory]);
  
  const removeFromFavorites = useCallback((pokemonId) => {
    setFavorites(current => {
      const currentFavorites = JSON.parse(current || '[]');
      const pokemon = currentFavorites.find(p => p.id === pokemonId);
      const newFavorites = currentFavorites.filter(p => p.id !== pokemonId);
      
      if (pokemon) {
        addToHistory({
          action: 'unfavorite',
          pokemon: pokemon.name,
          timestamp: new Date().toISOString()
        });
      }
      
      return JSON.stringify(newFavorites);
    });
  }, [setFavorites, addToHistory]);
  
  const isFavorite = useCallback((pokemonId) => {
    return parsedFavorites.some(p => p.id === pokemonId);
  }, [parsedFavorites]);
  
  const addToTeam = useCallback((pokemon) => {
    let success = false;
    
    setTeam(current => {
      const currentTeam = JSON.parse(current || '[]');
      if (currentTeam.length < 6 && !currentTeam.find(p => p.id === pokemon.id)) {
        const newTeam = [...currentTeam, pokemon];
        success = true;
        
        addToHistory({
          action: 'capture',
          pokemon: pokemon.name,
          timestamp: new Date().toISOString()
        });
        
        return JSON.stringify(newTeam);
      }
      return current;
    });
    
    return success;
  }, [setTeam, addToHistory]);
  
  const removeFromTeam = useCallback((pokemonId) => {
    setTeam(current => {
      const currentTeam = JSON.parse(current || '[]');
      const pokemon = currentTeam.find(p => p.id === pokemonId);
      const newTeam = currentTeam.filter(p => p.id !== pokemonId);
      
      if (pokemon) {
        addToHistory({
          action: 'release',
          pokemon: pokemon.name,
          timestamp: new Date().toISOString()
        });
      }
      
      return JSON.stringify(newTeam);
    });
  }, [setTeam, addToHistory]);
  
  const isInTeam = useCallback((pokemonId) => {
    return parsedTeam.some(p => p.id === pokemonId);
  }, [parsedTeam]);
  
  const stats = useMemo(() => {
    return {
      totalCaptured: parsedTeam.length,
      totalFavorites: parsedFavorites.length,
      trainerLevel: Math.floor(parsedTeam.length / 2) + 1,
      badges: Math.floor(parsedTeam.length / 3),
      totalActions: parsedHistory.length
    };
  }, [parsedTeam.length, parsedFavorites.length, parsedHistory.length]);
  
  const resetTrainerData = useCallback(() => {
    setFavorites('[]');
    setTeam('[]');
    setCaptureHistory('[]');
    setTrainerName('Dresseur Pokémon');
  }, [setFavorites, setTeam, setCaptureHistory, setTrainerName]);
  
  const contextValue = useMemo(() => ({
    trainerName,
    setTrainerName,
    favorites: parsedFavorites,
    team: parsedTeam,
    history: parsedHistory,
    stats,
    
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    
    addToTeam,
    removeFromTeam,
    isInTeam,
    
    resetTrainerData
  }), [
    trainerName,
    setTrainerName,
    parsedFavorites,
    parsedTeam,
    parsedHistory,
    stats,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    addToTeam,
    removeFromTeam,
    isInTeam,
    resetTrainerData
  ]);
  
  return (
    <TrainerContext.Provider value={contextValue}>
      {children}
    </TrainerContext.Provider>
  );
};

const useTrainerContext = () => {
  const context = useContext(TrainerContext);
  if (!context) {
    throw new Error('useTrainerContext doit être utilisé dans un TrainerProvider');
  }
  return context;
};

export { useTrainerContext, TrainerProvider };