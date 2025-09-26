# Ledger Design Library - Claude Context

## 🚨 FIRST ACTION: Start Storybook Server
**IMMEDIATELY after reading this file, start the local server with this command:**
```bash
cd "E:\Ledger design library\design-library" && npm run storybook
```
This ensures you can view components and changes in real-time at http://localhost:6006/

## ⚠️ CRITICAL: Design Token Usage Rules
**SUPER IMPORTANT - ALWAYS FOLLOW THESE RULES:**

### **🚨 NEVER CREATE EXTERNAL ICONS OR TOKENS**
**CRITICAL RULE: ONLY USE DESIGN LIBRARY COMPONENTS, ICONS, AND TOKENS**

- **NEVER create custom SVG icons** - Always use icons from `@design-library/icons`
- **NEVER use external libraries** for icons, colors, typography, or spacing
- **NEVER hardcode colors, fonts, or spacing** - Always use design tokens
- **ALWAYS import from the design library**: components, icons, colors, typography, spacing, etc.
- **TEAM DEPENDENCY**: Other team members rely on consistent library usage and may not notice external additions

**Examples of FORBIDDEN practices:**
```tsx
// ❌ NEVER DO THIS - Custom SVG
<svg width="24" height="24">...</svg>

// ❌ NEVER DO THIS - External icon library
import { Download } from 'react-icons'

// ❌ NEVER DO THIS - Hardcoded colors
backgroundColor: '#ff0000'

// ✅ ALWAYS DO THIS - Use design library
import { DownloadMedium } from '@design-library/icons'
<DownloadMedium color={colors.theme.main} />
```

**WHY THIS IS CRITICAL**: The library is designed for team use. When team members who don't know the library deeply use Claude, they depend on Claude only using approved design system elements. External additions break consistency and create maintenance issues.

### **Typography Tokens - NEVER Override**
- **ALWAYS use our typography tokens first**: `typography.styles.headlineH1`, `typography.styles.headlineH2`, `typography.styles.bodyM`, etc.
- **NEVER add custom font properties** like `fontWeight`, `fontSize`, `fontFamily` when using typography tokens
- **Example of CORRECT usage**:
  ```tsx
  <h2 style={{
    ...typography.styles.headlineH2,
    color: colors.blackAndWhite.black500,
    margin: '0 0 12px 0',
  }}>
  ```
- **Example of WRONG usage**:
  ```tsx
  <h2 style={{
    ...typography.styles.headlineH2,
    fontWeight: typography.fontWeight.regular, // ❌ DON'T DO THIS
    fontSize: '32px', // ❌ DON'T DO THIS
  }}>
  ```

### **When You Need Custom Styling**
- **ASK FIRST** before creating any custom typography, color, or spacing overrides
- **Use existing tokens** wherever possible
- **Only override** properties not covered by the token (like `margin`, `padding`, `color`)

### **Color and Theme Tokens**
- **ALWAYS use semantic colors**: `colors.theme.primary400`, `colors.blackAndWhite.black900`
- **NEVER use hardcoded colors** like `#000000` or `rgb(255, 255, 255)`
- **Use `useSemanticColors()` hook** in components for theme-aware styling

## IMPORTANT: File Structure & Local Server Setup

### 🗂️ TEMP FOLDER - VERY IMPORTANT
**CRITICAL: The project has a temp folder for shared images and files:**
```
E:\Ledger design library\temp\
```
- **Always check this folder for images/screenshots** when the user mentions adding images
- Contains project-related files like design mockups, alignment examples, and reference images
- Use this path when the user says "I added an image in our temp folder"

### Working Directory Structure
The project has this directory structure:
```
E:\Ledger design library\
├── CLAUDE.md                  # This context file (root level)
├── COMPONENTS.md               # Detailed component documentation
├── PAGES.md                   # Complete pages documentation
├── RECENT_WORK.md             # Work history and changelog
├── STORYBOOK_STANDARDS.md     # Storybook guidelines and standards
├── temp/                      # 🗂️ TEMP FOLDER - shared images and files
├── design-library/            # Main project folder
│   ├── package.json           # Main package.json is HERE
│   ├── src/                   # Source code
│   ├── .storybook/            # Storybook config
│   └── [all project files]
├── pages/                     # External testing environment
└── backup-20250728/           # Backup folder
```

### Starting Local Server
**ALWAYS use this exact command to start Storybook:**
```bash
cd "E:\Ledger design library\design-library" && npm run storybook
```

## Project Overview
This is a React design library built with TypeScript and Storybook, containing design tokens, components, and a comprehensive icon system extracted from Figma using MCP server integration.

