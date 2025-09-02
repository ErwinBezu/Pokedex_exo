const Search =({searchTerm, onSearchChange, onClear}) => {
    return (
    <>
    <label htmlFor="pokemon-search"> Rechercher un Pokemon :</label>
    <input 
        id="pokemon-search" 
        type="text" 
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Le nom de votre pokemon"  
    />
    {searchTerm && (<button onClick={onClear}> Clear</button>)}
    </>

    );
};

export default Search;