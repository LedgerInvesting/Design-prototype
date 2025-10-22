import React, { useState } from 'react';
// Import page components
import { Layout, PageBanner } from '@design-library/pages';

// Import base components
import { Button, Table } from '@design-library/components';

// Import design tokens
import { typography, borderRadius, spacing, useSemanticColors } from '@design-library/tokens';
import { createPageNavigationHandler } from '@design-library/utils/navigation';

// Import icons
import { SearchMedium, ChevronLeftSmall, ChevronRightSmall, DocumentTable, TextTable, CalendarTable, StatusTable, AmmountTable, PlayTable } from '@design-library/icons';

// Import modal
import { NewTransactionModal } from './NewTransactionModal';
import { BrandNewTransactionModal } from './BrandNewTransactionModal';

// Custom Table Header Component for Contracts Transactions
interface ContractsTableHeaderProps {
  title: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
}

const ContractsTableHeader: React.FC<ContractsTableHeaderProps> = ({
  title,
  searchValue = '',
  onSearchChange,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const colors = useSemanticColors();

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px',
    height: '80px',
    backgroundColor: colors.blackAndWhite.white,
    borderTopLeftRadius: borderRadius[8],
    borderTopRightRadius: borderRadius[8],
    borderTop: `1px solid ${colors.theme.primary400}`,
    borderLeft: `1px solid ${colors.theme.primary400}`,
    borderRight: `1px solid ${colors.theme.primary400}`,
    borderBottom: 'none', // No bottom border to avoid double border with column headers
    boxSizing: 'border-box',
  };

  const leftSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const rightSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const titleStyles: React.CSSProperties = {
    ...typography.styles.subheadingM,
    color: colors.blackAndWhite.black900,
    margin: 0,
  };

  const searchContainerStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.theme.primary200,
    borderRadius: borderRadius.absolute,
    height: '30px',
    width: isSearchExpanded ? '200px' : '58px',
    padding: isSearchExpanded ? '4px 12px 4px 12px' : '4px 18px',
    justifyContent: isSearchExpanded ? 'space-between' : 'flex-end',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const searchInputStyles: React.CSSProperties = {
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    ...typography.styles.bodyM,
    color: colors.blackAndWhite.black900,
    width: isSearchExpanded ? '140px' : '0px',
    padding: '0',
    opacity: isSearchExpanded ? 1 : 0,
    transition: 'all 0.3s ease',
    cursor: 'text',
  };

  const searchIconStyles: React.CSSProperties = {
    flexShrink: 0,
    pointerEvents: 'none' as const,
    transition: 'all 0.3s ease',
  };

  const documentsCountStyles: React.CSSProperties = {
    ...typography.styles.captionS,
    color: colors.blackAndWhite.black500,
  };

  const navButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    padding: 0,
    transition: 'opacity 0.2s ease',
  };

  const disabledNavButtonStyles: React.CSSProperties = {
    ...navButtonStyles,
    opacity: 0.3,
    cursor: 'not-allowed',
  };

  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <>
      <style>
        {`
          .contracts-search-input::placeholder {
            color: ${colors.blackAndWhite.black500};
            opacity: 1;
          }
        `}
      </style>
      <div style={headerStyles}>
        {/* Left Section: Title + Search */}
        <div style={leftSectionStyles}>
          <div style={titleStyles}>{title}</div>
          <div
            style={searchContainerStyles}
            onClick={() => {
              if (!isSearchExpanded) {
                setIsSearchExpanded(true);
                setTimeout(() => {
                  const input = document.querySelector('.contracts-search-input') as HTMLInputElement;
                  if (input) input.focus();
                }, 300);
              }
            }}
          >
            {isSearchExpanded && (
              <input
                className="contracts-search-input"
                style={searchInputStyles}
                type="text"
                placeholder="Type to search…"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                onBlur={() => {
                  if (!searchValue) {
                    setIsSearchExpanded(false);
                  }
                }}
                onClick={(e) => e.stopPropagation()}
              />
            )}
            <div style={searchIconStyles}>
              <SearchMedium color={colors.blackAndWhite.black900} />
            </div>
          </div>
        </div>

        {/* Right Section: Documents Count + Pagination */}
        <div style={rightSectionStyles}>
          <span style={documentsCountStyles}>
            {startItem}-{endItem} of {totalItems} documents
          </span>
          <button
            style={currentPage === 1 ? disabledNavButtonStyles : navButtonStyles}
            onClick={() => currentPage > 1 && onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
            type="button"
            aria-label="Previous page"
          >
            <ChevronLeftSmall color={currentPage === 1 ? colors.blackAndWhite.black400 : colors.blackAndWhite.black900} />
          </button>
          <button
            style={currentPage === totalPages ? disabledNavButtonStyles : navButtonStyles}
            onClick={() => currentPage < totalPages && onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages}
            type="button"
            aria-label="Next page"
          >
            <ChevronRightSmall color={currentPage === totalPages ? colors.blackAndWhite.black400 : colors.blackAndWhite.black900} />
          </button>
        </div>
      </div>
    </>
  );
};

