import { Component } from 'react';
import { TEST_ERROR_MESSAGES } from '../Search/Search.const.tsx';

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
        onClick={this.handleThrowError}
        style={{
          padding: '8px 16px',
          backgroundColor: '#dc2626',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '16px',
        }}
      >
        {TEST_ERROR_MESSAGES.BUTTON_TEXT}
      </button>
    );
  }
}

export default TestErrorButton;
