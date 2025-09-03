import React, { useState } from 'react';
import { colors, typography, borderRadius, shadows } from '../tokens';
import { SearchMedium, ChevronLeftSmall, ChevronRightSmall, PlusExtraSmall } from '../icons';
import { DocumentCell } from './DocumentCell';
import { ActionCell, ActionType } from './ActionCell';

// Base interfaces
export type CellType = 'simple' | 'document' | 'action';

export interface TableColumn {
  key: string;
  title: string;
  icon?: React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  cellType?: CellType;
  onDownload?: (filename: string) => void; // For document cells
  hoverIcon?: 'download' | 'config'; // For document cells hover icon
  actionType?: ActionType; // For action cells (edit, upload, validate, add, delete, plus)
  onAction?: (actionType: ActionType, text: string) => void; // For action cells
}

export interface TableRow {
  [key: string]: React.ReactNode;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: string | null;
  direction: SortDirection;
}

// Table Header Component
export interface TableHeaderProps {
  title?: string;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showTabs?: boolean;
  tabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  showSearch = true,
  searchValue = '',
  onSearchChange,
  showTabs = true,
  tabs = ['All', 'By Ceding Insurers', 'By Transaction name', 'By Year'],
  activeTab = 'All',
  onTabChange,
  showPagination = true,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  className = '',
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 16px', // Compact padding for table header
    backgroundColor: colors.blackAndWhite.white,
    borderTopLeftRadius: borderRadius[8],
    borderTopRightRadius: borderRadius[8],
    border: '1px solid #e3f0f4', // Light blue border from Figma
    borderBottom: 'none', // Will be handled by table border
  };

  const leftSectionStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '7px', // Exact gap from Figma
  };

  const rightSectionStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px', // Gap between pagination text and buttons from Figma
  };

  const titleStyles = {
    fontFamily: typography.styles.subheadingM.fontFamily.join(', '),
    fontSize: typography.styles.subheadingM.fontSize, // 19px from Figma
    fontWeight: typography.styles.subheadingM.fontWeight,
    lineHeight: typography.styles.subheadingM.lineHeight,
    letterSpacing: typography.letterSpacing.normal, // -0.5px
    color: colors.blackAndWhite.black900,
    margin: 0,
  };

  const searchContainerStyles = {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#eef5fa', // Light blue background from Figma
    borderRadius: borderRadius.absolute, // Pill shape
    height: '30px',
    width: isSearchExpanded ? '200px' : '58px', // Expand when clicked
    padding: isSearchExpanded ? '4px 12px 4px 12px' : '4px 18px', // Reduced right padding when expanded
    justifyContent: isSearchExpanded ? 'space-between' : 'flex-end',
    transition: 'all 0.3s ease', // Smooth animation
    cursor: 'pointer',
  };

  const searchInputStyles = {
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    fontSize: typography.styles.bodyM.fontSize,
    fontFamily: typography.styles.bodyM.fontFamily.join(', '),
    fontWeight: typography.styles.bodyM.fontWeight,
    lineHeight: typography.styles.bodyM.lineHeight,
    letterSpacing: typography.styles.bodyM.letterSpacing,
    color: colors.blackAndWhite.black900,
    width: isSearchExpanded ? '140px' : '0px', // Show input when expanded
    padding: '0',
    opacity: isSearchExpanded ? 1 : 0, // Fade in/out
    transition: 'all 0.3s ease',
    cursor: 'text',
  };

  const searchIconStyles = {
    flexShrink: 0,
    pointerEvents: 'none' as const,
    transition: 'all 0.3s ease',
  };

  const tabContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    height: '26px',
  };

  const tabButtonStyles = {
    padding: '8px 12px',
    backgroundColor: 'transparent',
    border: `1px solid transparent`,
    cursor: 'pointer',
    fontFamily: typography.styles.bodyM.fontFamily.join(', '),
    fontSize: typography.styles.bodyM.fontSize,
    fontWeight: typography.styles.bodyM.fontWeight,
    lineHeight: typography.styles.bodyM.lineHeight,
    letterSpacing: typography.styles.bodyM.letterSpacing,
    color: colors.blackAndWhite.black500,
    transition: 'all 0.2s',
    borderRadius: borderRadius.absolute,
    height: '26px',
    whiteSpace: 'nowrap' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
  };

  const activeTabStyles = {
    backgroundColor: colors.blackAndWhite.white,
    color: colors.blackAndWhite.black900,
    border: `1px solid ${colors.reports.dynamic.blue400}`,
    borderRadius: borderRadius.absolute,
    fontWeight: 600,
  };

  const separatorStyles = {
    width: '1px',
    height: '16px',
    backgroundColor: colors.reports.dynamic.blue400,
  };

  const paginationStyles = {
    fontFamily: typography.styles.bodyS.fontFamily.join(', '),
    fontSize: typography.styles.bodyS.fontSize,
    fontWeight: typography.styles.bodyS.fontWeight,
    lineHeight: typography.styles.bodyS.lineHeight,
    letterSpacing: typography.styles.bodyS.letterSpacing,
    color: '#838985', // Grey-700 from Figma
    margin: 0,
  };


  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <>
      <style>
        {`
          .table-search-input::placeholder {
            color: ${colors.blackAndWhite.black500};
            opacity: 1;
            font-family: ${typography.styles.bodyM.fontFamily.join(', ')};
            font-size: ${typography.styles.bodyM.fontSize};
            font-weight: ${typography.styles.bodyM.fontWeight};
            line-height: ${typography.styles.bodyM.lineHeight};
            letter-spacing: ${typography.styles.bodyM.letterSpacing};
          }
        `}
      </style>
      <div style={headerStyles} className={className}>
        <div style={leftSectionStyles}>
        {showSearch && (
          <div 
            style={searchContainerStyles}
            onClick={() => {
              if (!isSearchExpanded) {
                setIsSearchExpanded(true);
                // Focus the input after expansion animation
                setTimeout(() => {
                  const input = document.querySelector('.table-search-input') as HTMLInputElement;
                  if (input) input.focus();
                }, 300);
              }
            }}
          >
            {isSearchExpanded && (
              <input
                className="table-search-input"
                style={searchInputStyles}
                type="text"
                placeholder="Type to search…"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                onBlur={() => {
                  if (!searchValue) {
                    setIsSearchExpanded(false);
                  }
                }}
                onClick={(e) => e.stopPropagation()} // Prevent container click when clicking input
              />
            )}
            <div style={searchIconStyles}>
              <SearchMedium color={colors.blackAndWhite.black900} />
            </div>
          </div>
        )}
        
        {showTabs && (
          <div style={tabContainerStyles}>
            {tabs.map((tab, index) => (
              <React.Fragment key={tab}>
                {index > 0 && (
                  <div style={separatorStyles}></div>
                )}
                <button
                  onClick={() => onTabChange?.(tab)}
                  style={{
                    ...tabButtonStyles,
                    ...(activeTab === tab ? activeTabStyles : {})
                  }}
                  type="button"
                >
                  {tab}
                </button>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {showPagination && (
        <div style={rightSectionStyles}>
          <span style={paginationStyles}>
            {startItem}-{endItem} of {totalItems} documents
          </span>
        </div>
      )}
      </div>
    </>
  );
};

// Table Column Header Component
export interface TableColumnHeaderProps {
  column: TableColumn;
  sortState: SortState;
  onSort?: (column: string) => void;
  isLastColumn?: boolean;
}

export const TableColumnHeader: React.FC<TableColumnHeaderProps> = ({
  column,
  sortState,
  onSort,
  isLastColumn = false,
}) => {
  const isActive = sortState.column === column.key;
  const canSort = column.sortable;
  const isActionColumn = column.cellType === 'action';

  const baseHeaderStyles = {
    padding: '8px 12px', // Compact padding for column headers
    backgroundColor: colors.blackAndWhite.white,
    cursor: canSort ? 'pointer' : 'default',
    height: '32px', // Reduced height for compact design
    boxSizing: 'border-box' as const,
    borderRight: '1px solid #daebf1', // Right border for column separation
    borderTop: '1px solid #daebf1',
    borderBottom: '1px solid #daebf1',
    borderLeft: 'none', // Explicitly set no left border for non-action columns
    position: 'relative' as const,
    textAlign: 'left' as const,
    verticalAlign: 'middle' as const,
    minWidth: '100px', // Minimum width to accommodate icon + title + arrange icon
  };

  const headerStyles = isActionColumn ? {
    ...baseHeaderStyles,
    position: 'sticky' as const,
    right: 0,
    zIndex: 10,
    backgroundColor: '#ffffff', // Force white background
    borderRight: '1px solid #daebf1', // Maintain right border
    borderTop: '1px solid #daebf1', // Maintain top border
    borderBottom: '1px solid #daebf1', // Maintain bottom border
    boxShadow: `inset 1px 0 0 0 #D9E7EC, ${shadows.base}`, // Use inset shadow for 1px left border + base shadow for elevation
  } : baseHeaderStyles;

  const headerContentStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  };

  const leftSectionStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px', // Gap from Figma design
    flex: 1,
  };

  const iconTextGroupStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px', // Adjusted gap between icon and text to match Figma
    minWidth: 'fit-content', // Allow natural sizing to accommodate content
    flex: 1, // Take available space but allow arrange icon to have its space
  };

  const textStyles = {
    fontFamily: typography.styles.captionS.fontFamily.join(', '),
    fontSize: typography.styles.captionS.fontSize, // 12px
    fontWeight: typography.fontWeight.regular, // 400 (Regular) - much lighter than original 700 to match Figma
    fontStyle: typography.styles.captionS.fontStyle, // italic
    lineHeight: typography.styles.captionS.lineHeight, // 1.3
    letterSpacing: typography.letterSpacing.normal, // -0.5px
    color: colors.blackAndWhite.black500, // #8b908d - back to original black500
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden', // Hide overflow text
    textOverflow: 'ellipsis', // Add ellipsis for long text
  };

  const sortIconStyles = {
    width: '12px',
    height: '12px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const handleSort = () => {
    if (canSort && onSort) {
      onSort(column.key);
    }
  };

  return (
    <th
      style={{ 
        ...headerStyles, 
        width: column.width,
        // Remove right border from last column to avoid double border
        borderRight: isLastColumn ? 'none' : headerStyles.borderRight,
      }}
      onClick={handleSort}
    >
      <div style={headerContentStyles}>
        <div style={leftSectionStyles}>
          
          <div style={iconTextGroupStyles}>
            {column.icon && (
              <div style={{ 
                flexShrink: 0, 
                width: '20px', 
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {column.icon}
              </div>
            )}
            <span style={textStyles}>{column.title}</span>
          </div>
        </div>

        {canSort && (
          <div style={sortIconStyles}>
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M7 9L12 4L17 9" 
                stroke={colors.reports.blue450} 
                strokeWidth="1.4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M17 15L12 20L7 15" 
                stroke={colors.reports.blue450} 
                strokeWidth="1.4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </th>
  );
};

// Table Body Component
export interface TableBodyProps {
  columns: TableColumn[];
  data: TableRow[];
  emptyMessage?: string;
}

export const TableBody: React.FC<TableBodyProps> = ({
  columns,
  data,
  emptyMessage = 'No data available',
}) => {
  // Function to render cell content based on cell type
  const renderCellContent = (column: TableColumn, value: React.ReactNode) => {
    const cellType = column.cellType || 'simple';
    
    switch (cellType) {
      case 'document':
        // For document cells, expect the value to be a string filename
        if (typeof value === 'string') {
          return (
            <DocumentCell 
              filename={value} 
              onDownload={column.onDownload || ((filename) => console.log('Download:', filename))}
              hoverIcon={column.hoverIcon}
            />
          );
        }
        // Fallback to simple if value is not a string
        return value;
      case 'action':
        // For action cells, expect the value to be an ActionType string
        if (typeof value === 'string') {
          // Use the value as actionType if it's a valid ActionType, otherwise use column default
          const validActionTypes = ['upload', 'validate', 'generate', 'setup'];
          const actionType = validActionTypes.includes(value) ? value as ActionType : (column.actionType || 'upload');
          return (
            <ActionCell 
              actionType={actionType}
              onClick={column.onAction || ((actionType, text) => console.log('Action:', actionType, text))}
            />
          );
        }
        // Fallback to simple if value is not a string
        return value;
      case 'simple':
      default:
        // For simple cells, wrap text content in a div with ellipsis styles and tooltip
        if (typeof value === 'string' || typeof value === 'number') {
          const textValue = String(value);
          return (
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                position: 'relative',
              }}
              title={textValue} // Native HTML tooltip shows full text on hover
            >
              {value}
            </div>
          );
        }
        // For React components, wrap in alignment container based on column alignment
        if (React.isValidElement(value)) {
          const alignment = column.align || 'left';
          const justifyContent = alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start';
          
          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent,
                width: '100%',
                height: '100%',
              }}
            >
              {value}
            </div>
          );
        }
        // For other content, return as-is
        return value;
    }
  };

  const cellStyles = {
    padding: '6px 12px', // Reduced padding for more compact rows
    fontFamily: typography.styles.bodyM.fontFamily.join(', '),
    fontSize: typography.styles.bodyM.fontSize,
    color: colors.blackAndWhite.black900,
    verticalAlign: 'middle' as const,
    borderBottom: `1px solid #e3f0f4`, // Match Figma border color
    borderRight: '1px solid #daebf1', // Right border for column separation
    height: '33px', // Updated row height (45px target - 12px padding = 33px)
    boxSizing: 'border-box' as const,
  };

  const emptyStyles = {
    ...cellStyles,
    textAlign: 'center' as const,
    color: colors.blackAndWhite.black500,
    fontStyle: 'italic',
  };

  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} style={emptyStyles}>
            {emptyMessage}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {columns.map((column, columnIndex) => {
            const isActionColumn = column.cellType === 'action';
            
            const baseCellStyle = {
              ...cellStyles,
              textAlign: column.align || 'left',
              width: column.width,
              // Remove right border from last column to avoid double border
              borderRight: columnIndex === columns.length - 1 ? 'none' : cellStyles.borderRight,
              // Remove bottom border from last row to avoid double border
              borderBottom: rowIndex === data.length - 1 ? 'none' : cellStyles.borderBottom,
            };

            const actionCellStyle = isActionColumn ? {
              ...baseCellStyle,
              position: 'sticky' as const,
              right: 0,
              zIndex: 10,
              backgroundColor: '#ffffff', // Force white background
              borderRight: '1px solid #daebf1', // Maintain right border
              borderTop: rowIndex === 0 ? '1px solid #daebf1' : 'none', // Top border only for first row
              borderBottom: rowIndex === data.length - 1 ? 'none' : '1px solid #e3f0f4', // Bottom border except last row
              boxShadow: `inset 1px 0 0 0 #D9E7EC, ${shadows.base}`, // Use inset shadow for 1px left border + base shadow for elevation
            } : baseCellStyle;

            return (
              <td key={column.key} style={actionCellStyle}>
                {renderCellContent(column, row[column.key])}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

// Table Pagination Component
export interface TablePaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = '',
}) => {
  const paginationStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: colors.blackAndWhite.white,
    borderBottomLeftRadius: borderRadius[8],
    borderBottomRightRadius: borderRadius[8],
    border: '1px solid #d9e7ec',
    borderTop: 'none',
    gap: '50px',
  };

  const navButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '12px',
    height: '12px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    padding: 0,
    transition: 'opacity 0.2s ease',
  };

  const disabledNavButtonStyles = {
    ...navButtonStyles,
    opacity: 0.3,
    cursor: 'not-allowed',
  };

  const pageNumbersStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontFamily: typography.styles.bodyS.fontFamily.join(', '),
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: typography.letterSpacing.normal,
  };

  const pageNumberStyles = {
    color: colors.blackAndWhite.black500,
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'color 0.2s ease',
    textDecoration: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
  };

  const activePageStyles = {
    ...pageNumberStyles,
    color: colors.blackAndWhite.black900,
    fontWeight: 600,
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  const getVisiblePages = () => {
    const delta = 2; // Show 2 pages before and after current page
    const range = [];
    
    // Always show first page
    if (currentPage > delta + 1) {
      range.push(1);
      if (currentPage > delta + 2) {
        range.push('...');
      }
    }

    // Show pages around current page
    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      range.push(i);
    }

    // Always show last page
    if (currentPage < totalPages - delta) {
      if (currentPage < totalPages - delta - 1) {
        range.push('...');
      }
      range.push(totalPages);
    }

    // Remove duplicates while preserving order
    return range.filter((page, index, arr) => {
      return arr.indexOf(page) === index;
    });
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div style={paginationStyles} className={className}>
      <button
        style={currentPage === 1 ? disabledNavButtonStyles : navButtonStyles}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        type="button"
        aria-label="Previous page"
      >
        <ChevronLeftSmall color={currentPage === 1 ? colors.blackAndWhite.black400 : colors.blackAndWhite.black900} />
      </button>

      <div style={pageNumbersStyles}>
        {getVisiblePages().map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} style={pageNumberStyles}>
              ...
            </span>
          ) : (
            <button
              key={page}
              style={currentPage === page ? activePageStyles : pageNumberStyles}
              onClick={() => handlePageChange(Number(page))}
              type="button"
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        style={currentPage === totalPages ? disabledNavButtonStyles : navButtonStyles}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        type="button"
        aria-label="Next page"
      >
        <ChevronRightSmall color={currentPage === totalPages ? colors.blackAndWhite.black400 : colors.blackAndWhite.black900} />
      </button>
    </div>
  );
};

