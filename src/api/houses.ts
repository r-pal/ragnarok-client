import { IHouse, IPostHouse } from '../types/house';
import { apiCall } from './config';

// GET all houses
export async function getHouses(): Promise<IHouse[]> {
  return apiCall<IHouse[]>('/api/houses');
}

// GET single house by ID
export async function getHouseById(id: number): Promise<IHouse> {
  return apiCall<IHouse>(`/api/houses/${id}`);
}

// POST new house
export async function createHouse(house: IPostHouse): Promise<IHouse> {
  return apiCall<IHouse>('/api/houses', {
    method: 'POST',
    body: JSON.stringify(house),
  });
}

// PATCH update house
export async function updateHouse(id: number, updates: Partial<IPostHouse>): Promise<IHouse> {
  return apiCall<IHouse>(`/api/houses/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}

// DELETE house
export async function deleteHouse(id: number): Promise<void> {
  return apiCall<void>(`/api/houses/${id}`, {
    method: 'DELETE',
  });
}
