
import { useMemo, useState } from 'react';
import List from '../components/List';
import Search from '../components/Search';
import TypeFilter from '../components/TypeFilter';
import GenerationFilter from '../components/GenerationFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import useLocalStorageState from '../hooks/useLocalStorageState';
import { usePokemon } from '../hooks/usePokemon';
import './HomePage.css';

const POKEMONS_PER_PAGE = 20;

const HomePage = () => {
  const {
    pokemons,
    loading,
    error,
    searchTerm,
    selectedGeneration,
    handleSearch,
    handleGenerationChange,
    clearSearch,
  } = usePokemon('');

  const [selectedType, setSelectedType] = useLocalStorageState("pokemonTypeFilter", "");
  const [displayLimit, setDisplayLimit] = useState(POKEMONS_PER_PAGE);

  const availableTypes = useMemo(() => {
    if (pokemons.length === 0) return [];
    
    const types = new Set();
    pokemons.forEach(pokemon => {
      pokemon.types?.forEach(type => {
        if (type.name) types.add(type.name);
      });
    });
    
    return Array.from(types).sort();
  }, [pokemons]);

  const filteredPokemons = useMemo(() => {
    if (selectedType === '') return pokemons;
    
    return pokemons.filter(pokemon => 
      pokemon.types?.some(type => type.name === selectedType)
    );
  }, [pokemons, selectedType]);

  const displayedPokemons = useMemo(() => {
    return filteredPokemons.slice(0, displayLimit);
  }, [filteredPokemons, displayLimit]);

  const hasMorePokemons = useMemo(() => {
    return displayLimit < filteredPokemons.length;
  }, [displayLimit, filteredPokemons.length]);

  const handleSearchChange = (newSearchTerm) => {
    handleSearch(newSearchTerm);
    setDisplayLimit(POKEMONS_PER_PAGE);
  };

  const handleClearSearch = () => {
    clearSearch();
    setSelectedType('');
    setDisplayLimit(POKEMONS_PER_PAGE);
  };

  const handleTypeChange = (newType) => {
    setSelectedType(newType);
    setDisplayLimit(POKEMONS_PER_PAGE);
  };

  const handleGenerationChangeWithReset = (generation) => {
    handleGenerationChange(generation);
    setDisplayLimit(POKEMONS_PER_PAGE);
  };

  const loadMorePokemons = () => {
    setDisplayLimit(prev => prev + POKEMONS_PER_PAGE);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">Minipokédex</h1>
        <p className="app-subtitle">Développé pour le Professeur Chen</p>
        {!loading && (
          <p className="favorites-counter">
            {displayedPokemons.length} / {filteredPokemons.length} Pokémon affiché{displayedPokemons.length > 1 ? 's' : ''}
            {selectedGeneration && ` Génération: ${selectedGeneration}`}
            {selectedType && ` Type: ${selectedType}`}
          </p>
        )}
      </div>

      <div className="controls-section">
        <Search
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onClear={handleClearSearch}
        />
        
        <GenerationFilter
          selectedGeneration={selectedGeneration}
          onGenerationChange={handleGenerationChangeWithReset}
        />
        
        {availableTypes.length > 0 && (
          <TypeFilter
            selectedType={selectedType}
            onTypeChange={handleTypeChange}
            availableTypes={availableTypes}
          />
        )}
      </div>

      {error && (
        <div className="error-container">
          <p className="error-text">Erreur : {error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            RÃ©essayer
          </button>
        </div>
      )}

      {loading && <LoadingSpinner message="Chargement des PokÃ©mon..." />}

      {!loading && !error && (
        <div className="content-section">
          <List pokemons={displayedPokemons} />
          
          {hasMorePokemons && (
            <div className="load-more-container">
              <button 
                onClick={loadMorePokemons}
                className="load-more-button"
              >
                Charger plus de Pokémon ({filteredPokemons.length - displayedPokemons.length} restants)
              </button>
              <p className="load-more-info">
                Chargement par groupe de {POKEMONS_PER_PAGE}
              </p>
            </div>
          )}
          
          {!hasMorePokemons && filteredPokemons.length > POKEMONS_PER_PAGE && (
            <div className="end-message">
              Tous les Pokémon ont été chargés !
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;