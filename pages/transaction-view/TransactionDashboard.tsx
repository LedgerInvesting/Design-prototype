import React, { useState, useEffect } from 'react';
import { Layout } from '@design-library/pages';
import { colors, typography, borderRadius } from '@design-library/tokens';
import { useSemanticColors } from '@design-library/tokens/ThemeProvider';
import { DashboardCard, Chart } from '@design-library/components';
import { CardsGraph, CardsCheck, CardsText, ArrowUpSmall, ArrowDownSmall } from '@design-library/icons';
import { TransactionInsights } from './TransactionInsights';
import { TransactionBDXUpload } from './TransactionBDXUpload';
import { TransactionValuation } from './TransactionValuation';
import { useTransactions } from '../hooks/useTransactionsStable';

// Small line chart component
interface SmallChartProps {
  trend: 'up' | 'down' | 'neutral';
  color?: string;
}

const SmallChart: React.FC<SmallChartProps> = ({ trend, color }) => {
  const semanticColors = useSemanticColors();
  const defaultColors = {
    up: '#15BF53',
    down: '#db2d31',
    neutral: '#666'
  };

  const circleColor = color || defaultColors[trend];

  return (
    <svg width="106" height="28" viewBox="0 0 106 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M99.6842 3.63369C98.6756 3.85797 95.9318 4.51452 93.0252 5.34639C89.3919 6.38624 83.1359 7.6096 81.7232 8.40478C80.5931 9.04092 79.0994 9.93397 78.4938 10.301L74.4577 26.9998C72.9778 23.1666 69.7354 15.2923 68.6052 14.4604C67.1926 13.4205 66.3852 12.3195 64.3672 12.3195C62.3491 12.3195 59.3231 12.2583 56.2959 13.0535C53.2688 13.8487 46.0031 14.8274 43.3796 15.0109C40.756 15.1944 42.3704 15.7449 37.527 15.1332C32.6836 14.5216 30.6653 14.7051 30.4635 13.8487C30.2617 12.9924 27.4367 8.28244 27.2349 6.81441C27.0331 5.34639 25.6198 4.97938 24.8126 4.85705C24.0053 4.73471 20.7769 6.32507 18.7588 6.93675C16.7407 7.54843 15.9338 8.46594 13.7139 8.64945C7.45719 8.09894 5.84272 8.40478 5.43911 7.05909C5.03549 5.71339 4.02693 5.10172 4.02693 4.73471C4.02693 4.36771 2.21002 3.93953 2.00822 3.63369C1.84677 3.38902 1.2688 2.96085 1 2.77734"
        stroke="#17211B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="101"
        cy="5"
        r="4"
        fill={circleColor}
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
};

// Growth indicator component
interface GrowthIndicatorProps {
  direction: 'up' | 'down';
  percentage: string;
  period: string;
}

const GrowthIndicator: React.FC<GrowthIndicatorProps> = ({ direction, percentage, period }) => {
  const semanticColors = useSemanticColors();
  const isPositive = direction === 'up';
  const color = isPositive ? semanticColors.success.textAndStrokes : semanticColors.error.textAndStrokes;
  const ArrowIcon = isPositive ? ArrowUpSmall : ArrowDownSmall;
  const sign = isPositive ? '+' : '';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontFamily: 'Söhne, system-ui, sans-serif',
      fontSize: '12px',
      fontWeight: 500,
      color: semanticColors.blackAndWhite.black900,
    }}>
      <ArrowIcon color={color} />
      <span>{sign} {percentage} in the last {period}</span>
    </div>
  );
};

// Data validation chart component
interface DataValidationChartProps {
  level: 'excellent' | 'marginal' | 'concerning';
}

