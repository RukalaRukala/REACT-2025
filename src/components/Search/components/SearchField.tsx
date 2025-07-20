import React, { Component } from 'react';
import type { SearchFieldProps } from '../Search.model.tsx';
import { PLACEHOLDER, SEARCH_FIELD_LABELS } from '../Search.const.tsx';
import styles from '../Search.module.scss';

class SearchField extends Component<SearchFieldProps> {
  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    this.props.onChange(newValue);
  };

  renderInput = () => {
    const { value } = this.props;

    return (
      <input
        type="text"
        value={value}
        onChange={this.handleInputChange}
        placeholder={PLACEHOLDER}
        className={styles.searchField}
        autoComplete="off"
        aria-label={SEARCH_FIELD_LABELS.ARIA_LABEL}
      />
    );
  };

  render() {
    return (
      <div className={styles.searchFieldContainer}>
        {this.renderInput()}

        {this.props.value.trim().length === 0 && (
          <div className={styles.hint}>{SEARCH_FIELD_LABELS.HINT_TEXT}</div>
        )}
      </div>
    );
  }
}

export default SearchField;
