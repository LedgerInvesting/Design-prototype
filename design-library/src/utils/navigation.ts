// Centralized navigation utilities
// This file contains all navigation logic to avoid updating pages individually

export type PageType =
  | 'home'
  | 'reports-explorer'
  | 'reports-insights-explorer'
  | 'reports-insights-program-details'
  | 'reports-transaction-management'
  | 'reports-new-transaction-form'
  | 'reports-renewal-transaction'
  | 'reports-cash-settlement'
  | 'reports-bdx-upload'
  | 'reports-contracts-explorer'
  | 'contracts-upload'
  | 'contracts-ai-extraction'
  | 'contracts-transactions'
  | 'analytics-valuation'
  | 'analytics-valuation-dashboard'
  | 'analytics-valuation-configuration'
  | 'analytics-valuation-status'
  | 'analytics-valuation-edit'
  | 'analytics-add-valuation-data'
  | 'analytics-triangle'
  | 'analytics-triangle-dashboard'
  | 'marketplace-offerings';

export interface NavigationHandler {
  (page: PageType, data?: any): void;
}

/**
 * Wrapper for onNavigateToPage that sets navigation source for contextual back buttons
 */
export const navigateToPage = (onNavigateToPage: NavigationHandler, page: PageType, data?: any) => {
  if (typeof window !== 'undefined') {
    // Set navigation source as 'page' when navigating from within the app
    sessionStorage.setItem('navigationSource', 'page');
  }
  onNavigateToPage(page, data);
};

/**
 * Creates a standardized navigation handler for any page
 * @param onNavigateToPage - Function to navigate to pages
 * @returns Navigation handler function compatible with Layout components
 */
