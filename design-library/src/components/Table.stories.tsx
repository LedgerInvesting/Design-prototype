import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Table, TableColumn, TableRow } from './Table';
import { StatusWarning, StatusError, StatusSuccess } from '../icons';
import { Chips, Status } from './';
import { CalendarTable, TextTable, FileTable, StatusTable, AmmountTable, DocumentTable } from '../icons';
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
      description: 'Array of column definitions with title, key, sorting, and alignment options. Each column can have: title, key, icon, sortable, **align** (for cell content alignment), **headerAlign** (for column header alignment), cellType, etc. Use align and headerAlign properties together to create professional layouts where the first column is left-aligned and data columns are right-aligned.',
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
    icon: <DocumentTable color={colors.reports.blue450} />,
    sortable: true,
    width: '300px',
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
    width: '200px',
  },
  {
    key: 'reinsurerName',
    title: 'Reinsurer Name',
    icon: <TextTable color={colors.reports.blue450} />,
    sortable: true,
    width: '200px',
  },
  {
    key: 'effectiveDate',
    title: 'Effective Date',
    icon: <CalendarTable color={colors.reports.blue450} />,
    sortable: true,
    width: '200px',
  },
  {
    key: 'contracts',
    title: 'Contracts',
    icon: <AmmountTable color={colors.reports.blue450} />,
    sortable: true,
    width: '200px',
    align: 'center',
  },
  {
    key: 'status',
    title: 'Status',
    icon: <StatusTable color={colors.reports.blue450} />,
    sortable: false,
    width: '200px',
    align: 'center',
  },
  {
    key: 'gwp',
    title: 'GWP',
    icon: <AmmountTable color={colors.reports.blue450} />,
    sortable: true,
    width: '200px',
    align: 'right',
  },
  {
    key: 'premium',
    title: 'Premium',
    icon: <AmmountTable color={colors.reports.blue450} />,
    sortable: true,
    width: '200px',
    align: 'right',
  },
  {
    key: 'region',
    title: 'Region',
    icon: <TextTable color={colors.reports.blue450} />,
    sortable: true,
    width: '200px',
    align: 'left',
  },
  {
    key: 'actions',
    title: 'Actions',
    icon: <StatusTable color={colors.reports.blue450} />, // Using existing icon
    sortable: false,
    width: '150px',
    align: 'center',
    cellType: 'action',
    actionType: 'upload', // Default action type, can be overridden per row
    onAction: (actionType: string, text: string) => {
      console.log('Action clicked:', actionType, text);
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
    actions: 'upload', // ActionType - Shows upload icon + "Upload" text
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
    actions: 'validate', // ActionType - Shows check icon + "Validate" text
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
    actions: 'generate', // ActionType - Shows calculator icon + "Generate" text
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
    actions: 'setup', // ActionType - Shows config icon + "Setup" text
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
    actions: 'upload', // ActionType - Shows upload icon + "Upload" text (repeated for demo)
  },
  {
    policyName: 'green_re_insurance_policy.pdf',
    cedent: 'Lime Insurers LLC',
    reinsurerName: 'Mountain Re LLC',
    effectiveDate: '05/01/2024',
    contracts: '6',
    status: <Chips variant="success" size="small" text="Active" showDot={true} showChevron={false} />,
    gwp: '$1.8M',
    premium: '$950K',
    region: 'North America',
    actions: 'validate', // ActionType - Shows check icon + "Validate" text
  },
  {
    policyName: 'orange_re_contract_terms.xlsx',
    cedent: 'Citrus Insurers LLC',
    reinsurerName: 'Valley Re LLC',
    effectiveDate: '05/15/2024',
    contracts: '3',
    status: <Chips variant="warning" size="small" text="Pending" showDot={true} showChevron={false} />,
    gwp: '$750K',
    premium: '$1.2M',
    region: 'Europe',
    actions: 'generate', // ActionType - Shows calculator icon + "Generate" text
  },
];

// Default table
export const Default: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('All');
    
    return (
      <div style={{ 
        width: '100%',
        maxWidth: '1200px', // Realistic container width to demonstrate scrolling
        margin: '0 auto',
        padding: '20px',
        boxSizing: 'border-box',
      }}>
        <Table
          {...args}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            console.log('Tab clicked:', tab);
          }}
        />
      </div>
    );
  },
  args: {
    columns: sampleColumns,
    data: sampleData, // Show all 7 rows with all action types
    title: 'Policy Groups',
    showHeader: true,
    showSearch: true,
    showTabs: true,
    tabs: ['All', 'By Ceding Insurers', 'By Transaction name', 'By Year'],
    activeTab: 'All',
    showPagination: true,
    showFooterPagination: true,
    currentPage: 1,
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
  },
};

