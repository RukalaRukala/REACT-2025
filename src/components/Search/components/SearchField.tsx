import type { SearchFieldProps } from '../Search.model.tsx';
import * as React from 'react';
import { PLACEHOLDER } from '../Search.const.tsx';
import styles from '../Search.module.scss';

function SearchField({ value, onChange }: SearchFieldProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder={PLACEHOLDER}
      className={styles.searchField}
    />
  );
}

export default SearchField;
