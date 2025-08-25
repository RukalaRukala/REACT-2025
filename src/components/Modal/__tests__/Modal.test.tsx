import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import { Modal } from '../Modal';

const mockOnClose = jest.fn();

jest.mock('../../Portal/Portal', () => ({
  Portal: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="portal">{children}</div>
  ),
}));

describe('Modal', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.style.overflow = 'unset';
  });

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    title: 'Test Modal',
    children: <div>Modal Content</div>,
  };

  describe('Modal Rendering', () => {
    it('должен рендериться когда isOpen = true', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('должен не рендериться когда isOpen = false', () => {
      render(<Modal {...defaultProps} isOpen={false} />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    });

    it('должен рендериться через Portal', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByTestId('portal')).toBeInTheDocument();
    });

    it('должен показывать кнопку закрытия', () => {
      render(<Modal {...defaultProps} />);

      expect(
        screen.getByRole('button', { name: /close/i })
      ).toBeInTheDocument();
    });
  });

  describe('Modal Accessibility', () => {
    it('должен устанавливать правильные ARIA атрибуты', () => {
      render(<Modal {...defaultProps} />);

      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('role', 'dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-labelledby');
    });

    it('должен управлять фокусом при открытии', () => {
      const button = document.createElement('button');
      button.textContent = 'Test Button';
      document.body.appendChild(button);
      button.focus();

      render(<Modal {...defaultProps} />);

      const modal = screen.getByRole('dialog');
      expect(modal).toHaveFocus();

      document.body.removeChild(button);
    });

    it('должен возвращать фокус при закрытии', () => {
      const button = document.createElement('button');
      button.textContent = 'Test Button';
      document.body.appendChild(button);
      button.focus();

      const { rerender } = render(<Modal {...defaultProps} />);

      rerender(<Modal {...defaultProps} isOpen={false} />);

      expect(button).toHaveFocus();

      document.body.removeChild(button);
    });

    it('должен блокировать скролл body при открытии', () => {
      render(<Modal {...defaultProps} />);

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('должен восстанавливать скролл body при закрытии', () => {
      const { rerender } = render(<Modal {...defaultProps} />);

      expect(document.body.style.overflow).toBe('hidden');

      rerender(<Modal {...defaultProps} isOpen={false} />);

      expect(document.body.style.overflow).toBe('unset');
    });
  });

  describe('Modal Closing Behavior', () => {
    it('должен закрываться при нажатии клавиши Escape', async () => {
      render(<Modal {...defaultProps} />);

      await user.keyboard('{Escape}');

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('должен закрываться при клике на кнопку закрытия', async () => {
      render(<Modal {...defaultProps} />);

      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('должен закрываться при клике на backdrop', async () => {
      render(<Modal {...defaultProps} />);

      const backdrop = screen.getByRole('dialog').parentElement;
      if (backdrop) {
        fireEvent.click(backdrop);
      }

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('должен не закрываться при клике на содержимое модального окна', async () => {
      render(<Modal {...defaultProps} />);

      const modalContent = screen.getByText('Modal Content');
      await user.click(modalContent);

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Modal Event Handling', () => {
    it('должен добавлять обработчик событий клавиатуры при открытии', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');

      render(<Modal {...defaultProps} />);

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );

      addEventListenerSpy.mockRestore();
    });

    it('должен удалять обработчик событий клавиатуры при закрытии', () => {
      const removeEventListenerSpy = jest.spyOn(
        document,
        'removeEventListener'
      );

      const { rerender } = render(<Modal {...defaultProps} />);

      rerender(<Modal {...defaultProps} isOpen={false} />);

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );

      removeEventListenerSpy.mockRestore();
    });

    it('должен обрабатывать множественные нажатия Escape', async () => {
      render(<Modal {...defaultProps} />);

      await user.keyboard('{Escape}');
      await user.keyboard('{Escape}');

      expect(mockOnClose).toHaveBeenCalledTimes(2);
    });

    it('должен игнорировать другие клавиши кроме Escape', async () => {
      render(<Modal {...defaultProps} />);

      await user.keyboard('{Enter}');
      await user.keyboard('{Space}');
      await user.keyboard('{Tab}');

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Modal State Management', () => {
    it('должен правильно обновляться при изменении isOpen', () => {
      const { rerender } = render(<Modal {...defaultProps} isOpen={false} />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      rerender(<Modal {...defaultProps} isOpen={true} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('должен обновлять title при изменении пропса', () => {
      const { rerender } = render(
        <Modal {...defaultProps} title="Initial Title" />
      );

      expect(screen.getByText('Initial Title')).toBeInTheDocument();

      rerender(<Modal {...defaultProps} title="Updated Title" />);

      expect(screen.getByText('Updated Title')).toBeInTheDocument();
      expect(screen.queryByText('Initial Title')).not.toBeInTheDocument();
    });

    it('должен обновлять содержимое при изменении children', () => {
      const { rerender } = render(
        <Modal {...defaultProps}>
          <div>Initial Content</div>
        </Modal>
      );

      expect(screen.getByText('Initial Content')).toBeInTheDocument();

      rerender(
        <Modal {...defaultProps}>
          <div>Updated Content</div>
        </Modal>
      );

      expect(screen.getByText('Updated Content')).toBeInTheDocument();
      expect(screen.queryByText('Initial Content')).not.toBeInTheDocument();
    });
  });

  describe('Modal Edge Cases', () => {
    it('должен обрабатывать отсутствие previouslyFocusedElement', () => {
      Object.defineProperty(document, 'activeElement', {
        value: null,
        configurable: true,
      });

      const { rerender } = render(<Modal {...defaultProps} />);

      expect(() => {
        rerender(<Modal {...defaultProps} isOpen={false} />);
      }).not.toThrow();
    });

    it('должен обрабатывать множественные открытия и закрытия', () => {
      const { rerender } = render(<Modal {...defaultProps} isOpen={false} />);

      rerender(<Modal {...defaultProps} isOpen={true} />);
      expect(document.body.style.overflow).toBe('hidden');

      rerender(<Modal {...defaultProps} isOpen={false} />);
      expect(document.body.style.overflow).toBe('unset');

      rerender(<Modal {...defaultProps} isOpen={true} />);
      expect(document.body.style.overflow).toBe('hidden');
    });
  });
});
