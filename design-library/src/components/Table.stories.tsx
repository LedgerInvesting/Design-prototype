import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableColumn, TableRow } from './Table';
import { StatusWarning, StatusError, StatusSuccess } from '../icons';
import { Chips, Status } from './';
import { CalendarTable, TextTable, FileTable, StatusTable, AmmountTable } from '../icons';
import { colors } from '../tokens';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Comprehensive table component with header (search, filters, pagination), sortable columns, and customizable body content. Built with design system tokens and supports various data types and interactive elements.',
      },
    },
  },
  argTypes: {
    columns: {
      description: 'Array of column definitions with title, key, sorting, and alignment options',
      control: 'object',
    },
    data: {
      description: 'Array of row data objects',
      control: 'object',
    },
    title: {
      description: 'Optional table title shown in header',
      control: 'text',
    },
    showHeader: {
      description: 'Whether to show the table header section',
      control: 'boolean',
    },
    showSearch: {
      description: 'Whether to show search input in header',
      control: 'boolean',
    },
    showFilter: {
      description: 'Whether to show add filter button in header',
      control: 'boolean',
    },
    showPagination: {
      description: 'Whether to show pagination controls in header',
      control: 'boolean',
    },
    currentPage: {
      description: 'Current active page number',
      control: 'number',
    },
    totalPages: {
      description: 'Total number of pages',
      control: 'number',
    },
    totalItems: {
      description: 'Total number of items across all pages',
      control: 'number',
    },
    itemsPerPage: {
      description: 'Number of items displayed per page',
      control: 'number',
    },
    emptyMessage: {
      description: 'Message displayed when no data is available',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// Sample data matching the Figma design
const sampleColumns: TableColumn[] = [
  {
    key: 'policyName',
    title: 'Policy Name',
    icon: <TextTable color={colors.reports.blue450} />,
    sortable: true,
    width: '350px',
    cellType: 'document',
    onDownload: (filename: string) => {
      console.log('Downloading policy document:', filename);
      // In real implementation, this would trigger actual download
    },
  },
  {
    key: 'cedent',
    title: 'Cedent',
    icon: <FileTable color={colors.reports.blue450} />,
    sortable: true,
    width: '180px',
  },
  {
    key: 'reinsurerName',
    title: 'Reinsurer Name',
    icon: <TextTable color={colors.reports.blue450} />,
    sortable: true,
    width: '180px',
  },
  {
    key: 'effectiveDate',
    title: 'Effective Date',
    icon: <CalendarTable color={colors.reports.blue450} />,
    sortable: true,
    width: '180px',
  },
  {
    key: 'contracts',
    title: 'Contracts',
    icon: <AmmountTable color={colors.reports.blue450} />,
    sortable: true,
    width: '180px',
    align: 'center',
  },
  {
    key: 'status',
    title: 'Status',
    icon: <StatusTable color={colors.reports.blue450} />,
    sortable: false,
    width: '180px',
    align: 'center',
  },
  {
    key: 'gwp',
    title: 'GWP',
    icon: <AmmountTable color={colors.reports.blue450} />,
    sortable: true,
    width: '180px',
    align: 'right',
  },
  {
    key: 'premium',
    title: 'Premium',
    icon: <AmmountTable color={colors.reports.blue450} />,
    sortable: true,
    width: '180px',
    align: 'right',
  },
  {
    key: 'region',
    title: 'Region',
    icon: <TextTable color={colors.reports.blue450} />,
    sortable: true,
    width: '180px',
    align: 'left',
  },
  {
    key: 'actions',
    title: 'Actions',
    icon: <StatusTable color={colors.reports.blue450} />, // Using existing icon
    sortable: false,
    width: '180px',
    align: 'center',
    cellType: 'action',
    actionIcon: 'edit', // Default to edit, can be overridden per row
    onAction: (text: string) => {
      console.log('Action clicked:', text);
      // In real implementation, this would handle the action
    },
  },
];

const sampleData: TableRow[] = [
  {
    policyName: 'maroon_re_policy_contract.pdf',
    cedent: 'Plum Insurers LLC with Extended Name',
    reinsurerName: 'Global Reinsurance Corporation LLC',
    effectiveDate: '01/01/2024',
    contracts: '12',
    status: <Chips variant="inactive" size="small" text="Inactive" showDot={true} showChevron={false} />,
    gwp: '$650K',
    premium: '$3.1M',
    region: 'North America Regional Division',
    actions: 'Contract Config',
  },
  {
    policyName: 'blue_re_policy_agreement.docx',
    cedent: 'Guava Insurers LLC',
    reinsurerName: 'Eagle Re LLC',
    effectiveDate: '02/15/2024',
    contracts: '14',
    status: <Chips variant="success" size="small" text="Active" showDot={true} showChevron={false} />,
    gwp: '$1.2M',
    premium: '$750K',
    region: 'Europe',
    actions: 'Upload BDX',
  },
  {
    policyName: 'violet_re_terms_conditions.pdf',
    cedent: 'Pear Insurers LLC',
    reinsurerName: 'Global Re LLC',
    effectiveDate: '03/01/2024',
    contracts: '1',
    status: <Chips variant="success" size="small" text="Active" showDot={true} showChevron={false} />,
    gwp: '$2.5M',
    premium: '$1.1M',
    region: 'Asia Pacific',
    actions: 'Contract Config',
  },
  {
    policyName: 'gray_re_contract_summary.xlsx',
    cedent: 'Plum Insurers LLC',
    reinsurerName: 'Wolf Re LLC',
    effectiveDate: '03/15/2024',
    contracts: '4',
    status: <Chips variant="success" size="small" text="Active" showDot={true} showChevron={false} />,
    gwp: '$900K',
    premium: '$1.8M',
    region: 'Latin America',
    actions: 'Upload BDX',
  },
  {
    policyName: 'olive_re_policy_details.pdf',
    cedent: 'Pomo Insurers LLC',
    reinsurerName: 'Fox Re LLC',
    effectiveDate: '04/01/2024',
    contracts: '8',
    status: <Chips variant="inactive" size="small" text="Inactive" showDot={true} showChevron={false} />,
    gwp: '$500K',
    premium: '$600K',
    region: 'Middle East',
    actions: 'Contract Config',
  },
];

// Default table
export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData.slice(0, 3), // Show first 3 rows
    title: 'Policy Groups',
    showHeader: true,
    showSearch: true,
    showFilter: true,
    showPagination: true,
    currentPage: 1,
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
  },
  render: (args) => (
    <div style={{ 
      width: '1100px', 
      maxWidth: '1100px',
      margin: '0 auto',
    }}>
      <Table {...args} />
    </div>
  ),
};