// Main Table Component
export interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  title?: string;
  showHeader?: boolean;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showTabs?: boolean;
  tabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  showPagination?: boolean;
  showFooterPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  sortState?: SortState;
  onSort?: (column: string) => void;
  emptyMessage?: string;
  className?: string;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  title,
  showHeader = true,
  showSearch = true,
  searchValue = '',
  onSearchChange,
  showTabs = true,
  tabs = ['All', 'By Ceding Insurers', 'By Transaction name', 'By Year'],
  activeTab = 'All',
  onTabChange,
  showPagination = true,
  showFooterPagination = false,
  currentPage = 1,
  totalPages = 1,
  totalItems = data.length,
  itemsPerPage = 10,
  onPageChange,
  sortState = { column: null, direction: null },
  onSort,
  emptyMessage = 'No data available',
  className = '',
}) => {
  const [internalSortState, setInternalSortState] = useState<SortState>(sortState);

  const handleSort = (columnKey: string) => {
    if (onSort) {
      onSort(columnKey);
    } else {
      // Internal sort handling
      setInternalSortState(prev => ({
        column: columnKey,
        direction: prev.column === columnKey && prev.direction === 'asc' ? 'desc' : 'asc',
      }));
    }
  };

  const currentSortState = onSort ? sortState : internalSortState;

  const tableContainerStyles = {
    width: '100%',
    overflowX: 'auto' as const, // Enable horizontal scroll
    overflowY: 'hidden' as const,
    borderRadius: showHeader && showFooterPagination ? '0' : showHeader ? '0 0 8px 8px' : showFooterPagination ? '8px 8px 0 0' : borderRadius[8],
    border: '1px solid #daebf1',
    borderTop: showHeader ? 'none' : '1px solid #daebf1',
    borderBottom: showFooterPagination ? 'none' : '1px solid #daebf1',
    // Force container to be constrained and show scrollbar
    maxWidth: '100%',
    minWidth: 0, // Allow shrinking
    boxSizing: 'border-box' as const,
    display: 'block' as const, // Ensure block layout
  };

  const tableStyles = {
    width: '1550px', // Fixed width to ensure table content forces horizontal scroll when needed
    minWidth: '1550px', // Minimum width: 300px + 200px + 200px + (5 × 130px) = 1550px total
    borderCollapse: 'collapse' as const,
    backgroundColor: colors.blackAndWhite.white,
    tableLayout: 'fixed' as const, // Enforce fixed column widths from width props
    margin: 0,
    border: 'none', // No outer border, cells handle their own borders
  };

  const mainContainerStyles = {
    width: '100%',
    maxWidth: '100%', // Respect parent container width instead of viewport
    overflow: 'hidden', // Prevent any overflow at the main level
    boxSizing: 'border-box' as const,
  };

  return (
    <div className={className} style={mainContainerStyles}>
      {showHeader && (
        <TableHeader
          title={title}
          showSearch={showSearch}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          showTabs={showTabs}
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
          showPagination={showPagination}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      )}
      
      <div style={tableContainerStyles}>
        <table style={tableStyles}>
          <thead>
            <tr>
              {columns.map((column, columnIndex) => (
                <TableColumnHeader
                  key={column.key}
                  column={column}
                  sortState={currentSortState}
                  onSort={handleSort}
                  isLastColumn={columnIndex === columns.length - 1}
                />
              ))}
            </tr>
          </thead>
          
          <TableBody
            columns={columns}
            data={data}
            emptyMessage={emptyMessage}
          />
        </table>
      </div>
      
      {showFooterPagination && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default Table;