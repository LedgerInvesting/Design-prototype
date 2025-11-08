import React from 'react';
// Import page components
import { Layout } from '@design-library/pages';
import type { BreadcrumbItem } from '@design-library/pages';

// Import base components
import { Card, Button, Stack, Grid, Container, DashboardCard, Chart } from '@design-library/components';

// Import design tokens
import { typography, spacing, borderRadius, shadows, useSemanticColors, colors as staticColors } from '@design-library/tokens';

// Import navigation utilities
import { createPageNavigationHandler, createBreadcrumbs } from '@design-library/utils/navigation';

// Import icons
import { ArrowUpSmall, ArrowDownSmall, ChevronRightExtraSmall, CardsGraph, CardsCheck, CardsText } from '@design-library/icons';

// Import entities hook
import { useEntities, type BaseEntity, type EntityMetrics } from '../hooks/useEntities';

const ChevronDownIcon: React.FC = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 3L4 5L6 3" stroke={staticColors.blackAndWhite.black900} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Small line chart component
interface SmallChartProps {
  trend: 'up' | 'down' | 'neutral';
  color?: string;
}

const SmallChart: React.FC<SmallChartProps> = ({ trend, color }) => {
  const defaultColors = {
    up: '#15BF53',   // Green for positive
    down: '#db2d31', // Red for negative  
    neutral: '#666'
  };

  const circleColor = color || defaultColors[trend];

  return (
    <svg width="106" height="28" viewBox="0 0 106 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Line path - always dark */}
      <path 
        d="M99.6842 3.63369C98.6756 3.85797 95.9318 4.51452 93.0252 5.34639C89.3919 6.38624 83.1359 7.6096 81.7232 8.40478C80.5931 9.04092 79.0994 9.93397 78.4938 10.301L74.4577 26.9998C72.9778 23.1666 69.7354 15.2923 68.6052 14.4604C67.1926 13.4205 66.3852 12.3195 64.3672 12.3195C62.3491 12.3195 59.3231 12.2583 56.2959 13.0535C53.2688 13.8487 46.0031 14.8274 43.3796 15.0109C40.756 15.1944 42.3704 15.7449 37.527 15.1332C32.6836 14.5216 30.6653 14.7051 30.4635 13.8487C30.2617 12.9924 27.4367 8.28244 27.2349 6.81441C27.0331 5.34639 25.6198 4.97938 24.8126 4.85705C24.0053 4.73471 20.7769 6.32507 18.7588 6.93675C16.7407 7.54843 15.9338 8.46594 13.7139 8.64945C7.45719 8.09894 5.84272 8.40478 5.43911 7.05909C5.03549 5.71339 4.02693 5.10172 4.02693 4.73471C4.02693 4.36771 2.21002 3.93953 2.00822 3.63369C1.84677 3.38902 1.2688 2.96085 1 2.77734" 
        stroke="#17211B" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Circle - colored based on trend */}
      <circle 
        cx="101" 
        cy="5" 
        r="4" 
        fill={circleColor} 
        stroke="white" 
        strokeWidth="2"
      />
    </svg>
  );
};

// Growth indicator component
interface GrowthIndicatorProps {
  direction: 'up' | 'down';
  percentage: string;
  period: string;
}

const GrowthIndicator: React.FC<GrowthIndicatorProps> = ({ direction, percentage, period }) => {
  const colors = useSemanticColors();
  const isPositive = direction === 'up';
  const color = isPositive ? colors.success.textAndStrokes : colors.error.textAndStrokes;
  const ArrowIcon = isPositive ? ArrowUpSmall : ArrowDownSmall;
  const sign = isPositive ? '+' : '';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontFamily: 'Söhne, system-ui, sans-serif',
      fontSize: '12px',
      fontWeight: 500,
      color: colors.blackAndWhite.black900,
    }}>
      <ArrowIcon color={color} />
      <span>{sign} {percentage} in the last {period}</span>
    </div>
  );
};

// Data validation chart component
interface DataValidationChartProps {
  level: 'excellent' | 'marginal' | 'concerning';
}

