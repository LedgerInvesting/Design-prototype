import React, { useState } from 'react';
import { Layout } from '@design-library/pages';
import type { BreadcrumbItem } from '@design-library/pages';
import { Button, Card, CustomScroll } from '@design-library/components';
import { typography, spacing, borderRadius, shadows, useSemanticColors, ThemeProvider, colors as staticColors } from '@design-library/tokens';
import { createPageNavigationHandler, createBreadcrumbs } from '@design-library/utils/navigation';
import { TextTable, DocumentSmall, EditContractsExtraSmall, LookExtraSmall } from '@design-library/icons';

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
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    // Function to scroll to a marker in the preview and select it
    const scrollToMarker = (markerNum: number) => {
      setSelectedItem(markerNum);
      const markerElement = document.getElementById(`marker-${markerNum}`);
      if (markerElement && scrollContainerRef.current) {
        const container = scrollContainerRef.current.querySelector('.contract-pdf-scroll');
        if (container) {
          const markerTop = markerElement.offsetTop;
          container.scrollTo({ top: markerTop - 50, behavior: 'smooth' });
        }
      }
    };

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
      position: 'relative',
    };

    const pdfDocumentStyles: React.CSSProperties = {
      backgroundColor: colors.blackAndWhite.white,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: borderRadius[8],
      borderBottomRightRadius: borderRadius[8],
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
        position: 'relative',
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

      const iconsContainerStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: spacing[2],
        marginLeft: spacing[3],
      };

      return (
        <div style={cardStyles}>
          {terms.map((term, index) => {
            const itemIndex = startIndex + index;
            const isHovered = hoveredItem === itemIndex;
            return (
              <div
                key={index}
                style={termRowStyles}
                onMouseEnter={() => setHoveredItem(itemIndex)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span style={termLabelStyles}>{itemIndex}. {term.label}</span>
                <span style={termValueStyles}>{term.value}</span>
                {isHovered && (
                  <div style={iconsContainerStyles}>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => console.log('Edit item', itemIndex)}
                    >
                      <EditContractsExtraSmall color={colors.blackAndWhite.black700} />
                    </div>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => scrollToMarker(itemIndex)}
                    >
                      <LookExtraSmall color={colors.blackAndWhite.black700} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    };

    // Subject Business card with full text
    const SubjectBusinessCard: React.FC<{ index: number }> = ({ index }) => {
      const isHovered = hoveredItem === index;

      const cardStyles: React.CSSProperties = {
        marginBottom: spacing[2],
        paddingBottom: spacing[2],
        borderBottom: `1px dashed ${colors.theme.primary400}`,
      };

      const headerStyles: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing[5],
      };

      const labelStyles: React.CSSProperties = {
        ...typography.styles.bodyM,
        color: colors.blackAndWhite.black700,
      };

      const textStyles: React.CSSProperties = {
        ...typography.styles.bodyL,
        color: colors.blackAndWhite.black900,
        lineHeight: 1.3,
      };

      const iconsContainerStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: spacing[2],
      };

      return (
        <div
          style={cardStyles}
          onMouseEnter={() => setHoveredItem(index)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div style={headerStyles}>
            <div style={labelStyles}>{index}. Subject Business</div>
            {isHovered && (
              <div style={iconsContainerStyles}>
                <div style={{ cursor: 'pointer' }} onClick={() => console.log('Edit item', index)}>
                  <EditContractsExtraSmall color={colors.blackAndWhite.black700} />
                </div>
                <div style={{ cursor: 'pointer' }} onClick={() => scrollToMarker(index)}>
                  <LookExtraSmall color={colors.blackAndWhite.black700} />
                </div>
              </div>
            )}
          </div>
          <div style={textStyles}>
            Liability that may accrue to the Company as a result of loss or losses under Policies produced and underwritten by ACME Insurance Company, classified by the Company as Automobile Liability, including Bodily Injury, Property Damage Liability, Uninsured Motorists, Underinsured Motorists, Medical Payments and Personal Injury Protection, and Automobile Physical Damage business written or renewed during the term of this Agreement, subject to the terms and conditions herein contained.
          </div>
        </div>
      );
    };

    // Coverage Type card
    const CoverageTypeCard: React.FC<{ index: number }> = ({ index }) => {
      const isHovered = hoveredItem === index;

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

      const iconsContainerStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: spacing[2],
        marginLeft: spacing[3],
      };

      return (
        <div
          style={cardStyles}
          onMouseEnter={() => setHoveredItem(index)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div style={termRowStyles}>
            <span style={termLabelStyles}>{index}. Coverage Type</span>
            <span style={termValueStyles}>Risk Attaching</span>
            {isHovered && (
              <div style={iconsContainerStyles}>
                <div style={{ cursor: 'pointer' }} onClick={() => console.log('Edit item', index)}>
                  <EditContractsExtraSmall color={colors.blackAndWhite.black700} />
                </div>
                <div style={{ cursor: 'pointer' }} onClick={() => scrollToMarker(index)}>
                  <LookExtraSmall color={colors.blackAndWhite.black700} />
                </div>
              </div>
            )}
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
          alignItems: 'flex-start',
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
            <div
              ref={scrollContainerRef}
              style={{
                ...pdfDocumentStyles,
                position: 'relative',
                overflow: 'hidden',
                padding: '10px 10px 0 0',
              }}
            >
              <CustomScroll
                maxHeight="880px"
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
                  position: 'relative',
                }}>
                  {/* Numbered markers overlay - spread across 5 pages (~800px each) */}
                  {[
                    // Page 1 (0-800px)
                    { num: 1, top: 85, left: 25, boxWidth: 180, boxHeight: 20 },
                    { num: 2, top: 180, left: 320, boxWidth: 120, boxHeight: 18 },
                    { num: 3, top: 350, left: 45, boxWidth: 200, boxHeight: 22 },
                    { num: 4, top: 520, left: 280, boxWidth: 90, boxHeight: 16 },
                    // Page 2 (800-1600px)
                    { num: 5, top: 920, left: 35, boxWidth: 280, boxHeight: 60 },
                    { num: 6, top: 1050, left: 300, boxWidth: 100, boxHeight: 18 },
                    { num: 7, top: 1250, left: 60, boxWidth: 150, boxHeight: 20 },
                    { num: 8, top: 1450, left: 250, boxWidth: 130, boxHeight: 18 },
                    // Page 3 (1600-2400px)
                    { num: 9, top: 1720, left: 40, boxWidth: 160, boxHeight: 20 },
                    { num: 10, top: 1900, left: 290, boxWidth: 110, boxHeight: 18 },
                    { num: 11, top: 2100, left: 55, boxWidth: 190, boxHeight: 22 },
                    { num: 12, top: 2280, left: 310, boxWidth: 85, boxHeight: 16 },
                    // Page 4 (2400-3200px)
                    { num: 13, top: 2550, left: 30, boxWidth: 170, boxHeight: 20 },
                    { num: 14, top: 2750, left: 270, boxWidth: 140, boxHeight: 18 },
                    { num: 15, top: 2950, left: 50, boxWidth: 210, boxHeight: 24 },
                    // Page 5 (3200-4000px)
                    { num: 16, top: 3350, left: 35, boxWidth: 155, boxHeight: 20 },
                    { num: 17, top: 3550, left: 295, boxWidth: 95, boxHeight: 16 },
                    { num: 18, top: 3750, left: 45, boxWidth: 185, boxHeight: 22 },
                  ].map(({ num, top, left, boxWidth, boxHeight }) => (
                    <div
                      key={num}
                      id={`marker-${num}`}
                      style={{
                        position: 'absolute',
                        top: `${top}px`,
                        left: `${left}px`,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '4px',
                        zIndex: 10,
                      }}
                    >
                      {/* Number badge */}
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: colors.theme.primary700,
                          borderRadius: borderRadius[4],
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          ...typography.styles.bodyS,
                          color: colors.blackAndWhite.black900,
                          flexShrink: 0,
                        }}
                      >
                        {num}
                      </div>
                      {/* Highlight box - only shown when selected */}
                      {selectedItem === num && (
                        <div
                          style={{
                            width: `${boxWidth}px`,
                            height: `${boxHeight}px`,
                            backgroundColor: 'rgba(252, 220, 106, 0.2)',
                            border: '1.6px solid #D9B740',
                            borderRadius: borderRadius[4],
                          }}
                        />
                      )}
                    </div>
                  ))}
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