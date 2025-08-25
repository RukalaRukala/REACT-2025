import { render, screen } from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import { PasswordStrength } from '../PasswordStrength';
import * as validationModule from '../../../utils/validation';

jest.mock('../../../utils/validation', () => ({
  getPasswordStrength: jest.fn((password: string) => {
    if (!password) return 0;
    if (password === 'weak') return 1;
    if (password === 'medium123') return 2;
    if (password === 'Good123!') return 3;
    if (password === 'Strong123!@') return 4;
    return 0;
  }),
}));

describe('PasswordStrength', () => {
  describe('Password Strength Display', () => {
    it('должен не отображаться для пустого пароля', () => {
      const { container } = render(<PasswordStrength password="" />);
      expect(container.firstChild).toBeNull();
    });

    it('должен показывать слабый пароль', () => {
      render(<PasswordStrength password="weak" />);

      expect(screen.getByText('Weak password')).toBeTruthy();
      expect(
        screen
          .getByText('Weak password')
          .closest('.password-strength__indicator')
      ).toHaveClass('password-strength__indicator--weak');
    });

    it('должен показывать средний пароль', () => {
      render(<PasswordStrength password="medium123" />);

      expect(screen.getByText('Medium password')).toBeTruthy();
      expect(
        screen
          .getByText('Medium password')
          .closest('.password-strength__indicator')
      ).toHaveClass('password-strength__indicator--medium');
    });

    it('должен показывать хороший пароль', () => {
      render(<PasswordStrength password="Good123!" />);

      expect(screen.getByText('Good password')).toBeTruthy();
      expect(
        screen
          .getByText('Good password')
          .closest('.password-strength__indicator')
      ).toHaveClass('password-strength__indicator--good');
    });

    it('должен показывать сильный пароль', () => {
      render(<PasswordStrength password="Strong123!@" />);

      expect(screen.getByText('Strong password')).toBeTruthy();
      expect(
        screen
          .getByText('Strong password')
          .closest('.password-strength__indicator')
      ).toHaveClass('password-strength__indicator--strong');
    });
  });

  describe('Password Strength Calculation Integration', () => {
    it('должен вызывать функцию расчета силы пароля', () => {
      const mockGetPasswordStrength =
        validationModule.getPasswordStrength as jest.Mock;

      render(<PasswordStrength password="test123" />);

      expect(mockGetPasswordStrength).toHaveBeenCalledWith('test123');
    });

    it('должен обрабатывать изменения пароля', () => {
      const { rerender } = render(<PasswordStrength password="weak" />);

      expect(screen.getByText('Weak password')).toBeTruthy();

      rerender(<PasswordStrength password="Strong123!@" />);

      expect(screen.getByText('Strong password')).toBeTruthy();
      expect(screen.queryByText('Weak password')).toBeNull();
    });
  });

  describe('Edge Cases', () => {
    it('должен обрабатывать нулевую силу пароля', () => {
      render(<PasswordStrength password="a" />);

      expect(screen.getByText('Weak password')).toBeTruthy();
    });

    it('должен обрабатывать неожиданные значения силы пароля', () => {
      const mockGetPasswordStrength =
        validationModule.getPasswordStrength as jest.Mock;
      mockGetPasswordStrength.mockReturnValue(99);

      render(<PasswordStrength password="unusual" />);

      expect(screen.getByText('Weak password')).toBeTruthy();

      mockGetPasswordStrength.mockRestore();
    });
  });
});
