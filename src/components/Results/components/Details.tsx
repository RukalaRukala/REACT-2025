import { useGetPetByIdQuery } from '../../../store/api/petsApi';
import { DETAILS_MESSAGES } from './Details.const';
import styles from './Details.module.scss';

function Details({ id, onClose }: { id: string; onClose: () => void }) {
  const {
    data: pet,
    isLoading: loading,
    error,
    refetch,
  } = useGetPetByIdQuery(Number(id));

  const errorMessage = error
    ? DETAILS_MESSAGES.ERROR
    : pet === null || pet === undefined
      ? DETAILS_MESSAGES.NOT_FOUND
      : null;

  if (loading) {
    return (
      <>
        <div className={styles.detailsOverlay} />
        <div className={styles.detailsPanel}>
          <button
            onClick={onClose}
            aria-label="Close details"
            className={styles.detailsClose}
          >
            ×
          </button>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <div className={styles.loadingText}>{DETAILS_MESSAGES.LOADING}</div>
          </div>
        </div>
      </>
    );
  }

  if (errorMessage) {
    return (
      <>
        <div className={styles.detailsOverlay} />
        <div className={styles.detailsPanel}>
          <button
            onClick={onClose}
            aria-label="Close details"
            className={styles.detailsClose}
          >
            ×
          </button>
          <div className={styles.errorContainer}>
            <div className={styles.errorMessage}>{errorMessage}</div>
            <button
              onClick={() => refetch()}
              className={styles.retryButton}
              type="button"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!pet) return null;

  return (
    <>
      <div className={styles.detailsOverlay} />
      <div className={styles.detailsPanel}>
        <button
          onClick={onClose}
          aria-label="Close details"
          className={styles.detailsClose}
        >
          ×
        </button>
        <h2>{DETAILS_MESSAGES.TITLE}</h2>
        <div>
          {DETAILS_MESSAGES.ID}: {pet.id}
        </div>
        <div>
          {DETAILS_MESSAGES.NAME}: {pet.name}
        </div>
        <div>
          {DETAILS_MESSAGES.STATUS}: {pet.status}
        </div>
        <div>
          {DETAILS_MESSAGES.CATEGORY}: {pet.category && pet.category.name}
        </div>
      </div>
    </>
  );
}

export default Details;
