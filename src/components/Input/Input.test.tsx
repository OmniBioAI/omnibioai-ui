/**
 * Validate the Input component: label and placeholder rendering, change handling, the error
 * message and error class, and the disabled state.
 *
 * Developer: Manish Kumar <manish@omnibioai.org>
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  // Render the field's label text when one is provided.
  it('renders label when provided', () => {
    render(<Input label="Sample ID" value="" onChange={() => {}} />);
    expect(screen.getByText('Sample ID')).toBeInTheDocument();
  });
  // Render the placeholder text on the input.
  it('renders placeholder', () => {
    render(<Input placeholder="Enter value" value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument();
  });
  // Call onChange once when the input value changes.
  it('calls onChange when typed', () => {
    const fn = vi.fn();
    render(<Input value="" onChange={fn} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'abc' } });
    expect(fn).toHaveBeenCalledTimes(1);
  });
  // Show the error message and apply the omni-input--error class.
  it('shows error message and error class', () => {
    const { container } = render(
      <Input value="" onChange={() => {}} error="File not found" />
    );
    expect(screen.getByText('File not found')).toBeInTheDocument();
    expect(container.querySelector('.omni-input--error')).toBeInTheDocument();
  });
  // Disable the input when the disabled prop is true.
  it('is disabled when disabled prop is true', () => {
    render(<Input value="" onChange={() => {}} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
