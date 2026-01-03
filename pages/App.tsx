import React, { useState, useEffect } from 'react';
import { HomeTest } from './HomeTest';
import { TransactionHome } from './transaction-view/TransactionHome';
import { AllTransactions } from './transaction-view/AllTransactions';
import { TransactionDetail } from './transaction-view/TransactionDetail';
import { TransactionDashboard } from './transaction-view/TransactionDashboard';
import { TransactionUploadSettings } from './transaction-view/TransactionUploadSettings';
import { ReportsCashSettlement } from './transaction-view/ReportsCashSettlement';
import { ReportsCashSettlementDetail } from './transaction-view/ReportsCashSettlementDetail';
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
import { ReportsBDXDetailMapping } from './transaction-view/ReportsBDXDetailMapping';
import { TransactionBDXAggregatedMapping } from './transaction-view/TransactionBDXAggregatedMapping';
import { ReportsCessionSummaryGeneration } from './ReportsCessionSummaryGeneration';
import { ReportsCessionStatement } from './transaction-view/ReportsCessionStatement';
import { ReportsCellLevelSummary } from './transaction-view/ReportsCellLevelSummary';
import { MarketplaceOfferings } from './MarketplaceOfferings';
import ReportsInsightsProgramDetails from './ReportsInsightsProgramDetails';

// Import base styles from the design library
import '@design-library/styles/base.css';
import { ThemeProvider } from '@design-library/tokens/ThemeProvider';
import { PrototypeSettingsProvider, useSettings } from '@design-library/contexts';

type PageType = 'home' | 'all-transactions' | 'notifications' | 'apps' | 'transaction-detail' | 'transaction-dashboard' | 'transaction-upload-settings' | 'reports-cash-settlement' | 'reports-cash-settlement-detail' | 'reports-cell-level-summary' | 'reports-explorer' | 'reports-insights-explorer' | 'reports-insights-program-details' | 'reports-transaction-management' | 'reports-new-transaction-form' | 'reports-renewal-transaction' | 'reports-contracts-explorer' | 'contracts-upload' | 'contracts-ai-extraction' | 'contracts-contracts-list' | 'contracts-transactions' | 'analytics-valuation' | 'analytics-valuation-dashboard' | 'analytics-valuation-configuration' | 'analytics-valuation-status' | 'analytics-valuation-edit' | 'analytics-add-valuation-data' | 'analytics-triangle' | 'analytics-triangle-dashboard' | 'reports-bdx-upload' | 'reports-bdx-detail-mapping' | 'transaction-bdx-aggregated-mapping' | 'reports-cession-summary-generation' | 'reports-cession-statement' | 'marketplace-offerings';

