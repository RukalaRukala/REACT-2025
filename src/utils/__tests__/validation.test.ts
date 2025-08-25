import { describe, it, expect } from '@jest/globals';
import { validateEmail, validatePassword } from '../validation';

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('должен возвращать true для корректных email адресов', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'firstname+lastname@company.org',
      ];

      validEmails.forEach((email) => {
        expect(validateEmail(email)).toBe(true);
      });
    });

    it('должен возвращать false для некорректных email адресов', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'user@',
        'user..name@example.com',
        '',
      ];

      invalidEmails.forEach((email) => {
        expect(validateEmail(email)).toBe(false);
      });
    });
  });

  describe('validatePassword', () => {
    it('должен возвращать true для сильных паролей', () => {
      const strongPasswords = [
        'StrongPass123!',
        'MySecure#Pass456',
        'Complex$Word789',
      ];

      strongPasswords.forEach((password) => {
        expect(validatePassword(password)).toBe(true);
      });
    });

    it('должен возвращать false для слабых паролей', () => {
      const weakPasswords = [
        'weak',
        '12345',
        'onlylowercase',
        'ONLYUPPERCASE',
        'NoNumbers!',
      ];

      weakPasswords.forEach((password) => {
        expect(validatePassword(password)).toBe(false);
      });
    });
  });
});