// Interactive tabs story with state management
export const InteractiveTabs: StoryObj<typeof Table> = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('All');
    
    return (
      <div style={{ 
        width: '100%',
        maxWidth: '1200px', // Realistic container width to demonstrate scrolling
        margin: '0 auto',
        padding: '20px',
        boxSizing: 'border-box',
      }}>
        <Table
          {...args}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            console.log('Tab changed to:', tab);
          }}
        />
      </div>
    );
  },
  args: {
    columns: sampleColumns,
    data: sampleData, // Show all rows with all action types
    showHeader: true,
    showSearch: true,
    showTabs: true,
    tabs: ['All', 'By Ceding Insurers', 'By Transaction name', 'By Year'],
    activeTab: 'All',
    showPagination: true,
    showFooterPagination: true,
    currentPage: 1,
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive table with functional tab selector. Click on different tabs to see the active state change with blue400 divider lines.',
      },
    },
  },
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
        width: '200px',
        align: 'right',
      },
      {
        key: 'status',
        title: 'Status',
        sortable: false,
        width: '200px',
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
        width: '200px',
      },
      {
        key: 'amount',
        title: 'Amount',
        sortable: true,
        width: '200px',
        align: 'right',
      },
      {
        key: 'category',
        title: 'Category',
        sortable: false,
        width: '200px',
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
        icon: <DocumentTable color={colors.reports.blue450} />,
        sortable: false,
        width: '250px',
        cellType: 'document', // Document download cells
        onDownload: (filename: string) => {
          console.log('Downloading document:', filename);
        },
      },
      {
        key: 'documentConfig',
        title: 'Document Config',
        icon: <DocumentTable color={colors.reports.blue450} />,
        sortable: false,
        width: '250px',
        cellType: 'document', // Document cells with config icon
        hoverIcon: 'config', // Use config icon on hover instead of download
        onDownload: (filename: string) => {
          console.log('Configuring document:', filename);
        },
      },
      {
        key: 'documentOpen',
        title: 'Document Open',
        icon: <DocumentTable color={colors.reports.blue450} />,
        sortable: false,
        width: '250px',
        cellType: 'document', // Document cells with open icon
        hoverIcon: 'open', // Use chevron right icon on hover to indicate opening
        onDownload: (filename: string) => {
          console.log('Opening document:', filename);
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
        documentConfig: 'policy_alpha_config.json',
        documentOpen: 'policy_alpha_details.pdf',
        action: 'Edit Policy',
      },
      {
        simple: 'Policy Beta',
        document: 'policy_beta_terms.docx',
        documentConfig: 'policy_beta_config.json',
        documentOpen: 'policy_beta_details.docx',
        action: 'Configure',
      },
      {
        simple: 'Policy Gamma',
        document: 'policy_gamma_summary.xlsx',
        documentConfig: 'policy_gamma_config.json',
        documentOpen: 'policy_gamma_details.xlsx',
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
        story: 'Demonstrates all cell types in the Table component: simple text cells, document cells with download icon, document cells with config icon, document cells with open icon (chevron right), and action button cells (click to trigger actions).',
      },
    },
  },
};

