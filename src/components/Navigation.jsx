import { Link } from "react-router-dom";
import usePokemonStore from "../store/pokemonStore";
import { MdCatchingPokemon } from "react-icons/md";
import { AiOutlineHome, AiFillHeart, AiOutlineTeam, AiOutlineUser } from "react-icons/ai";

const Navigation = () => {
  const trainerName    = usePokemonStore(s => s.trainerName);
  const totalFavorites = usePokemonStore(s => s.favorites.length);
  const totalCaptured  = usePokemonStore(s => s.team.length);
  const trainerLevel   = usePokemonStore(s => Math.floor(s.team.length / 2) + 1);

  return (
    <nav className="navigation">
      <div className="nav-logo">
        <Link to="/" className="nav-link">
          <MdCatchingPokemon /> Minipokedex
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">
          <AiOutlineHome />
          Accueil
        </Link>
        <Link to="/favorites" className="nav-link">
          <AiFillHeart />
          Favoris ({totalFavorites})
        </Link>
        <Link to="/team" className="nav-link">
          <AiOutlineTeam />
          Equipe ({totalCaptured}/6)
        </Link>
        <Link to="/profile" className="nav-link">
          <AiOutlineUser />
          {trainerName} (Niv.{trainerLevel})
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;