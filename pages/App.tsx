import React, { useState } from 'react';
import { CashSettlement } from './CashSettlement';
import { ReportNavigation } from './ReportNavigation';

// Import base styles from the design library
import '@design-library/styles/base.css';

type PageType = 'cash-settlement' | 'report-navigation';

function App() {
  // Function to handle page navigation
  const setPage = (page: PageType) => {
    setCurrentPage(page);
  };
  const [currentPage, setCurrentPage] = useState<PageType>('report-navigation');

  const renderPage = () => {
    switch (currentPage) {
      case 'cash-settlement':
        return <CashSettlement onNavigateToPage={setPage} />;
      case 'report-navigation':
        return <ReportNavigation onNavigateToPage={setPage} />;
      default:
        return <CashSettlement />;
    }
  };

  return (
    <div>
      {renderPage()}
    </div>
  );
}

export default App;