// Action buttons showcase - demonstrates all 4 action types
export const ActionButtonsShowcase: Story = {
  args: {
    columns: [
      {
        key: 'type',
        title: 'Action Type',
        sortable: false,
        width: '150px',
        cellType: 'simple',
      },
      {
        key: 'description',
        title: 'Description',
        sortable: false,
        width: '250px',
        cellType: 'simple',
      },
      {
        key: 'uploadAction',
        title: 'Upload (Green)',
        sortable: false,
        width: '150px',
        cellType: 'action',
        actionType: 'upload',
        onAction: (actionType: string, text: string) => {
          console.log('Upload action clicked:', actionType, text);
        },
      },
      {
        key: 'validateAction',
        title: 'Validate (Blue)',
        sortable: false,
        width: '150px',
        cellType: 'action',
        actionType: 'validate',
        onAction: (actionType: string, text: string) => {
          console.log('Validate action clicked:', actionType, text);
        },
      },
      {
        key: 'generateAction',
        title: 'Generate (Blue)',
        sortable: false,
        width: '150px',
        cellType: 'action',
        actionType: 'generate',
        onAction: (actionType: string, text: string) => {
          console.log('Generate action clicked:', actionType, text);
        },
      },
      {
        key: 'setupAction',
        title: 'Setup (Blue)',
        sortable: false,
        width: '150px',
        cellType: 'action',
        actionType: 'setup',
        onAction: (actionType: string, text: string) => {
          console.log('Setup action clicked:', actionType, text);
        },
      },
    ],
    data: [
      {
        type: 'Upload',
        description: 'Primary action with light green background and success green icon',
        uploadAction: 'upload',
        validateAction: 'validate',
        generateAction: 'generate',
        setupAction: 'setup',
      },
      {
        type: 'Validate',
        description: 'Check/validation action with blue styling',
        uploadAction: 'upload',
        validateAction: 'validate',
        generateAction: 'generate',
        setupAction: 'setup',
      },
      {
        type: 'Generate',
        description: 'Calculator/generation action with blue styling',
        uploadAction: 'upload',
        validateAction: 'validate',
        generateAction: 'generate',
        setupAction: 'setup',
      },
      {
        type: 'Setup',
        description: 'Configuration action with blue styling',
        uploadAction: 'upload',
        validateAction: 'validate',
        generateAction: 'generate',
        setupAction: 'setup',
      },
    ],
    title: 'Action Buttons Showcase',
    showHeader: false,
    showSearch: false,
    showTabs: false,
    showPagination: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete showcase of all four action button types with their distinct styling. Upload actions have light green background (#C6FFC1) with success green icon, while validate, generate, and setup actions use blue styling. Each button shows proper hover states and click interactions.',
      },
    },
  },
};

