import './App.css'
import List from './components/List.jsx'
import Search from './components/Search.jsx'
import TypeFilter from './components/TypeFilter.jsx'
import { pokemons } from './data/pokemons.js'
import useLocalStorageState from './hooks/useLocalStorageState.jsx'

const App =() => {
  const [searchTerm, setSearchTerm] = useLocalStorageState("pokemonSearch", "Pikachu")
  const [selectedType, setSelectedType] = useLocalStorageState("pokemonTypeFilter", "")

  const availableTypes = [...new Set(pokemons.map(p => p.type))].sort();

  const filteredPokemons = pokemons.filter(pokemon => {  
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || pokemon.type === selectedType;
    return matchesName && matchesType;
  });

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedType('');
  };

  const handleTypeChange = (newType) => {
  setSelectedType(newType);
  };

  
  return (
    <>
    <div>
        <div >
          <h1 > Minipokedex </h1>
          <p> Développé pour le Professeur Chen </p>
        </div>

        <div>
          <Search
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onClear={handleClearSearch}
          />
          
          <TypeFilter
            selectedType={selectedType}
            onTypeChange={handleTypeChange}
            availableTypes={availableTypes}
          />
        </div>

        <div >
          <List pokemons={filteredPokemons} />
        </div>
    </div>
     
    </>
  )
}

export default App
