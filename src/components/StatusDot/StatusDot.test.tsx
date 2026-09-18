/**
 * Validate the StatusDot component: rendering with and without a label, and the class applied for
 * each status value.
 *
 * Developer: Manish Kumar <manish@omnibioai.org>
 */
import { render } from '@testing-library/react';
import { StatusDot } from './StatusDot';

describe('StatusDot', () => {
  // Render the dot element without a label.
  it('renders without label', () => {
    const { container } = render(<StatusDot status="success" />);
    expect(container.querySelector('.omni-status-dot')).toBeInTheDocument();
  });
  // Render the status label text when one is provided.
  it('renders label when provided', () => {
    const { getByText } = render(<StatusDot status="success" label="UP" />);
    expect(getByText('UP')).toBeInTheDocument();
  });
  // Apply the up class for the success status.
  it('applies up class for success', () => {
    const { container } = render(<StatusDot status="success" />);
    expect(container.querySelector('.omni-status-dot--up')).toBeInTheDocument();
  });
  // Apply the down class for the failed status.
  it('applies down class for failed', () => {
    const { container } = render(<StatusDot status="failed" />);
    expect(container.querySelector('.omni-status-dot--down')).toBeInTheDocument();
  });
  // Apply the pulse class for the running status.
  it('applies pulse class for running', () => {
    const { container } = render(<StatusDot status="running" />);
    expect(container.querySelector('.omni-status-dot--pulse')).toBeInTheDocument();
  });
  // Apply the warn class for the queued status.
  it('applies warn class for queued', () => {
    const { container } = render(<StatusDot status="queued" />);
    expect(container.querySelector('.omni-status-dot--warn')).toBeInTheDocument();
  });
  // Apply the init class for the idle status.
  it('applies init class for idle', () => {
    const { container } = render(<StatusDot status="idle" />);
    expect(container.querySelector('.omni-status-dot--init')).toBeInTheDocument();
  });
});
