export const APP_TITLES = {
  MAIN_TITLE: 'Pet Store Search',
  SUBTITLE: 'Find your perfect pet by status',
  SEARCH_SECTION: 'Search Pets',
} as const;

export const APP_MESSAGES = {
  ERROR_OCCURRED: 'An error occurred',
  SEARCHING: 'Searching...',
  SEARCH_RESULTS: 'Search Results',
} as const;

export const CONSOLE_MESSAGES = {
  SEARCH_ERROR: 'Search error:',
  STORAGE_LOAD_ERROR: 'Failed to load saved search query:',
  STORAGE_SAVE_ERROR: 'Failed to save search query:',
  SEARCH_START_ERROR: 'Failed to start search:',
} as const;

export const ERROR_BOUNDARY_MESSAGES = {
  TITLE: 'Oops! Something went wrong',
  DESCRIPTION:
    'An unexpected error occurred. Please try one of the options below:',
  TRY_AGAIN: 'Try Again',
  RELOAD_PAGE: 'Reload Page',
  ERROR_DETAILS: 'Error Details:',
} as const;

export const RESULTS_MESSAGES = {
  NO_PETS_FOUND: 'No pets found',
} as const;

export const TEST_ERROR_MESSAGES = {
  BUTTON_TEXT: 'Test Error',
  ERROR_MESSAGE: 'This is a test error for ErrorBoundary testing',
} as const;

export const UI_TEXTS = {
  SEARCH_PLACEHOLDER: 'Enter pet status...',
  SEARCH_BUTTON: 'Search',
  NO_PHOTO: 'No photo',
  STATUS_AVAILABLE: 'Available',
  STATUS_PENDING: 'Pending',
  STATUS_SOLD: 'Sold',
  PLACEHOLDERS: {
    SEARCH_INPUT: 'Enter pet status (available, pending, sold)',
  },
  BUTTONS: {
    SEARCH: 'Search',
  },
  LABELS: {
    ID: 'ID:',
    NAME: 'Name:',
    CATEGORY: 'Category:',
  },
} as const;

export const SEARCH_FIELD_LABELS = {
  PLACEHOLDER: 'Enter pet status (available, pending, sold)',
  ARIA_LABEL: 'Search for pets by status',
  HINT_TEXT: 'Available statuses: available, pending, sold',
} as const;

export const SEARCH_BUTTON_LABELS = {
  TEXT: 'Search Pets',
  ARIA_LABEL: 'Start search',
} as const;

export const STATUS_HINT_LABELS = {
  TITLE: 'Available statuses:',
} as const;

export const AVAILABLE_STATUSES = ['available', 'pending', 'sold'] as const;

export const DEFAULT_VALUES = {
  PET_NAME: 'Unknown Pet',
  CATEGORY_NAME: 'Unknown Category',
  PHOTO_ALT: 'Pet photo',
  CATEGORY_NOT_SPECIFIED: 'Not specified',
} as const;
