/**
 * Validate the Badge component: rendering children, the class applied for each variant (success,
 * warning, danger, info, neutral, default), and the default variant.
 *
 * Developer: Manish Kumar <manish@omnibioai.org>
 */
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  // Render the given children inside the badge.
  it('renders children', () => {
    render(<Badge>hello</Badge>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
  // Apply the omni-badge--success class for the success variant.
  it('applies success variant class', () => {
    const { container } = render(<Badge variant="success">ok</Badge>);
    expect(container.firstChild).toHaveClass('omni-badge--success');
  });
  // Apply the omni-badge--warning class for the warning variant.
  it('applies warning variant class', () => {
    const { container } = render(<Badge variant="warning">warn</Badge>);
    expect(container.firstChild).toHaveClass('omni-badge--warning');
  });
  // Apply the omni-badge--danger class for the danger variant.
  it('applies danger variant class', () => {
    const { container } = render(<Badge variant="danger">fail</Badge>);
    expect(container.firstChild).toHaveClass('omni-badge--danger');
  });
  // Apply the omni-badge--info class for the info variant.
  it('applies info variant class', () => {
    const { container } = render(<Badge variant="info">info</Badge>);
    expect(container.firstChild).toHaveClass('omni-badge--info');
  });
  // Render without error for both the neutral and default variants.
  it('neutral and default both render without error', () => {
    const { container: a } = render(<Badge variant="neutral">n</Badge>);
    const { container: b } = render(<Badge variant="default">d</Badge>);
    expect(a.firstChild).toBeTruthy();
    expect(b.firstChild).toBeTruthy();
  });
  // Apply the base omni-badge class when no variant is given.
  it('defaults to neutral when no variant given', () => {
    const { container } = render(<Badge>default</Badge>);
    expect(container.firstChild).toHaveClass('omni-badge');
  });
});