const DataValidationChart: React.FC<DataValidationChartProps> = ({ level }) => {
  const rectangleColors = {
    excellent: { top: '#15BF53', center: '#D5E33D', bottom: '#FFB5EE' },
    marginal: { top: '#D5E33D', center: '#15BF53', bottom: '#FFB5EE' },
    concerning: { top: '#FFB5EE', center: '#D5E33D', bottom: '#15BF53' }
  };

  const colors = rectangleColors[level];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg width="101" height="45" viewBox="0 0 101 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="99" y="32" width="2" height="13" rx="1" fill={colors.bottom}/>
        <rect x="99" y="16" width="2" height="13" rx="1" fill={colors.center}/>
        <path d="M40 0H100C100.552 0 101 0.447715 101 1V12C101 12.5523 100.552 13 100 13H40V0Z" fill="url(#paint0_linear_15530_22613)"/>
        <rect x="99" width="2" height="13" rx="1" fill={colors.top}/>
        <path d="M76 9.02525C75.2335 9.29377 73.1481 10.0798 70.9391 11.0758C68.1779 12.3207 63.4233 13.7854 62.3496 14.7374C61.4907 15.499 60.3556 16.5682 59.8953 17.0076L56.8279 37C55.7031 32.4108 53.2389 22.9833 52.38 21.9874C51.3064 20.7424 50.6928 19.4242 49.159 19.4242C47.6253 19.4242 45.3255 19.351 43.0249 20.303C40.7243 21.2551 35.2023 22.4268 33.2085 22.6465C31.2146 22.8662 32.4415 23.5253 28.7605 22.7929C25.0795 22.0606 23.5456 22.2803 23.3923 21.255C23.2389 20.2298 21.0919 14.5909 20.9385 12.8333C20.7852 11.0758 19.7111 10.6364 19.0976 10.4899C18.4841 10.3434 16.0304 12.2475 14.4967 12.9798C12.9629 13.7121 12.3497 14.8106 10.6625 15.0303C5.90747 14.3712 4.68047 14.7374 4.37372 13.1263C4.06697 11.5152 3.30046 10.7828 3.30046 10.3434C3.30046 9.90404 1.91962 9.39141 1.76624 9.02525C1.64354 8.73232 1.20429 8.2197 1 8" stroke="#17211B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="78" cy="7" r="4" fill="#15BF53" stroke="white" strokeWidth="2"/>
        <defs>
          <linearGradient id="paint0_linear_15530_22613" x1="40" y1="6.5" x2="101" y2="6.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="#C6FFC1"/>
          </linearGradient>
        </defs>
      </svg>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        fontSize: '9px',
        fontFamily: 'Söhne, system-ui, sans-serif',
        fontWeight: 500,
        color: '#8b908d',
        textAlign: 'right' as const,
        lineHeight: 1.2
      }}>
        <div style={{ height: '13px', display: 'flex', alignItems: 'center' }}>Excellent</div>
        <div style={{ height: '13px', display: 'flex', alignItems: 'center' }}>Marginal</div>
        <div style={{ height: '13px', display: 'flex', alignItems: 'center' }}>Concerning</div>
      </div>
    </div>
  );
};

interface TransactionDashboardProps {
  onNavigateToPage: (page: string, data?: any) => void;
}

/**
 * Transaction Dashboard Page
 *
 * Displays the main dashboard for a transaction with key information banner
 */
