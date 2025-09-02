import { useState, useEffect, useCallback } from 'react';
import { searchPokemon, getPokemonByGeneration } from '../services/pokemonService.js';
import useLocalStorageState from './useLocalStorageState.jsx';

export const usePokemon = (initialSearchTerm = '') => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useLocalStorageState('pokemonSearch', initialSearchTerm);
  const [selectedGeneration, setSelectedGeneration] = useLocalStorageState('pokemonGeneration', '');

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchPokemons = useCallback(async (term = '', generation = '') => {
    setLoading(true);
    setError(null);
    
    try {
      let results;
      
      if (generation && !term.trim()) {
        results = await getPokemonByGeneration(generation);
      } else {
        results = await searchPokemon(term);
        
        if (generation) {
          results = results.filter(pokemon => pokemon.generation === parseInt(generation));
        }
      }
      
      setPokemons(results);
    } catch (err) {
      setError('Erreur lors de la recherche des Pokémon: ' + err.message);
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemons(debouncedSearchTerm, selectedGeneration);
  }, [debouncedSearchTerm, selectedGeneration, fetchPokemons]);

  const updateSearchTerm = (term) => {setSearchTerm(term);};

  const updateGeneration = (generation) => {setSelectedGeneration(generation);};

  const handleSearch = (term) => {updateSearchTerm(term);};

  const handleGenerationChange = (generation) => {updateGeneration(generation);};

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedGeneration('');
  };

  useEffect(() => {fetchPokemons(initialSearchTerm || '', selectedGeneration);}, []);

  return {
    pokemons,
    loading,
    error,
    searchTerm,
    selectedGeneration,
    handleSearch,
    handleGenerationChange,
    updateSearchTerm,
    clearSearch,
    refetch: () => fetchPokemons(searchTerm, selectedGeneration),
  };
};