import { useTrainerContext } from '../context/TrainerContext';
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
  const { 
    trainerName, 
    setTrainerName, 
    stats, 
    history, 
    resetTrainerData,
    team,
    favorites 
  } = useTrainerContext();

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
      release: 'Libere', 
      favorite: 'Ajoute aux favoris',
      unfavorite: 'Retire des favoris'
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
              {trainerName.charAt(0).toUpperCase()}
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
                <span className="stat-value">{stats.trainerLevel}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Badges</span>
                <span className="stat-value">{stats.badges}</span>
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
                <div className="stat-number">{stats.totalCaptured}</div>
                <div className="stat-text">Pokemon captures</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon"><AiFillHeart /></div>
              <div className="stat-content">
                <div className="stat-number">{stats.totalFavorites}</div>
                <div className="stat-text">Favoris</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon"><AiOutlineTrophy /></div>
              <div className="stat-content">
                <div className="stat-number">{stats.badges}</div>
                <div className="stat-text">Badges obtenus</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon"><AiOutlineFileText /></div>
              <div className="stat-content">
                <div className="stat-number">{stats.totalActions}</div>
                <div className="stat-text">Actions totales</div>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <h2><AiOutlineTeam /> Equipe actuelle</h2>
          {team.length > 0 ? (
            <div className="team-preview">
              {team.map((pokemon) => (
                <div key={pokemon.id} className="team-member">
                  <img 
                    src={pokemon.image} 
                    alt={pokemon.name}
                    className="team-member-image"
                  />
                  <span className="team-member-name">{pokemon.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-message">Aucun Pokemon dans l'equipe</p>
          )}
        </section>

        <section className="profile-section">
          <h2><AiOutlineStar /> Pokemon favoris</h2>
          {favorites.length > 0 ? (
            <div className="favorites-preview">
              {favorites.slice(0, 6).map(pokemon => (
                <div key={pokemon.id} className="favorite-item">
                  <img 
                    src={pokemon.image} 
                    alt={pokemon.name}
                    className="favorite-image"
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
            <p className="empty-message">Aucun Pokemon en favoris</p>
          )}
        </section>

        <section className="profile-section">
          <h2><MdHistory /> Historique recent</h2>
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
            <p className="empty-message">Aucune action enregistree</p>
          )}
        </section>

        <section className="profile-section danger-zone">
          <h2><MdWarning /> Zone de danger</h2>
          <p>Cette action supprimera toutes vos donnees (equipe, favoris, historique).</p>
          <button 
            onClick={() => {
              if (window.confirm('Etes-vous sur de vouloir tout supprimer ? Cette action est irreversible.')) {
                resetTrainerData();
                alert('Donnees supprimees avec succes !');
              }
            }}
            className="reset-btn"
          >
            <AiOutlineDelete /> Tout reinitialiser
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;