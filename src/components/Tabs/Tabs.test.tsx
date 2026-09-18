/**
 * Validate the Tabs component: rendering tab labels, showing the first tab's content by default,
 * switching content on click, the onChange callback, and the defaultTab prop.
 *
 * Developer: Manish Kumar <manish@omnibioai.org>
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from './Tabs';

const tabs = [
  { key: 'a', label: 'Tab A', content: <div>Content A</div> },
  { key: 'b', label: 'Tab B', content: <div>Content B</div> },
  { key: 'c', label: 'Tab C', content: <div>Content C</div> },
];

describe('Tabs', () => {
  // Render every tab's label.
  it('renders all tab labels', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText('Tab A')).toBeInTheDocument();
    expect(screen.getByText('Tab B')).toBeInTheDocument();
    expect(screen.getByText('Tab C')).toBeInTheDocument();
  });
  // Show the first tab's content by default.
  it('shows first tab content by default', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText('Content A')).toBeInTheDocument();
  });
  // Switch the displayed content when a different tab is clicked.
  it('switches content on tab click', () => {
    render(<Tabs tabs={tabs} />);
    fireEvent.click(screen.getByText('Tab B'));
    expect(screen.getByText('Content B')).toBeInTheDocument();
  });
  // Call onChange with the clicked tab's key.
  it('calls onChange with correct key', () => {
    const fn = vi.fn();
    render(<Tabs tabs={tabs} onChange={fn} />);
    fireEvent.click(screen.getByText('Tab C'));
    expect(fn).toHaveBeenCalledWith('c');
  });
  // Show the content for the tab named in defaultTab.
  it('respects defaultTab prop', () => {
    render(<Tabs tabs={tabs} defaultTab="b" />);
    expect(screen.getByText('Content B')).toBeInTheDocument();
  });
});
