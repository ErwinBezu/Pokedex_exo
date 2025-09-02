import { useState, useEffect, useCallback } from 'react';
import { searchPokemon } from '../services/pokemonService.js';
import useLocalStorageState from './useLocalStorageState.jsx';

export const usePokemon = (initialSearchTerm = '') => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useLocalStorageState('pokemonSearch', initialSearchTerm);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchPokemons = useCallback(async (term = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchPokemon(term);
      setPokemons(results);
    } catch (err) {
      setError('Erreur lors de la recherche des Pokémon: ' + err.message);
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemons(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchPokemons]);

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  const handleSearch = (term) => {
    updateSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  useEffect(() => {
    fetchPokemons(initialSearchTerm || '');
  }, []);

  return {
    pokemons,
    loading,
    error,
    searchTerm,
    handleSearch,
    updateSearchTerm,
    clearSearch,
    refetch: () => fetchPokemons(searchTerm),
  };
};