import { Component } from 'react';
import { STATUS_HINT_LABELS, AVAILABLE_STATUSES } from '../../../constants';
import styles from './StatusHint.module.scss';

class StatusHint extends Component {
  renderTitle = () => {
    return <p className={styles.title}>{STATUS_HINT_LABELS.TITLE}</p>;
  };

  renderStatusesList = () => {
    return (
      <div className={styles.statuses}>
        {AVAILABLE_STATUSES.map((status, idx) => (
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
