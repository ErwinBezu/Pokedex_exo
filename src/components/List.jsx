const List = ({pokemons}) => {
    if(pokemons.length === 0){
        return (
            <div>
                <p> Aucun Pokemon trouvé</p>
            </div>
        )
    }
    return (
        <>
        <div>
            <h2> il y a ({pokemons.length}) Pokemon{pokemons.length > 1 ? 's' : ''} </h2>
        </div>
        <ul>
            {pokemons.map((pokemon) =>(
                <li key={pokemon.name}>
                    <span>nom: {pokemon.name}</span>
                    <span>type: {pokemon.type}</span>
                </li>
            ))}
        </ul>
        </>
    )
}

export default List;