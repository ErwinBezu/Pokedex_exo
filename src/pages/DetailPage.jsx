import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPokemonByName } from '../services/apiPokemon';
import { useTrainerContext } from '../context/TrainerContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdCatchingPokemon } from 'react-icons/md';
import { BiPackage, BiArrowBack } from 'react-icons/bi';
import './Pages.css';

const DetailPage = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { 
    addToFavorites, 
    removeFromFavorites, 
    isFavorite,
    addToTeam,
    removeFromTeam,
    isInTeam 
  } = useTrainerContext();

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const data = await getPokemonByName(id);
        if (data) {
          setPokemon(data);
        } else {
          setError('Pokemon non trouve');
        }
      } catch (err) {
        setError('Erreur lors du chargement du Pokemon', err);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [id]);

  const handleFavoriteClick = () => {
    if (isFavorite(pokemon.id)) {
      removeFromFavorites(pokemon.id);
    } else {
      addToFavorites(pokemon);
    }
  };

  const handleCaptureClick = () => {
    if (isInTeam(pokemon.id)) {
      removeFromTeam(pokemon.id);
    } else {
      const success = addToTeam(pokemon);
      if (!success) {
        alert('Votre equipe est complete ! (6 Pokemon maximum)');
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-page">{error}</div>;
  if (!pokemon) return <div className="error-page">Pokemon non trouve</div>;

  return (
    <div className="detail-page">
      <div className="detail-header">
        <Link to="/" className="back-link">
          <BiArrowBack /> Retour a la liste
        </Link>
        <h1 className="detail-title">
          #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
        </h1>
        {pokemon.englishName && pokemon.englishName !== pokemon.name && (
          <p className="detail-english-name">({pokemon.englishName})</p>
        )}
      </div>

      <div className="detail-content">
        <div className="detail-main">
          <div className="pokemon-image-section">
            <img 
              src={pokemon.image} 
              alt={pokemon.name}
              className="detail-pokemon-image"
            />
            
            <div className="detail-actions">
              <button 
                onClick={handleFavoriteClick}
                className={`detail-action-btn ${isFavorite(pokemon.id) ? 'favorited' : ''}`}
              >
                {isFavorite(pokemon.id) ? (
                  <>
                    <AiFillHeart /> Retirer des favoris
                  </>
                ) : (
                  <>
                    <AiOutlineHeart /> Ajouter aux favoris
                  </>
                )}
              </button>
              
              <button 
                onClick={handleCaptureClick}
                className={`detail-action-btn ${isInTeam(pokemon.id) ? 'captured' : ''}`}
              >
                {isInTeam(pokemon.id) ? (
                  <>
                    <BiPackage /> Liberer
                  </>
                ) : (
                  <>
                    <MdCatchingPokemon /> Capturer
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="pokemon-info-section">
            <div className="info-card">
              <h2>Informations generales</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Categorie :</span>
                  <span className="info-value">{pokemon.category}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Taille :</span>
                  <span className="info-value">{pokemon.height}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Poids :</span>
                  <span className="info-value">{pokemon.weight}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Generation :</span>
                  <span className="info-value">{pokemon.generation}</span>
                </div>
              </div>
            </div>

            <div className="types-card">
              <h2>Types</h2>
              <div className="detail-types">
                {pokemon.types.map((type, index) => (
                  <span 
                    key={index} 
                    className="detail-type-badge"
                    style={{ backgroundColor: type.color }}
                  >
                    {type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="stats-card">
              <h2>Statistiques</h2>
              <div className="stats-list">
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
                  <span className="stat-name">Attaque</span>
                  <div className="stat-bar-container">
                    <div 
                      className="stat-bar attack"
                      style={{ width: `${Math.min((pokemon.stats.attack / 150) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="stat-number">{pokemon.stats.attack}</span>
                </div>
                
                <div className="stat-row">
                  <span className="stat-name">Defense</span>
                  <div className="stat-bar-container">
                    <div 
                      className="stat-bar defense"
                      style={{ width: `${Math.min((pokemon.stats.defense / 150) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="stat-number">{pokemon.stats.defense}</span>
                </div>
                
                <div className="stat-row">
                  <span className="stat-name">Att. Speciale</span>
                  <div className="stat-bar-container">
                    <div 
                      className="stat-bar special-attack"
                      style={{ width: `${Math.min((pokemon.stats.specialAttack / 150) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="stat-number">{pokemon.stats.specialAttack}</span>
                </div>
                
                <div className="stat-row">
                  <span className="stat-name">Def. Speciale</span>
                  <div className="stat-bar-container">
                    <div 
                      className="stat-bar special-defense"
                      style={{ width: `${Math.min((pokemon.stats.specialDefense / 150) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="stat-number">{pokemon.stats.specialDefense}</span>
                </div>
                
                <div className="stat-row">
                  <span className="stat-name">Vitesse</span>
                  <div className="stat-bar-container">
                    <div 
                      className="stat-bar speed"
                      style={{ width: `${Math.min((pokemon.stats.speed / 150) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="stat-number">{pokemon.stats.speed}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;