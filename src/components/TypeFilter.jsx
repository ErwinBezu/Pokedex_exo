import './Forms.css';

const TypeFilter = ({ selectedType, onTypeChange, availableTypes }) => {
  return (
    <div className="type-filter-container">
      <label htmlFor="type-filter" className="type-filter-label">
        Filtrer par type :
      </label>
      <select
        id="type-filter"
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="type-filter-select"
      >
        <option value="">Tous les types</option>
        {availableTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TypeFilter;