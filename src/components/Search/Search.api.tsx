import type { Pet } from './Search.model';

const API_BASE_URL = 'https://petstore.swagger.io/v2';

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const searchPetsByStatus = async (status: string): Promise<Pet[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/pet/findByStatus?status=${status}`
    );

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;

      // Meaningful error messages based on status codes
      switch (response.status) {
        case 400:
          errorMessage =
            'Invalid status value provided. Please use: available, pending, or sold.';
          break;
        case 404:
          errorMessage = 'Pet store service not found. Please try again later.';
          break;
        case 500:
          errorMessage =
            'Pet store service is temporarily unavailable. Please try again later.';
          break;
        case 503:
          errorMessage =
            'Pet store service is under maintenance. Please try again later.';
          break;
        default:
          if (response.status >= 400 && response.status < 500) {
            errorMessage =
              'Invalid request. Please check your input and try again.';
          } else if (response.status >= 500) {
            errorMessage = 'Server error occurred. Please try again later.';
          }
      }

      throw new ApiError(errorMessage);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError(
        'Network error. Please check your internet connection.'
      );
    }

    throw new ApiError('An unexpected error occurred while fetching pets.');
  }
};
