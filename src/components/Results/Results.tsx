import { Component } from 'react';
import Item from './components/Item.tsx';
import SkeletonItem from './components/SkeletonItem.tsx';
import { RESULTS_MESSAGES } from '../Search/Search.const.tsx';
import styles from './Results.module.scss';
import type { Pet } from '../Search/Search.model.tsx';

interface ResultsProps {
  pets: Pet[];
  isLoading: boolean;
}

class Results extends Component<ResultsProps> {
  renderLoadingSkeletons = () => {
    return (
      <div className={styles.results}>
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </div>
    );
  };

  renderNoResults = () => {
    return (
      <div className={styles.results}>
        <div className={styles.noResults}>{RESULTS_MESSAGES.NO_PETS_FOUND}</div>
      </div>
    );
  };

  renderPetsList = () => {
    const { pets } = this.props;

    return (
      <div className={styles.results}>
        {pets.map((pet, index) => (
          <Item key={`${pet.id}-${index}`} pet={pet} />
        ))}
      </div>
    );
  };

  render() {
    const { pets, isLoading } = this.props;

    if (isLoading) return this.renderLoadingSkeletons();
    if (!pets.length) return this.renderNoResults();

    return this.renderPetsList();
  }
}

export default Results;
