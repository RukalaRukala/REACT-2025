import styles from './StatusHint.module.scss';

function StatusHint() {
  return (
    <div className={styles.hint}>
      <div className={styles.icon}>💡</div>
      <div className={styles.content}>
        <p className={styles.title}>Print one of these status types:</p>
        <div className={styles.statuses}>
          <span className={styles.status}>available</span>
          <span className={styles.status}>pending</span>
          <span className={styles.status}>sold</span>
        </div>
      </div>
    </div>
  );
}

export default StatusHint;
