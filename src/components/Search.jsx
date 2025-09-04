import './Forms.css';

const Search = ({ searchTerm, onSearchChange, onClear }) => {
    return (
        <div className="search-container">
            <label htmlFor="pokemon-search" className="search-label">
                Rechercher un Pokémon :
            </label>
            <div className="search-input-group">
                <input 
                    id="pokemon-search" 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Tapez quelques lettres (ex: sala, draco, pika...)"  
                    className="search-input"
                />
                {searchTerm && (
                    <button onClick={onClear} className="clear-button">
                        Clear
                    </button>
                )}
            </div>
            <div className="search-hint">
                La recherche fonctionne avec des correspondances partielles - pas besoin du nom complet !
            </div>
        </div>
    );
};

export default Search;