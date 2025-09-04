import './Forms.css';

const GenerationFilter = ({ selectedGeneration, onGenerationChange }) => {
  const generations = [
    { value: "", label: "Toutes les générations" },
    { value: "1", label: "Génération I (Kanto)" },
    { value: "2", label: "Génération II (Johto)" },
    { value: "3", label: "Génération III (Hoenn)" },
    { value: "4", label: "Génération IV (Sinnoh)" },
    { value: "5", label: "Génération V (Unys)" },
    { value: "6", label: "Génération VI (Kalos)" },
    { value: "7", label: "Génération VII (Alola)" },
    { value: "8", label: "Génération VIII (Galar)" },
    { value: "9", label: "Génération IX (Paldea)" }
  ];

  return (
    <div className="generation-filter-container">
      <label htmlFor="generation-filter" className="generation-filter-label">
        Filtrer par génération :
      </label>
      <select
        id="generation-filter"
        value={selectedGeneration}
        onChange={(e) => onGenerationChange(e.target.value)}
        className="generation-filter-select"
      >
        {generations.map((gen) => (
          <option key={gen.value} value={gen.value}>
            {gen.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenerationFilter;