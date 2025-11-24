// Mock API adapter to simulate API calls with local data
import { getHouses as housesData } from './getHouses';
import { getFactions as factionsData } from './getFactions';
import { getGames as gamesData } from './getGames';
import { IHouse, IPostHouse } from '../types/house';
import { IFaction } from '../types/faction';
import { IGame, IPostGame } from '../types/game';

// In-memory storage for mock data
let houses: IHouse[] = [...housesData];
let factions: (IFaction & { id: number })[] = factionsData.map((f, i) => ({ ...f, id: i + 1 }));
let games: IGame[] = [...gamesData];

// Helper to simulate API delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Houses
export async function getHouses(): Promise<IHouse[]> {
  await delay();
  return [...houses];
}

export async function createHouse(house: IPostHouse): Promise<IHouse> {
  await delay();
  
  // Ensure strength and weakness are defined
  if (!house.strength || !house.weakness) {
    throw new Error('Strength and weakness are required');
  }
  
  const newHouse: IHouse = {
    id: Math.max(0, ...houses.map(h => h.id)) + 1,
    name: house.name,
    motto: house.motto,
    crestUrl: house.crestUrl,
    strength: house.strength,
    weakness: house.weakness,
    password: house.password,
    score: {
      choleric: 0,
      phlegmatic: 0,
      melancholic: 0,
      sanguine: 0
    }
  };
  houses.push(newHouse);
  return newHouse;
}

export async function updateHouse(id: number, updates: Partial<IPostHouse>): Promise<IHouse> {
  await delay();
  const index = houses.findIndex(h => h.id === id);
  if (index === -1) throw new Error('House not found');
  
  houses[index] = { ...houses[index], ...updates };
  return houses[index];
}

export async function deleteHouse(id: number): Promise<void> {
  await delay();
  houses = houses.filter(h => h.id !== id);
}

// Factions
export async function getFactions(): Promise<(IFaction & { id: number })[]> {
  await delay();
  return [...factions];
}

export async function createFaction(faction: IFaction): Promise<IFaction & { id: number }> {
  await delay();
  const newFaction = {
    ...faction,
    id: Math.max(0, ...factions.map(f => f.id)) + 1
  };
  factions.push(newFaction);
  return newFaction;
}

export async function updateFaction(id: number, updates: Partial<IFaction>): Promise<IFaction & { id: number }> {
  await delay();
  const index = factions.findIndex(f => f.id === id);
  if (index === -1) throw new Error('Faction not found');
  
  factions[index] = { ...factions[index], ...updates };
  return factions[index];
}

export async function deleteFaction(id: number): Promise<void> {
  await delay();
  factions = factions.filter(f => f.id !== id);
}

// Games
export async function getGames(): Promise<IGame[]> {
  await delay();
  return [...games];
}

export async function createGame(game: IPostGame): Promise<IGame> {
  await delay();
  const newGame: IGame = {
    id: Math.max(0, ...games.map(g => g.id)) + 1,
    name: game.name,
    scores: game.scores,
    description: game.description
  };
  games.push(newGame);
  
  // Update house scores
  game.scores.forEach(gameScore => {
    const house = houses.find(h => h.id === gameScore.houseId);
    if (house && house.score) {
      house.score.choleric += gameScore.score.choleric;
      house.score.phlegmatic += gameScore.score.phlegmatic;
      house.score.melancholic += gameScore.score.melancholic;
      house.score.sanguine += gameScore.score.sanguine;
    }
  });
  
  return newGame;
}

export async function updateGame(id: number, updates: Partial<IPostGame>): Promise<IGame> {
  await delay();
  const index = games.findIndex(g => g.id === id);
  if (index === -1) throw new Error('Game not found');
  
  games[index] = { ...games[index], ...updates };
  return games[index];
}

export async function deleteGame(id: number): Promise<void> {
  await delay();
  games = games.filter(g => g.id !== id);
}
