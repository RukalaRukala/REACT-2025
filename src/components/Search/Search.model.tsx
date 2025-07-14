export interface SearchButtonProps {
  onSearch: () => void;
}

export interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}
