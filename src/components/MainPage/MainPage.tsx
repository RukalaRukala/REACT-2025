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
    return new Intl.DateTimeFormat('ru-RU', {
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
            <span className="data-card__label">Возраст:</span>
            <span className="data-card__value">{data.age} лет</span>
          </div>

          <div className="data-card__row">
            <span className="data-card__label">Email:</span>
            <span className="data-card__value">{data.email}</span>
          </div>

          <div className="data-card__row">
            <span className="data-card__label">Пол:</span>
            <span className="data-card__value">
              {data.gender === 'male'
                ? 'Мужской'
                : data.gender === 'female'
                  ? 'Женский'
                  : 'Другой'}
            </span>
          </div>

          <div className="data-card__row">
            <span className="data-card__label">Страна:</span>
            <span className="data-card__value">{data.country}</span>
          </div>

          {data.profilePicture && (
            <div className="data-card__row">
              <span className="data-card__label">Фото:</span>
              <img
                src={data.profilePicture}
                alt="Профиль"
                className="data-card__image"
              />
            </div>
          )}

          <div className="data-card__row">
            <span className="data-card__label">Отправлено:</span>
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
        <h1 className="main-page__title">Приложение с формами и порталами</h1>
        <p className="main-page__description">
          Демонстрация работы с uncontrolled формами и React Hook Form
        </p>
      </header>

      <section className="main-page__actions">
        <button
          className="action-button action-button--uncontrolled"
          onClick={() => setIsUncontrolledModalOpen(true)}
        >
          Открыть Uncontrolled форму
        </button>

        <button
          className="action-button action-button--react-hook-form"
          onClick={() => setIsReactHookFormModalOpen(true)}
        >
          Открыть React Hook Form
        </button>
      </section>

      <section className="main-page__data">
        <h2 className="main-page__data-title">
          Отправленные данные ({submittedData.length})
        </h2>

        {submittedData.length === 0 ? (
          <div className="empty-state">
            <p>Пока нет отправленных форм</p>
            <p>Нажмите на одну из кнопок выше, чтобы заполнить форму</p>
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
        title="Uncontrolled форма"
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