## Current State Summary
- **Design Tokens**: Complete design system from Figma Library 2.0 with unified semantic theme system
- **Theme System**: All components use `useSemanticColors()` hook for theme-aware color adaptation across Reports (blue), Analytics (green), and Marketplace (violet)
- **Components**: Button, InfoTooltip, Input, DatePicker, Dropdown, Selector, ButtonSelector, Status, Table, Card, FormTabs, Modal
- **Modal System**: Comprehensive unified modal component with flexible positioning and theme-aware styling
- **Page Components**:
  - **Unified Layout System**: Single Layout component with conditional TopNav/FormTopNav rendering
  - **Legacy FormLayout**: Backward-compatible wrapper (deprecated, use `Layout` with `formMode=true`)
  - **Responsive Sidebar**: Hover expansion with localStorage state persistence
  - **Enhanced Form Integration**: Connect Bank API modal with success states and theme-aware styling
- **Icons**: Complete 6-tier icon system with 115+ total icons across extraSmall, small, medium, table, cards, logos
- **Enhanced Table System**: Action buttons, document cells, intelligent column sizing, dual pagination options
- **Global Styling**: Custom text selection color using design system's blue700 (#9ad5f7)
- **Responsive Design**: Mobile-first responsive design with consistent breakpoints
- **External Testing Environment**: React development environment in `/pages` folder for real component integration
- **Code Quality**: Comprehensive JSDoc documentation, cleanup commands, and consolidated architecture

## Technical Details
- Framework: React 18 + TypeScript
- Build: Vite
- Documentation: Storybook v7 (running on localhost:6006)
- Design Integration: Figma MCP server for extracting designs
- Icons: SVG-based React components with 6 size tiers
- Tokens: Complete design system from Figma Library 2.0
- Styling: CSS-in-JS with design token integration

## Commands

### Design Library Development (run from design-library/ folder)
- `npm run storybook`: Start Storybook on port 6006
- `npm run build`: Build library
- `npm run lint`: Lint code
- `npm run typecheck`: TypeScript validation
- `npm run claude-cleanup`: Display Claude cleanup command prompt

### Code Maintenance
- **Claude Cleanup**: Type `"claude cleanup"` to trigger comprehensive code cleanup including:
  - 🗑️ Remove dead code and unused imports
  - 📝 Add missing JSDoc documentation
  - 🔗 Consolidate duplicate patterns
  - ✨ Optimize code structure
  - 📚 Update outdated comments

### External Page Testing (run from pages/ folder)
- `npm run dev`: Start React development server on port 5173
- `npm run build`: Build external pages
- `npm run preview`: Preview production build

