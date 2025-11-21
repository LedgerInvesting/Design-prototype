import React, { useState } from 'react';
import { Layout } from '@design-library/pages';
import { Button, Table } from '@design-library/components';
import { typography, borderRadius, spacing, useSemanticColors, colors, ThemeProvider } from '@design-library/tokens';
import { createPageNavigationHandler } from '@design-library/utils/navigation';
import { DocumentTable, StatusTable, TextTable, AddMedium, AddSmall } from '@design-library/icons';

interface ContractsContractsListProps {
  onNavigateToPage?: (page: string, data?: any) => void;
  transactionData?: { transactionName?: string };
}

export const ContractsContractsList: React.FC<ContractsContractsListProps> = ({ onNavigateToPage, transactionData }) => {
  const transactionName = transactionData?.transactionName || 'Transaction';

  const PageContent: React.FC = () => {
    const semanticColors = useSemanticColors();
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Sample contract data
    const contractsData = [
      {
        name: 'Lofty PA 2023 LCM Agreement',
        status: 'Processed',
        classifications: ['Securities Broker Engagement', 'Original'],
        signedDate: '3/27/2023',
      },
      {
        name: 'Lofty PA 2023 LCM Agreement',
        status: 'Processed',
        classifications: ['Reinsurance Trust', 'Original'],
        signedDate: '3/27/2023',
      },
      {
        name: 'Alpine RE 2024 Master Agreement',
        status: 'Processed',
        classifications: ['Quota Share', 'Amendment'],
        signedDate: '1/15/2024',
      },
      {
        name: 'Summit Insurance Excess of Loss',
        status: 'Pending',
        classifications: ['Excess of Loss', 'Original'],
        signedDate: '2/28/2024',
      },
      {
        name: 'Coastal Reinsurance Treaty 2023',
        status: 'Processed',
        classifications: ['Treaty Reinsurance', 'Renewal'],
        signedDate: '12/1/2023',
      },
    ];

    // Table columns
    const tableColumns = [
      {
        key: 'name',
        title: 'Name',
        icon: <DocumentTable color={semanticColors.theme.primary400} />,
        sortable: true,
        width: '357px',
        cellType: 'document' as const,
        align: 'left' as const,
        headerAlign: 'left' as const,
        onDownload: (filename: string) => {
          // Navigate to AI extraction when clicking on a contract
          onNavigateToPage && onNavigateToPage('contracts-ai-extraction');
        },
      },
      {
        key: 'status',
        title: 'Status',
        icon: <StatusTable color={semanticColors.theme.primary400} />,
        sortable: true,
        width: '203px',
        cellType: 'status' as const,
        align: 'left' as const,
        headerAlign: 'left' as const,
      },
      {
        key: 'classifications',
        title: 'Classifications',
        icon: <TextTable color={semanticColors.theme.primary400} />,
        sortable: true,
        width: '242px',
        align: 'left' as const,
        headerAlign: 'left' as const,
        render: (value: string[]) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {value.map((classification, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: semanticColors.theme.primary200,
                  padding: '4px',
                  borderRadius: borderRadius[4],
                  ...typography.styles.bodyM,
                  color: semanticColors.blackAndWhite.black700,
                }}
              >
                {classification}
              </div>
            ))}
          </div>
        ),
      },
      {
        key: 'signedDate',
        title: 'Signed Date',
        icon: <TextTable color={semanticColors.theme.primary400} />,
        sortable: true,
        width: '298px',
        align: 'left' as const,
        headerAlign: 'left' as const,
      },
    ];

    // Buttons container styles
    const buttonsContainerStyles: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginBottom: '21px',
    };

    return (
      <div>
        {/* Action Buttons */}
        <div style={buttonsContainerStyles}>
          <Button
            variant="secondary"
            onClick={() => console.log('Run Extraction clicked')}
          >
            Run Extraction
          </Button>
          <Button
            variant="secondary"
            onClick={() => console.log('Add Contract clicked')}
            icon={<AddSmall color={colors.contracts.yellow700} />}
          >
            Add Contract
          </Button>
        </div>

        {/* Table Section */}
        <Table
          columns={tableColumns}
          data={contractsData}
          showHeader={true}
          title={`${transactionName} Contracts`}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          currentPage={currentPage}
          totalPages={1}
          totalItems={contractsData.length}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
          showFooterPagination={false}
          onRowClick={(row) => {
            // Navigate to AI extraction when clicking on a row
            onNavigateToPage && onNavigateToPage('contracts-ai-extraction');
          }}
        />
      </div>
    );
  };

  // Tab component for the page - needs to be outside PageContent to use semantic colors
  const TabsSection: React.FC = () => {
    const semanticColors = useSemanticColors();
    const [activeTab] = useState<'key-terms' | 'contracts'>('contracts');

    const handleTabClick = (tab: 'key-terms' | 'contracts') => {
      if (tab === 'key-terms') {
        onNavigateToPage && onNavigateToPage('contracts-ai-extraction');
      }
    };

    return (
      <div style={{
        display: 'flex',
        gap: '2px',
        width: '100%',
      }}>
        <div
          onClick={() => handleTabClick('key-terms')}
          style={{
            flex: 1,
            height: '27px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: activeTab === 'key-terms' ? semanticColors.theme.primary700 : semanticColors.theme.primary200,
            cursor: 'pointer',
            ...typography.styles.bodyS,
            color: activeTab === 'key-terms' ? semanticColors.blackAndWhite.black900 : semanticColors.blackAndWhite.black500,
          }}
        >
          Key Terms Extracted
        </div>
        <div
          onClick={() => handleTabClick('contracts')}
          style={{
            flex: 1,
            height: '27px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: activeTab === 'contracts' ? semanticColors.theme.primary700 : semanticColors.theme.primary200,
            cursor: 'pointer',
            ...typography.styles.bodyS,
            color: activeTab === 'contracts' ? semanticColors.blackAndWhite.black900 : semanticColors.blackAndWhite.black500,
          }}
        >
          Contracts
        </div>
      </div>
    );
  };

  return (
    <ThemeProvider initialTheme="contracts">
      <Layout
        pageType="contracts-contracts-list"
        selectedSidebarItem="contracts"
        selectedSidebarSubitem="transactions"
        onNavigate={createPageNavigationHandler(onNavigateToPage || (() => {}), 'contracts-contracts-list')}
        breadcrumbs={[
          { label: 'CONTRACTS', isActive: false },
          { label: 'TRANSACTIONS', isActive: true },
        ]}
        onBackClick={() => {
          // Navigate back to contracts transactions
          onNavigateToPage?.('contracts-transactions');
        }}
        tabs={<TabsSection />}
      >
        <PageContent />
      </Layout>
    </ThemeProvider>
  );
};

export default ContractsContractsList;
