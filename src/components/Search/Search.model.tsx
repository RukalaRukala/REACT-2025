export interface SearchButtonProps {
  onSearch: () => void;
}

export interface SearchProps {
  onSearch: (query: string) => void;
}

export interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export interface Pet {
  id: number;
  name: string;
  status: 'available' | 'pending' | 'sold';
  category?: {
    id: number;
    name: string;
  };
  photoUrls: string[];
  tags?: Array<{
    id: number;
    name: string;
  }>;
}

export interface SearchState {
  searchQuery: string;
}