// Full table with all features
export const FullTable: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    title: 'Standard Columns',
    showHeader: true,
    showSearch: true,
    showFilter: true,
    showPagination: true,
    currentPage: 1,
    totalPages: 8,
    totalItems: 95,
    itemsPerPage: 12,
  },
  render: (args) => (
    <div style={{ 
      width: '1100px', 
      maxWidth: '1100px',
      margin: '0 auto',
    }}>
      <Table {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete table with all features enabled: header with title, search, filter, pagination, sortable columns, and mixed content including chips for status.',
      },
    },
  },
};

// Simple table without header
export const SimpleTable: Story = {
  args: {
    columns: sampleColumns.slice(0, 4), // First 4 columns
    data: sampleData.slice(0, 3),
    showHeader: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple table without header section, showing just column headers and data rows.',
      },
    },
  },
};

// Table with custom column widths and alignment
export const CustomColumns: Story = {
  args: {
    columns: [
      {
        key: 'id',
        title: 'ID',
        sortable: true,
        width: '60px',
        align: 'center',
      },
      {
        key: 'name',
        title: 'Company Name',
        sortable: true,
        width: '250px',
        align: 'left',
      },
      {
        key: 'revenue',
        title: 'Revenue',
        sortable: true,
        width: '180px',
        align: 'right',
      },
      {
        key: 'status',
        title: 'Status',
        sortable: false,
        width: '180px',
        align: 'center',
      },
    ],
    data: [
      {
        id: '001',
        name: 'Acme Corporation',
        revenue: '$2.4M',
        status: <StatusSuccess />,
      },
      {
        id: '002',
        name: 'Global Industries Ltd',
        revenue: '$1.8M',
        status: <StatusWarning />,
      },
      {
        id: '003',
        name: 'Tech Solutions Inc',
        revenue: '$3.2M',
        status: <StatusError />,
      },
    ],
    title: 'Company Revenue Report',
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with custom column widths and different text alignments (left, center, right). Shows status icons in status column.',
      },
    },
  },
};

// Empty table
export const EmptyTable: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    title: 'Empty Policy Groups',
    emptyMessage: 'No policy groups found. Try adjusting your search or filters.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Table in empty state with custom empty message.',
      },
    },
  },
};

// Header only showcase
export const HeaderShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Header with All Features</h3>
        <Table
          columns={sampleColumns.slice(0, 3)}
          data={[]}
          title="Policy Management"
          showHeader={true}
          showSearch={true}
          showFilter={true}
          showPagination={true}
          currentPage={3}
          totalPages={10}
          totalItems={95}
          itemsPerPage={10}
        />
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Header with Search Only</h3>
        <Table
          columns={sampleColumns.slice(0, 3)}
          data={[]}
          showHeader={true}
          showSearch={true}
          showFilter={false}
          showPagination={false}
        />
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Header with Pagination Only</h3>
        <Table
          columns={sampleColumns.slice(0, 3)}
          data={[]}
          showHeader={true}
          showSearch={false}
          showFilter={false}
          showPagination={true}
          currentPage={1}
          totalPages={5}
          totalItems={47}
          itemsPerPage={10}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different header configurations showing various combinations of search, filter, and pagination controls.',
      },
    },
  },
};