// Inner component that uses settings
function AppContent() {
  const settings = useSettings();
  const useSideNavTest = settings.uiExperiments.sidenavTest;

  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    // Initialize from URL hash or default to home
    const hash = window.location.hash.slice(1) as PageType;
    return hash || 'home';
  });
  const [navigationCounter, setNavigationCounter] = useState(0); // Force re-render on navigation
  const [valuationData, setValuationData] = useState<any>(null);
  const [renewalData, setRenewalData] = useState<any>(null);
  const [programDetailsData, setProgramDetailsData] = useState<any>(null);
  const [triangleData, setTriangleData] = useState<any>(null);
  const [currentEntityData, setCurrentEntityData] = useState<any>(null);
  const [cessionData, setCessionData] = useState<any>(null);
  const [contractsTransactionData, setContractsTransactionData] = useState<any>(null);
  const [contractsUploadData, setContractsUploadData] = useState<any>(null);
  const [bdxUploadData, setBdxUploadData] = useState<any>(null);
  const [transactionDetailData, setTransactionDetailData] = useState<any>(null);
  const [uploadSettingsData, setUploadSettingsData] = useState<any>(null);

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
    setNavigationCounter(prev => prev + 1); // Increment to force re-render
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
      } else if (page === 'reports-cash-settlement' || page === 'reports-cash-settlement-detail') {
        console.log('Setting cession data for cash settlement:', data);
        setCessionData(data);
      } else if (page === 'reports-cession-summary-generation') {
        console.log('Setting Cession Summary Generation data:', data);
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
      } else if (page === 'reports-bdx-upload' || page === 'reports-bdx-detail-mapping' || page === 'transaction-bdx-aggregated-mapping') {
        console.log('Setting BDX upload data:', data);
        setBdxUploadData(data);
      } else if (page === 'transaction-detail') {
        console.log('Setting transaction detail data:', data);
        setTransactionDetailData(data);
      } else if (page === 'transaction-upload-settings') {
        console.log('Setting upload settings data:', data);
        setUploadSettingsData(data);
      } else {
        setValuationData(data);
      }
    } else {
      console.log('No data provided for navigation to:', page);
    }
  };

  const renderPage = () => {
    // Use transaction-view components when transactionsView is enabled
    const useTransactionsView = settings.uiExperiments.transactionsView;

    switch (currentPage) {
      case 'home':
        return useTransactionsView
          ? <TransactionHome onNavigateToPage={setPage} />
          : <HomeTest onNavigateToPage={setPage} />;
      case 'all-transactions':
        return <AllTransactions onNavigateToPage={setPage} />;
      case 'transaction-detail':
        // Get current transaction from sessionStorage to ensure fresh data and force re-render when transaction changes
        let transactionKey = 'default';
        if (typeof window !== 'undefined') {
          const currentTransaction = sessionStorage.getItem('currentTransaction');
          if (currentTransaction) {
            try {
              transactionKey = JSON.parse(currentTransaction).id;
            } catch (e) {
              console.error('Error parsing current transaction:', e);
            }
          }
        }
        return <TransactionDetail key={transactionKey} onNavigateToPage={setPage} transactionId={transactionDetailData?.id} transactionName={transactionDetailData?.name} />;
      case 'transaction-dashboard':
        // Get current transaction from sessionStorage for dashboard
        // Include navigationCounter to force re-render when navigating between transactions
        let dashboardKey = `default-${navigationCounter}`;
        if (typeof window !== 'undefined') {
          const currentTransaction = sessionStorage.getItem('currentTransaction');
          if (currentTransaction) {
            try {
              dashboardKey = `${JSON.parse(currentTransaction).id}-${navigationCounter}`;
            } catch (e) {
              console.error('Error parsing current transaction:', e);
            }
          }
        }
        return <TransactionDashboard key={dashboardKey} onNavigateToPage={setPage} />;
      case 'transaction-upload-settings':
        return <TransactionUploadSettings
          onNavigateToPage={setPage}
          transactionName={uploadSettingsData?.transactionName}
          initialTab={uploadSettingsData?.initialTab}
        />;
      case 'notifications':
        // TODO: Create notifications page
        return <div style={{ padding: '40px', color: 'white' }}>Notifications page - Coming soon</div>;
      case 'apps':
        // TODO: Create apps page
        return <div style={{ padding: '40px', color: 'white' }}>Apps page - Coming soon</div>;
      case 'reports-explorer':
        return <ReportNavigation onNavigateToPage={setPage} />;
      case 'reports-insights-explorer':
        return <ReportsInsightsExplorer onNavigateToPage={setPage} />;
      case 'reports-insights-program-details':
        return <ReportsInsightsProgramDetails key={programDetailsData?.id} programData={programDetailsData} onNavigateToPage={setPage} />;
      case 'reports-transaction-management':
        return useTransactionsView
          ? <AllTransactions onNavigateToPage={setPage} />
          : <ReportsTransactionManagement onNavigateToPage={setPage} />;
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
        return <ReportsBDXUpload onNavigateToPage={setPage} onInboxClick={() => console.log('Inbox clicked')} transactionData={bdxUploadData} />;
      case 'reports-bdx-detail-mapping':
        return <ReportsBDXDetailMapping onNavigateToPage={setPage} transactionData={bdxUploadData} />;
      case 'transaction-bdx-aggregated-mapping':
        return <TransactionBDXAggregatedMapping onNavigateToPage={setPage} transactionData={bdxUploadData} />;
      case 'reports-cession-summary-generation':
        return <ReportsCessionSummaryGeneration onNavigateToPage={setPage} uploadData={valuationData} />;
      case 'reports-cession-statement':
        return <ReportsCessionStatement onNavigateToPage={setPage} entityData={cessionData} source={cessionData?.source} flowType={cessionData?.flowType} />;
      case 'reports-cash-settlement':
        return <ReportsCashSettlement onNavigateToPage={setPage} cessionData={cessionData} flowType={cessionData?.flowType} />;
      case 'reports-cash-settlement-detail':
        return <ReportsCashSettlementDetail onNavigateToPage={setPage} cessionData={cessionData} flowType={cessionData?.flowType} />;
      case 'reports-cell-level-summary':
        return <ReportsCellLevelSummary onNavigateToPage={setPage} />;
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

