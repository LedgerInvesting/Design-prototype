# Table Component Documentation

**Comprehensive guide to creating and using tables in the Ledger Design Library**

---

## Table of Contents
1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Table Anatomy](#table-anatomy)
4. [Cell Types](#cell-types)
5. [Column Configuration](#column-configuration)
6. [Row Configuration](#row-configuration)
7. [Grouped Rows](#grouped-rows)
8. [Pagination](#pagination)
9. [Sorting](#sorting)
10. [Alignment Control](#alignment-control)
11. [Customize Columns](#customize-columns)
12. [Common Patterns](#common-patterns)
13. [Complete Examples](#complete-examples)
14. [Best Practices](#best-practices)

---

## Overview

The Table component is a comprehensive, feature-rich data table that supports:
- ✅ Multiple cell types (simple, document, action, custom, status)
- ✅ Sortable columns with intelligent numeric/text detection
- ✅ Grouped and collapsible rows
- ✅ Dual pagination modes (modern and classic)
- ✅ Full alignment control (headers and cells)
- ✅ Customize columns (show/hide columns dynamically)
- ✅ Horizontal scrolling with intelligent drag cursor
- ✅ Search functionality
- ✅ Theme-aware styling
- ✅ Responsive design

**Import:**
```tsx
import { Table } from '@design-library/components';
import type { TableColumn, TableRow } from '@design-library/components';
```

---

## Quick Start

### Basic Table
```tsx
import { Table } from '@design-library/components';
import { DocumentTable, TextTable } from '@design-library/icons';
import { useSemanticColors } from '@design-library/tokens';

function MyTable() {
  const colors = useSemanticColors();

  const columns = [
    {
      key: 'name',
      title: 'Name',
      icon: <DocumentTable color={colors.theme.primary450} />,
      sortable: true,
      width: '300px',
      cellType: 'simple',
      align: 'left',
      headerAlign: 'left',
    },
    {
      key: 'value',
      title: 'Value',
      icon: <TextTable color={colors.theme.primary450} />,
      sortable: true,
      width: '150px',
      cellType: 'simple',
      align: 'right',
      headerAlign: 'right',
    },
  ];

  const data = [
    { name: 'Aviation Treaty 2023', value: '£14,235,825' },
    { name: 'Marine Policy 2024', value: '£12,150,320' },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      title="My Table"
      showHeader={true}
      showSearch={true}
    />
  );
}
```

---

## Table Anatomy

A complete table consists of:

```
┌─────────────────────────────────────────────────┐
│ COMPACT TABLE HEADER                            │
│ ┌─────────────┐              ┌──────────────┐  │
│ │ Title       │              │ Search  Pagi │  │
│ └─────────────┘              └──────────────┘  │
├─────────────────────────────────────────────────┤
│ COLUMN HEADERS                                  │
│ ┌────────┬────────┬────────┬────────┐         │
│ │ Icon ▲ │ Icon ▲ │ Icon ▲ │ Icon ▲ │         │
│ └────────┴────────┴────────┴────────┘         │
├─────────────────────────────────────────────────┤
│ TABLE BODY                                      │
│ ┌────────┬────────┬────────┬────────┐         │
│ │ Cell   │ Cell   │ Cell   │ Cell   │         │
│ │ Cell   │ Cell   │ Cell   │ Cell   │         │
│ │ > Group Header with Chevron        │         │
│ │   ↳ Child Row (indented)           │         │
│ │   ↳ Child Row (indented)           │         │
│ │ Cell   │ Cell   │ Cell   │ Cell   │         │
│ └────────┴────────┴────────┴────────┘         │
├─────────────────────────────────────────────────┤
│ FOOTER PAGINATION (optional)                    │
│              ┌──────────────┐                   │
│              │  1 2 3 ... 8 │                   │
│              └──────────────┘                   │
└─────────────────────────────────────────────────┘
```

**Components:**
1. **Compact Table Header**: Title, search, and pagination
2. **Column Headers**: Sortable column titles with icons
3. **Table Body**: Data rows (simple, grouped, or custom cells)
4. **Footer Pagination**: Optional modern pagination controls

---

## Cell Types

The Table supports 5 cell types, specified via the `cellType` property in column configuration.

### 1. Simple Cell (`cellType: 'simple'`)
Standard text-based cell. Default cell type.

```tsx
{
  key: 'name',
  title: 'Name',
  cellType: 'simple',
  align: 'left',
}
```

**Data:**
```tsx
{ name: 'Aviation Treaty 2023' }
```

### 2. Document Cell (`cellType: 'document'`)
Displays a document icon with text. Supports hover actions (download, config, open).

```tsx
{
  key: 'filename',
  title: 'Document',
  cellType: 'document',
  hoverIcon: 'open', // 'download', 'config', or 'open'
  onDownload: (filename: string) => {
    console.log('Opening:', filename);
  },
  align: 'left',
  headerAlign: 'left',
}
```

**Data:**
```tsx
{ filename: 'contract_2023.pdf' }
```

### 3. Action Cell (`cellType: 'action'`)
Interactive button cell with icon and text.

```tsx
{
  key: 'action',
  title: 'Action',
  cellType: 'action',
  actionType: 'upload', // 'edit', 'upload', 'validate', 'add', 'delete', 'plus'
  onAction: (actionType, text) => {
    console.log('Action:', actionType, text);
  },
  actionCellProps: {
    text: 'Upload',
    iconBackgroundColor: colors.theme.primary500,
    iconColor: colors.theme.main,
  },
  align: 'center',
}
```

**Data:**
```tsx
{ action: 'Upload File' }
```

### 4. Status Cell (`cellType: 'status'`)
Displays a status badge with dropdown menu.

```tsx
{
  key: 'status',
  title: 'Status',
  cellType: 'status',
  align: 'center',
}
```

**Data:**
```tsx
{
  status: {
    variant: 'success', // 'success', 'pending', 'warning', 'error', 'neutral'
    label: 'Active',
  }
}
```

### 5. Custom Cell (`cellType: 'custom'`)
Fully customizable cell with multiple elements.

```tsx
{
  key: 'custom',
  title: 'Details',
  cellType: 'custom',
  customCellProps: {
    alignment: 'center',
    direction: 'horizontal',
    gap: 8,
  },
  align: 'center',
}
```

**Data:**
```tsx
{
  custom: [
    <StatusWarning color={colors.warning.textAndStrokes} />,
    'Warning message',
  ]
}
```

---

## Column Configuration

### TableColumn Interface
```tsx
interface TableColumn {
  key: string;                    // Data key (required)
  title: string;                  // Column header title (required)
  icon?: React.ReactNode;         // Icon displayed in header
  sortable?: boolean;             // Enable sorting
  sortIcon?: React.ReactNode;     // Custom sort icon
  width?: string;                 // Column width (e.g., '300px')
  align?: 'left' | 'center' | 'right';       // Cell content alignment
  headerAlign?: 'left' | 'center' | 'right'; // Header text alignment
  cellType?: CellType;            // 'simple' | 'document' | 'action' | 'custom' | 'status'

  // Document cell props
  onDownload?: (filename: string) => void;
  hoverIcon?: 'download' | 'config' | 'open';

  // Action cell props
  actionType?: ActionType;
  onAction?: (actionType: ActionType, text: string) => void;
  actionCellProps?: {
    icon?: React.ReactNode;
    text?: string;
    iconBackgroundColor?: string;
    iconColor?: string;
  };

  // Custom cell props
  customCellProps?: {
    alignment?: 'left' | 'center' | 'right';
    direction?: 'horizontal' | 'vertical';
    gap?: number;
    onClick?: () => void;
  };

  // Custom render function
  render?: (value: any, row: any) => React.ReactNode;
}
```

### Column Width Recommendations
- **Document/Name columns**: `300px` - `400px`
- **Data columns (numbers, dates)**: `120px` - `180px`
- **Action columns**: `120px` - `150px`
- **Status columns**: `100px` - `120px`

---

## Row Configuration

### TableRow Interface
```tsx
interface TableRow {
  [key: string]: React.ReactNode;  // Data fields
  isGroup?: boolean;                // Is this a group header row?
  groupName?: string;               // Group header name
  isGroupChild?: boolean;           // Is this a child of a group?
  isExpanded?: boolean;             // Is this group expanded?
}
```

### Standard Row
```tsx
const data = [
  {
    id: '1',
    name: 'Aviation Treaty 2023',
    value: '£14,235,825',
  },
];
```

### Grouped Rows (see [Grouped Rows](#grouped-rows) section)
```tsx
const data = [
  // Group header
  {
    isGroup: true,
    groupName: 'Aviation Treaties',
    isExpanded: true,
  },
  // Child rows
  {
    id: '1',
    name: 'Aviation Treaty 2023',
    value: '£14,235,825',
    isGroupChild: true,
  },
];
```

---

## Grouped Rows

Grouped rows allow you to organize related rows under collapsible group headers.

### Features
- ✅ Folder-like group headers with chevron icons
- ✅ Click chevron to expand/collapse groups
- ✅ Child rows have 39px left padding for visual hierarchy
- ✅ Mix grouped and ungrouped rows in the same table
- ✅ Analytics theme chevron (green900)

### Implementation

**1. Define grouped data:**
```tsx
const [tableData, setTableData] = useState([
  // Ungrouped row
  {
    id: 'standalone-1',
    triangle: 'abc123...',
    lossReserve: '£8,542,190',
  },

  // Group header
  {
    isGroup: true,
    groupName: 'Aviation Treaty 2024',
    isExpanded: true,
  },

  // Grouped children (with isGroupChild: true)
  {
    id: 'child-1',
    triangle: 'def456...',
    lossReserve: '£14,235,825',
    isGroupChild: true, // Adds 39px left padding
  },
  {
    id: 'child-2',
    triangle: 'ghi789...',
    lossReserve: '£12,150,320',
    isGroupChild: true,
  },

  // Another ungrouped row
  {
    id: 'standalone-2',
    triangle: 'jkl012...',
    lossReserve: '£6,321,450',
  },
]);
```

**2. Create toggle handler:**
```tsx
const handleGroupToggle = (rowIndex: number) => {
  setTableData(prevData => {
    const newData = [...prevData];
    const groupRow = newData[rowIndex];

    if (groupRow.isGroup) {
      groupRow.isExpanded = !groupRow.isExpanded;
    }

    return newData;
  });
};
```

**3. Filter visible data:**
```tsx
const visibleData = tableData.filter((row, index) => {
  if (!row.isGroupChild) return true;

  // Find the parent group
  let groupIndex = index - 1;
  while (groupIndex >= 0 && !tableData[groupIndex].isGroup) {
    groupIndex--;
  }

  if (groupIndex >= 0 && tableData[groupIndex].isGroup) {
    return tableData[groupIndex].isExpanded !== false;
  }

  return true;
});
```

**4. Render table:**
```tsx
<Table
  columns={columns}
  data={visibleData}
  onGroupToggle={handleGroupToggle}
  title="Grouped Triangles"
/>
```

### Group Row Properties
- `isGroup: true` - Marks row as group header
- `groupName: string` - Name displayed in header
- `isExpanded: boolean` - Controls group visibility
- `isGroupChild: true` - Adds left padding (39px)

---

## Pagination

The Table supports two pagination modes:

### 1. Modern Pagination (Header + Footer)
Displays pagination in both header and footer with modern design.

```tsx
<Table
  columns={columns}
  data={data}
  currentPage={1}
  totalPages={10}
  totalItems={100}
  itemsPerPage={10}
  onPageChange={(page) => console.log('Page:', page)}
  pagination={{ enabled: true, variant: 'modern' }}
/>
```

### 2. Classic Pagination (Header Only)
Displays pagination only in the compact header.

```tsx
<Table
  columns={columns}
  data={data}
  currentPage={1}
  totalPages={10}
  totalItems={100}
  itemsPerPage={10}
  onPageChange={(page) => console.log('Page:', page)}
  pagination={{ enabled: true, variant: 'classic' }}
/>
```

### Pagination Props
```tsx
interface TableProps {
  currentPage?: number;      // Current page number (1-based)
  totalPages?: number;       // Total number of pages
  totalItems?: number;       // Total number of items
  itemsPerPage?: number;     // Items per page
  onPageChange?: (page: number) => void;
  pagination?: {
    enabled: boolean;
    variant: 'modern' | 'classic';
  };
}
```

---

## Sorting

### Enable Sorting
Set `sortable: true` on any column:

```tsx
const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    sortIcon: <ArrangeTable color={colors.theme.primary450} />,
  },
];
```

### Sorting Behavior
- Click column header to sort ascending
- Click again to sort descending
- Click again to remove sort
- **Intelligent detection**: Automatically detects numbers, currencies, percentages

### Custom Sort Logic
```tsx
const [sortState, setSortState] = useState({ column: null, direction: null });

const handleSort = (column: string) => {
  setSortState(prev => ({
    column,
    direction: prev.column === column
      ? (prev.direction === 'asc' ? 'desc' : prev.direction === 'desc' ? null : 'asc')
      : 'asc',
  }));
};

<Table
  columns={columns}
  data={data}
  sortState={sortState}
  onSort={handleSort}
/>
```

---

## Alignment Control

Control alignment for both column headers and cell content independently.

### Header Alignment (`headerAlign`)
Controls column header text and icon alignment:
- `left` - Left-aligned header
- `center` - Centered header
- `right` - Right-aligned header

### Cell Alignment (`align`)
Controls data cell content alignment:
- `left` - Left-aligned content
- `center` - Centered content
- `right` - Right-aligned content

### Professional Layout Pattern
**Best Practice:** First column left-aligned, data columns right-aligned

```tsx
const columns = [
  {
    key: 'name',
    title: 'Program Name',
    align: 'left',         // Cell content left
    headerAlign: 'left',   // Header left
    width: '300px',
  },
  {
    key: 'premium',
    title: 'Premium',
    align: 'right',        // Numbers right-aligned
    headerAlign: 'right',  // Header right-aligned
    width: '150px',
  },
  {
    key: 'ratio',
    title: 'Loss Ratio',
    align: 'right',
    headerAlign: 'right',
    width: '120px',
  },
];
```

---

## Customize Columns

The Customize Columns feature allows users to dynamically show/hide table columns through an interactive dropdown interface.

### Features
- ✅ Settings dropdown button in table header (next to search)
- ✅ Checkbox interface for toggling column visibility
- ✅ Real-time table updates when columns are shown/hidden
- ✅ Smooth layout transitions
- ✅ Theme-aware styling
- ✅ Click-outside-to-close behavior

### Implementation

**1. Enable the feature:**
```tsx
<Table
  columns={columns}
  data={data}
  showCustomizeColumns={true}
  visibleColumns={visibleColumns}
  onColumnVisibilityChange={handleColumnVisibilityChange}
/>
```

**2. Set up state management:**
```tsx
const [visibleColumns, setVisibleColumns] = useState([
  'name',      // Start with these columns visible
  'value',
  'status',
]);

const handleColumnVisibilityChange = (columnKey: string, visible: boolean) => {
  if (visible) {
    // Add column to visible list
    setVisibleColumns([...visibleColumns, columnKey]);
  } else {
    // Remove column from visible list
    setVisibleColumns(visibleColumns.filter(key => key !== columnKey));
  }
};
```

**3. Define columns normally:**
```tsx
const columns = [
  {
    key: 'name',
    title: 'Name',
    icon: <DocumentTable color={colors.theme.primary450} />,
    width: '300px',
    cellType: 'simple',
    align: 'left',
    headerAlign: 'left',
  },
  {
    key: 'value',
    title: 'Value',
    icon: <TextTable color={colors.theme.primary450} />,
    width: '150px',
    cellType: 'simple',
    align: 'right',
    headerAlign: 'right',
  },
  {
    key: 'status',
    title: 'Status',
    icon: <StatusTable color={colors.theme.primary450} />,
    width: '120px',
    cellType: 'status',
    align: 'center',
    headerAlign: 'center',
  },
];
```

### Complete Example
```tsx
import { Table } from '@design-library/components';
import { useState } from 'react';
import { DocumentTable, TextTable, AmmountTable } from '@design-library/icons';
import { useSemanticColors } from '@design-library/tokens';

function CustomizableTable() {
  const colors = useSemanticColors();

  // Track which columns are visible
  const [visibleColumns, setVisibleColumns] = useState([
    'programTag',
    'treatyYear',
    'premium',
  ]);

  // Handle column visibility changes
  const handleColumnVisibilityChange = (columnKey: string, visible: boolean) => {
    if (visible) {
      setVisibleColumns([...visibleColumns, columnKey]);
    } else {
      setVisibleColumns(visibleColumns.filter(key => key !== columnKey));
    }
  };

  const columns = [
    {
      key: 'programTag',
      title: 'Program Tag',
      icon: <DocumentTable color={colors.theme.primary450} />,
      width: '300px',
      cellType: 'simple',
      align: 'left',
      headerAlign: 'left',
    },
    {
      key: 'treatyYear',
      title: 'Treaty Year',
      icon: <TextTable color={colors.theme.primary450} />,
      width: '120px',
      cellType: 'simple',
      align: 'right',
      headerAlign: 'right',
    },
    {
      key: 'premium',
      title: 'Premium',
      icon: <AmmountTable color={colors.theme.primary450} />,
      width: '150px',
      cellType: 'simple',
      align: 'right',
      headerAlign: 'right',
    },
  ];

  const data = [
    {
      programTag: 'Aviation Treaty 2023',
      treatyYear: 'TY23',
      premium: '£14,235,825',
    },
    {
      programTag: 'Marine Policy 2024',
      treatyYear: 'TY24',
      premium: '£12,150,320',
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      title="Valuations"
      showHeader={true}
      showSearch={true}
      showCustomizeColumns={true}
      visibleColumns={visibleColumns}
      onColumnVisibilityChange={handleColumnVisibilityChange}
    />
  );
}
```

### Props Reference

```tsx
interface TableProps {
  // Customize Columns props
  showCustomizeColumns?: boolean;  // Enable customize columns feature
  visibleColumns?: string[];       // Array of visible column keys
  onColumnVisibilityChange?: (columnKey: string, visible: boolean) => void;
}
```

**`showCustomizeColumns`**: `boolean` (optional)
- Enables the Customize Columns dropdown button in the table header
- Button appears next to the search input
- Default: `false`

**`visibleColumns`**: `string[]` (optional)
- Array of column keys that should be displayed
- Only columns with keys in this array will be visible
- If empty or not provided, all columns are shown
- Example: `['name', 'value', 'status']`

**`onColumnVisibilityChange`**: `(columnKey: string, visible: boolean) => void` (optional)
- Callback fired when user toggles a column checkbox
- `columnKey`: The key of the toggled column
- `visible`: New visibility state (true = show, false = hide)
- Use this to update your `visibleColumns` state

### UI Behavior

**Dropdown Button:**
- Located in table header, right of search input
- Settings icon with "Customize columns" text
- Theme-aware primary200 background
- Opens dropdown on click

**Dropdown Menu:**
- Title: "Show columns"
- Lists all columns with checkboxes
- Checkboxes reflect current visibility state
- Click checkbox to toggle column visibility
- Click outside dropdown to close
- Positioned below the button (38px offset)

**Table Updates:**
- Columns immediately show/hide when toggled
- Smart column sizing recalculates for remaining visible columns
- Smooth transitions maintain table layout
- Column order remains unchanged (only visibility affected)

### Best Practices

**✅ DO:**
- **Start with key columns visible**: Initialize `visibleColumns` with the most important columns
- **Persist preferences**: Store column visibility in localStorage for user convenience
- **Ensure minimum columns**: Keep at least 1-2 essential columns always visible
- **Use descriptive column titles**: Clear titles help users understand what they're showing/hiding
- **Combine with search**: Customize Columns works great alongside search functionality

**❌ DON'T:**
- **Don't allow hiding all columns**: Ensure at least one column is always visible
- **Don't change column order**: Only toggle visibility, maintain original column sequence
- **Don't reset on re-render**: Preserve user's column choices across renders
- **Don't hide critical columns**: Some columns (like primary identifiers) should always be visible

### Persistence Example

Store column preferences in localStorage:

```tsx
import { useState, useEffect } from 'react';

function PersistentCustomizableTable() {
  const STORAGE_KEY = 'table-visible-columns';

  // Initialize from localStorage or defaults
  const [visibleColumns, setVisibleColumns] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : ['name', 'value', 'status'];
  });

  // Save to localStorage when columns change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  const handleColumnVisibilityChange = (columnKey: string, visible: boolean) => {
    if (visible) {
      setVisibleColumns([...visibleColumns, columnKey]);
    } else {
      // Prevent hiding last column
      if (visibleColumns.length > 1) {
        setVisibleColumns(visibleColumns.filter(key => key !== columnKey));
      }
    }
  };

  return (
    <Table
      columns={columns}
      data={data}
      showCustomizeColumns={true}
      visibleColumns={visibleColumns}
      onColumnVisibilityChange={handleColumnVisibilityChange}
    />
  );
}
```

### Advanced: Minimum Required Columns

Prevent users from hiding critical columns:

```tsx
const REQUIRED_COLUMNS = ['name', 'id']; // Always visible

const handleColumnVisibilityChange = (columnKey: string, visible: boolean) => {
  // Don't allow hiding required columns
  if (!visible && REQUIRED_COLUMNS.includes(columnKey)) {
    return;
  }

  if (visible) {
    setVisibleColumns([...visibleColumns, columnKey]);
  } else {
    // Prevent hiding last visible column
    const remainingColumns = visibleColumns.filter(key => key !== columnKey);
    if (remainingColumns.length > 0) {
      setVisibleColumns(remainingColumns);
    }
  }
};
```

### Styling

The Customize Columns feature uses theme-aware design tokens:

```tsx
// Button styling
backgroundColor: colors.theme.primary200,  // Theme-aware background
borderRadius: borderRadius.absolute,       // Rounded pill shape
height: '30px',
padding: '4px 12px',

// Dropdown styling
border: `1px solid ${colors.theme.primary400}`,
borderRadius: borderRadius[8],
boxShadow: shadows.medium,
```

All styling automatically adapts to the current theme (Reports/Analytics/Marketplace).

### Storybook Example

See the **CustomizeColumns** story in Table.stories.tsx for a live interactive example:

```bash
cd "E:\Ledger design library\design-library"
npm run storybook
```

Navigate to: `Components > Table > CustomizeColumns`

---

## Common Patterns

### Pattern 1: Analytics Table (Green Theme)
```tsx
import { useSemanticColors } from '@design-library/tokens';
import { DocumentTable, TextTable, AmmountTable, ArrangeTable } from '@design-library/icons';

const colors = useSemanticColors();

const columns = [
  {
    key: 'triangle',
    title: 'Triangle',
    icon: <DocumentTable color={colors.theme.primary450} />,
    sortIcon: <ArrangeTable color={colors.theme.primary450} />,
    sortable: true,
    width: '300px',
    cellType: 'document',
    align: 'left',
    headerAlign: 'left',
  },
  {
    key: 'lossReserve',
    title: 'Loss Reserve',
    icon: <AmmountTable color={colors.theme.primary450} />,
    sortIcon: <ArrangeTable color={colors.theme.primary450} />,
    sortable: true,
    width: '150px',
    align: 'right',
    headerAlign: 'right',
    cellType: 'simple',
  },
];
```

### Pattern 2: Reports Table (Blue Theme)
```tsx
const columns = [
  {
    key: 'contract',
    title: 'Contract',
    icon: <DocumentTable color={colors.theme.primary450} />,
    sortable: true,
    width: '300px',
    cellType: 'document',
    hoverIcon: 'open',
    onDownload: (filename) => navigateToContract(filename),
    align: 'left',
    headerAlign: 'left',
  },
  {
    key: 'status',
    title: 'Status',
    icon: <StatusTable color={colors.theme.primary450} />,
    width: '120px',
    cellType: 'status',
    align: 'center',
    headerAlign: 'center',
  },
];
```

### Pattern 3: Transaction Management Table
```tsx
const columns = [
  {
    key: 'transaction',
    title: 'Transaction ID',
    icon: <TextTable color={colors.theme.primary450} />,
    sortable: true,
    width: '250px',
    cellType: 'simple',
    align: 'left',
    headerAlign: 'left',
  },
  {
    key: 'amount',
    title: 'Amount',
    icon: <AmmountTable color={colors.theme.primary450} />,
    sortable: true,
    width: '150px',
    cellType: 'simple',
    align: 'right',
    headerAlign: 'right',
  },
  {
    key: 'action',
    title: 'Action',
    cellType: 'action',
    actionType: 'validate',
    width: '120px',
    align: 'center',
    headerAlign: 'center',
  },
];
```

---

## Complete Examples

### Example 1: Simple Table with Search and Pagination
```tsx
import { Table } from '@design-library/components';
import { DocumentTable, TextTable } from '@design-library/icons';
import { useSemanticColors } from '@design-library/tokens';

function SimpleTable() {
  const colors = useSemanticColors();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const columns = [
    {
      key: 'name',
      title: 'Name',
      icon: <DocumentTable color={colors.theme.primary450} />,
      sortable: true,
      width: '300px',
      cellType: 'simple',
      align: 'left',
      headerAlign: 'left',
    },
    {
      key: 'value',
      title: 'Value',
      icon: <TextTable color={colors.theme.primary450} />,
      sortable: true,
      width: '150px',
      cellType: 'simple',
      align: 'right',
      headerAlign: 'right',
    },
  ];

  const data = [
    { name: 'Item 1', value: '$1,000' },
    { name: 'Item 2', value: '$2,000' },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      title="Simple Table"
      showHeader={true}
      showSearch={true}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      currentPage={currentPage}
      totalPages={5}
      totalItems={50}
      itemsPerPage={10}
      onPageChange={setCurrentPage}
    />
  );
}
```

### Example 2: Grouped Table with Collapsible Rows
```tsx
import { Table } from '@design-library/components';
import { useState } from 'react';

function GroupedTable() {
  const colors = useSemanticColors();
  const [tableData, setTableData] = useState([
    {
      id: 'standalone-1',
      name: 'Standalone Item',
      value: '£1,000',
    },
    {
      isGroup: true,
      groupName: 'Group A',
      isExpanded: true,
    },
    {
      id: 'child-1',
      name: 'Child Item 1',
      value: '£500',
      isGroupChild: true,
    },
    {
      id: 'child-2',
      name: 'Child Item 2',
      value: '£300',
      isGroupChild: true,
    },
  ]);

  const handleGroupToggle = (rowIndex) => {
    setTableData(prevData => {
      const newData = [...prevData];
      if (newData[rowIndex].isGroup) {
        newData[rowIndex].isExpanded = !newData[rowIndex].isExpanded;
      }
      return newData;
    });
  };

  const visibleData = tableData.filter((row, index) => {
    if (!row.isGroupChild) return true;
    let groupIndex = index - 1;
    while (groupIndex >= 0 && !tableData[groupIndex].isGroup) {
      groupIndex--;
    }
    return tableData[groupIndex]?.isExpanded !== false;
  });

  const columns = [
    {
      key: 'name',
      title: 'Name',
      width: '300px',
      cellType: 'simple',
      align: 'left',
      headerAlign: 'left',
    },
    {
      key: 'value',
      title: 'Value',
      width: '150px',
      cellType: 'simple',
      align: 'right',
      headerAlign: 'right',
    },
  ];

  return (
    <Table
      columns={columns}
      data={visibleData}
      onGroupToggle={handleGroupToggle}
      title="Grouped Table"
    />
  );
}
```

### Example 3: Advanced Table with Multiple Cell Types
```tsx
function AdvancedTable() {
  const colors = useSemanticColors();

  const columns = [
    {
      key: 'document',
      title: 'Document',
      icon: <DocumentTable color={colors.theme.primary450} />,
      cellType: 'document',
      hoverIcon: 'open',
      onDownload: (filename) => console.log('Open:', filename),
      width: '300px',
      align: 'left',
      headerAlign: 'left',
    },
    {
      key: 'status',
      title: 'Status',
      icon: <StatusTable color={colors.theme.primary450} />,
      cellType: 'status',
      width: '120px',
      align: 'center',
      headerAlign: 'center',
    },
    {
      key: 'amount',
      title: 'Amount',
      icon: <AmmountTable color={colors.theme.primary450} />,
      sortable: true,
      width: '150px',
      cellType: 'simple',
      align: 'right',
      headerAlign: 'right',
    },
    {
      key: 'action',
      title: 'Action',
      cellType: 'action',
      actionType: 'validate',
      onAction: (type, text) => console.log('Action:', type, text),
      width: '120px',
      align: 'center',
      headerAlign: 'center',
    },
  ];

  const data = [
    {
      document: 'contract_2023.pdf',
      status: { variant: 'success', label: 'Active' },
      amount: '$14,235,825',
      action: 'Validate',
    },
    {
      document: 'policy_2024.pdf',
      status: { variant: 'pending', label: 'Pending' },
      amount: '$12,150,320',
      action: 'Validate',
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      title="Advanced Table"
      showHeader={true}
      showSearch={true}
      pagination={{ enabled: true, variant: 'modern' }}
    />
  );
}
```

---

## Best Practices

### ✅ DO
- **Use consistent alignment**: First column left, data columns right
- **Set explicit widths**: Define column widths for better control
- **Use theme colors**: Always use `colors.theme.primary450` for icons
- **Group related data**: Use grouped rows for hierarchical data
- **Enable sorting on data columns**: Make numeric/date columns sortable
- **Use appropriate cell types**: Match cell type to data (document, status, action)
- **Provide pagination**: For tables with more than 20 rows
- **Use semantic column keys**: Clear, descriptive column key names

### ❌ DON'T
- **Don't hardcode colors**: Always use design tokens
- **Don't mix alignment styles**: Be consistent within a table
- **Don't overuse custom cells**: Use built-in cell types when possible
- **Don't skip width definitions**: Tables without widths can be unpredictable
- **Don't use too many columns**: Keep tables focused (6-8 columns max)
- **Don't forget responsive design**: Consider horizontal scroll for wide tables
- **Don't ignore loading states**: Handle empty states gracefully

### Column Width Guidelines
- **Primary identifier column**: 250px - 350px
- **Data columns (numbers)**: 100px - 150px
- **Date columns**: 150px - 180px
- **Status columns**: 100px - 120px
- **Action columns**: 100px - 150px
- **Long text columns**: 200px - 300px

### Accessibility
- All tables include proper ARIA labels
- Sortable columns are keyboard accessible
- Action buttons are focusable
- Status dropdowns support keyboard navigation

### Performance
- Use pagination for large datasets (> 50 rows)
- Consider virtualization for very large tables (> 500 rows)
- Memoize column definitions to prevent re-renders
- Use React.memo for custom cell components

---

## Component Reference

### Table Props
```tsx
interface TableProps {
  columns: TableColumn[];              // Column definitions (required)
  data: TableRow[];                    // Row data (required)
  title?: string;                      // Table title
  showHeader?: boolean;                // Show compact header
  searchValue?: string;                // Search input value
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;                // Show search input
  currentPage?: number;                // Current page (1-based)
  totalPages?: number;                 // Total pages
  totalItems?: number;                 // Total items
  itemsPerPage?: number;               // Items per page
  onPageChange?: (page: number) => void;
  sortState?: SortState;               // Current sort state
  onSort?: (column: string) => void;   // Sort handler
  onGroupToggle?: (rowIndex: number) => void; // Group toggle handler
  pagination?: {
    enabled: boolean;
    variant: 'modern' | 'classic';
  };
  emptyMessage?: string;               // Message when no data
  className?: string;
}
```

---

## Storybook Reference

View live examples in Storybook:
- **Default**: Basic table example
- **FullTable**: Complete table with all features
- **GroupedRows**: Grouped and collapsible rows
- **SortableColumns**: Sortable column demonstration
- **CellTypesShowcase**: All 5 cell types
- **ActionButtonsShowcase**: Action cell variations
- **ColumnAlignment**: Alignment control examples
- **CustomizeColumns**: Dynamic column visibility control
- **HorizontalScroll**: Wide tables with scrolling

**Start Storybook:**
```bash
cd "E:\Ledger design library\design-library"
npm run storybook
```

Navigate to: `Components > Table`

---

## Troubleshooting

### Issue: Chevron not displaying in grouped rows
**Solution:** Ensure you're importing `colors` (not `staticColors`) from tokens:
```tsx
import { colors } from '@design-library/tokens';
```

### Issue: Table not scrolling horizontally
**Solution:** Set explicit widths on all columns:
```tsx
columns.forEach(col => col.width = '150px');
```

### Issue: Sorting not working
**Solution:** Implement `onSort` handler or use internal sorting:
```tsx
const [sortState, setSortState] = useState({ column: null, direction: null });
<Table sortState={sortState} onSort={(col) => setSortState(...)} />
```

### Issue: Grouped rows not collapsing
**Solution:** Ensure `visibleData` filter logic finds the parent group correctly:
```tsx
let groupIndex = index - 1;
while (groupIndex >= 0 && !tableData[groupIndex].isGroup) {
  groupIndex--;
}
```

---

## Further Reading

- **[COMPONENTS.md](./COMPONENTS.md)**: Detailed component documentation
- **[LIBRARY_USAGE.md](./LIBRARY_USAGE.md)**: Quick reference guide
- **[Table.stories.tsx](./design-library/src/components/Table.stories.tsx)**: All Storybook examples
- **[Table.tsx](./design-library/src/components/Table.tsx)**: Component source code

---

**Last Updated:** October 2025
**Component Version:** 2.1
**Maintained by:** Ledger Design Library Team
