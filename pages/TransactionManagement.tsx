import React, { useEffect, useState } from 'react';
// Import page components
import { Layout } from '@design-library/pages';
import type { BreadcrumbItem } from '@design-library/pages';

// Import base components  
import { Card, Button, Stack, Grid, Container, Table } from '@design-library/components';

// Import design tokens
import { colors, typography, spacing, borderRadius, shadows } from '@design-library/tokens';

// Import table icons
import { DocumentTable, TextTable, CalendarTable, StatusTable, AmmountTable } from '@design-library/icons';

// Import modal
import { NewTransactionModal } from './NewTransactionModal';
import { BrandNewTransactionModal } from './BrandNewTransactionModal';

// Custom document icon component
const DocumentIcon: React.FC = () => (
  <svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="52" rx="6" fill={colors.blackAndWhite.white}/>
    <rect x="2" y="2" width="36" height="48" rx="4" fill={colors.blackAndWhite.white} stroke={colors.blackAndWhite.black300} strokeWidth="1"/>
    {/* Document lines */}
    <line x1="8" y1="12" x2="32" y2="12" stroke={colors.blackAndWhite.black400} strokeWidth="1"/>
    <line x1="8" y1="16" x2="32" y2="16" stroke={colors.blackAndWhite.black400} strokeWidth="1"/>
    <line x1="8" y1="20" x2="28" y2="20" stroke={colors.blackAndWhite.black400} strokeWidth="1"/>
    <line x1="8" y1="24" x2="30" y2="24" stroke={colors.blackAndWhite.black400} strokeWidth="1"/>
    <line x1="8" y1="28" x2="32" y2="28" stroke={colors.blackAndWhite.black400} strokeWidth="1"/>
    <line x1="8" y1="32" x2="26" y2="32" stroke={colors.blackAndWhite.black400} strokeWidth="1"/>
    <line x1="8" y1="36" x2="30" y2="36" stroke={colors.blackAndWhite.black400} strokeWidth="1"/>
    <line x1="8" y1="40" x2="32" y2="40" stroke={colors.blackAndWhite.black400} strokeWidth="1"/>
  </svg>
);

