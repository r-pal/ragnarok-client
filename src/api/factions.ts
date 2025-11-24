import { IFaction } from '../types/faction';
import { apiCall } from './config';

export interface IFactionWithId extends IFaction {
  id: number;
}

// GET all factions
export async function getFactions(): Promise<IFactionWithId[]> {
  return apiCall<IFactionWithId[]>('/api/factions');
}

// GET single faction by ID
export async function getFactionById(id: number): Promise<IFactionWithId> {
  return apiCall<IFactionWithId>(`/api/factions/${id}`);
}

// POST new faction
export async function createFaction(faction: IFaction): Promise<IFactionWithId> {
  return apiCall<IFactionWithId>('/api/factions', {
    method: 'POST',
    body: JSON.stringify(faction),
  });
}

// PATCH update faction
export async function updateFaction(id: number, updates: Partial<IFaction>): Promise<IFactionWithId> {
  return apiCall<IFactionWithId>(`/api/factions/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}

// DELETE faction
export async function deleteFaction(id: number): Promise<void> {
  return apiCall<void>(`/api/factions/${id}`, {
    method: 'DELETE',
  });
}
