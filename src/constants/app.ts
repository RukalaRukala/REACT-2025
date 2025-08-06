export const APP_TITLES = {
  MAIN_TITLE: 'Pet Store Search',
  SUBTITLE: 'Find your perfect pet by status',
  SEARCH_SECTION: 'Search Pets',
} as const;

export const CONSOLE_MESSAGES = {
  STORAGE_LOAD_ERROR: 'Failed to load search query from localStorage:',
  STORAGE_SAVE_ERROR: 'Failed to save search query to localStorage:',
  SEARCH_START_ERROR: 'Error occurred while starting search:',
  SEARCH_ERROR: 'Search error occurred:',
} as const;

export const TEST_ERROR_MESSAGES = {
  ERROR_MESSAGE: 'This is a test error for ErrorBoundary testing',
} as const;

export const APP_MESSAGES = {
  ERROR_OCCURRED: 'An error occurred during the search',
  SEARCHING: 'Searching...',
  SEARCH_RESULTS: 'Search Results',
} as const;