export const TransactionDashboard: React.FC<TransactionDashboardProps> = ({
  onNavigateToPage
}) => {
  const semanticColors = useSemanticColors();

  // Get all transactions from database to look up full data
  const { transactions: allTransactions } = useTransactions();

  const [transaction, setTransaction] = useState<{
    id: string;
    name: string;
    cedingCompany?: string;
    reinsurerName?: string;
    premium?: string;
    lineOfBusiness?: string;
    program_id?: string;
    quota_share?: number;
    gross_written_premium?: number;
    reported_loss_ratio?: number;
    ultimate_loss_ratio?: number;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Generate chart data for insights based on transaction data
  const chartData = React.useMemo(() => {
    // Use transaction-specific data to generate unique chart values
    const baseLossRatio = transaction?.reported_loss_ratio || 67;
    const seed = transaction?.id ? parseInt(transaction.id.replace(/\D/g, '')) % 100 : 50;

    return [
      { "date": "2025-01", "lineA": Math.max(20, baseLossRatio - 10 + (seed % 10)), "lineB": 10 + (seed % 5), "lineC": 0, "lineD": 2 },
      { "date": "2025-02", "lineA": Math.max(20, baseLossRatio - 15 + (seed % 15)), "lineB": 35 - (seed % 8), "lineC": 3, "lineD": 6 },
      { "date": "2025-03", "lineA": Math.max(20, baseLossRatio - 12 + (seed % 12)), "lineB": 20 + (seed % 6), "lineC": 6, "lineD": 12 },
      { "date": "2025-04", "lineA": Math.max(20, baseLossRatio - 18 + (seed % 8)), "lineB": 22 + (seed % 4), "lineC": 10, "lineD": 15 },
      { "date": "2025-05", "lineA": Math.max(20, baseLossRatio - 20 + (seed % 10)), "lineB": 25 - (seed % 6), "lineC": 15, "lineD": 18 },
      { "date": "2025-06", "lineA": Math.max(20, baseLossRatio - 22 + (seed % 12)), "lineB": 28 + (seed % 5), "lineC": 18, "lineD": 20 },
      { "date": "2025-07", "lineA": Math.max(20, baseLossRatio - 24 + (seed % 8)), "lineB": 30 - (seed % 7), "lineC": 22, "lineD": 25 },
      { "date": "2025-08", "lineA": Math.max(20, baseLossRatio - 30 + (seed % 10)), "lineB": 32 + (seed % 4), "lineC": 27, "lineD": 28 },
      { "date": "2025-09", "lineA": Math.max(20, baseLossRatio - 8 + (seed % 15)), "lineB": 40 - (seed % 8), "lineC": 35, "lineD": 33 },
      { "date": "2025-10", "lineA": Math.max(20, baseLossRatio - 2 + (seed % 12)), "lineB": 45 + (seed % 6), "lineC": 42, "lineD": 37 },
      { "date": "2025-11", "lineA": Math.max(20, baseLossRatio + 2 + (seed % 10)), "lineB": 50 - (seed % 5), "lineC": 48, "lineD": 42 },
      { "date": "2025-12", "lineA": Math.max(20, baseLossRatio + 5 + (seed % 8)), "lineB": 52 + (seed % 4), "lineC": 55, "lineD": 46 }
    ];
  }, [transaction?.id, transaction?.reported_loss_ratio]);

  // Load transaction data from sessionStorage on mount and whenever it changes
  useEffect(() => {
    const loadTransaction = () => {
      if (typeof window !== 'undefined') {
        const storedTransaction = sessionStorage.getItem('currentTransaction');
        if (storedTransaction) {
          try {
            const parsedTransaction = JSON.parse(storedTransaction);
            console.log('Loading transaction data from sessionStorage:', parsedTransaction);

            // Check if transaction has full program data, if not, look it up in database
            const hasFullData = parsedTransaction.quota_share !== undefined &&
                                parsedTransaction.gross_written_premium !== undefined;

            if (!hasFullData && allTransactions.length > 0) {
              // Look up full transaction data from database
              const fullTransactionData = allTransactions.find(tx => tx.id === parsedTransaction.id);

              if (fullTransactionData) {
                console.log('Enriching transaction with database data:', fullTransactionData);
                const enrichedTransaction = {
                  id: parsedTransaction.id,
                  name: parsedTransaction.name || fullTransactionData.transaction_name,
                  cedingCompany: parsedTransaction.cedingCompany || fullTransactionData.ceding_company_name,
                  reinsurerName: parsedTransaction.reinsurerName || fullTransactionData.reinsurer_company_name,
                  premium: parsedTransaction.premium || (fullTransactionData.premium ?
                    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(fullTransactionData.premium) :
                    'N/A'),
                  lineOfBusiness: parsedTransaction.lineOfBusiness || fullTransactionData.subject_business,
                  program_id: fullTransactionData.program_id,
                  quota_share: fullTransactionData.quota_share,
                  gross_written_premium: fullTransactionData.gross_written_premium,
                  reported_loss_ratio: fullTransactionData.reported_loss_ratio,
                  ultimate_loss_ratio: fullTransactionData.ultimate_loss_ratio,
                };

                // Save enriched data back to sessionStorage
                sessionStorage.setItem('currentTransaction', JSON.stringify(enrichedTransaction));
                setTransaction(enrichedTransaction);
                console.log('Transaction enriched with full data');
              } else {
                console.warn('Transaction not found in database, using stored data');
                setTransaction(parsedTransaction);
              }
            } else {
              console.log('Transaction already has full data');
              setTransaction(parsedTransaction);
            }
          } catch (e) {
            console.error('Error parsing transaction data:', e);
          }
        }
      }
    };

    // Load on mount
    loadTransaction();

    // Also listen for storage events (when sessionStorage changes)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currentTransaction') {
        loadTransaction();
      }
    };

    // Custom event for same-window storage changes
    const handleCustomStorageChange = () => {
      loadTransaction();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('sessionStorageChange', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sessionStorageChange', handleCustomStorageChange);
    };
  }, [allTransactions]);

  // Load saved tab state for this transaction when it changes
  useEffect(() => {
    if (transaction?.id && typeof window !== 'undefined') {
      const savedTabs = sessionStorage.getItem('transactionTabs');
      if (savedTabs) {
        try {
          const tabsMap = JSON.parse(savedTabs);
          const savedTab = tabsMap[transaction.id];
          if (savedTab) {
            setActiveTab(savedTab);
          } else {
            setActiveTab('dashboard');
          }
        } catch (e) {
          console.error('Error parsing transaction tabs:', e);
          setActiveTab('dashboard');
        }
      } else {
        setActiveTab('dashboard');
      }
    }
  }, [transaction?.id]);

  // Position page at top when component mounts or transaction changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [transaction?.id]);

  const displayName = transaction?.name || 'Transaction Dashboard';

  // Banner container styles
  const bannerStyles: React.CSSProperties = {
    display: 'flex',
    padding: '50px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '30px',
    alignSelf: 'stretch',
    borderRadius: borderRadius[12],
    background: colors.reports.blue700,
    backgroundImage: 'url(/pattern.png)',
    backgroundPosition: 'top right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '400px auto', // Specific size for @2x image
    position: 'relative' as const,
    height: '190px',
  };

  // Handle tab changes - switch views within the transaction
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);

    // Save tab state for this transaction
    if (transaction?.id && typeof window !== 'undefined') {
      const savedTabs = sessionStorage.getItem('transactionTabs');
      let tabsMap: { [key: string]: string } = {};

      if (savedTabs) {
        try {
          tabsMap = JSON.parse(savedTabs);
        } catch (e) {
          console.error('Error parsing transaction tabs:', e);
        }
      }

      tabsMap[transaction.id] = tabId;
      sessionStorage.setItem('transactionTabs', JSON.stringify(tabsMap));
    }
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            {/* Transaction Banner */}
            <div style={bannerStyles}>
              {/* Transaction Name */}
              <h1 style={{
                ...typography.styles.headlineH1,
                color: colors.blackAndWhite.black900,
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
              }}>
                {displayName}
              </h1>

              {/* Transaction Info - Single Line */}
              <div style={{
                display: 'flex',
                gap: '40px',
                alignItems: 'baseline',
                flexWrap: 'wrap',
              }}>
                {/* Cedent */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                  <span style={{
                    ...typography.styles.captionM,
                    color: colors.blackAndWhite.black700,
                  }}>
                    Cedent
                  </span>
                  <span style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                  }}>
                    {transaction?.cedingCompany || 'N/A'}
                  </span>
                </div>

                {/* Reinsurer */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                  <span style={{
                    ...typography.styles.captionM,
                    color: colors.blackAndWhite.black700,
                  }}>
                    Reinsurer
                  </span>
                  <span style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                  }}>
                    {transaction?.reinsurerName || 'N/A'}
                  </span>
                </div>

                {/* Premium */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                  <span style={{
                    ...typography.styles.captionM,
                    color: colors.blackAndWhite.black700,
                  }}>
                    Premium
                  </span>
                  <span style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                  }}>
                    {transaction?.premium || 'N/A'}
                  </span>
                </div>

                {/* Line of Business */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                  <span style={{
                    ...typography.styles.captionM,
                    color: colors.blackAndWhite.black700,
                  }}>
                    Line of Business
                  </span>
                  <span style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                  }}>
                    {transaction?.lineOfBusiness || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Dashboard Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              marginTop: '40px'
            }}>
              {/* Cession and Collateral Card */}
              <DashboardCard
                title="Cession and Collateral"
                icon={<CardsGraph color={semanticColors.theme.primary700} />}
                width="100%"
              >
                <div style={{ padding: '20px 30px 26px 30px' }}>
                  {/* Metric 1: Quota Share Written Premium */}
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{
                      fontFamily: 'Söhne, system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      color: semanticColors.blackAndWhite.black500,
                      marginBottom: '5px'
                    }}>
                      Quota Share Written Premium
                    </div>
                    <GrowthIndicator direction="up" percentage={`${((transaction?.quota_share || 27) / 10).toFixed(1)}%`} period="3m" />
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      marginTop: '12px'
                    }}>
                      <div style={{
                        fontFamily: 'Söhne, system-ui, sans-serif',
                        lineHeight: 1.3,
                        color: semanticColors.blackAndWhite.black900,
                        fontSize: '26px',
                        fontWeight: 400
                      }}>
                        ${((transaction?.gross_written_premium || 5920000) * (transaction?.quota_share || 27) / 100 / 1000000).toFixed(1)}M
                      </div>
                      <SmallChart trend="up" />
                    </div>
                  </div>

                  {/* Content-padded separator */}
                  <div style={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: semanticColors.theme.primary400,
                    margin: '0 0 20px 0'
                  }} />

                  {/* Metric 2: Total Remittance */}
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{
                      fontFamily: 'Söhne, system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      color: semanticColors.blackAndWhite.black500,
                      marginBottom: '5px'
                    }}>
                      Total Remittance
                    </div>
                    <GrowthIndicator direction="down" percentage={`${((transaction?.reported_loss_ratio || 67) / 20).toFixed(1)}%`} period="3m" />
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      marginTop: '12px'
                    }}>
                      <div style={{
                        fontFamily: 'Söhne, system-ui, sans-serif',
                        lineHeight: 1.3,
                        color: semanticColors.blackAndWhite.black900,
                        fontSize: '26px',
                        fontWeight: 400
                      }}>
                        ${((transaction?.gross_written_premium || 5920000) * (transaction?.quota_share || 27) / 100 * 0.85 / 1000000).toFixed(1)}M
                      </div>
                      <SmallChart trend="down" />
                    </div>
                  </div>

                  {/* Content-padded separator */}
                  <div style={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: semanticColors.theme.primary400,
                    margin: '0 0 20px 0'
                  }} />

                  {/* Metric 3: Collateral Required */}
                  <div>
                    <div style={{
                      fontFamily: 'Söhne, system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      color: semanticColors.blackAndWhite.black500,
                      marginBottom: '5px'
                    }}>
                      Collateral Required
                    </div>
                    <GrowthIndicator direction="up" percentage={`${((transaction?.quota_share || 27) / 3).toFixed(1)}%`} period="3m" />
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      marginTop: '12px'
                    }}>
                      <div style={{
                        fontFamily: 'Söhne, system-ui, sans-serif',
                        lineHeight: 1.3,
                        color: semanticColors.blackAndWhite.black900,
                        fontSize: '26px',
                        fontWeight: 400
                      }}>
                        ${((transaction?.gross_written_premium || 5920000) * (transaction?.quota_share || 27) / 100 * 0.27 / 1000000).toFixed(1)}M
                      </div>
                      <SmallChart trend="up" />
                    </div>
                  </div>
                </div>
              </DashboardCard>

              {/* Data Ingestion Card */}
              <DashboardCard
                title="Data Ingestion"
                icon={<CardsGraph color={semanticColors.theme.primary700} />}
                button={{
                  text: "EXPLORE",
                  onClick: () => setActiveTab('bdx-upload')
                }}
                width="100%"
              >
                <div style={{
                  padding: '30px 30px 26px 30px',
                  textAlign: 'center',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  {/* Main content text */}
                  <div style={{
                    marginBottom: '30px'
                  }}>
                    <div style={{
                      ...typography.styles.subheadingL,
                      color: semanticColors.blackAndWhite.black900,
                      marginBottom: '12px',
                      lineHeight: 1.4
                    }}>
                      Most recent data is from
                    </div>
                    <div style={{
                      ...typography.styles.subheadingL,
                      color: semanticColors.success.textAndStrokes,
                      fontWeight: 600,
                      marginBottom: '4px'
                    }}>
                      2025-03-31
                    </div>
                    <div style={{
                      ...typography.styles.subheadingL,
                      color: semanticColors.blackAndWhite.black900,
                      marginBottom: '8px'
                    }}>
                      . Next BDX is due in{' '}
                      <span style={{
                        color: semanticColors.success.textAndStrokes,
                        fontWeight: 600
                      }}>
                        11 days
                      </span>
                      .
                    </div>
                  </div>

                  {/* Status boxes */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <div
                      style={{
                        border: `1px solid ${semanticColors.theme.primary400}`,
                        borderRadius: borderRadius[4],
                        padding: '12px 16px',
                        ...typography.styles.bodyM,
                        color: semanticColors.blackAndWhite.black900,
                        backgroundColor: semanticColors.blackAndWhite.white,
                        cursor: 'pointer'
                      }}
                      onClick={() => setActiveTab('bdx-upload')}
                    >
                      3 months (Need review)
                    </div>
                    <div style={{
                      border: `1px solid ${semanticColors.theme.primary400}`,
                      borderRadius: borderRadius[4],
                      padding: '12px 16px',
                      ...typography.styles.bodyM,
                      color: semanticColors.blackAndWhite.black900,
                      backgroundColor: semanticColors.blackAndWhite.white
                    }}>
                      1 month flagged for cedant revision
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </div>

            {/* Insights Card - Full Width */}
            <div style={{
              backgroundColor: semanticColors.blackAndWhite.white,
              border: `1px solid ${semanticColors.theme.primary400}`,
              borderRadius: borderRadius[12],
              overflow: 'hidden',
              marginTop: '24px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 30px',
              }}>
                <h3 style={{
                  ...typography.styles.bodyL,
                  color: semanticColors.blackAndWhite.black900,
                  margin: 0
                }}>
                  Insights
                </h3>
                <button
                  style={{
                    backgroundColor: semanticColors.theme.primary200,
                    border: 'none',
                    borderRadius: borderRadius.absolute,
                    padding: '6px 12px',
                    ...typography.styles.bodyS,
                    fontWeight: 600,
                    color: semanticColors.blackAndWhite.black900,
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                  onClick={() => setActiveTab('insights')}
                >
                  EXPLORE
                </button>
              </div>

              <div style={{
                width: '100%',
                height: '1px',
                backgroundColor: semanticColors.theme.primary400,
                margin: '0',
              }} />

              {/* Card Content - Loss Ratio Chart */}
              <div>
                <Chart
                  data={chartData}
                  type="line"
                  lines={[
                    { dataKey: 'lineA', color: semanticColors.theme.primary700, label: 'Line A' },
                    { dataKey: 'lineB', color: colors.marketplace.violet700, label: 'Line B' },
                    { dataKey: 'lineC', color: semanticColors.success.textAndStrokes, label: 'Line C' },
                    { dataKey: 'lineD', color: colors.analytics.green700, label: 'Line D' }
                  ]}
                  xAxisKey="date"
                  height={325}
                  showGrid={true}
                  showTooltip={true}
                  xAxisInside={false}
                  yAxisInside={false}
                  xAxisLabel="Evaluation Date"
                  yAxisLabel="Loss Ratio"
                />
              </div>
            </div>

            {/* Bottom Cards Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              marginTop: '24px'
            }}>
              {/* Data Validation Card */}
              <DashboardCard
                title="Data Validation"
                icon={<CardsCheck color={semanticColors.theme.primary700} />}
                button={{
                  text: "EXPLORE",
                  onClick: () => {} // TODO: Navigate to data validation page
                }}
                width="100%"
              >
                <div style={{ padding: '20px 30px 26px 30px' }}>
                  {/* Metric 1: Policies with Critical Validation Issues */}
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{
                      fontFamily: 'Söhne, system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      color: semanticColors.blackAndWhite.black900,
                      marginBottom: '4px'
                    }}>
                      Policies with Critical Validation Issues
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <div style={{
                          fontFamily: 'Söhne, system-ui, sans-serif',
                          lineHeight: 1.3,
                          color: semanticColors.blackAndWhite.black900,
                          fontSize: '26px',
                          fontWeight: 400
                        }}>
                          12
                        </div>
                        <div style={{
                          fontSize: '10px',
                          color: semanticColors.blackAndWhite.black500
                        }}>
                          0.8%
                        </div>
                      </div>
                      <DataValidationChart level="excellent" />
                    </div>
                  </div>

                  {/* Dashed separator */}
                  <div style={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: 'transparent',
                    borderTop: `1px dashed ${semanticColors.theme.primary400}`,
                    margin: '0 0 10px 0'
                  }} />

                  {/* Metric 2: Affected Premium */}
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{
                      fontFamily: 'Söhne, system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      color: semanticColors.blackAndWhite.black900,
                      marginBottom: '4px'
                    }}>
                      Affected Premium
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <div style={{
                          fontFamily: 'Söhne, system-ui, sans-serif',
                          lineHeight: 1.3,
                          color: semanticColors.blackAndWhite.black900,
                          fontSize: '26px',
                          fontWeight: 400
                        }}>
                          $2.1M
                        </div>
                        <div style={{
                          fontSize: '10px',
                          color: semanticColors.blackAndWhite.black500
                        }}>
                          4.6%
                        </div>
                      </div>
                      <DataValidationChart level="marginal" />
                    </div>
                  </div>

                  {/* Regular separator */}
                  <div style={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: semanticColors.theme.primary400,
                    margin: '0 0 10px 0'
                  }} />

                  {/* Metric 3: Claims with Critical Validation Issues */}
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{
                      fontFamily: 'Söhne, system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      color: semanticColors.blackAndWhite.black900,
                      marginBottom: '4px'
                    }}>
                      Claims with Critical Validation Issues
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <div style={{
                          fontFamily: 'Söhne, system-ui, sans-serif',
                          lineHeight: 1.3,
                          color: semanticColors.blackAndWhite.black900,
                          fontSize: '26px',
                          fontWeight: 400
                        }}>
                          8
                        </div>
                        <div style={{
                          fontSize: '10px',
                          color: semanticColors.blackAndWhite.black500
                        }}>
                          1.2%
                        </div>
                      </div>
                      <DataValidationChart level="excellent" />
                    </div>
                  </div>

                  {/* Dashed separator */}
                  <div style={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: 'transparent',
                    borderTop: `1px dashed ${semanticColors.theme.primary400}`,
                    margin: '0 0 10px 0'
                  }} />

                  {/* Metric 4: Affected Losses */}
                  <div>
                    <div style={{
                      fontFamily: 'Söhne, system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      color: semanticColors.blackAndWhite.black900,
                      marginBottom: '4px'
                    }}>
                      Affected Losses
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <div style={{
                          fontFamily: 'Söhne, system-ui, sans-serif',
                          lineHeight: 1.3,
                          color: semanticColors.blackAndWhite.black900,
                          fontSize: '26px',
                          fontWeight: 400
                        }}>
                          $1.4M
                        </div>
                        <div style={{
                          fontSize: '10px',
                          color: semanticColors.blackAndWhite.black500
                        }}>
                          3.2%
                        </div>
                      </div>
                      <DataValidationChart level="marginal" />
                    </div>
                  </div>
                </div>
              </DashboardCard>

              {/* Contracts Card */}
              <DashboardCard
                title="Contracts"
                icon={<CardsText color={semanticColors.theme.primary700} />}
                button={{
                  text: "EXPLORE",
                  onClick: () => {} // TODO: Navigate to contracts page
                }}
                width="100%"
              >
                <div style={{
                  padding: '30px 30px 26px 30px',
                  textAlign: 'center',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '20px'
                }}>
                  {/* Blue 700 Container */}
                  <div style={{
                    backgroundColor: semanticColors.theme.primary700,
                    borderRadius: borderRadius[12],
                    padding: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      src="/transaction header icon.png"
                      alt="contracts"
                      style={{
                        width: '80px',
                        height: 'auto',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Text Content */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <div style={{
                      ...typography.styles.bodyL,
                      color: semanticColors.blackAndWhite.black900,
                    }}>
                      3 Contracts available
                    </div>
                    <div style={{
                      ...typography.styles.bodyM,
                      color: semanticColors.blackAndWhite.black500,
                    }}>
                      1 Contracts executed in past 30 days
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </div>
          </>
        );
      case 'insights':
        return <TransactionInsights transactionName={transaction?.name} transaction={transaction} />;
      case 'bdx-upload':
        return <TransactionBDXUpload transactionName={transaction?.name} transaction={transaction} onNavigateToPage={onNavigateToPage} />;
      case 'valuations':
        return <TransactionValuation transactionName={transaction?.name} transaction={transaction} />;
      case 'triangles':
        return (
          <div style={{
            width: '100%',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              ...typography.styles.bodyL,
              color: colors.blackAndWhite.black300,
            }}>
              Triangles for {transaction?.name} - Coming soon
            </div>
          </div>
        );
      case 'files':
        return (
          <div style={{
            width: '100%',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              ...typography.styles.bodyL,
              color: colors.blackAndWhite.black300,
            }}>
              Files for {transaction?.name} - Coming soon
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout
      pageType="transaction-detail"
      selectedSidebarItem=""
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onNavigate={(itemId, subitemId, pageType) => {
        if (pageType) {
          onNavigateToPage(pageType);
        } else if (itemId === 'all-transactions') {
          onNavigateToPage('all-transactions');
        } else if (itemId === 'home') {
          onNavigateToPage('home');
        } else if (itemId === 'transaction-dashboard') {
          onNavigateToPage('transaction-dashboard');
        }
      }}
      onTransactionSettingsClick={() => {
        console.log('Transaction Settings clicked - navigating to transaction settings');
        onNavigateToPage('reports-new-transaction-form');
      }}
    >
      {/* Tab Content - Dynamic based on active tab */}
      {renderTabContent()}
    </Layout>
  );
};

export default TransactionDashboard;
