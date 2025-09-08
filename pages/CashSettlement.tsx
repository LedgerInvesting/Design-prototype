import React from 'react';
// Import page components
import { Layout } from '@design-library/pages';
import type { BreadcrumbItem } from '@design-library/pages';

// Import base components  
import { Card, Button, Stack, Grid, Container } from '@design-library/components';

// Import design tokens
import { colors, typography, spacing, borderRadius, shadows } from '@design-library/tokens';

// Custom document icon component
interface DocumentIconProps {
  fillColor?: string;
}

const DocumentIcon: React.FC<DocumentIconProps> = ({ fillColor = colors.marketplace.violet700 }) => (
  <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="14" height="18" rx="3" fill={fillColor}/>
    <path d="M4 7H8" stroke={colors.blackAndWhite.black900} strokeWidth="1.4"/>
    <path d="M4 10H10" stroke={colors.blackAndWhite.black900} strokeWidth="1.4"/>
  </svg>
);

// Mock data for the financial metrics
const metricsData = [
  {
    id: 'gross-written-premium',
    title: 'Gross Written Premium',
    value: '$45,678,901',
    subtitle: 'Reported as of 2025-01-31BDX',
    hasUnderline: true,
    icon: <DocumentIcon fillColor={colors.marketplace.violet700} />
  },
  {
    id: 'ceded-basis-premium',
    title: 'Ceded Basis Premium',
    value: '$35,156,920',
    subtitle: 'Cession basis is earned premium',
    icon: <DocumentIcon fillColor={colors.marketplace.violet700} />
  },
  {
    id: 'quota-share-ceded',
    title: 'Quota Share Ceded Basis Premium',
    value: '$3,530,692',
    subtitle: '',
    tags: [
      { text: '10%', type: 'percentage' },
      { text: 'of', type: 'connector' },
      { text: 'Quota Share Written Premium', type: 'reference', color: colors.reports.blue700 }
    ],
    icon: <DocumentIcon fillColor={colors.reports.blue700} />
  },
  {
    id: 'ceding-commission',
    title: 'Ceding Commission',
    value: '$1,006,257',
    subtitle: '',
    tags: [
      { text: '28.5%', type: 'percentage' },
      { text: 'of', type: 'connector' },
      { text: 'Quota Share Ceded Basis Premium', type: 'reference', color: colors.marketplace.violet700 }
    ],
    icon: <DocumentIcon fillColor={colors.success.fill} />
  },
  {
    id: 'net-ceded-basic',
    title: 'Net Ceded Basic Premium',
    value: '$1,511,342',
    subtitle: '',
    tags: [
      { text: 'Quota Share Ceded Basis Premium', type: 'reference', color: colors.marketplace.violet700 },
      { text: '(-)', type: 'operator' },
      { text: 'Ceding Commission', type: 'reference', color: colors.error.textAndStrokes }
    ],
    icon: <DocumentIcon fillColor={colors.warning.fill} />
  },
  {
    id: 'paid-loss',
    title: 'Paid Loss',
    value: '$189,638',
    subtitle: 'Reported as of 2025-01-31BDX',
    hasUnderline: true,
    icon: <DocumentIcon fillColor={colors.blackAndWhite.black300} />
  },
  {
    id: 'profit-commission',
    title: 'Profit Commission',
    value: '$0',
    subtitle: 'Current Loss ratio above Loss ratio corridor',
    icon: <DocumentIcon fillColor={colors.error.fill} />
  },
  {
    id: 'brokerage-fee',
    title: 'Brokerage Fee',
    value: '$18,892',
    subtitle: '',
    tags: [
      { text: '1.29%', type: 'percentage' },
      { text: 'of', type: 'connector' },
      { text: 'Net Ceded Basic Premium', type: 'reference', color: colors.success.textAndStrokes }
    ],
    icon: <DocumentIcon fillColor={colors.marketplace.violet600} />
  },
  {
    id: 'total-ceded',
    title: 'Total ceded to trust',
    value: '$32,156,789',
    subtitle: '',
    tags: [
      { text: 'Sum of', type: 'connector' },
      { text: 'Brokerage Fee', type: 'reference', color: colors.error.textAndStrokes },
      { text: '&', type: 'operator' },
      { text: 'Net Ceded Basic Premium', type: 'reference', color: colors.success.textAndStrokes }
    ],
    icon: <DocumentIcon fillColor={colors.success.fill} />,
    fullWidth: true
  }
];

