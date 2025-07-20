import { Component } from 'react';
import { STATUS_HINT_LABELS } from '../Search.const.tsx';
import styles from './StatusHint.module.scss';

class StatusHint extends Component {
  getAvailableStatuses = (): string[] => {
    return ['available', 'pending', 'sold'];
  };

  renderTitle = () => {
    return <p className={styles.title}>{STATUS_HINT_LABELS.TITLE}</p>;
  };

  renderStatusesList = () => {
    const statuses = this.getAvailableStatuses();

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

  renderContent = () => {
    return (
      <div className={styles.content}>
        {this.renderTitle()}
        {this.renderStatusesList()}
      </div>
    );
  };

  render() {
    return <div className={styles.hint}>{this.renderContent()}</div>;
  }
}

export default StatusHint;
