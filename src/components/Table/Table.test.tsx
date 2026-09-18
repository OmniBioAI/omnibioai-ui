/**
 * Validate the Table component: row and header rendering, the empty-data message and its default,
 * a custom cell render function, column-click sorting (including non-sortable columns and the
 * three-state sort cycle), null-value handling, and pagination.
 *
 * Developer: Manish Kumar <manish@omnibioai.org>
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { Table } from './Table';

const cols = [
  { key: 'name' as const, label: 'Name', sortable: true },
  { key: 'code' as const, label: 'Code', sortable: true, align: 'right' as const },
];
const data = [
  { name: 'alpha', code: 300 },
  { name: 'beta',  code: 100 },
  { name: 'gamma', code: 200 },
];

describe('Table', () => {
  // Render every row's cell values.
  it('renders all rows', () => {
    render(<Table columns={cols} data={data} />);
    expect(screen.getByText('alpha')).toBeInTheDocument();
    expect(screen.getByText('beta')).toBeInTheDocument();
    expect(screen.getByText('gamma')).toBeInTheDocument();
  });
  // Render every column's header label.
  it('renders column headers', () => {
    render(<Table columns={cols} data={data} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Code')).toBeInTheDocument();
  });
  // Show the custom empty message when there is no data.
  it('shows empty message when no data', () => {
    render(<Table columns={cols} data={[]} emptyMessage="Nothing here" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });
  // Sort rows ascending on the first click of a sortable header.
  it('sorts ascending on header click', () => {
    render(<Table columns={cols} data={data} />);
    fireEvent.click(screen.getByText('Name'));
    const cells = screen.getAllByRole('cell');
    expect(cells[0].textContent).toBe('alpha');
  });
  // Render a cell with the column's custom render function.
  it('uses custom render function', () => {
    const customCols = [
      { key: 'name' as const, label: 'Name',
        render: (v: unknown) => <strong>{String(v)}</strong> },
    ];
    render(<Table columns={customCols} data={data} />);
    expect(screen.getByText('alpha').tagName).toBe('STRONG');
  });

  // Fall back to the default empty message when none is given.
  it('uses the default empty message', () => {
    render(<Table columns={cols} data={[]} />);
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  // Leave row order unchanged when a non-sortable header is clicked.
  it('ignores clicks on non-sortable columns', () => {
    const nonSortable = [
      { key: 'name' as const, label: 'Name' },
      { key: 'code' as const, label: 'Code', sortable: true },
    ];
    render(<Table columns={nonSortable} data={[{ name: 'beta', code: 2 }, { name: 'alpha', code: 1 }]} />);
    fireEvent.click(screen.getByText('Name'));
    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('beta');
  });

  // Cycle a sortable header through ascending, descending, and unsorted on repeated clicks.
  it('cycles a sortable column through ascending, descending, and unsorted states', () => {
    render(<Table columns={cols} data={[{ name: 'beta', code: 2 }, { name: 'alpha', code: 1 }]} />);
    const nameHeader = screen.getByText('Name');

    fireEvent.click(nameHeader);
    expect(nameHeader).toHaveClass('sorted-asc');
    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('alpha');

    fireEvent.click(nameHeader);
    expect(nameHeader).toHaveClass('sorted-desc');
    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('beta');

    fireEvent.click(nameHeader);
    expect(nameHeader).not.toHaveClass('sorted-asc');
    expect(nameHeader).not.toHaveClass('sorted-desc');
  });

  // Render the em-dash fallback for a null cell value and keep it stable across sort toggles.
  it('handles null values and renders the fallback cell value', () => {
    const nullableColumns = [
      { key: 'name' as const, label: 'Name', sortable: true },
    ];
    const nullableData = [{ name: null }, { name: 'alpha' }, { name: 'alpha' }];
    render(<Table columns={nullableColumns} data={nullableData} />);

    expect(screen.getByText('—')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Name'));
    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('alpha');
    fireEvent.click(screen.getByText('Name'));
    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('alpha');
  });

  // Paginate rows by pageSize and enable/disable the previous/next page buttons at the boundaries.
  it('paginates rows and exposes navigation state', () => {
    const rows = Array.from({ length: 25 }, (_, index) => ({
      name: `row-${index + 1}`,
      code: index + 1,
    }));
    render(<Table columns={cols} data={rows} pageSize={2} />);

    expect(screen.getByText('row-1')).toBeInTheDocument();
    expect(screen.queryByText('row-3')).not.toBeInTheDocument();
    expect(screen.getByText('25 items')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '←' })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: '2' }));
    expect(screen.getByText('row-3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '←' })).not.toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: '13' }));
    expect(screen.getByText('row-25')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '→' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: '←' }));
    expect(screen.getByText('row-23')).toBeInTheDocument();
  });

});
