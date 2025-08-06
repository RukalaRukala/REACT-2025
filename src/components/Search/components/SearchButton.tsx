import { Component } from 'react';
import type { SearchButtonProps } from '../Search.model.tsx';
import { UI_TEXTS, SEARCH_BUTTON_LABELS } from '../../../constants';
import styles from '../Search.module.scss';

class SearchButton extends Component<SearchButtonProps> {
  handleClick = (): void => {
    const { onSearch } = this.props;
    onSearch();
  };

  render() {
    return (
      <button
        type="button"
        onClick={this.handleClick}
        className={styles.searchButton}
        aria-label={SEARCH_BUTTON_LABELS.ARIA_LABEL}
      >
        <span className={styles.buttonText}>{UI_TEXTS.BUTTONS.SEARCH}</span>
      </button>
    );
  }
}

export default SearchButton;
