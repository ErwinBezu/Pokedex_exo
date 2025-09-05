import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPokemonByName } from '../services/apiPokemon';
import usePokemonStore from '../store/pokemonStore';
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

  const addToFavorites     = usePokemonStore(s => s.addToFavorites);
  const removeFromFavorites= usePokemonStore(s => s.removeFromFavorites);
  const isFavoriteFn       = usePokemonStore(s => s.isFavorite);
  const addToTeam          = usePokemonStore(s => s.addToTeam);
  const removeFromTeam     = usePokemonStore(s => s.removeFromTeam);
  const isInTeamFn         = usePokemonStore(s => s.isInTeam);

  useEffect(() => {
    let alive = true;
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPokemonByName(id); // si c'est un id, OK si ton service accepte id/nom
        if (!alive) return;
        if (data) {
          setPokemon(data);
        } else {
          setError('Pokemon non trouvé');
        }
      } catch (err) {
        setError('Erreur lors du chargement du Pokémon');
        console.log(err);
      } finally {
        if (alive) setLoading(false);
      }
    };
    loadPokemon();
    return () => { alive = false; };
  }, [id]);

  const isFavorite = useMemo(
    () => (pokemon ? isFavoriteFn(pokemon.id) : false),
    [pokemon, isFavoriteFn]
  );
  const isInTeam = useMemo(
    () => (pokemon ? isInTeamFn(pokemon.id) : false),
    [pokemon, isInTeamFn]
  );

  const handleFavoriteClick = useCallback(() => {
    if (!pokemon) return;
    if (isFavorite) {
      removeFromFavorites(pokemon.id);
    } else {
      addToFavorites(pokemon);
    }
  }, [pokemon, isFavorite, addToFavorites, removeFromFavorites]);

  const handleCaptureClick = useCallback(() => {
    if (!pokemon) return;
    if (isInTeam) {
      removeFromTeam(pokemon.id);
    } else {
      const success = addToTeam(pokemon);
      if (!success) {
        alert('Votre équipe est complète ! (6 Pokémon maximum)');
      }
    }
  }, [pokemon, isInTeam, addToTeam, removeFromTeam]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-page">{error}</div>;
  if (!pokemon) return <div className="error-page">Pokemon non trouvé</div>;

  const safeStats = pokemon.stats || {};
  const types = pokemon.types || [];
  const formatPct = (v) => `${Math.min(((v || 0) / 150) * 100, 100)}%`;

  return (
    <div className="detail-page">
      <div className="detail-header">
        <Link to="/" className="back-link">
          <BiArrowBack /> Retour à la liste
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
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/256x256/f0f0f0/666?text=${pokemon.name}`;
              }}
            />

            <div className="detail-actions">
              <button
                onClick={handleFavoriteClick}
                className={`detail-action-btn ${isFavorite ? 'favorited' : ''}`}
                disabled={!pokemon}
              >
                {isFavorite ? (
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
                className={`detail-action-btn ${isInTeam ? 'captured' : ''}`}
                disabled={!pokemon}
              >
                {isInTeam ? (
                  <>
                    <BiPackage /> Libérer
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
              <h2>Informations générales</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Catégorie :</span>
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
                  <span className="info-label">Génération :</span>
                  <span className="info-value">{pokemon.generation}</span>
                </div>
              </div>
            </div>

            <div className="types-card">
              <h2>Types</h2>
              <div className="detail-types">
                {types.length ? types.map((type, index) => (
                  <span
                    key={index}
                    className="detail-type-badge"
                    style={{ backgroundColor: type.color }}
                  >
                    {type.name}
                  </span>
                )) : <span className="detail-type-badge">Inconnu</span>}
              </div>
            </div>

            <div className="stats-card">
              <h2>Statistiques</h2>
              <div className="stats-list">
                <div className="stat-row">
                  <span className="stat-name">PV</span>
                  <div className="stat-bar-container">
                    <div className="stat-bar hp" style={{ width: formatPct(safeStats.hp) }} />
                  </div>
                  <span className="stat-number">{safeStats.hp ?? '-'}</span>
                </div>

                <div className="stat-row">
                  <span className="stat-name">Attaque</span>
                  <div className="stat-bar-container">
                    <div className="stat-bar attack" style={{ width: formatPct(safeStats.attack) }} />
                  </div>
                  <span className="stat-number">{safeStats.attack ?? '-'}</span>
                </div>

                <div className="stat-row">
                  <span className="stat-name">Défense</span>
                  <div className="stat-bar-container">
                    <div className="stat-bar defense" style={{ width: formatPct(safeStats.defense) }} />
                  </div>
                  <span className="stat-number">{safeStats.defense ?? '-'}</span>
                </div>

                <div className="stat-row">
                  <span className="stat-name">Att. Spéciale</span>
                  <div className="stat-bar-container">
                    <div className="stat-bar special-attack" style={{ width: formatPct(safeStats.specialAttack) }} />
                  </div>
                  <span className="stat-number">{safeStats.specialAttack ?? '-'}</span>
                </div>

                <div className="stat-row">
                  <span className="stat-name">Déf. Spéciale</span>
                  <div className="stat-bar-container">
                    <div className="stat-bar special-defense" style={{ width: formatPct(safeStats.specialDefense) }} />
                  </div>
                  <span className="stat-number">{safeStats.specialDefense ?? '-'}</span>
                </div>

                <div className="stat-row">
                  <span className="stat-name">Vitesse</span>
                  <div className="stat-bar-container">
                    <div className="stat-bar speed" style={{ width: formatPct(safeStats.speed) }} />
                  </div>
                  <span className="stat-number">{safeStats.speed ?? '-'}</span>
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