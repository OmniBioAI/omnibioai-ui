/**
 * Validate the Button component: rendering children, click handling, the disabled and loading
 * states, and the variant and size class names.
 *
 * Developer: Manish Kumar <manish@omnibioai.org>
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  // Render the given children inside the button.
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  // Call onClick exactly once when the button is clicked.
  it('calls onClick when clicked', () => {
    const fn = vi.fn();
    render(<Button onClick={fn}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(fn).toHaveBeenCalledTimes(1);
  });
  // Disable the button when the disabled prop is true.
  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
  // Disable the button and show a spinner while loading.
  it('is disabled and shows spinner when loading', () => {
    const { container } = render(<Button loading>Save</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(container.querySelector('.omni-spinner')).toBeInTheDocument();
  });
  // Never call onClick when the button is disabled.
  it('does not call onClick when disabled', () => {
    const fn = vi.fn();
    render(<Button disabled onClick={fn}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(fn).not.toHaveBeenCalled();
  });
  // Apply the variant class, e.g. omni-btn--danger.
  it('applies variant classes', () => {
    const { container } = render(<Button variant="danger">x</Button>);
    expect(container.firstChild).toHaveClass('omni-btn--danger');
  });
  // Apply the size class, e.g. omni-btn--lg.
  it('applies size classes', () => {
    const { container } = render(<Button size="lg">x</Button>);
    expect(container.firstChild).toHaveClass('omni-btn--lg');
  });
});
