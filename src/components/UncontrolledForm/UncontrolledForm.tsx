import React, { useRef, useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { formValidationSchema } from '../../utils/validation';
import { PasswordStrength } from '../PasswordStrength/PasswordStrength';
import type { FormData } from '../../types/form';
import './UncontrolledForm.scss';
import { ValidationError } from 'yup';

interface UncontrolledFormProps {
  onSuccess: () => void;
}

export const UncontrolledForm: React.FC<UncontrolledFormProps> = ({
  onSuccess,
}) => {
  const { countries, addSubmittedData } = useAppStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentPassword, setCurrentPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        profilePicture: 'Размер файла не должен превышать 5MB',
      }));
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        profilePicture: 'Разрешены только форматы: JPEG, JPG, PNG',
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, profilePicture: '' }));
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const file = profilePictureRef.current?.files?.[0];
      let profilePicture: string | null = null;

      if (file) {
        profilePicture = await convertFileToBase64(file);
      }

      const formData: FormData = {
        name: nameRef.current?.value || '',
        age: Number(ageRef.current?.value) || 0,
        email: emailRef.current?.value || '',
        password: passwordRef.current?.value || '',
        confirmPassword: confirmPasswordRef.current?.value || '',
        gender: genderRef.current?.value as 'male' | 'female' | 'other',
        acceptTerms: acceptTermsRef.current?.checked || false,
        profilePicture,
        country: countryRef.current?.value || '',
      };

      await formValidationSchema.validate(formData, { abortEarly: false });

      addSubmittedData(formData, 'uncontrolled');
      onSuccess();
    } catch (error: unknown) {
      if (error instanceof ValidationError && error.inner) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err: ValidationError) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="uncontrolled-form">
      <div className="form-field">
        <label htmlFor="name" className="form-label">
          Имя *
        </label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          className={`form-input ${errors.name ? 'form-input--error' : ''}`}
          placeholder="Введите ваше имя"
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="age" className="form-label">
          Возраст *
        </label>
        <input
          type="number"
          id="age"
          ref={ageRef}
          min="1"
          max="120"
          className={`form-input ${errors.age ? 'form-input--error' : ''}`}
          placeholder="Введите ваш возраст"
        />
        {errors.age && <span className="form-error">{errors.age}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="email" className="form-label">
          Email *
        </label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          className={`form-input ${errors.email ? 'form-input--error' : ''}`}
          placeholder="Введите ваш email"
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="password" className="form-label">
          Пароль *
        </label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          className={`form-input ${errors.password ? 'form-input--error' : ''}`}
          placeholder="Введите пароль"
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        {errors.password && (
          <span className="form-error">{errors.password}</span>
        )}
        <PasswordStrength password={currentPassword} />
      </div>

      <div className="form-field">
        <label htmlFor="confirmPassword" className="form-label">
          Подтверждение пароля *
        </label>
        <input
          type="password"
          id="confirmPassword"
          ref={confirmPasswordRef}
          className={`form-input ${errors.confirmPassword ? 'form-input--error' : ''}`}
          placeholder="Подтвердите пароль"
        />
        {errors.confirmPassword && (
          <span className="form-error">{errors.confirmPassword}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="gender" className="form-label">
          Пол *
        </label>
        <select
          id="gender"
          ref={genderRef}
          className={`form-select ${errors.gender ? 'form-select--error' : ''}`}
          defaultValue=""
        >
          <option value="" disabled>
            Выберите пол
          </option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
          <option value="other">Другой</option>
        </select>
        {errors.gender && <span className="form-error">{errors.gender}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="country" className="form-label">
          Страна *
        </label>
        <select
          id="country"
          ref={countryRef}
          className={`form-select ${errors.country ? 'form-select--error' : ''}`}
          defaultValue=""
        >
          <option value="" disabled>
            Выберите страну
          </option>
          {countries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && <span className="form-error">{errors.country}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="profilePicture" className="form-label">
          Фото профиля
        </label>
        <input
          type="file"
          id="profilePicture"
          ref={profilePictureRef}
          accept="image/jpeg,image/jpg,image/png"
          className={`form-input ${errors.profilePicture ? 'form-input--error' : ''}`}
          onChange={handleFileChange}
        />
        <small className="form-hint">
          Разрешены форматы: JPEG, JPG, PNG. Максимальный размер: 5MB
        </small>
        {errors.profilePicture && (
          <span className="form-error">{errors.profilePicture}</span>
        )}
      </div>

      <div className="form-field form-field--checkbox">
        <label className="form-checkbox-label">
          <input
            type="checkbox"
            ref={acceptTermsRef}
            className="form-checkbox"
          />
          <span className="form-checkbox-text">
            Я согласен с{' '}
            <a href="#" className="form-link">
              условиями использования
            </a>{' '}
            *
          </span>
        </label>
        {errors.acceptTerms && (
          <span className="form-error">{errors.acceptTerms}</span>
        )}
      </div>

      <button
        type="submit"
        className="form-submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Отправка...' : 'Отправить форму'}
      </button>
    </form>
  );
};
