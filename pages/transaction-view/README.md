# Transaction-Centric View

## Overview

This folder contains pages and components for the new **transaction-centric browsing approach**. Instead of splitting transaction information across multiple apps (Reports, Analytics, Contracts), this view unifies all transaction-related data in one place.

## Problem Statement

**Current Approach:**
- Users navigate by app section (Reports, Analytics, Contracts)
- Each app has tables showing transactions
- Information about a single transaction is fragmented across multiple apps
- Users must jump between apps to see complete transaction details

**New Approach:**
- Browse by transaction as the primary organizing principle
- Each transaction contains all related information (Reports data, Analytics data, Contracts data)
- Unified view eliminates need to navigate between apps
- More intuitive for users who think in terms of transactions

## Navigation Components

### SideNav3
- **Location:** `design-library/src/pages/SideNav3.tsx`
- **Purpose:** Transaction-centric sidebar navigation
- **Status:** Duplicated from SideNav2, ready for customization
- **TODO:**
  - Define transaction organization structure (by ID, categories, filters, etc.)
  - Update sidebarItems to reflect transaction-based navigation
  - Customize icons and labels for transaction view
  - Consider new theme colors if needed

### TopNav3
- **Location:** `design-library/src/pages/TopNav3.tsx`
- **Purpose:** Top navigation bar for transaction-centric view
- **Status:** Duplicated from TopNav2, ready for customization
- **TODO:**
  - Update breadcrumb patterns for transaction navigation
  - Consider transaction-specific actions in top bar
  - Customize for transaction context

## Folder Structure

```
transaction-view/
├── README.md           # This file - project documentation
├── [pages/]            # Transaction-centric page components (to be created)
└── [components/]       # Shared components specific to transaction view (optional)
```

## Development Guidelines

### Creating Transaction Pages

When creating pages in this folder:

1. **Import the new navigation components:**
   ```tsx
   import { SideNav3, TopNav3 } from '@design-library/pages';
   ```

2. **Follow naming convention:**
   - Use descriptive names: `TransactionDetail.tsx`, `TransactionList.tsx`, etc.
   - Component names should reflect transaction-centric context

3. **Unified data structure:**
   - Pages should expect unified transaction data containing:
     - Reports information
     - Analytics information
     - Contracts information
     - All other relevant transaction details

4. **Use design library tokens:**
   - Always use `@design-library/tokens` for colors, typography, spacing
   - Follow existing design system patterns
   - Consider creating a new theme color for transaction view if needed

### Example Page Structure

```tsx
import React from 'react';
import { SideNav3, TopNav3 } from '@design-library/pages';
import { colors, typography, spacing } from '@design-library/tokens';

interface TransactionDetailProps {
  transactionId: string;
  // Unified transaction data
  reportsData?: any;
  analyticsData?: any;
  contractsData?: any;
}

export const TransactionDetail: React.FC<TransactionDetailProps> = ({
  transactionId,
  reportsData,
  analyticsData,
  contractsData
}) => {
  return (
    <div>
      {/* Page content showing all transaction info unified */}
      <TransactionHeader data={reportsData} />
      <AnalyticsSummary data={analyticsData} />
      <ContractDetails data={contractsData} />
    </div>
  );
};
```

## Next Steps

1. **Define Navigation Structure:**
   - Decide how transactions should be organized in SideNav3
   - Plan navigation patterns and user flows

2. **Create Core Pages:**
   - Transaction list/explorer page
   - Transaction detail page
   - Any supporting pages

3. **Customize Navigation Components:**
   - Update SideNav3 with transaction-specific items
   - Modify TopNav3 breadcrumbs for transaction context

4. **Data Integration:**
   - Plan how to fetch and combine data from all apps
   - Create unified transaction data models

5. **Testing:**
   - Test navigation flows
   - Ensure all transaction data displays correctly
   - Verify responsive behavior

## Questions to Resolve

- [ ] How should transactions be organized? (by ID, categories, filters, etc.)
- [ ] What theme colors should be used? (existing app themes vs. new unified theme)
- [ ] What should the main landing page show? (transaction list, dashboard, etc.)
- [ ] How should breadcrumbs work in this context?
- [ ] Should there be a way to switch between app-centric and transaction-centric views?

## Related Files

- **Navigation Components:** `design-library/src/pages/SideNav3.tsx`, `TopNav3.tsx`
- **Export Index:** `design-library/src/pages/index.ts`
- **Documentation:** Project root `CLAUDE.md`, `NEW_PAGE_GUIDE.md`

---

**Status:** Initial setup complete. Navigation components duplicated and exported. Ready for customization and page development.
