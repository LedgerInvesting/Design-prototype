import React, { useState, useRef, useEffect } from 'react';
import { typography, borderRadius, shadows, useSemanticColors, colors } from '../tokens';
import { SearchMedium, ChevronLeftSmall, ChevronRightSmall, ChevronBottomSmall } from '../icons';
import { DocumentCell } from './DocumentCell';
import { ActionCell, ActionType, SecondaryAction } from './ActionCell';
import { CustomCell, CustomCellElement } from './CustomCell';
import { StatusCell, StatusType } from './StatusCell';
import { Selector } from './Selector';
import { Button } from './Button';

// Base interfaces
export type CellType = 'simple' | 'document' | 'action' | 'custom' | 'status';

export interface TableColumn {
  key: string;
  title: string;
  icon?: React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  headerAlign?: 'left' | 'center' | 'right'; // Alignment for column header text
  cellType?: CellType;
  onDownload?: (filename: string, rowData?: any) => void; // For document cells
  hoverIcon?: 'download' | 'config' | 'open'; // For document cells hover icon
  interactive?: boolean; // For document cells - controls background and hover effects
  actionType?: ActionType; // For action cells (edit, upload, validate, add, delete, plus)
  onAction?: (actionType: ActionType, text: string, rowData?: any) => void; // For action cells
  actionCellProps?: {
    icon?: React.ReactNode;
    text?: string;
    iconBackgroundColor?: string;
    iconColor?: string;
    showSecondaryMenu?: boolean;
    secondaryActions?: SecondaryAction[];
  }; // For custom action cell styling
  customCellProps?: {
    alignment?: 'left' | 'center' | 'right';
    direction?: 'horizontal' | 'vertical';
    gap?: number;
    onClick?: () => void;
  }; // For custom cells
  render?: (value: any, row: any) => React.ReactNode; // Custom render function
}

/**
 * Table row data interface
 * Supports both regular rows and grouped/collapsible rows
 */
export interface TableRow {
  /** Dynamic data fields matching column keys */
  [key: string]: React.ReactNode;
  /** Indicates this is a group header row (displays with chevron) */
  isGroup?: boolean;
  /** Name of the group (displayed in the group header row) */
  groupName?: string;
  /** Indicates this row belongs to a group (adds 22px left padding) */
  isGroupChild?: boolean;
  /** Whether the group is expanded (controls child row visibility) */
  isExpanded?: boolean;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: string | null;
  direction: SortDirection;
}

// Header action type
export interface TableHeaderAction {
  /** Type of action button or separator */
  type: 'icon' | 'separator';
  /** Icon component (for icon buttons) */
  icon?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
}

// Compact Table Header Component (Contracts/Transactions style)
export interface CompactTableHeaderProps {
  title?: React.ReactNode;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
  showCustomizeColumns?: boolean;
  columns?: TableColumn[];
  visibleColumns?: string[];
  onColumnVisibilityChange?: (columnKey: string, visible: boolean) => void;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  headerActions?: TableHeaderAction[];
  paginationItemLabel?: string;
  className?: string;
}

