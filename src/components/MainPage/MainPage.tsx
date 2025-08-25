import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { Modal } from '../Modal/Modal';
import { UncontrolledForm } from '../UncontrolledForm/UncontrolledForm';
import { ReactHookFormComponent } from '../ReactHookFormComponent/ReactHookFormComponent';
import type { SubmittedData } from '../../types/form';
import './MainPage.scss';

export const MainPage: React.FC = () => {
  const {
    submittedData,
    loadCountries,
    lastSubmittedId,
    clearLastSubmittedId,
  } = useAppStore();

  const [isUncontrolledModalOpen, setIsUncontrolledModalOpen] = useState(false);
  const [isReactHookFormModalOpen, setIsReactHookFormModalOpen] =
    useState(false);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  useEffect(() => {
    if (lastSubmittedId) {
      const timer = setTimeout(() => {
        clearLastSubmittedId();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [lastSubmittedId, clearLastSubmittedId]);

  const handleUncontrolledFormSuccess = () => {
    setIsUncontrolledModalOpen(false);
  };

  const handleReactHookFormSuccess = () => {
    setIsReactHookFormModalOpen(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const renderDataCard = (data: SubmittedData) => {
    const isNew = data.id === lastSubmittedId;

    return (
      <div
        key={data.id}
        className={`data-card ${isNew ? 'data-card--highlighted' : ''}`}
      >
        <div className="data-card__header">
          <h3 className="data-card__title">{data.name}</h3>
          <span
            className={`data-card__badge data-card__badge--${data.formType}`}
          >
            {data.formType === 'uncontrolled'
              ? 'Uncontrolled'
              : 'React Hook Form'}
          </span>
        </div>

        <div className="data-card__content">
          <div className="data-card__row">
            <span className="data-card__label">Age:</span>
            <span className="data-card__value">{data.age} years old</span>
          </div>

          <div className="data-card__row">
            <span className="data-card__label">Email:</span>
            <span className="data-card__value">{data.email}</span>
          </div>

          <div className="data-card__row">
            <span className="data-card__label">Gender:</span>
            <span className="data-card__value">
              {data.gender === 'male'
                ? 'Male'
                : data.gender === 'female'
                  ? 'Female'
                  : 'Other'}
            </span>
          </div>

          <div className="data-card__row">
            <span className="data-card__label">Country:</span>
            <span className="data-card__value">{data.country}</span>
          </div>

          {data.profilePicture && (
            <div className="data-card__row">
              <span className="data-card__label">Photo:</span>
              <img
                src={data.profilePicture}
                alt="Profile"
                className="data-card__image"
              />
            </div>
          )}

          <div className="data-card__row">
            <span className="data-card__label">Submitted:</span>
            <span className="data-card__value">
              {formatDate(data.submittedAt)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="main-page">
      <header className="main-page__header">
        <h1 className="main-page__title">Forms and Portals Application</h1>
        <p className="main-page__description">
          Demonstration of uncontrolled forms and React Hook Form
        </p>
      </header>

      <section className="main-page__actions">
        <button
          className="action-button action-button--uncontrolled"
          onClick={() => setIsUncontrolledModalOpen(true)}
        >
          Open Uncontrolled Form
        </button>

        <button
          className="action-button action-button--react-hook-form"
          onClick={() => setIsReactHookFormModalOpen(true)}
        >
          Open React Hook Form
        </button>
      </section>

      <section className="main-page__data">
        <h2 className="main-page__data-title">
          Submitted Data ({submittedData.length})
        </h2>

        {submittedData.length === 0 ? (
          <div className="empty-state">
            <p>No submitted forms yet</p>
            <p>Click one of the buttons above to fill out a form</p>
          </div>
        ) : (
          <div className="data-grid">
            {submittedData
              .sort(
                (a, b) =>
                  new Date(b.submittedAt).getTime() -
                  new Date(a.submittedAt).getTime()
              )
              .map(renderDataCard)}
          </div>
        )}
      </section>

      <Modal
        isOpen={isUncontrolledModalOpen}
        onClose={() => setIsUncontrolledModalOpen(false)}
        title="Uncontrolled Form"
      >
        <UncontrolledForm onSuccess={handleUncontrolledFormSuccess} />
      </Modal>

      <Modal
        isOpen={isReactHookFormModalOpen}
        onClose={() => setIsReactHookFormModalOpen(false)}
        title="React Hook Form"
      >
        <ReactHookFormComponent onSuccess={handleReactHookFormSuccess} />
      </Modal>
    </div>
  );
};