const DataValidationChart: React.FC<DataValidationChartProps> = ({ level }) => {
  // Define colors for the rectangles based on level
  const rectangleColors = {
    excellent: { top: '#15BF53', center: '#D5E33D', bottom: '#FFB5EE' },
    marginal: { top: '#D5E33D', center: '#15BF53', bottom: '#FFB5EE' },
    concerning: { top: '#FFB5EE', center: '#D5E33D', bottom: '#15BF53' }
  };

  const colors = rectangleColors[level];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg width="101" height="45" viewBox="0 0 101 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Bottom rectangle */}
        <rect x="99" y="32" width="2" height="13" rx="1" fill={colors.bottom}/>
        {/* Center rectangle */}
        <rect x="99" y="16" width="2" height="13" rx="1" fill={colors.center}/>
        {/* Top section with gradient */}
        <path d="M40 0H100C100.552 0 101 0.447715 101 1V12C101 12.5523 100.552 13 100 13H40V0Z" fill="url(#paint0_linear_15530_22613)"/>
        {/* Top rectangle */}
        <rect x="99" width="2" height="13" rx="1" fill={colors.top}/>
        
        {/* Chart line paths */}
        <path d="M76 9.02525C75.2335 9.29377 73.1481 10.0798 70.9391 11.0758C68.1779 12.3207 63.4233 13.7854 62.3496 14.7374C61.4907 15.499 60.3556 16.5682 59.8953 17.0076L56.8279 37C55.7031 32.4108 53.2389 22.9833 52.38 21.9874C51.3064 20.7424 50.6928 19.4242 49.159 19.4242C47.6253 19.4242 45.3255 19.351 43.0249 20.303C40.7243 21.2551 35.2023 22.4268 33.2085 22.6465C31.2146 22.8662 32.4415 23.5253 28.7605 22.7929C25.0795 22.0606 23.5456 22.2803 23.3923 21.255C23.2389 20.2298 21.0919 14.5909 20.9385 12.8333C20.7852 11.0758 19.7111 10.6364 19.0976 10.4899C18.4841 10.3434 16.0304 12.2475 14.4967 12.9798C12.9629 13.7121 12.3497 14.8106 10.6625 15.0303C5.90747 14.3712 4.68047 14.7374 4.37372 13.1263C4.06697 11.5152 3.30046 10.7828 3.30046 10.3434C3.30046 9.90404 1.91962 9.39141 1.76624 9.02525C1.64354 8.73232 1.20429 8.2197 1 8" stroke="#17211B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        
        {/* Green circle */}
        <circle cx="78" cy="7" r="4" fill="#15BF53" stroke="white" strokeWidth="2"/>
        
        <defs>
          <linearGradient id="paint0_linear_15530_22613" x1="40" y1="6.5" x2="101" y2="6.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="#C6FFC1"/>
          </linearGradient>
        </defs>
      </svg>

      {/* Status labels */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2px',
        fontSize: '9px',
        fontFamily: 'Söhne, system-ui, sans-serif',
        fontWeight: 500,
        color: '#8b908d',
        textAlign: 'right' as const,
        lineHeight: 1.2
      }}>
        <div style={{ height: '13px', display: 'flex', alignItems: 'center' }}>Excellent</div>
        <div style={{ height: '13px', display: 'flex', alignItems: 'center' }}>Marginal</div>
        <div style={{ height: '13px', display: 'flex', alignItems: 'center' }}>Concerning</div>
      </div>
    </div>
  );
};

// Status meter component for validation metrics
interface StatusMeterProps {
  level: 'excellent' | 'marginal' | 'concerning';
}

const StatusMeter: React.FC<StatusMeterProps> = ({ level }) => {
  const colors = useSemanticColors();
  const levels = {
    excellent: { color: '#2fa915', position: 80 },
    marginal: { color: '#f59e0b', position: 50 },
    concerning: { color: '#db2d31', position: 20 }
  };

  const current = levels[level];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{
        width: '60px',
        height: '8px',
        backgroundColor: '#f3f4f6',
        borderRadius: '4px',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          left: `${current.position}%`,
          top: '-2px',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: current.color,
          transform: 'translateX(-50%)'
        }} />
      </div>
      <div style={{
        fontSize: '8px',
        color: colors.blackAndWhite.black500,
        textTransform: 'capitalize' as const,
        fontWeight: 500
      }}>
        {level}
      </div>
    </div>
  );
};

/**
 * Tree node interface for hierarchical entity selector
 * Represents nodes in the dropdown tree structure
 */
interface TreeNode {
  id: string;
  label: string;
  type: 'folder' | 'reinsurer' | 'mga' | 'program' | 'transaction';
  entity?: BaseEntity;
  children?: TreeNode[];
}

/**
 * Entity selector card component with hierarchical dropdown
 * Allows users to select entities from the hierarchical structure
 */
interface EntitySelectorCardProps {
  currentEntity: {
    id: string;
    name: string;
    type: BaseEntity['type'];
    path: string; // Display path like "Reinsurer > MGA > Program"
  };
  onEntityChange?: (entity: { id: string; name: string; type: BaseEntity['type']; path: string }) => void;
}

