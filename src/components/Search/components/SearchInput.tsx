import React from 'react';
import { PLACEHOLDER, SEARCH_FIELD_LABELS } from '../Search.const.tsx';
import styles from '../Search.module.scss';

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={PLACEHOLDER}
      className={styles.searchField}
      autoComplete="off"
      aria-label={SEARCH_FIELD_LABELS.ARIA_LABEL}
    />
  );
};

export default SearchInput;
