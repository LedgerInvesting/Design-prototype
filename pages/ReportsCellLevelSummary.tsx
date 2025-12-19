import React, { useState, useRef, useEffect } from 'react';
import { Layout, PageHeader } from '@design-library/pages';
import { Button, Table, colors, typography, useSemanticColors, borderRadius, shadows } from '@design-library/components';
import { ChevronDownExtraSmall } from '@design-library/icons';
import { createPageNavigationHandler, type NavigationHandler } from '@design-library/utils/navigation';

interface ReportsCellLevelSummaryProps {
  onNavigateToPage?: NavigationHandler;
}

export const ReportsCellLevelSummary: React.FC<ReportsCellLevelSummaryProps> = ({
  onNavigateToPage
}) => {
  const semanticColors = useSemanticColors();
  const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);
  const downloadDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (downloadDropdownRef.current && !downloadDropdownRef.current.contains(event.target as Node)) {
        setIsDownloadDropdownOpen(false);
      }
    };

    if (isDownloadDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDownloadDropdownOpen]);

  // Create navigation handler
  const navigationHandler = onNavigateToPage
    ? createPageNavigationHandler(onNavigateToPage, 'reports-cell-level-summary')
    : undefined;

  // Create breadcrumbs
  const breadcrumbs = [
    { label: 'Reports', isActive: false },
    { label: 'Cell-Level Summary', isActive: true }
  ];

  // Metrics data
  const metrics = [
    { label: 'Written Premium', value: '$243,719,718' },
    { label: 'Ceded Premium', value: '$21,498,476' },
    { label: 'Total Collateral Required', value: '$9,221,400' },
    { label: 'Number of Binders', value: '11' },
    { label: 'Earned Premium', value: '$243,719,718' },
    { label: 'Net Cession', value: '$10,317,196' },
    { label: 'Avg Gross Loss Ratio', value: '59.3%' },
    { label: 'Trust Account Balance', value: '$13,489,888' },
  ];

  // Table data
  const tableData = [
    {
      transactionName: 'Appalachian GL 2022 IFACC',
      premiumWritten: '$14,235,825',
      premiumEarned: '$8,459,732',
      cededPremium: '$14,235,825',
      paidLoss: '$23,456,789',
      incurredLoss: '$23,456,7'
    },
    {
      transactionName: 'Cardigan CA 2021 Non-Admitted IFACC',
      premiumWritten: '$12,450,000',
      premiumEarned: '$21,932,150',
      cededPremium: '$12,450,000',
      paidLoss: '$8,123,456',
      incurredLoss: '$8,123,4'
    },
    {
      transactionName: 'Cardigan CA 2022 Non-Admitted IFACC',
      premiumWritten: '$9,875,300',
      premiumEarned: '$3,678,905',
      cededPremium: '$9,875,300',
      paidLoss: '$19,876,543',
      incurredLoss: '$19,876,5'
    },
    {
      transactionName: 'Cornerstone GL 2021 IFACC',
      premiumWritten: '$20,100,500',
      premiumEarned: '$15,004,567',
      cededPremium: '$20,100,500',
      paidLoss: '$11,345,678',
      incurredLoss: '$11,345,6'
    },
    {
      transactionName: 'Cornerstone GL 2022 IFACC',
      premiumWritten: '$7,300,000',
      premiumEarned: '$19,500,143',
      cededPremium: '$7,300,000',
      paidLoss: '$5,432,109',
      incurredLoss: '$5,432,1'
    },
    {
      transactionName: 'First Light CA 2022 IFACC',
      premiumWritten: '$15,800,750',
      premiumEarned: '$7,250,999',
      cededPremium: '$15,800,750',
      paidLoss: '$17,890,234',
      incurredLoss: '$17,890,2'
    },
    {
      transactionName: 'RMS GL 2021 IFACC',
      premiumWritten: '$5,440,000',
      premiumEarned: '$26,478,300',
      cededPremium: '$5,440,000',
      paidLoss: '$12,345,678',
      incurredLoss: '$12,345,6'
    },
    {
      transactionName: 'RMS GL 2022 IFACC',
      premiumWritten: '$25,000,000',
      premiumEarned: '$5,234,888',
      cededPremium: '$25,000,000',
      paidLoss: '$22,111,222',
      incurredLoss: '$22,111,2'
    },
    {
      transactionName: 'Southern Star CA 2022 IFACC',
      premiumWritten: '$3,250,000',
      premiumEarned: '$12,879,560',
      cededPremium: '$3,250,000',
      paidLoss: '$9,876,543',
      incurredLoss: '$9,876,5'
    },
    {
      transactionName: 'XPT CA 2023 IFACC',
      premiumWritten: '$18,900,600',
      premiumEarned: '$30,001,200',
      cededPremium: '$18,900,600',
      paidLoss: '$15,678,910',
      incurredLoss: '$15,678,5'
    },
  ];

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      pageType="reports-cell-level-summary"
      selectedSidebarItem="reports"
      selectedSidebarSubitem="bdx-upload"
      onNavigate={navigationHandler}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
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
            <div key="download" ref={downloadDropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setIsDownloadDropdownOpen(!isDownloadDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 22px 8px 20px',
                  height: '44px',
                  width: 'fit-content',
                  backgroundColor: semanticColors.blackAndWhite.black900,
                  border: 'none',
                  borderRadius: borderRadius[4],
                  cursor: 'pointer',
                  ...typography.styles.bodyL,
                  color: semanticColors.blackAndWhite.white,
                }}
              >
                <span>Download</span>
                <div style={{
                  width: '1px',
                  height: '24px',
                  backgroundColor: semanticColors.blackAndWhite.black800,
                  flexShrink: 0
                }} />
                <div style={{
                  transform: isDownloadDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <ChevronDownExtraSmall color={semanticColors.theme.primary700} />
                </div>
              </button>
              {isDownloadDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  minWidth: '200px',
                  width: 'fit-content',
                  backgroundColor: colors.blackAndWhite.white,
                  border: 'none',
                  borderRadius: borderRadius[8],
                  marginTop: '8px',
                  zIndex: 1000,
                  boxShadow: shadows.medium,
                  padding: '10px',
                }}>
                  <div
                    onClick={() => {
                      window.open('/PDF.pdf', '_blank');
                      setIsDownloadDropdownOpen(false);
                    }}
                    style={{
                      padding: '12px 10px',
                      cursor: 'pointer',
                      ...typography.styles.bodyM,
                      color: colors.blackAndWhite.black900,
                      borderRadius: borderRadius[4],
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = semanticColors.theme.primary200}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    Download as PDF
                  </div>
                  <div
                    onClick={() => {
                      window.open('https://docs.google.com/spreadsheets/d/1bviXCfE9z115ZbpHiBUdH9BPlVXj5648i_v9cYorydE/edit?gid=879068275#gid=879068275', '_blank');
                      setIsDownloadDropdownOpen(false);
                    }}
                    style={{
                      padding: '12px 10px',
                      cursor: 'pointer',
                      ...typography.styles.bodyM,
                      color: colors.blackAndWhite.black900,
                      borderRadius: borderRadius[4],
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = semanticColors.theme.primary200}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    Download as Excel
                  </div>
                </div>
              )}
            </div>
          ]}
        />

        {/* Metrics Card */}
        <div style={{
          backgroundColor: semanticColors.blackAndWhite.white,
          border: `1px solid ${semanticColors.theme.primary400}`,
          borderRadius: borderRadius[12],
          padding: '30px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '30px 20px',
          gridTemplateRows: 'auto auto'
        }}>
          {metrics.map((metric, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <p style={{
                ...typography.styles.bodyS,
                color: semanticColors.blackAndWhite.black500,
                margin: 0
              }}>
                {metric.label}
              </p>
              <p style={{
                fontSize: '26px',
                fontWeight: typography.fontWeight.regular,
                lineHeight: '1.3',
                color: semanticColors.blackAndWhite.black900,
                margin: 0,
                whiteSpace: 'nowrap'
              }}>
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        <Table
          columns={[
            { key: 'transactionName', label: 'Transaction Name', align: 'left' },
            { key: 'premiumWritten', label: 'Premium Written', align: 'right', headerAlign: 'center' },
            { key: 'premiumEarned', label: 'Premium Earned', align: 'right', headerAlign: 'center' },
            { key: 'cededPremium', label: 'Ceded Premium', align: 'right', headerAlign: 'center' },
            { key: 'paidLoss', label: 'Paid Loss', align: 'right', headerAlign: 'center' },
            { key: 'incurredLoss', label: 'Incurred Loss', align: 'right', headerAlign: 'center' }
          ]}
          data={tableData}
          pagination={{
            enabled: true,
            position: 'bottom'
          }}
        />
      </div>
    </Layout>
  );
};

export default ReportsCellLevelSummary;
