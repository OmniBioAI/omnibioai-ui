/**
 * Validate the Select component: rendering its options and label, change handling, the disabled
 * state, and the placeholder option.
 *
 * Developer: Manish Kumar <manish@omnibioai.org>
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

describe('Select', () => {
  // Render every option's label.
  it('renders all options', () => {
    render(<Select options={options} value="a" onChange={() => {}} />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });
  // Render the field label when one is provided.
  it('renders label when provided', () => {
    render(<Select options={options} value="a" onChange={() => {}} label="Category" />);
    expect(screen.getByText('Category')).toBeInTheDocument();
  });
  // Call onChange with the newly selected value.
  it('calls onChange with selected value', () => {
    const fn = vi.fn();
    render(<Select options={options} value="a" onChange={fn} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'b' } });
    expect(fn).toHaveBeenCalledWith('b');
  });
  // Disable the select when the disabled prop is true.
  it('is disabled when disabled prop is true', () => {
    render(<Select options={options} value="a" onChange={() => {}} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
  // Render the placeholder option when the value is empty.
  it('renders placeholder option', () => {
    render(
      <Select options={options} value="" onChange={() => {}}
              placeholder="Choose one" />
    );
    expect(screen.getByText('Choose one')).toBeInTheDocument();
  });
});
