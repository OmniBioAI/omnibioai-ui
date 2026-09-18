/**
 * Validate the Card component: rendering children and an optional title, omitting the header when
 * there is nothing to show in it, and the elevated and clickable class/click-handler behavior.
 *
 * Developer: Manish Kumar <manish@omnibioai.org>
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  // Render the given children inside the card.
  it('renders children', () => {
    render(<Card>content</Card>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });
  // Render the title when one is provided.
  it('renders title when provided', () => {
    render(<Card title="My Card">body</Card>);
    expect(screen.getByText('My Card')).toBeInTheDocument();
  });
  // Omit the header element when there is no title or actions to show.
  it('does not render header when no title or actions', () => {
    const { container } = render(<Card>body</Card>);
    expect(container.querySelector('.omni-card__header')).toBeNull();
  });
  // Apply the omni-card--elevated class when elevated is set.
  it('applies elevated class', () => {
    const { container } = render(<Card elevated>body</Card>);
    expect(container.firstChild).toHaveClass('omni-card--elevated');
  });
  // Apply the omni-card--clickable class and call onClick when the card is clicked.
  it('applies clickable class and calls onClick', () => {
    const fn = vi.fn();
    const { container } = render(<Card onClick={fn}>body</Card>);
    expect(container.firstChild).toHaveClass('omni-card--clickable');
    fireEvent.click(container.firstChild!);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
