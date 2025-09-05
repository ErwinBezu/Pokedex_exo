import usePokemonStore from '../store/pokemonStore';
import { AiOutlineTeam } from 'react-icons/ai';
import { BiPackage } from 'react-icons/bi';
import { MdCatchingPokemon } from 'react-icons/md';
import './Pages.css';

const TeamPage = () => {
  const team = usePokemonStore(s => s.team);
  const removeFromTeam = usePokemonStore(s => s.removeFromTeam);

  const totalCaptured = team.length;
  const trainerLevel  = Math.floor(totalCaptured / 2) + 1;
  const emptySlots    = Math.max(0, 6 - totalCaptured);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Mon Équipe Pokémon</h1>
        <p className="stats-info">
          {totalCaptured}/6 Pokémon capturés • Niveau {trainerLevel}
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
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/128x128/f0f0f0/666?text=${pokemon.name}`;
              }}
            />
            <h3 className="team-pokemon-name">{pokemon.name}</h3>

            <div className="team-types">
              {(pokemon.types ?? []).map((type, i) => (
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
              <BiPackage /> Libérer
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
          <h2>Votre équipe est vide</h2>
          <p>
            Capturez des Pokémon depuis la liste principale avec le bouton{' '}
            <MdCatchingPokemon /> !
          </p>
          <p>
            <strong>Astuce :</strong> vous pouvez capturer jusqu’à 6 Pokémon.
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamPage;