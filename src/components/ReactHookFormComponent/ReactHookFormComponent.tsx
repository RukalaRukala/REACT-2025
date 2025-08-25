import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppStore } from '../../store/appStore';
import { formValidationSchema } from '../../utils/validation';
import { PasswordStrength } from '../PasswordStrength/PasswordStrength';
import type { FormData } from '../../types/form';
import './ReactHookFormComponent.scss';

interface ReactHookFormProps {
  onSuccess: () => void;
}

export const ReactHookFormComponent: React.FC<ReactHookFormProps> = ({
  onSuccess,
}) => {
  const { countries, addSubmittedData } = useAppStore();
  const [watchedPassword, setWatchedPassword] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(formValidationSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      password: '',
      confirmPassword: '',
      gender: 'male' as const,
      acceptTerms: false,
      profilePicture: null,
      country: '',
    },
  });

  const passwordValue = watch('password');

  React.useEffect(() => {
    setWatchedPassword(passwordValue || '');
  }, [passwordValue]);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      setValue('profilePicture', null);
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (file.size > maxSize) {
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      return;
    }

    try {
      const base64 = await convertFileToBase64(file);
      setValue('profilePicture', base64);
    } catch (error) {
      console.error('Error converting file:', error);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      addSubmittedData(data, 'react-hook-form');
      onSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="react-hook-form">
      <div className="form-field">
        <label htmlFor="rhf-name" className="form-label">
          Name *
        </label>
        <input
          type="text"
          id="rhf-name"
          {...register('name')}
          className={`form-input ${errors.name ? 'form-input--error' : ''}`}
          placeholder="Enter your name"
        />
        {errors.name && (
          <span className="form-error">{errors.name.message}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="rhf-age" className="form-label">
          Age *
        </label>
        <input
          type="number"
          id="rhf-age"
          {...register('age', { valueAsNumber: true })}
          min="1"
          max="120"
          className={`form-input ${errors.age ? 'form-input--error' : ''}`}
          placeholder="Enter your age"
        />
        {errors.age && <span className="form-error">{errors.age.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="rhf-email" className="form-label">
          Email *
        </label>
        <input
          type="email"
          id="rhf-email"
          {...register('email')}
          className={`form-input ${errors.email ? 'form-input--error' : ''}`}
          placeholder="Enter your email"
        />
        {errors.email && (
          <span className="form-error">{errors.email.message}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="rhf-password" className="form-label">
          Password *
        </label>
        <input
          type="password"
          id="rhf-password"
          {...register('password')}
          className={`form-input ${errors.password ? 'form-input--error' : ''}`}
          placeholder="Enter password"
        />
        {errors.password && (
          <span className="form-error">{errors.password.message}</span>
        )}
        <PasswordStrength password={watchedPassword} />
      </div>

      <div className="form-field">
        <label htmlFor="rhf-confirmPassword" className="form-label">
          Confirm Password *
        </label>
        <input
          type="password"
          id="rhf-confirmPassword"
          {...register('confirmPassword')}
          className={`form-input ${errors.confirmPassword ? 'form-input--error' : ''}`}
          placeholder="Confirm password"
        />
        {errors.confirmPassword && (
          <span className="form-error">{errors.confirmPassword.message}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="rhf-gender" className="form-label">
          Gender *
        </label>
        <select
          id="rhf-gender"
          {...register('gender')}
          className={`form-select ${errors.gender ? 'form-select--error' : ''}`}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <span className="form-error">{errors.gender.message}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="rhf-country" className="form-label">
          Country *
        </label>
        <select
          id="rhf-country"
          {...register('country')}
          className={`form-select ${errors.country ? 'form-select--error' : ''}`}
          defaultValue=""
        >
          <option value="" disabled>
            Select country
          </option>
          {countries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && (
          <span className="form-error">{errors.country.message}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="rhf-profilePicture" className="form-label">
          Profile Picture
        </label>
        <input
          type="file"
          id="rhf-profilePicture"
          accept="image/jpeg,image/jpg,image/png"
          className={`form-input ${errors.profilePicture ? 'form-input--error' : ''}`}
          onChange={handleFileChange}
        />
        <small className="form-hint">
          Allowed formats: JPEG, JPG, PNG. Maximum size: 5MB
        </small>
        {errors.profilePicture && (
          <span className="form-error">{errors.profilePicture.message}</span>
        )}
      </div>

      <div className="form-field form-field--checkbox">
        <label className="form-checkbox-label">
          <input
            type="checkbox"
            {...register('acceptTerms')}
            className="form-checkbox"
          />
          <span className="form-checkbox-text">
            I agree to the{' '}
            <a href="#" className="form-link">
              terms and conditions
            </a>{' '}
            *
          </span>
        </label>
        {errors.acceptTerms && (
          <span className="form-error">{errors.acceptTerms.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="form-submit-button"
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Form'}
      </button>
    </form>
  );
};
