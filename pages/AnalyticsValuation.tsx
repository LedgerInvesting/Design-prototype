import React, { useState, useRef } from 'react';
import { Layout, PageBanner } from '@design-library/pages';
import { Button, Table } from '@design-library/components';
import { typography } from '@design-library/tokens';
import { AddSmall, DocumentTable, TextTable, AmmountTable, ArrangeTable, ContractsLogo } from '@design-library/icons';
import { ThemeProvider, useSemanticColors } from '@design-library/tokens/ThemeProvider';
import { createPageNavigationHandler, createBreadcrumbs } from '@design-library/utils/navigation';
import { useSettings } from '@design-library/contexts';
import { NewValuationModal, ValuationFormData } from './NewValuationModal';

interface AnalyticsValuationProps {
  onNavigateToPage: (page: string) => void;
}


export const AnalyticsValuation: React.FC<AnalyticsValuationProps> = ({ onNavigateToPage }) => {
  const colors = useSemanticColors();
  const settings = useSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const newValuationButtonRef = useRef<HTMLButtonElement>(null);

  const handleNewValuationClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateValuation = (formData: ValuationFormData) => {
    console.log('Creating valuation with data:', formData);
    // Handle valuation creation logic here
    setIsModalOpen(false);
  };

  return (
    <ThemeProvider initialTheme="analytics">
      <Layout
      selectedSidebarItem="analytics"
      selectedSidebarSubitem="valuation"
      onNavigate={createPageNavigationHandler(onNavigateToPage, 'analytics-valuation')}
      breadcrumbs={createBreadcrumbs.analytics.valuation()}
    >
      {/* Header Section */}
      <PageBanner
        title="Valuation"
        subtitle="Create and manage Valuation configurations for your analytics workflows."
        illustrationSrc="/analytics_Illustration.png"
        patternSrc="/pattern_analytics.svg"
        buttonText="New Valuation"
        buttonIcon={<AddSmall color={colors.theme.main} />}
        onButtonClick={handleNewValuationClick}
        illustrationAlt="analytics valuation"
      />
      
      {/* Valuation Table */}
      <div style={{ marginTop: '40px' }}>
        <Table
          columns={[
            {
              key: 'programTag',
              title: 'Program Tag',
              icon: <DocumentTable color={colors.theme.primary450} />,
              sortIcon: <ArrangeTable color={colors.theme.primary450} />,
              sortable: true,
              width: '309px',
              cellType: 'document',
              align: 'left', // First column left-aligned
              headerAlign: 'left',
              hoverIcon: 'open',
              onDownload: (filename: string) => {
                console.log('Opening program:', filename);
                // Navigate to valuation dashboard with program data
                const selectedProgram = {
                  programName: filename,
                  evaluationDate: '2024-12-30',
                  reportedLossRatio: '42.2%',
                  currentWrittenPremium: '$20,107,359'
                };
                onNavigateToPage('analytics-valuation-dashboard', selectedProgram);
              }
            },
            {
              key: 'treatyYear',
              title: 'Treaty Year',
              icon: <TextTable color={colors.theme.primary450} />,
              sortIcon: <ArrangeTable color={colors.theme.primary450} />,
              sortable: true,
              width: '150px',
              align: 'right', // Right-aligned cells
              headerAlign: 'right', // Right-aligned headers
              cellType: 'simple'
            },
            {
              key: 'insuranceLossRatio',
              title: 'Insurance Loss Ratio',
              icon: <TextTable color={colors.theme.primary450} />,
              sortIcon: <ArrangeTable color={colors.theme.primary450} />,
              sortable: true,
              width: '180px',
              align: 'right', // Right-aligned cells
              headerAlign: 'right', // Right-aligned headers
              cellType: 'simple'
            },
            {
              key: 'lineOfBusiness',
              title: 'Line of Business',
              icon: <TextTable color={colors.theme.primary450} />,
              sortIcon: <ArrangeTable color={colors.theme.primary450} />,
              sortable: true,
              width: '160px',
              align: 'right', // Right-aligned cells
              headerAlign: 'right', // Right-aligned headers
              cellType: 'simple'
            },
            {
              key: 'premium',
              title: 'Premium',
              icon: <AmmountTable color={colors.theme.primary450} />,
              sortIcon: <ArrangeTable color={colors.theme.primary450} />,
              sortable: true,
              width: '150px',
              align: 'right', // Right-aligned cells
              headerAlign: 'right', // Right-aligned headers
              cellType: 'simple'
            }
          ]}
          data={[
            {
              programTag: 'Aviation Treaty 2023',
              treatyYear: 'TY23',
              insuranceLossRatio: '53.2%',
              lineOfBusiness: 'Aviation',
              premium: '£14,235,825'
            },
            {
              programTag: 'Aviation Treaty 2023', 
              treatyYear: 'TY23',
              insuranceLossRatio: '53.2%',
              lineOfBusiness: 'Aviation',
              premium: '$4,217,311'
            },
            {
              programTag: 'Aviation Treaty 2024',
              treatyYear: 'TY23', 
              insuranceLossRatio: '53.2%',
              lineOfBusiness: 'Aviation',
              premium: '€15,577,123'
            },
            {
              programTag: 'Cyber Treaty 2023',
              treatyYear: 'TY23',
              insuranceLossRatio: '53.2%', 
              lineOfBusiness: 'Cyber',
              premium: '€11,109,938'
            },
            {
              programTag: 'Cyber Treaty 2024',
              treatyYear: 'TY23',
              insuranceLossRatio: '53.2%',
              lineOfBusiness: 'Cyber', 
              premium: '$3,800,000'
            },
            {
              programTag: 'Health Insurance Stop Loss Cover',
              treatyYear: 'TY23',
              insuranceLossRatio: '53.2%',
              lineOfBusiness: 'Health',
              premium: '€1,870,616'
            },
            {
              programTag: 'Health Treaty 2023',
              treatyYear: 'TY23',
              insuranceLossRatio: '53.2%',
              lineOfBusiness: 'Health',
              premium: '£3,743,254'
            },
            {
              programTag: 'Health Treaty 2023',
              treatyYear: 'TY23', 
              insuranceLossRatio: '53.2%',
              lineOfBusiness: 'Health',
              premium: '$13,077,663'
            },
            {
              programTag: 'Liability Excess of Loss Treaty',
              treatyYear: 'TY23',
              insuranceLossRatio: '53.2%',
              lineOfBusiness: 'Liability',
              premium: '€15,600,000'
            }
          ]}
          showHeader={true}
          title="Valuations"
          itemsPerPage={10}
          totalItems={80}
          totalPages={8}
          currentPage={1}
          onPageChange={(page) => console.log('Page changed to:', page)}
        />
      </div>
      
      {/* New Valuation Modal */}
      <NewValuationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCreateValuation={handleCreateValuation}
        onNavigateToPage={onNavigateToPage}
        buttonRef={newValuationButtonRef}
      />
      </Layout>
    </ThemeProvider>
  );
};