const TypeFilter = ({ selectedType, onTypeChange, availableTypes }) => {
  return (
    <div>
      <label htmlFor="type-filter"> Filtrer par type :</label>
      <select
        id="type-filter"
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
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