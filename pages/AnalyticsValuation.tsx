import React, { useEffect, useState, useRef } from 'react';
import { Layout } from '@design-library/pages';
import { Button, Table } from '@design-library/components';
import { colors as baseColors, typography, borderRadius, shadows } from '@design-library/tokens';
import { AddSmall, DocumentTable, TextTable, AmmountTable, ArrangeTable } from '@design-library/icons';
import { ThemeProvider, useSemanticColors } from '@design-library/tokens/ThemeProvider';
import { NewValuationModal, ValuationFormData } from './NewValuationModal';

interface AnalyticsValuationProps {
  onNavigateToPage: (page: string) => void;
}

interface AnalyticsHeaderProps {
  onNewValuationClick: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ onNewValuationClick, buttonRef }) => {
  const colors = useSemanticColors();

  const headerStyles: React.CSSProperties = {
    backgroundColor: colors.theme.main,
    padding: '0 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: borderRadius[12],
    height: '250px',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
    backgroundImage: `url('/header_bg_animated_green.svg')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top right',
    backgroundSize: '50%',
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

  return (
    <div style={headerStyles}>
      <div style={leftContentStyles}>
        <div style={illustrationContainerStyles}>
          <img 
            src="/Valuation_illustration.png" 
            alt="analytics valuation" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        <div style={textContentStyles}>
          <h1 style={{
            ...typography.styles.headlineH2,
            color: baseColors.blackAndWhite.black900,
            margin: 0,
          }}>
            Valuation
          </h1>
          <p style={{
            ...typography.styles.bodyL,
            color: baseColors.blackAndWhite.black900,
            margin: 0,
          }}>
            Create and manage Valuation configurations for your analytics workflows.
          </p>
        </div>
      </div>
      <div style={{
        backgroundColor: baseColors.blackAndWhite.white,
        padding: '10px',
        borderRadius: borderRadius[12],
        boxShadow: shadows.base,
        width: '260px',
      }}>
        <Button
          ref={buttonRef}
          variant="primary"
          color="black"
          icon={<AddSmall color={colors.theme.main} />}
          className="custom-button-width"
          onClick={onNewValuationClick}
        >
          New Valuation
        </Button>
      </div>
    </div>
  );
};

export const AnalyticsValuation: React.FC<AnalyticsValuationProps> = ({ onNavigateToPage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const newValuationButtonRef = useRef<HTMLButtonElement>(null);

  // Add CSS for button width override to match Transaction Management
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
      onNavigate={(itemId, subitemId) => {
        console.log('Navigate to:', itemId, subitemId);
        
        // Handle Analytics navigation
        if (itemId === 'analytics') {
          if (subitemId === 'valuation') {
            // Already on analytics valuation page
            console.log('Already on analytics valuation page');
          }
        }
        // Handle Reports navigation
        else if (itemId === 'reports') {
          if (subitemId === 'transactions') {
            onNavigateToPage('transaction-management');
          } else if (subitemId === 'insights-explorer') {
            onNavigateToPage('report-navigation');
          }
        }
        // Handle Contracts navigation
        else if (itemId === 'contracts') {
          onNavigateToPage('contracts-explorer');
        }
        else {
          console.log('Unhandled navigation:', itemId, subitemId);
        }
      }}
      breadcrumbs={[
        { label: 'Valuation', isActive: true }
      ]}
    >
      {/* Header Section */}
      <AnalyticsHeader 
        onNewValuationClick={handleNewValuationClick}
        buttonRef={newValuationButtonRef}
      />
      
      {/* Valuation Table */}
      <div style={{ marginTop: '40px' }}>
        <Table
          columns={[
            {
              key: 'programTag',
              title: 'Program Tag',
              icon: <DocumentTable color={baseColors.analytics.dynamic.green400} />,
              sortIcon: <ArrangeTable color={baseColors.analytics.dynamic.green400} />,
              sortable: true,
              width: 309,
              cellType: 'document',
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
                onNavigateToPage('valuation-dashboard', selectedProgram);
              }
            },
            {
              key: 'treatyYear', 
              title: 'Treaty Year',
              icon: <TextTable color={baseColors.analytics.dynamic.green400} />,
              sortIcon: <ArrangeTable color={baseColors.analytics.dynamic.green400} />,
              sortable: true,
              align: 'right',
              cellType: 'simple'
            },
            {
              key: 'insuranceLossRatio',
              title: 'Insurance Loss Ratio',
              icon: <TextTable color={baseColors.analytics.dynamic.green400} />,
              sortIcon: <ArrangeTable color={baseColors.analytics.dynamic.green400} />, 
              sortable: true,
              align: 'right',
              cellType: 'simple'
            },
            {
              key: 'lineOfBusiness',
              title: 'Line of Business',
              icon: <TextTable color={baseColors.analytics.dynamic.green400} />,
              sortIcon: <ArrangeTable color={baseColors.analytics.dynamic.green400} />,
              sortable: true,
              align: 'right', 
              cellType: 'simple'
            },
            {
              key: 'premium',
              title: 'Premium',
              icon: <AmmountTable color={baseColors.analytics.dynamic.green400} />,
              sortIcon: <ArrangeTable color={baseColors.analytics.dynamic.green400} />,
              sortable: true,
              align: 'right',
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
          showSearch={true}
          searchPlaceholder="Search configurations..."
          itemsPerPage={10}
          totalItems={80}
          currentPage={1}
          onPageChange={(page) => console.log('Page changed to:', page)}
          onSort={(column, direction) => console.log('Sort:', column, direction)}
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