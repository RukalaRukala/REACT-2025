import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import { UncontrolledForm } from '../UncontrolledForm';

const mockAddSubmittedData = jest.fn();
const mockOnSuccess = jest.fn();

jest.mock('../../../store/appStore', () => ({
  useAppStore: () => ({
    countries: [
      { code: 'US', name: 'United States' },
      { code: 'CA', name: 'Canada' },
      { code: 'GB', name: 'United Kingdom' },
    ],
    addSubmittedData: mockAddSubmittedData,
  }),
}));

jest.mock('../../PasswordStrength/PasswordStrength', () => ({
  PasswordStrength: ({ password }: { password: string }) => (
    <div data-testid="password-strength">
      Strength: {password.length > 0 ? 'visible' : 'hidden'}
    </div>
  ),
}));

describe('UncontrolledForm', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Form Rendering', () => {
    it('должен отображать все обязательные поля', () => {
      render(<UncontrolledForm onSuccess={mockOnSuccess} />);

      expect(screen.getByLabelText(/name/i)).toBeTruthy();
      expect(screen.getByLabelText(/age/i)).toBeTruthy();
      expect(screen.getByLabelText(/email/i)).toBeTruthy();
      expect(screen.getByLabelText(/^password$/i)).toBeTruthy();
      expect(screen.getByLabelText(/confirm password/i)).toBeTruthy();
      expect(screen.getByLabelText(/gender/i)).toBeTruthy();
      expect(screen.getByLabelText(/country/i)).toBeTruthy();
      expect(screen.getByLabelText(/accept terms/i)).toBeTruthy();
    });

    it('должен показывать компонент силы пароля', () => {
      render(<UncontrolledForm onSuccess={mockOnSuccess} />);

      expect(screen.getByTestId('password-strength')).toBeTruthy();
    });

    it('должен отображать список стран из store', () => {
      render(<UncontrolledForm onSuccess={mockOnSuccess} />);

      const countrySelect = screen.getByLabelText(/country/i);
      expect(countrySelect).toBeTruthy();

      expect(screen.getByDisplayValue('United States')).toBeTruthy();
      expect(screen.getByDisplayValue('Canada')).toBeTruthy();
    });
  });

  describe('Password Strength Integration', () => {
    it('должен обновлять компонент силы пароля при вводе', async () => {
      render(<UncontrolledForm onSuccess={mockOnSuccess} />);

      const passwordInput = screen.getByLabelText(/^password$/i);
      await user.type(passwordInput, 'test123');

      expect(screen.getByTestId('password-strength')).toHaveTextContent(
        'Strength: visible'
      );
    });

    it('должен ск��ывать силу пароля когда поле пустое', () => {
      render(<UncontrolledForm onSuccess={mockOnSuccess} />);

      expect(screen.getByTestId('password-strength')).toHaveTextContent(
        'Strength: hidden'
      );
    });
  });

  describe('File Upload Validation', () => {
    it('должен показывать ошибку для слишком большого файла', async () => {
      render(<UncontrolledForm onSuccess={mockOnSuccess} />);

      const fileInput = screen.getByLabelText(/profile picture/i);

      const largeFile = new File(['x'.repeat(6 * 1024 * 1024)], 'large.jpg', {
        type: 'image/jpeg',
      });

      await user.upload(fileInput, largeFile);

      await waitFor(() => {
        expect(
          screen.queryByText(/file size should not exceed 5mb/i)
        ).toBeTruthy();
      });
    });

    it('должен показывать ошибку для неподдерживаемого формата', async () => {
      render(<UncontrolledForm onSuccess={mockOnSuccess} />);

      const fileInput = screen.getByLabelText(/profile picture/i);

      const invalidFile = new File(['content'], 'file.txt', {
        type: 'text/plain',
      });

      await user.upload(fileInput, invalidFile);

      await waitFor(() => {
        expect(
          screen.queryByText(/only jpeg, jpg, png formats are allowed/i)
        ).toBeTruthy();
      });
    });

    it('должен принимать корректные файлы', async () => {
      render(<UncontrolledForm onSuccess={mockOnSuccess} />);

      const fileInput = screen.getByLabelText(/profile picture/i);

      const validFile = new File(['content'], 'photo.jpg', {
        type: 'image/jpeg',
      });

      await user.upload(fileInput, validFile);

      await waitFor(() => {
        expect(
          screen.queryByText(/file size should not exceed 5mb/i)
        ).toBeNull();
        expect(
          screen.queryByText(/only jpeg, jpg, png formats are allowed/i)
        ).toBeNull();
      });
    });
  });

  describe('Form Validation', () => {
    it('должен показывать ошибки валидации при отправке пустой формы', async () => {
      render(<UncontrolledForm onSuccess={mockOnSuccess} />);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText(/name is required/i)).toBeTruthy();
        expect(screen.queryByText(/email is required/i)).toBeTruthy();
      });
    });

    it('должен очищать ошибки при исправлении полей', async () => {
      render(<UncontrolledForm onSuccess={mockOnSuccess} />);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText(/name is required/i)).toBeTruthy();
      });

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'John Doe');

      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText(/name is required/i)).toBeNull();
      });
    });
  });

  describe('Form Submission', () => {
    it('должен успешно отправлять валидную форму', async () => {
      render(<UncontrolledForm onSuccess={mockOnSuccess} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/age/i), '25');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/^password$/i), 'StrongPass123!');
      await user.type(
        screen.getByLabelText(/confirm password/i),
        'StrongPass123!'
      );
      await user.selectOptions(screen.getByLabelText(/gender/i), 'male');
      await user.selectOptions(screen.getByLabelText(/country/i), 'US');
      await user.click(screen.getByLabelText(/accept terms/i));

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockAddSubmittedData).toHaveBeenCalledTimes(1);
        expect(mockOnSuccess).toHaveBeenCalledTimes(1);
      });
    });

    it('должен показывать состояние загрузки во время отправки', async () => {
      render(<UncontrolledForm onSuccess={mockOnSuccess} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/age/i), '25');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/^password$/i), 'StrongPass123!');
      await user.type(
        screen.getByLabelText(/confirm password/i),
        'StrongPass123!'
      );
      await user.selectOptions(screen.getByLabelText(/gender/i), 'male');
      await user.selectOptions(screen.getByLabelText(/country/i), 'US');
      await user.click(screen.getByLabelText(/accept terms/i));

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      expect(screen.queryByText(/submitting/i)).toBeTruthy();
    });
  });
});
