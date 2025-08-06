import { Component } from 'react';
import { TEST_ERROR_MESSAGES } from '../../constants';
import styles from './TestErrorButton.module.scss';

interface TestErrorButtonState {
  shouldThrowError: boolean;
}

class TestErrorButton extends Component<
  Record<string, never>,
  TestErrorButtonState
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      shouldThrowError: false,
    };
  }

  handleThrowError = (): void => {
    this.setState({ shouldThrowError: true });
  };

  render() {
    if (this.state.shouldThrowError) {
      throw new Error(TEST_ERROR_MESSAGES.ERROR_MESSAGE);
    }

    return (
      <button
        type="button"
        onClick={this.handleThrowError}
        className={styles.errorButton}
      >
        Test Error Boundary
      </button>
    );
  }
}

export default TestErrorButton;
