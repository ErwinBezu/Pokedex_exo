import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const usePokemonStore = create(
  persist(
    (set, get) => ({
      trainerName: "Dresseur Pokémon",
      favorites: [],
      team: [],
      history: [],

      addToFavorites: (pokemon) => {
        const { favorites, addToHistory } = get();
        if (!favorites.find((p) => p.id === pokemon.id)) {
          set({ favorites: [...favorites, pokemon] });
          addToHistory({
            action: "favorite",
            pokemon: pokemon.name,
            timestamp: new Date().toISOString(),
          });
        }
      },

      removeFromFavorites: (pokemonId) => {
        const { favorites, addToHistory } = get();
        const pokemon = favorites.find((p) => p.id === pokemonId);
        if (pokemon) {
          set({ favorites: favorites.filter((p) => p.id !== pokemonId) });
          addToHistory({
            action: "unfavorite",
            pokemon: pokemon.name,
            timestamp: new Date().toISOString(),
          });
        }
      },

      isFavorite: (pokemonId) =>
        get().favorites.some((p) => p.id === pokemonId),

      addToTeam: (pokemon) => {
        const { team, addToHistory } = get();
        if (team.length < 6 && !team.find((p) => p.id === pokemon.id)) {
          set({ team: [...team, pokemon] });
          addToHistory({
            action: "capture",
            pokemon: pokemon.name,
            timestamp: new Date().toISOString(),
          });
          return true;
        }
        return false;
      },

      removeFromTeam: (pokemonId) => {
        const { team, addToHistory } = get();
        const pokemon = team.find((p) => p.id === pokemonId);
        if (pokemon) {
          set({ team: team.filter((p) => p.id !== pokemonId) });
          addToHistory({
            action: "release",
            pokemon: pokemon.name,
            timestamp: new Date().toISOString(),
          });
        }
      },

      isInTeam: (pokemonId) => get().team.some((p) => p.id === pokemonId),

      addToHistory: (entry) => {
        const { history } = get();
        const newHistory = [entry, ...history].slice(0, 50);
        set({ history: newHistory });
      },

      setTrainerName: (name) => set({ trainerName: name }),

      getStats: () => {
        const { team, favorites, history } = get();
        return {
          totalCaptured: team.length,
          totalFavorites: favorites.length,
          trainerLevel: Math.floor(team.length / 2) + 1,
          badges: Math.floor(team.length / 3),
          totalActions: history.length,
        };
      },

      resetTrainerData: () =>
        set({
          favorites: [],
          team: [],
          history: [],
          trainerName: "Dresseur Pokémon",
        }),

      initializeStore: () => {}, // plus rien à faire ici
    }),
    {
      name: "pokemon-trainer-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        trainerName: state.trainerName,
        favorites: state.favorites,
        team: state.team,
        history: state.history,
      }),
    }
  )
);

export default usePokemonStore;