// Sortable columns demo
export const SortableColumns: Story = {
  args: {
    columns: [
      {
        key: 'name',
        title: 'Name',
        sortable: true,
        width: '200px',
      },
      {
        key: 'date',
        title: 'Date',
        sortable: true,
        width: '180px',
      },
      {
        key: 'amount',
        title: 'Amount',
        sortable: true,
        width: '180px',
        align: 'right',
      },
      {
        key: 'category',
        title: 'Category',
        sortable: false,
        width: '180px',
      },
    ],
    data: [
      {
        name: 'Transaction A',
        date: '2024-01-15',
        amount: '$1,250',
        category: 'Insurance',
      },
      {
        name: 'Transaction B',
        date: '2024-01-10',
        amount: '$890',
        category: 'Reinsurance',
      },
      {
        name: 'Transaction C',
        date: '2024-01-20',
        amount: '$2,100',
        category: 'Claims',
      },
    ],
    title: 'Transaction History',
    sortState: { column: 'date', direction: 'desc' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with sortable columns. Click column headers to sort. Shows visual indicators for sort direction.',
      },
    },
  },
};

// Horizontal scroll demo
export const HorizontalScroll: Story = {
  args: {
    columns: sampleColumns, // Use all columns including new ones
    data: sampleData,
    title: 'Wide Table with Horizontal Scroll',
    showHeader: true,
    showSearch: true,
    showFilter: true,
    showPagination: true,
    currentPage: 1,
    totalPages: 3,
    totalItems: 25,
    itemsPerPage: 10,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with many columns demonstrating horizontal scroll functionality. The table header (search, filter, pagination) remains fixed while the column headers and body scroll horizontally.',
      },
    },
  },
};

// Table with document cells
export const WithDocumentCells: Story = {
  args: {
    columns: sampleColumns, // Use all columns including document column
    data: sampleData,
    title: 'Policy Documents Table',
    showHeader: true,
    showSearch: true,
    showFilter: true,
    showPagination: true,
    currentPage: 1,
    totalPages: 4,
    totalItems: 35,
    itemsPerPage: 10,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with DocumentCell components demonstrating downloadable file functionality. Hover over document cells to see the download icon appear.',
      },
    },
  },
};

// Cell types showcase - demonstrates all 3 cell types
export const CellTypesShowcase: Story = {
  args: {
    columns: [
      {
        key: 'simple',
        title: 'Simple Text',
        sortable: true,
        width: '200px',
        cellType: 'simple', // Simple text cells
      },
      {
        key: 'document',
        title: 'Document Files',
        sortable: false,
        width: '250px',
        cellType: 'document', // Document download cells
        onDownload: (filename: string) => {
          console.log('Downloading document:', filename);
        },
      },
      {
        key: 'action',
        title: 'Actions',
        sortable: false,
        width: '200px',
        cellType: 'action', // Action button cells
        actionIcon: 'edit',
        onAction: (text: string) => {
          console.log('Action clicked:', text);
        },
      },
    ],
    data: [
      {
        simple: 'Policy Alpha',
        document: 'policy_alpha_contract.pdf',
        action: 'Edit Policy',
      },
      {
        simple: 'Policy Beta',
        document: 'policy_beta_terms.docx',
        action: 'Configure',
      },
      {
        simple: 'Policy Gamma',
        document: 'policy_gamma_summary.xlsx',
        action: 'Review',
      },
    ],
    title: 'Cell Types Demo',
    showHeader: true,
    showSearch: false,
    showFilter: false,
    showPagination: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all three cell types in the Table component: simple text cells, document download cells (hover to see download icon), and action button cells (click to trigger actions).',
      },
    },
  },
};

// Data types showcase
export const DataTypesShowcase: Story = {
  args: {
    columns: [
      {
        key: 'text',
        title: 'Text',
        sortable: true,
        width: '180px',
      },
      {
        key: 'number',
        title: 'Number',
        sortable: true,
        width: '180px',
        align: 'right',
      },
      {
        key: 'status',
        title: 'Status',
        sortable: false,
        width: '180px',
        align: 'center',
      },
      {
        key: 'badge',
        title: 'Badge',
        sortable: false,
        width: '180px',
        align: 'center',
      },
      {
        key: 'mixed',
        title: 'Mixed Content',
        sortable: false,
        width: '180px',
      },
    ],
    data: [
      {
        text: 'Sample Text A',
        number: '42',
        status: <Chips variant="success" size="small" text="Active" showChevron={false} />,
        badge: <StatusSuccess />,
        mixed: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <StatusWarning />
            <span>Warning</span>
          </div>
        ),
      },
      {
        text: 'Sample Text B',
        number: '128',
        status: <Chips variant="error" size="small" text="Error" showChevron={false} />,
        badge: <StatusError />,
        mixed: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <StatusSuccess />
            <span>Success</span>
          </div>
        ),
      },
      {
        text: 'Sample Text C',
        number: '89',
        status: <Chips variant="inactive" size="small" text="Inactive" showChevron={false} />,
        badge: <StatusWarning />,
        mixed: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <StatusSuccess />
            <span>Info</span>
          </div>
        ),
      },
    ],
    title: 'Data Types Example',
  },
  parameters: {
    docs: {
      description: {
        story: 'Showcase of different data types in table cells: plain text, numbers, status chips, status icons, and mixed content with multiple components.',
      },
    },
  },
};