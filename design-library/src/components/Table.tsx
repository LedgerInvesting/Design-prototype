import React, { useState } from 'react';
import { colors, typography, borderRadius } from '../tokens';
import { SearchMedium, ChevronLeftSmall, ChevronRightSmall, PlusExtraSmall } from '../icons';
import { DocumentCell } from './DocumentCell';
import { ActionCell, ActionIcon } from './ActionCell';

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
  actionIcon?: ActionIcon; // For action cells (edit, add, plus)
  onAction?: (text: string) => void; // For action cells
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
  showFilter?: boolean;
  onFilterClick?: () => void;
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
  showFilter = true,
  onFilterClick,
  showPagination = true,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  className = '',
}) => {
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
    borderRadius: borderRadius.absolute, // Pill shape (400px in Figma)
    height: '30px',
    width: '58px', // Width from Figma when collapsed
    padding: '4px 18px', // From Figma padding
    justifyContent: 'flex-end',
  };

  const searchInputStyles = {
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    fontSize: typography.styles.bodyM.fontSize,
    fontFamily: typography.styles.bodyM.fontFamily.join(', '),
    color: colors.blackAndWhite.black900,
    width: '0px', // Hidden by default, would expand on focus
    padding: '0',
  };

  const searchIconStyles = {
    flexShrink: 0,
    pointerEvents: 'none' as const,
  };

  const filterButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px', // Gap between plus icon and text
    padding: '10px 18px', // From Figma
    border: 'none',
    borderRadius: borderRadius.absolute, // Pill shape
    backgroundColor: '#eef5fa', // Light blue background from Figma
    color: colors.blackAndWhite.black900,
    fontSize: typography.styles.bodyM.fontSize,
    fontFamily: typography.styles.bodyM.fontFamily.join(', '),
    fontWeight: typography.styles.bodyM.fontWeight,
    lineHeight: typography.styles.bodyM.lineHeight,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    height: '26px', // From Figma
    whiteSpace: 'nowrap' as const,
  };

  const paginationStyles = {
    fontFamily: typography.styles.captionS.fontFamily.join(', '),
    fontSize: typography.styles.captionS.fontSize, // 12px from Figma
    fontWeight: typography.styles.captionS.fontWeight, // 700 (Bold Italic)
    fontStyle: typography.styles.captionS.fontStyle, // italic
    lineHeight: typography.styles.captionS.lineHeight,
    letterSpacing: typography.letterSpacing.normal, // -0.5px
    color: '#838985', // Grey-700 from Figma
    margin: 0,
  };

  const paginationButtonContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px', // Gap between pagination buttons
  };

  const paginationButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '12px', // Small icons from Figma (12x12px)
    height: '12px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    padding: 0,
  };

  const disabledButtonStyles = {
    ...paginationButtonStyles,
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div style={headerStyles} className={className}>
      <div style={leftSectionStyles}>
        {title && <h3 style={titleStyles}>{title}</h3>}
        
        {showSearch && (
          <div style={searchContainerStyles}>
            <div style={searchIconStyles}>
              <SearchMedium color={colors.blackAndWhite.black900} />
            </div>
          </div>
        )}
        
        {showFilter && (
          <button
            onClick={onFilterClick}
            style={filterButtonStyles}
            type="button"
          >
            <PlusExtraSmall color={colors.blackAndWhite.black900} />
            Add Filter
          </button>
        )}
      </div>

      {showPagination && (
        <div style={rightSectionStyles}>
          <span style={paginationStyles}>
            {startItem}-{endItem} of {totalItems} documents
          </span>
          
          <div style={paginationButtonContainerStyles}>
            <button
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage <= 1}
              style={currentPage <= 1 ? disabledButtonStyles : paginationButtonStyles}
              type="button"
            >
              <ChevronLeftSmall color={currentPage <= 1 ? '#838985' : colors.blackAndWhite.black900} />
            </button>
            
            <button
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage >= totalPages}
              style={currentPage >= totalPages ? disabledButtonStyles : paginationButtonStyles}
              type="button"
            >
              <ChevronRightSmall color={currentPage >= totalPages ? '#838985' : colors.blackAndWhite.black900} />
            </button>
          </div>
        </div>
      )}
    </div>
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

  const headerStyles = {
    padding: '8px 12px', // Compact padding for column headers
    backgroundColor: colors.blackAndWhite.white,
    cursor: canSort ? 'pointer' : 'default',
    height: '32px', // Reduced height for compact design
    boxSizing: 'border-box' as const,
    borderRight: '1px solid #daebf1', // Right border for column separation
    borderTop: '1px solid #daebf1',
    borderBottom: '1px solid #daebf1',
    position: 'relative' as const,
    textAlign: 'left' as const,
    verticalAlign: 'middle' as const,
    minWidth: '120px', // Minimum width to accommodate icon + title + arrange icon
  };

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
            />
          );
        }
        // Fallback to simple if value is not a string
        return value;
      case 'action':
        // For action cells, expect the value to be a string for the action text
        if (typeof value === 'string') {
          return (
            <ActionCell 
              text={value}
              icon={column.actionIcon || 'edit'}
              onClick={column.onAction || ((text) => console.log('Action:', text))}
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
    padding: '8px 12px', // Compact padding for body cells
    fontFamily: typography.styles.bodyM.fontFamily.join(', '),
    fontSize: typography.styles.bodyM.fontSize,
    color: colors.blackAndWhite.black900,
    verticalAlign: 'middle' as const,
    borderBottom: `1px solid #e3f0f4`, // Match Figma border color
    borderRight: '1px solid #daebf1', // Right border for column separation
    height: '36px', // Reduced height for compact design
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
          {columns.map((column, columnIndex) => (
            <td
              key={column.key}
              style={{
                ...cellStyles,
                textAlign: column.align || 'left',
                width: column.width,
                // Remove right border from last column to avoid double border
                borderRight: columnIndex === columns.length - 1 ? 'none' : cellStyles.borderRight,
                // Remove bottom border from last row to avoid double border
                borderBottom: rowIndex === data.length - 1 ? 'none' : cellStyles.borderBottom,
              }}
            >
              {renderCellContent(column, row[column.key])}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
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
  showFilter?: boolean;
  onFilterClick?: () => void;
  showPagination?: boolean;
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
  showFilter = true,
  onFilterClick,
  showPagination = true,
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
    borderRadius: showHeader ? '0 0 8px 8px' : borderRadius[8],
    border: '1px solid #daebf1',
    borderTop: showHeader ? 'none' : '1px solid #daebf1',
  };

  const tableStyles = {
    width: '1970px', // Fixed width: 350px + (9 × 180px) = 1970px total
    borderCollapse: 'collapse' as const,
    backgroundColor: colors.blackAndWhite.white,
    tableLayout: 'fixed' as const, // Enforce fixed column widths from width props
    margin: 0,
    border: 'none', // No outer border, cells handle their own borders
  };

  return (
    <div className={className}>
      {showHeader && (
        <TableHeader
          title={title}
          showSearch={showSearch}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          showFilter={showFilter}
          onFilterClick={onFilterClick}
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
    </div>
  );
};

export default Table;