// Custom MetricCard component
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
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  hasUnderline,
  tags,
  icon,
  fullWidth = false
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
    height: '170px',
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
    color: colors.blackAndWhite.black500,
    margin: 0,
  };

  const tagStyles = {
    percentage: {
      backgroundColor: colors.reports.blue500,
      color: colors.blackAndWhite.black900,
      padding: '2px 8px',
      borderRadius: borderRadius.absolute,
      fontSize: '12px',
      fontWeight: 500,
    },
    connector: {
      backgroundColor: colors.blackAndWhite.white,
      color: colors.blackAndWhite.black900,
      padding: '4px 10px',
      borderRadius: borderRadius.absolute,
      fontSize: '12px',
      fontStyle: 'italic',
    },
    reference: {
      backgroundColor: colors.reports.blue500,
      color: colors.blackAndWhite.black900,
      padding: '2px 6px 2px 8px',
      borderRadius: borderRadius.absolute,
      fontSize: '12px',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    operator: {
      backgroundColor: colors.blackAndWhite.white,
      color: colors.blackAndWhite.black900,
      padding: '4px 10px',
      borderRadius: borderRadius.absolute,
      fontSize: '12px',
      fontStyle: 'italic',
    }
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
        
        {tags && (
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1px' }}>
            {tags.map((tag, index) => (
              <div key={index} style={tagStyles[tag.type]}>
                {tag.type === 'reference' && (
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: borderRadius.absolute,
                    backgroundColor: tag.color || colors.blackAndWhite.black500,
                  }} />
                )}
                {tag.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Main page component
interface CashSettlementProps {
  onNavigateToPage?: (page: 'cash-settlement' | 'report-navigation') => void;
}

export const CashSettlement: React.FC<CashSettlementProps> = ({ onNavigateToPage }) => {
  const backButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    marginBottom: '24px',
  };

  const titleStyles: React.CSSProperties = {
    ...typography.styles.headlineH2,
    color: colors.blackAndWhite.black900,
    marginBottom: '60px',
    lineHeight: '1.2',
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '30px',
    maxWidth: '1100px',
  };

  return (
    <Layout
      breadcrumbs={[
        { label: 'REPORTS', href: '/reports' },
        { label: 'INSIGHTS EXPLORER', href: '/reports/insights-explorer' },
        { label: 'CESSION AND COLLATERAL', isActive: true }
      ]}
      selectedSidebarItem="reports"
      selectedSidebarSubitem="insights-explorer"
      onNavigate={(itemId, subitemId) => {
        console.log('Navigate to:', itemId, subitemId);
      }}
      onInboxClick={() => {
        console.log('Inbox clicked');
      }}
    >
      {/* Back Button and Title */}
      <div style={backButtonStyles} onClick={() => onNavigateToPage?.('report-navigation')}>
        <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
          <path d="M4.25 0.5L2.5 2.25L0.75 0.5" stroke={colors.reports.dynamic.blue400} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90)" />
        </svg>
        <span style={{ 
          ...typography.styles.bodyM, 
          color: colors.blackAndWhite.black700,
          textDecoration: 'underline',
          cursor: 'pointer'
        }}>
          Back
        </span>
      </div>

      <div style={titleStyles}>
        <span style={{ color: colors.blackAndWhite.black500 }}>You're now reviewing Contracts from </span>
        <span style={{ color: colors.blackAndWhite.black900 }}>Cucumber GL Seasonal.</span>
        <span style={{ color: colors.blackAndWhite.black500 }}> Cession statement</span>
      </div>

      {/* Metrics Grid */}
      <div style={gridStyles}>
        {metricsData.map((metric) => (
          <div
            key={metric.id}
            style={{
              gridColumn: metric.fullWidth ? '1 / -1' : 'auto',
            }}
          >
            <MetricCard {...metric} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default CashSettlement;