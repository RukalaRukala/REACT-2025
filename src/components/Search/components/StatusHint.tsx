import { STATUS_HINT_LABELS } from '../Search.const.tsx';
import styles from './StatusHint.module.scss';

const StatusHint = () => {
  const getAvailableStatuses = (): string[] => {
    return ['available', 'pending', 'sold'];
  };

  const renderTitle = () => {
    return <p className={styles.title}>{STATUS_HINT_LABELS.TITLE}</p>;
  };

  const renderStatusesList = () => {
    const statuses = getAvailableStatuses();

    return (
      <div className={styles.statuses}>
        {statuses.map((status, idx) => (
          <span key={idx} className={styles.status}>
            {status}
          </span>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={styles.content}>
        {renderTitle()}
        {renderStatusesList()}
        <p className={styles.info}>
          Each status is queried only once, subsequent searches use cache. If
          you want to refresh data from the server, select a status and press
          refresh.
        </p>
      </div>
    );
  };

  return <div className={styles.hint}>{renderContent()}</div>;
};

export default StatusHint;
