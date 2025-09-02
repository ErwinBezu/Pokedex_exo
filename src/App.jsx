
import './App.css'
import List from './components/List.jsx'
import Search from './components/Search.jsx'
import TypeFilter from './components/TypeFilter.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import useLocalStorageState from './hooks/useLocalStorageState.jsx'
import { usePokemon } from './hooks/usePokemon.jsx'

const App = () => {
  const {
    pokemons,
    loading,
    error,
    searchTerm,
    handleSearch,
    clearSearch,
  } = usePokemon('');

  const availableTypes = [...new Set(
    pokemons.flatMap(p => p.types?.map(t => t.name) || [])
  )].sort();

  const [selectedType, setSelectedType] = useLocalStorageState("pokemonTypeFilter", "")

  const filteredPokemons = pokemons.filter(pokemon => {
    if (selectedType === '') return true;
    return pokemon.types?.some(type => type.name === selectedType);
  });

  const handleSearchChange = (newSearchTerm) => {handleSearch(newSearchTerm);};

  const handleClearSearch = () => {
    clearSearch();
    setSelectedType('');
  };

  const handleTypeChange = (newType) => {setSelectedType(newType);};

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">Minipokédex</h1>
        <p className="app-subtitle">Développé pour le Professeur Chen</p>
        {!loading && (
          <p className="favorites-counter">
            {filteredPokemons.length} Pokémon trouvé{filteredPokemons.length > 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="controls-section">
        <Search
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onClear={handleClearSearch}
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
            Réessayer
          </button>
        </div>
      )}

      {loading && <LoadingSpinner message="Chargement des Pokémon depuis Tyradex..." />}

      {!loading && !error && (
        <div className="content-section">
          <List 
            pokemons={filteredPokemons} 
          />
        </div>
      )}
    </div>
  )
}

export default App