const EntitySelectorCard: React.FC<EntitySelectorCardProps> = ({
  currentEntity,
  onEntityChange
}) => {
  const colors = useSemanticColors();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [expandedNodes, setExpandedNodes] = React.useState<Set<string>>(new Set(['reinsurers-folder']));
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const { entities, loading } = useEntities();

  // Build hierarchical tree data from entities
  const treeData: TreeNode[] = React.useMemo(() => {
    if (loading || !entities) return [];

    return [
      {
        id: 'reinsurers-folder',
        label: 'Reinsurers',
        type: 'folder',
        children: entities.reinsurers.map(reinsurer => ({
          id: reinsurer.id,
          label: reinsurer.name,
          type: 'reinsurer',
          entity: reinsurer,
          children: [
            {
              id: `${reinsurer.id}-mgas-folder`,
              label: 'MGAs',
              type: 'folder',
              children: reinsurer.mgas.map(mga => ({
                id: mga.id,
                label: mga.name,
                type: 'mga',
                entity: mga,
                children: [
                  {
                    id: `${mga.id}-programs-folder`,
                    label: 'Programs',
                    type: 'folder',
                    children: mga.programs.map(program => ({
                      id: program.id,
                      label: program.name,
                      type: 'program',
                      entity: program,
                      children: [
                        {
                          id: `${program.id}-transactions-folder`,
                          label: 'Transactions',
                          type: 'folder',
                          children: program.transactions.map(transaction => ({
                            id: transaction.id,
                            label: transaction.name,
                            type: 'transaction',
                            entity: transaction
                          }))
                        }
                      ]
                    }))
                  }
                ]
              }))
            }
          ]
        }))
      }
    ];
  }, [entities, loading]);

  // Handle clicks outside dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const selectEntity = (node: TreeNode, parentPath: string[] = []) => {
    if (node.entity) {
      // Build display path from parent hierarchy
      const pathParts = [...parentPath.filter(p => p !== 'Reinsurers' && p !== 'MGAs' && p !== 'Programs' && p !== 'Transactions'), node.label];
      const displayPath = pathParts.join(' > ');

      onEntityChange?.({
        id: node.entity.id,
        name: node.entity.name,
        type: node.entity.type,
        path: displayPath
      });
      setIsDropdownOpen(false);
    }
  };

  const renderTreeNode = (node: TreeNode, level: number = 0, parentPath: string[] = []): React.ReactNode => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    const isLeaf = !hasChildren;
    const currentPath = [...parentPath, node.label];

    // Check if this is a folder title
    const isFolderTitle = node.type === 'folder';
    const isSelectable = node.entity !== undefined;

    const nodeStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      paddingLeft: 12 + (level * 20),
      cursor: 'pointer',
      backgroundColor: 'transparent',
      borderRadius: borderRadius[4],
      transition: 'background-color 0.2s ease',
    };

    const nodeHoverStyles: React.CSSProperties = {
      ...nodeStyles,
      backgroundColor: colors.theme.primary200,
    };

    return (
      <div key={node.id}>
        <div
          style={nodeStyles}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.theme.primary200;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          onClick={() => {
            if (hasChildren) {
              toggleNode(node.id);
            } else if (isSelectable) {
              selectEntity(node, parentPath);
            }
          }}
        >
          {/* Expand/Collapse Icon */}
          <div style={{
            width: '16px',
            height: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '8px'
          }}>
            {hasChildren && (
              <ChevronRightExtraSmall
                color={colors.blackAndWhite.black700}
                style={{
                  transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}
              />
            )}
            {isLeaf && isSelectable && (
              <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: colors.blackAndWhite.black500
              }} />
            )}
          </div>

          {/* Node Label */}
          <span style={{
            ...(isFolderTitle ? typography.styles.captionS : typography.styles.bodyM),
            color: isFolderTitle ? colors.blackAndWhite.black500 : colors.blackAndWhite.black900,
            fontWeight: isSelectable ? 400 : 500
          }}>
            {node.label}
          </span>
        </div>

        {/* Render children if expanded */}
        {hasChildren && isExpanded && (
          <div>
            {node.children?.map(child => renderTreeNode(child, level + 1, currentPath))}
          </div>
        )}
      </div>
    );
  };

  const cardStyles: React.CSSProperties = {
    backgroundColor: colors.blackAndWhite.white,
    border: `1px solid ${colors.theme.primary400}`,
    borderRadius: borderRadius[8],
    padding: '20px 30px',
    width: '100%',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    boxShadow: shadows.small,
    position: 'relative',
  };

  const textStyles: React.CSSProperties = {
    ...typography.styles.bodyL,
    color: colors.blackAndWhite.black900,
  };

  const dropdownStyles: React.CSSProperties = {
    position: 'absolute',
    top: '60px',
    left: '0',
    right: '0',
    backgroundColor: colors.blackAndWhite.white,
    border: `1px solid ${colors.theme.primary400}`,
    borderRadius: borderRadius[8],
    boxShadow: shadows.large,
    zIndex: 1000,
    maxHeight: '400px',
    overflowY: 'auto',
    padding: '8px 0',
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
      <div
        style={cardStyles}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div style={textStyles}>
          You're viewing: {currentEntity.path}
        </div>
        <ChevronDownIcon
          style={{
            transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}
        />
      </div>

      {/* Tree Dropdown */}
      {isDropdownOpen && (
        <div style={dropdownStyles}>
          {treeData.map(node => renderTreeNode(node))}
        </div>
      )}
    </div>
  );
};

