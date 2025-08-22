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
- **Components**: Button, InfoTooltip, Input, DatePicker, Dropdown, Selector, ButtonSelector, Status, Table, Card
- **Layout Components**: Stack, Grid, Container, Spacer
- **Page Components**: 
  - **Sidebar** (220px width) with brand logos, expandable menu structure, custom inbox button with notification badge
  - **TopNav** with breadcrumb navigation, share button, user profile dropdown (updated to match Figma design)
- **Icons**: Complete 4-tier icon system with 103 total icons + 5 brand logos (includes new ArrowUpSmall and ArrowDownSmall icons)
- **Storybook**: Comprehensive showcase with interactive controls for all components, running on localhost:6006
- **External Testing Environment**: React development environment in `/pages` folder for testing real component integration

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
│   │   │   ├── Input.tsx & .stories.tsx
│   │   │   ├── DatePicker.tsx & .stories.tsx
│   │   │   ├── Dropdown.tsx & .stories.tsx
│   │   │   ├── Selector.tsx & .stories.tsx
│   │   │   ├── ButtonSelector.tsx & .stories.tsx
│   │   │   ├── Status.stories.tsx
│   │   │   ├── Stack.tsx & .stories.tsx
│   │   │   ├── Grid.tsx & .stories.tsx
│   │   │   ├── Container.tsx & .stories.tsx
│   │   │   ├── Spacer.tsx & .stories.tsx
│   │   │   ├── Table.tsx & .stories.tsx
│   │   │   ├── DocumentCell.tsx (internal to Table)
│   │   │   ├── ActionCell.tsx (internal to Table)
│   │   │   ├── Card/ (existing)
│   │   │   └── index.ts
│   │   ├── pages/                     # Page-level components
│   │   │   ├── Sidebar.tsx & .stories.tsx
│   │   │   ├── TopNav.tsx & .stories.tsx
│   │   │   └── index.ts
│   │   ├── icons/index.tsx            # Complete icon system (101 icons)
│   │   ├── tokens/
│   │   │   ├── index.ts               # Design tokens from Figma
│   │   │   └── DesignTokens.stories.tsx
│   │   └── index.ts
│   ├── .storybook/                    # Storybook configuration
│   ├── package.json                   # Library dependencies & scripts
│   └── [other config files]
├── pages/                             # External testing environment
│   ├── ReportNavigation.tsx           # Advanced report navigation page (default)
│   ├── CashSettlement.tsx             # Financial dashboard page
│   ├── App.tsx                        # Main React app with navigation
│   ├── index.tsx                      # React entry point
│   ├── vite.config.ts                 # Vite configuration
│   ├── package.json                   # React app dependencies
│   └── README.md                      # Usage instructions
├── CLAUDE.md                          # This context file
├── COMPONENTS.md                      # Component documentation
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
- **Table**: Complete data table with multiple cell types, compact design, sort functionality
- **Layout**: Stack, Grid, Container, Spacer for flexible layouts

For detailed component documentation, see [COMPONENTS.md](./COMPONENTS.md)
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

**Current Pages:**
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
- **CashSettlement.tsx**: Comprehensive financial dashboard demonstrating:
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
2. Import design library components: `import { TopNav, Sidebar } from '@design-library/pages'`
3. Use design tokens: `import { colors, typography } from '@design-library/tokens'`
4. Add to App.tsx for navigation

## Next Steps / Future Work
- Add form validation system to Input/Dropdown components
- Create theme support (light/dark mode switching)
- Add animation system with consistent timing and easing
- Create more specialized components (modals, overlays, navigation)
- Standardize prop naming patterns across components
- Expand external testing environment with more example pages

## Known Issues
- **Minor**: Inconsistent prop naming patterns across components (architectural improvement needed)
- **Minor**: CSS injection patterns in Input/Dropdown could be optimized for performance