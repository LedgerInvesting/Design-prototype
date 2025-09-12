# Component Documentation

This document contains detailed documentation for all components in the Ledger Design Library.

## 🎨 Theming System

### Overview
The design library features a comprehensive theming system that allows components to automatically adapt colors based on product context (Reports, Analytics, Marketplace).

### Core Concepts
- **Semantic Colors**: Components use `colors.theme.main`, `colors.theme.primary400`, etc. instead of hardcoded product colors
- **ThemeProvider**: React context that provides theme-aware colors to all child components
- **Automatic Color Resolution**: Theme system automatically maps semantic tokens to product colors
  - Reports context: `theme.main` → `reports.blue700`
  - Analytics context: `theme.main` → `analytics.green700`
  - Marketplace context: `theme.main` → `marketplace.purple700`

### Usage
```typescript
// Wrap components with ThemeProvider
<ThemeProvider initialTheme="analytics">
  <YourComponent />
</ThemeProvider>

// Inside components, use semantic colors
const colors = useSemanticColors();
<div style={{ backgroundColor: colors.theme.main }} />
```

### Benefits
- **Figma Workflow Compatible**: Components designed in Reports automatically use Analytics colors when moved to Analytics context
- **Consistent Theming**: No need to manually update colors when switching product contexts
- **Maintainable**: Single source of truth for theme colors
- **Type Safe**: Full TypeScript support with theme-aware color tokens

