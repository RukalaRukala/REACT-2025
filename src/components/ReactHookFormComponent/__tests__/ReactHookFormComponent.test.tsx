import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import { ReactHookFormComponent } from '../ReactHookFormComponent';

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

describe('ReactHookFormComponent', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Form Rendering', () => {
    it('должен отображать все обязательные поля с React Hook Form', () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);

      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
    });

    it('должен устанавливать значения по умолчанию', () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      const ageInput = screen.getByLabelText(/age/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      const genderSelect = screen.getByLabelText(
        /gender/i
      ) as HTMLSelectElement;

      expect(nameInput.value).toBe('');
      expect(ageInput.value).toBe('0');
      expect(emailInput.value).toBe('');
      expect(genderSelect.value).toBe('male');
    });

    it('должен показывать компонент силы пароля с React Hook Form', () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);

      expect(screen.getByTestId('password-strength')).toBeInTheDocument();
    });
  });

  describe('Field Validation - React Hook Form', () => {
    it('должен показывать ошибки валидации в режиме реального времени', async () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'john');
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText(/name must start with a capital letter/i)
        ).toBeInTheDocument();
      });
    });

    it('должен проверять email формат в реальном времени', async () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'invalid-email');
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText(/please enter a valid email address/i)
        ).toBeInTheDocument();
      });
    });

    it('должен проверять силу пароля в реальном времени', async () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);

      const passwordInput = screen.getByLabelText(/^password$/i);
      await user.type(passwordInput, 'weak');
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText(/password must contain at least 8 characters/i)
        ).toBeInTheDocument();
      });
    });

    it('должен проверять совпадение паролей', async () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);

      const passwordInput = screen.getByLabelText(/^password$/i);
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

      await user.type(passwordInput, 'StrongPass123!');
      await user.type(confirmPasswordInput, 'DifferentPass123!');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/passwords must match/i)).toBeInTheDocument();
      });
    });

    it('должен очищать ошибки при исправлении полей', async () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'john');
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText(/name must start with a capital letter/i)
        ).toBeInTheDocument();
      });

      await user.clear(nameInput);
      await user.type(nameInput, 'John');

      await waitFor(() => {
        expect(
          screen.queryByText(/name must start with a capital letter/i)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('Form State Management', () => {
    it('должен отключать кнопку отправки при невалидной форме', async () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeDisabled();
    });

    it('должен включать кнопку отправки при валидной форме', async () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);

      await user.type(screen.getByLabelText(/name/i), 'John');
      await user.type(screen.getByLabelText(/age/i), '25');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/^password$/i), 'StrongPass123!');
      await user.type(
        screen.getByLabelText(/confirm password/i),
        'StrongPass123!'
      );
      await user.selectOptions(screen.getByLabelText(/country/i), 'US');
      await user.click(screen.getByLabelText(/accept terms/i));

      await waitFor(() => {
        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeEnabled();
      });
    });
  });

  describe('File Upload with React Hook Form', () => {
    it('должен обрабатывать загрузку корректного файла', async () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);

      const fileInput = screen.getByLabelText(/profile picture/i);
      const validFile = new File(['content'], 'profile.jpg', {
        type: 'image/jpeg',
        size: 1024,
      });

      await user.upload(fileInput, validFile);

      await waitFor(() => {
        expect(fileInput).toHaveProperty(
          'files',
          expect.arrayContaining([validFile])
        );
      });
    });

    it('должен отклонять слишком большие файлы', async () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);

      const fileInput = screen.getByLabelText(/profile picture/i);
      const largeFile = new File(['x'.repeat(6 * 1024 * 1024)], 'large.jpg', {
        type: 'image/jpeg',
      });

      await user.upload(fileInput, largeFile);

      await waitFor(() => {
        expect(
          screen.getByText(/file size should not exceed 5mb/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission with React Hook Form', () => {
    const validFormData = {
      name: 'John',
      age: '25',
      email: 'john@example.com',
      password: 'StrongPass123!',
      confirmPassword: 'StrongPass123!',
      gender: 'male',
      country: 'US',
    };

    it('должен успешно отправлять валидную форму с React Hook Form', async () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);

      await user.type(screen.getByLabelText(/name/i), validFormData.name);
      await user.type(screen.getByLabelText(/age/i), validFormData.age);
      await user.type(screen.getByLabelText(/email/i), validFormData.email);
      await user.type(
        screen.getByLabelText(/^password$/i),
        validFormData.password
      );
      await user.type(
        screen.getByLabelText(/confirm password/i),
        validFormData.confirmPassword
      );
      await user.selectOptions(
        screen.getByLabelText(/gender/i),
        validFormData.gender
      );
      await user.selectOptions(
        screen.getByLabelText(/country/i),
        validFormData.country
      );
      await user.click(screen.getByLabelText(/accept terms/i));

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockAddSubmittedData).toHaveBeenCalledTimes(1);
        expect(mockOnSuccess).toHaveBeenCalledTimes(1);
      });
    });

    it('должен показывать состояние загрузки во время отправки', async () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);

      Object.entries(validFormData).forEach(async ([key, value]) => {
        if (key === 'gender') {
          await user.selectOptions(
            screen.getByLabelText(new RegExp(key, 'i')),
            value
          );
        } else if (key === 'country') {
          await user.selectOptions(
            screen.getByLabelText(new RegExp(key, 'i')),
            value
          );
        } else {
          const input = screen.getByLabelText(
            new RegExp(key.replace(/([A-Z])/g, ' $1').toLowerCase(), 'i')
          );
          await user.type(input, value);
        }
      });

      await user.click(screen.getByLabelText(/accept terms/i));

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      expect(
        screen.getByRole('button', { name: /submitting/i })
      ).toBeInTheDocument();
    });

    it('должен предотвращать отправку невалидной формы', async () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeDisabled();

      expect(mockAddSubmittedData).not.toHaveBeenCalled();
      expect(mockOnSuccess).not.toHaveBeenCalled();
    });
  });

  describe('Password Watching', () => {
    it('должен отслеживать изменения пароля для компонента силы', async () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);

      const passwordInput = screen.getByLabelText(/^password$/i);
      await user.type(passwordInput, 'TestPassword123!');

      await waitFor(() => {
        expect(screen.getByTestId('password-strength')).toHaveTextContent(
          'Strength: visible'
        );
      });
    });

    it('должен обновлять силу пароля в реальном времени', async () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);

      const passwordInput = screen.getByLabelText(/^password$/i);

      expect(screen.getByTestId('password-strength')).toHaveTextContent(
        'Strength: hidden'
      );

      await user.type(passwordInput, 'test');

      await waitFor(() => {
        expect(screen.getByTestId('password-strength')).toHaveTextContent(
          'Strength: visible'
        );
      });
    });
  });
});
