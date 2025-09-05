import usePokemonStore from '../store/pokemonStore';
import { 
  AiOutlineBarChart,
  AiFillHeart,
  AiOutlineTeam,
  AiOutlineTrophy,
  AiOutlineFileText,
  AiOutlineStar,
  AiOutlineDelete
} from 'react-icons/ai';
import { 
  MdCatchingPokemon,
  MdHistory,
  MdWarning
} from 'react-icons/md';
import { BiPackage } from 'react-icons/bi';
import './Pages.css';

const ProfilePage = () => {
  // ⬇️ Ne sélectionner que ce qui est nécessaire
  const trainerName      = usePokemonStore(s => s.trainerName);
  const setTrainerName   = usePokemonStore(s => s.setTrainerName);
  const history          = usePokemonStore(s => s.history);
  const resetTrainerData = usePokemonStore(s => s.resetTrainerData);
  const team             = usePokemonStore(s => s.team);
  const favorites        = usePokemonStore(s => s.favorites);

  // ⬇️ Stats dérivées localement (plus besoin de state.stats)
  const totalCaptured  = team.length;
  const totalFavorites = favorites.length;
  const trainerLevel   = Math.floor(totalCaptured / 2) + 1;
  const badges         = Math.floor(totalCaptured / 3);
  const totalActions   = history.length;

  const handleNameChange = (e) => {
    setTrainerName(e.target.value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  const getActionIcon = (action) => {
    const icons = {
      capture: <MdCatchingPokemon />,
      release: <BiPackage />,
      favorite: <AiFillHeart />,
      unfavorite: <AiFillHeart />
    };
    return icons[action] || <MdHistory />;
  };

  const getActionText = (action) => {
    const texts = {
      capture: 'Capture',
      release: 'Libéré', 
      favorite: 'Ajouté aux favoris',
      unfavorite: 'Retiré des favoris'
    };
    return texts[action] || action;
  };

  return (
    <div className="page-container">
      <div className="profile-header">
        <h1>Profil du Dresseur</h1>
        
        <div className="trainer-info">
          <div className="trainer-avatar">
            <div className="avatar-circle">
              {trainerName?.charAt(0)?.toUpperCase() || 'D'}
            </div>
          </div>
          
          <div className="trainer-details">
            <div className="name-section">
              <label htmlFor="trainer-name">Nom du dresseur :</label>
              <input 
                id="trainer-name"
                type="text" 
                value={trainerName}
                onChange={handleNameChange}
                className="trainer-name-input"
                maxLength={20}
              />
            </div>
            
            <div className="trainer-stats">
              <div className="stat-item">
                <span className="stat-label">Niveau</span>
                <span className="stat-value">{trainerLevel}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Badges</span>
                <span className="stat-value">{badges}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-sections">
        <section className="profile-section">
          <h2><AiOutlineBarChart /> Statistiques</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon"><MdCatchingPokemon /></div>
              <div className="stat-content">
                <div className="stat-number">{totalCaptured}</div>
                <div className="stat-text">Pokémon capturés</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon"><AiFillHeart /></div>
              <div className="stat-content">
                <div className="stat-number">{totalFavorites}</div>
                <div className="stat-text">Favoris</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon"><AiOutlineTrophy /></div>
              <div className="stat-content">
                <div className="stat-number">{badges}</div>
                <div className="stat-text">Badges obtenus</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon"><AiOutlineFileText /></div>
              <div className="stat-content">
                <div className="stat-number">{totalActions}</div>
                <div className="stat-text">Actions totales</div>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <h2><AiOutlineTeam /> Équipe actuelle</h2>
          {team.length > 0 ? (
            <div className="team-preview">
              {team.map((pokemon) => (
                <div key={pokemon.id} className="team-member">
                  <img 
                    src={pokemon.image} 
                    alt={pokemon.name}
                    className="team-member-image"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/96x96/f0f0f0/666?text=${pokemon.name}`;
                    }}
                  />
                  <span className="team-member-name">{pokemon.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-message">Aucun Pokémon dans l’équipe</p>
          )}
        </section>

        <section className="profile-section">
          <h2><AiOutlineStar /> Pokémon favoris</h2>
          {favorites.length > 0 ? (
            <div className="favorites-preview">
              {favorites.slice(0, 6).map(pokemon => (
                <div key={pokemon.id} className="favorite-item">
                  <img 
                    src={pokemon.image} 
                    alt={pokemon.name}
                    className="favorite-image"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/80x80/f0f0f0/666?text=${pokemon.name}`;
                    }}
                  />
                  <span className="favorite-name">{pokemon.name}</span>
                </div>
              ))}
              {favorites.length > 6 && (
                <div className="more-favorites">
                  +{favorites.length - 6} autres...
                </div>
              )}
            </div>
          ) : (
            <p className="empty-message">Aucun Pokémon en favoris</p>
          )}
        </section>

        <section className="profile-section">
          <h2><MdHistory /> Historique récent</h2>
          {history.length > 0 ? (
            <div className="history-list">
              {history.slice(0, 10).map((entry, index) => (
                <div key={index} className="history-item">
                  <div className="history-icon">
                    {getActionIcon(entry.action)}
                  </div>
                  <div className="history-content">
                    <div className="history-text">
                      <strong>{getActionText(entry.action)}</strong> {entry.pokemon}
                    </div>
                    <div className="history-date">
                      {formatDate(entry.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              {history.length > 10 && (
                <div className="history-more">
                  ... et {history.length - 10} autres actions
                </div>
              )}
            </div>
          ) : (
            <p className="empty-message">Aucune action enregistrée</p>
          )}
        </section>

        <section className="profile-section danger-zone">
          <h2><MdWarning /> Zone de danger</h2>
          <p>Cette action supprimera toutes vos données (équipe, favoris, historique).</p>
          <button 
            onClick={() => {
              if (window.confirm('Êtes-vous sûr de vouloir tout supprimer ? Cette action est irréversible.')) {
                resetTrainerData();
                alert('Données supprimées avec succès !');
              }
            }}
            className="reset-btn"
          >
            <AiOutlineDelete /> Tout réinitialiser
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
