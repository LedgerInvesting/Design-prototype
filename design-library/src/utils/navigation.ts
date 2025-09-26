// Centralized navigation utilities
// This file contains all navigation logic to avoid updating pages individually

export type PageType =
  | 'report-navigation'
  | 'transaction-management'
  | 'new-transaction-form'
  | 'renewal-transaction'
  | 'contracts-explorer'
  | 'analytics-valuation'
  | 'valuation-dashboard'
  | 'valuation-configuration'
  | 'valuation-status'
  | 'bdx-upload'
  | 'cash-settlement'
  | 'marketplace-offerings';

export interface NavigationHandler {
  (page: PageType, data?: any): void;
}

/**
 * Creates a standardized navigation handler for any page
 * @param onNavigateToPage - Function to navigate to pages
 * @returns Navigation handler function compatible with Layout components
 */
export const createNavigationHandler = (onNavigateToPage: NavigationHandler) => {
  return (itemId: string, subitemId?: string) => {
    console.log('Navigate to:', itemId, subitemId);

    // Handle Analytics navigation
    if (itemId === 'analytics') {
      if (subitemId === 'valuation') {
        onNavigateToPage('analytics-valuation');
      }
    }
    // Handle Reports navigation
    else if (itemId === 'reports') {
      if (subitemId === 'transactions') {
        onNavigateToPage('transaction-management');
      } else if (subitemId === 'reports-explorer') {
        onNavigateToPage('report-navigation');
      } else if (subitemId === 'bdx-upload') {
        onNavigateToPage('bdx-upload');
      }
    }
    // Handle Contracts navigation - disabled until contracts page is implemented
    else if (itemId === 'contracts') {
      console.log('Contracts navigation disabled - page not implemented yet');
      return; // Don't navigate anywhere
    }
    // Handle Marketplace navigation
    else if (itemId === 'marketplace') {
      if (subitemId === 'offerings') {
        onNavigateToPage('marketplace-offerings');
      }
    }
    // Handle other navigation items
    else {
      console.log('Unhandled navigation:', itemId, subitemId);
    }
  };
};

/**
 * Creates page-specific navigation handlers that include current page awareness
 * @param onNavigateToPage - Function to navigate to pages
 * @param currentPage - Current page identifier for self-navigation handling
 * @returns Navigation handler with current page context
 */
export const createPageNavigationHandler = (
  onNavigateToPage: NavigationHandler,
  currentPage: PageType
) => {
  return (itemId: string, subitemId?: string) => {
    console.log('Navigate to:', itemId, subitemId);

    // Handle Analytics navigation
    if (itemId === 'analytics') {
      if (subitemId === 'valuation') {
        if (currentPage === 'analytics-valuation') {
          console.log('Already on analytics valuation page');
        } else {
          onNavigateToPage('analytics-valuation');
        }
      }
    }
    // Handle Reports navigation
    else if (itemId === 'reports') {
      if (subitemId === 'transactions') {
        if (currentPage === 'transaction-management') {
          console.log('Already on transaction management page');
        } else {
          onNavigateToPage('transaction-management');
        }
      } else if (subitemId === 'reports-explorer') {
        if (currentPage === 'report-navigation') {
          console.log('Already on report navigation page');
        } else {
          onNavigateToPage('report-navigation');
        }
      } else if (subitemId === 'bdx-upload') {
        if (currentPage === 'bdx-upload') {
          console.log('Already on BDX upload page');
        } else {
          onNavigateToPage('bdx-upload');
        }
      }
    }
    // Handle Contracts navigation - disabled until contracts page is implemented
    else if (itemId === 'contracts') {
      console.log('Contracts navigation disabled - page not implemented yet');
      return; // Don't navigate anywhere
    }
    // Handle Marketplace navigation
    else if (itemId === 'marketplace') {
      if (subitemId === 'offerings') {
        if (currentPage === 'marketplace-offerings') {
          console.log('Already on marketplace offerings page');
        } else {
          onNavigateToPage('marketplace-offerings');
        }
      }
    }
    // Handle other navigation items
    else {
      console.log('Unhandled navigation:', itemId, subitemId);
    }
  };
};

/**
 * Breadcrumb helper functions for common navigation patterns
 */
export const createBreadcrumbs = {
  analytics: {
    valuation: () => [{ label: 'Valuation', isActive: true }],
    dashboard: (programName: string, onNavigateToPage: NavigationHandler) => [
      { label: 'Valuation', onClick: () => onNavigateToPage('analytics-valuation'), isActive: false },
      { label: programName, isActive: true }
    ],
    status: (programName: string, onNavigateToPage: NavigationHandler) => [
      { label: 'Valuation', onClick: () => onNavigateToPage('analytics-valuation'), isActive: false },
      { label: programName, onClick: () => onNavigateToPage('valuation-dashboard'), isActive: false },
      { label: 'Valuation Status', isActive: true }
    ],
    configuration: (programName: string, onNavigateToPage: NavigationHandler) => [
      { label: 'Valuation', onClick: () => onNavigateToPage('analytics-valuation'), isActive: false },
      { label: programName, onClick: () => onNavigateToPage('valuation-dashboard'), isActive: false },
      { label: 'Configuration', isActive: true }
    ]
  },
  reports: {
    transactions: () => [{ label: 'Transaction Management', isActive: true }],
    explorer: () => [{ label: 'Reports Explorer', isActive: true }],
    bdxUpload: () => [{ label: 'BDX UPLOAD', isActive: true }],
    cashSettlement: (onNavigateToPage: NavigationHandler) => [
      { label: 'REPORTS EXPLORER', onClick: () => onNavigateToPage('report-navigation'), isActive: false },
      { label: 'CESSION AND COLLATERAL', isActive: true }
    ]
  },
  contracts: {
    explorer: (onNavigateToPage: NavigationHandler) => [
      { label: 'REPORTS EXPLORER', onClick: () => onNavigateToPage('report-navigation'), isActive: false },
      { label: 'CONTRACTS', isActive: true }
    ]
  },
  marketplace: {
    offerings: () => [{ label: 'Marketplace', isActive: false }, { label: 'Offerings', isActive: true }]
  }
};