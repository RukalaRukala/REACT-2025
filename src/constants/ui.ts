export const UI_TEXTS = {
  BUTTONS: {
    SEARCH: 'Search',
  },
  PLACEHOLDERS: {
    SEARCH_INPUT: 'Enter pet status (available, pending, sold)',
  },
  LABELS: {
    ID: 'ID:',
    NAME: 'Name:',
    CATEGORY: 'Category:',
  },
} as const;

export const DEFAULT_VALUES = {
  CATEGORY_NOT_SPECIFIED: 'Not specified',
} as const;

export const SEARCH_FIELD_LABELS = {
  ARIA_LABEL: 'Search for pets by status',
  HINT_TEXT: 'Try typing: available, pending, or sold',
} as const;

export const SEARCH_BUTTON_LABELS = {
  ARIA_LABEL: 'Start search for pets',
} as const;

export const STATUS_HINT_LABELS = {
  TITLE: 'Available statuses:',
} as const;

export const RESULTS_MESSAGES = {
  NO_PETS_FOUND: 'No pets found for the specified status',
  LOADING: 'Loading pets...',
} as const;

export const ERROR_BOUNDARY_MESSAGES = {
  TITLE: 'Something went wrong',
  DESCRIPTION:
    'An unexpected error occurred. Please try one of the options below:',
  TRY_AGAIN: 'Try Again',
  RELOAD_PAGE: 'Reload Page',
  ERROR_DETAILS: 'Error Details:',
} as const;
