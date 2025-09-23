import React, { useState } from 'react';
import { FormLayout } from '@design-library/pages';
import { SearchBar, Button, Status, Selector } from '@design-library/components';
import { colors, typography, borderRadius, shadows } from '@design-library/tokens';
import { ThemeProvider, useSemanticColors } from '@design-library/tokens/ThemeProvider';
import { StatusWarning, PencilMedium } from '@design-library/icons';

interface Transaction {
  id: string;
  name: string;
  code: string;
  status: 'Renew' | 'Status';
  reinsurer: string;
  cedent: string;
  premium: string;
  dates: string;
  selected?: boolean;
}

interface RenewalTransactionProps {
  onNavigateToPage: (page: string, data?: any) => void;
}

const mockTransactions: Transaction[] = [
  {
    id: 'RC-2024-001',
    name: 'Q1 2024 Commercial Property Treaty',
    code: 'RC-2024-001',
    status: 'Renew',
    reinsurer: 'Swiss Re',
    cedent: 'Plum Insurers',
    premium: '$2,500,000',
    dates: '02/15/25 - 02/16/25'
  },
  {
    id: 'RC-2024-002',
    name: 'Aviation Liability Coverage 2024',
    code: 'RC-2024-002',
    status: 'Status',
    reinsurer: 'Munich Re',
    cedent: 'AeroCorp Insurance',
    premium: '$4,750,000',
    dates: '03/01/25 - 03/02/25'
  },
  {
    id: 'RC-2024-003',
    name: 'Marine Cargo Protection Plan',
    code: 'RC-2024-003',
    status: 'Status',
    reinsurer: 'Lloyd\'s of London',
    cedent: 'Oceanic Underwriters',
    premium: '$1,850,000',
    dates: '04/10/25 - 04/11/25'
  },
  {
    id: 'RC-2024-004',
    name: 'Workers Compensation Treaty',
    code: 'RC-2024-004',
    status: 'Status',
    reinsurer: 'Berkshire Hathaway Re',
    cedent: 'SafeWork Insurance Group',
    premium: '$6,200,000',
    dates: '01/30/25 - 01/31/25'
  },
  {
    id: 'RC-2024-005',
    name: 'Cyber Security Coverage 2024',
    code: 'RC-2024-005',
    status: 'Status',
    reinsurer: 'Hannover Re',
    cedent: 'TechShield Insurance',
    premium: '$3,100,000',
    dates: '05/20/25 - 05/21/25'
  }
];

