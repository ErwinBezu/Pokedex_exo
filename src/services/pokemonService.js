const BASE_URL = "https://tyradex.vercel.app/api/v1";

let pokemonCache = [];
let cacheInitialized = false;

export const searchPokemon = async (searchTerm = "", limit = null) => {
  try {
    if (!cacheInitialized) {
      await initializePokemonCache();
    }

    if (!searchTerm.trim()) {
      return pokemonCache.map(formatPokemon);
    }

    const searchLower = searchTerm.toLowerCase().trim();
    const matchingPokemon = pokemonCache.filter((pokemon) => {
      const frenchName = pokemon.name.fr.toLowerCase();

      const startsWithPattern = new RegExp(`(^|\\s|-)${searchLower}`, "i");

      return startsWithPattern.test(frenchName);
    });

    return limit
      ? matchingPokemon.slice(0, limit).map(formatPokemon)
      : matchingPokemon.map(formatPokemon);
  } catch (error) {
    console.error("Erreur lors de la recherche:", error);
    return [];
  }
};

const initializePokemonCache = async () => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    pokemonCache = data;
    cacheInitialized = true;

    console.log(`Cache initialisé avec ${pokemonCache.length} Pokémon`);
  } catch (error) {
    console.error("Erreur lors de l'initialisation du cache:", error);
    cacheInitialized = false;
    pokemonCache = [];
  }
};

export const getPokemonByName = async (nameOrId) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);

    if (!response.ok) {
      return null;
    }

    const pokemon = await response.json();
    return formatPokemon(pokemon);
  } catch (error) {
    console.error(`Erreur lors de la récupération de ${nameOrId}:`, error);
    return null;
  }
};

const formatPokemon = (pokemon) => {
  return {
    id: pokemon.pokedex_id,
    name: pokemon.name?.fr || pokemon.name?.en || "Nom inconnu",
    englishName: pokemon.name?.en || pokemon.name?.fr || "Unknown",
    japaneseName: pokemon.name?.jp || "",
    image:
      pokemon.sprites?.regular ||
      pokemon.sprites?.shiny ||
      "/placeholder-pokemon.png",
    types:
      pokemon.types?.map((type) => ({
        name: type.name || "Inconnu",
        color: getTypeColor(type.name?.toLowerCase() || "normal"),
      })) || [],
    stats: {
      hp: pokemon.stats?.hp || 0,
      attack: pokemon.stats?.atk || 0,
      defense: pokemon.stats?.def || 0,
      speed: pokemon.stats?.spe || 0,
      specialAttack: pokemon.stats?.atk_spe || 0,
      specialDefense: pokemon.stats?.def_spe || 0,
    },
    height: pokemon.height ? `${pokemon.height}` : "?",
    weight: pokemon.weight ? `${pokemon.weight}` : "?",
    description: pokemon.category || "Aucune description disponible",
    generation: pokemon.generation || 1,
    category: pokemon.category || "Pokémon",
  };
};

const getTypeColor = (type) => {
  const typeColors = {
    normal: "#A8A878",
    feu: "#F08030",
    eau: "#6890F0",
    électrik: "#F8D030",
    plante: "#78C850",
    glace: "#98D8D8",
    combat: "#C03028",
    poison: "#A040A0",
    sol: "#E0C068",
    vol: "#A890F0",
    psy: "#F85888",
    insecte: "#A8B820",
    roche: "#B8A038",
    spectre: "#705898",
    dragon: "#7038F8",
    ténèbres: "#705848",
    acier: "#B8B8D0",
    fée: "#EE99AC",
  };

  return typeColors[type] || "#68A090";
};

export const getAvailableTypes = () => {
  if (!cacheInitialized || pokemonCache.length === 0) {
    return [];
  }

  const types = new Set();
  pokemonCache.forEach((pokemon) => {
    if (pokemon.types) {
      pokemon.types.forEach((type) => {
        if (type.name) {
          types.add(type.name);
        }
      });
    }
  });

  return Array.from(types).sort();
};

export const getPokemonByGeneration = async (generation) => {
  try {
    const response = await fetch(`${BASE_URL}/gen/${generation}`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.map(formatPokemon);
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de la génération ${generation}:`,
      error
    );
    return [];
  }
};
