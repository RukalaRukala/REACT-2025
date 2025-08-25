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
        return { color: 'weak', text: 'Сл��бый пароль' };
      case 2:
        return { color: 'medium', text: 'Средний пароль' };
      case 3:
        return { color: 'good', text: 'Хороший пароль' };
      case 4:
        return { color: 'strong', text: 'Сильный пароль' };
      default:
        return { color: 'weak', text: 'Слабый пароль' };
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
        <small>Пароль должен содержать:</small>
        <ul>
          <li className={/\d/.test(password) ? 'valid' : 'invalid'}>
            ✓ Минимум 1 цифру
          </li>
          <li className={/[A-Z]/.test(password) ? 'valid' : 'invalid'}>
            ✓ Минимум 1 заглавную букву
          </li>
          <li className={/[a-z]/.test(password) ? 'valid' : 'invalid'}>
            ✓ Минимум 1 строчную букву
          </li>
          <li
            className={
              /[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'valid' : 'invalid'
            }
          >
            ✓ Минимум 1 специальный символ
          </li>
        </ul>
      </div>
    </div>
  );
};
