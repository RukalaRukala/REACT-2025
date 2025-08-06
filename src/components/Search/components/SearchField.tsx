import React from 'react';
import type { SearchFieldProps } from '../Search.model.tsx';
import SearchInput from './SearchInput';
import styles from '../Search.module.scss';

const SearchField = ({ value, onChange }: SearchFieldProps) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <div className={styles.searchFieldContainer}>
      <SearchInput value={value} onChange={handleInputChange} />
    </div>
  );
};

export default SearchField;
