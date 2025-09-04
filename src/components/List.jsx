import { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTrainerContext } from '../context/TrainerContext';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdCatchingPokemon } from 'react-icons/md';
import { BiPackage } from 'react-icons/bi';
import './List.css';

const List = ({ pokemons }) => {
  const { 
    addToFavorites, 
    removeFromFavorites, 
    isFavorite,
    addToTeam,
    removeFromTeam,
    isInTeam 
  } = useTrainerContext();

  const isEmpty = useMemo(() => pokemons.length === 0, [pokemons.length]);

  const handleFavoriteClick = useCallback((e, pokemon) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite(pokemon.id)) {
      removeFromFavorites(pokemon.id);
    } else {
      addToFavorites(pokemon);
    }
  }, [isFavorite, removeFromFavorites, addToFavorites]);
  
  const handleCaptureClick = useCallback((e, pokemon) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInTeam(pokemon.id)) {
      removeFromTeam(pokemon.id);
    } else {
      const success = addToTeam(pokemon);
      if (!success) {
        alert('Votre equipe est complete ! (6 Pokemon maximum)');
      }
    }
  }, [isInTeam, removeFromTeam, addToTeam]);

  const pokemonCards = useMemo(() => {
    return pokemons.map((pokemon) => (
      <div 
        key={pokemon.id} 
        className="pokemon-card"
      >
        <Link to={`/pokemon/${pokemon.id}`} className="pokemon-link">
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
              <div className="pokemon-english-name">
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
                >
                  {type.name}
                </span>
              ))
            ) : (
              <span className="type-badge">
                {pokemon.type || 'Inconnu'}
              </span>
            )}
          </div>
        </Link>
        
        <div className="pokemon-actions">
          <button 
            onClick={(e) => handleFavoriteClick(e, pokemon)}
            className={`action-btn ${isFavorite(pokemon.id) ? 'favorited' : ''}`}
            title={isFavorite(pokemon.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            {isFavorite(pokemon.id) ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
          
          <button 
            onClick={(e) => handleCaptureClick(e, pokemon)}
            className={`action-btn ${isInTeam(pokemon.id) ? 'captured' : ''}`}
            title={isInTeam(pokemon.id) ? 'Liberer' : 'Capturer'}
          >
            {isInTeam(pokemon.id) ? <BiPackage /> : <MdCatchingPokemon />}
          </button>
        </div>
        
        {(pokemon.height || pokemon.weight) && (
          <div className="physical-stats">
            <div className="stat-box">
              <span className="stat-label">Taille</span>
              <div className="stat-value">{pokemon.height}</div>
            </div>
            <div className="stat-box">
              <span className="stat-label">Poids</span>
              <div className="stat-value">{pokemon.weight}</div>
            </div>
          </div>
        )}
      </div>
    ));
  }, [pokemons, isFavorite, isInTeam, handleFavoriteClick, handleCaptureClick]);

  if (isEmpty) {
    return (
      <div className="no-results">
        <p className="no-results-text">Aucun Pokemon trouve</p>
        <p className="no-results-hint">
          Essayez de modifier votre recherche ou vos filtres.<br/>
          Conseil : Utilisez les noms francais
        </p>
      </div>
    );
  }
    
  return (
    <div className="list-container">
      <div className="list-header">
        <h2 className="list-title">
          {pokemons.length} Pokemon{pokemons.length > 1 ? 's' : ''} decouvert{pokemons.length > 1 ? 's' : ''}
        </h2>
      </div>
      
      <div className="pokemon-grid">
        {pokemonCards}
      </div>
    </div>
  );
};

export default List;