import React, { useEffect } from 'react';
import { Layout } from '@design-library/pages';
import { Button, Table } from '@design-library/components';
import { colors as baseColors, typography, borderRadius, shadows } from '@design-library/tokens';
import { AddSmall, DocumentTable } from '@design-library/icons';
import { ThemeProvider, useSemanticColors } from '@design-library/tokens/ThemeProvider';

interface AnalyticsValuationProps {
  onNavigateToPage: (page: string) => void;
}

const AnalyticsHeader: React.FC = () => {
  const colors = useSemanticColors();

  const headerStyles: React.CSSProperties = {
    backgroundColor: colors.theme.main,
    padding: '40px 60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: borderRadius[12],
    minHeight: '200px',
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
    gap: '5px',
  };

  const textContentStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginLeft: '20px',
  };

  return (
    <div style={headerStyles}>
      <div style={leftContentStyles}>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '-20px'
        }}>
          <img 
            src="/Valuation_illustration.png" 
            alt="analytics valuation" 
            style={{ width: '50%', height: 'auto' }}
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
          variant="primary"
          color="black"
          icon={<AddSmall color={colors.theme.main} />}
          className="custom-button-width"
        >
          New Valuation
        </Button>
      </div>
    </div>
  );
};

export const AnalyticsValuation: React.FC<AnalyticsValuationProps> = ({ onNavigateToPage }) => {
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
        { label: 'Analytics', href: '#' },
        { label: 'Valuation', href: '#', isActive: true }
      ]}
    >
      {/* Header Section */}
      <AnalyticsHeader />
      
      {/* Valuation Table */}
      <div style={{ marginTop: '40px' }}>
        <Table
          columns={[
            {
              key: 'programTag',
              title: 'Program Tag',
              icon: <DocumentTable />,
              width: 309,
              cellType: 'document'
            },
            {
              key: 'treatyYear', 
              title: 'Treaty Year',
              align: 'right',
              cellType: 'simple'
            },
            {
              key: 'insuranceLossRatio',
              title: 'Insurance Loss Ratio', 
              align: 'right',
              cellType: 'simple'
            },
            {
              key: 'lineOfBusiness',
              title: 'Line of Business',
              align: 'right', 
              cellType: 'simple'
            },
            {
              key: 'premium',
              title: 'Premium',
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
      </Layout>
    </ThemeProvider>
  );
};