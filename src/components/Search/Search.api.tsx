import type { Pet } from './Search.model';

const API_BASE_URL = 'https://petstore.swagger.io/v2';

export const searchPetsByStatus = async (status: string): Promise<Pet[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/pet/findByStatus?status=${status}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
};
