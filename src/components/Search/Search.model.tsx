export interface SearchButtonProps {
  onSearch: () => void;
  disabled?: boolean;
}

export interface SearchProps {
  onSearch: (query: string) => void;
}

export interface ItemProps {
  pet: Pet;
}

export interface ResultsProps {
  pets: Pet[];
  isLoading: boolean;
}

export interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export interface PetCategory {
  id: number;
  name: string;
}

export interface PetTag {
  id: number;
  name: string;
}

export interface Pet {
  id: number;
  name: string;
  category?: PetCategory;
  photoUrls: string[];
  tags?: PetTag[];
  status: 'available' | 'pending' | 'sold';
}