**Remember**: Always navigate to the correct folder before running npm commands:
- `E:\Ledger design library\design-library\` for library development
- `E:\Ledger design library\pages\` for external page testing

## Current Design System
- **Colors**: blackAndWhite, error, warning, success, reports (blue), marketplace (violet), analytics (green)
- **Semantic Theme System**: All components use `useSemanticColors()` for theme-aware color adaptation
  - `colors.theme.primary200/300/400/500/700` automatically adapts to current product theme
  - `colors.theme.main` provides the primary brand color for each theme
  - Static colors available via `staticColors` import for data outside components
- **Typography**: 12 complete text styles (headlines, body, navigation, captions, data)
- **Border Radius**: 0px, 4px, 8px, 12px, 16px, 24px, absolute (round)
- **Semantic Colors**: Theme-aware colors replace direct color references
- **Spacing**: Consistent spacing scale from 0.25rem to 6rem

## Component Quick Reference
- **Button**: 4 variants (primary, small, icon, tertiary), 5 colors, hover effects, icon support
- **Status**: Interactive dropdown menu, 5 semantic variants
- **Input**: 6 states, InfoTooltip integration, left symbols, automatic state transitions
- **DatePicker**: Advanced modal interface, multiple period modes, dual calendar system
- **Dropdown**: Same specs as Input, custom styling, 6 states
- **Selector**: Unified checkbox/radio component with 2 variants
- **ButtonSelector**: Button-style selectors for prominent binary choices
- **Table**: Advanced responsive data table with intelligent features (3 specialized cell types, enhanced action buttons, intelligent column sizing, dual pagination options, comprehensive alignment control for headers and cells)
- **Layout**: Stack, Grid, Container, Spacer for flexible layouts
- **Page Layout**: Layout component that combines TopNav and Sidebar with responsive design

For detailed component documentation, see [COMPONENTS.md](./COMPONENTS.md)
For pages and external testing environment, see [PAGES.md](./PAGES.md)
For Storybook standards and guidelines, see [STORYBOOK_STANDARDS.md](./STORYBOOK_STANDARDS.md)
For recent work history and changelog, see [RECENT_WORK.md](./RECENT_WORK.md)
For prototype settings and feature toggles, see [PROTOTYPE_SETTINGS.md](./PROTOTYPE_SETTINGS.md)

## External Testing Environment

### React Development Setup
The `/pages` folder contains a complete React development environment for testing design library components in real applications.

**Key Features:**
- **Real Component Integration**: Uses actual design library components via `@design-library` imports
- **Hot Reloading**: Instant updates during development (http://localhost:5173)
- **TypeScript Support**: Full type safety with design library component types
- **Vite Configuration**: Optimized build system with design library path aliases
- **Static Assets**: All images must be placed in `/pages/public/` folder and referenced with absolute paths
- **Custom Favicon**: Professional K logo favicon with black900 background for both pages and Storybook environments

**Current Pages:**
- **TransactionManagement.tsx**: Complete transaction management interface with animated header, transaction stats, and advanced data table
- **NewTransactionForm.tsx**: Comprehensive multi-tab transaction creation form with accordion-based Structure & Key Terms
- **ReportNavigation.tsx** (Default): Advanced report navigation interface with program selector and insights visualization
- **CashSettlement.tsx**: Cession and Collateral subpage demonstrating financial dashboard
- **ContractsExplorer.tsx**: Contracts subpage with dual table interface
- **AnalyticsValuation.tsx**: Analytics Valuation page demonstrating theme system integration
- **ValuationDashboard.tsx**: Complete valuation management dashboard with charts and status management
- **ValuationConfiguration.tsx**: Professional configuration form page
- **ValuationStatus.tsx**: Triangle upload management page

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
6. Text selection will automatically adapt to current product theme via ThemeProvider integration

## Recent Major Updates Summary

### ✅ Latest Completed (September 2025)
- **Table Column Alignment System**: Complete alignment control for both headers and cells across all tables
  - Added `align` property for cell content alignment (left/center/right)
  - Added `headerAlign` property for column header alignment (left/center/right)
  - Professional layout pattern: first column left-aligned, data columns right-aligned
  - Updated all table implementations: Analytics Valuation, Transaction Management, Contracts Explorer
  - Enhanced Storybook documentation with ColumnAlignment story
- **Table Header Icon Optimization**: Fixed 36px header height with proper 24px icon sizing
- **Sidebar Padding Refinement**: Updated navigation padding from 1.5rem to 1rem for improved compactness
- **Enhanced Table Sorting**: Functional arrange arrows with intelligent numeric/text detection
- **Browser History Integration**: Full browser back/forward button support with URL hash navigation
- **Theme-Aware Text Selection**: Dynamic selection colors that adapt to current product theme (Reports: blue, Analytics: green, Marketplace: violet)
- **Enhanced Table UX**: Fixed drag cursor behavior - only shows drag cursor when tables actually need horizontal scrolling
- **BDX Upload Navigation**: Added navigation buttons from Reports Explorer ("3 months (Need review)" and "EXPLORE" buttons)
- **BDX Table Border Optimization**: Fixed thick border issues, perfect rounded corners, and clean grid structure
- **Responsive Layout System**: Full-width responsive design with 50px margins, enhanced modal framework
- **Complete Accordion Implementation**: NewTransactionForm accordion system with 5 collapsible sections
- **Comprehensive Token Consolidation**: Eliminated redundant tokens, universal semantic theme system
- **Comprehensive Codebase Cleanup**: Shared utilities, custom hooks, optimized components

### ✅ Previous Enhancements
- Real-world reinsurance industry data integration (33 companies, 20 product lines)
- Enhanced transaction management with functional filtering
- Layout component creation for unified page structure
- Custom selection colors and theme-aware styling throughout

See [RECENT_WORK.md](./RECENT_WORK.md) for detailed work history and changelog.

## Code Quality Status
✅ **Current State**: Clean, well-organized codebase with 98.1% import efficiency (improved from 96.6%), consolidated architecture, and unified semantic theme system across all components and pages

### ✅ Latest Quality Improvements (September 24, 2025):
- **Portal Rendering**: Implemented React portals across tooltip components to fix positioning issues
- **Upload Animation System**: Added professional scaling animations for upload success feedback
- **Code Optimization**: Eliminated unused imports and dead code through automatic linting
- **Animation Performance**: Streamlined timeout logic and state management for better efficiency

✅ **Resolved Issues**:
- CSS injection patterns optimized with shared utilities
- Duplicate logic consolidated with custom hooks and utility functions
- Dead code and unused imports removed
- Token duplication eliminated, universal semantic theme system implemented
- Theme integration complete across all components and pages
- Error-free codebase with all `colors is not defined` errors resolved