import React from 'react';
import { getPasswordStrength } from '../../utils/validation';
import './PasswordStrength.scss';

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  password,
}) => {
  const strength = getPasswordStrength(password);

  const getStrengthInfo = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return { color: 'weak', text: 'Weak password' };
      case 2:
        return { color: 'medium', text: 'Medium password' };
      case 3:
        return { color: 'good', text: 'Good password' };
      case 4:
        return { color: 'strong', text: 'Strong password' };
      default:
        return { color: 'weak', text: 'Weak password' };
    }
  };

  const strengthInfo = getStrengthInfo(strength);

  if (!password) return null;

  return (
    <div className="password-strength">
      <div
        className={`password-strength__indicator password-strength__indicator--${strengthInfo.color}`}
      >
        <div className="password-strength__bars">
          {[1, 2, 3, 4].map((bar) => (
            <div
              key={bar}
              className={`password-strength__bar ${
                bar <= strength
                  ? `password-strength__bar--${strengthInfo.color}`
                  : ''
              }`}
            />
          ))}
        </div>
        <span className="password-strength__text">{strengthInfo.text}</span>
      </div>

      <div className="password-strength__requirements">
        <small>Password must contain:</small>
        <ul>
          <li className={/\d/.test(password) ? 'valid' : 'invalid'}>
            ✓ At least 1 digit
          </li>
          <li className={/[A-Z]/.test(password) ? 'valid' : 'invalid'}>
            ✓ At least 1 uppercase letter
          </li>
          <li className={/[a-z]/.test(password) ? 'valid' : 'invalid'}>
            ✓ At least 1 lowercase letter
          </li>
          <li
            className={
              /[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'valid' : 'invalid'
            }
          >
            ✓ At least 1 special character
          </li>
        </ul>
      </div>
    </div>
  );
};