// Utility function to automatically size columns based on content length
const getOptimizedColumnWidth = (data: any[], columnKey: string, baseWidth: string = '200px'): string => {
  // Skip action columns and document columns (they have special requirements)
  if (columnKey === 'actions' || columnKey === 'transactionName') {
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

// Table section component
interface TransactionTableProps {
  onNavigateToPage?: (page: string) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ onNavigateToPage }) => {
  const colors = useSemanticColors();
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data
  const sampleData = [
    {
      transactionName: 'Blue Commercial Auto 2020',
      cedingCompany: 'Plum Insurers LLC',
      reinsurerName: 'Global Reinsurance Corp',
      effectiveDate: '01/01/2024',
      expiryDate: '12/31/2024',
      premium: '$1,245,000',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'Red Worker\'s Comp 2021',
      cedingCompany: 'Guava Insurers LLC',
      reinsurerName: 'Eagle Re LLC',
      effectiveDate: '02/01/2024',
      expiryDate: '12/31/2024',
      premium: '$890,500',
      status: 'Pending',
      actions: 'validate',
    },
    {
      transactionName: 'Green General Liability 2022',
      cedingCompany: 'Pear Insurers LLC',
      reinsurerName: 'Global Re LLC',
      effectiveDate: '01/10/2024',
      expiryDate: '06/30/2024',
      premium: '$567,200',
      status: 'Cancelled',
      actions: 'generate',
    },
    {
      transactionName: 'Yellow Agriculture 2023',
      cedingCompany: 'Plum Insurers LLC',
      reinsurerName: 'Wolf Re LLC',
      effectiveDate: '03/01/2024',
      expiryDate: '12/31/2024',
      premium: '$2,100,000',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'Black Aviation 2024',
      cedingCompany: 'Pomo Insurers LLC',
      reinsurerName: 'Fox Re LLC',
      effectiveDate: '04/15/2024',
      expiryDate: '12/31/2024',
      premium: '$430,750',
      status: 'Draft',
      actions: 'setup',
    },
    {
      transactionName: 'White Cyber 2025',
      cedingCompany: 'Lime Insurers LLC',
      reinsurerName: 'Mountain Re LLC',
      effectiveDate: '05/01/2024',
      expiryDate: '12/31/2024',
      premium: '$1,850,000',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'Purple Commercial Auto 2021',
      cedingCompany: 'Citrus Insurers LLC',
      reinsurerName: 'Valley Re LLC',
      effectiveDate: '06/15/2024',
      expiryDate: '12/31/2024',
      premium: '$750,300',
      status: 'Pending',
      actions: 'validate',
    },
    {
      transactionName: 'Silver Worker\'s Comp 2024',
      cedingCompany: 'Berry Insurers LLC',
      reinsurerName: 'Summit Re LLC',
      effectiveDate: '07/01/2024',
      expiryDate: '12/31/2024',
      premium: '$1,320,400',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'Gold General Liability 2020',
      cedingCompany: 'Ocean Insurers LLC',
      reinsurerName: 'Coastal Re LLC',
      effectiveDate: '08/15/2024',
      expiryDate: '12/31/2024',
      premium: '$995,600',
      status: 'Draft',
      actions: 'setup',
    },
    {
      transactionName: 'Pink Agriculture 2025',
      cedingCompany: 'Reef Insurers LLC',
      reinsurerName: 'Deep Re LLC',
      effectiveDate: '09/01/2024',
      expiryDate: '12/31/2024',
      premium: '$2,450,000',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'Orange Aviation 2022',
      cedingCompany: 'Gold Insurers LLC',
      reinsurerName: 'Precious Re LLC',
      effectiveDate: '10/01/2024',
      expiryDate: '12/31/2024',
      premium: '$678,900',
      status: 'Pending',
      actions: 'validate',
    },
    {
      transactionName: 'Teal Cyber 2023',
      cedingCompany: 'Stone Insurers LLC',
      reinsurerName: 'Solid Re LLC',
      effectiveDate: '11/15/2024',
      expiryDate: '12/31/2024',
      premium: '$445,200',
      status: 'Cancelled',
      actions: 'generate',
    },
    {
      transactionName: 'Brown Commercial Auto 2025',
      cedingCompany: 'Timber Insurers LLC',
      reinsurerName: 'Forest Re LLC',
      effectiveDate: '12/01/2024',
      expiryDate: '12/31/2025',
      premium: '$1,675,000',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'Cyan Worker\'s Comp 2022',
      cedingCompany: 'Azure Insurers LLC',
      reinsurerName: 'Sky Re LLC',
      effectiveDate: '01/15/2024',
      expiryDate: '12/31/2024',
      premium: '$923,400',
      status: 'Pending',
      actions: 'validate',
    },
    {
      transactionName: 'Maroon General Liability 2024',
      cedingCompany: 'Wine Insurers LLC',
      reinsurerName: 'Burgundy Re LLC',
      effectiveDate: '02/15/2024',
      expiryDate: '12/31/2024',
      premium: '$1,234,567',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'Indigo Agriculture 2021',
      cedingCompany: 'Purple Insurers LLC',
      reinsurerName: 'Violet Re LLC',
      effectiveDate: '03/15/2024',
      expiryDate: '12/31/2024',
      premium: '$756,890',
      status: 'Draft',
      actions: 'setup',
    },
    {
      transactionName: 'Violet Aviation 2020',
      cedingCompany: 'Lavender Insurers LLC',
      reinsurerName: 'Lilac Re LLC',
      effectiveDate: '04/01/2024',
      expiryDate: '12/31/2024',
      premium: '$2,890,000',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'Grey Cyber 2021',
      cedingCompany: 'Slate Insurers LLC',
      reinsurerName: 'Ash Re LLC',
      effectiveDate: '05/15/2024',
      expiryDate: '12/31/2024',
      premium: '$1,445,600',
      status: 'Pending',
      actions: 'validate',
    },
    {
      transactionName: 'Navy Commercial Auto 2023',
      cedingCompany: 'Marine Insurers LLC',
      reinsurerName: 'Ocean Re LLC',
      effectiveDate: '06/01/2024',
      expiryDate: '12/31/2024',
      premium: '$987,654',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'Coral Worker\'s Comp 2020',
      cedingCompany: 'Reef Insurers LLC',
      reinsurerName: 'Aqua Re LLC',
      effectiveDate: '07/15/2024',
      expiryDate: '12/31/2024',
      premium: '$654,321',
      status: 'Cancelled',
      actions: 'generate',
    },
    {
      transactionName: 'Mint General Liability 2025',
      cedingCompany: 'Fresh Insurers LLC',
      reinsurerName: 'Green Re LLC',
      effectiveDate: '08/01/2024',
      expiryDate: '12/31/2025',
      premium: '$1,876,543',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'Beige Agriculture 2024',
      cedingCompany: 'Sand Insurers LLC',
      reinsurerName: 'Desert Re LLC',
      effectiveDate: '09/15/2024',
      expiryDate: '12/31/2024',
      premium: '$543,210',
      status: 'Draft',
      actions: 'setup',
    },
    {
      transactionName: 'Turquoise Aviation 2023',
      cedingCompany: 'Crystal Insurers LLC',
      reinsurerName: 'Gem Re LLC',
      effectiveDate: '10/15/2024',
      expiryDate: '12/31/2024',
      premium: '$2,123,456',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'Lavender Cyber 2022',
      cedingCompany: 'Flower Insurers LLC',
      reinsurerName: 'Bloom Re LLC',
      effectiveDate: '11/01/2024',
      expiryDate: '12/31/2024',
      premium: '$876,543',
      status: 'Pending',
      actions: 'validate',
    },
    {
      transactionName: 'Magenta Commercial Auto 2024',
      cedingCompany: 'Bright Insurers LLC',
      reinsurerName: 'Vivid Re LLC',
      effectiveDate: '12/15/2024',
      expiryDate: '12/31/2024',
      premium: '$1,567,890',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'Olive Worker\'s Comp 2023',
      cedingCompany: 'Grove Insurers LLC',
      reinsurerName: 'Tree Re LLC',
      effectiveDate: '01/30/2024',
      expiryDate: '12/31/2024',
      premium: '$789,123',
      status: 'Draft',
      actions: 'setup',
    },
    {
      transactionName: 'Peach General Liability 2021',
      cedingCompany: 'Fruit Insurers LLC',
      reinsurerName: 'Orchard Re LLC',
      effectiveDate: '02/28/2024',
      expiryDate: '12/31/2024',
      premium: '$1,234,890',
      status: 'Cancelled',
      actions: 'generate',
    },
    {
      transactionName: 'Bronze Agriculture 2020',
      cedingCompany: 'Metal Insurers LLC',
      reinsurerName: 'Alloy Re LLC',
      effectiveDate: '03/30/2024',
      expiryDate: '12/31/2024',
      premium: '$456,789',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'Scarlet Aviation 2025',
      cedingCompany: 'Cardinal Insurers LLC',
      reinsurerName: 'Red Re LLC',
      effectiveDate: '04/30/2024',
      expiryDate: '12/31/2025',
      premium: '$3,456,789',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'Charcoal Cyber 2024',
      cedingCompany: 'Carbon Insurers LLC',
      reinsurerName: 'Steel Re LLC',
      effectiveDate: '05/30/2024',
      expiryDate: '12/31/2024',
      premium: '$2,345,678',
      status: 'Pending',
      actions: 'validate',
    }
  ];

  // Column definitions with automatic width optimization
  const tableColumns = [
    {
      key: 'transactionName',
      title: 'Transaction Name',
      icon: <DocumentTable color={colors.theme.primary400} />,
      sortable: true,
      width: getOptimizedColumnWidth(sampleData, 'transactionName'),
      cellType: 'document' as const,
      align: 'left' as const,
      headerAlign: 'left' as const,
      hoverIcon: 'config' as const,
      onDownload: (filename: string) => {
        onNavigateToPage && onNavigateToPage('contracts-ai-extraction');
      },
    },
    {
      key: 'status',
      title: 'Status',
      icon: <StatusTable color={colors.theme.primary400} />,
      sortable: false,
      width: getOptimizedColumnWidth(sampleData, 'status'),
      cellType: 'status' as const,
      align: 'left' as const,
      headerAlign: 'left' as const,
    },
    {
      key: 'cedingCompany',
      title: 'Ceding Insurer',
      icon: <TextTable color={colors.theme.primary400} />,
      sortable: true,
      width: getOptimizedColumnWidth(sampleData, 'cedingCompany'),
      align: 'left' as const,
      headerAlign: 'left' as const,
    },
    {
      key: 'reinsurerName',
      title: 'Reinsurer',
      icon: <TextTable color={colors.theme.primary400} />,
      sortable: true,
      width: getOptimizedColumnWidth(sampleData, 'reinsurerName'),
      align: 'left' as const,
      headerAlign: 'left' as const,
    },
    {
      key: 'actions',
      title: 'Actions',
      icon: <PlayTable color={colors.theme.primary400} />,
      sortable: false,
      width: getOptimizedColumnWidth(sampleData, 'actions'),
      align: 'center' as const,
      headerAlign: 'left' as const,
      cellType: 'action' as const,
      actionType: 'upload' as const,
      onAction: (actionType: string, text: string) => {
        if (actionType === 'upload') {
          onNavigateToPage && onNavigateToPage('contracts-ai-extraction');
        } else if (actionType === 'setup') {
          onNavigateToPage && onNavigateToPage('contracts-ai-extraction');
        }
      },
    },
  ];

  const tableContainerStyles: React.CSSProperties = {
    marginTop: '40px',
    width: '100%',
    maxWidth: '100%',
  };

  return (
    <div style={tableContainerStyles}>
      {/* Custom Table Header */}
      <ContractsTableHeader
        title="Transactions"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        currentPage={currentPage}
        totalPages={3}
        totalItems={30}
        itemsPerPage={10}
        onPageChange={setCurrentPage}
      />

      {/* Table without default header */}
      <div style={{
        width: '100%',
        overflowX: 'auto',
        overflowY: 'visible',
      }}>
        <Table
          columns={tableColumns}
          data={sampleData}
          showHeader={false}
          showSearch={false}
          showTabs={false}
          showPagination={false}
          showFooterPagination={false}
        />
      </div>
    </div>
  );
};

// Main page component
interface TransactionManagementProps {
  onNavigateToPage?: (page: string) => void;
}

export const ContractsTransactions: React.FC<TransactionManagementProps> = ({ onNavigateToPage }) => {
  const colors = useSemanticColors();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBrandNewModalOpen, setIsBrandNewModalOpen] = useState(false);
  const newTransactionButtonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Layout
      breadcrumbs={[
        { label: 'TRANSACTION MANAGEMENT', isActive: true }
      ]}
      selectedSidebarItem="contracts"
      selectedSidebarSubitem="transactions"
      onNavigate={createPageNavigationHandler(onNavigateToPage || (() => {}), 'contracts-transactions')}
      onInboxClick={() => {
      }}
      onManageAccountClick={undefined}
      onSettingsClick={undefined}
    >
      {/* Header Section */}
      <PageBanner
        title="Transaction Management"
        subtitle="Manage your reinsurance transactions and workflow progress"
        illustrationSrc="/Contracts_illustration.png"
        patternSrc="/pattern_contracts.svg"
        buttonText="New Extraction"
        buttonIcon={<span style={{ color: colors.theme.primary700 }}>+</span>}
        onButtonClick={() => onNavigateToPage && onNavigateToPage('contracts-ai-extraction')}
        illustrationAlt="transaction management"
      />

      {/* Table Section */}
      <TransactionTable onNavigateToPage={onNavigateToPage} />

      {/* New Transaction Modal */}
      <NewTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonRef={newTransactionButtonRef}
        onContinue={(transactionType) => {
          if (transactionType === 'brand-new') {
            setIsModalOpen(false);
            setIsBrandNewModalOpen(true);
          } else if (transactionType === 'renewal') {
            setIsModalOpen(false);
            onNavigateToPage && onNavigateToPage('contracts-renewal-transaction');
          }
        }}
      />

      {/* Brand New Transaction Modal */}
      <BrandNewTransactionModal
        isOpen={isBrandNewModalOpen}
        onClose={() => setIsBrandNewModalOpen(false)}
        buttonRef={newTransactionButtonRef}
        onBack={() => {
          setIsBrandNewModalOpen(false);
          setIsModalOpen(true);
        }}
        onContinue={(inputMethod) => {
          if (inputMethod === 'enter-manually') {
            onNavigateToPage && onNavigateToPage('contracts-ai-extraction');
          } else if (inputMethod === 'upload-pdf') {
            onNavigateToPage && onNavigateToPage('contracts-ai-extraction');
          }
        }}
      />
    </Layout>
  );
};

export default ContractsTransactions;