const TransactionCard: React.FC<{
  transaction: Transaction;
  isSelected: boolean;
  onClick: () => void;
}> = ({ transaction, isSelected, onClick }) => {
  const colors = useSemanticColors();

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? colors.theme.primary300 : colors.blackAndWhite.white,
        border: `1px solid ${isSelected ? colors.theme.primary700 : colors.theme.primary400}`,
        borderRadius: borderRadius[8],
        padding: '12px 16px',
        cursor: 'pointer',
        marginBottom: '12px',
        position: 'relative',
        boxShadow: isSelected ? `0 0 0 1px ${colors.theme.primary700}` : 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease'
      }}
    >
      {/* Transaction Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div>
          <div style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black900,
            fontWeight: 500,
            marginBottom: '2px'
          }}>
            {transaction.name}
          </div>
          <div style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black500,
            marginBottom: '4px'
          }}>
            {transaction.code}
          </div>
          <Status
            variant={transaction.status === 'Renew' ? 'warning' : 'inactive'}
            text={transaction.status}
          />
        </div>
        <Selector
          variant="radio"
          checked={isSelected}
          onChange={onClick}
        />
      </div>

      {/* Divider line */}
      <div style={{
        height: '1px',
        backgroundColor: colors.theme.primary400,
        margin: '8px 0'
      }} />

      {/* Transaction Details */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '32px', paddingTop: '20px', paddingBottom: '15px' }}>
        <div style={{ flex: 1 }}>
          <div style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black900,
            marginBottom: '6px',
            display: 'flex',
            gap: '10px'
          }}>
            <span style={{ color: colors.blackAndWhite.black500, width: '60px', flexShrink: 0 }}>Reinsurer:</span>
            <span>{transaction.reinsurer}</span>
          </div>
          <div style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black900,
            display: 'flex',
            gap: '10px'
          }}>
            <span style={{ color: colors.blackAndWhite.black500, width: '60px', flexShrink: 0 }}>Cedent:</span>
            <span>{transaction.cedent}</span>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black900,
            marginBottom: '6px',
            display: 'flex',
            gap: '10px'
          }}>
            <span style={{ color: colors.blackAndWhite.black500, width: '60px', flexShrink: 0 }}>Premium:</span>
            <span>{transaction.premium}</span>
          </div>
          <div style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black900,
            display: 'flex',
            gap: '10px'
          }}>
            <span style={{ color: colors.blackAndWhite.black500, width: '60px', flexShrink: 0 }}>Dates:</span>
            <span>{transaction.dates}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const RenewalTransactionContent: React.FC<RenewalTransactionProps> = ({ onNavigateToPage }) => {
  const colors = useSemanticColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const filteredTransactions = mockTransactions.filter(transaction =>
    transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.reinsurer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedTransactionData = selectedTransaction ? {
    transactionName: selectedTransaction.name,
    subjectBusiness: 'Commercial Property',
    reinsurer: 'Swiss Re',
    totalPremium: '$19,500,000',
    contractingParties: {
      reinsurer: 'Swiss Re',
      cedingYnt: "Lloyd's of London"
    },
    reinsuranceTerms: {
      type: 'Treaty',
      form: 'Quota Share',
      quotaShare: '25%'
    },
    riskPeriod: {
      startDate: 'Dec 31, 2023',
      endDate: 'Dec 30, 2024',
      duration: '12 months'
    }
  } : null;

  return (
    <FormLayout
      formTitle="NEW TRANSACTION WORKFLOW"
      entryType="Renewal Transaction"
      showStatus={false}
      progress={0}
      selectedSidebarItem="reports"
      selectedSidebarSubitem="transactions"
      onNavigate={(itemId, subitemId) => {
        if (itemId === 'reports' && subitemId === 'transactions') {
          onNavigateToPage('transaction-management');
        } else if (itemId === 'reports' && subitemId === 'reports-explorer') {
          onNavigateToPage('report-navigation');
        } else if (itemId === 'analytics') {
          onNavigateToPage('analytics-valuation');
        } else if (itemId === 'contracts') {
          onNavigateToPage('contracts-explorer');
        }
      }}
    >
      {/* Header spanning full width */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        width: '100%'
      }}>
        <h1 style={{
          ...typography.styles.subheadingL,
          color: colors.blackAndWhite.black900,
          margin: 0
        }}>
          <span style={{ color: colors.theme.main }}>{filteredTransactions.length}</span> Transaction(s) found
        </h1>
        <Button
          variant="primary"
          color="black"
          icon={<PencilMedium />}
          disabled={!selectedTransaction}
          onClick={() => {
            if (selectedTransaction) {
              onNavigateToPage('new-transaction-form', {
                transactionName: `${selectedTransaction.name} - Renewal`,
                reinsurerName: selectedTransaction.reinsurer,
                cedingReinsurer: selectedTransaction.cedent,
                subjectBusiness: 'Commercial Property',
                premium: selectedTransaction.premium,
                originalTransactionId: selectedTransaction.id,
                isRenewal: true
              });
            } else {
              onNavigateToPage('new-transaction-form');
            }
          }}
          style={{
            height: '40px'
          }}
        >
          Create Renewal
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '32px', height: '100%' }}>
        {/* Left Panel - Transaction List */}
        <div style={{ flex: '1', width: '50%' }}>

          {/* Search Bar */}
          <div style={{ marginBottom: '24px' }}>
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by transaction name, ID, reinsurer, or subject business..."
            />
          </div>



          {/* Transaction Cards */}
          <div>
            {filteredTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                isSelected={selectedTransaction?.id === transaction.id}
                onClick={() => {
                  if (selectedTransaction?.id !== transaction.id) {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setSelectedTransaction(transaction);
                      setTimeout(() => setIsAnimating(false), 30);
                    }, 100);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Panel - Transaction Details */}
        <div style={{
          flex: '1',
          width: '50%',
          height: 'fit-content'
        }}>
          <div style={{
            backgroundColor: colors.blackAndWhite.white,
            border: `1px solid ${colors.theme.primary400}`,
            borderRadius: borderRadius[12],
            padding: '24px',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            opacity: isAnimating ? 0.7 : 1,
            transform: isAnimating ? 'scale(0.98)' : 'scale(1)',
            transition: 'all 0.1s ease-out'
          }}>
            {selectedTransaction ? (
              <div>
              {/* Title */}
              <div style={{
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h2 style={{
                  ...typography.styles.bodyL,
                  color: colors.blackAndWhite.black900,
                  margin: 0
                }}>
                  {selectedTransaction.name}
                </h2>
                <Status
                  variant={selectedTransaction.status === 'Renew' ? 'warning' : 'inactive'}
                  text={selectedTransaction.status}
                />
              </div>

          {/* Basic Info Section */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900,
              fontWeight: 500,
              marginBottom: '12px'
            }}>
              Basic Info
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black500 }}>
                  Transaction name
                </span>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black900 }}>
                  {selectedTransactionData.transactionName}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black500 }}>
                  Subject Business
                </span>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black900 }}>
                  {selectedTransactionData.subjectBusiness}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black500 }}>
                  Reinsurer
                </span>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black900 }}>
                  {selectedTransactionData.reinsurer}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black500 }}>
                  Total Premium
                </span>
                <span style={{
                  ...typography.styles.bodyS,
                  color: colors.success.textAndStrokes,
                  fontWeight: 600
                }}>
                  {selectedTransactionData.totalPremium}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{
            height: '1px',
            backgroundColor: colors.theme.primary400,
            margin: '20px 0'
          }} />

          {/* Contracting Parties Section */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900,
              fontWeight: 500,
              marginBottom: '12px'
            }}>
              Contracting Parties
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black500 }}>
                  Reinsurer
                </span>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black900 }}>
                  {selectedTransactionData.contractingParties.reinsurer}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black500 }}>
                  Ceding Ynt Insurer
                </span>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black900 }}>
                  {selectedTransactionData.contractingParties.cedingYnt}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{
            height: '1px',
            backgroundColor: colors.theme.primary400,
            margin: '20px 0'
          }} />

          {/* Reinsurance Terms Section */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900,
              fontWeight: 500,
              marginBottom: '12px'
            }}>
              Reinsurance Terms
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black500 }}>
                  Type
                </span>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black900 }}>
                  {selectedTransactionData.reinsuranceTerms.type}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black500 }}>
                  Form
                </span>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black900 }}>
                  {selectedTransactionData.reinsuranceTerms.form}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black500 }}>
                  Quota Share %
                </span>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black900 }}>
                  {selectedTransactionData.reinsuranceTerms.quotaShare}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{
            height: '1px',
            backgroundColor: colors.theme.primary400,
            margin: '20px 0'
          }} />

          {/* Risk Period Section */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900,
              fontWeight: 500,
              marginBottom: '12px'
            }}>
              Risk Period
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black500 }}>
                  Start Date:
                </span>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black900 }}>
                  {selectedTransactionData.riskPeriod.startDate}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black500 }}>
                  End Date:
                </span>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black900 }}>
                  {selectedTransactionData.riskPeriod.endDate}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black500 }}>
                  Duration:
                </span>
                <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black900 }}>
                  {selectedTransactionData.riskPeriod.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Renewal Process Warning */}
          <div style={{
            backgroundColor: colors.warning.fillLight,
            border: `1px solid ${colors.warning.containerStroke}`,
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            gap: '8px'
          }}>
            <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
              <StatusWarning color={colors.warning.textAndStrokes} />
            </div>
            <div>
              <div style={{
                ...typography.styles.bodyL,
                color: colors.warning.dark,
                fontWeight: 500,
                marginBottom: '2px'
              }}>
                Renewal Process
              </div>
              <div style={{
                ...typography.styles.bodyM,
                color: colors.blackAndWhite.black700,
                lineHeight: 1.3
              }}>
                When you proceed, this transaction's data will be used as the foundation for your renewal. You can modify any terms during the setup process to reflect changes for the new period.
              </div>
            </div>
          </div>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                color: colors.blackAndWhite.black500
              }}>
                <span style={{ ...typography.styles.bodyM }}>
                  Select a transaction on the left to view details
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </FormLayout>
  );
};

export const RenewalTransaction: React.FC<RenewalTransactionProps> = (props) => {
  return (
    <ThemeProvider initialTheme="reports">
      <RenewalTransactionContent {...props} />
    </ThemeProvider>
  );
};