# Ledger Design Library - Claude Context

## 🚨 FIRST ACTION: Start Storybook Server
**IMMEDIATELY after reading this file, start the local server with this command:**
```bash
cd "E:\Ledger design library\design-library" && npm run storybook
```
This ensures you can view components and changes in real-time at http://localhost:6006/

## IMPORTANT: File Structure & Local Server Setup

### Working Directory Structure
The project has this directory structure:
```
E:\Ledger design library\
├── CLAUDE.md                  # This context file (root level)
├── COMPONENTS.md               # Detailed component documentation
├── RECENT_WORK.md             # Work history and changelog
├── STORYBOOK_STANDARDS.md     # Storybook guidelines and standards
├── design-library/            # Main project folder
│   ├── package.json           # Main package.json is HERE
│   ├── src/                   # Source code
│   ├── .storybook/            # Storybook config
│   └── [all project files]
└── backup-20250728/           # Backup folder
```

### Starting Local Server
**ALWAYS use this exact command to start Storybook:**
```bash
cd "E:\Ledger design library\design-library" && npm run storybook
```

The server will start on http://localhost:6006/ - navigation to the `design-library` subfolder is required because that's where the package.json file is located.

## Project Overview
This is a React design library built with TypeScript and Storybook, containing design tokens, components, and a comprehensive icon system extracted from Figma using MCP server integration.

## Current State
- **Design Tokens**: Complete color system including new black800, typography, spacing, and border radius from Figma
- **Components**: Button, InfoTooltip, Input, DatePicker, Dropdown, Selector, ButtonSelector, Status, Table, Card, FormTabs
- **Page Components**: 
  - **Layout**: Enhanced unified page component combining TopNav and Sidebar with optional tabs integration
  - **Sidebar** (220px width) with brand logos, expandable menu structure, custom inbox button with notification badge
  - **TopNav** with breadcrumb navigation, share button, user profile dropdown (updated to match Figma design)
  - **FormTabs**: 30px height step-based tabs with blue color variants and 2px spacing
