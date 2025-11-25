import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IHouse, IPostHouse } from '../types/house';
import { IFaction } from '../types/faction';
import { IGame, IPostGame } from '../types/game';
import * as api from '../api'

interface IFactionWithId extends IFaction {
  id: number;
}

interface DataContextType {
  // Data
  houses: IHouse[];
  factions: IFactionWithId[];
  games: IGame[];
  
  // Loading states
  isLoading: boolean;
  error: string | null;
  
  // House operations
  fetchHouses: () => Promise<void>;
  createHouse: (house: IPostHouse) => Promise<IHouse>;
  updateHouse: (id: number, updates: Partial<IPostHouse>) => Promise<IHouse>;
  deleteHouse: (id: number) => Promise<void>;
  
  // Faction operations
  fetchFactions: () => Promise<void>;
  createFaction: (faction: IFaction) => Promise<IFactionWithId>;
  updateFaction: (id: number, updates: Partial<IFaction>) => Promise<IFactionWithId>;
  deleteFaction: (id: number) => Promise<void>;
  
  // Game operations
  fetchGames: () => Promise<void>;
  createGame: (game: IPostGame) => Promise<IGame>;
  updateGame: (id: number, updates: Partial<IPostGame>) => Promise<IGame>;
  deleteGame: (id: number) => Promise<void>;
  
  // Refresh all data
  refreshAll: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [houses, setHouses] = useState<IHouse[]>([]);
  const [factions, setFactions] = useState<IFactionWithId[]>([]);
  const [games, setGames] = useState<IGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch houses
  const fetchHouses = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getHouses();
      setHouses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch houses');
      console.error('Error fetching houses:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch factions
  const fetchFactions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getFactions();
      setFactions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch factions');
      console.error('Error fetching factions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch games
  const fetchGames = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getGames();
      setGames(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch games');
      console.error('Error fetching games:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Create house
  const createHouse = async (house: IPostHouse): Promise<IHouse> => {
    try {
      setIsLoading(true);
      setError(null);
      const newHouse = await api.createHouse(house);
      await fetchHouses(); // Refresh list
      return newHouse;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create house');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update house
  const updateHouse = async (id: number, updates: Partial<IPostHouse>): Promise<IHouse> => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedHouse = await api.updateHouse(id, updates);
      await fetchHouses(); // Refresh list
      return updatedHouse;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update house');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete house
  const deleteHouse = async (id: number): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await api.deleteHouse(id);
      await fetchHouses(); // Refresh list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete house');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Create faction
  const createFaction = async (faction: IFaction): Promise<IFactionWithId> => {
    try {
      setIsLoading(true);
      setError(null);
      const newFaction = await api.createFaction(faction);
      await fetchFactions(); // Refresh list
      await fetchHouses(); // Refresh houses as they may have faction info
      return newFaction;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create faction');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update faction
  const updateFaction = async (id: number, updates: Partial<IFaction>): Promise<IFactionWithId> => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedFaction = await api.updateFaction(id, updates);
      await fetchFactions(); // Refresh list
      await fetchHouses(); // Refresh houses as they may have faction info
      return updatedFaction;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update faction');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete faction
  const deleteFaction = async (id: number): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await api.deleteFaction(id);
      await fetchFactions(); // Refresh list
      await fetchHouses(); // Refresh houses as they may have faction info
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete faction');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Create game
  const createGame = async (game: IPostGame): Promise<IGame> => {
    try {
      setIsLoading(true);
      setError(null);
      const newGame = await api.createGame(game);
      await fetchGames(); // Refresh list
      await fetchHouses(); // Refresh houses as scores may have changed
      return newGame;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create game');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update game
  const updateGame = async (id: number, updates: Partial<IPostGame>): Promise<IGame> => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedGame = await api.updateGame(id, updates);
      await fetchGames(); // Refresh list
      await fetchHouses(); // Refresh houses as scores may have changed
      return updatedGame;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update game');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete game
  const deleteGame = async (id: number): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await api.deleteGame(id);
      await fetchGames(); // Refresh list
      await fetchHouses(); // Refresh houses as scores may have changed
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete game');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh all data
  const refreshAll = async () => {
    await Promise.all([
      fetchHouses(),
      fetchFactions(),
      fetchGames()
    ]);
  };

  // Initial data load
  useEffect(() => {
    refreshAll();
  }, []);

  const value: DataContextType = {
    houses,
    factions,
    games,
    isLoading,
    error,
    fetchHouses,
    createHouse,
    updateHouse,
    deleteHouse,
    fetchFactions,
    createFaction,
    updateFaction,
    deleteFaction,
    fetchGames,
    createGame,
    updateGame,
    deleteGame,
    refreshAll
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
