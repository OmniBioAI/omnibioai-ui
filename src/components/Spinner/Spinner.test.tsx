/**
 * Validate the Spinner component: the default and explicit size classes and the custom border
 * color applied via inline style.
 *
 * Developer: Manish Kumar <manish@omnibioai.org>
 */
import { render } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  // Apply the medium size class by default.
  it('renders with default size', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('.omni-spinner--md')).toBeInTheDocument();
  });
  // Apply the small size class when size is sm.
  it('applies sm size class', () => {
    const { container } = render(<Spinner size="sm" />);
    expect(container.querySelector('.omni-spinner--sm')).toBeInTheDocument();
  });
  // Apply the large size class when size is lg.
  it('applies lg size class', () => {
    const { container } = render(<Spinner size="lg" />);
    expect(container.querySelector('.omni-spinner--lg')).toBeInTheDocument();
  });
  // Apply a custom border-top color via inline style.
  it('applies custom color via style', () => {
    const { container } = render(<Spinner color="#ff0000" />);
    const el = container.querySelector('.omni-spinner') as HTMLElement;
    expect(el.style.borderTopColor).toBe('rgb(255, 0, 0)');
  });
});
