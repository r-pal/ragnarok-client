import { IGame, IPostGame } from '../types/game';
import { apiCall } from './config';

// GET all games
export async function getGames(): Promise<IGame[]> {
  return apiCall<IGame[]>('/api/games');
}

// GET single game by ID
export async function getGameById(id: number): Promise<IGame> {
  return apiCall<IGame>(`/api/games/${id}`);
}

// POST new game
export async function createGame(game: IPostGame): Promise<IGame> {
  return apiCall<IGame>('/api/games', {
    method: 'POST',
    body: JSON.stringify(game),
  });
}

// PATCH update game
export async function updateGame(id: number, updates: Partial<IPostGame>): Promise<IGame> {
  return apiCall<IGame>(`/api/games/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}

// DELETE game
export async function deleteGame(id: number): Promise<void> {
  return apiCall<void>(`/api/games/${id}`, {
    method: 'DELETE',
  });
}
