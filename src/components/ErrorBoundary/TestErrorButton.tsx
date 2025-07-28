import { useState } from 'react';
import { TEST_ERROR_MESSAGES } from '../Search/Search.const.tsx';
import styles from './TestErrorButton.module.scss';

const TestErrorButton = () => {
  const [shouldThrowError, setShouldThrowError] = useState<boolean>(false);

  const handleThrowError = (): void => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error(TEST_ERROR_MESSAGES.ERROR_MESSAGE);
  }

  return (
    <button onClick={handleThrowError} className={styles.testErrorButton}>
      {TEST_ERROR_MESSAGES.BUTTON_TEXT}
    </button>
  );
};

export default TestErrorButton;
