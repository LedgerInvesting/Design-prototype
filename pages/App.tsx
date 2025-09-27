import React, { useState, useEffect } from 'react';
import { ReportsCashSettlement } from './ReportsCashSettlement';
import { ReportNavigation } from './ReportsExplorer';
import { ReportsTransactionManagement } from './ReportsTransactionManagement';
import { ReportsNewTransactionForm } from './ReportsNewTransactionForm';
import { ReportsRenewalTransaction } from './ReportsRenewalTransaction';
import { ReportsContractsExplorer } from './ReportsContractsExplorer';
import { ContractsAIExtraction } from './ContractsAIExtraction';
import { AnalyticsValuation } from './AnalyticsValuation';
import { AnalyticsValuationDashboard } from './AnalyticsValuationDashboard';
import { AnalyticsValuationConfiguration } from './AnalyticsValuationConfiguration';
import { AnalyticsValuationStatus } from './AnalyticsValuationStatus';
import { ReportsBDXUpload } from './ReportsBDXUpload';
import { MarketplaceOfferings } from './MarketplaceOfferings';

// Import base styles from the design library
import '@design-library/styles/base.css';
import { ThemeProvider } from '@design-library/tokens/ThemeProvider';
import { PrototypeSettingsProvider } from '@design-library/contexts';

type PageType = 'reports-cash-settlement' | 'reports-explorer' | 'reports-transaction-management' | 'reports-new-transaction-form' | 'reports-renewal-transaction' | 'reports-contracts-explorer' | 'contracts-ai-extraction' | 'analytics-valuation' | 'analytics-valuation-dashboard' | 'analytics-valuation-configuration' | 'analytics-valuation-status' | 'reports-bdx-upload' | 'marketplace-offerings';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    // Initialize from URL hash or default
    const hash = window.location.hash.slice(1) as PageType;
    return hash || 'marketplace-offerings';
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
      case 'reports-cash-settlement':
        return <ReportsCashSettlement onNavigateToPage={setPage} />;
      case 'reports-explorer':
        return <ReportNavigation onNavigateToPage={setPage} />;
      case 'reports-transaction-management':
        return <ReportsTransactionManagement onNavigateToPage={setPage} />;
      case 'reports-new-transaction-form':
        return <ReportsNewTransactionForm onNavigateToPage={setPage} renewalData={renewalData} />;
      case 'reports-renewal-transaction':
        return <ReportsRenewalTransaction onNavigateToPage={setPage} />;
      case 'reports-contracts-explorer':
        return <ReportsContractsExplorer onNavigateToPage={setPage} />;
      case 'contracts-ai-extraction':
        return <ContractsAIExtraction onNavigateToPage={setPage} />;
      case 'analytics-valuation':
        return <AnalyticsValuation onNavigateToPage={setPage} />;
      case 'analytics-valuation-dashboard':
        return <AnalyticsValuationDashboard onNavigateToPage={setPage} valuationData={valuationData} />;
      case 'analytics-valuation-configuration':
        return <AnalyticsValuationConfiguration onNavigateToPage={setPage} valuationData={valuationData} />;
      case 'analytics-valuation-status':
        return <AnalyticsValuationStatus onNavigateToPage={setPage} />;
      case 'reports-bdx-upload':
        return <ReportsBDXUpload onNavigateToPage={setPage} onInboxClick={() => console.log('Inbox clicked')} />;
      case 'marketplace-offerings':
        return <MarketplaceOfferings onNavigateToPage={setPage} />;
      default:
        return <MarketplaceOfferings onNavigateToPage={setPage} />;
    }
  };

  // Determine theme based on current page
  const getThemeForPage = (page: PageType): 'reports' | 'analytics' | 'marketplace' | 'contracts' => {
    if (page === 'analytics-valuation' || page === 'analytics-valuation-dashboard' || page === 'analytics-valuation-configuration' || page === 'analytics-valuation-status') {
      return 'analytics';
    }
    if (page === 'marketplace-offerings') {
      return 'marketplace';
    }
    if (page === 'reports-contracts-explorer' || page === 'contracts-ai-extraction') {
      return 'contracts';
    }
    // Default to reports theme for all other pages
    return 'reports';
  };

  return (
    <PrototypeSettingsProvider>
      <ThemeProvider initialTheme={getThemeForPage(currentPage)}>
        <div>
          {renderPage()}
        </div>
      </ThemeProvider>
    </PrototypeSettingsProvider>
  );
}

export default App;