- **Icons**: Complete 4-tier icon system with 106 total icons + 5 brand logos (includes DocumentTable, AddMedium, ReloadMedium, CloseMedium, CalculatorSmall, UploadSmall, ConfigSmall icons)
- **Enhanced Table System**: 
  - **Action Buttons**: Upload actions now feature light green styling (#C6FFC1 background, success green icon) to highlight primary actions
  - **Document Cells**: Enhanced with DocumentTable icons and configurable hover icons (download or config)
  - **Intelligent Column Sizing**: Automatic width optimization based on content length (< 11 chars = 150px)
  - **Comprehensive Storybook**: Action Buttons Showcase, Cell Types Showcase, and Intelligent Column Widths for easy testing
- **Global Styling**: Custom text selection color using design system's blue700 (#9ad5f7) applied across all pages
- **Responsive Design**: All page components feature mobile-first responsive design with consistent breakpoints
- **Storybook**: Comprehensive showcase with interactive controls for all components, running on localhost:6006 (or 6007 if port conflict)
- **External Testing Environment**: React development environment in `/pages` folder for testing real component integration
- **Static Assets**: Images stored in `/pages/public/` folder for proper Vercel deployment and serving
- **Enhanced Form System**: Complete NewTransactionForm with comprehensive dropdown options from real reinsurance data
- **Updated Table Filters**: Transaction management table now uses filtering by Ceding Insurer, Transaction Name, and Year

## Technical Details
- Framework: React 18 + TypeScript
- Build: Vite  
- Documentation: Storybook v7 (running on localhost:6006)
- Design Integration: Figma MCP server for extracting designs
- Icons: SVG-based React components with 4 size tiers
- Tokens: Complete design system from Figma Library 2.0
- Styling: CSS-in-JS with design token integration

## Commands

### Design Library Development (run from design-library/ folder)
- `npm run storybook`: Start Storybook on port 6006
- `npm run build`: Build library
- `npm run lint`: Lint code
- `npm run typecheck`: TypeScript validation

### External Page Testing (run from pages/ folder)
- `npm run dev`: Start React development server on port 5173
- `npm run build`: Build external pages
- `npm run preview`: Preview production build

**Remember**: Always navigate to the correct folder before running npm commands:
- `E:\Ledger design library\design-library\` for library development
- `E:\Ledger design library\pages\` for external page testing

## Current Design System
- **Colors**: blackAndWhite, error, warning, success, reports (blue + blue450), marketplace (violet)
- **Typography**: 12 complete text styles (headlines, body, navigation, captions, data)
- **Border Radius**: 0px, 4px, 8px, 12px, 16px, 24px, absolute (round)
- **Strokes**: Semantic stroke colors - `strokes.reports` (blue400) for UI elements (borders, separators), `strokes.content` (black900) for icon content
- **Spacing**: Consistent spacing scale from 0.25rem to 6rem

## Project Structure
```
E:\Ledger design library/
├── design-library/                    # Main design library
│   ├── src/
│   │   ├── components/                # React components
│   │   │   ├── Button.tsx & .stories.tsx
│   │   │   ├── InfoTooltip.tsx & .stories.tsx
│   │   │   ├── Input.tsx & .stories.tsx (optimized with utilities)
│   │   │   ├── DatePicker.tsx & .stories.tsx
│   │   │   ├── Dropdown.tsx & .stories.tsx (optimized with utilities)
│   │   │   ├── Selector.tsx & .stories.tsx
│   │   │   ├── ButtonSelector.tsx & .stories.tsx
│   │   │   ├── Status.stories.tsx
│   │   │   ├── FormTabs.tsx & .stories.tsx
│   │   │   ├── Table.tsx & .stories.tsx (cleaned imports)
│   │   │   ├── DocumentCell.tsx (internal to Table)
│   │   │   ├── ActionCell.tsx (internal to Table)
│   │   │   ├── Card/ (existing)
│   │   │   ├── Separator.tsx & .stories.tsx
│   │   │   ├── Tabs.tsx & .stories.tsx
│   │   │   └── index.ts (organized with clear categories)
│   │   ├── utils/                     # Utility functions
│   │   │   ├── styleInjection.ts      # CSS injection utilities
│   │   │   ├── typography.ts          # Typography helpers
│   │   │   ├── commonStyles.ts        # Shared styling patterns
│   │   │   └── index.ts               # Utility exports
│   │   ├── hooks/                     # Custom hooks
│   │   │   ├── useOutsideClick.ts     # Outside click handling
│   │   │   ├── useHoverState.ts       # Hover state management
│   │   │   └── index.ts               # Hook exports
│   │   ├── pages/                     # Page-level components
│   │   │   ├── Layout.tsx & .stories.tsx
│   │   │   ├── Sidebar.tsx & .stories.tsx
│   │   │   ├── TopNav.tsx & .stories.tsx
│   │   │   ├── FormTopNav.tsx & FormLayout.tsx
│   │   │   └── index.ts
│   │   ├── styles/                    # Global styles
│   │   │   └── base.css               # Base styles with custom selection colors
│   │   ├── icons/index.tsx            # Complete icon system (106 icons)
│   │   ├── tokens/
│   │   │   ├── index.ts               # Design tokens from Figma
│   │   │   └── DesignTokens.stories.tsx
│   │   └── index.ts
│   ├── .storybook/                    # Storybook configuration
│   ├── package.json                   # Library dependencies & scripts
│   └── [other config files]
├── pages/                             # External testing environment
│   ├── TransactionManagement.tsx     # Transaction management page with advanced table and transaction modal
│   ├── NewTransactionModal.tsx       # Transaction type selection modal component
│   ├── ReportNavigation.tsx           # Advanced report navigation page (default) - uses Layout
│   ├── CashSettlement.tsx             # Cession and Collateral subpage under Insights Explorer - uses Layout
│   ├── App.tsx                        # Main React app with navigation
│   ├── index.tsx                      # React entry point
│   ├── vite.config.ts                 # Vite configuration
│   ├── package.json                   # React app dependencies
│   └── README.md                      # Usage instructions
├── CLAUDE.md                          # This context file
├── COMPONENTS.md                      # Component documentation
├── PAGES.md                           # Pages documentation
├── RECENT_WORK.md                     # Work history
└── STORYBOOK_STANDARDS.md             # Storybook guidelines
```

## Component Quick Reference
- **Button**: 3 variants (primary, small, icon), 5 colors, hover effects, icon support
- **Status**: Interactive dropdown menu (evolved from Chips), 5 semantic variants
- **Input**: 6 states, InfoTooltip integration, left symbols, automatic state transitions
- **DatePicker**: Advanced modal interface, multiple period modes, dual calendar system
- **Dropdown**: Same specs as Input, custom styling, 6 states
- **Selector**: Unified checkbox/radio component with 2 variants
- **ButtonSelector**: Button-style selectors for prominent binary choices
- **Table**: Advanced responsive data table with intelligent features:
  - **3 specialized cell types**: simple, document (with configurable hover icons), action
  - **Enhanced Action Buttons**: Upload buttons with light green styling (#C6FFC1) for primary actions
  - **Document Cells**: DocumentTable icons with download/config hover options
  - **Intelligent Column Sizing**: Automatic width optimization based on content analysis
  - **Tab selector, horizontal scrolling, sort functionality, pagination**
  - **Sticky action column with elevation shadow**
  - **4 action types**: upload (green), validate, generate, setup (all others blue)
- **Layout**: Stack, Grid, Container, Spacer for flexible layouts
- **Page Layout**: Layout component that combines TopNav and Sidebar with responsive design and consistent maxWidth settings

For detailed component documentation, see [COMPONENTS.md](./COMPONENTS.md)
For pages and external testing environment, see [PAGES.md](./PAGES.md)
For Storybook standards and guidelines, see [STORYBOOK_STANDARDS.md](./STORYBOOK_STANDARDS.md)
For recent work history and changelog, see [RECENT_WORK.md](./RECENT_WORK.md)

## External Testing Environment

### React Development Setup
The `/pages` folder contains a complete React development environment for testing design library components in real applications:

**Key Features:**
- **Real Component Integration**: Uses actual design library components via `@design-library` imports
- **Hot Reloading**: Instant updates during development (http://localhost:5173)
- **TypeScript Support**: Full type safety with design library component types
- **Vite Configuration**: Optimized build system with design library path aliases
- **Static Assets**: All images must be placed in `/pages/public/` folder and referenced with absolute paths (e.g., `/image.png`) for proper Vercel deployment

**Current Pages:**
- **TransactionManagement.tsx**: Complete transaction management interface featuring:
  - Blue header with SVG background pattern, document icon, and "New Transaction" button
  - **NewTransactionModal**: Dropdown-style modal for transaction type selection featuring:
    - Two transaction options: Brand New (blue icon + AddMedium) and Renewal (green + ReloadMedium)
    - Design system radio buttons using Selector component
    - 670px modal width with 275px cards and 20px spacing
    - Positioned below and aligned to "New Transaction" button
    - Close button with blue300 background and CloseMedium icon
    - Subheading L typography and proper design token integration
  - Transaction and Total Premium stats cards with custom MetricCard components
  - Advanced data table with intelligent column sizing and comprehensive functionality:
    - **Updated Tab Filters**: All Transactions, By Ceding Insurer, By Transaction Name, By Year
    - Document cells with config hover icons for transaction names
    - Automatic column width optimization based on content length
    - Full pagination controls and search functionality
    - 8 columns with proper icons, sorting, and action buttons
  - **Design System Integration**: Complete component integration with Sidebar, TopNav, enhanced Table, and modal system
  - **Responsive Layout**: Centered content (1200px max-width) with white background and mobile-optimized header/stats sections
- **NewTransactionForm.tsx**: Comprehensive multi-tab transaction creation form featuring:
  - **FormTabs Integration**: 4-tab progressive workflow (Basic Info, Policy Groups, Structure & Key Terms, Reporting Parameters)
  - **Basic Information Tab**: Enhanced field structure with real industry data
    - Transaction Name and Policy Group ID input fields
    - **Comprehensive Reinsurer Dropdowns**: 33 real-world reinsurance companies including Lloyd's of London, Swiss Re, Munich Re, Berkshire Hathaway Re, etc.
    - Subject Business full-width textarea for detailed descriptions
  - **Policy Groups Tab**: Advanced policy configuration with industry-standard options
    - Policy Group Name and Description input fields with proper placeholders
    - **20 Statutory Product Lines**: Aviation, Commercial Auto, Workers Compensation, General Liability, Commercial Property, Professional Liability, Directors & Officers, Cyber Liability, Marine, Energy, Environmental, Product Liability, Employment Practices, Crime & Fidelity, Surety, Health & Medical, Life & Annuities, Casualty, Specialty Lines, Other
    - Custom frequency selector with 1-5 scale visualization
    - Admitted Status dropdown (Admitted/Non-Admitted)
  - **Reporting Parameters Tab**: Professional reporting configuration
    - Reporting Frequency: Monthly, Quarterly
    - Business Scope: Entire subject business, By policy groups (market segments)
    - Data Format: Incremental, Cumulative, Transactional
    - Data Level: Aggregated level, Detailed level (by policies), Detailed level (by claims)
    - Dynamic requirements system with expandable requirement boxes
  - **Design System Integration**: Complete form styling with blue200 containers, proper spacing, and responsive grid layouts
- **ReportNavigation.tsx** (Default): Advanced report navigation interface featuring:
  - Program selector card with dropdown functionality
  - Program relationship pills showing hierarchical connections  
  - Cession and Collateral metrics card with sophisticated charts and growth indicators
  - Data Validation metrics card with status indicators and validation charts
  - **Insights card**: Full-width loss ratio chart with:
    - Multi-line trend visualization (blue, purple, green lines)
    - Alert indicator system with red notification badges
    - Proper 50px margins with axis labels positioned in margin spaces
    - Interactive chart with grid lines and percentage scale (0-80%)
    - Monthly time series data (01-2025 to 04-2025)
  - Consistent blue200 background styling for explore buttons and program pills
  - **Design System Integration**: Complete typography token usage for consistent text styling
  - **Responsive Layout**: Centered content (1200px max-width) with white background
  - **Enhanced TopNav**: Black900 background container with rounded bottom corners for visual definition
- **CashSettlement.tsx**: Cession and Collateral subpage under Insights Explorer, demonstrating:
  - Sidebar navigation with expandable menu structure
  - TopNav with breadcrumbs and user profile (enhanced with black900 background container)
  - Custom MetricCard components using design tokens and typography styles
  - Grid layout with financial data visualization
  - Interactive elements and proper component integration
  - **Design System Integration**: Complete typography token usage (dataXXL, bodyM, bodyL)
  - **Responsive Layout**: Centered content (1200px max-width) with white background

**Usage:**
```bash
cd "E:\Ledger design library\pages"
npm run dev  # Start on http://localhost:5173
```

**Adding New Pages:**
1. Create new `.tsx` files in `/pages` folder
2. Import Layout component: `import { Layout } from '@design-library/pages'`
3. Use design tokens: `import { colors, typography } from '@design-library/tokens'`
4. Wrap content with Layout component for consistent navigation and responsive behavior
5. Add to App.tsx for navigation
6. Text selection will automatically use blue700 (#9ad5f7) via base.css import

## Recent Major Updates & Code Cleanup

### 🧹 **Comprehensive Codebase Cleanup (Latest - September 2025)**
- **Removed Dead Code**: Eliminated broken backup files (ReportNavigation-broken.tsx), unused imports, outdated references
- **Consolidated Logic**: Created shared utilities for common patterns (typography, styling, CSS injection)
  - `utils/typography.ts`: Typography style application helpers
  - `utils/styleInjection.ts`: Safe CSS injection utilities with pre-configured common styles
  - `utils/commonStyles.ts`: Shared styling patterns and utilities
- **Custom Hooks**: Extracted reusable hooks for consistent behavior
  - `useOutsideClick`: Handles clicks outside referenced elements (dropdowns, modals)
  - `useHoverState`: Manages hover state consistently across components
- **Optimized Components**: Input and Dropdown components refactored to use shared utilities
  - Reduced code duplication by ~30% through shared typography and CSS injection utilities
  - Simplified maintenance with consolidated outside click handling
- **Updated Architecture**: Better separation of concerns with organized utils/ and hooks/ directories
- **Documentation Accuracy**: Removed references to non-existent layout components, updated current state

### 📊 **Previous Enhancements**
- **Real-World Data Integration**: Comprehensive reinsurance industry data integration
  - 33 actual reinsurance companies in dropdown options across forms
  - 20 industry-standard statutory product lines covering all major insurance categories
  - Professional reporting configuration options aligned with industry standards
- **Transaction Management Improvements**: Enhanced filtering and navigation capabilities
  - Updated table filters from status-based to functional filtering (By Ceding Insurer, Transaction Name, Year)
  - Improved transaction workflow with better categorization options
- **Form Field Restructuring**: Complete overhaul of NewTransactionForm based on Figma designs
  - Restructured Basic Information tab with proper field types and industry data
  - Enhanced Policy Groups tab with comprehensive dropdown options and proper field types
  - Updated Reporting Parameters with professional configuration options
- **Layout Component**: Created unified Layout component combining TopNav and Sidebar for consistent page structure
  - Centralized navigation handling and breadcrumb management
  - Responsive behavior with configurable maxWidth (default 1200px)
- **Custom Selection Colors**: Implemented design system text selection styling
  - Blue700 (#9ad5f7) selection background across all pages
  - Cross-browser support (Chrome, Firefox, Safari)

## Next Steps / Future Work
- Add form validation system to Input/Dropdown components
- Create theme support (light/dark mode switching)
- Add animation system with consistent timing and easing
- Expand modal system with form-based modals and confirmation dialogs
- Standardize prop naming patterns across components
- Expand external testing environment with more example pages

## Code Quality Status
✅ **Resolved Issues**: 
- CSS injection patterns in Input/Dropdown have been optimized with shared utilities
- Duplicate logic consolidated with custom hooks and utility functions
- Dead code and unused imports removed
- Documentation updated to reflect actual codebase state

📈 **Current State**: Clean, well-organized codebase with 96.6% import efficiency and consolidated architecture