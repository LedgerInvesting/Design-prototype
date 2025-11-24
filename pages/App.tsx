import React, { useState, useEffect } from 'react';
import { HomeTest } from './HomeTest';
import { ReportsCashSettlement } from './ReportsCashSettlement';
import { ReportNavigation } from './ReportsExplorer';
import { ReportsInsightsExplorer } from './ReportsInsightsExplorer';
import { ReportsTransactionManagement } from './ReportsTransactionManagement';
import { ReportsNewTransactionForm } from './ReportsNewTransactionForm';
import { ReportsRenewalTransaction } from './ReportsRenewalTransaction';
import { ReportsContractsExplorer } from './ReportsContractsExplorer';
import { ContractsUpload } from './ContractsUpload';
import { ContractsAIExtraction } from './ContractsAIExtraction';
import { ContractsContractsList } from './ContractsContractsList';
import { ContractsTransactions } from './ContractsTransactions';
import { AnalyticsValuation } from './AnalyticsValuation';
import { AnalyticsValuationDashboard } from './AnalyticsValuationDashboard';
import { AnalyticsValuationConfiguration } from './AnalyticsValuationConfiguration';
import { AnalyticsValuationStatus } from './AnalyticsValuationStatus';
import { AnalyticsValuationEdit } from './AnalyticsValuationEdit';
import { AnalyticsAddValuationData } from './AnalyticsAddValuationData';
import { AnalyticsTriangle } from './AnalyticsTriangle';
import { AnalyticsTriangleDashboard } from './AnalyticsTriangleDashboard';
import { ReportsBDXUpload } from './ReportsBDXUpload';
import { ReportsCessionSummaryGeneration } from './ReportsCessionSummaryGeneration';
import { ReportsCessionStatement } from './ReportsCessionStatement';
import { MarketplaceOfferings } from './MarketplaceOfferings';
import ReportsInsightsProgramDetails from './ReportsInsightsProgramDetails';

// Import base styles from the design library
import '@design-library/styles/base.css';
import { ThemeProvider } from '@design-library/tokens/ThemeProvider';
import { PrototypeSettingsProvider, useSettings } from '@design-library/contexts';

type PageType = 'home' | 'reports-cash-settlement' | 'reports-explorer' | 'reports-insights-explorer' | 'reports-insights-program-details' | 'reports-transaction-management' | 'reports-new-transaction-form' | 'reports-renewal-transaction' | 'reports-contracts-explorer' | 'contracts-upload' | 'contracts-ai-extraction' | 'contracts-contracts-list' | 'contracts-transactions' | 'analytics-valuation' | 'analytics-valuation-dashboard' | 'analytics-valuation-configuration' | 'analytics-valuation-status' | 'analytics-valuation-edit' | 'analytics-add-valuation-data' | 'analytics-triangle' | 'analytics-triangle-dashboard' | 'reports-bdx-upload' | 'reports-bdx-configuration' | 'reports-cession-statement' | 'marketplace-offerings';

