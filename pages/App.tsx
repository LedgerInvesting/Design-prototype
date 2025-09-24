import React, { useState, useEffect } from 'react';
import { CashSettlement } from './CashSettlement';
import { ReportNavigation } from './ReportsExplorer';
import { TransactionManagement } from './TransactionManagement';
import { NewTransactionForm } from './NewTransactionForm';
import { RenewalTransaction } from './RenewalTransaction';
import { ContractsExplorer } from './ContractsExplorer';
import { AnalyticsValuation } from './AnalyticsValuation';
import { ValuationDashboard } from './ValuationDashboard';
import { ValuationConfiguration } from './ValuationConfiguration';
import { ValuationStatus } from './ValuationStatus';
import { BDXUpload } from './BDXUpload';

// Import base styles from the design library
import '@design-library/styles/base.css';
import { ThemeProvider } from '@design-library/tokens/ThemeProvider';

type PageType = 'cash-settlement' | 'report-navigation' | 'transaction-management' | 'new-transaction-form' | 'renewal-transaction' | 'contracts-explorer' | 'analytics-valuation' | 'valuation-dashboard' | 'valuation-configuration' | 'valuation-status' | 'bdx-upload';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    // Initialize from URL hash or default
    const hash = window.location.hash.slice(1) as PageType;
    return hash || 'report-navigation';
  });
  const [valuationData, setValuationData] = useState<any>(null);
  const [renewalData, setRenewalData] = useState<any>(null);

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1) as PageType;
      if (hash) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Function to handle page navigation with optional data
  const setPage = (page: PageType, data?: any) => {
    setCurrentPage(page);
    // Update URL hash without triggering page reload
    window.history.pushState(null, '', `#${page}`);

    if (data) {
      if (page === 'new-transaction-form') {
        setRenewalData(data);
      } else {
        setValuationData(data);
      }
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'cash-settlement':
        return <CashSettlement onNavigateToPage={setPage} />;
      case 'report-navigation':
        return <ReportNavigation onNavigateToPage={setPage} />;
      case 'transaction-management':
        return <TransactionManagement onNavigateToPage={setPage} />;
      case 'new-transaction-form':
        return <NewTransactionForm onNavigateToPage={setPage} renewalData={renewalData} />;
      case 'renewal-transaction':
        return <RenewalTransaction onNavigateToPage={setPage} />;
      case 'contracts-explorer':
        return <ContractsExplorer onNavigateToPage={setPage} />;
      case 'analytics-valuation':
        return <AnalyticsValuation onNavigateToPage={setPage} />;
      case 'valuation-dashboard':
        return <ValuationDashboard onNavigateToPage={setPage} valuationData={valuationData} />;
      case 'valuation-configuration':
        return <ValuationConfiguration onNavigateToPage={setPage} valuationData={valuationData} />;
      case 'valuation-status':
        return <ValuationStatus onNavigateToPage={setPage} />;
      case 'bdx-upload':
        return <BDXUpload onNavigate={(page, subpage) => {
          if (page === 'transaction-management') {
            setPage('transaction-management');
          } else if (page === 'report-navigation') {
            setPage('report-navigation');
          } else if (page === 'analytics-valuation') {
            setPage('analytics-valuation');
          } else if (page === 'contracts-explorer') {
            setPage('contracts-explorer');
          }
        }} onInboxClick={() => console.log('Inbox clicked')} />;
      default:
        return <TransactionManagement onNavigateToPage={setPage} />;
    }
  };

  // Determine theme based on current page
  const getThemeForPage = (page: PageType): 'reports' | 'analytics' | 'marketplace' => {
    if (page === 'analytics-valuation' || page === 'valuation-dashboard' || page === 'valuation-configuration' || page === 'valuation-status') {
      return 'analytics';
    }
    // Add marketplace pages here when they exist
    // Default to reports theme for all other pages
    return 'reports';
  };

  return (
    <ThemeProvider initialTheme={getThemeForPage(currentPage)}>
      <div>
        {renderPage()}
      </div>
    </ThemeProvider>
  );
}

export default App;