import React from 'react';
import type { SearchFieldProps } from '../Search.model.tsx';
import { PLACEHOLDER, SEARCH_FIELD_LABELS } from '../Search.const.tsx';
import styles from '../Search.module.scss';

const SearchField = ({ value, onChange }: SearchFieldProps) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  const renderInput = () => {
    return (
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={PLACEHOLDER}
        className={styles.searchField}
        autoComplete="off"
        aria-label={SEARCH_FIELD_LABELS.ARIA_LABEL}
      />
    );
  };

  return (
    <div className={styles.searchFieldContainer}>
      {renderInput()}

      {value.trim().length === 0 && (
        <div className={styles.hint}>{SEARCH_FIELD_LABELS.HINT_TEXT}</div>
      )}
    </div>
  );
};

export default SearchField;
