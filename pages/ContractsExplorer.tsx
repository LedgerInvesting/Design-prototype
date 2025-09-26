import React from 'react';
// Import page components
import { Layout } from '@design-library/pages';
import type { BreadcrumbItem } from '@design-library/pages';

// Import base components  
import { Table } from '@design-library/components';

// Import design tokens
import { colors, typography, spacing, borderRadius } from '@design-library/tokens';

// Import navigation utilities
import { createPageNavigationHandler, createBreadcrumbs } from '@design-library/utils/navigation';

// Define page type for navigation
type PageType = 'cash-settlement' | 'report-navigation' | 'transaction-management' | 'new-transaction-form' | 'contracts-explorer' | 'analytics-valuation';

export interface ContractsExplorerProps {
  onNavigateToPage?: (page: string, data?: any) => void;
}

export const ContractsExplorer: React.FC<ContractsExplorerProps> = ({
  onNavigateToPage
}) => {

  // Sample data for Reinsurance Trust table
  const reinsuranceTrustData = [
    {
      id: '1',
      contractName: 'Liberty Mutual Re Trust 2024-A',
      amended: 'Yes',
      signedDate: '2024-01-10',
      effectiveDate: '2024-01-15',
      pageCount: '42'
    },
    {
      id: '2', 
      contractName: 'Swiss Re Collateral Trust 2024-B',
      amended: 'No',
      signedDate: '2024-02-28',
      effectiveDate: '2024-03-01',
      pageCount: '35'
    },
    {
      id: '3',
      contractName: 'Munich Re Trust Fund 2023-C',
      amended: 'Yes',
      signedDate: '2023-12-08',
      effectiveDate: '2023-12-10',
      pageCount: '58'
    },
    {
      id: '4',
      contractName: 'Hannover Re Security Trust 2024-D',
      amended: 'No',
      signedDate: '2024-02-25',
      effectiveDate: '2024-02-28',
      pageCount: '29'
    }
  ];

  // Sample data for Reinsurance Schedule table
  const reinsuranceScheduleData = [
    {
      id: '1',
      contractName: 'RS-2024-001 American Insurance Co.',
      amended: 'Yes',
      signedDate: '2023-12-28',
      effectiveDate: '2024-01-01',
      pageCount: '67'
    },
    {
      id: '2',
      contractName: 'RS-2024-002 Global Casualty LLC',
      amended: 'No',
      signedDate: '2024-01-10',
      effectiveDate: '2024-01-15',
      pageCount: '83'
    },
    {
      id: '3',
      contractName: 'RS-2024-003 Regional Property Ins.',
      amended: 'Yes',
      signedDate: '2024-01-28',
      effectiveDate: '2024-02-01',
      pageCount: '45'
    },
    {
      id: '4',
      contractName: 'RS-2024-004 Specialty Risk Partners',
      amended: 'No',
      signedDate: '2024-02-10',
      effectiveDate: '2024-02-15',
      pageCount: '72'
    },
    {
      id: '5',
      contractName: 'RS-2024-005 National Auto Insurance',
      amended: 'Yes',
      signedDate: '2024-02-25',
      effectiveDate: '2024-03-01',
      pageCount: '91'
    },
    {
      id: '6',
      contractName: 'RS-2024-006 Metropolitan Liability Corp',
      amended: 'No',
      signedDate: '2024-03-10',
      effectiveDate: '2024-03-15',
      pageCount: '63'
    },
    {
      id: '7',
      contractName: 'RS-2024-007 Continental Risk Management',
      amended: 'Yes',
      signedDate: '2024-03-22',
      effectiveDate: '2024-04-01',
      pageCount: '88'
    },
    {
      id: '8',
      contractName: 'RS-2024-008 Coastal Insurance Group',
      amended: 'No',
      signedDate: '2024-04-05',
      effectiveDate: '2024-04-10',
      pageCount: '54'
    },
    {
      id: '9',
      contractName: 'RS-2024-009 Midwest Mutual Reinsurance',
      amended: 'Yes',
      signedDate: '2024-04-18',
      effectiveDate: '2024-04-20',
      pageCount: '76'
    },
    {
      id: '10',
      contractName: 'RS-2024-010 Atlantic Coverage Solutions',
      amended: 'No',
      signedDate: '2024-05-02',
      effectiveDate: '2024-05-05',
      pageCount: '42'
    },
    {
      id: '11',
      contractName: 'RS-2024-011 Pacific Indemnity Trust',
      amended: 'Yes',
      signedDate: '2024-05-15',
      effectiveDate: '2024-05-20',
      pageCount: '97'
    }
  ];

  // Utility function for intelligent column width sizing - more compact for no-scroll layout
  const getOptimizedColumnWidth = (data: any[], columnKey: string): string => {
    // Special handling for different column types to fit in 1200px container
    if (columnKey === 'contractName') {
      return '280px'; // More compact for better balance
    }
    if (columnKey === 'amended') {
      return '120px'; // Very compact for Yes/No
    }
    if (columnKey === 'signedDate' || columnKey === 'effectiveDate') {
      return '140px'; // Compact for dates
    }
    if (columnKey === 'pageCount') {
      return '120px'; // Very compact for numbers
    }
    
    // Default fallback
    return '150px';
  };

  // Define columns for Reinsurance Trust table
  const reinsuranceTrustColumns = [
    {
      key: 'contractName',
      title: 'Contract Name',
      cellType: 'document' as const,
      sortable: true,
      width: getOptimizedColumnWidth(reinsuranceTrustData, 'contractName'),
      align: 'left', // First column left-aligned
      headerAlign: 'left',
      hoverIcon: 'download' as const,
      onDownload: (filename: string) => {
        console.log('Download contract:', filename);
      }
    },
    {
      key: 'amended',
      title: 'Amended?',
      cellType: 'simple' as const,
      sortable: true,
      width: getOptimizedColumnWidth(reinsuranceTrustData, 'amended'),
      align: 'right', // Right-aligned cells
      headerAlign: 'right' // Right-aligned headers
    },
    {
      key: 'signedDate',
      title: 'Signed Date',
      cellType: 'simple' as const,
      sortable: true,
      width: getOptimizedColumnWidth(reinsuranceTrustData, 'signedDate'),
      align: 'right', // Right-aligned cells
      headerAlign: 'right' // Right-aligned headers
    },
    {
      key: 'effectiveDate',
      title: 'Effective Date',
      cellType: 'simple' as const,
      sortable: true,
      width: getOptimizedColumnWidth(reinsuranceTrustData, 'effectiveDate'),
      align: 'right', // Right-aligned cells
      headerAlign: 'right' // Right-aligned headers
    },
    {
      key: 'pageCount',
      title: 'Page Count',
      cellType: 'simple' as const,
      sortable: true,
      width: getOptimizedColumnWidth(reinsuranceTrustData, 'pageCount'),
      align: 'right', // Right-aligned cells
      headerAlign: 'right' // Right-aligned headers
    }
  ];

  // Define columns for Reinsurance Schedule table
  const reinsuranceScheduleColumns = [
    {
      key: 'contractName',
      title: 'Contract Name',
      cellType: 'document' as const,
      sortable: true,
      width: getOptimizedColumnWidth(reinsuranceScheduleData, 'contractName'),
      align: 'left', // First column left-aligned
      headerAlign: 'left',
      hoverIcon: 'download' as const,
      onDownload: (filename: string) => {
        console.log('Download contract:', filename);
      }
    },
    {
      key: 'amended',
      title: 'Amended?',
      cellType: 'simple' as const,
      sortable: true,
      width: getOptimizedColumnWidth(reinsuranceScheduleData, 'amended'),
      align: 'right', // Right-aligned cells
      headerAlign: 'right' // Right-aligned headers
    },
    {
      key: 'signedDate',
      title: 'Signed Date',
      cellType: 'simple' as const,
      sortable: true,
      width: getOptimizedColumnWidth(reinsuranceScheduleData, 'signedDate'),
      align: 'right', // Right-aligned cells
      headerAlign: 'right' // Right-aligned headers
    },
    {
      key: 'effectiveDate',
      title: 'Effective Date',
      cellType: 'simple' as const,
      sortable: true,
      width: getOptimizedColumnWidth(reinsuranceScheduleData, 'effectiveDate'),
      align: 'right', // Right-aligned cells
      headerAlign: 'right' // Right-aligned headers
    },
    {
      key: 'pageCount',
      title: 'Page Count',
      cellType: 'simple' as const,
      sortable: true,
      width: getOptimizedColumnWidth(reinsuranceScheduleData, 'pageCount'),
      align: 'right', // Right-aligned cells
      headerAlign: 'right' // Right-aligned headers
    }
  ];

  const containerStyles: React.CSSProperties = {
    width: '100%',
    padding: '0',
    backgroundColor: colors.blackAndWhite.white,
  };

  const tableContainerStyles: React.CSSProperties = {
    marginBottom: '40px',
  };


  return (
    <Layout
      selectedSidebarItem="reports"
      selectedSidebarSubitem="explorer"
      breadcrumbs={createBreadcrumbs.contracts.explorer(onNavigateToPage!)}
      onNavigate={createPageNavigationHandler(onNavigateToPage!, 'contracts-explorer')}
      onInboxClick={() => {
        console.log('Inbox clicked');
      }}
      onShareClick={() => {
        console.log('Share clicked');
      }}
      onUserMenuClick={() => {
        console.log('User menu clicked');
      }}
    >
      <div style={containerStyles}>
        
        {/* Reinsurance Trust Table */}
        <div style={tableContainerStyles}>
          <Table
            columns={reinsuranceTrustColumns}
            data={reinsuranceTrustData}
            tabs={[]}
            selectedTab=""
            onTabClick={() => {}}
            showSearch={false}
            showTabs={false}
            title="Reinsurance Trust"
            itemsPerPage={10}
            totalItems={reinsuranceTrustData.length}
            currentPage={1}
            onPageChange={(page) => {
              console.log('Page change:', page);
            }}
          />
        </div>

        {/* Reinsurance Schedule Table */}
        <div style={tableContainerStyles}>
          <Table
            columns={reinsuranceScheduleColumns}
            data={reinsuranceScheduleData}
            tabs={[]}
            selectedTab=""
            onTabClick={() => {}}
            showSearch={false}
            showTabs={false}
            title="Reinsurance Schedule"
            showFooterPagination={true}
            itemsPerPage={10}
            totalItems={reinsuranceScheduleData.length}
            totalPages={Math.ceil(reinsuranceScheduleData.length / 10)}
            currentPage={1}
            onPageChange={(page) => {
              console.log('Page change:', page);
            }}
          />
        </div>

      </div>
    </Layout>
  );
};

export default ContractsExplorer;