// Intelligent Column Width Showcase
export const IntelligentColumnWidths: Story = {
  render: () => {
    // Utility function for intelligent column width sizing
    const getOptimizedColumnWidth = (data: any[], columnKey: string, baseWidth: string = '200px'): string => {
      // Skip action columns and document columns (they have special requirements)
      if (columnKey === 'actions' || columnKey.includes('document') || columnKey.includes('file')) {
        return columnKey === 'actions' ? '130px' : '300px';
      }
      
      // Check if all values in this column have less than 11 characters
      const allValuesShort = data.every(row => {
        const value = row[columnKey];
        if (typeof value === 'string') {
          return value.length < 11;
        }
        return String(value).length < 11;
      });
      
      // Return 150px if all values are short, otherwise use base width
      return allValuesShort ? '150px' : baseWidth;
    };

    // Example data with mixed content lengths
    const intelligentData = [
      { shortText: 'ABC', longText: 'Very Long Company Name LLC', date: '01/01/2024', amount: '$1,234', status: 'Active', actions: 'upload' },
      { shortText: 'DEF', longText: 'Another Extended Business Corp', date: '02/15/2024', amount: '$5,678', status: 'Pending', actions: 'validate' },
      { shortText: 'GHI', longText: 'Comprehensive Solutions Ltd', date: '03/30/2024', amount: '$9,012', status: 'Complete', actions: 'generate' },
    ];

    // Columns with automatic width optimization
    const intelligentColumns = [
      {
        key: 'shortText',
        title: 'Short Content',
        icon: <TextTable color={colors.reports.blue450} />,
        sortable: true,
        width: getOptimizedColumnWidth(intelligentData, 'shortText'), // Will be 150px
      },
      {
        key: 'longText',
        title: 'Long Content',
        icon: <TextTable color={colors.reports.blue450} />,
        sortable: true,
        width: getOptimizedColumnWidth(intelligentData, 'longText'), // Will be 200px
      },
      {
        key: 'date',
        title: 'Dates',
        icon: <CalendarTable color={colors.reports.blue450} />,
        sortable: true,
        width: getOptimizedColumnWidth(intelligentData, 'date'), // Will be 150px
      },
      {
        key: 'amount',
        title: 'Amounts',
        icon: <AmmountTable color={colors.reports.blue450} />,
        sortable: true,
        width: getOptimizedColumnWidth(intelligentData, 'amount'), // Will be 150px
      },
      {
        key: 'status',
        title: 'Status',
        icon: <StatusTable color={colors.reports.blue450} />,
        sortable: false,
        width: getOptimizedColumnWidth(intelligentData, 'status'), // Will be 150px
      },
      {
        key: 'actions',
        title: 'Actions',
        icon: <StatusTable color={colors.reports.blue450} />,
        sortable: false,
        width: getOptimizedColumnWidth(intelligentData, 'actions'), // Will be 130px
        cellType: 'action' as const,
        actionType: 'upload' as const,
        onAction: (actionType: string, text: string) => {
          console.log('Action clicked:', actionType, text);
        },
      },
    ];

    return (
      <div style={{ 
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px',
        boxSizing: 'border-box',
      }}>
        <div style={{ 
          marginBottom: '20px', 
          padding: '16px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          fontSize: '14px',
          lineHeight: '1.6'
        }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#333' }}>🧠 Intelligent Column Width Rule</h4>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Rule:</strong> If all cells in a column have less than 11 characters, width = 150px
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Special cases:</strong> Documents = 300px, Actions = 130px
          </p>
          <p style={{ margin: '0', color: '#666' }}>
            <strong>Result:</strong> Short Content, Dates, Amounts, Status = 150px | Long Content = 200px
          </p>
        </div>
        
        <Table
          columns={intelligentColumns}
          data={intelligentData}
          showHeader={false}
          showTabs={false}
          showPagination={false}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**Intelligent Column Width System** - Automatically optimizes column widths based on content length.

### The Rule
If all cells in a column contain less than 11 characters, the column width is automatically set to 150px. Otherwise, it uses the base width (default 200px).

### Special Cases
- **Document columns**: Always 300px (for long filenames)
- **Action columns**: Always 130px (for buttons)

### Usage
\`\`\`typescript
const getOptimizedColumnWidth = (data: any[], columnKey: string, baseWidth: string = '200px'): string => {
  // Skip special columns
  if (columnKey === 'actions' || columnKey.includes('document')) {
    return columnKey === 'actions' ? '130px' : '300px';
  }
  
  // Check if all values are short (< 11 characters)
  const allValuesShort = data.every(row => {
    const value = row[columnKey];
    return String(value).length < 11;
  });
  
  return allValuesShort ? '150px' : baseWidth;
};

// Use in column definitions
{
  key: 'columnName',
  title: 'Column Title',
  width: getOptimizedColumnWidth(data, 'columnName'),
}
\`\`\`

This system creates more efficient, readable tables by automatically sizing columns based on their content.
        `,
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
        width: '200px',
      },
      {
        key: 'number',
        title: 'Number',
        sortable: true,
        width: '200px',
        align: 'right',
      },
      {
        key: 'status',
        title: 'Status',
        sortable: false,
        width: '200px',
        align: 'center',
      },
      {
        key: 'badge',
        title: 'Badge',
        sortable: false,
        width: '200px',
        align: 'center',
      },
      {
        key: 'mixed',
        title: 'Mixed Content',
        sortable: false,
        width: '200px',
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

// Column alignment showcase - both headers and cells
export const ColumnAlignment: Story = {
  args: {
    columns: [
      {
        key: 'document',
        title: 'Document Name',
        icon: <DocumentTable color={colors.analytics.green700} />,
        headerAlign: 'left',
        align: 'left',
        sortable: true,
        width: '300px',
        cellType: 'simple' as const,
      },
      {
        key: 'year',
        title: 'Treaty Year',
        icon: <TextTable color={colors.analytics.green700} />,
        headerAlign: 'right',
        align: 'right',
        sortable: true,
        cellType: 'simple' as const,
      },
      {
        key: 'ratio',
        title: 'Loss Ratio',
        icon: <TextTable color={colors.analytics.green700} />,
        headerAlign: 'right',
        align: 'right',
        sortable: true,
        cellType: 'simple' as const,
      },
      {
        key: 'premium',
        title: 'Premium Amount',
        icon: <AmmountTable color={colors.analytics.green700} />,
        headerAlign: 'right',
        align: 'right',
        sortable: true,
        cellType: 'simple' as const,
      },
    ],
    data: [
      {
        document: 'Aviation Treaty 2023',
        year: 'TY23',
        ratio: '53.2%',
        premium: '$3,800,000',
      },
      {
        document: 'Marine Insurance Policy',
        year: 'TY24',
        ratio: '47.8%',
        premium: '€2,150,000',
      },
      {
        document: 'Property Coverage Plan',
        year: 'TY23',
        ratio: '61.5%',
        premium: '£1,900,000',
      },
    ],
    title: 'Column Alignment Demo',
    showTabs: false,
    showSearch: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates both `headerAlign` and `align` properties for comprehensive column alignment control. **headerAlign** controls the alignment of column header text and icons, while **align** controls the alignment of cell content. The first column uses left alignment for both headers and cells, while all other columns use right alignment. This creates a clean, professional layout where the primary identification column is left-aligned and data columns are right-aligned for better number readability.',
      },
    },
  },
};