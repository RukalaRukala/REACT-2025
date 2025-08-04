import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { unselectAllPets } from '../../store/selectedItemsSlice';
import styles from './Flyout.module.scss';

interface CsvData {
  id: number;
  name: string;
  status: string;
  category: string;
  tags: string;
  photoUrls: string;
}

const Flyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedPets = useAppSelector(
    (state) => state.selectedItems.selectedPets
  );
  const selectedCount = selectedPets.length;

  if (selectedCount === 0) {
    return null;
  }

  function handleUnselectAll() {
    dispatch(unselectAllPets());
  }

  function handleDownload() {
    const csvData: CsvData[] = [];
    for (let i = 0; i < selectedPets.length; i++) {
      const pet = selectedPets[i];
      csvData.push({
        id: pet.id,
        name: pet.name ? pet.name : 'N/A',
        status: pet.status ? pet.status : 'N/A',
        category: pet.category && pet.category.name ? pet.category.name : 'N/A',
        tags:
          pet.tags && pet.tags.length > 0
            ? pet.tags.map((tag) => tag.name).join('; ')
            : 'N/A',
        photoUrls:
          pet.photoUrls && pet.photoUrls.length > 0
            ? pet.photoUrls.join('; ')
            : 'N/A',
      });
    }
    const headers: string[] = [
      'ID',
      'Name',
      'Status',
      'Category',
      'Tags',
      'Photo URLs',
    ];
    const csvRows: string[] = [];
    csvRows.push(headers.join(','));
    for (let i = 0; i < csvData.length; i++) {
      const pet = csvData[i];
      csvRows.push(
        [
          pet.id,
          '"' + pet.name + '"',
          '"' + pet.status + '"',
          '"' + pet.category + '"',
          '"' + pet.tags + '"',
          '"' + pet.photoUrls + '"',
        ].join(',')
      );
    }
    const csvString: string = csvRows.join('\n');
    const blob: Blob = new Blob([csvString], {
      type: 'text/csv;charset=utf-8;',
    });
    const link: HTMLAnchorElement = document.createElement('a');
    const url: string = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', selectedCount + '_items.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <aside className={styles.flyout}>
      <div className={styles.content}>
        <div>
          <span className={styles.count}>
            {selectedCount} {selectedCount === 1 ? 'item is' : 'items are'}{' '}
            selected
          </span>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={handleUnselectAll}
            className={styles.button + ' ' + styles.buttonSecondary}
          >
            Unselect all
          </button>
          <button
            onClick={handleDownload}
            className={styles.button + ' ' + styles.buttonPrimary}
          >
            Download
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Flyout;