// Header component for the Transaction Management page
interface TransactionHeaderProps {
  onNewTransactionClick: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({ onNewTransactionClick, buttonRef }) => {
  const headerStyles: React.CSSProperties = {
    backgroundColor: colors.reports.blue700, // Reports blue 700
    padding: '40px 60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: borderRadius[12],
    minHeight: '200px', // Changed from fixed height to minHeight
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
    backgroundImage: `url('data:image/svg+xml;base64,${btoa(`<svg width="601" height="204" viewBox="0 0 601 204" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect opacity="0.8" width="119.615" height="3" transform="matrix(-1 0 0 1 480.088 83.3247)" fill="#C1F2FF"/>
<rect opacity="0.8" width="119.615" height="2" transform="matrix(-1 0 0 1 480.088 35.1255)" fill="#C1F2FF"/>
<rect width="119.594" height="3" transform="matrix(-1 0 0 1 240.055 23.4868)" fill="#C1F2FF"/>
<rect width="119.594" height="2" transform="matrix(-1 0 0 1 120.461 7.74268)" fill="#C1F2FF"/>
<rect width="120.599" height="4" transform="matrix(-1 0 0 1 600.83 200)" fill="#C1F2FF"/>
<rect width="120.769" height="4" transform="matrix(-1 0 0 1 600.854 164.358)" fill="#C1F2FF"/>
<rect width="120.769" height="4" transform="matrix(-1 0 0 1 600.854 153)" fill="#C1F2FF"/>
<rect width="120.769" height="4" transform="matrix(-1 0 0 1 600.854 142)" fill="#C1F2FF"/>
<rect width="120.769" height="4" transform="matrix(-1 0 0 1 600.854 131)" fill="#C1F2FF"/>
<rect width="120.769" height="4" transform="matrix(-1 0 0 1 600.854 117)" fill="#C1F2FF"/>
<rect opacity="0.8" width="120.769" height="4" transform="matrix(-1 0 0 1 600.854 102.817)" fill="#C1F2FF"/>
<rect opacity="0.8" width="120.769" height="3" transform="matrix(-1 0 0 1 600.854 79.147)" fill="#C1F2FF"/>
<rect opacity="0.8" width="120.769" height="2" transform="matrix(-1 0 0 1 600.854 55.479)" fill="#C1F2FF"/>
<rect opacity="0.8" width="120.769" height="2" transform="matrix(-1 0 0 1 600.854 31.8091)" fill="#C1F2FF"/>
<rect opacity="0.8" width="120.769" height="2" transform="matrix(-1 0 0 1 600.854 0.393066)" fill="#C1F2FF"/>
<rect opacity="0.8" width="120.599" height="2" transform="matrix(1 1.74846e-07 1.74846e-07 -1 239.828 51.1099)" fill="#C1F2FF"/>
<rect opacity="0.8" width="120.769" height="2" transform="matrix(1 1.74846e-07 1.74846e-07 -1 239.805 62.1606)" fill="#C1F2FF"/>
<rect opacity="0.7" width="120.599" height="1" transform="matrix(1 1.74846e-07 1.74846e-07 -1 239.828 38.7407)" fill="#C1F2FF"/>
<rect opacity="0.7" width="120.599" height="1" transform="matrix(1 1.74846e-07 1.74846e-07 -1 239.828 22.1646)" fill="#C1F2FF"/>
<rect opacity="0.7" width="120.599" height="1" transform="matrix(1 1.74846e-07 1.74846e-07 -1 239.828 5.42432)" fill="#C1F2FF"/>
<rect opacity="0.8" width="120.769" height="2" transform="matrix(1 1.74846e-07 1.74846e-07 -1 239.805 84.1958)" fill="#C1F2FF"/>
<rect width="120.769" height="3" transform="matrix(1 1.74846e-07 1.74846e-07 -1 239.805 96.2466)" fill="#C1F2FF"/>
<rect width="120.769" height="3" transform="matrix(1 1.74846e-07 1.74846e-07 -1 239.805 108.727)" fill="#C1F2FF"/>
</svg>`)}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top right',
    backgroundSize: '60%',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '20px',
      padding: '30px 20px',
      textAlign: 'center',
    },
  };

  const leftContentStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      textAlign: 'center',
    },
  };

  const textContentStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginLeft: '40px',
  };

  const titleStyles: React.CSSProperties = {
    ...typography.styles.headlineH2,
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
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'fit-content',
          height: 'fit-content',
          marginLeft: '-20px'
        }}>
          <img 
            src="/transaction header icon.png" 
            alt="transaction management" 
            style={{ 
              width: '100px', 
              height: 'auto',
              display: 'block'
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
        borderRadius: borderRadius[12],
        boxShadow: shadows.base,
        width: '260px', // Container width: 240px button + 20px padding (10px each side)
      }}>
        <Button
          ref={buttonRef}
          variant="primary"
          color="black"
          icon={<span style={{ color: colors.reports.blue700 }}>+</span>}
          onClick={onNewTransactionClick}
          className="custom-button-width"
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

// MetricCard component (adapted from CashSettlement)
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
  const cardStyles: React.CSSProperties = {
    backgroundColor: colors.blackAndWhite.white,
    border: `1px solid ${colors.reports.dynamic.blue400}`,
    borderRadius: borderRadius[12],
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
    backgroundColor: colors.reports.dynamic.blue400,
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
            color: colors.reports.blue800,
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
const TransactionTable: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('All Transactions');

  // Sample data (moved before columns to enable dynamic sizing)
  const sampleData = [
    {
      transactionName: 'maroon_re_policy_contract.pdf',
      cedingCompany: 'Plum Insurers LLC',
      reinsurerName: 'Global Reinsurance Corp',
      effectiveDate: '01/01/2024',
      expiryDate: '12/31/2024',
      premium: '$1,245,000',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'blue_re_policy_agreement.docx',
      cedingCompany: 'Guava Insurers LLC',
      reinsurerName: 'Eagle Re LLC',
      effectiveDate: '02/01/2024',
      expiryDate: '12/31/2024',
      premium: '$890,500',
      status: 'Pending',
      actions: 'validate',
    },
    {
      transactionName: 'violet_re_terms_conditions.pdf',
      cedingCompany: 'Pear Insurers LLC',
      reinsurerName: 'Global Re LLC',
      effectiveDate: '01/10/2024',
      expiryDate: '06/30/2024',
      premium: '$567,200',
      status: 'Cancelled',
      actions: 'generate',
    },
    {
      transactionName: 'gray_re_contract_summary.xlsx',
      cedingCompany: 'Plum Insurers LLC',
      reinsurerName: 'Wolf Re LLC',
      effectiveDate: '03/01/2024',
      expiryDate: '12/31/2024',
      premium: '$2,100,000',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'olive_re_policy_details.pdf',
      cedingCompany: 'Pomo Insurers LLC',
      reinsurerName: 'Fox Re LLC',
      effectiveDate: '04/15/2024',
      expiryDate: '12/31/2024',
      premium: '$430,750',
      status: 'Draft',
      actions: 'setup',
    },
    {
      transactionName: 'green_re_insurance_policy.pdf',
      cedingCompany: 'Lime Insurers LLC',
      reinsurerName: 'Mountain Re LLC',
      effectiveDate: '05/01/2024',
      expiryDate: '12/31/2024',
      premium: '$1,850,000',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'orange_re_contract_terms.xlsx',
      cedingCompany: 'Citrus Insurers LLC',
      reinsurerName: 'Valley Re LLC',
      effectiveDate: '06/15/2024',
      expiryDate: '12/31/2024',
      premium: '$750,300',
      status: 'Pending',
      actions: 'validate',
    },
    {
      transactionName: 'purple_re_policy_agreement.pdf',
      cedingCompany: 'Berry Insurers LLC',
      reinsurerName: 'Summit Re LLC',
      effectiveDate: '07/01/2024',
      expiryDate: '12/31/2024',
      premium: '$1,320,400',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'teal_re_contract_details.docx',
      cedingCompany: 'Ocean Insurers LLC',
      reinsurerName: 'Coastal Re LLC',
      effectiveDate: '08/15/2024',
      expiryDate: '12/31/2024',
      premium: '$995,600',
      status: 'Draft',
      actions: 'setup',
    },
    {
      transactionName: 'coral_re_insurance_terms.pdf',
      cedingCompany: 'Reef Insurers LLC',
      reinsurerName: 'Deep Re LLC',
      effectiveDate: '09/01/2024',
      expiryDate: '12/31/2024',
      premium: '$2,450,000',
      status: 'Active',
      actions: 'upload',
    },
    {
      transactionName: 'amber_re_policy_summary.xlsx',
      cedingCompany: 'Gold Insurers LLC',
      reinsurerName: 'Precious Re LLC',
      effectiveDate: '10/01/2024',
      expiryDate: '12/31/2024',
      premium: '$678,900',
      status: 'Pending',
      actions: 'validate',
    },
    {
      transactionName: 'slate_re_contract_agreement.pdf',
      cedingCompany: 'Stone Insurers LLC',
      reinsurerName: 'Solid Re LLC',
      effectiveDate: '11/15/2024',
      expiryDate: '12/31/2024',
      premium: '$445,200',
      status: 'Cancelled',
      actions: 'generate',
    }
  ];

  // Column definitions with automatic width optimization
  const tableColumns = [
    {
      key: 'transactionName',
      title: 'Transaction Name',
      icon: <DocumentTable color={colors.reports.blue450} />,
      sortable: true,
      width: getOptimizedColumnWidth(sampleData, 'transactionName'),
      cellType: 'document' as const,
      hoverIcon: 'config' as const,
      onDownload: (filename: string) => {
        console.log('Configuring transaction document:', filename);
      },
    },
    {
      key: 'cedingCompany',
      title: 'Ceding Company',
      icon: <TextTable color={colors.reports.blue450} />,
      sortable: true,
      width: getOptimizedColumnWidth(sampleData, 'cedingCompany'),
    },
    {
      key: 'reinsurerName',
      title: 'Reinsurer Name',
      icon: <TextTable color={colors.reports.blue450} />,
      sortable: true,
      width: getOptimizedColumnWidth(sampleData, 'reinsurerName'),
    },
    {
      key: 'effectiveDate',
      title: 'Effective Date',
      icon: <CalendarTable color={colors.reports.blue450} />,
      sortable: true,
      width: getOptimizedColumnWidth(sampleData, 'effectiveDate'),
    },
    {
      key: 'expiryDate',
      title: 'Expiry Date',
      icon: <CalendarTable color={colors.reports.blue450} />,
      sortable: true,
      width: getOptimizedColumnWidth(sampleData, 'expiryDate'),
    },
    {
      key: 'premium',
      title: 'Premium',
      icon: <AmmountTable color={colors.reports.blue450} />,
      sortable: true,
      width: getOptimizedColumnWidth(sampleData, 'premium'),
    },
    {
      key: 'status',
      title: 'Status',
      icon: <StatusTable color={colors.reports.blue450} />,
      sortable: false,
      width: getOptimizedColumnWidth(sampleData, 'status'),
    },
    {
      key: 'actions',
      title: 'Actions',
      icon: <StatusTable color={colors.reports.blue450} />,
      sortable: false,
      width: getOptimizedColumnWidth(sampleData, 'actions'),
      align: 'center' as const,
      cellType: 'action' as const,
      actionType: 'upload' as const,
      onAction: (actionType: string, text: string) => {
        console.log('Action clicked:', actionType, text);
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
        tabs={['All Transactions', 'Active', 'Pending', 'Draft', 'Cancelled']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showPagination={true}
        showFooterPagination={true}
        currentPage={1}
        totalPages={3}
        totalItems={25}
        itemsPerPage={10}
        onPageChange={(page) => console.log('Page changed to:', page)}
        sortState={{ column: null, direction: null }}
        onSort={(column) => console.log('Sort by:', column)}
      />
    </div>
  );
};

// Main page component
interface TransactionManagementProps {
  onNavigateToPage?: (page: string) => void;
}

export const TransactionManagement: React.FC<TransactionManagementProps> = ({ onNavigateToPage }) => {
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
      maxWidth="1200px"
      selectedSidebarItem="reports"
      selectedSidebarSubitem="transactions"
      onNavigate={(itemId, subitemId) => {
        console.log('Navigate to:', itemId, subitemId);
        
        // Handle Reports navigation
        if (itemId === 'reports') {
          if (subitemId === 'transactions') {
            // Already on transaction management page
            console.log('Already on transaction management page');
          } else if (subitemId === 'insights-explorer') {
            onNavigateToPage && onNavigateToPage('report-navigation');
          }
        }
      }}
      onInboxClick={() => {
        console.log('Inbox clicked');
      }}
    >
      {/* Header Section */}
      <TransactionHeader 
        onNewTransactionClick={() => setIsModalOpen(true)} 
        buttonRef={newTransactionButtonRef}
      />
      
      {/* Stats Section */}
      <TransactionStats />
      
      {/* Table Section */}
      <TransactionTable />
      
      {/* New Transaction Modal */}
      <NewTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonRef={newTransactionButtonRef}
        onContinue={(transactionType) => {
          console.log('Selected transaction type:', transactionType);
          if (transactionType === 'brand-new') {
            setIsModalOpen(false);
            setIsBrandNewModalOpen(true);
          } else {
            // Handle renewal transaction
            console.log('Handling renewal transaction');
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
          console.log('Brand new transaction input method:', inputMethod);
          if (inputMethod === 'enter-manually') {
            onNavigateToPage && onNavigateToPage('new-transaction-form');
          } else if (inputMethod === 'upload-pdf') {
            // TODO: Handle PDF upload flow
            console.log('Handling PDF upload flow');
          }
        }}
      />
    </Layout>
  );
};

export default TransactionManagement;