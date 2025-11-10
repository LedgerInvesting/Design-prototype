import React, { useState } from 'react';
import { Layout } from '@design-library/pages';
import type { BreadcrumbItem } from '@design-library/pages';
import { Button, Card } from '@design-library/components';
import { typography, spacing, borderRadius, shadows, useSemanticColors, ThemeProvider } from '@design-library/tokens';
import { createPageNavigationHandler, createBreadcrumbs } from '@design-library/utils/navigation';
import { TextTable, DocumentSmall, KLogo } from '@design-library/icons';

interface ContractsAIExtractionProps {
  onNavigateToPage?: (page: string, data?: any) => void;
}

export const ContractsAIExtraction: React.FC<ContractsAIExtractionProps> = ({ onNavigateToPage }) => {
  const breadcrumbs = createBreadcrumbs.contracts.aiExtraction();

  const PageContent: React.FC = () => {
    const colors = useSemanticColors();

    // Page title styles
    const titleStyles: React.CSSProperties = {
      ...typography.styles.headlineH2,
      color: colors.blackAndWhite.black900,
      marginBottom: spacing[6],
    };

    const subtitleStyles: React.CSSProperties = {
      ...typography.styles.headlineH2,
      color: colors.blackAndWhite.black500,
      fontStyle: 'italic',
    };

    // Main layout styles
    const mainLayoutStyles: React.CSSProperties = {
      display: 'flex',
      gap: spacing[8],
      alignItems: 'flex-start',
      marginTop: spacing[6],
      width: '100%',
    };

    // PDF viewer styles
    const pdfViewerStyles: React.CSSProperties = {
      flex: '1 1 512px',
      backgroundColor: colors.theme.primary200,
      borderRadius: borderRadius[16],
      padding: spacing[3],
      minHeight: '800px',
      position: 'relative',
    };

    const pdfHeaderStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: spacing[4],
      marginBottom: spacing[4],
    };

    const pdfTitleStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: spacing[2],
      flex: 1,
    };

    const pdfDocumentStyles: React.CSSProperties = {
      backgroundColor: colors.blackAndWhite.white,
      borderRadius: borderRadius[8],
      boxShadow: shadows.base,
      minHeight: '700px',
      position: 'relative',
    };

    // Terms sections styles
    const termsSectionStyles: React.CSSProperties = {
      flex: '1 1 569px',
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[6],
    };

    // Section component
    const TermsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
      const sectionStyles: React.CSSProperties = {
        backgroundColor: colors.theme.primary200,
        borderRadius: borderRadius[16],
        padding: spacing[3],
      };

      const sectionHeaderStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: spacing[3],
        padding: `${spacing[3]} ${spacing[4]}`,
        marginBottom: spacing[2],
      };

      const sectionTitleStyles: React.CSSProperties = {
        ...typography.styles.bodyL,
        color: colors.blackAndWhite.black900,
        fontWeight: typography.fontWeight.medium,
      };

      return (
        <div style={sectionStyles}>
          <div style={sectionHeaderStyles}>
            <TextTable color={colors.blackAndWhite.black900} />
            <span style={sectionTitleStyles}>{title}</span>
          </div>
          {children}
        </div>
      );
    };

    // Terms card component
    const TermsCard: React.FC<{ terms: Array<{ label: string; value: string }> }> = ({ terms }) => {
      const cardStyles: React.CSSProperties = {
        backgroundColor: colors.blackAndWhite.white,
        borderRadius: borderRadius[8],
        boxShadow: shadows.base,
        padding: spacing[5],
        marginBottom: spacing[2],
      };

      const termRowStyles: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingBottom: spacing[2],
        marginBottom: spacing[2],
        borderBottom: `1px solid ${colors.blackAndWhite.black100}`,
      };

      const termLabelStyles: React.CSSProperties = {
        ...typography.styles.bodyM,
        color: colors.blackAndWhite.black700,
        flex: '0 0 auto',
      };

      const termValueStyles: React.CSSProperties = {
        ...typography.styles.bodyL,
        color: colors.blackAndWhite.black900,
        textAlign: 'right',
        flex: '1',
        marginLeft: spacing[4],
      };

      return (
        <div style={cardStyles}>
          {terms.map((term, index) => (
            <div key={index} style={termRowStyles}>
              <span style={termLabelStyles}>{term.label}</span>
              <span style={termValueStyles}>{term.value}</span>
            </div>
          ))}
        </div>
      );
    };

    // Subject Business card with full text
    const SubjectBusinessCard: React.FC = () => {
      const cardStyles: React.CSSProperties = {
        backgroundColor: colors.blackAndWhite.white,
        borderRadius: borderRadius[8],
        boxShadow: shadows.base,
        padding: spacing[5],
        marginBottom: spacing[2],
      };

      const labelStyles: React.CSSProperties = {
        ...typography.styles.bodyM,
        color: colors.blackAndWhite.black700,
        marginBottom: spacing[5],
      };

      const textStyles: React.CSSProperties = {
        ...typography.styles.bodyL,
        color: colors.blackAndWhite.black900,
        lineHeight: 1.3,
      };

      return (
        <div style={cardStyles}>
          <div style={labelStyles}>Subject Business</div>
          <div style={textStyles}>
            Liability that may accrue to the Company as a result of loss or losses under Policies produced and underwritten by ACME Insurance Company, classified by the Company as Automobile Liability, including Bodily Injury, Property Damage Liability, Uninsured Motorists, Underinsured Motorists, Medical Payments and Personal Injury Protection, and Automobile Physical Damage business written or renewed during the term of this Agreement, subject to the terms and conditions herein contained.
          </div>
        </div>
      );
    };

    // Coverage Type card
    const CoverageTypeCard: React.FC = () => {
      const cardStyles: React.CSSProperties = {
        backgroundColor: colors.blackAndWhite.white,
        borderRadius: borderRadius[8],
        boxShadow: shadows.base,
        padding: spacing[5],
      };

      const termRowStyles: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      };

      const termLabelStyles: React.CSSProperties = {
        ...typography.styles.bodyM,
        color: colors.blackAndWhite.black700,
      };

      const termValueStyles: React.CSSProperties = {
        ...typography.styles.bodyL,
        color: colors.blackAndWhite.black900,
      };

      return (
        <div style={cardStyles}>
          <div style={termRowStyles}>
            <span style={termLabelStyles}>Coverage Type</span>
            <span style={termValueStyles}>Risk Attaching</span>
          </div>
        </div>
      );
    };

    // Sample data
    const partiesData = [
      { label: 'Ceding Insurer', value: 'ACME Insurance Company' },
      { label: 'Quota Share %', value: 'Underwriter Company' },
      { label: 'Reinsurance Premium', value: 'Treaty' },
      { label: 'Reinsurer', value: 'Stark Industries Re. Ltd' },
      { label: 'Reinsurance Form', value: 'Quota Share' },
      { label: 'Reinsurance Type', value: 'Treaty' },
    ];

    const businessScopeData = [
      { label: 'Risk Period Start', value: '100%' },
      { label: 'Risk Period End', value: '100%' },
      { label: 'Product Line', value: '90%' },
      { label: 'Quota Share Percent', value: '100%' },
    ];

    return (
      <div>
        {/* Page Title and Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: spacing[8]
        }}>
          <div>
            <span style={titleStyles}>Extracted terms </span>
            <span style={subtitleStyles}>from</span>
            <span style={{ ...subtitleStyles, fontStyle: 'normal' }}> Demo Reinsurance Contract</span>
          </div>

          {/* Ask Anything Button */}
          <button
            onClick={() => console.log('Ask Anything clicked')}
            style={{
              padding: '10px 20px',
              borderRadius: borderRadius[8],
              boxShadow: shadows.medium,
              display: 'flex',
              alignItems: 'center',
              gap: spacing[3],
              backgroundColor: colors.blackAndWhite.black900,
              color: colors.blackAndWhite.white,
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              ...typography.styles.bodyM,
              fontWeight: typography.fontWeight.medium,
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: colors.theme.primary700,
              borderRadius: borderRadius[4],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <KLogo color={colors.blackAndWhite.black900} />
            </div>
            ASK ANYTHING
          </button>
        </div>

        {/* Main Content */}
        <div style={mainLayoutStyles}>
          {/* PDF Viewer Section */}
          <div style={pdfViewerStyles}>
            <div style={pdfHeaderStyles}>
              <div style={pdfTitleStyles}>
                <DocumentSmall color={colors.blackAndWhite.black900} />
                <span style={{
                  ...typography.styles.bodyL,
                  color: colors.blackAndWhite.black900,
                  fontWeight: typography.fontWeight.medium,
                }}>
                  XYZ Quota Share Reinsurance Agreement 2024.pdf
                </span>
              </div>
              {/* Three dots menu */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                cursor: 'pointer',
                padding: spacing[2],
                borderRadius: borderRadius[4],
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.blackAndWhite.black100;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onClick={() => console.log('Menu clicked')}
              >
                <div style={{
                  width: '4px',
                  height: '4px',
                  backgroundColor: colors.blackAndWhite.black500,
                  borderRadius: '50%',
                }} />
                <div style={{
                  width: '4px',
                  height: '4px',
                  backgroundColor: colors.blackAndWhite.black500,
                  borderRadius: '50%',
                }} />
                <div style={{
                  width: '4px',
                  height: '4px',
                  backgroundColor: colors.blackAndWhite.black500,
                  borderRadius: '50%',
                }} />
              </div>
            </div>
            <div style={pdfDocumentStyles}>
              {/* PDF placeholder content */}
              <div style={{
                padding: spacing[8],
                textAlign: 'center',
                color: colors.blackAndWhite.black500,
                ...typography.styles.bodyM,
              }}>
                PDF Document Content
                <br />
                (Document viewer would be implemented here)
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div style={termsSectionStyles}>
            {/* Parties and Basic Information */}
            <TermsSection title="Parties and Basic Information">
              <TermsCard terms={partiesData} />
            </TermsSection>

            {/* Business Scope and Risk Period */}
            <TermsSection title="Business Scope and Risk Period">
              <TermsCard terms={businessScopeData} />
              <SubjectBusinessCard />
              <CoverageTypeCard />
            </TermsSection>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ThemeProvider initialTheme="contracts">
      <Layout
        pageType="contracts-ai-extraction"
        selectedSidebarItem="contracts"
        selectedSidebarSubitem="ai-extraction"
        onNavigate={createPageNavigationHandler(onNavigateToPage || (() => {}), 'contracts-ai-extraction')}
        breadcrumbs={breadcrumbs}
        onBackClick={() => {
          // Navigate back to contracts transactions
          onNavigateToPage?.('contracts-transactions');
        }}
      >
        <PageContent />
      </Layout>
    </ThemeProvider>
  );
};