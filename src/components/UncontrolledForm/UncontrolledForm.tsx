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
        profilePicture: 'File size should not exceed 5MB',
      }));
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        profilePicture: 'Only JPEG, JPG, PNG formats are allowed',
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
          Name *
        </label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          className={`form-input ${errors.name ? 'form-input--error' : ''}`}
          placeholder="Enter your name"
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="age" className="form-label">
          Age *
        </label>
        <input
          type="number"
          id="age"
          ref={ageRef}
          min="1"
          max="120"
          className={`form-input ${errors.age ? 'form-input--error' : ''}`}
          placeholder="Enter your age"
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
          placeholder="Enter your email"
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="password" className="form-label">
          Password *
        </label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          className={`form-input ${errors.password ? 'form-input--error' : ''}`}
          placeholder="Enter password"
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        {errors.password && (
          <span className="form-error">{errors.password}</span>
        )}
        <PasswordStrength password={currentPassword} />
      </div>

      <div className="form-field">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password *
        </label>
        <input
          type="password"
          id="confirmPassword"
          ref={confirmPasswordRef}
          className={`form-input ${errors.confirmPassword ? 'form-input--error' : ''}`}
          placeholder="Confirm password"
        />
        {errors.confirmPassword && (
          <span className="form-error">{errors.confirmPassword}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="gender" className="form-label">
          Gender *
        </label>
        <select
          id="gender"
          ref={genderRef}
          className={`form-select ${errors.gender ? 'form-select--error' : ''}`}
          defaultValue=""
        >
          <option value="" disabled>
            Select gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <span className="form-error">{errors.gender}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="country" className="form-label">
          Country *
        </label>
        <select
          id="country"
          ref={countryRef}
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
        {errors.country && <span className="form-error">{errors.country}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="profilePicture" className="form-label">
          Profile Picture
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
          Allowed formats: JPEG, JPG, PNG. Maximum size: 5MB
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
            I agree to the{' '}
            <a href="#" className="form-link">
              terms and conditions
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
        {isSubmitting ? 'Submitting...' : 'Submit Form'}
      </button>
    </form>
  );
};