export const createNavigationHandler = (onNavigateToPage: NavigationHandler) => {
  return (itemId: string, subitemId?: string, pageType?: string) => {
    console.log('Navigate to:', itemId, subitemId, 'pageType:', pageType);

    // Valid page types
    const validPageTypes: PageType[] = [
      'home',
      'reports-explorer',
      'reports-insights-explorer',
      'reports-insights-program-details',
      'reports-transaction-management',
      'reports-new-transaction-form',
      'reports-renewal-transaction',
      'reports-cash-settlement',
      'reports-bdx-upload',
      'reports-contracts-explorer',
      'contracts-upload',
      'contracts-ai-extraction',
      'contracts-transactions',
      'analytics-valuation',
      'analytics-valuation-dashboard',
      'analytics-valuation-configuration',
      'analytics-valuation-status',
      'analytics-triangle',
      'analytics-triangle-dashboard',
      'marketplace-offerings'
    ];

    // If a specific page type is provided (from localStorage), validate and navigate directly to it
    if (pageType && validPageTypes.includes(pageType as PageType)) {
      onNavigateToPage(pageType as PageType);
      return;
    }

    // Handle Home navigation
    if (itemId === 'home') {
      onNavigateToPage('home');
    }
    // Handle Analytics navigation
    else if (itemId === 'analytics') {
      if (subitemId === 'valuation') {
        onNavigateToPage('analytics-valuation');
      } else if (subitemId === 'triangle') {
        onNavigateToPage('analytics-triangle');
      }
    }
    // Handle Reports navigation
    else if (itemId === 'reports') {
      if (subitemId === 'transactions') {
        onNavigateToPage('reports-transaction-management');
      } else if (subitemId === 'reports-explorer') {
        onNavigateToPage('reports-explorer');
      } else if (subitemId === 'insights-explorer') {
        onNavigateToPage('reports-insights-explorer');
      } else if (subitemId === 'bdx-upload') {
        onNavigateToPage('reports-bdx-upload');
      }
    }
    // Handle Contracts navigation
    else if (itemId === 'contracts') {
      if (subitemId === 'upload') {
        onNavigateToPage('contracts-upload');
      } else if (subitemId === 'ai-extraction') {
        onNavigateToPage('contracts-ai-extraction');
      } else if (subitemId === 'transactions') {
        onNavigateToPage('contracts-transactions');
      } else if (subitemId === 'contracts') {
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

    // Handle Home navigation
    if (itemId === 'home') {
      if (currentPage === 'home') {
        console.log('Already on home page');
      } else {
        onNavigateToPage('home');
      }
    }
    // Handle Analytics navigation
    else if (itemId === 'analytics') {
      if (subitemId === 'valuation') {
        if (currentPage === 'analytics-valuation') {
          console.log('Already on analytics valuation page');
        } else {
          onNavigateToPage('analytics-valuation');
        }
      } else if (subitemId === 'triangle') {
        if (currentPage === 'analytics-triangle') {
          console.log('Already on analytics triangle page');
        } else {
          onNavigateToPage('analytics-triangle');
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
      } else if (subitemId === 'insights-explorer') {
        if (currentPage === 'reports-insights-explorer') {
          console.log('Already on insights explorer page');
        } else {
          onNavigateToPage('reports-insights-explorer');
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
      if (subitemId === 'upload') {
        if (currentPage === 'contracts-upload') {
          console.log('Already on contracts upload page');
        } else {
          onNavigateToPage('contracts-upload');
        }
      } else if (subitemId === 'ai-extraction') {
        if (currentPage === 'contracts-ai-extraction') {
          console.log('Already on contracts AI extraction page');
        } else {
          onNavigateToPage('contracts-ai-extraction');
        }
      } else if (subitemId === 'transactions') {
        if (currentPage === 'contracts-transactions') {
          console.log('Already on contracts transactions page');
        } else {
          onNavigateToPage('contracts-transactions');
        }
      } else if (subitemId === 'contracts') {
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
/**
 * Determines if a page type is a sub-page (detail/secondary page)
 * Sub-pages show a back chevron in the sidebar instead of close X
 * @param pageType - The current page type
 * @returns true if page is a sub-page, false if it's a main landing page
 */
export const isSubPage = (pageType: PageType): boolean => {
  const subPages: PageType[] = [
    // Analytics sub-pages
    'analytics-valuation-dashboard',
    'analytics-valuation-configuration',
    'analytics-valuation-status',
    'analytics-add-valuation-data',
    'analytics-triangle-dashboard',

    // Reports sub-pages
    'reports-new-transaction-form',
    'reports-renewal-transaction',
    'reports-cash-settlement',
    'reports-contracts-explorer',
    'reports-insights-program-details',

    // Contracts sub-pages
    'contracts-ai-extraction',
    'contracts-upload'
  ];

  return subPages.includes(pageType);
};

export const createBreadcrumbs = {
  analytics: {
    valuation: () => [{ label: 'Valuation', isActive: true }],
    triangle: () => [{ label: 'Triangle', isActive: true }],
    triangleDashboard: (triangleName: string, onNavigateToPage: NavigationHandler) => [
      { label: 'Triangle', onClick: () => onNavigateToPage('analytics-triangle'), isActive: false },
      { label: triangleName, isActive: true }
    ],
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
    ],
    valuationEdit: (selectedDate: string, programName: string, onNavigateToPage: NavigationHandler) => [
      { label: 'Analytics', isActive: false },
      { label: 'Valuation', onClick: () => onNavigateToPage('analytics-valuation'), isActive: false },
      { label: programName, onClick: () => onNavigateToPage('analytics-valuation-dashboard'), isActive: false },
      { label: `Edit ${selectedDate}`, isActive: true }
    ]
  },
  reports: {
    transactions: () => [{ label: 'Reports', isActive: false }, { label: 'Transaction Management', isActive: true }],
    explorer: () => [{ label: 'Reports', isActive: false }, { label: 'Reports Explorer', isActive: true }],
    insightsExplorer: () => [{ label: 'Reports', isActive: false }, { label: 'Insights Explorer', isActive: true }],
    insightsProgramDetails: (programName: string, onNavigateToPage: NavigationHandler) => [
      { label: 'Reports', isActive: false },
      { label: 'Insights Explorer', onClick: () => onNavigateToPage('reports-insights-explorer'), isActive: false },
      { label: programName, isActive: true }
    ],
    bdxUpload: () => [{ label: 'Reports', isActive: false }, { label: 'BDX UPLOAD', isActive: true }],
    cashSettlement: (onNavigateToPage: NavigationHandler) => [
      { label: 'Reports', isActive: false },
      { label: 'REPORTS EXPLORER', onClick: () => onNavigateToPage('reports-explorer'), isActive: false },
      { label: 'CESSION AND COLLATERAL', isActive: true }
    ]
  },
  contracts: {
    start: () => [{ label: 'Contracts', isActive: true }],
    upload: () => [{ label: 'Contracts', isActive: false }, { label: 'Upload', isActive: true }],
    aiExtraction: () => [{ label: 'Contracts', isActive: false }, { label: 'AI Extraction', isActive: true }],
    explorer: (onNavigateToPage: NavigationHandler) => [
      { label: 'REPORTS EXPLORER', onClick: () => onNavigateToPage('reports-explorer'), isActive: false },
      { label: 'Contracts', isActive: true }
    ]
  },
  marketplace: {
    offerings: () => [{ label: 'Offerings', isActive: true }]
  }
};