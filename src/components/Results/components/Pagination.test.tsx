import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

it('does not render pagination if there is only 1 page or less', () => {
  const { container } = render(
    <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
  );
  expect(container).toBeEmptyDOMElement();
});

it('renders the correct number of buttons', () => {
  render(<Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />);
  expect(screen.getAllByRole('button')).toHaveLength(3);
});

it('current page button is disabled', () => {
  render(<Pagination currentPage={2} totalPages={3} onPageChange={() => {}} />);
  const buttons = screen.getAllByRole('button');
  expect(buttons[1]).toBeDisabled();
});

it('calls onPageChange when another page is clicked', () => {
  const onPageChange = jest.fn();
  render(
    <Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />
  );
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[1]);
  expect(onPageChange).toHaveBeenCalledWith(2);
});