// Inner component that uses settings
function AppContent() {
  const settings = useSettings();
  const useSideNavTest = settings.uiExperiments.sidenavTest;

  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    // Initialize from URL hash or default to home
    const hash = window.location.hash.slice(1) as PageType;
    return hash || 'home';
  });
  const [valuationData, setValuationData] = useState<any>(null);
  const [renewalData, setRenewalData] = useState<any>(null);
  const [programDetailsData, setProgramDetailsData] = useState<any>(null);
  const [triangleData, setTriangleData] = useState<any>(null);
  const [currentEntityData, setCurrentEntityData] = useState<any>(null);
  const [cessionData, setCessionData] = useState<any>(null);
  const [contractsTransactionData, setContractsTransactionData] = useState<any>(null);
  const [contractsUploadData, setContractsUploadData] = useState<any>(null);

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
    console.log('setPage called:', page, 'with data:', data);
    setCurrentPage(page);
    // Update URL hash without triggering page reload
    window.history.pushState(null, '', `#${page}`);

    if (data) {
      if (page === 'new-transaction-form' || page === 'reports-new-transaction-form') {
        setRenewalData(data);
      } else if (page === 'reports-insights-program-details') {
        console.log('Setting programDetailsData:', data);
        setProgramDetailsData(data);
      } else if (page === 'analytics-triangle-dashboard') {
        console.log('Setting triangleData:', data);
        setTriangleData(data);
      } else if (page === 'reports-cash-settlement') {
        console.log('Setting currentEntityData:', data);
        setCurrentEntityData(data);
      } else if (page === 'reports-bdx-configuration') {
        console.log('Setting BDX configuration data:', data);
        setValuationData(data);
      } else if (page === 'reports-cession-statement') {
        console.log('Setting cession data:', data);
        setCessionData(data);
      } else if (page === 'contracts-upload') {
        console.log('Setting contracts upload data:', data);
        setContractsUploadData(data);
      } else if (page === 'contracts-contracts-list' || page === 'contracts-ai-extraction') {
        console.log('Setting contracts transaction data:', data);
        setContractsTransactionData(data);
      } else {
        setValuationData(data);
      }
    } else {
      console.log('No data provided for navigation to:', page);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeTest onNavigateToPage={setPage} />;
      case 'reports-cash-settlement':
        return <ReportsCashSettlement onNavigateToPage={setPage} entityData={currentEntityData} />;
      case 'reports-explorer':
        return <ReportNavigation onNavigateToPage={setPage} />;
      case 'reports-insights-explorer':
        return <ReportsInsightsExplorer onNavigateToPage={setPage} />;
      case 'reports-insights-program-details':
        return <ReportsInsightsProgramDetails key={programDetailsData?.id} programData={programDetailsData} onNavigateToPage={setPage} />;
      case 'reports-transaction-management':
        return <ReportsTransactionManagement onNavigateToPage={setPage} />;
      case 'reports-new-transaction-form':
        return <ReportsNewTransactionForm onNavigateToPage={setPage} renewalData={renewalData} />;
      case 'reports-renewal-transaction':
        return <ReportsRenewalTransaction onNavigateToPage={setPage} />;
      case 'reports-contracts-explorer':
        return <ReportsContractsExplorer onNavigateToPage={setPage} />;
      case 'contracts-upload':
        return <ContractsUpload onNavigateToPage={setPage} navigationData={contractsUploadData} />;
      case 'contracts-ai-extraction':
        return <ContractsAIExtraction onNavigateToPage={setPage} transactionData={contractsTransactionData} />;
      case 'contracts-contracts-list':
        return <ContractsContractsList onNavigateToPage={setPage} transactionData={contractsTransactionData} />;
      case 'contracts-transactions':
        return <ContractsTransactions onNavigateToPage={setPage} />;
      case 'analytics-valuation':
        return <AnalyticsValuation onNavigateToPage={setPage} />;
      case 'analytics-valuation-dashboard':
        return <AnalyticsValuationDashboard onNavigateToPage={setPage} valuationData={valuationData} />;
      case 'analytics-valuation-configuration':
        return <AnalyticsValuationConfiguration onNavigateToPage={setPage} valuationData={valuationData} />;
      case 'analytics-valuation-status':
        return <AnalyticsValuationStatus onNavigateToPage={setPage} />;
      case 'analytics-valuation-edit':
        return <AnalyticsValuationEdit onNavigateToPage={setPage} />;
      case 'analytics-add-valuation-data':
        return <AnalyticsAddValuationData onNavigateToPage={setPage} />;
      case 'analytics-triangle':
        return <AnalyticsTriangle onNavigateToPage={setPage} />;
      case 'analytics-triangle-dashboard':
        return <AnalyticsTriangleDashboard onNavigateToPage={setPage} triangleName={triangleData?.triangleName} />;
      case 'reports-bdx-upload':
        return <ReportsBDXUpload onNavigateToPage={setPage} onInboxClick={() => console.log('Inbox clicked')} />;
      case 'reports-bdx-configuration':
        return <ReportsCessionSummaryGeneration onNavigateToPage={setPage} uploadData={valuationData} />;
      case 'reports-cession-statement':
        return <ReportsCessionStatement onNavigateToPage={setPage} cessionData={cessionData} />;
      case 'marketplace-offerings':
        return <MarketplaceOfferings onNavigateToPage={setPage} />;
      default:
        return <HomeTest onNavigateToPage={setPage} />;
    }
  };

  // Determine theme based on current page
  const getThemeForPage = (page: PageType): 'reports' | 'analytics' | 'marketplace' | 'contracts' => {
    if (page === 'analytics-valuation' || page === 'analytics-valuation-dashboard' || page === 'analytics-valuation-configuration' || page === 'analytics-valuation-status' || page === 'analytics-valuation-edit' || page === 'analytics-add-valuation-data' || page === 'analytics-triangle' || page === 'analytics-triangle-dashboard') {
      return 'analytics';
    }
    if (page === 'marketplace-offerings') {
      return 'marketplace';
    }
    if (page === 'reports-contracts-explorer' || page === 'contracts-upload' || page === 'contracts-ai-extraction' || page === 'contracts-contracts-list' || page === 'contracts-transactions') {
      return 'contracts';
    }
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

// Main App wrapper with Provider
function App() {
  return (
    <PrototypeSettingsProvider>
      <AppContent />
    </PrototypeSettingsProvider>
  );
}

export default App;

