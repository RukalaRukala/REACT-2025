import { describe, it, expect } from '@jest/globals';
import {
  validateEmail,
  validatePassword,
  getPasswordStrength,
  formValidationSchema,
} from '../validation';

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('должен возвращать true для корректных email адресов', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'firstname+lastname@company.org',
        'user123@test-domain.com',
        'admin@subdomain.example.org',
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
        'user@domain.',
        'user name@example.com',
        'user@.com',
      ];

      invalidEmails.forEach((email) => {
        expect(validateEmail(email)).toBe(false);
      });
    });

    it('должен обрабатывать граничные случаи', () => {
      expect(validateEmail('   ')).toBe(false);
      expect(validateEmail('a@b.co')).toBe(true);
      expect(validateEmail('test@localhost.com')).toBe(true);
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
        'NoSpecial123',
        'noUPPER123!',
        'SHORT1!',
      ];

      weakPasswords.forEach((password) => {
        expect(validatePassword(password)).toBe(false);
      });
    });

    it('должен требовать минимум 8 символов', () => {
      expect(validatePassword('Ab1!')).toBe(false);
      expect(validatePassword('Abc123!')).toBe(false);
      expect(validatePassword('Abcd123!')).toBe(true);
    });
  });

  describe('getPasswordStrength', () => {
    it('должен возвращать 0 для пустого пароля', () => {
      expect(getPasswordStrength('')).toBe(0);
    });

    it('должен возвращать 1 для пароля только с цифрами', () => {
      expect(getPasswordStrength('12345')).toBe(1);
    });

    it('должен ��озвращать 2 для пароля с цифрами и заглавными буквами', () => {
      expect(getPasswordStrength('ABC123')).toBe(2);
    });

    it('должен возвращать 3 для пароля с цифрами, заглавными и строчными буквами', () => {
      expect(getPasswordStrength('Abc123')).toBe(3);
    });

    it('должен возвращать 4 для пароля со всеми типами символов', () => {
      expect(getPasswordStrength('Abc123!')).toBe(4);
    });

    it('должен правильно подсчитывать различные специальные символы', () => {
      const specialChars = [
        '!',
        '@',
        '#',
        '$',
        '%',
        '^',
        '&',
        '*',
        '(',
        ')',
        '.',
        '?',
        '"',
        ':',
        '{',
        '}',
        '|',
        '<',
        '>',
      ];

      specialChars.forEach((char) => {
        expect(getPasswordStrength(`Abc123${char}`)).toBe(4);
      });
    });
  });

  describe('formValidationSchema', () => {
    const validData = {
      name: 'John',
      age: 25,
      email: 'john@example.com',
      password: 'StrongPass123!',
      confirmPassword: 'StrongPass123!',
      gender: 'male' as const,
      acceptTerms: true,
      profilePicture: null,
      country: 'US',
    };

    it('должен валидировать корректные данные формы', async () => {
      await expect(
        formValidationSchema.validate(validData)
      ).resolves.toBeDefined();
    });

    describe('name validation', () => {
      it('должен отклонять пустое имя', async () => {
        const invalidData = { ...validData, name: '' };
        await expect(
          formValidationSchema.validate(invalidData)
        ).rejects.toThrow('Name is required');
      });

      it('должен отклонять короткое имя', async () => {
        const invalidData = { ...validData, name: 'A' };
        await expect(
          formValidationSchema.validate(invalidData)
        ).rejects.toThrow('Name must contain at least 2 characters');
      });

      it('должен отклонять имя без заглавной буквы', async () => {
        const invalidData = { ...validData, name: 'john' };
        await expect(
          formValidationSchema.validate(invalidData)
        ).rejects.toThrow('Name must start with a capital letter');
      });
    });

    describe('age validation', () => {
      it('должен отклонять отрицательный возраст', async () => {
        const invalidData = { ...validData, age: -5 };
        await expect(
          formValidationSchema.validate(invalidData)
        ).rejects.toThrow('Age must be greater than 0');
      });

      it('должен отклонять слишком большой возраст', async () => {
        const invalidData = { ...validData, age: 150 };
        await expect(
          formValidationSchema.validate(invalidData)
        ).rejects.toThrow('Age cannot be greater than 120 years');
      });

      it('должен отклонять нецелый возраст', async () => {
        const invalidData = { ...validData, age: 25.5 };
        await expect(
          formValidationSchema.validate(invalidData)
        ).rejects.toThrow('Age must be an integer');
      });
    });

    describe('email validation', () => {
      it('должен отклонять некорректный email', async () => {
        const invalidData = { ...validData, email: 'invalid-email' };
        await expect(
          formValidationSchema.validate(invalidData)
        ).rejects.toThrow('Please enter a valid email address');
      });

      it('должен отклонять пустой email', async () => {
        const invalidData = { ...validData, email: '' };
        await expect(
          formValidationSchema.validate(invalidData)
        ).rejects.toThrow('Email is required');
      });
    });

    describe('password validation', () => {
      it('должен отклонять короткий пароль', async () => {
        const invalidData = {
          ...validData,
          password: 'Short1!',
          confirmPassword: 'Short1!',
        };
        await expect(
          formValidationSchema.validate(invalidData)
        ).rejects.toThrow('Password must contain at least 8 characters');
      });

      it('должен отклонять слабый пароль', async () => {
        const invalidData = {
          ...validData,
          password: 'weakpassword',
          confirmPassword: 'weakpassword',
        };
        await expect(
          formValidationSchema.validate(invalidData)
        ).rejects.toThrow(
          'Password must contain: 1 digit, 1 uppercase letter, 1 lowercase letter, 1 special character'
        );
      });

      it('должен отклонять несовпадающие пароли', async () => {
        const invalidData = {
          ...validData,
          confirmPassword: 'DifferentPass123!',
        };
        await expect(
          formValidationSchema.validate(invalidData)
        ).rejects.toThrow('Passwords must match');
      });
    });

    describe('country validation', () => {
      it('должен требовать выбор страны', async () => {
        const invalidData = { ...validData, country: '' };
        await expect(
          formValidationSchema.validate(invalidData)
        ).rejects.toThrow('Please select a country');
      });
    });
  });
});
