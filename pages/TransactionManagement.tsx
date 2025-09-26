import React, { useEffect, useState } from 'react';
// Import page components
import { Layout } from '@design-library/pages';

// Import base components  
import { Button, Table } from '@design-library/components';

// Import design tokens
import { typography, borderRadius, shadows, useSemanticColors } from '@design-library/tokens';
import { createPageNavigationHandler } from '@design-library/utils/navigation';

// Import prototype settings
import { useSettings } from '@design-library/contexts';

// Import table icons
import { DocumentTable, TextTable, CalendarTable, StatusTable, AmmountTable } from '@design-library/icons';

// Import modal
import { NewTransactionModal } from './NewTransactionModal';
import { BrandNewTransactionModal } from './BrandNewTransactionModal';

/**
 * Props for the Transaction Management page header component
 * @interface TransactionHeaderProps
 */
interface TransactionHeaderProps {
  /** Callback fired when the new transaction button is clicked */
  onNewTransactionClick: () => void;
  /** Optional reference to the new transaction button element */
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({ onNewTransactionClick, buttonRef }) => {
  const colors = useSemanticColors();
  const headerStyles: React.CSSProperties = {
    backgroundColor: colors.theme.primary700, // Reports blue 700
    padding: '0 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: borderRadius[16],
    height: '250px',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
    backgroundImage: `url('/pattern_reports.svg')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top right',
    backgroundSize: '33%',
    boxShadow: shadows.base,
  };

  const leftContentStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
  };

  const illustrationContainerStyles: React.CSSProperties = {
    width: '150px',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textContentStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const titleStyles: React.CSSProperties = {
    ...typography.styles.headlineH2,
    fontSize: '36px',
    color: colors.blackAndWhite.black900, // All text black900
    margin: 0,
  };

  const subtitleStyles: React.CSSProperties = {
    ...typography.styles.bodyL,
    color: colors.blackAndWhite.black900, // All text black900
    margin: 0,
  };

  return (
    <div style={headerStyles}>
      <div style={leftContentStyles}>
        <div style={illustrationContainerStyles}>
          <img 
            src="/transaction header icon.png" 
            alt="transaction management" 
            style={{ 
              width: '100%', 
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>
        <div style={textContentStyles}>
          <h1 style={titleStyles}>Transaction Management</h1>
          <p style={subtitleStyles}>Manage your reinsurance transactions and workflow progress</p>
        </div>
      </div>
      <div style={{
        backgroundColor: colors.blackAndWhite.white,
        padding: '10px',
        borderRadius: borderRadius[16],
        boxShadow: shadows.base,
        width: '260px',
        display: 'flex',
        gap: '0',
      }}>
        <Button
          ref={buttonRef}
          variant="primary"
          color="black"
          icon={<span style={{ color: colors.theme.primary700 }}>+</span>}
          onClick={onNewTransactionClick}
          className="custom-button-width"
          style={{ flex: 'unset' }}
        >
          New Transaction
        </Button>

      </div>
    </div>
  );
};

// Transaction icon component
const TransactionIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="3" width="16" height="12" rx="2" stroke={colors.blackAndWhite.black700} strokeWidth="1.5" fill="none"/>
    <line x1="2" y1="7" x2="18" y2="7" stroke={colors.blackAndWhite.black700} strokeWidth="1.5"/>
    <line x1="5" y1="10" x2="8" y2="10" stroke={colors.blackAndWhite.black700} strokeWidth="1.5"/>
  </svg>
);

/**
 * Props for the MetricCard component displaying transaction statistics
 * @interface MetricCardProps
 */
interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  hasUnderline?: boolean;
  tags?: Array<{
    text: string;
    type: 'percentage' | 'connector' | 'reference' | 'operator';
    color?: string;
  }>;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  customContent?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  hasUnderline,
  tags,
  icon,
  fullWidth = false,
  customContent
}) => {
  const colors = useSemanticColors();
  const cardStyles: React.CSSProperties = {
    backgroundColor: colors.blackAndWhite.white,
    border: `1px solid ${colors.theme.primary400}`,
    borderRadius: borderRadius[16],
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '180px', // Allow card to expand beyond 180px if needed
  };

  const headerStyles: React.CSSProperties = {
    padding: '20px 30px',
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    flexShrink: 0,
    width: '100%',
  };

  const separatorStyles: React.CSSProperties = {
    width: '100%',
    height: '1px',
    backgroundColor: colors.theme.primary400,
    flexShrink: 0,
  };

  const contentStyles: React.CSSProperties = {
    padding: '25px 30px 30px 30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    textAlign: 'center',
  };

  const valueStyles: React.CSSProperties = {
    ...typography.styles.dataXXL,
    letterSpacing: '0.5px',
    color: colors.blackAndWhite.black900,
    margin: 0,
    height: '50px',
    display: 'flex',
    alignItems: 'center',
  };

  const subtitleStyles: React.CSSProperties = {
    ...typography.styles.bodyM,
    lineHeight: 1.3,
    color: colors.blackAndWhite.black700,
    margin: 0,
  };

  return (
    <div style={cardStyles}>
      {/* Header */}
      <div style={headerStyles}>
        <div style={{ width: '14px', height: '18px', flexShrink: 0 }}>{icon}</div>
        <div style={{ 
          ...typography.styles.bodyL,
          color: colors.blackAndWhite.black900,
          flexShrink: 0,
        }}>
          {title}
        </div>
      </div>
      
      {/* Separator */}
      <div style={separatorStyles} />
      
      {/* Content */}
      <div style={contentStyles}>
        {customContent || (
          <>
            <div style={valueStyles}>{value}</div>
            
            {subtitle && (
              <div style={subtitleStyles}>
                {hasUnderline ? (
                  <>
                    Reported as of{' '}
                    <span style={{ 
                      textDecoration: 'underline',
                      textDecorationSkipInk: 'none',
                      textDecorationStyle: 'solid',
                      textUnderlinePosition: 'from-font',
                      color: colors.blackAndWhite.black800 
                    }}>
                      2025-01-31BDX
                    </span>
                  </>
                ) : (
                  subtitle
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Stats section component
const TransactionStats: React.FC = () => {
  const colors = useSemanticColors();
  const statsContainerStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '40px',
    width: '100%',
  };

  // Custom content for transactions card
  const transactionContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
      {/* Line 1: "You currently have" */}
      <div style={{
        ...typography.styles.subheadingM,
        color: colors.blackAndWhite.black900,
        margin: 0,
      }}>
        You currently have
      </div>
      
      {/* Line 2: "(icon) 25 transactions (icon) of which 11 are active" - wraps to 3 lines on small screens */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {/* First group: transactions info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img 
            src="/transactions_icon.png" 
            alt="transactions" 
            style={{}} 
          />
          <span style={{ 
            ...typography.styles.subheadingM,
            color: colors.theme.primary800,
            fontWeight: 600,
            margin: 0
          }}>25</span>
          <span style={{ 
            ...typography.styles.subheadingM,
            color: colors.blackAndWhite.black900,
            margin: 0
          }}>transactions</span>
        </div>
        
        {/* Second group: active info - keeps together when wrapping */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', flexShrink: 0 }}>
          <div style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#C6FFC1',
            borderRadius: borderRadius.absolute,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: colors.success.textAndStrokes,
              borderRadius: borderRadius.absolute,
            }}></div>
          </div>
          <span style={{ 
            ...typography.styles.subheadingM,
            color: colors.blackAndWhite.black500,
            margin: 0
          }}>of which</span>
          <span style={{ 
            ...typography.styles.subheadingM,
            color: colors.success.textAndStrokes,
            fontWeight: 600,
            margin: 0
          }}>11</span>
          <span style={{ 
            ...typography.styles.subheadingM,
            color: colors.blackAndWhite.black900,
            margin: 0
          }}>are active</span>
        </div>
      </div>
    </div>
  );

  return (
    <div style={statsContainerStyles}>
      <MetricCard
        title="Transactions"
        value="" // Not used since we have custom content
        customContent={transactionContent}
      />
      
      <MetricCard
        title="Total Premium"
        value="$272,216,134"
        subtitle={
          <span>
            <span style={{ color: colors.success.textAndStrokes }}>+$3,900</span>
            <span style={{ color: colors.blackAndWhite.black700 }}> since last month</span>
          </span>
        }
      />
    </div>
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
  const [activeTab, setActiveTab] = React.useState('All Transactions');

  // Sample data (moved before columns to enable dynamic sizing)
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
      icon: <DocumentTable color={colors.theme.primary450} />,
      sortable: true,
      width: getOptimizedColumnWidth(sampleData, 'transactionName'),
      cellType: 'document' as const,
      align: 'left', // First column left-aligned
      headerAlign: 'left',
      hoverIcon: 'config' as const,
      onDownload: (filename: string) => {
        // Navigate to new transaction workflow when config is clicked
        onNavigateToPage && onNavigateToPage('new-transaction-form');
      },
    },
    {
      key: 'cedingCompany',
      title: 'Ceding Company',
      icon: <TextTable color={colors.theme.primary450} />,
      sortable: true,
      width: getOptimizedColumnWidth(sampleData, 'cedingCompany'),
      align: 'right', // Right-aligned cells
      headerAlign: 'right', // Right-aligned headers
    },
    {
      key: 'reinsurerName',
      title: 'Reinsurer Name',
      icon: <TextTable color={colors.theme.primary450} />,
      sortable: true,
      width: getOptimizedColumnWidth(sampleData, 'reinsurerName'),
      align: 'right', // Right-aligned cells
      headerAlign: 'right', // Right-aligned headers
    },
    {
      key: 'effectiveDate',
      title: 'Effective Date',
      icon: <CalendarTable color={colors.theme.primary450} />,
      sortable: true,
      width: getOptimizedColumnWidth(sampleData, 'effectiveDate'),
      align: 'right', // Right-aligned cells
      headerAlign: 'right', // Right-aligned headers
    },
    {
      key: 'expiryDate',
      title: 'Expiry Date',
      icon: <CalendarTable color={colors.theme.primary450} />,
      sortable: true,
      width: getOptimizedColumnWidth(sampleData, 'expiryDate'),
      align: 'right', // Right-aligned cells
      headerAlign: 'right', // Right-aligned headers
    },
    {
      key: 'premium',
      title: 'Premium',
      icon: <AmmountTable color={colors.theme.primary450} />,
      sortable: true,
      width: getOptimizedColumnWidth(sampleData, 'premium'),
      align: 'right', // Right-aligned cells
      headerAlign: 'right', // Right-aligned headers
    },
    {
      key: 'status',
      title: 'Status',
      icon: <StatusTable color={colors.theme.primary450} />,
      sortable: false,
      width: getOptimizedColumnWidth(sampleData, 'status'),
      align: 'right', // Right-aligned cells
      headerAlign: 'right', // Right-aligned headers
    },
    {
      key: 'actions',
      title: 'Actions',
      icon: <StatusTable color={colors.theme.primary450} />,
      sortable: false,
      width: getOptimizedColumnWidth(sampleData, 'actions'),
      align: 'center' as const, // Keep actions centered
      headerAlign: 'right', // Right-aligned header
      cellType: 'action' as const,
      actionType: 'upload' as const,
      onAction: (actionType: string, text: string) => {
        if (actionType === 'upload') {
          onNavigateToPage && onNavigateToPage('bdx-upload');
        } else if (actionType === 'setup') {
          onNavigateToPage && onNavigateToPage('new-transaction-form');
        } else {
        }
      },
    },
  ];

  const tableContainerStyles: React.CSSProperties = {
    marginTop: '40px',
    width: '100%',
    maxWidth: '100%', // Ensure container doesn't exceed parent
    overflowX: 'auto',
    overflowY: 'visible',
  };

  return (
    <div style={{
      ...tableContainerStyles,
      minWidth: 0, // Allow container to shrink
      display: 'block', // Ensure block display
    }}>
      <Table
        columns={tableColumns}
        data={sampleData}
        showHeader={true}
        showSearch={true}
        showTabs={true}
        tabs={['All Transactions', 'By Ceding Insurer', 'By Transaction Name', 'By Year']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showPagination={true}
        showFooterPagination={true}
        currentPage={1}
        totalPages={3}
        totalItems={25}
        itemsPerPage={10}
        onPageChange={(page) => {}}
      />
    </div>
  );
};

// Main page component
interface TransactionManagementProps {
  onNavigateToPage?: (page: string) => void;
}

export const TransactionManagement: React.FC<TransactionManagementProps> = ({ onNavigateToPage }) => {
  const colors = useSemanticColors();
  const settings = useSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBrandNewModalOpen, setIsBrandNewModalOpen] = useState(false);
  const newTransactionButtonRef = React.useRef<HTMLButtonElement>(null);

  // Add CSS for button width override
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .custom-button-width {
        width: 240px !important;
        min-width: 240px !important;
        max-width: 240px !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Layout
      breadcrumbs={[
        { label: 'TRANSACTION MANAGEMENT', isActive: true }
      ]}
      selectedSidebarItem="reports"
      selectedSidebarSubitem="transactions"
      onNavigate={createPageNavigationHandler(onNavigateToPage || (() => {}), 'transaction-management')}
      onInboxClick={() => {
      }}
      onManageAccountClick={undefined}
      onSettingsClick={undefined}
    >
      {/* Header Section */}
      <TransactionHeader
        onNewTransactionClick={() => setIsModalOpen(true)}
        buttonRef={newTransactionButtonRef}
      />

      {/* Stats Section */}
      <TransactionStats />

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
            onNavigateToPage && onNavigateToPage('renewal-transaction');
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
            onNavigateToPage && onNavigateToPage('new-transaction-form');
          } else if (inputMethod === 'upload-pdf') {
            // TODO: Handle PDF upload flow
          }
        }}
      />
    </Layout>
  );
};

export default TransactionManagement;