export const CompactTableHeader: React.FC<CompactTableHeaderProps> = ({
  title,
  searchValue = '',
  onSearchChange,
  paginationItemLabel = 'valuations',
  showSearch = true,
  showCustomizeColumns = false,
  columns = [],
  visibleColumns = [],
  onColumnVisibilityChange,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  headerActions = [],
  className = '',
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const customizeRef = useRef<HTMLDivElement>(null);
  const colors = useSemanticColors();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (customizeRef.current && !customizeRef.current.contains(event.target as Node)) {
        setIsCustomizeOpen(false);
      }
    };

    if (isCustomizeOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isCustomizeOpen]);

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px',
    height: '80px',
    backgroundColor: colors.blackAndWhite.white,
    borderTopLeftRadius: borderRadius[8],
    borderTopRightRadius: borderRadius[8],
    borderTop: `1px solid ${colors.theme.primary400}`,
    borderLeft: `1px solid ${colors.theme.primary400}`,
    borderRight: `1px solid ${colors.theme.primary400}`,
    borderBottom: 'none',
    boxSizing: 'border-box',
  };

  const leftSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const rightSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const titleStyles: React.CSSProperties = {
    ...typography.styles.subheadingM,
    color: colors.blackAndWhite.black900,
    margin: 0,
  };

  const searchContainerStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.theme.primary200,
    borderRadius: borderRadius.absolute,
    height: '30px',
    width: isSearchExpanded ? '200px' : '58px',
    padding: isSearchExpanded ? '4px 12px 4px 12px' : '4px 18px',
    justifyContent: isSearchExpanded ? 'space-between' : 'flex-end',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const searchInputStyles: React.CSSProperties = {
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    ...typography.styles.bodyM,
    color: colors.blackAndWhite.black900,
    width: isSearchExpanded ? '140px' : '0px',
    padding: '0',
    opacity: isSearchExpanded ? 1 : 0,
    transition: 'all 0.3s ease',
    cursor: 'text',
  };

  const searchIconStyles: React.CSSProperties = {
    flexShrink: 0,
    pointerEvents: 'none' as const,
    transition: 'all 0.3s ease',
  };

  const documentsCountStyles: React.CSSProperties = {
    ...typography.styles.captionS,
    color: colors.blackAndWhite.black500,
  };

  const navButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    padding: 0,
    transition: 'opacity 0.2s ease',
  };

  const disabledNavButtonStyles: React.CSSProperties = {
    ...navButtonStyles,
    opacity: 0.3,
    cursor: 'not-allowed',
  };

  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Customize Columns styles
  const customizeButtonStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: borderRadius.absolute,
    height: '30px',
    padding: '4px 12px',
    gap: '6px',
    border: `1px solid ${colors.theme.primary400}`,
    cursor: 'pointer',
    transition: 'border-color 0.2s ease',
  };

  const customizeTextStyles: React.CSSProperties = {
    ...typography.styles.bodyM,
    color: colors.blackAndWhite.black900,
    whiteSpace: 'nowrap',
  };

  const customizeDropdownStyles: React.CSSProperties = {
    position: 'absolute',
    top: '38px',
    left: 0,
    backgroundColor: colors.blackAndWhite.white,
    border: `1px solid ${colors.theme.primary400}`,
    borderRadius: borderRadius[8],
    padding: '12px',
    minWidth: '220px',
    boxShadow: shadows.medium,
    zIndex: 1000,
    display: isCustomizeOpen ? 'flex' : 'none',
    flexDirection: 'column',
    gap: '8px',
  };

  const dropdownTitleStyles: React.CSSProperties = {
    ...typography.styles.bodyM,
    color: colors.blackAndWhite.black900,
    fontWeight: typography.fontWeight.medium,
    marginBottom: '4px',
  };

  const checkboxItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 0',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'left',
  };

  return (
    <>
      <style>
        {`
          .compact-search-input::placeholder {
            color: ${colors.blackAndWhite.black500};
            opacity: 1;
          }
        `}
      </style>
      <div style={headerStyles} className={className}>
        {/* Left Section: Title + Search + Customize */}
        <div style={leftSectionStyles}>
          {title && <div style={titleStyles}>{title}</div>}
          {showSearch && (
            <div
              style={searchContainerStyles}
              onClick={() => {
                if (!isSearchExpanded) {
                  setIsSearchExpanded(true);
                  setTimeout(() => {
                    const input = document.querySelector('.compact-search-input') as HTMLInputElement;
                    if (input) input.focus();
                  }, 300);
                }
              }}
            >
              {isSearchExpanded && (
                <input
                  className="compact-search-input"
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
                  onClick={(e) => e.stopPropagation()}
                />
              )}
              <div style={searchIconStyles}>
                <SearchMedium color={colors.blackAndWhite.black900} />
              </div>
            </div>
          )}

          {/* Customize Columns Button */}
          {showCustomizeColumns && columns.length > 0 && (
            <div ref={customizeRef} style={{ position: 'relative' }}>
              <button
                style={customizeButtonStyles}
                onClick={() => setIsCustomizeOpen(!isCustomizeOpen)}
                type="button"
                aria-label="Customize columns"
              >
                <span style={customizeTextStyles}>Customize columns</span>
                <ChevronBottomSmall color={colors.blackAndWhite.black900} />
              </button>

              {/* Dropdown */}
              <div style={customizeDropdownStyles}>
                <div style={dropdownTitleStyles}>Show columns</div>
                {columns
                  .filter((column, index) => {
                    // Exclude first column and action columns
                    if (index === 0) return false;
                    if (column.cellType === 'action') return false;
                    return true;
                  })
                  .map((column) => (
                    <button
                      key={column.key}
                      style={checkboxItemStyles}
                      onClick={() => {
                        const isCurrentlyVisible = visibleColumns.includes(column.key);
                        onColumnVisibilityChange?.(column.key, !isCurrentlyVisible);
                      }}
                      type="button"
                    >
                      <Selector
                        variant="checkbox"
                        checked={visibleColumns.includes(column.key)}
                        onChange={(checked) => onColumnVisibilityChange?.(column.key, checked)}
                        size={16}
                      />
                      <span style={{ ...typography.styles.bodyM, color: colors.blackAndWhite.black900 }}>
                        {column.title}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Documents Count + Pagination */}
        <div style={rightSectionStyles}>
          <span style={documentsCountStyles}>
            {startItem}-{endItem} of {totalItems} {paginationItemLabel}
          </span>
          <button
            style={currentPage === 1 ? disabledNavButtonStyles : navButtonStyles}
            onClick={() => currentPage > 1 && onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
            type="button"
            aria-label="Previous page"
          >
            <ChevronLeftSmall color={currentPage === 1 ? colors.blackAndWhite.black400 : colors.blackAndWhite.black900} />
          </button>
          <button
            style={currentPage === totalPages ? disabledNavButtonStyles : navButtonStyles}
            onClick={() => currentPage < totalPages && onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages}
            type="button"
            aria-label="Next page"
          >
            <ChevronRightSmall color={currentPage === totalPages ? colors.blackAndWhite.black400 : colors.blackAndWhite.black900} />
          </button>
        </div>
      </div>
    </>
  );
};

// Table Header Component
export interface TableHeaderProps {
  title?: React.ReactNode;
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
  const colors = useSemanticColors();
  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px', // Remove vertical padding, use height instead
    height: '60px', // Fixed height for table header
    backgroundColor: colors.blackAndWhite.white,
    borderTopLeftRadius: borderRadius[8],
    borderTopRightRadius: borderRadius[8],
    borderTop: `1px solid ${colors.theme.primary400}`, // Theme-aware border
    borderLeft: `1px solid ${colors.theme.primary400}`,
    borderRight: `1px solid ${colors.theme.primary400}`,
    borderBottom: 'none', // Will be handled by table border
    boxSizing: 'border-box',
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
    backgroundColor: colors.theme.primary200, // Theme-aware background
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
    border: `1px solid ${colors.theme.primary400}`,
    borderRadius: borderRadius.absolute,
    fontWeight: 600,
  };

  const separatorStyles = {
    width: '1px',
    height: '16px',
    backgroundColor: colors.theme.primary400,
  };

  const paginationStyles = {
    fontFamily: typography.styles.bodyM.fontFamily.join(', '),
    fontSize: typography.styles.bodyM.fontSize,
    fontWeight: typography.styles.bodyM.fontWeight,
    lineHeight: typography.styles.bodyM.lineHeight,
    letterSpacing: typography.styles.bodyM.letterSpacing,
    color: colors.blackAndWhite.black500, // Use semantic color
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
        {!showSearch && title && (
          <div style={titleStyles}>
            {title}
          </div>
        )}
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

      {(showPagination || (headerActions && headerActions.length > 0)) && (
        <div style={rightSectionStyles}>
          {/* Header Actions */}
          {headerActions && headerActions.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {headerActions.map((action, index) => {
                if (action.type === 'separator') {
                  return (
                    <div
                      key={index}
                      style={{
                        width: '1px',
                        height: '20px',
                        backgroundColor: colors.theme.primary400,
                      }}
                    />
                  );
                } else {
                  return (
                    <Button
                      key={index}
                      variant="icon"
                      color="primary200"
                      icon={action.icon}
                      onClick={action.onClick}
                      shape="square"
                    />
                  );
                }
              })}
            </div>
          )}
          {showPagination && (
            <span style={paginationStyles}>
              {startItem}-{endItem} of {totalItems} valuations
            </span>
          )}
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
  isFirstColumn?: boolean;
}

export const TableColumnHeader: React.FC<TableColumnHeaderProps> = ({
  column,
  sortState,
  onSort,
  isLastColumn = false,
  isFirstColumn = false,
}) => {
  const colors = useSemanticColors();
  const isActive = sortState.column === column.key;
  const canSort = column.sortable;
  const isActionColumn = column.cellType === 'action';

  const baseHeaderStyles = {
    padding: '6px 12px', // Adjusted padding to accommodate 24px icons in 36px header
    backgroundColor: colors.blackAndWhite.white,
    cursor: canSort ? 'pointer' : 'default',
    height: '36px', // Target height for column headers
    boxSizing: 'border-box' as const,
    borderRight: `1px solid ${colors.theme.primary400}`, // Right border for column separation
    borderTop: `1px solid ${colors.theme.primary400}`,
    borderBottom: `1px solid ${colors.theme.primary400}`,
    borderLeft: 'none', // Explicitly set no left border for non-action columns
    borderTopLeftRadius: '0px', // Remove rounded corners
    borderTopRightRadius: '0px', // Remove rounded corners
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
    backgroundColor: colors.blackAndWhite.white, // Force white background
    borderRight: `1px solid ${colors.theme.primary400}`, // Maintain right border
    borderTop: `1px solid ${colors.theme.primary400}`, // Maintain top border
    borderBottom: `1px solid ${colors.theme.primary400}`, // Maintain bottom border
    boxShadow: `inset 1px 0 0 0 ${colors.theme.primary400}, ${shadows.base}`, // Use inset shadow for 1px left border + base shadow for elevation
  } : baseHeaderStyles;

  // Determine header alignment (default to left)
  const headerAlignment = column.headerAlign || 'left';

  const headerContentStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: canSort ? 'space-between' : ( // When sortable, use space-between to push arrows right
      headerAlignment === 'right' ? 'flex-end' :
      headerAlignment === 'center' ? 'center' :
      'flex-start'
    ),
    width: '100%',
    gap: '8px', // Gap between elements
  };

  const iconTextGroupStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px', // Adjusted gap between icon and text to match Figma
    minWidth: 'fit-content', // Allow natural sizing to accommodate content
    // Remove flex: 1 to allow proper alignment control
  };

  const textStyles = {
    fontFamily: typography.styles.captionS.fontFamily.join(', '),
    fontSize: typography.styles.captionS.fontSize, // 12px
    fontWeight: typography.styles.captionS.fontWeight, // 900 (Black) - matches Figma design
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
        {/* Content wrapper that handles different alignments */}
        <div style={iconTextGroupStyles}>
          {column.icon && (
            <div style={{
              flexShrink: 0,
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {column.icon}
            </div>
          )}
          <span style={textStyles}>{column.title}</span>
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
                stroke={colors.blackAndWhite.black500}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 15L12 20L7 15"
                stroke={colors.blackAndWhite.black500}
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
/**
 * Props for the TableBody component
 */
export interface TableBodyProps {
  /** Array of column definitions */
  columns: TableColumn[];
  /** Array of row data (can include group headers and children) */
  data: TableRow[];
  /** Message to display when no data is available */
  emptyMessage?: string;
  /** Callback when a group header is clicked (receives visible row index) */
  onGroupToggle?: (rowIndex: number) => void;
  /** Callback when a row is clicked (receives row data and index) */
  onRowClick?: (row: TableRow, rowIndex: number) => void;
}

/**
 * TableBody Component
 *
 * Renders the table body with support for:
 * - Multiple cell types (simple, document, action, status, custom)
 * - Grouped and collapsible rows
 * - Custom cell rendering
 * - Empty state messaging
 *
 * @component
 */
export const TableBody: React.FC<TableBodyProps> = ({
  columns,
  data,
  emptyMessage = 'No data available',
  onGroupToggle,
  onRowClick,
}) => {
  const colors = useSemanticColors();

  /**
   * Renders cell content based on column cell type
   * @param column - Column configuration
   * @param value - Cell value
   * @param row - Full row data
   * @returns Rendered cell content
   */
  const renderCellContent = (column: TableColumn, value: React.ReactNode, row: any) => {
    // Check if column has a custom render function
    if (column.render) {
      return column.render(value, row);
    }

    const cellType = column.cellType || 'simple';

    switch (cellType) {
      case 'document':
        // For document cells, expect the value to be a string filename
        if (typeof value === 'string') {
          return (
            <div data-cell-type="document" style={{ cursor: column.interactive !== false ? 'pointer' : 'default', height: '100%', display: 'flex' }}>
              <DocumentCell
                filename={value}
                onDownload={column.onDownload ? (filename) => column.onDownload!(filename, row) : ((filename) => console.log('Download:', filename))}
                hoverIcon={column.hoverIcon}
                interactive={column.interactive}
              />
            </div>
          );
        }
        // Fallback to simple if value is not a string
        return value;
      case 'action':
        // For action cells, expect the value to be an ActionType string
        if (typeof value === 'string') {
          // Use the value as actionType if it's a valid ActionType, otherwise use column default
          const validActionTypes = ['upload', 'validate', 'generate', 'setup', 'download', 'add-data', 'run-valuation', 'open'];
          const actionType = validActionTypes.includes(value) ? value as ActionType : (column.actionType || 'upload');
          return (
            <div data-cell-type="action" style={{ cursor: 'pointer' }}>
              <ActionCell
                actionType={actionType}
                onClick={column.onAction ? (actionType, text) => column.onAction!(actionType, text, row) : ((actionType, text) => console.log('Action:', actionType, text))}
                icon={column.actionCellProps?.icon}
                text={column.actionCellProps?.text}
                iconBackgroundColor={column.actionCellProps?.iconBackgroundColor}
                iconColor={column.actionCellProps?.iconColor}
                showSecondaryMenu={column.actionCellProps?.showSecondaryMenu}
                secondaryActions={column.actionCellProps?.secondaryActions}
              />
            </div>
          );
        }
        // Fallback to simple if value is not a string
        return value;
      case 'custom':
        // For custom cells, expect the value to be an array of CustomCellElement
        if (Array.isArray(value)) {
          return (
            <div data-cell-type="custom">
              <CustomCell
                elements={value as CustomCellElement[]}
                alignment={column.customCellProps?.alignment}
                direction={column.customCellProps?.direction}
                gap={column.customCellProps?.gap}
                onClick={column.customCellProps?.onClick}
              />
            </div>
          );
        }
        // Fallback to simple if value is not an array
        return value;
      case 'status':
        // For status cells, expect the value to be a StatusType string or map common statuses
        if (typeof value === 'string') {
          // Map common status strings to StatusType
          const statusMap: Record<string, StatusType> = {
            'active': 'done',
            'pending': 'processing',
            'cancelled': 'error',
            'draft': 'ready',
            'done': 'done',
            'complete': 'done',
            'ready': 'ready',
            'processing': 'processing',
            'error': 'error',
            'open': 'done',
          };
          const statusType = statusMap[value.toLowerCase()] || 'ready';
          const alignment = column.align || 'left'; // Default to left alignment for status cells
          const justifyContent = alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start';

          return (
            <div
              data-cell-type="status"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent,
                width: '100%',
                height: '100%',
              }}
            >
              <StatusCell
                status={statusType}
                text={value}
              />
            </div>
          );
        }
        // Fallback to simple if value is not a string
        return value;
      case 'simple':
      default:
        // For simple cells, wrap text content in a div with ellipsis styles and tooltip
        if (typeof value === 'string' || typeof value === 'number') {
          const textValue = String(value);
          const alignment = column.align || 'left'; // Default to left alignment for simple text cells
          return (
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                position: 'relative',
                textAlign: alignment,
              }}
              title={textValue} // Native HTML tooltip shows full text on hover
            >
              {value}
            </div>
          );
        }
        // For React components, wrap in alignment container based on column alignment
        if (React.isValidElement(value)) {
          const alignment = column.align || 'left'; // Default to left alignment for simple cells
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
    fontFamily: typography.styles.bodyL.fontFamily.join(', '),
    fontSize: typography.styles.bodyL.fontSize,
    fontWeight: typography.styles.bodyL.fontWeight,
    lineHeight: typography.styles.bodyL.lineHeight,
    letterSpacing: typography.styles.bodyL.letterSpacing,
    color: colors.blackAndWhite.black700,
    verticalAlign: 'middle' as const,
    borderBottom: `1px solid ${colors.theme.primary400}`, // Theme-aware border color
    borderRight: `1px solid ${colors.theme.primary400}`, // Right border for column separation
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

  // Group header row styles (extracted for clarity)
  const groupHeaderStyle: React.CSSProperties = {
    minHeight: '46px',
    borderTop: `1px solid ${colors.theme.primary400}`,
    borderBottom: `1px solid ${colors.theme.primary400}`,
    cursor: 'pointer',
  };

  const groupCellStyle: React.CSSProperties = {
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
  };

  const groupNameStyle: React.CSSProperties = {
    ...typography.styles.bodyM,
    color: colors.blackAndWhite.black700,
    margin: 0,
  };

  return (
    <tbody>
      {data.map((row, rowIndex) => {
        // Render group header row with collapsible chevron
        if (row.isGroup) {
          const chevronStyle: React.CSSProperties = {
            width: '12px',
            height: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: row.isExpanded !== false ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          };

          return (
            <tr
              key={rowIndex}
              style={groupHeaderStyle}
              onClick={() => onGroupToggle?.(rowIndex)}
            >
              <td colSpan={columns.length} style={groupCellStyle}>
                <div style={chevronStyle}>
                  <ChevronRightSmall color={colors.analytics.green900} />
                </div>
                <p style={groupNameStyle}>{row.groupName}</p>
              </td>
            </tr>
          );
        }

        // Calculate left padding for grouped child rows (22px indent)
        const rowPaddingLeft = row.isGroupChild ? '22px' : '0';

        return (
          <tr
            key={rowIndex}
            onClick={() => onRowClick && !row.isGroup && onRowClick(row, rowIndex)}
            style={{
              cursor: onRowClick && !row.isGroup ? 'pointer' : 'default'
            }}
          >
            {columns.map((column, columnIndex) => {
              const isActionColumn = column.cellType === 'action';

              const isDocumentColumn = column.cellType === 'document';

              const baseCellStyle = {
                ...cellStyles,
                // Remove padding for document cells so DocumentCell can control its own padding
                padding: isDocumentColumn ? '0' : cellStyles.padding,
                // Add left padding for first column of grouped rows
                paddingLeft: columnIndex === 0 && row.isGroupChild ? rowPaddingLeft : (isDocumentColumn ? '0' : cellStyles.padding),
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
                backgroundColor: colors.blackAndWhite.white, // Force white background
                borderRight: `1px solid ${colors.theme.primary400}`, // Maintain right border
                borderTop: rowIndex === 0 ? `1px solid ${colors.theme.primary400}` : 'none', // Top border only for first row
                borderBottom: rowIndex === data.length - 1 ? 'none' : `1px solid ${colors.theme.primary400}`, // Bottom border except last row
                boxShadow: `inset 1px 0 0 0 ${colors.theme.primary400}, ${shadows.base}`, // Use inset shadow for 1px left border + base shadow for elevation
              } : baseCellStyle;

              return (
                <td key={column.key} style={actionCellStyle}>
                  {renderCellContent(column, row[column.key], row)}
                </td>
              );
            })}
          </tr>
        );
      })}
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
  const colors = useSemanticColors();
  const paginationStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: colors.blackAndWhite.white,
    borderBottomLeftRadius: borderRadius[8],
    borderBottomRightRadius: borderRadius[8],
    borderLeft: `1px solid ${colors.theme.primary400}`,
    borderRight: `1px solid ${colors.theme.primary400}`,
    borderBottom: `1px solid ${colors.theme.primary400}`,
    borderTop: `1px solid ${colors.theme.primary400}`,
    gap: '50px',
    boxSizing: 'border-box' as const,
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
    fontSize: typography.styles.bodyS.fontSize,
    fontWeight: typography.styles.bodyS.fontWeight,
    lineHeight: typography.styles.bodyS.lineHeight,
    letterSpacing: typography.styles.bodyS.letterSpacing,
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
  title?: React.ReactNode;
  showHeader?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
  showCustomizeColumns?: boolean;
  visibleColumns?: string[];
  onColumnVisibilityChange?: (columnKey: string, visible: boolean) => void;
  showFooterPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  sortState?: SortState;
  onSort?: (column: string) => void;
  onGroupToggle?: (rowIndex: number) => void;
  emptyMessage?: string;
  headerActions?: TableHeaderAction[];
  paginationItemLabel?: string;
  className?: string;
  onRowClick?: (row: TableRow, rowIndex: number) => void;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  title,
  showHeader = true,
  searchValue = '',
  onSearchChange,
  showSearch = true,
  showCustomizeColumns = false,
  visibleColumns = [],
  onColumnVisibilityChange,
  showFooterPagination = false,
  currentPage = 1,
  totalPages = 1,
  totalItems = data.length,
  itemsPerPage = 10,
  onPageChange,
  sortState = { column: null, direction: null },
  onSort,
  onGroupToggle,
  emptyMessage = 'No data available',
  headerActions = [],
  paginationItemLabel = 'valuations',
  className = '',
  onRowClick,
}) => {
  const colors = useSemanticColors();
  const [internalSortState, setInternalSortState] = useState<SortState>(sortState);

  // Drag state for horizontal scrolling
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });
  const [needsScroll, setNeedsScroll] = useState(false);
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

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

  // Filter columns based on visibility and apply smart sizing
  const adjustedColumns = React.useMemo(() => {
    // Filter columns by visibility if showCustomizeColumns is enabled
    let filteredColumns = columns;
    if (showCustomizeColumns && visibleColumns.length > 0) {
      filteredColumns = columns.filter((col, index) => {
        // Always show the first column (index 0)
        if (index === 0) return true;
        // Always show action columns
        if (col.cellType === 'action') return true;
        // Show if in visible columns list
        return visibleColumns.includes(col.key);
      });
    }

    // Only apply smart sizing when table doesn't need horizontal scroll
    if (needsScroll || filteredColumns.length === 0) {
      return filteredColumns;
    }

    // Find the first document column (typically the first column)
    const firstDocumentColumnIndex = filteredColumns.findIndex(col => col.cellType === 'document');
    if (firstDocumentColumnIndex === -1) {
      return filteredColumns; // No document column found, return filtered columns
    }

    // Calculate total width of all columns except the first document column
    let totalOtherColumnsWidth = 0;
    let hasFixedWidths = true;

    filteredColumns.forEach((col, index) => {
      if (index !== firstDocumentColumnIndex && col.width) {
        // Extract numeric value from width (e.g., "150px" -> 150)
        const widthValue = parseInt(col.width.replace(/[^\d]/g, ''), 10);
        if (!isNaN(widthValue)) {
          totalOtherColumnsWidth += widthValue;
        } else {
          hasFixedWidths = false;
        }
      } else if (index !== firstDocumentColumnIndex) {
        hasFixedWidths = false;
      }
    });

    // Only apply smart sizing if we have fixed widths for other columns
    if (!hasFixedWidths) {
      return filteredColumns;
    }

    // Calculate remaining width for the first document column
    // Assume table container is typically around 1200px wide, leave some margin
    const assumedContainerWidth = 1200;
    const baseRemainingWidth = Math.max(300, assumedContainerWidth - totalOtherColumnsWidth - 40); // Minimum 300px, account for borders/padding

    // Reduce the first column width by 30% for better proportions
    const reducedWidth = Math.max(300, Math.floor(baseRemainingWidth * 0.7)); // 30% reduction, minimum 300px

    return filteredColumns.map((col, index) => {
      if (index === firstDocumentColumnIndex) {
        return {
          ...col,
          width: `${reducedWidth}px`
        };
      }
      return col;
    });
  }, [columns, needsScroll, showCustomizeColumns, visibleColumns]);

  // Sort data based on current sort state
  const sortedData = React.useMemo(() => {
    if (!currentSortState.column || !currentSortState.direction) {
      return data;
    }

    const sortColumn = adjustedColumns.find(col => col.key === currentSortState.column);
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
      let aValue = a[currentSortState.column!];
      let bValue = b[currentSortState.column!];

      // Convert React nodes to string for comparison if needed
      if (React.isValidElement(aValue)) {
        aValue = String(aValue.props?.children || '');
      }
      if (React.isValidElement(bValue)) {
        bValue = String(bValue.props?.children || '');
      }

      // Convert to strings for comparison
      const aStr = String(aValue || '').toLowerCase();
      const bStr = String(bValue || '').toLowerCase();

      // Try to parse as numbers if possible
      const aNum = parseFloat(aStr.replace(/[^0-9.-]/g, ''));
      const bNum = parseFloat(bStr.replace(/[^0-9.-]/g, ''));

      let comparison = 0;
      if (!isNaN(aNum) && !isNaN(bNum)) {
        // Numeric comparison
        comparison = aNum - bNum;
      } else {
        // String comparison
        comparison = aStr.localeCompare(bStr);
      }

      return currentSortState.direction === 'desc' ? -comparison : comparison;
    });
  }, [data, currentSortState, adjustedColumns]);

  // Check if table needs horizontal scrolling
  React.useEffect(() => {
    const checkScrollNeeded = () => {
      if (tableContainerRef.current) {
        const container = tableContainerRef.current;
        const needsHorizontalScroll = container.scrollWidth > container.clientWidth;
        setNeedsScroll(needsHorizontalScroll);
      }
    };

    // Check on mount and when data/columns change
    checkScrollNeeded();

    // Check on window resize
    window.addEventListener('resize', checkScrollNeeded);

    return () => {
      window.removeEventListener('resize', checkScrollNeeded);
    };
  }, [data, columns]);

  // Add CSS for arrow cursors and custom scrollbar
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .table-draggable {
        cursor: ew-resize !important;
      }
      .table-dragging {
        cursor: ew-resize !important;
      }
      .table-no-drag {
        cursor: default !important;
      }

      /* Custom scrollbar styling */
      .table-container-scrollable {
        /* Firefox */
        scrollbar-width: thin;
        scrollbar-color: ${colors.theme.primary400} ${colors.theme.primary200};
      }

      .table-container-scrollable::-webkit-scrollbar {
        height: 8px;
      }

      .table-container-scrollable::-webkit-scrollbar-track {
        background: ${colors.theme.primary200};
        border-radius: 0;
      }

      .table-container-scrollable::-webkit-scrollbar-thumb {
        background: ${colors.theme.primary400};
        border-radius: 0;
        transition: background 0.2s ease;
      }

      .table-container-scrollable::-webkit-scrollbar-thumb:hover {
        background: ${colors.theme.primary500};
      }

      .table-container-scrollable::-webkit-scrollbar-thumb:active {
        background: ${colors.theme.primary500};
      }

      /* Remove scrollbar arrows/buttons */
      .table-container-scrollable::-webkit-scrollbar-button {
        display: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [needsScroll, colors.theme.primary200, colors.theme.primary400, colors.theme.primary500]);

  // Drag handlers for horizontal scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!tableContainerRef.current || !needsScroll) return;

    // Don't start drag on clickable elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="button"]') || target.closest('a')) {
      return;
    }

    // Don't start drag on clickable cells (document, action, and custom)
    const isClickableCell = target.closest('[data-cell-type="document"]') ||
                           target.closest('[data-cell-type="action"]') ||
                           target.closest('[data-cell-type="custom"]') ||
                           target.closest('th')?.textContent?.includes('Actions');
    if (isClickableCell) {
      return;
    }

    setIsDragging(true);
    setDragStart({
      x: e.pageX,
      scrollLeft: tableContainerRef.current.scrollLeft,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !tableContainerRef.current) return;

    e.preventDefault();
    const x = e.pageX;
    const walk = (x - dragStart.x) * 2; // Multiply by 2 for faster scrolling
    tableContainerRef.current.scrollLeft = dragStart.scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const tableContainerStyles = {
    width: '100%',
    overflowX: needsScroll ? 'auto' as const : 'hidden' as const, // Only enable horizontal scroll when needed
    overflowY: 'visible' as const, // Allow vertical borders to be visible
    borderRadius: showHeader && showFooterPagination ? '0' : showHeader ? '0 0 8px 8px' : showFooterPagination ? '8px 8px 0 0' : '0', // No rounded corners when showHeader is false
    borderLeft: `1px solid ${colors.theme.primary400}`,
    borderRight: `1px solid ${colors.theme.primary400}`,
    borderTop: 'none', // Always none - either TableHeader or custom header will have the top border
    borderBottom: showFooterPagination ? 'none' : `1px solid ${colors.theme.primary400}`,
    // Force container to be constrained and show scrollbar
    maxWidth: '100%',
    minWidth: 0, // Allow shrinking
    boxSizing: 'border-box' as const,
    display: 'block' as const, // Ensure block layout
    // Cursor handled by CSS classes for better browser support
    userSelect: needsScroll ? 'none' as const : 'auto' as const, // Only prevent text selection when dragging is enabled
  };

  const tableStyles = {
    width: '100%', // Responsive width to fit container
    minWidth: '920px', // Minimum width for 5 columns: 400px + 120px + 140px + 140px + 120px = 920px
    borderCollapse: 'collapse' as const,
    backgroundColor: colors.blackAndWhite.white,
    tableLayout: 'fixed' as const, // Enforce fixed column widths from width props
    margin: 0,
    border: 'none', // No outer border, cells handle their own borders
  };

  const mainContainerStyles = {
    width: '100%',
    maxWidth: '100%', // Respect parent container width instead of viewport
    overflow: 'visible', // Allow borders to be visible
    boxSizing: 'border-box' as const,
  };

  return (
    <div className={className} style={mainContainerStyles}>
      {showHeader && (
        <CompactTableHeader
          title={title}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          showSearch={showSearch}
          showCustomizeColumns={showCustomizeColumns}
          columns={columns}
          visibleColumns={visibleColumns}
          onColumnVisibilityChange={onColumnVisibilityChange}
          currentPage={currentPage}
          totalPages={totalPages}
          paginationItemLabel={paginationItemLabel}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
          headerActions={headerActions}
        />
      )}
      
      <div
        ref={tableContainerRef}
        style={tableContainerStyles}
        className={`${isDragging ? 'table-dragging' : (needsScroll ? 'table-draggable' : 'table-no-drag')} ${needsScroll ? 'table-container-scrollable' : ''}`.trim()}
        onMouseDown={needsScroll ? handleMouseDown : undefined}
        onMouseMove={needsScroll ? handleMouseMove : undefined}
        onMouseUp={needsScroll ? handleMouseUp : undefined}
        onMouseLeave={needsScroll ? handleMouseLeave : undefined}
      >
        <table style={tableStyles}>
          <thead>
            <tr>
              {adjustedColumns.map((column, columnIndex) => (
                <TableColumnHeader
                  key={column.key}
                  column={column}
                  sortState={currentSortState}
                  onSort={handleSort}
                  isFirstColumn={columnIndex === 0}
                  isLastColumn={columnIndex === adjustedColumns.length - 1}
                />
              ))}
            </tr>
          </thead>

          <TableBody
            columns={adjustedColumns}
            data={sortedData}
            emptyMessage={emptyMessage}
            onGroupToggle={onGroupToggle}
            onRowClick={onRowClick}
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