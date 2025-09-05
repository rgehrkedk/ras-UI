/**
 * Tests for Table component
 */

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { Table, TableHeader, TableBody, Column, Row, Cell } from './index';

// Mock data for tests
const testData = [
  { id: 1, name: 'File 1', size: '1 MB' },
  { id: 2, name: 'File 2', size: '2 MB' },
  { id: 3, name: 'File 3', size: '3 MB' },
];

describe('Table', () => {
  it('renders basic table structure', () => {
    render(
      <Table aria-label="Test table">
        <TableHeader>
          <Column>Name</Column>
          <Column>Size</Column>
        </TableHeader>
        <TableBody>
          <Row>
            <Cell>test.pdf</Cell>
            <Cell>1 MB</Cell>
          </Row>
        </TableBody>
      </Table>
    );

    expect(screen.getByRole('table', { name: 'Test table' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Size' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'test.pdf' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '1 MB' })).toBeInTheDocument();
  });

  it('applies size variants correctly', () => {
    const { rerender } = render(
      <Table aria-label="Test table" size="sm">
        <TableHeader>
          <Column>Name</Column>
        </TableHeader>
        <TableBody>
          <Row>
            <Cell>test.pdf</Cell>
          </Row>
        </TableBody>
      </Table>
    );

    const table = screen.getByRole('table');
    expect(table).toHaveAttribute('data-size', 'sm');

    rerender(
      <Table aria-label="Test table" size="lg">
        <TableHeader>
          <Column>Name</Column>
        </TableHeader>
        <TableBody>
          <Row>
            <Cell>test.pdf</Cell>
          </Row>
        </TableBody>
      </Table>
    );

    expect(table).toHaveAttribute('data-size', 'lg');
  });

  it('supports single selection mode', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    render(
      <Table 
        aria-label="Test table" 
        selectionMode="single"
        onSelectionChange={onSelectionChange}
      >
        <TableHeader>
          <Column>Name</Column>
        </TableHeader>
        <TableBody>
          {testData.map((item) => (
            <Row key={item.id}>
              <Cell>{item.name}</Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
    );

    const firstRow = screen.getByRole('row', { name: /File 1/ });
    await user.click(firstRow);

    expect(onSelectionChange).toHaveBeenCalledWith(new Set([1]));
  });

  it('supports multiple selection mode', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    render(
      <Table 
        aria-label="Test table" 
        selectionMode="multiple"
        onSelectionChange={onSelectionChange}
      >
        <TableHeader>
          <Column>Name</Column>
        </TableHeader>
        <TableBody>
          {testData.map((item) => (
            <Row key={item.id}>
              <Cell>{item.name}</Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
    );

    // Select first row
    const firstRow = screen.getByRole('row', { name: /File 1/ });
    await user.click(firstRow);
    
    // Select second row with Ctrl
    const secondRow = screen.getByRole('row', { name: /File 2/ });
    await user.keyboard('{Control>}');
    await user.click(secondRow);
    await user.keyboard('{/Control}');

    expect(onSelectionChange).toHaveBeenLastCalledWith(new Set([1, 2]));
  });

  it('supports column sorting', async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();

    render(
      <Table 
        aria-label="Test table"
        onSortChange={onSortChange}
      >
        <TableHeader>
          <Column id="name" allowsSorting>Name</Column>
          <Column>Size</Column>
        </TableHeader>
        <TableBody>
          {testData.map((item) => (
            <Row key={item.id}>
              <Cell>{item.name}</Cell>
              <Cell>{item.size}</Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
    );

    const nameHeader = screen.getByRole('columnheader', { name: /Name/ });
    await user.click(nameHeader);

    expect(onSortChange).toHaveBeenCalledWith({
      column: 'name',
      direction: 'ascending'
    });
  });

  it('renders empty state when no data', () => {
    const emptyMessage = vi.fn(() => <div>No data available</div>);
    
    render(
      <Table aria-label="Empty table">
        <TableHeader>
          <Column>Name</Column>
        </TableHeader>
        <TableBody renderEmptyState={emptyMessage}>
          {[]}
        </TableBody>
      </Table>
    );

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();

    render(
      <Table aria-label="Test table" selectionMode="single">
        <TableHeader>
          <Column>Name</Column>
        </TableHeader>
        <TableBody>
          {testData.map((item) => (
            <Row key={item.id}>
              <Cell>{item.name}</Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
    );

    const table = screen.getByRole('table');
    table.focus();

    // Navigate with arrow keys
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('row', { name: /File 1/ })).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('row', { name: /File 2/ })).toHaveFocus();

    // Select with Space
    await user.keyboard('{Space}');
    expect(screen.getByRole('row', { name: /File 2/ })).toHaveAttribute('aria-selected', 'true');
  });

  it('warns when missing accessibility props', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <Table>
        <TableHeader>
          <Column>Name</Column>
        </TableHeader>
        <TableBody>
          <Row>
            <Cell>test</Cell>
          </Row>
        </TableBody>
      </Table>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'Table: Tables require an aria-label or aria-labelledby prop for accessibility'
    );

    consoleSpy.mockRestore();
  });

  it('applies striped styling', () => {
    render(
      <Table aria-label="Test table" striped>
        <TableHeader>
          <Column>Name</Column>
        </TableHeader>
        <TableBody>
          <Row>
            <Cell>test</Cell>
          </Row>
        </TableBody>
      </Table>
    );

    const table = screen.getByRole('table');
    expect(table).toHaveAttribute('data-striped', 'true');
  });

  it('applies bordered styling', () => {
    render(
      <Table aria-label="Test table" bordered>
        <TableHeader>
          <Column>Name</Column>
        </TableHeader>
        <TableBody>
          <Row>
            <Cell>test</Cell>
          </Row>
        </TableBody>
      </Table>
    );

    const table = screen.getByRole('table');
    expect(table).toHaveAttribute('data-bordered', 'true');
  });

  it('disables hover when hoverable is false', () => {
    render(
      <Table aria-label="Test table" hoverable={false}>
        <TableHeader>
          <Column>Name</Column>
        </TableHeader>
        <TableBody>
          <Row>
            <Cell>test</Cell>
          </Row>
        </TableBody>
      </Table>
    );

    const table = screen.getByRole('table');
    expect(table).toHaveAttribute('data-hoverable', 'false');
  });
});