## Components Built
1. **Button**: Unified button component with 3 variants (primary, small, icon), multiple colors, icon support, disabled states
2. **InfoTooltip**: Interactive "i" symbol with hover tooltips, supports simple text or complex multi-section content, 5 positioning options
3. **Input**: Complete form input with label, tooltip integration, left symbols ($, %), right icons, 6 states, helper text
4. **DatePicker**: Date selection component based on Input field with calendar icon, all 6 states, form integration
5. **Dropdown**: Complete dropdown component with same Input field specifications and interactive behavior
6. **Selector**: Unified selector component with 2 variants (checkbox, radio), form integration, disabled support
7. **ButtonSelector**: Button-style selector combining button design with embedded checkbox/radio, 3 states, perfect for binary choices
8. **Utilities**: Shared utility functions for styling, typography, and common patterns
9. **Custom Hooks**: Reusable hooks for common component behaviors (outside clicks, hover states)
12. **Status**: Interactive status component with dropdown menu functionality (evolved from Chips), 5 semantic variants, 4 menu item states, design system integration
13. **Table**: Advanced responsive data table with intelligent column sizing, enhanced action buttons, and comprehensive Storybook showcases
14. **DocumentCell**: Enhanced interactive document cell with DocumentTable icons and configurable hover icons (download/config modes)
15. **ActionCell**: Interactive action cell with enhanced primary action styling - upload buttons feature light green background (#C6FFC1) for prominence

## Page Components
16. **TransactionManagement**: Complete transaction management interface with intelligent table system
    - **Animated Header**: Blue header with subtle SVG line animation (5.76s cycle, parallax entrance effect)
    - Header includes base shadow, document icon, and "New Transaction" button
    - Complete new transaction workflow with proper navigation flow
    - Transaction and Total Premium stats cards using reusable MetricCard components
    - Advanced data table with tab selector functionality (5 tabs: All Transactions, Active, Pending, Draft, Cancelled)
    - 12 rows of sample transaction data demonstrating proper scrolling/masking behavior
    - Complete integration with Sidebar, TopNav, and enhanced Table component
    - Responsive layout with 1300px max-width and proper component composition
17. **ReportNavigation**: Advanced report navigation interface with program selector, relationship indicators, and sophisticated metric cards
    - Program selector card with dropdown functionality
    - Program relationship pills showing hierarchical connections  
    - Cession and Collateral metrics with growth indicators and trend charts
    - Data Validation metrics with status indicators and validation charts
    - Custom chart components (SmallChart, DataValidationChart) with SVG-based visualizations
    - Full design system integration with proper spacing and typography

## Icon System (106 total icons)
1. **Extra Small (8x8px)**: 9 icons - minimal UI elements (added chevronUp)
2. **Small (12x12px)**: 32 icons - used in IconButton and small components (includes new CalculatorSmall, UploadSmall, ConfigSmall for action types)
3. **Medium (22x22px)**: 56 icons - larger UI elements, headers, includes status icons (StatusWarning, StatusError, StatusSuccess)
4. **Table (24x24px)**: 9 icons - specifically for table headers (includes new ArrangeTable icon)

## Component Features Summary

### Button
- Unified component with 3 variants: primary, small, icon
- **Primary variant**: Full-featured buttons with text, icons, 5 colors (black, white, main, light, green)
- **Small variant**: Compact buttons for secondary actions, 5 colors (black, white, main, light, green)
  - **Enhanced centering**: Perfect text alignment when `showIcon={false}` - no extra spacing for hidden icons
  - **Dynamic gap**: Automatically adjusts spacing based on icon presence (10px with icon, 0px without)
- **Icon variant**: Icon-only buttons, 5 colors (black, main, light, green, white), 2 shapes (circle, square)
- **Interactive hover effects**: Subtle 15% white overlay for colored buttons, blue200 solid for white buttons
- **Smart icon colors**: White icons on dark backgrounds, black icons on light backgrounds
- Icon positioning (left, right) for primary variant
- Comprehensive prop API with variant-specific features
- Disabled states across all variants with no hover effects
- **State management**: Automatic hover state reset when switching variants/colors in Storybook
- Uses design tokens: `typography.styles.*`, `borderRadius.*`, `colors.*`
- **Updated icon colors**: Black and white button variants now use blue700 (#9ad5f7) for proper design system compliance

### Status
- Interactive status component with dropdown menu functionality (evolved from Chips component)
- **5 semantic variants**: warning (yellow), success (green), error (red/pink), info (blue), inactive (gray)
- **3 sizes**: small, medium, large with consistent design token integration
- **Dropdown menu features**: Click to open/close, outside click detection, ESC key support, close button (X)
- **4 menu item states**: Default, Hover (blue200 50% alpha), Selected (blue300), Disabled (reduced opacity)
- **Design system integration**: Uses `borderRadius.absolute` for rounded corners, proper color tokens
- **Form integration**: Controlled/uncontrolled modes with onSelect callback for option handling
- **Accessibility**: Full keyboard support, ARIA roles, smooth 0.2s ease transitions
- **Backward compatibility**: Original Chips component still exported alongside Status
- Located in "Components/Status" Storybook category with comprehensive interactive examples

### InfoTooltip
- Circular "i" icon with hover/focus triggers
- Simple text or complex multi-section content
- 5 positioning options (top, bottom, left, right, bottom-right)
- Uses `typography.styles.captionS` (titles), `typography.styles.bodyS` (descriptions)
- Integrates with Figma design (black background, white text, separators)

### Input
- Complete form input with label and helper text
- InfoTooltip integration (simple or complex)
- Left symbols ($ or %) with proper positioning
- 6 states with automatic state transitions:
  - **Default**: Initial idle state
  - **Active**: When focused/clicked (auto-switches)
  - **Filled**: When has content and not focused (auto-switches)
  - **Warning**: Manual state for potential issues
  - **Error**: Manual state for validation errors
  - **Disabled**: Non-interactive state
- Multiple input types (text, number, email, password)
- Custom number input controls with library chevron icons (no browser spinners)
- Interactive behavior: default → active (focus) → filled (type + blur) → active (focus again)
- Fully uses design tokens: colors, typography, spacing, border radius
- Uses `typography.styles.bodyL` (label), `typography.styles.bodyM` (input), `typography.styles.bodyS` (helper)

### DatePicker
- Complete date range picker with advanced modal interface and multiple period modes
- Built-in calendar icon from design system library (medium.calendar - 22x22px)
- **Adaptive Modal Interface**: Responsive modal sizing based on calendar type
  - Single calendar: 420px width for Current period
  - Dual calendar: 680px width for range/year periods
- **Time Period Modes**: 6 preset buttons with distinct behaviors
  - **Custom**: Full dual calendar with manual date range selection
  - **Current**: Single calendar, start date only, ongoing period display ("From DD/MM/YYYY")
  - **1-5 Years**: Automatic end date calculation (+1/2/3/5 years from start date)
- **Intelligent Calendar Display**:
  - Single calendar: Centered, for Current period only
  - Dual calendar: Side-by-side with center alignment for all other periods
  - Disabled right calendar: For year periods with 50% opacity and no interaction
- **Enhanced Calendar Navigation**:
  - Month/year dropdowns using extraSmall chevronDown icons (8x8px)
  - Click chevrons to access dropdown lists with proper styling
  - Smooth transitions and click-outside-to-close functionality
- **Smart Date Input Handling**:
  - Start date: Always editable, supports manual entry and calendar selection
  - End date: Auto-disabled for year periods with helper text ("Auto-calculated +X years")
  - Read-only main input: Click to open modal, shows formatted results
- **Advanced Date Selection Logic**:
  - Start/end dates: black900 background with blue700 text
  - Range dates: blue300 background with black900 text
  - Single date: Same high-contrast styling as range endpoints
- **Responsive Button Layout**:
  - Single calendar: 3 columns × 2 rows (compact layout)
  - Dual calendar: 6 columns × 1 row (spread across modal width)
- **Modal Interactions**: 
  - Click input field or calendar icon to open
  - Click outside or escape key to close
  - Apply button appears when appropriate dates selected
  - Backdrop click with proper event handling
- **Display Formats**:
  - Date range: "DD/MM/YYYY to DD/MM/YYYY"
  - Current period: "From DD/MM/YYYY"
  - Auto-calculated periods: Proper end date display with visual feedback
- **Complete Design System Integration**: All components use library Button, Input, Calendar, and icon components
- **Form Integration**: Controlled/uncontrolled modes with proper event handling
- InfoTooltip integration (simple and complex)
- Left symbols ($ or %) with proper positioning
- 6 states with automatic state transitions (same as Input component)
- Located in "Components" Storybook category with comprehensive examples

### Dropdown
- Complete dropdown component with same specs as Input field
- InfoTooltip integration (simple and complex)
- 6 states with automatic state transitions:
  - **Default**: Initial idle state
  - **Active**: When clicked/opened (auto-switches)
  - **Filled**: When option selected and closed (auto-switches)
  - **Warning**: Manual state for potential issues
  - **Error**: Manual state for validation errors
  - **Disabled**: Non-interactive state
- Interactive behavior: default → active (click) → filled (select) → active (click again)
- Custom dropdown list with 10px margin, library shadows, clean styling
- Custom scrollbar: black900 color, no arrow buttons, minimal design
- Chevron icon rotation animation on open/close
- Click outside to close functionality
- Disabled options support within dropdown list
- Fully uses design tokens: colors, typography, spacing, border radius, shadows
- Uses `typography.styles.bodyL` (label), `typography.styles.bodyM` (options), `typography.styles.bodyS` (helper)

### Selector
- Unified selector component with 2 variants: checkbox, radio
- **Checkbox variant**: Square selector (4px border radius) for independent choices
- **Radio variant**: Circular selector (borderRadius.absolute) for exclusive choices
- 18x18px dimensions for both variants
- Transparent background in default state for radio, white for checkbox
- Black900 background with success.fill checkmark when selected (both variants)
- Interactive state behavior: default ↔ filled (click to select)
- Form integration with proper name/value attributes
- Radio group functionality for exclusive selections
- Controlled and uncontrolled modes
- Disabled state with proper opacity and cursor handling
- Uses `typography.styles.bodyM` for label text
- Comprehensive prop API with variant-specific features
- Uses design tokens: `colors.*`, `borderRadius.*`, `typography.styles.*`

### ButtonSelector
- Complete button-style selector component with 3 states (default, active, filled)
- Combines button design with embedded checkbox or radio selector
- Button dimensions with padding (12px 16px) and 44px minimum height
- 8px border radius and proper button styling
- Supports both checkbox and radio selector types
- Perfect for binary choices in forms where selectors need to be prominent
- Interactive state behavior: default → active (hover/focus) → filled (selected)
- Form integration with proper name/value attributes
- Controlled and uncontrolled modes
- Disabled state with proper opacity and cursor handling
- Uses `typography.styles.bodyM` for button text
- Located in "Components" Storybook category
- Comprehensive examples including binary choice forms and radio groups

### Table
- Advanced responsive data table component with tab selector, horizontal scrolling, and specialized cell types
- **Enhanced Header Features**: Tab selector replacing filter functionality, search input, dual pagination options (header/footer) with Figma-based design
- **Tab Selector**: Interactive tab switching with blue400 dividers, smooth transitions, and proper state management
  - Selected state: white background, blue400 border, black900 text, active tab functionality
  - Default state: transparent border, black500 text, clickable interactions
  - Proper event handling with useState integration
- **Responsive Scrolling**: Horizontal scroll with single scrollbar, adapts to page size (no double scrollbars)
- **Sticky Action Column**: Right-aligned action column with elevation and visual separation
  - **Floating Behavior**: Always visible on right side during horizontal scroll
  - **Visual Elevation**: Blue400 left border (1px) using inset shadow technique for sticky compatibility
  - **Base Shadow**: Design token shadow for clear elevation above other columns  
  - **White Background**: Covers underlying content when floating
- **Intelligent Column Width System**: Automatic column sizing based on content analysis
  - **Smart Rule**: If all cells in a column have < 11 characters, width = 150px
  - **Special Cases**: Document columns = 300px, Action columns = 130px
  - **Fallback**: Regular columns default to 200px for longer content
  - **Dynamic Optimization**: Analyzes actual data to determine optimal widths
- **Enhanced Action Types**: Streamlined action system with primary action highlighting
  - **Upload (Primary)**: Light green background (#C6FFC1) with success green icon (#2fa915) to indicate primary actions
  - **Validate**: Blue styling with CheckSmall icon + "Validate" text  
  - **Generate**: Blue styling with CalculatorSmall icon + "Generate" text
  - **Setup**: Blue styling with ConfigSmall icon + "Setup" text
- **Three Specialized Cell Types**:
  - **Simple cells**: Standard text with black700 color and right/left/center alignment support
  - **Document cells**: Enhanced with DocumentTable icons and configurable hover icons (download or config)
  - **Action cells**: Button-style cells with row-specific action type selection
- **Responsive Design**: Table adapts to container width while maintaining minimum column requirements
- **Enhanced Dimensions**: 45px row height, intelligent column widths based on content analysis (150px for short content, 200px for long content, 300px for documents, 130px for actions)
- **Dual Pagination Options**: Header pagination (default) and footer pagination with blue400 separator line
- **Dynamic Width**: Automatically calculated based on intelligent column sizing (typically 1550px with optimized columns)
- **Design Tokens**: Full integration with colors, typography, spacing, shadows, and border radius
- Located in "Components" Storybook category with comprehensive interactive examples

## Utilities & Hooks

### Typography Utilities
- **applyTypographyStyle()**: Applies design system typography styles consistently
- **commonTypographyStyles**: Pre-configured styles for labels, fields, helpers, buttons, etc.
- Eliminates repetitive typography object creation across components
- Ensures consistent font application throughout the design system

### Style Utilities
- **injectGlobalStyles()**: Utility for injecting CSS into document head safely
- **commonStyles**: Pre-configured injections for number spinners and custom scrollbars
- **flexCenter, flexAlign()**: Common flex alignment patterns
- **standardTransition()**: Consistent animation transitions
- **colorWithOpacity()**: Color manipulation utility

### Custom Hooks
- **useOutsideClick**: Handles clicks outside referenced elements (dropdowns, modals)
- **useHoverState**: Manages hover state consistently with proper handlers
- Reduces duplicate event handling logic across components
- Provides consistent behavior patterns throughout the library

## Cell Components

### DocumentCell
- Interactive document cell component for downloadable files in table cells with alignment support
- **Alignment Awareness**: Accepts `align` prop ('left', 'center', 'right') for proper text positioning
  - Left alignment: Standard icon + text layout
  - Right alignment: Icon and text positioned to flex-end for proper right-aligned appearance
  - Center alignment: Icon and text centered within cell container
- **Default State**: Blue200 background (`colors.reports.dynamic.blue200`) with document icon + filename
- **Hover State**: Blue300 background (`colors.reports.dynamic.blue300`) with download icon reveal
- **Download Icon Container**: White background, 8px border radius, small shadow from design tokens
- **Text Handling**: Ellipsis for long filenames with proper overflow management
- **Accessibility**: Full keyboard support (Enter/Space), ARIA roles, focus management
- **Design Integration**: Uses DocumentSmall and DownloadSmall icons from library
- **Smooth Animations**: 0.2s ease transitions for background and icon opacity
- **Table Integration**: Table component automatically passes column alignment to DocumentCell
- **Form Integration**: Configurable onDownload callback for file handling
- Uses design tokens: `colors.reports.dynamic.*`, `borderRadius[4]`, `shadows.sm`, `typography.styles.bodyM`

### ActionCell
- Interactive action cell component for table actions (edit, configure, upload)
- **Three Icon Types**: 
  - `'edit'`: EditSmall icon for configuration/editing actions
  - `'add'`: AddSmall icon for upload/creation actions
  - `'plus'`: PlusSmall icon for adding new items
- **Default State**: Transparent background, blue400 border, small shadow
- **Hover State**: Blue300 background, no border, no shadow
- **Button-like Design**: Professional appearance with proper elevation and interaction states
- **Text + Icon Layout**: Action text on left, configurable icon on right with 6px gap
- **Overflow Handling**: Ellipsis for long action names with native HTML tooltips
- **Accessibility**: Full keyboard support, proper ARIA roles, focus management
- **Smooth Transitions**: 0.2s ease animation between all visual states
- **Form Integration**: Configurable onClick callback for action handling
- Uses design tokens: `colors.reports.dynamic.*`, `borderRadius[4]`, `shadows.sm`, `typography.styles.bodyM`

## Enhanced Table System

### Multiple Cell Types
The Table component supports three distinct cell types through the `cellType` property:

1. **Simple Cells** (`cellType: 'simple'`): 
   - Standard text content with ellipsis overflow
   - Native HTML tooltips for truncated text
   - Automatic wrapping for string/number content

2. **Document Cells** (`cellType: 'document'`):
   - DocumentCell component for downloadable files
   - Expects string filename data
   - Configurable download callbacks via `onDownload` property

3. **Action Cells** (`cellType: 'action'`):
   - ActionCell component for interactive buttons
   - Configurable icons via `actionIcon` property
   - Action callbacks via `onAction` property

### Table Features
- **Responsive Design**: Adapts to container width while maintaining minimum requirements, single horizontal scrollbar
- **Internal Cell Components**: DocumentCell and ActionCell are internal components (not exported)
- **Optimized Column Widths**: First column 300px, standard columns 200px, action column 150px
- **Sticky Action Column**: Right-side floating column with blue400 left border, base shadow, and white background
- **Smart Cell Rendering**: Automatically renders appropriate component based on cellType with row-specific action types
- **Consistent Overflow**: All cell types handle text overflow with ellipsis and tooltips
- **Enhanced Dimensions**: 45px row height for better visual spacing and content readability
- **Total Width**: 2050px minimum (300px + 8×200px + 150px) with responsive expansion capability
- **Layout**: `tableLayout: 'fixed'` enforces exact column specifications with sticky positioning support
- **Action System**: Four distinct action types (upload, validate, generate, setup) with proper icon integration
- **Professional Elevation**: Base shadow and border effects for clear visual hierarchy