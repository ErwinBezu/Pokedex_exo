import { useTrainerContext } from '../context/TrainerContext';
import { AiOutlineTeam } from 'react-icons/ai';
import { BiPackage } from 'react-icons/bi';
import { MdCatchingPokemon } from 'react-icons/md';
import './Pages.css';

const TeamPage = () => {
  const { team, removeFromTeam, stats } = useTrainerContext();
  
  const emptySlots = 6 - team.length;
  
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Mon Equipe Pokemon</h1>
        <p className="stats-info">
          {stats.totalCaptured}/6 Pokemon captures • Niveau {stats.trainerLevel}
        </p>
      </div>
      
      <div className="team-grid">
        {team.map((pokemon, index) => (
          <div key={pokemon.id} className="team-slot filled">
            <div className="slot-number">#{index + 1}</div>
            <img 
              src={pokemon.image} 
              alt={pokemon.name}
              className="team-pokemon-image"
            />
            <h3 className="team-pokemon-name">{pokemon.name}</h3>
            
            <div className="team-types">
              {pokemon.types.map((type, i) => (
                <span 
                  key={i} 
                  className="team-type-badge"
                  style={{ backgroundColor: type.color }}
                >
                  {type.name}
                </span>
              ))}
            </div>
            
            <button 
              onClick={() => removeFromTeam(pokemon.id)}
              className="release-btn"
            >
              <BiPackage /> Liberer
            </button>
          </div>
        ))}
        
        {Array.from({ length: emptySlots }, (_, index) => (
          <div key={`empty-${index}`} className="team-slot empty">
            <div className="slot-number">#{team.length + index + 1}</div>
            <div className="empty-slot-content">
              <div className="empty-pokeball">
                <MdCatchingPokemon />
              </div>
              <p>Slot libre</p>
            </div>
          </div>
        ))}
      </div>
      
      {team.length === 0 && (
        <div className="empty-state">
          <h2>Votre equipe est vide</h2>
          <p>Capturez des Pokemon depuis la liste principale avec le bouton <MdCatchingPokemon /> !</p>
          <p><strong>Astuce :</strong> Vous pouvez capturer jusqu'a 6 Pokemon.</p>
        </div>
      )}
    </div>
  );
};

export default TeamPage;