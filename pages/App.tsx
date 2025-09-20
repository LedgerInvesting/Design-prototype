import React, { useState } from 'react';
import { CashSettlement } from './CashSettlement';
import { ReportNavigation } from './ReportNavigation';
import { TransactionManagement } from './TransactionManagement';
import { NewTransactionForm } from './NewTransactionForm';
import { RenewalTransaction } from './RenewalTransaction';
import { ContractsExplorer } from './ContractsExplorer';
import { AnalyticsValuation } from './AnalyticsValuation';
import { ValuationDashboard } from './ValuationDashboard';
import { ValuationConfiguration } from './ValuationConfiguration';
import { ValuationStatus } from './ValuationStatus';

// Import base styles from the design library
import '@design-library/styles/base.css';
import { ThemeProvider } from '@design-library/tokens/ThemeProvider';

type PageType = 'cash-settlement' | 'report-navigation' | 'transaction-management' | 'new-transaction-form' | 'renewal-transaction' | 'contracts-explorer' | 'analytics-valuation' | 'valuation-dashboard' | 'valuation-configuration' | 'valuation-status';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('transaction-management');
  const [valuationData, setValuationData] = useState<any>(null);
  const [renewalData, setRenewalData] = useState<any>(null);

  // Function to handle page navigation with optional data
  const setPage = (page: PageType, data?: any) => {
    setCurrentPage(page);
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
      default:
        return <TransactionManagement onNavigateToPage={setPage} />;
    }
  };

  return (
    <ThemeProvider initialTheme="reports">
      <div>
        {renderPage()}
      </div>
    </ThemeProvider>
  );
}

export default App;