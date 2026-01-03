import React, { useState } from 'react';
// Import page components
import { Layout, PageBanner } from '@design-library/pages';

// Import base components  
import { Button, Table } from '@design-library/components';

// Import design tokens
import { typography, borderRadius, useSemanticColors } from '@design-library/tokens';
import { createPageNavigationHandler } from '@design-library/utils/navigation';

// Import prototype settings
import { useSettings } from '@design-library/contexts';

// Import table icons
import { DocumentTable, TextTable, CalendarTable, StatusTable, AmmountTable } from '@design-library/icons';

// Import modal
import { NewTransactionModal } from '../NewTransactionModal';
import { BrandNewTransactionModal } from '../BrandNewTransactionModal';
import { UploadContractModal } from '../UploadContractModal';
import { ContractProcessingModal } from '../ContractProcessingModal';

// Import stable transaction hooks (no loading delays to prevent blinking)
import { useTransactions, useTransactionStats, Transaction } from '../hooks/useTransactionsStable';


// Transaction icon component
const TransactionIcon: React.FC = () => {
  const colors = useSemanticColors();
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="3" width="16" height="12" rx="2" stroke={colors.blackAndWhite.black700} strokeWidth="1.5" fill="none"/>
      <line x1="2" y1="7" x2="18" y2="7" stroke={colors.blackAndWhite.black700} strokeWidth="1.5"/>
      <line x1="5" y1="10" x2="8" y2="10" stroke={colors.blackAndWhite.black700} strokeWidth="1.5"/>
    </svg>
  );
};

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
  const { stats, loading, error } = useTransactionStats();
  
  const statsContainerStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '40px',
    width: '100%',
  };

  // Show loading state
  if (loading) {
    return (
      <div style={statsContainerStyles}>
        <MetricCard
          title="Transactions"
          value="Loading..."
        />
        <MetricCard
          title="Total Premium"
          value="Loading..."
        />
      </div>
    );
  }

  // Show error state
  if (error || !stats) {
    return (
      <div style={statsContainerStyles}>
        <MetricCard
          title="Transactions"
          value="Error loading data"
        />
        <MetricCard
          title="Total Premium"
          value="Error loading data"
        />
      </div>
    );
  }

  // Custom content for transactions card using real data
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
      
      {/* Line 2: "(icon) X transactions (icon) of which Y are active" - wraps to 3 lines on small screens */}
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
          }}>{stats.total_transactions}</span>
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
          }}>{stats.active_transactions}</span>
          <span style={{ 
            ...typography.styles.subheadingM,
            color: colors.blackAndWhite.black900,
            margin: 0
          }}>are active</span>
        </div>
      </div>
    </div>
  );

  // Format premium value
  const formatPremium = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate month-over-month change (mock calculation)
  const monthlyChange = Math.floor(Math.random() * 10000) + 1000; // Mock value

  return (
    <div style={statsContainerStyles}>
      <MetricCard
        title="Transactions"
        value="" // Not used since we have custom content
        customContent={transactionContent}
      />
      
      <MetricCard
        title="Total Premium"
        value={formatPremium(stats.total_premium)}
        subtitle={
          <span>
            <span style={{ color: colors.success.textAndStrokes }}>+{formatPremium(monthlyChange)}</span>
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
  
  // Fetch real transaction data
  const { transactions, loading, error, pagination } = useTransactions({
    limit: 25,
    transaction_status: activeTab === 'All Transactions' ? undefined : [activeTab.toLowerCase()]
  });

  // Transform transaction data for table display
  const transformTransactionData = (transactions: Transaction[]) => {
    return transactions.map(tx => ({
      transactionName: tx.transaction_name,
      cedingCompany: tx.ceding_company_name || 'Unknown',
      reinsurerName: tx.reinsurer_company_name || 'Unknown',
      effectiveDate: tx.effective_date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      expiryDate: tx.expiry_date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      premium: tx.premium ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(tx.premium) : 'N/A',
      status: tx.transaction_status.charAt(0).toUpperCase() + tx.transaction_status.slice(1),
      actions: tx.transaction_status === 'active' ? 'upload' : tx.transaction_status === 'pending' ? 'validate' : tx.transaction_status === 'cancelled' ? 'generate' : 'setup',
    }));
  };

  // Always provide data - use transformed transactions or fallback to sample data
  const tableData = React.useMemo(() => {
    if (error) return []; // Show empty on error
    if (loading) return []; // Show empty while loading
    if (transactions.length > 0) return transformTransactionData(transactions);
    return []; // Default to empty if no data
  }, [transactions, loading, error]);

  // Keep the old sample data as fallback (commented out to see the difference)
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

  // Store reference to current table data for use in callbacks
  const tableDataRef = React.useRef<any[]>([]);

  // Column definitions with automatic width optimization using real data
  const dataForColumns = tableData.length > 0 ? tableData : sampleData.slice(0, 5); // Use sample for sizing if no real data yet

  const tableColumns = [
    {
      key: 'transactionName',
      title: 'Transaction Name',
      icon: <DocumentTable color={colors.theme.primary450} />,
      sortable: true,
      width: getOptimizedColumnWidth(dataForColumns, 'transactionName'),
      cellType: 'document' as const,
      align: 'left', // First column left-aligned
      headerAlign: 'left',
      hoverIcon: 'config' as const,
      onDownload: (transactionName: string) => {
        // Find the row data for this transaction
        const rowData = tableDataRef.current.find(row => row.transactionName === transactionName);
        if (rowData && onNavigateToPage) {
          // Navigate to form with pre-filled data
          onNavigateToPage('reports-new-transaction-form', {
            transactionName: rowData.transactionName,
            cedingReinsurer: rowData.cedingCompany,
            reinsurerName: rowData.reinsurerName,
          });
        }
      },
    },
    {
      key: 'cedingCompany',
      title: 'Ceding Company',
      icon: <TextTable color={colors.theme.primary450} />,
      sortable: true,
      width: getOptimizedColumnWidth(dataForColumns, 'cedingCompany'),
      align: 'left', // Left-aligned cells
      headerAlign: 'left', // Left-aligned headers
    },
    {
      key: 'reinsurerName',
      title: 'Reinsurer Name',
      icon: <TextTable color={colors.theme.primary450} />,
      sortable: true,
      width: getOptimizedColumnWidth(dataForColumns, 'reinsurerName'),
      align: 'left', // Left-aligned cells
      headerAlign: 'left', // Left-aligned headers
    },
    {
      key: 'effectiveDate',
      title: 'Effective Date',
      icon: <CalendarTable color={colors.theme.primary450} />,
      sortable: true,
      width: getOptimizedColumnWidth(dataForColumns, 'effectiveDate'),
      align: 'left', // Left-aligned cells
      headerAlign: 'left', // Left-aligned headers
    },
    {
      key: 'expiryDate',
      title: 'Expiry Date',
      icon: <CalendarTable color={colors.theme.primary450} />,
      sortable: true,
      width: getOptimizedColumnWidth(dataForColumns, 'expiryDate'),
      align: 'left', // Left-aligned cells
      headerAlign: 'left', // Left-aligned headers
    },
    {
      key: 'premium',
      title: 'Premium',
      icon: <AmmountTable color={colors.theme.primary450} />,
      sortable: true,
      width: getOptimizedColumnWidth(dataForColumns, 'premium'),
      align: 'left', // Left-aligned cells
      headerAlign: 'left', // Left-aligned headers
    },
    {
      key: 'status',
      title: 'Status',
      icon: <StatusTable color={colors.theme.primary450} />,
      sortable: false,
      width: getOptimizedColumnWidth(dataForColumns, 'status'),
      align: 'left', // Left-aligned cells
      headerAlign: 'left', // Left-aligned headers
    },
    {
      key: 'actions',
      title: 'Actions',
      icon: <StatusTable color={colors.theme.primary450} />,
      sortable: false,
      width: getOptimizedColumnWidth(dataForColumns, 'actions'),
      align: 'center' as const, // Keep actions centered
      headerAlign: 'right', // Right-aligned header
      cellType: 'action' as const,
      actionType: 'upload' as const,
      onAction: (actionType: string, text: string, rowData?: any) => {
        console.log('onAction called:', { actionType, text, rowData });

        if (actionType === 'upload' && rowData) {
          console.log('Upload clicked for row:', rowData);

          if (onNavigateToPage) {
            console.log('Navigating to BDX Upload with data:', {
              transactionName: rowData.transactionName,
              cedingCompany: rowData.cedingCompany,
              reinsurerName: rowData.reinsurerName,
            });

            // Pass transaction data to BDX Upload page
            onNavigateToPage('reports-bdx-upload', {
              transactionName: rowData.transactionName,
              cedingCompany: rowData.cedingCompany,
              reinsurerName: rowData.reinsurerName,
            });
          } else {
            console.warn('Missing onNavigateToPage');
          }
        } else if (actionType === 'setup') {
          onNavigateToPage && onNavigateToPage('reports-new-transaction-form');
        } else {
          console.log('Other action type:', actionType);
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

  // Determine what data to show
  const displayData = tableData.length > 0 ? tableData : sampleData;
  const isUsingRealData = tableData.length > 0;

  // Update ref when displayData changes
  React.useEffect(() => {
    tableDataRef.current = displayData;
  }, [displayData]);

  return (
    <div style={{
      ...tableContainerStyles,
      minWidth: 0, // Allow container to shrink
      display: 'block', // Ensure block display
    }}>
      <Table
        columns={tableColumns}
        data={displayData}
        showHeader={true}
        title="Transactions"
        showFooterPagination={true}
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        totalItems={pagination.total}
        itemsPerPage={pagination.limit}
        onPageChange={(page) => {
          // TODO: Implement pagination
          console.log('Page change requested:', page);
        }}
        onRowClick={(row) => {
          // Find the full transaction data from the transactions array
          const fullTransaction = transactions.find(tx => tx.transaction_name === row.transactionName);

          // Extract complete transaction data from the row and full transaction
          const transactionId = String(fullTransaction?.id || row.id || `trans-${Date.now()}`);
          const transactionName = String(row.transactionName || row.transaction_name || 'Unknown Transaction');
          const cedingCompany = String(row.cedingCompany || 'N/A');
          const reinsurerName = String(row.reinsurerName || 'N/A');
          const premium = String(row.premium || 'N/A');
          const lineOfBusiness = String(row.lineOfBusiness || fullTransaction?.subject_business || 'General Liability');

          // Load existing open transactions from sessionStorage
          let openTransactions: Array<{ id: string; name: string }> = [];
          if (typeof window !== 'undefined') {
            const stored = sessionStorage.getItem('openTransactions');
            if (stored) {
              try {
                openTransactions = JSON.parse(stored);
              } catch (e) {
                console.error('Error parsing openTransactions:', e);
              }
            }
          }

          // Check if transaction is already open
          const isAlreadyOpen = openTransactions.some(t => t.id === transactionId);

          // If not already open, add it to the list
          if (!isAlreadyOpen) {
            openTransactions.push({ id: transactionId, name: transactionName });
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('openTransactions', JSON.stringify(openTransactions));
            }
          }

          // Set as selected transaction with complete data including program-specific fields
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('selectedTransactionId', transactionId);
            sessionStorage.setItem('currentTransaction', JSON.stringify({
              id: transactionId,
              name: transactionName,
              cedingCompany,
              reinsurerName,
              premium,
              lineOfBusiness,
              // Include program-specific data from the database
              program_id: fullTransaction?.program_id,
              quota_share: fullTransaction?.quota_share,
              gross_written_premium: fullTransaction?.gross_written_premium,
              reported_loss_ratio: fullTransaction?.reported_loss_ratio,
              ultimate_loss_ratio: fullTransaction?.ultimate_loss_ratio,
            }));

            // Dispatch custom event to notify other components
            window.dispatchEvent(new Event('sessionStorageChange'));
          }

          // Navigate to transaction dashboard
          if (onNavigateToPage) {
            onNavigateToPage('transaction-dashboard');
          }
        }}
      />
      
      {/* Show error message if there's an error */}
      {error && (
        <div style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: colors.error.surface,
          border: `1px solid ${colors.error.main}`,
          borderRadius: borderRadius[8],
          ...typography.styles.captionM,
          color: colors.error.main,
        }}>
          ⚠ Error loading data: {error.message}. Showing fallback data.
        </div>
      )}

    </div>
  );
};

// Main page component
interface TransactionManagementProps {
  onNavigateToPage?: (page: string, data?: any) => void;
}

export const AllTransactions: React.FC<TransactionManagementProps> = ({ onNavigateToPage }) => {
  
  // Function to detect if user accessed this page directly from sidebar navigation
  const isDirectAccess = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    // Check sessionStorage for navigation source
    const navigationSource = sessionStorage.getItem('navigationSource');
    
    // If no navigation source is set, assume direct access
    // If source is 'sidebar', it's direct access
    // If source is 'page', it's navigation from another page
    return !navigationSource || navigationSource === 'sidebar' || navigationSource === 'direct';
  };
  const colors = useSemanticColors();
  const settings = useSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBrandNewModalOpen, setIsBrandNewModalOpen] = useState(false);
  
  // Clear navigation source after checking it to prepare for next navigation
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Clear the navigation source after a short delay to allow detection
      const timer = setTimeout(() => {
        sessionStorage.removeItem('navigationSource');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [uploadData, setUploadData] = useState<{ transactionName: string; fileName: string; description: string }>({
    transactionName: '',
    fileName: '',
    description: ''
  });
  const newTransactionButtonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Layout
      pageType="reports-transaction-management"
      pageTitle="All Transactions"
      selectedSidebarItem="all-transactions"
      onNavigate={(itemId, subitemId, pageType) => {
        console.log('AllTransactions onNavigate:', itemId, subitemId, pageType);
        if (pageType) {
          onNavigateToPage && onNavigateToPage(pageType);
        } else if (itemId === 'all-transactions') {
          onNavigateToPage && onNavigateToPage('all-transactions');
        } else if (itemId === 'transaction-dashboard') {
          onNavigateToPage && onNavigateToPage('transaction-dashboard');
        } else if (itemId === 'home') {
          onNavigateToPage && onNavigateToPage('home');
        } else {
          // Fallback to createPageNavigationHandler for other navigation
          createPageNavigationHandler(onNavigateToPage || (() => {}), 'reports-transaction-management')(itemId, subitemId, pageType);
        }
      }}
      onInboxClick={() => {
      }}
      onAskQuillClick={() => {
        console.log('Ask Quill clicked');
      }}
      onManageAccountClick={undefined}
      onSettingsClick={undefined}
      isSubPage={!isDirectAccess()}
      onBackClick={() => {
        // Navigate back to reports explorer only if not directly accessed
        if (onNavigateToPage && !isDirectAccess()) {
          onNavigateToPage('reports-explorer');
        }
      }}
      onNewTransactionClick={() => setIsModalOpen(true)}
    >
      {/* Header Section */}
      <PageBanner
        title="Transaction Management"
        subtitle="Manage your reinsurance transactions and workflow progress"
        illustrationSrc="/transaction header icon.png"
        patternSrc="/pattern_reports.svg"
        buttonText="New Transaction"
        buttonIcon={<span style={{ color: colors.theme.primary700 }}>+</span>}
        onButtonClick={() => setIsModalOpen(true)}
        illustrationAlt="transaction management"
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
            onNavigateToPage && onNavigateToPage('reports-renewal-transaction');
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
            setIsBrandNewModalOpen(false);
            onNavigateToPage && onNavigateToPage('reports-new-transaction-form');
          } else if (inputMethod === 'upload-pdf') {
            setIsBrandNewModalOpen(false);
            setIsUploadModalOpen(true);
          }
        }}
      />

      {/* Upload Contract Modal */}
      <UploadContractModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        buttonRef={newTransactionButtonRef}
        onBack={() => {
          setIsUploadModalOpen(false);
          setIsBrandNewModalOpen(true);
        }}
        onContinue={(data) => {
          console.log('Upload data:', data);
          setUploadData({
            transactionName: data.transactionName,
            fileName: data.file?.name || '',
            description: data.description
          });
          setIsUploadModalOpen(false);
          setIsProcessingModalOpen(true);
        }}
      />

      {/* Contract Processing Modal */}
      <ContractProcessingModal
        isOpen={isProcessingModalOpen}
        fileName={uploadData.fileName}
        transactionName={uploadData.transactionName}
        description={uploadData.description}
        buttonRef={newTransactionButtonRef}
        onContinue={() => {
          setIsProcessingModalOpen(false);
          // Pass flag to indicate coming from PDF upload flow
          onNavigateToPage && onNavigateToPage('reports-new-transaction-form', {
            fromPDFUpload: true,
            uploadData: uploadData
          });
        }}
      />
    </Layout>
  );
};

export default AllTransactions;