import React, { useState } from 'react';
import { Layout, PageHeader } from '@design-library/pages';
import { Table, DownloadButton, typography, useSemanticColors, borderRadius, colors } from '@design-library/components';
import { TextTable, AmmountTable, DocumentTable } from '@design-library/icons';
import { createPageNavigationHandler, type NavigationHandler } from '@design-library/utils/navigation';
import type { TableColumn } from '@design-library/components';

interface ReportsCellLevelSummaryProps {
  onNavigateToPage?: NavigationHandler;
}

export const ReportsCellLevelSummary: React.FC<ReportsCellLevelSummaryProps> = ({
  onNavigateToPage
}) => {
  const semanticColors = useSemanticColors();
  const [currentPage, setCurrentPage] = useState(1);

  // Create navigation handler
  const navigationHandler = onNavigateToPage
    ? createPageNavigationHandler(onNavigateToPage, 'reports-cell-level-summary')
    : undefined;

  // Determine configuration type - use same logic as detail mapping
  const transactionName = typeof window !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('currentTransaction') || '{}')?.name || 'Commercial Auto Specialty Lines Q1'
    : 'Commercial Auto Specialty Lines Q1';
  const isDetailMapping = transactionName.toLowerCase().includes('commercial auto');
  const configurationType = isDetailMapping ? 'detail' : 'aggregated';

  // Create tags for FormTopNav
  const formTags = [
    <div key="config-tag" style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '3px',
      padding: '0 5px',
      backgroundColor: configurationType === 'detail'
        ? colors.analytics.green600
        : colors.reports.dynamic.blue200,
      borderRadius: borderRadius[4],
      height: '20px',
      fontFamily: typography.styles.bodyS.fontFamily.join(', '),
      fontSize: typography.styles.bodyS.fontSize,
      fontWeight: typography.styles.bodyS.fontWeight,
      lineHeight: typography.styles.bodyS.lineHeight,
      letterSpacing: typography.letterSpacing.wide,
      color: colors.blackAndWhite.black700,
      whiteSpace: 'nowrap' as const,
    }}>
      {configurationType === 'detail' ? 'Detail' : 'Aggregated'}
    </div>
  ];

  // Stepper configuration
  const stepper = [
    {
      label: 'Upload file',
      status: 'completed' as const,
      onClick: () => onNavigateToPage?.('reports-bdx-detail-mapping')
    },
    {
      label: 'Cession statement',
      status: 'completed' as const,
      onClick: () => onNavigateToPage?.('reports-cession-statement')
    },
    {
      label: 'Cash settlement',
      status: 'completed' as const,
      onClick: () => onNavigateToPage?.('reports-cash-settlement-detail')
    },
    {
      label: 'Summary',
      status: 'active' as const,
      onClick: () => {} // Current page, no action needed
    },
  ];

  // Handle back click - return to transaction dashboard
  const handleBackClick = () => {
    if (onNavigateToPage) {
      // Set the active tab to bdx-upload in sessionStorage
      if (typeof window !== 'undefined') {
        const storedTransaction = sessionStorage.getItem('currentTransaction');
        if (storedTransaction) {
          try {
            const transaction = JSON.parse(storedTransaction);
            const savedTabs = sessionStorage.getItem('transactionTabs');
            let tabsMap: { [key: string]: string } = {};

            if (savedTabs) {
              try {
                tabsMap = JSON.parse(savedTabs);
              } catch (e) {
                console.error('Error parsing transaction tabs:', e);
              }
            }

            tabsMap[transaction.id] = 'bdx-upload';
            sessionStorage.setItem('transactionTabs', JSON.stringify(tabsMap));
          } catch (e) {
            console.error('Error setting active tab:', e);
          }
        }
      }

      // Navigate back to transaction dashboard
      onNavigateToPage('transaction-dashboard');
    }
  };

  // Metrics data - Left column
  const leftMetrics = [
    { label: 'Written Premium', value: '$312,800,000' },
    { label: 'Earned Premium', value: '$298,400,000' },
    { label: 'Ceded Premium', value: '$28,960,000' },
    { label: 'Remitted Premium', value: '$28,960,000' },
  ];

  // Metrics data - Right column
  const rightMetrics = [
    { label: 'Net Cession', value: '$14,420,000' },
    { label: 'Total Collateral Required', value: '$21,750,000' },
    { label: 'Avg Gross Loss Ratio', value: '61.4%' },
    { label: 'Number of Binders', value: '9' },
  ];

  // Table columns configuration
  const columns: TableColumn[] = [
    {
      key: 'transactionName',
      title: 'Transaction Name',
      icon: <DocumentTable color={semanticColors.theme.primary450} />,
      sortable: true,
      width: '300px',
      cellType: 'document',
      hoverIcon: 'open',
      interactive: false, // No background or hover effects
      align: 'left',
      headerAlign: 'left',
    },
    {
      key: 'premiumWritten',
      title: 'Premium Written',
      icon: <AmmountTable color={semanticColors.theme.primary450} />,
      sortable: true,
      width: '150px',
      cellType: 'simple',
      align: 'right',
      headerAlign: 'center',
    },
    {
      key: 'premiumEarned',
      title: 'Premium Earned',
      icon: <AmmountTable color={semanticColors.theme.primary450} />,
      sortable: true,
      width: '150px',
      cellType: 'simple',
      align: 'right',
      headerAlign: 'center',
    },
    {
      key: 'cededPremium',
      title: 'Ceded Premium',
      icon: <AmmountTable color={semanticColors.theme.primary450} />,
      sortable: true,
      width: '150px',
      cellType: 'simple',
      align: 'right',
      headerAlign: 'center',
    },
    {
      key: 'paidLoss',
      title: 'Paid Loss',
      icon: <AmmountTable color={semanticColors.theme.primary450} />,
      sortable: true,
      width: '150px',
      cellType: 'simple',
      align: 'right',
      headerAlign: 'center',
    },
    {
      key: 'incurredLoss',
      title: 'Incurred Loss',
      icon: <AmmountTable color={semanticColors.theme.primary450} />,
      sortable: true,
      width: '150px',
      cellType: 'simple',
      align: 'right',
      headerAlign: 'center',
    },
    {
      key: 'grossLossRatio',
      title: 'Gross Loss Ratio',
      icon: <TextTable color={semanticColors.theme.primary450} />,
      sortable: true,
      width: '150px',
      cellType: 'simple',
      align: 'right',
      headerAlign: 'center',
    },
    {
      key: 'netCession',
      title: 'Net Cession',
      icon: <AmmountTable color={semanticColors.theme.primary450} />,
      sortable: true,
      width: '150px',
      cellType: 'simple',
      align: 'right',
      headerAlign: 'center',
    },
    {
      key: 'collateralRequired',
      title: 'Collateral Required',
      icon: <AmmountTable color={semanticColors.theme.primary450} />,
      sortable: true,
      width: '180px',
      cellType: 'simple',
      align: 'right',
      headerAlign: 'center',
    },
  ];

  // Table data
  const tableData = [
    {
      transactionName: 'Appalachian GL 2022 IFACC',
      premiumWritten: '$14,235,825',
      premiumEarned: '$8,459,732',
      cededPremium: '$14,235,825',
      paidLoss: '$23,456,789',
      incurredLoss: '$23,456,789',
      grossLossRatio: '65.4%',
      netCession: '$12,345,678',
      collateralRequired: '$9,876,543'
    },
    {
      transactionName: 'Cardigan CA 2021 Non-Admitted IFACC',
      premiumWritten: '$12,450,000',
      premiumEarned: '$21,932,150',
      cededPremium: '$12,450,000',
      paidLoss: '$8,123,456',
      incurredLoss: '$8,123,456',
      grossLossRatio: '58.2%',
      netCession: '$10,234,567',
      collateralRequired: '$8,765,432'
    },
    {
      transactionName: 'Cardigan CA 2022 Non-Admitted IFACC',
      premiumWritten: '$9,875,300',
      premiumEarned: '$3,678,905',
      cededPremium: '$9,875,300',
      paidLoss: '$19,876,543',
      incurredLoss: '$19,876,543',
      grossLossRatio: '72.1%',
      netCession: '$8,765,432',
      collateralRequired: '$7,654,321'
    },
    {
      transactionName: 'Cornerstone GL 2021 IFACC',
      premiumWritten: '$20,100,500',
      premiumEarned: '$15,004,567',
      cededPremium: '$20,100,500',
      paidLoss: '$11,345,678',
      incurredLoss: '$11,345,678',
      grossLossRatio: '61.8%',
      netCession: '$15,432,123',
      collateralRequired: '$12,345,678'
    },
    {
      transactionName: 'Cornerstone GL 2022 IFACC',
      premiumWritten: '$7,300,000',
      premiumEarned: '$19,500,143',
      cededPremium: '$7,300,000',
      paidLoss: '$5,432,109',
      incurredLoss: '$5,432,109',
      grossLossRatio: '54.3%',
      netCession: '$6,543,210',
      collateralRequired: '$5,432,109'
    },
    {
      transactionName: 'First Light CA 2022 IFACC',
      premiumWritten: '$15,800,750',
      premiumEarned: '$7,250,999',
      cededPremium: '$15,800,750',
      paidLoss: '$17,890,234',
      incurredLoss: '$17,890,234',
      grossLossRatio: '68.9%',
      netCession: '$13,234,567',
      collateralRequired: '$11,123,456'
    },
    {
      transactionName: 'RMS GL 2021 IFACC',
      premiumWritten: '$5,440,000',
      premiumEarned: '$26,478,300',
      cededPremium: '$5,440,000',
      paidLoss: '$12,345,678',
      incurredLoss: '$12,345,678',
      grossLossRatio: '63.7%',
      netCession: '$4,876,543',
      collateralRequired: '$4,123,456'
    },
    {
      transactionName: 'RMS GL 2022 IFACC',
      premiumWritten: '$25,000,000',
      premiumEarned: '$5,234,888',
      cededPremium: '$25,000,000',
      paidLoss: '$22,111,222',
      incurredLoss: '$22,111,222',
      grossLossRatio: '76.5%',
      netCession: '$18,765,432',
      collateralRequired: '$16,543,210'
    },
    {
      transactionName: 'Southern Star CA 2022 IFACC',
      premiumWritten: '$3,250,000',
      premiumEarned: '$12,879,560',
      cededPremium: '$3,250,000',
      paidLoss: '$9,876,543',
      incurredLoss: '$9,876,543',
      grossLossRatio: '59.6%',
      netCession: '$2,987,654',
      collateralRequired: '$2,456,789'
    },
    {
      transactionName: 'XPT CA 2023 IFACC',
      premiumWritten: '$18,900,600',
      premiumEarned: '$30,001,200',
      cededPremium: '$18,900,600',
      paidLoss: '$15,678,910',
      incurredLoss: '$15,678,910',
      grossLossRatio: '66.2%',
      netCession: '$14,567,890',
      collateralRequired: '$12,345,678'
    },
  ];

  return (
    <Layout
      formMode={true}
      formTitle="BDX UPLOAD"
      formTags={formTags}
      showSidebarToggle={false}
      backButtonText="Close"
      pageType="reports-cell-level-summary"
      selectedSidebarItem="reports"
      selectedSidebarSubitem="bdx-upload"
      onNavigate={navigationHandler}
      onBackClick={handleBackClick}
      stepper={stepper}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px'
      }}>
        {/* Page Header */}
        <PageHeader
          title={[
            { text: 'You\'re now viewing the Cash Settlement for ', important: false },
            { text: 'Cucumber GL Seasonal', important: true },
            { text: ' as of ', important: false },
            { text: 'May 31st, 2025', important: true }
          ]}
          actions={[
            <DownloadButton
              key="download"
              options={[
                {
                  label: 'Download as PDF',
                  onClick: () => window.open('/PDF.pdf', '_blank'),
                },
                {
                  label: 'Download as Excel',
                  onClick: () => window.open('https://docs.google.com/spreadsheets/d/1bviXCfE9z115ZbpHiBUdH9BPlVXj5648i_v9cYorydE/edit?gid=879068275#gid=879068275', '_blank'),
                },
              ]}
            />
          ]}
        />

        {/* Trust Account Balance Box */}
        <div style={{
          backgroundColor: semanticColors.blackAndWhite.white,
          border: `1px solid ${semanticColors.theme.primary400}`,
          borderRadius: borderRadius[12],
          padding: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <p style={{
            ...typography.styles.bodyM,
            color: semanticColors.blackAndWhite.black900,
            margin: 0
          }}>
            Trust Account Balance
          </p>
          <p style={{
            ...typography.styles.dataXXL,
            color: semanticColors.blackAndWhite.black900,
            margin: 0,
            whiteSpace: 'nowrap'
          }}>
            $18,450,000
          </p>
        </div>

        {/* Metrics Grid - 2 Columns (No Box) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1px 1fr',
          gap: '0 30px',
          padding: '0 30px',
          marginBottom: '30px'
        }}>
          {/* Left Column */}
          <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            {leftMetrics.map((metric, index) => (
              <React.Fragment key={index}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '30px'
                }}>
                  <p style={{
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black900,
                    margin: 0
                  }}>
                    {metric.label}
                  </p>
                  <p style={{
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black900,
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}>
                    {metric.value}
                  </p>
                </div>
                {index < leftMetrics.length - 1 && (
                  <div style={{
                    height: '1px',
                    borderBottom: `1px dotted ${semanticColors.theme.primary400}`
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Vertical Divider Line */}
          <div style={{
            width: '1px',
            backgroundColor: semanticColors.theme.primary400,
            gridColumn: '2'
          }} />

          {/* Right Column */}
          <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            {rightMetrics.map((metric, index) => (
              <React.Fragment key={index}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '30px'
                }}>
                  <p style={{
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black900,
                    margin: 0
                  }}>
                    {metric.label}
                  </p>
                  <p style={{
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black900,
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}>
                    {metric.value}
                  </p>
                </div>
                {index < rightMetrics.length - 1 && (
                  <div style={{
                    height: '1px',
                    borderBottom: `1px dotted ${semanticColors.theme.primary400}`
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          data={tableData}
          title="Transactions"
          showHeader={true}
          showSearch={false}
          currentPage={currentPage}
          totalPages={1}
          totalItems={tableData.length}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
          paginationItemLabel="transactions"
        />
      </div>
    </Layout>
  );
};

export default ReportsCellLevelSummary;
