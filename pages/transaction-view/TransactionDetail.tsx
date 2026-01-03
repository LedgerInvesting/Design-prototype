import React, { useState, useEffect } from 'react';
import { Layout } from '@design-library/pages';
import { colors, typography } from '@design-library/tokens';
import { createPageNavigationHandler } from '@design-library/utils/navigation';

interface TransactionDetailProps {
  onNavigateToPage: (page: string, data?: any) => void;
  transactionId?: string;
  transactionName?: string;
}

/**
 * Transaction Detail Page
 *
 * Displays detailed information for a single transaction.
 * Currently a placeholder - will be built out with full transaction details.
 */
export const TransactionDetail: React.FC<TransactionDetailProps> = ({
  onNavigateToPage,
  transactionId,
  transactionName
}) => {
  const [transaction, setTransaction] = useState<{ id: string; name: string } | null>(null);

  // Load transaction data from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTransaction = sessionStorage.getItem('currentTransaction');
      if (storedTransaction) {
        try {
          const parsedTransaction = JSON.parse(storedTransaction);
          setTransaction(parsedTransaction);
        } catch (e) {
          console.error('Error parsing transaction data:', e);
        }
      }
    }
  }, []);
  const displayName = transaction?.name || transactionName || 'Transaction Detail';

  return (
    <Layout
      pageType="transaction-detail"
      selectedSidebarItem="" // Don't highlight any menu item, only the transaction in the list
      onNavigate={(itemId, subitemId, pageType) => {
        console.log('TransactionDetail onNavigate:', itemId, subitemId, pageType);
        if (pageType) {
          onNavigateToPage(pageType);
        } else if (itemId === 'all-transactions') {
          onNavigateToPage('all-transactions');
        } else if (itemId === 'notifications') {
          onNavigateToPage('notifications');
        } else if (itemId === 'apps') {
          onNavigateToPage('apps');
        } else if (itemId === 'home') {
          onNavigateToPage('home');
        } else {
          // Fallback to createPageNavigationHandler for other navigation
          createPageNavigationHandler(onNavigateToPage || (() => {}), 'transaction-detail')(itemId, subitemId, pageType);
        }
      }}
      breadcrumbs={[
        { label: 'All Transactions', onClick: () => onNavigateToPage('all-transactions'), isActive: false },
        { label: displayName, isActive: true }
      ]}
      isSubPage={true}
      onBackClick={() => onNavigateToPage('all-transactions')}
    >
      <div style={{
        width: '100%',
        minHeight: 'calc(100vh - 240px)',
        backgroundColor: colors.blackAndWhite.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          ...typography.styles.bodyL,
          color: colors.blackAndWhite.black300,
          textAlign: 'center'
        }}>
          Transaction Detail - Coming Soon
          {transaction && (
            <div style={{
              ...typography.styles.bodyS,
              color: colors.blackAndWhite.black200,
              marginTop: '8px'
            }}>
              {transaction.name} (ID: {transaction.id})
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TransactionDetail;
