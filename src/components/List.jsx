import '../styles/List.css';

const List = ({ pokemons}) => {
    if (pokemons.length === 0) {
        return (
            <div className="no-results">
                <p className="no-results-text">Aucun Pokémon trouvé</p>
                <p className="no-results-hint">
                    Essayez de modifier votre recherche ou vos filtres.<br/>
                    Conseil : Utilisez les noms français
                </p>
            </div>
        )
    }
    
    return (
        <div className="list-container">
            <div className="list-header">
                <h2 className="list-title">
                    {pokemons.length} Pokémon{pokemons.length > 1 ? 's' : ''} découvert{pokemons.length > 1 ? 's' : ''}
                </h2>
            </div>
            
            <div className="pokemon-grid">
                {pokemons.map((pokemon) => (
                    <div 
                        key={pokemon.id} 
                        className="pokemon-card"
                        style={{
                            '--primary-color': pokemon.types?.[0]?.color || '#667eea',
                            '--secondary-color': pokemon.types?.[1]?.color || '#764ba2'
                        }}
                    >
                        
                        {pokemon.image && (
                            <img 
                                src={pokemon.image} 
                                alt={pokemon.name}
                                className="pokemon-image"
                                onError={(e) => {
                                    e.target.src = `https://via.placeholder.com/160x160/f0f0f0/666?text=${pokemon.name}`;
                                }}
                            />
                        )}
                        
                        <h3 className="pokemon-name">
                            <span className="pokemon-number">#{pokemon.id.toString().padStart(3, '0')}</span>
                            <div>{pokemon.name}</div>
                            {pokemon.englishName && pokemon.englishName !== pokemon.name && (
                                <div style={{ fontSize: '0.8em', color: '#7f8c8d', fontWeight: 'normal' }}>
                                    ({pokemon.englishName})
                                </div>
                            )}
                        </h3>
                        
                        {pokemon.description && (
                            <p className="pokemon-description">
                                {pokemon.description}
                            </p>
                        )}
                        
                        <div className="types-container">
                            {pokemon.types ? (
                                pokemon.types.map((type, index) => (
                                    <span 
                                        key={index} 
                                        className="type-badge"
                                        style={{ backgroundColor: type.color || '#68A090' }}
                                        title={`Type ${type.name}`}
                                    >
                                        {type.name}
                                    </span>
                                ))
                            ) : (
                                <span 
                                    className="type-badge"
                                    style={{ backgroundColor: '#68A090' }}
                                >
                                    {pokemon.type || 'Inconnu'}
                                </span>
                            )}
                        </div>
                        
                        {(pokemon.height || pokemon.weight) && (
                            <div className="physical-stats">
                                <div className="stat-box">
                                    <span className="stat-label">Taille</span>
                                    <div className="stat-value">{pokemon.height} m</div>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-label">Poids</span>
                                    <div className="stat-value">{pokemon.weight} kg</div>
                                </div>
                            </div>
                        )}
                        
                        {pokemon.stats && (
                            <div className="combat-stats">
                                <div className="stats-title">Statistiques</div>
                                
                                <div className="stat-row">
                                    <span className="stat-name">PV</span>
                                    <div className="stat-bar-container">
                                        <div 
                                            className="stat-bar hp"
                                            style={{ width: `${Math.min((pokemon.stats.hp / 150) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                    <span className="stat-number">{pokemon.stats.hp}</span>
                                </div>
                                
                                <div className="stat-row">
                                    <span className="stat-name">ATT</span>
                                    <div className="stat-bar-container">
                                        <div 
                                            className="stat-bar attack"
                                            style={{ width: `${Math.min((pokemon.stats.attack / 150) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                    <span className="stat-number">{pokemon.stats.attack}</span>
                                </div>
                                
                                <div className="stat-row">
                                    <span className="stat-name">DÉF</span>
                                    <div className="stat-bar-container">
                                        <div 
                                            className="stat-bar defense"
                                            style={{ width: `${Math.min((pokemon.stats.defense / 150) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                    <span className="stat-number">{pokemon.stats.defense}</span>
                                </div>
                                
                                <div className="stat-row">
                                    <span className="stat-name">ATT SP</span>
                                    <div className="stat-bar-container">
                                        <div 
                                            className="stat-bar special-attack"
                                            style={{ width: `${Math.min((pokemon.stats.specialAttack / 150) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                    <span className="stat-number">{pokemon.stats.specialAttack}</span>
                                </div>
                                
                                <div className="stat-row">
                                    <span className="stat-name">DÉF SP</span>
                                    <div className="stat-bar-container">
                                        <div 
                                            className="stat-bar special-defense"
                                            style={{ width: `${Math.min((pokemon.stats.specialDefense / 150) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                    <span className="stat-number">{pokemon.stats.specialDefense}</span>
                                </div>
                                
                                <div className="stat-row">
                                    <span className="stat-name">VIT</span>
                                    <div className="stat-bar-container">
                                        <div 
                                            className="stat-bar speed"
                                            style={{ width: `${Math.min((pokemon.stats.speed / 150) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                    <span className="stat-number">{pokemon.stats.speed}</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default List;