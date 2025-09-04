import { useTrainerContext } from '../context/TrainerContext';
import List from '../components/List';
import './Pages.css';

const FavoritesPage = () => {
  const { favorites, stats } = useTrainerContext();
  
  if (favorites.length === 0) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1>Mes Pokémons Favoris</h1>
          <p>Aucun Pokémon en favoris pour le moment.</p>
          <p>Explorez la liste et ajoutez vos préférés avec le bouton ❤️ !</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Mes Pokémons Favoris</h1>
        <p className="stats-info">
          {stats.totalFavorites} Pokémon{stats.totalFavorites > 1 ? 's' : ''} en favoris
        </p>
      </div>
      
      <List pokemons={favorites} />
    </div>
  );
};

export default FavoritesPage;