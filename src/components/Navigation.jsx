import { Link } from 'react-router-dom';
import { useTrainerContext } from '../context/TrainerContext';
import { MdCatchingPokemon } from 'react-icons/md';
import { AiOutlineHome, AiFillHeart, AiOutlineTeam, AiOutlineUser } from 'react-icons/ai';

const Navigation = () => {
  const { trainerName, stats } = useTrainerContext();
  
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
          Favoris ({stats.totalFavorites})
        </Link>
        <Link to="/team" className="nav-link">
          <AiOutlineTeam />
          Equipe ({stats.totalCaptured}/6)
        </Link>
        <Link to="/profile" className="nav-link">
          <AiOutlineUser />
          {trainerName} (Niv.{stats.trainerLevel})
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;