import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableColumnHeader } from './Table';
import { DocumentTable, TextTable, CalendarTable, StatusTable, AmmountTable } from '../icons';
import { colors } from '../tokens';
import { ThemeProvider } from '../tokens/ThemeProvider';

const meta: Meta<typeof TableColumnHeader> = {
  title: 'Components/Table/TableColumnHeader',
  component: TableColumnHeader,
  decorators: [
    (Story) => (
      <ThemeProvider theme="reports">
        <div style={{ padding: '20px' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <Story />
              </tr>
            </thead>
          </table>
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'TableColumnHeader component renders individual column headers with icons, titles, and optional sort indicators. Features a 36px height with proper icon sizing and alignment controls.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    column: {
      description: 'Column configuration object',
      control: 'object',
    },
    sortState: {
      description: 'Current sort state (column and direction)',
      control: 'object',
    },
    onSort: {
      description: 'Callback when column is clicked for sorting',
      action: 'sorted',
    },
    isLastColumn: {
      description: 'Whether this is the last column (affects border)',
      control: 'boolean',
    },
    isFirstColumn: {
      description: 'Whether this is the first column (affects border)',
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableColumnHeader>;

/**
 * Default column header with document icon
 */
export const Default: Story = {
  args: {
    column: {
      key: 'transactionName',
      title: 'Transaction Name',
      icon: <DocumentTable color={colors.reports.blue450} />,
      sortable: true,
      width: '300px',
    },
    sortState: {
      column: null,
      direction: null,
    },
    isFirstColumn: false,
    isLastColumn: false,
  },
};

/**
 * Sortable column header - not sorted
 */
export const Sortable: Story = {
  args: {
    column: {
      key: 'cedingCompany',
      title: 'Ceding Company',
      icon: <TextTable color={colors.reports.blue450} />,
      sortable: true,
      width: '200px',
    },
    sortState: {
      column: null,
      direction: null,
    },
  },
};

/**
 * Column header sorted ascending
 */
export const SortedAscending: Story = {
  args: {
    column: {
      key: 'effectiveDate',
      title: 'Effective Date',
      icon: <CalendarTable color={colors.reports.blue450} />,
      sortable: true,
      width: '200px',
    },
    sortState: {
      column: 'effectiveDate',
      direction: 'asc',
    },
  },
};

/**
 * Column header sorted descending
 */
export const SortedDescending: Story = {
  args: {
    column: {
      key: 'premium',
      title: 'Premium',
      icon: <AmmountTable color={colors.reports.blue450} />,
      sortable: true,
      width: '200px',
    },
    sortState: {
      column: 'premium',
      direction: 'desc',
    },
  },
};

/**
 * Non-sortable column header
 */
export const NonSortable: Story = {
  args: {
    column: {
      key: 'status',
      title: 'Status',
      icon: <StatusTable color={colors.reports.blue450} />,
      sortable: false,
      width: '200px',
    },
    sortState: {
      column: null,
      direction: null,
    },
  },
};

/**
 * Column header without icon
 */
export const NoIcon: Story = {
  args: {
    column: {
      key: 'notes',
      title: 'Notes',
      sortable: true,
      width: '200px',
    },
    sortState: {
      column: null,
      direction: null,
    },
  },
};

/**
 * Left-aligned header
 */
export const LeftAligned: Story = {
  args: {
    column: {
      key: 'policyName',
      title: 'Policy Name',
      icon: <DocumentTable color={colors.reports.blue450} />,
      sortable: true,
      width: '300px',
      headerAlign: 'left',
    },
    sortState: {
      column: null,
      direction: null,
    },
  },
};

/**
 * Right-aligned header
 */
export const RightAligned: Story = {
  args: {
    column: {
      key: 'amount',
      title: 'Amount',
      icon: <AmmountTable color={colors.reports.blue450} />,
      sortable: true,
      width: '200px',
      headerAlign: 'right',
    },
    sortState: {
      column: null,
      direction: null,
    },
  },
};

/**
 * Center-aligned header
 */
export const CenterAligned: Story = {
  args: {
    column: {
      key: 'status',
      title: 'Status',
      icon: <StatusTable color={colors.reports.blue450} />,
      sortable: false,
      width: '200px',
      headerAlign: 'center',
    },
    sortState: {
      column: null,
      direction: null,
    },
  },
};

/**
 * First column (no left border)
 */
export const FirstColumn: Story = {
  args: {
    column: {
      key: 'id',
      title: 'ID',
      sortable: true,
      width: '100px',
    },
    sortState: {
      column: null,
      direction: null,
    },
    isFirstColumn: true,
  },
};

/**
 * Last column (no right border)
 */
export const LastColumn: Story = {
  args: {
    column: {
      key: 'actions',
      title: 'Actions',
      icon: <StatusTable color={colors.reports.blue450} />,
      sortable: false,
      width: '150px',
    },
    sortState: {
      column: null,
      direction: null,
    },
    isLastColumn: true,
  },
};

/**
 * All column header variations in a row
 */
export const AllVariations: Story = {
  render: () => (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <TableColumnHeader
              column={{
                key: 'document',
                title: 'Document',
                icon: <DocumentTable color={colors.reports.blue450} />,
                sortable: true,
                width: '250px',
                headerAlign: 'left',
              }}
              sortState={{ column: null, direction: null }}
              isFirstColumn={true}
            />
            <TableColumnHeader
              column={{
                key: 'date',
                title: 'Date',
                icon: <CalendarTable color={colors.reports.blue450} />,
                sortable: true,
                width: '150px',
              }}
              sortState={{ column: 'date', direction: 'asc' }}
            />
            <TableColumnHeader
              column={{
                key: 'amount',
                title: 'Amount',
                icon: <AmmountTable color={colors.reports.blue450} />,
                sortable: true,
                width: '150px',
                headerAlign: 'right',
              }}
              sortState={{ column: null, direction: null }}
            />
            <TableColumnHeader
              column={{
                key: 'status',
                title: 'Status',
                icon: <StatusTable color={colors.reports.blue450} />,
                sortable: false,
                width: '150px',
              }}
              sortState={{ column: null, direction: null }}
            />
            <TableColumnHeader
              column={{
                key: 'actions',
                title: 'Actions',
                sortable: false,
                width: '150px',
              }}
              sortState={{ column: null, direction: null }}
              isLastColumn={true}
            />
          </tr>
        </thead>
      </table>
    </div>
  ),
};
