import React, { useState } from 'react';
import { Layout } from '@design-library/pages';
import type { BreadcrumbItem } from '@design-library/pages';
import { Button, Card, CustomScroll } from '@design-library/components';
import { typography, spacing, borderRadius, shadows, useSemanticColors, ThemeProvider, colors as staticColors } from '@design-library/tokens';
import { createPageNavigationHandler, createBreadcrumbs } from '@design-library/utils/navigation';
import { TextTable, DocumentSmall } from '@design-library/icons';

interface ContractsAIExtractionProps {
  onNavigateToPage?: (page: string, data?: any) => void;
  transactionData?: { transactionName?: string };
}

export const ContractsAIExtraction: React.FC<ContractsAIExtractionProps> = ({ onNavigateToPage, transactionData }) => {
  const breadcrumbs = createBreadcrumbs.contracts.aiExtraction();
  const transactionName = transactionData?.transactionName || 'Demo Reinsurance Contract';

  // Tab component for the page
  const TabsSection: React.FC = () => {
    const semanticColors = useSemanticColors();
    const activeTab = 'key-terms';

    const handleTabClick = (tab: 'key-terms' | 'contracts') => {
      if (tab === 'contracts') {
        onNavigateToPage && onNavigateToPage('contracts-contracts-list');
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

    const pdfDocumentStyles: React.CSSProperties = {
      backgroundColor: colors.blackAndWhite.white,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: borderRadius[8],
      borderBottomRightRadius: borderRadius[8],
      minHeight: '700px',
      position: 'relative',
      overflowX: 'hidden',
    };

    // Terms sections styles
    const termsSectionStyles: React.CSSProperties = {
      flex: '1 1 569px',
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[6],
    };

    // Section component
    const TermsSection: React.FC<{ title: string; children: React.ReactNode; hideTopBorder?: boolean }> = ({ title, children, hideTopBorder }) => {
      const dividerStyles: React.CSSProperties = {
        height: '1px',
        backgroundColor: colors.theme.primary400,
        width: '100%',
      };

      const sectionHeaderStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: spacing[3],
        padding: `${spacing[3]} 0`,
      };

      const sectionTitleStyles: React.CSSProperties = {
        ...typography.styles.bodyL,
        color: colors.blackAndWhite.black900,
        fontWeight: typography.fontWeight.medium,
      };

      return (
        <div>
          {!hideTopBorder && <div style={dividerStyles} />}
          <div style={sectionHeaderStyles}>
            <TextTable color={staticColors.contracts.yellow900} />
            <span style={sectionTitleStyles}>{title}</span>
          </div>
          <div style={dividerStyles} />
          <div style={{ marginTop: spacing[3] }}>
            {children}
          </div>
        </div>
      );
    };

    // Terms card component
    const TermsCard: React.FC<{ terms: Array<{ label: string; value: string }>; startIndex?: number }> = ({ terms, startIndex = 1 }) => {
      const cardStyles: React.CSSProperties = {
        marginBottom: spacing[2],
      };

      const termRowStyles: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingBottom: spacing[2],
        marginBottom: spacing[2],
        borderBottom: `1px dashed ${colors.theme.primary400}`,
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
              <span style={termLabelStyles}>{startIndex + index}. {term.label}</span>
              <span style={termValueStyles}>{term.value}</span>
            </div>
          ))}
        </div>
      );
    };

    // Subject Business card with full text
    const SubjectBusinessCard: React.FC<{ index: number }> = ({ index }) => {
      const cardStyles: React.CSSProperties = {
        marginBottom: spacing[2],
        paddingBottom: spacing[2],
        borderBottom: `1px dashed ${colors.theme.primary400}`,
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
          <div style={labelStyles}>{index}. Subject Business</div>
          <div style={textStyles}>
            Liability that may accrue to the Company as a result of loss or losses under Policies produced and underwritten by ACME Insurance Company, classified by the Company as Automobile Liability, including Bodily Injury, Property Damage Liability, Uninsured Motorists, Underinsured Motorists, Medical Payments and Personal Injury Protection, and Automobile Physical Damage business written or renewed during the term of this Agreement, subject to the terms and conditions herein contained.
          </div>
        </div>
      );
    };

    // Coverage Type card
    const CoverageTypeCard: React.FC<{ index: number }> = ({ index }) => {
      const cardStyles: React.CSSProperties = {
        paddingBottom: spacing[2],
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
            <span style={termLabelStyles}>{index}. Coverage Type</span>
            <span style={termValueStyles}>Risk Attaching</span>
          </div>
        </div>
      );
    };

    // Core Deal Identity data (items 1-9)
    const coreDealData = [
      { label: 'Ceding Insurer', value: 'Neptune National Insurance' },
      { label: 'Product Line', value: 'Private Passenger Auto' },
      { label: 'Reinsurance Type', value: 'Treaty' },
      { label: 'Quota Share Percent', value: '100%' },
    ];

    // Risk Structure & Limits data (items 10-18)
    const riskStructureData = [
      { label: 'Aggregate Limit Basis', value: 'Percentage of Net Premium' },
      { label: 'Aggregate Limit', value: '115%' },
      { label: 'Coverage Layers Basis', value: 'percent_of_net_premium' },
      { label: 'Coverage Layer Amounts', value: 'Attachment: 0%, Exhaustion: 115%' },
      { label: 'Loss Corridor', value: 'N/A' },
      { label: 'Occurence Limit Basis', value: 'Amount' },
      { label: 'Occurence Limit', value: '$1,000,000' },
      { label: 'Policy Max Limits', value: 'Automobile liability: 0, Individual: $30,000' },
      { label: 'Quota Share Percent', value: '90%' },
    ];

    return (
      <div>
        {/* Page Title */}
        <div style={{ marginBottom: spacing[8] }}>
          <span style={titleStyles}>Extracted terms </span>
          <span style={subtitleStyles}>from</span>
          <span style={{ ...subtitleStyles, fontStyle: 'normal' }}> {transactionName}</span>
        </div>

        {/* Main Card Container */}
        <div style={{
          backgroundColor: colors.theme.primary200,
          borderRadius: borderRadius[16],
          padding: spacing[3],
          display: 'flex',
          gap: spacing[4],
        }}>
          {/* PDF Viewer Section - Left Side (60%) */}
          <div style={{ flex: '0 0 60%', display: 'flex', flexDirection: 'column' }}>
            {/* Contract Name in White Box */}
            <div style={{
              backgroundColor: colors.blackAndWhite.white,
              borderTopLeftRadius: borderRadius[8],
              borderTopRightRadius: borderRadius[8],
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              padding: spacing[4],
              display: 'flex',
              alignItems: 'center',
              borderBottom: `1px solid ${colors.theme.primary300}`,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2],
              }}>
                <DocumentSmall color={colors.blackAndWhite.black900} />
                <span style={{
                  ...typography.styles.bodyL,
                  color: colors.blackAndWhite.black900,
                  fontWeight: typography.fontWeight.medium,
                }}>
                  XYZ Quota Share Reinsurance Agreement 2024.pdf
                </span>
              </div>
            </div>
            {/* PDF Document Preview */}
            <div style={{
              ...pdfDocumentStyles,
              position: 'relative',
              overflow: 'hidden',
              flex: 1,
              padding: '10px 10px 0 0',
            }}>
              <CustomScroll
                maxHeight="680px"
                scrollClassName="contract-pdf-scroll"
                trackColor="transparent"
                thumbColor={colors.blackAndWhite.black900}
                scrollWidth={6}
                thumbBorderRadius={3}
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingRight: '10px',
                }}>
                  {/* Contract page images */}
                  {[1, 2, 3, 4, 5].map((pageNum, index) => (
                    <React.Fragment key={pageNum}>
                      <img
                        src={`/contract/${pageNum}.png`}
                        alt={`Contract page ${pageNum}`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                        }}
                      />
                      {/* Divider between pages */}
                      {index < 4 && (
                        <div style={{
                          height: '2px',
                          backgroundColor: colors.theme.primary400,
                          margin: '0 20px',
                          width: 'calc(100% - 40px)',
                        }} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </CustomScroll>
            </div>
          </div>

          {/* Terms Sections - Right Side (40%) */}
          <div style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[6],
            backgroundColor: colors.blackAndWhite.white,
            borderRadius: borderRadius[8],
            padding: spacing[4],
          }}>
            {/* Core Deal Identity */}
            <TermsSection title="Core Deal Identity" hideTopBorder>
              <TermsCard terms={coreDealData} startIndex={1} />
              <SubjectBusinessCard index={5} />
              <CoverageTypeCard index={6} />
            </TermsSection>

            {/* Risk Structure & Limits */}
            <TermsSection title="Risk Structure & Limits">
              <TermsCard terms={riskStructureData} startIndex={10} />
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
          // Navigate back to contracts list
          onNavigateToPage?.('contracts-contracts-list');
        }}
        tabs={<TabsSection />}
      >
        <PageContent />
      </Layout>
    </ThemeProvider>
  );
};