/**
 * Entity relationship pills component
 * Shows clickable parent hierarchy breadcrumbs
 */
interface EntityRelationshipProps {
  parents: { id: string; name: string; type: BaseEntity['type'] }[];
  onEntityClick?: (entity: { id: string; name: string; type: BaseEntity['type'] }) => void;
}

const EntityRelationship: React.FC<EntityRelationshipProps> = ({
  parents,
  onEntityClick
}) => {
  const colors = useSemanticColors();
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    flexWrap: 'wrap',
    marginTop: '24px',
  };

  const labelStyles: React.CSSProperties = {
    fontFamily: 'Söhne, system-ui, sans-serif',
    fontSize: '10px',
    fontWeight: 500,
    lineHeight: 1.3,
    color: colors.blackAndWhite.black600,
  };

  const pillStyles: React.CSSProperties = {
    backgroundColor: colors.theme.primary200,
    borderRadius: borderRadius[4],
    padding: '6px 10px',
    fontFamily: 'Söhne, system-ui, sans-serif',
    fontSize: '10px',
    fontWeight: 500,
    lineHeight: 1.3,
    color: colors.blackAndWhite.black900,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    border: 'none',
    outline: 'none',
  };

  if (parents.length === 0) {
    return null; // Don't show anything if there are no parents
  }

  return (
    <div style={containerStyles}>
      <span style={labelStyles}>Part of</span>
      {parents.map((parent, index) => (
        <React.Fragment key={parent.id}>
          {index > 0 && <span style={labelStyles}>→</span>}
          <button
            style={pillStyles}
            onClick={() => onEntityClick?.(parent)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.theme.primary300;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.theme.primary200;
            }}
          >
            {parent.name}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

/**
 * Reports Explorer main component
 * Displays hierarchical entity selector, metrics, and insights
 */
interface ReportNavigationProps {
  onNavigateToPage?: (page: 'reports-cash-settlement' | 'reports-explorer' | 'reports-transaction-management' | 'reports-contracts-explorer' | 'analytics-valuation' | 'reports-bdx-upload' | 'marketplace-offerings') => void;
}

export const ReportNavigation: React.FC<ReportNavigationProps> = ({ onNavigateToPage }) => {
  const colors = useSemanticColors();
  const { entities, loading, findEntityById } = useEntities();

  // State for the current entity
  const [currentEntity, setCurrentEntity] = React.useState({
    id: "prog-002",
    name: "Property Cat Treaty 2025",
    type: "Program" as BaseEntity['type'],
    path: "Pineapple Re > Falcon Risk Services > Property Cat Treaty 2025"
  });

  // Get entity parents dynamically based on current selection
  const getEntityParents = React.useCallback(() => {
    if (!entities || loading) return { parents: [] };
    
    const currentEntityData = findEntityById(currentEntity.id, currentEntity.type);
    if (!currentEntityData) return { parents: [] };
    
    const parents: { id: string; name: string; type: BaseEntity['type'] }[] = [];
    
    // Find parents based on entity type
    switch (currentEntity.type) {
      case 'Transaction':
        // Find the program this transaction belongs to
        const program = entities.programs.find(p => 
          p.transactions.some(t => t.id === currentEntity.id)
        );
        if (program) {
          parents.push({ id: program.id, name: program.name, type: 'Program' });
          
          // Find the MGA this program belongs to
          const mga = entities.mgas.find(m => 
            m.programs.some(p => p.id === program.id)
          );
          if (mga) {
            parents.push({ id: mga.id, name: mga.name, type: 'MGA' });
            
            // Find the Reinsurer this MGA belongs to
            const reinsurer = entities.reinsurers.find(r => 
              r.mgas.some(m => m.id === mga.id)
            );
            if (reinsurer) {
              parents.push({ id: reinsurer.id, name: reinsurer.name, type: 'Reinsurer' });
            }
          }
        }
        break;
        
      case 'Program':
        // Find the MGA this program belongs to
        const programMga = entities.mgas.find(m => 
          m.programs.some(p => p.id === currentEntity.id)
        );
        if (programMga) {
          parents.push({ id: programMga.id, name: programMga.name, type: 'MGA' });
          
          // Find the Reinsurer this MGA belongs to
          const programReinsurer = entities.reinsurers.find(r => 
            r.mgas.some(m => m.id === programMga.id)
          );
          if (programReinsurer) {
            parents.push({ id: programReinsurer.id, name: programReinsurer.name, type: 'Reinsurer' });
          }
        }
        break;
        
      case 'MGA':
        // Find the Reinsurer this MGA belongs to
        const mgaReinsurer = entities.reinsurers.find(r => 
          r.mgas.some(m => m.id === currentEntity.id)
        );
        if (mgaReinsurer) {
          parents.push({ id: mgaReinsurer.id, name: mgaReinsurer.name, type: 'Reinsurer' });
        }
        break;
        
      case 'Reinsurer':
        // Reinsurers are top level, no parents
        break;
    }
    
    return { parents: parents.reverse() }; // Reverse to show hierarchy from top to bottom
  }, [entities, loading, currentEntity, findEntityById]);
  
  const { parents } = getEntityParents();


  // Generate chart data based on current entity
  const chartData = React.useMemo(() => {
    // For now, use a simple data generator based on entity ID
    const baseData = [
      { "date": "2025-01", "lineA": 80, "lineB": 10, "lineC": 0, "lineD": 2 },
      { "date": "2025-02", "lineA": 75, "lineB": 35, "lineC": 3, "lineD": 6 },
      { "date": "2025-03", "lineA": 77, "lineB": 20, "lineC": 6, "lineD": 12 },
      { "date": "2025-04", "lineA": 65, "lineB": 22, "lineC": 10, "lineD": 15 },
      { "date": "2025-05", "lineA": 62, "lineB": 25, "lineC": 15, "lineD": 18 },
      { "date": "2025-06", "lineA": 60, "lineB": 28, "lineC": 18, "lineD": 20 },
      { "date": "2025-07", "lineA": 58, "lineB": 30, "lineC": 22, "lineD": 25 },
      { "date": "2025-08", "lineA": 50, "lineB": 32, "lineC": 27, "lineD": 28 },
      { "date": "2025-09", "lineA": 70, "lineB": 40, "lineC": 35, "lineD": 33 },
      { "date": "2025-10", "lineA": 78, "lineB": 45, "lineC": 42, "lineD": 37 },
      { "date": "2025-11", "lineA": 82, "lineB": 50, "lineC": 48, "lineD": 42 },
      { "date": "2025-12", "lineA": 85, "lineB": 52, "lineC": 55, "lineD": 46 }
    ];
    
    // Apply variation based on entity ID for different visualization per entity
    const hash = currentEntity.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const variation = (hash % 20) - 10; // -10 to +10 variation
    
    return baseData.map(item => ({
      ...item,
      lineA: Math.max(0, item.lineA + variation),
      lineB: Math.max(0, item.lineB + variation / 2),
      lineC: Math.max(0, item.lineC + variation / 3),
      lineD: Math.max(0, item.lineD + variation / 4)
    }));
  }, [currentEntity.id]);


  // Get current entity's metrics from the database
  const currentEntityData = findEntityById(currentEntity.id, currentEntity.type);
  const currentMetrics = currentEntityData?.metrics || {
    cession: {
      premium: { value: "$0", growth: "0%", direction: "up" as const },
      remittance: { value: "$0", growth: "0%", direction: "up" as const },
      collateral: { value: "$0", growth: "0%", direction: "up" as const }
    },
    validation: {
      policies: { count: 0, percent: "0%", level: "excellent" as const },
      premium: { value: "$0", percent: "0%", level: "excellent" as const },
      claims: { count: 0, percent: "0%", level: "excellent" as const },
      losses: { value: "$0", percent: "0%", level: "excellent" as const }
    }
  };

  return (
    <Layout
      pageType="reports-explorer"
      breadcrumbs={[
        { label: 'REPORTS EXPLORER', isActive: true }
      ]}
      selectedSidebarItem="reports"
      selectedSidebarSubitem="reports-explorer"
      onNavigate={createPageNavigationHandler(onNavigateToPage, 'reports-explorer')}
      onInboxClick={() => {
        console.log('Inbox clicked');
      }}
    >

          {/* Entity Selector Card */}
          <EntitySelectorCard
            currentEntity={currentEntity}
            onEntityChange={(entity) => {
              console.log('Entity selected:', entity);
              setCurrentEntity(entity);
            }}
          />

          {/* Entity Relationship Pills */}
          <EntityRelationship
            parents={parents}
            onEntityClick={(parent) => {
              // Build the path based on the parent's hierarchy
              const parentPath = parents.slice(0, parents.indexOf(parent) + 1)
                .map(p => p.name)
                .join(' > ');
              
              setCurrentEntity({
                id: parent.id,
                name: parent.name,
                type: parent.type,
                path: parentPath
              });
            }}
          />

          {/* Metric Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            marginTop: '40px'
          }}>
            {/* Cession and Collateral Card */}
            <DashboardCard
              title="Cession and Collateral"
              icon={<CardsGraph color={colors.theme.primary700} />}
              button={{
                text: "EXPLORE",
                onClick: () => {
                  // Pass current entity data to the next page
                  onNavigateToPage?.('reports-cash-settlement', currentEntity);
                }
              }}
              width="100%"
            >
              <div style={{ padding: '20px 30px 26px 30px' }}>
                {/* Metric 1: Quota Share Written Premium */}
                <div style={{ marginBottom: '10px' }}>
                  <div style={{
                    fontFamily: 'Söhne, system-ui, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: 1.3,
                    color: colors.blackAndWhite.black500,
                    marginBottom: '5px'
                  }}>
                    Quota Share Written Premium
                  </div>
                  <GrowthIndicator direction={currentMetrics.cession.premium.direction} percentage={currentMetrics.cession.premium.growth} period="3m" />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginTop: '12px'
                  }}>
                    <div style={{
                      fontFamily: 'Söhne, system-ui, sans-serif',
                      lineHeight: 1.3,
                      color: colors.blackAndWhite.black900,
                      fontSize: '26px',
                      fontWeight: 400
                    }}>
                      {currentMetrics.cession.premium.value}
                    </div>
                    <SmallChart trend={currentMetrics.cession.premium.direction} />
                  </div>
                </div>

                {/* Content-padded separator */}
                <div style={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: colors.theme.primary400,
                  margin: '0 0 20px 0'
                }} />

                {/* Metric 2: Total Remittance */}
                <div style={{ marginBottom: '10px' }}>
                  <div style={{
                    fontFamily: 'Söhne, system-ui, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: 1.3,
                    color: colors.blackAndWhite.black500,
                    marginBottom: '5px'
                  }}>
                    Total Remittance
                  </div>
                  <GrowthIndicator direction={currentMetrics.cession.remittance.direction} percentage={currentMetrics.cession.remittance.growth} period="3m" />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginTop: '12px'
                  }}>
                    <div style={{
                      fontFamily: 'Söhne, system-ui, sans-serif',
                      lineHeight: 1.3,
                      color: colors.blackAndWhite.black900,
                      fontSize: '26px',
                      fontWeight: 400
                    }}>
                      {currentMetrics.cession.remittance.value}
                    </div>
                    <SmallChart trend={currentMetrics.cession.remittance.direction} />
                  </div>
                </div>

                {/* Content-padded separator */}
                <div style={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: colors.theme.primary400,
                  margin: '0 0 20px 0'
                }} />

                {/* Metric 3: Collateral Required */}
                <div>
                  <div style={{
                    fontFamily: 'Söhne, system-ui, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: 1.3,
                    color: colors.blackAndWhite.black500,
                    marginBottom: '5px'
                  }}>
                    Collateral Required
                  </div>
                  <GrowthIndicator direction={currentMetrics.cession.collateral.direction} percentage={currentMetrics.cession.collateral.growth} period="3m" />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginTop: '12px'
                  }}>
                    <div style={{
                      fontFamily: 'Söhne, system-ui, sans-serif',
                      lineHeight: 1.3,
                      color: colors.blackAndWhite.black900,
                      fontSize: '26px',
                      fontWeight: 400
                    }}>
                      {currentMetrics.cession.collateral.value}
                    </div>
                    <SmallChart trend={currentMetrics.cession.collateral.direction} />
                  </div>
                </div>
              </div>
            </DashboardCard>

            {/* Data Validation Card */}
            <DashboardCard
              title="Data Validation"
              icon={<CardsCheck color={colors.theme.primary700} />}
              button={{
                text: "EXPLORE",
                onClick: () => console.log('Data Validation explore clicked')
              }}
              width="100%"
            >
              <div style={{ padding: '20px 30px 26px 30px' }}>

              {/* Metric 1: Policies with Critical Validation Issues */}
              <div style={{ marginBottom: '15px' }}>
                <div style={{
                  fontFamily: 'Söhne, system-ui, sans-serif',
                  fontSize: '12px',
                  fontWeight: 500,
                  lineHeight: 1.3,
                  color: colors.blackAndWhite.black900,
                  marginBottom: '4px'
                }}>
                  Policies with Critical Validation Issues
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <div style={{
                      fontFamily: 'Söhne, system-ui, sans-serif',
                      lineHeight: 1.3,
                      color: colors.blackAndWhite.black900,
                      fontSize: '26px',
                      fontWeight: 400
                    }}>
                      {currentMetrics.validation.policies.count}
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: colors.blackAndWhite.black500
                    }}>
                      {currentMetrics.validation.policies.percent}
                    </div>
                  </div>
                  <DataValidationChart level={currentMetrics.validation.policies.level} />
                </div>
              </div>

              {/* Dashed separator between Policies and Affected Premium */}
              <div style={{
                width: '100%',
                height: '1px',
                backgroundColor: 'transparent',
                borderTop: `1px dashed ${colors.theme.primary400}`,
                margin: '0 0 10px 0'
              }} />

              {/* Metric 2: Affected Premium */}
              <div style={{ marginBottom: '15px' }}>
                <div style={{
                  fontFamily: 'Söhne, system-ui, sans-serif',
                  fontSize: '12px',
                  fontWeight: 500,
                  lineHeight: 1.3,
                  color: colors.blackAndWhite.black900,
                  marginBottom: '4px'
                }}>
                  Affected Premium
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <div style={{
                      fontFamily: 'Söhne, system-ui, sans-serif',
                      lineHeight: 1.3,
                      color: colors.blackAndWhite.black900,
                      fontSize: '26px',
                      fontWeight: 400
                    }}>
                      {currentMetrics.validation.premium.value}
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: colors.blackAndWhite.black500
                    }}>
                      {currentMetrics.validation.premium.percent}
                    </div>
                  </div>
                  <DataValidationChart level={currentMetrics.validation.premium.level} />
                </div>
              </div>

              {/* Regular separator between Affected Premium and Claims */}
              <div style={{
                width: '100%',
                height: '1px',
                backgroundColor: colors.theme.primary400,
                margin: '0 0 10px 0'
              }} />

              {/* Metric 3: Claims with Critical Validation Issues */}
              <div style={{ marginBottom: '15px' }}>
                <div style={{
                  fontFamily: 'Söhne, system-ui, sans-serif',
                  fontSize: '12px',
                  fontWeight: 500,
                  lineHeight: 1.3,
                  color: colors.blackAndWhite.black900,
                  marginBottom: '4px'
                }}>
                  Claims with Critical Validation Issues
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <div style={{
                      fontFamily: 'Söhne, system-ui, sans-serif',
                      lineHeight: 1.3,
                      color: colors.blackAndWhite.black900,
                      fontSize: '26px',
                      fontWeight: 400
                    }}>
                      {currentMetrics.validation.claims.count}
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: colors.blackAndWhite.black500
                    }}>
                      {currentMetrics.validation.claims.percent}
                    </div>
                  </div>
                  <DataValidationChart level={currentMetrics.validation.claims.level} />
                </div>
              </div>

              {/* Dashed separator between Claims and Affected Losses */}
              <div style={{
                width: '100%',
                height: '1px',
                backgroundColor: 'transparent',
                borderTop: `1px dashed ${colors.theme.primary400}`,
                margin: '0 0 10px 0'
              }} />

              {/* Metric 4: Affected Losses */}
              <div>
                <div style={{
                  fontFamily: 'Söhne, system-ui, sans-serif',
                  fontSize: '12px',
                  fontWeight: 500,
                  lineHeight: 1.3,
                  color: colors.blackAndWhite.black900,
                  marginBottom: '4px'
                }}>
                  Affected Losses
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <div style={{
                      fontFamily: 'Söhne, system-ui, sans-serif',
                      lineHeight: 1.3,
                      color: colors.blackAndWhite.black900,
                      fontSize: '26px',
                      fontWeight: 400
                    }}>
                      {currentMetrics.validation.losses.value}
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: colors.blackAndWhite.black500
                    }}>
                      {currentMetrics.validation.losses.percent}
                    </div>
                  </div>
                  <DataValidationChart level={currentMetrics.validation.losses.level} />
                </div>
              </div>
              </div>
            </DashboardCard>

          </div>

          {/* Full-width Card */}
          <div style={{
            backgroundColor: colors.blackAndWhite.white,
            border: `1px solid ${colors.theme.primary400}`,
            borderRadius: borderRadius[12],
            overflow: 'hidden',
            marginTop: '24px'
          }}>
            {/* Card Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 30px',
            }}>
              <h3 style={{
                ...typography.styles.bodyL,
                color: colors.blackAndWhite.black900,
                margin: 0
              }}>
                Insights
              </h3>
              <button
                style={{
                  backgroundColor: colors.theme.primary200,
                  border: 'none',
                  borderRadius: borderRadius.absolute,
                  padding: '6px 12px',
                  ...typography.styles.bodyS,
                  fontWeight: 600,
                  color: colors.blackAndWhite.black900,
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
                onClick={() => onNavigateToPage?.('reports-insights-program-details')}
              >
                EXPLORE
              </button>
            </div>

            {/* Full-width separator */}
            <div style={{
              width: '100%',
              height: '1px',
              backgroundColor: colors.theme.primary400,
              margin: '0',
            }} />

            {/* Card Content - Loss Ratio Chart */}
            <div>
              <Chart
                data={chartData}
                type="line"
                lines={[
                  { dataKey: 'lineA', color: colors.theme.primary700, label: 'Line A' },
                  { dataKey: 'lineB', color: colors.marketplace.violet700, label: 'Line B' },
                  { dataKey: 'lineC', color: colors.success.textAndStrokes, label: 'Line C' },
                  { dataKey: 'lineD', color: colors.analytics.green700, label: 'Line D' }
                ]}
                xAxisKey="date"
                height={325}
                showGrid={true}
                showTooltip={true}
                xAxisInside={false}
                yAxisInside={false}
                xAxisLabel="Evaluation Date"
                yAxisLabel="Loss Ratio"
              />
            </div>
          </div>

          {/* Bottom Cards Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            marginTop: '24px'
          }}>
            {/* Data Ingestion Card */}
            <DashboardCard
              title="Data Ingestion"
              icon={<CardsGraph color={colors.theme.primary700} />}
              button={{
                text: "EXPLORE",
                onClick: () => onNavigateToPage?.('reports-bdx-upload')
              }}
              width="100%"
            >
              <div style={{
                padding: '30px 30px 26px 30px',
                textAlign: 'center',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                {/* Main content text */}
                <div style={{
                  marginBottom: '30px'
                }}>
                  <div style={{
                    ...typography.styles.subheadingL,
                    color: colors.blackAndWhite.black900,
                    marginBottom: '12px',
                    lineHeight: 1.4
                  }}>
                    Most recent data is from
                  </div>
                  <div style={{
                    ...typography.styles.subheadingL,
                    color: colors.success.textAndStrokes,
                    fontWeight: 600,
                    marginBottom: '4px'
                  }}>
                    {currentMetrics.dataIngestion?.lastUpdate || '2025-03-31'}
                  </div>
                  <div style={{
                    ...typography.styles.subheadingL,
                    color: colors.blackAndWhite.black900,
                    marginBottom: '8px'
                  }}>
                    . Next BDX is due in{' '}
                    <span style={{
                      color: colors.success.textAndStrokes,
                      fontWeight: 600
                    }}>
                      {currentMetrics.dataIngestion?.nextDue || '11 days'}
                    </span>
                    .
                  </div>
                </div>

                {/* Status boxes */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div
                    style={{
                      border: `1px solid ${colors.theme.primary400}`,
                      borderRadius: borderRadius[4],
                      padding: '12px 16px',
                      ...typography.styles.bodyM,
                      color: colors.blackAndWhite.black900,
                      backgroundColor: colors.blackAndWhite.white,
                      cursor: 'pointer'
                    }}
                    onClick={() => onNavigateToPage?.('reports-bdx-upload')}
                  >
                    3 months (Need review)
                  </div>
                  <div style={{
                    border: `1px solid ${colors.theme.primary400}`,
                    borderRadius: borderRadius[4],
                    padding: '12px 16px',
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                    backgroundColor: colors.blackAndWhite.white
                  }}>
                    1 month flagged for cedant revision
                  </div>
                </div>
              </div>
            </DashboardCard>

            {/* Contracts Card */}
            <DashboardCard
              title="Contracts"
              icon={<CardsText color={colors.theme.primary700} />}
              button={{
                text: "EXPLORE",
                onClick: () => onNavigateToPage?.('reports-contracts-explorer')
              }}
              width="100%"
            >
              <div style={{
                padding: '30px 30px 26px 30px',
                textAlign: 'center',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px'
              }}>
                {/* Blue 700 Container */}
                <div style={{
                  backgroundColor: colors.theme.primary700,
                  borderRadius: borderRadius[12],
                  padding: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Contract Icon - using same as transaction management */}
                  <img 
                    src="/transaction header icon.png" 
                    alt="contracts" 
                    style={{ 
                      width: '80px', 
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                </div>
                
                {/* Text Content */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <div style={{
                    ...typography.styles.bodyL,
                    color: colors.blackAndWhite.black900,
                  }}>
                    {currentMetrics.contracts?.total || 0} Contracts available
                  </div>
                  <div style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black500,
                  }}>
                    {currentMetrics.contracts?.recent || 0} Contracts executed in past 30 days
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
    </Layout>
  );
};