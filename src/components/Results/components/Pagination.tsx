import React from 'react';
import styles from '../Results.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const handleClick = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        className={currentPage === i ? styles.activePage : ''}
        onClick={() => handleClick(i)}
        disabled={currentPage === i}
      >
        {i}
      </button>
    );
  }

  return <div className={styles.pagination}>{pages}</div>;
};

export default Pagination;
