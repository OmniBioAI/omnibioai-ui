/**
 * Validate the ProgressBar component: default rendering, clamping out-of-range values, the
 * variant and size classes, and the percentage label's default, custom, and hidden states.
 *
 * Developer: Manish Kumar <manish@omnibioai.org>
 */
import { render } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  // Render the progress fill element with default props.
  it('renders with default props', () => {
    const { container } = render(<ProgressBar value={50} />);
    expect(container.querySelector('.omni-progress-fill')).toBeInTheDocument();
  });
  // Clamp a value above 100 to a 100% fill width.
  it('clamps value to 0–100', () => {
    const { container } = render(<ProgressBar value={150} />);
    const fill = container.querySelector('.omni-progress-fill') as HTMLElement;
    expect(fill.style.width).toBe('100%');
  });
  // Apply the variant class, e.g. omni-progress-fill--success.
  it('applies correct variant class', () => {
    const { container } = render(<ProgressBar value={80} variant="success" />);
    expect(container.querySelector('.omni-progress-fill--success')).toBeInTheDocument();
  });
  // Show the numeric percentage as the label by default.
  it('shows percentage label by default', () => {
    const { getByText } = render(<ProgressBar value={75} />);
    expect(getByText('75%')).toBeInTheDocument();
  });
  // Show a custom label string when one is provided.
  it('shows custom label when provided', () => {
    const { getByText } = render(<ProgressBar value={75} label="98.7%" />);
    expect(getByText('98.7%')).toBeInTheDocument();
  });
  // Omit the label element when showLabel is false.
  it('hides label when showLabel is false', () => {
    const { container } = render(<ProgressBar value={75} showLabel={false} />);
    expect(container.querySelector('.omni-progress-label')).toBeNull();
  });
  // Apply the size class, e.g. omni-progress-track--lg.
  it('applies size class', () => {
    const { container } = render(<ProgressBar value={50} size="lg" />);
    expect(container.querySelector('.omni-progress-track--lg')).toBeInTheDocument();
  });
});
