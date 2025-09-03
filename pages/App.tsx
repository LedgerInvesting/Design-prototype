import React, { useState } from 'react';
import { CashSettlement } from './CashSettlement';
import { ReportNavigation } from './ReportNavigation';
import { TransactionManagement } from './TransactionManagement';
import { NewTransactionForm } from './NewTransactionForm';

// Import base styles from the design library
import '@design-library/styles/base.css';

type PageType = 'cash-settlement' | 'report-navigation' | 'transaction-management' | 'new-transaction-form';

function App() {
  // Function to handle page navigation
  const setPage = (page: PageType) => {
    setCurrentPage(page);
  };
  const [currentPage, setCurrentPage] = useState<PageType>('transaction-management');

  const renderPage = () => {
    switch (currentPage) {
      case 'cash-settlement':
        return <CashSettlement onNavigateToPage={setPage} />;
      case 'report-navigation':
        return <ReportNavigation onNavigateToPage={setPage} />;
      case 'transaction-management':
        return <TransactionManagement onNavigateToPage={setPage} />;
      case 'new-transaction-form':
        return <NewTransactionForm />;
      default:
        return <TransactionManagement onNavigateToPage={setPage} />;
    }
  };

  return (
    <div>
      {renderPage()}
    </div>
  );
}

export default App;