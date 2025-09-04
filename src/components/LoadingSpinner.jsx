import './LoadingSpinner.css';

const LoadingSpinner = ({ message = "Chargement des Pokémon..." }) => {
  return (
    <div className="loading-container">
      <div className="pokeball-spinner spinning">
        <div className="pokeball-top"></div>
        <div className="pokeball-bottom"></div>
        <div className="pokeball-center"></div>
      </div>
      <p className="loading-message">{message}</p>
      <div className="loading-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;