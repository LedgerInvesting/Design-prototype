// Centralized navigation utilities
// This file contains all navigation logic to avoid updating pages individually

export type PageType =
  | 'reports-explorer'
  | 'reports-transaction-management'
  | 'reports-new-transaction-form'
  | 'reports-renewal-transaction'
  | 'reports-cash-settlement'
  | 'reports-bdx-upload'
  | 'reports-contracts-explorer'
  | 'contracts-ai-extraction'
  | 'analytics-valuation'
  | 'analytics-valuation-dashboard'
  | 'analytics-valuation-configuration'
  | 'analytics-valuation-status'
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
        onNavigateToPage('reports-transaction-management');
      } else if (subitemId === 'reports-explorer') {
        onNavigateToPage('reports-explorer');
      } else if (subitemId === 'bdx-upload') {
        onNavigateToPage('reports-bdx-upload');
      }
    }
    // Handle Contracts navigation
    else if (itemId === 'contracts') {
      if (subitemId === 'contracts') {
        onNavigateToPage('contracts-ai-extraction');
      } else if (subitemId === 'start') {
        onNavigateToPage('contracts-ai-extraction');
      } else if (subitemId === 'contracts-explorer') {
        onNavigateToPage('contracts-explorer');
      }
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
        if (currentPage === 'reports-transaction-management') {
          console.log('Already on transaction management page');
        } else {
          onNavigateToPage('reports-transaction-management');
        }
      } else if (subitemId === 'reports-explorer') {
        if (currentPage === 'reports-explorer') {
          console.log('Already on report navigation page');
        } else {
          onNavigateToPage('reports-explorer');
        }
      } else if (subitemId === 'bdx-upload') {
        if (currentPage === 'reports-bdx-upload') {
          console.log('Already on BDX upload page');
        } else {
          onNavigateToPage('reports-bdx-upload');
        }
      }
    }
    // Handle Contracts navigation
    else if (itemId === 'contracts') {
      if (subitemId === 'contracts') {
        onNavigateToPage('contracts-ai-extraction');
      } else if (subitemId === 'start') {
        onNavigateToPage('contracts-ai-extraction');
      } else if (subitemId === 'contracts-explorer') {
        onNavigateToPage('contracts-explorer');
      }
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
      { label: 'REPORTS EXPLORER', onClick: () => onNavigateToPage('reports-explorer'), isActive: false },
      { label: 'CESSION AND COLLATERAL', isActive: true }
    ]
  },
  contracts: {
    start: () => [{ label: 'Contracts', isActive: true }],
    explorer: (onNavigateToPage: NavigationHandler) => [
      { label: 'REPORTS EXPLORER', onClick: () => onNavigateToPage('reports-explorer'), isActive: false },
      { label: 'Contracts', isActive: true }
    ]
  },
  marketplace: {
    offerings: () => [{ label: 'Offerings', isActive: true }]
  }
};