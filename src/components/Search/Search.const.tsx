export const EMPTY_STRING = '';
export const STORAGE_KEY = 'searchQuery';
export const SEARCH_BUTTON_TEXT = 'Search';
export const PLACEHOLDER = 'Enter pet status (available, pending, sold)';

export const ITEM_LABELS = {
  ID: 'ID:',
  NAME: 'Name:',
  CATEGORY: 'Category:',
} as const;

export const DEFAULT_VALUES = {
  CATEGORY_NOT_SPECIFIED: 'Not specified',
} as const;

export const APP_TITLES = {
  MAIN_TITLE: 'Pet Store Search',
  SUBTITLE: 'Find your perfect pet by status',
  SEARCH_SECTION: 'Search Pets',
} as const;

export const APP_MESSAGES = {
  SEARCHING: 'Searching...',
  SEARCH_RESULTS: 'Search Results',
  ERROR_OCCURRED: 'An error occurred while searching for pets',
} as const;

export const CONSOLE_MESSAGES = {
  SEARCH_ERROR: 'Search error:',
  STORAGE_LOAD_ERROR: 'Failed to load search query from storage:',
  STORAGE_SAVE_ERROR: 'Failed to save search query:',
  SEARCH_START_ERROR: 'Error starting search:',
} as const;

export const SEARCH_FIELD_LABELS = {
  ARIA_LABEL: 'Pet search field',
  HINT_TEXT: 'Enter pet status for search',
} as const;

export const SEARCH_BUTTON_LABELS = {
  ICON_TEXT: 'Search',
  ARIA_LABEL: 'Start pet search',
} as const;

export const STATUS_HINT_LABELS = {
  ICON_TEXT: 'Hint',
  TITLE: 'Enter one of these status types:',
} as const;

export const RESULTS_MESSAGES = {
  NO_PETS_FOUND: 'No pets found',
} as const;

export const ERROR_BOUNDARY_MESSAGES = {
  TITLE: 'Oops! Something went wrong',
  DESCRIPTION: 'An unexpected error occurred in the application.',
  TRY_AGAIN: 'Try Again',
  RELOAD_PAGE: 'Reload Page',
  ERROR_DETAILS: 'Error Details (Development Only)',
} as const;

export const TEST_ERROR_MESSAGES = {
  BUTTON_TEXT: 'Test Error Boundary',
  ERROR_MESSAGE: 'This is a test error thrown intentionally!',
} as const;
