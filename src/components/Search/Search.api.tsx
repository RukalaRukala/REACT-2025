import type { Pet } from './Search.model.tsx';

const PET_STORE_URL = 'https://petstore3.swagger.io/api/v3/pet/findByStatus';

export const searchPetsByStatus = async (query: string): Promise<Pet[]> => {
  const searchQuery = query.trim();

  if (!searchQuery) {
    throw new Error('Please enter pet status');
  }

  try {
    const response = await fetch(`${PET_STORE_URL}?status=${searchQuery}`);

    if (!response.ok) {
      throw new Error(`Store error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()).slice(0, 10);
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};
