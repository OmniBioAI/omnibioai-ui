/**
 * Validate the Tooltip component: rendering its trigger children, rendering the tooltip content,
 * and the tooltip box's class name.
 *
 * Developer: Manish Kumar <manish@omnibioai.org>
 */
import { render, screen } from '@testing-library/react';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  // Render the trigger children.
  it('renders children', () => {
    render(<Tooltip content="tip text"><span>hover me</span></Tooltip>);
    expect(screen.getByText('hover me')).toBeInTheDocument();
  });
  // Render the tooltip content text.
  it('renders tooltip content in DOM', () => {
    render(<Tooltip content="tip text"><span>target</span></Tooltip>);
    expect(screen.getByText('tip text')).toBeInTheDocument();
  });
  // Apply the omni-tooltip-box class to the tooltip element.
  it('tooltip box has correct class', () => {
    const { container } = render(
      <Tooltip content="tip"><span>x</span></Tooltip>
    );
    expect(container.querySelector('.omni-tooltip-box')).toBeInTheDocument();
  });
});
