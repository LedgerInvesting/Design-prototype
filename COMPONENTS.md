# Component Documentation

This document contains detailed documentation for all components in the Ledger Design Library.

## Components Built
1. **Button**: Unified button component with 3 variants (primary, small, icon), multiple colors, icon support, disabled states
2. **InfoTooltip**: Interactive "i" symbol with hover tooltips, supports simple text or complex multi-section content, 5 positioning options
3. **Input**: Complete form input with label, tooltip integration, left symbols ($, %), right icons, 6 states, helper text
4. **DatePicker**: Date selection component based on Input field with calendar icon, all 6 states, form integration
5. **Dropdown**: Complete dropdown component with same Input field specifications and interactive behavior
6. **Selector**: Unified selector component with 2 variants (checkbox, radio), form integration, disabled support
7. **ButtonSelector**: Button-style selector combining button design with embedded checkbox/radio, 3 states, perfect for binary choices
8. **Stack**: Linear layout component for horizontal/vertical arrangements with design token spacing
9. **Grid**: Grid layout component with responsive columns and consistent gaps
10. **Container**: Max-width container with responsive breakpoints for content centering
11. **Spacer**: Flexible and fixed spacing component for layout control
12. **Status**: Interactive status component with dropdown menu functionality (evolved from Chips), 5 semantic variants, 4 menu item states, design system integration
13. **Table**: Complete data table with headers, sorting, pagination, grid structure, and multiple cell types
14. **DocumentCell**: Interactive document cell for downloadable files with hover states and download functionality
15. **ActionCell**: Interactive action cell with configurable icons (edit, add, plus) for table actions

## Page Components
16. **ReportNavigation**: Advanced report navigation interface with program selector, relationship indicators, and sophisticated metric cards
    - Program selector card with dropdown functionality
    - Program relationship pills showing hierarchical connections  
    - Cession and Collateral metrics with growth indicators and trend charts
    - Data Validation metrics with status indicators and validation charts
    - Custom chart components (SmallChart, DataValidationChart) with SVG-based visualizations
    - Full design system integration with proper spacing and typography

## Icon System (103 total icons)
1. **Extra Small (8x8px)**: 9 icons - minimal UI elements (added chevronUp)
2. **Small (12x12px)**: 29 icons - used in IconButton and small components (includes new ArrowUpSmall, ArrowDownSmall for growth indicators)
3. **Medium (22x22px)**: 56 icons - larger UI elements, headers, includes status icons (StatusWarning, StatusError, StatusSuccess)
4. **Table (24x24px)**: 9 icons - specifically for table headers (includes new ArrangeTable icon)

## Component Features Summary

### Button
- Unified component with 3 variants: primary, small, icon
- **Primary variant**: Full-featured buttons with text, icons, 5 colors (black, white, main, light, green)
- **Small variant**: Compact buttons for secondary actions, 5 colors (black, white, main, light, green)  
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
- Complete data table component with header, sortable columns, and customizable body content
- **Compact Design**: Optimized dimensions matching Figma specifications for professional appearance
- **Column Headers**: 32px height with 8px 12px padding and proper Figma-matched styling and typography
- **Body Cells**: 36px height with 8px 12px padding for compact, readable layout
- **Header Features**: Search input, add filter button, pagination controls with item counts
- **Sort Functionality**: 12x12px ArrangeTable icons for sortable columns with consistent blue450 color
- **Grid Structure**: Complete border system with single-width borders throughout
  - Vertical column separators between all columns
  - Horizontal row separators between all rows
  - Clean outer border without double-border artifacts
- **Typography**: Caption S with regular font weight (400) for optimal Figma matching
- **Icons**: Uses design system table icons (24x24px) with proper color integration
- **States**: Support for different column alignments, widths, and sortable/non-sortable columns
- **Content Types**: Supports text, numbers, React components (chips, status icons), and mixed content
- **Form Integration**: Checkbox selection in first column with proper styling
- **Responsive Design**: Fixed table layout with consistent column widths
- **Design Tokens**: Full integration with colors, typography, spacing, and border radius
- Uses `colors.blackAndWhite.black500` for text, `colors.reports.blue450` for sort icons
- Located in "Components" Storybook category with comprehensive examples

## Layout Components

### Stack
- Flexible linear layout component for horizontal and vertical arrangements
- **Direction**: horizontal or vertical stacking
- **Gap**: Consistent spacing using design tokens (0-24)
- **Alignment**: Control cross-axis alignment (start, center, end, stretch)
- **Justification**: Control main-axis distribution (start, center, end, between, around, evenly)
- **Wrapping**: Optional flex-wrap support for responsive layouts
- **Semantic**: Customizable HTML element (div, section, nav, etc.)
- Perfect for forms, navigation, button groups, and any linear layouts
- Uses design tokens: `spacing.*` for consistent gaps

### Grid
- Two-dimensional grid layout with responsive capabilities
- **Columns**: Fixed columns (1-12) or responsive auto-fit behavior
- **Gap**: Consistent spacing using design tokens
- **Auto-fit**: Responsive columns with customizable minimum width
- **Alignment**: Control item alignment within grid areas
- **Responsive**: Built-in responsive behavior with minmax()
- Perfect for card layouts, image galleries, dashboards, and responsive grids
- Uses design tokens: `spacing.*` for consistent gaps

### Container
- Max-width container with responsive breakpoints for content centering
- **Max Width**: Predefined breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)
- **Custom Width**: Support for custom width values (e.g., "900px")
- **Padding**: Consistent horizontal padding using design tokens
- **Centering**: Automatic horizontal centering (optional)
- **Semantic**: Customizable HTML element
- Perfect for page layouts, content sections, and maintaining consistent content width
- Uses design tokens: `spacing.*` for consistent padding

### Spacer
- Flexible and fixed spacing component for precise layout control
- **Flexible Growth**: Grows to fill available space by default
- **Fixed Size**: Use design tokens for consistent fixed spacing
- **Direction**: Works in both horizontal and vertical layouts
- **Invisible**: Creates space without visual elements
- Perfect for pushing elements apart, creating flexible layouts, and navbar spacing
- Uses design tokens: `spacing.*` for consistent fixed spacing

## Cell Components

### DocumentCell
- Interactive document cell component for downloadable files in table cells
- **Default State**: Blue200 background (`colors.reports.dynamic.blue200`) with document icon + filename
- **Hover State**: Blue300 background (`colors.reports.dynamic.blue300`) with download icon reveal
- **Download Icon Container**: White background, 8px border radius, small shadow from design tokens
- **Text Handling**: Ellipsis for long filenames with proper overflow management
- **Accessibility**: Full keyboard support (Enter/Space), ARIA roles, focus management
- **Design Integration**: Uses DocumentSmall and DownloadSmall icons from library
- **Smooth Animations**: 0.2s ease transitions for background and icon opacity
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
- **Compact Design**: Optimized for professional, space-efficient layout matching Figma specifications
- **Internal Cell Components**: DocumentCell and ActionCell are internal components (not exported)
- **Fixed Column Widths**: First column 350px, all others 180px with strict enforcement
- **Horizontal Scroll**: Table content scrolls while header (search, filter, pagination) stays fixed
- **Smart Cell Rendering**: Automatically renders appropriate component based on cellType
- **Consistent Overflow**: All cell types handle text overflow with ellipsis and tooltips
- **Total Width**: 1970px (350px + 9×180px) for 10 columns with horizontal scroll activation
- **Layout**: `tableLayout: 'fixed'` enforces exact column specifications regardless of content
- **Clean Architecture**: Cell components properly encapsulated within Table component