import React from 'react';
// Import page components
import { Layout } from '@design-library/pages';
import type { BreadcrumbItem } from '@design-library/pages';

// Import base components  
import { Card, Button, Stack, Grid, Container } from '@design-library/components';

// Import design tokens
import { typography, spacing, borderRadius, shadows, useSemanticColors, colors as staticColors } from '@design-library/tokens';

// Import icons
import { ArrowUpSmall, ArrowDownSmall, ChevronRightExtraSmall } from '@design-library/icons';

// Custom chevron down icon component
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

// Tree node interface for the program selector
interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

// Program selector card component with tree dropdown
interface ProgramSelectorCardProps {
  currentProgram: {
    name: string;
    account: string;
  };
  onProgramChange?: (program: { name: string; account: string }) => void;
}

const ProgramSelectorCard: React.FC<ProgramSelectorCardProps> = ({
  currentProgram,
  onProgramChange
}) => {
  const colors = useSemanticColors();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [expandedNodes, setExpandedNodes] = React.useState<Set<string>>(new Set());
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Tree data structure with folder organization: Reinsurers > MGA > Programs > Treaties
  const treeData: TreeNode[] = [
    {
      id: 'reinsurers-folder',
      label: 'Reinsurers',
      children: [
        {
          id: 'swiss-re',
          label: 'Swiss Re',
          children: [
            {
              id: 'mga-folder-swiss',
              label: 'MGA',
              children: [
                {
                  id: 'mga-global',
                  label: 'Global MGA Solutions',
                  children: [
                    {
                      id: 'programs-folder-global',
                      label: 'Programs',
                      children: [
                        {
                          id: 'property-program',
                          label: 'Property Program 2024',
                          children: [
                            {
                              id: 'treaties-folder-property',
                              label: 'Treaties',
                              children: [
                                { id: 'property-cat-treaty', label: 'Property Cat Treaty' },
                                { id: 'property-quota-treaty', label: 'Property Quota Share Treaty' }
                              ]
                            }
                          ]
                        },
                        {
                          id: 'casualty-program',
                          label: 'Casualty Program 2024',
                          children: [
                            {
                              id: 'treaties-folder-casualty',
                              label: 'Treaties',
                              children: [
                                { id: 'casualty-excess-treaty', label: 'Casualty Excess Treaty' },
                                { id: 'casualty-stop-loss-treaty', label: 'Casualty Stop Loss Treaty' }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 'mga-specialty',
                  label: 'Specialty Lines MGA',
                  children: [
                    {
                      id: 'programs-folder-specialty',
                      label: 'Programs',
                      children: [
                        {
                          id: 'marine-program',
                          label: 'Marine Program 2024',
                          children: [
                            {
                              id: 'treaties-folder-marine',
                              label: 'Treaties',
                              children: [
                                { id: 'marine-hull-treaty', label: 'Marine Hull Treaty' },
                                { id: 'marine-cargo-treaty', label: 'Marine Cargo Treaty' }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'munich-re',
          label: 'Munich Re',
          children: [
            {
              id: 'mga-folder-munich',
              label: 'MGA',
              children: [
                {
                  id: 'mga-north-america',
                  label: 'North America MGA',
                  children: [
                    {
                      id: 'programs-folder-na',
                      label: 'Programs',
                      children: [
                        {
                          id: 'auto-program',
                          label: 'Auto Program 2024',
                          children: [
                            {
                              id: 'treaties-folder-auto',
                              label: 'Treaties',
                              children: [
                                { id: 'auto-liability-treaty', label: 'Auto Liability Treaty' },
                                { id: 'auto-physical-damage-treaty', label: 'Auto Physical Damage Treaty' }
                              ]
                            }
                          ]
                        },
                        {
                          id: 'workers-comp-program',
                          label: 'Workers Comp Program 2024',
                          children: [
                            {
                              id: 'treaties-folder-workers',
                              label: 'Treaties',
                              children: [
                                { id: 'workers-comp-excess-treaty', label: 'Workers Comp Excess Treaty' },
                                { id: 'workers-comp-quota-treaty', label: 'Workers Comp Quota Share Treaty' }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'berkshire-hathaway',
          label: 'Berkshire Hathaway Re',
          children: [
            {
              id: 'mga-folder-berkshire',
              label: 'MGA',
              children: [
                {
                  id: 'mga-international',
                  label: 'International MGA',
                  children: [
                    {
                      id: 'programs-folder-intl',
                      label: 'Programs',
                      children: [
                        {
                          id: 'aviation-program',
                          label: 'Aviation Program 2024',
                          children: [
                            {
                              id: 'treaties-folder-aviation',
                              label: 'Treaties',
                              children: [
                                { id: 'aviation-hull-treaty', label: 'Aviation Hull Treaty' },
                                { id: 'aviation-liability-treaty', label: 'Aviation Liability Treaty' }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'lloyds-london',
          label: 'Lloyd\'s of London',
          children: [
            {
              id: 'mga-folder-lloyds',
              label: 'MGA',
              children: [
                {
                  id: 'mga-energy',
                  label: 'Energy MGA',
                  children: [
                    {
                      id: 'programs-folder-energy',
                      label: 'Programs',
                      children: [
                        {
                          id: 'energy-program',
                          label: 'Energy Program 2024',
                          children: [
                            {
                              id: 'treaties-folder-energy',
                              label: 'Treaties',
                              children: [
                                { id: 'energy-liability-treaty', label: 'Energy Liability Treaty' },
                                { id: 'energy-property-treaty', label: 'Energy Property Treaty' }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ];

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

  const selectProgram = (node: TreeNode, parentPath: string[] = []) => {
    if (!node.children) {
      // Only select leaf nodes (Treaties)
      // Build account string from parent hierarchy: Reinsurer - MGA
      const reinsurer = parentPath[0] || '';
      const mga = parentPath[1] || '';
      const account = mga ? `${reinsurer} - ${mga}` : reinsurer;

      onProgramChange?.({
        name: node.label,
        account: account
      });
      setIsDropdownOpen(false);
    }
  };

  const renderTreeNode = (node: TreeNode, level: number = 0, parentPath: string[] = []): React.ReactNode => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    const isLeaf = !hasChildren;
    const currentPath = [...parentPath, node.label];

    // Check if this is a folder title (Reinsurers, MGA, Programs, Treaties)
    const isFolderTitle = node.label === 'Reinsurers' ||
                         node.label === 'MGA' ||
                         node.label === 'Programs' ||
                         node.label === 'Treaties';

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
            } else {
              selectProgram(node, parentPath);
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
            {isLeaf && (
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
            fontWeight: isLeaf ? 400 : 500
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
          You're viewing: {currentProgram.account}, {currentProgram.name}
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

// Program relationship pills component
interface ProgramRelationshipProps {
  primaryProgram: string;
  additionalPrograms: string[];
}

const ProgramRelationship: React.FC<ProgramRelationshipProps> = ({
  primaryProgram,
  additionalPrograms
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
  };

  return (
    <div style={containerStyles}>
      <span style={labelStyles}>Part of</span>
      <div style={pillStyles}>{primaryProgram}</div>
      
      {additionalPrograms.length > 0 && (
        <>
          <span style={labelStyles}>Also included in</span>
          {additionalPrograms.map((program, index) => (
            <div key={index} style={pillStyles}>{program}</div>
          ))}
        </>
      )}
    </div>
  );
};

// Main page component
interface ReportNavigationProps {
  onNavigateToPage?: (page: 'cash-settlement' | 'report-navigation' | 'transaction-management' | 'contracts-explorer' | 'analytics-valuation') => void;
}

export const ReportNavigation: React.FC<ReportNavigationProps> = ({ onNavigateToPage }) => {
  const colors = useSemanticColors();

  // State for the current program
  const [currentProgram, setCurrentProgram] = React.useState({
    name: "Property Cat Treaty",
    account: "Swiss Re - Global MGA Solutions"
  });

  // Mock data for related programs
  const relatedPrograms = {
    primaryProgram: "Appalachian.wc-companionTY21",
    additionalPrograms: [
      "Appalachian.wc-companionTY20",
      "Appalachian.wc-companionTY19", 
      "Appalachian.wc-companionTY18"
    ]
  };

  return (
    <Layout
      breadcrumbs={[
        { label: 'INSIGHTS EXPLORER', isActive: true }
      ]}
      selectedSidebarItem="reports"
      selectedSidebarSubitem="insights-explorer"
      onNavigate={(itemId, subitemId) => {
        console.log('Navigate to:', itemId, subitemId);

        // Handle Reports navigation
        if (itemId === 'reports') {
          if (subitemId === 'transactions') {
            onNavigateToPage && onNavigateToPage('transaction-management');
          } else if (subitemId === 'insights-explorer') {
            // Already on report navigation page
            console.log('Already on report navigation page');
          }
        }
        // Handle Analytics navigation
        else if (itemId === 'analytics') {
          if (subitemId === 'valuation') {
            onNavigateToPage && onNavigateToPage('analytics-valuation');
          }
        }
        // Handle Contracts navigation
        else if (itemId === 'contracts') {
          onNavigateToPage && onNavigateToPage('contracts-explorer');
        }
        else {
          console.log('Unhandled navigation:', itemId, subitemId);
        }
      }}
      onInboxClick={() => {
        console.log('Inbox clicked');
      }}
    >

          {/* Program Selector Card */}
          <ProgramSelectorCard
            currentProgram={currentProgram}
            onProgramChange={(program) => {
              console.log('Program selected:', program);
              setCurrentProgram(program);
            }}
          />

          {/* Program Relationship Pills */}
          <ProgramRelationship
            primaryProgram={relatedPrograms.primaryProgram}
            additionalPrograms={relatedPrograms.additionalPrograms}
          />

          {/* Metric Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            marginTop: '40px'
          }}>
            {/* Cession and Collateral Card */}
            <div style={{
              backgroundColor: colors.blackAndWhite.white,
              border: `1px solid ${colors.theme.primary400}`,
              borderRadius: borderRadius[12],
              overflow: 'hidden',
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
                  Cession and Collateral
                </h3>
                <button 
                  onClick={() => onNavigateToPage?.('cash-settlement')}
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
                  }}>
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

              {/* Card Content */}
              <div style={{ padding: '20px 30px 26px 30px' }}>

              {/* Metric 1: Quota Share Written Premium */}
              <div style={{ marginBottom: '20px' }}>
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
                <GrowthIndicator direction="up" percentage="7.8%" period="3m" />
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
                    $32,156,789
                  </div>
                  <SmallChart trend="up" />
                </div>
              </div>

              {/* Content-padded separator */}
              <div style={{
                width: '100%',
                height: '1px',
                backgroundColor: colors.theme.primary400,
                margin: '0 0 10px 0'
              }} />

              {/* Metric 2: Total Remittance */}
              <div style={{ marginBottom: '20px' }}>
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
                <GrowthIndicator direction="up" percentage="7.8%" period="3m" />
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
                    $19,794,232
                  </div>
                  <SmallChart trend="up" />
                </div>
              </div>

              {/* Content-padded separator */}
              <div style={{
                width: '100%',
                height: '1px',
                backgroundColor: colors.theme.primary400,
                margin: '0 0 10px 0'
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
                <GrowthIndicator direction="down" percentage="2.4%" period="3m" />
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
                    $7,468,987
                  </div>
                  <SmallChart trend="down" />
                </div>
              </div>
              </div>
            </div>

            {/* Data Validation Card */}
            <div style={{
              backgroundColor: colors.blackAndWhite.white,
              border: `1px solid ${colors.theme.primary400}`,
              borderRadius: borderRadius[12],
              overflow: 'hidden',
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
                  Data Validation
                </h3>
                <button style={{
                  backgroundColor: colors.theme.primary200,
                  border: 'none',
                  borderRadius: borderRadius.absolute,
                  padding: '6px 12px',
                  ...typography.styles.bodyS,
                  fontWeight: 600,
                  color: colors.blackAndWhite.black900,
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}>
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

              {/* Card Content */}
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
                      12
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: colors.blackAndWhite.black500
                    }}>
                      +0.38%
                    </div>
                  </div>
                  <DataValidationChart level="excellent" />
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
                      $34,156
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: colors.blackAndWhite.black500
                    }}>
                      +0.38%
                    </div>
                  </div>
                  <DataValidationChart level="excellent" />
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
                      13
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: colors.blackAndWhite.black500
                    }}>
                      +0.38%
                    </div>
                  </div>
                  <DataValidationChart level="marginal" />
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
                      $56,789
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: colors.blackAndWhite.black500
                    }}>
                      +0.38%
                    </div>
                  </div>
                  <DataValidationChart level="excellent" />
                </div>
              </div>
              </div>
            </div>

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
              <button style={{
                backgroundColor: colors.theme.primary200,
                border: 'none',
                borderRadius: borderRadius.absolute,
                padding: '6px 12px',
                ...typography.styles.bodyS,
                fontWeight: 600,
                color: colors.blackAndWhite.black900,
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}>
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
            <div style={{ 
              position: 'relative'
            }}>
              {/* Chart Container with proper margins */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '300px',
                padding: '50px 50px 50px 50px', // top, right, bottom, left margins
                boxSizing: 'border-box'
              }}>
                {/* X-axis Labels - Top margin (20px) */}
                <div style={{
                  position: 'absolute',
                  top: '0px',
                  left: '90px', // 50px left margin + 40px for Y-axis labels
                  right: '50px', // 50px right margin
                  ...typography.styles.dataXS,
                  color: colors.blackAndWhite.black500,
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <div style={{ position: 'absolute', left: '0%', whiteSpace: 'nowrap' }}>01-2025</div>
                  <div style={{ position: 'absolute', left: '25%', whiteSpace: 'nowrap' }}>02-2025</div>
                  <div style={{ position: 'absolute', left: '50%', whiteSpace: 'nowrap' }}>03-2025</div>
                  <div style={{ position: 'absolute', left: '75%', whiteSpace: 'nowrap' }}>04-2025</div>
                </div>

                {/* Y-axis Labels - In left margin */}
                <div style={{
                  position: 'absolute',
                  left: '0px',
                  top: '50px', // Align with chart body
                  width: '40px',
                  ...typography.styles.dataXS,
                  color: colors.blackAndWhite.black500,
                  textAlign: 'right',
                  height: '200px' // Match chart body height
                }}>
                  <div style={{ position: 'absolute', top: '0px', right: '5px' }}>80%</div>
                  <div style={{ position: 'absolute', top: '50px', right: '5px' }}>60%</div>
                  <div style={{ position: 'absolute', top: '100px', right: '5px' }}>40%</div>
                  <div style={{ position: 'absolute', top: '150px', right: '5px' }}>20%</div>
                  <div style={{ position: 'absolute', bottom: '0px', right: '5px' }}>0%</div>
                </div>

                {/* Chart Body - Center area */}
                <div style={{
                  position: 'absolute',
                  left: '50px', // Left margin
                  top: '50px', // Top margin  
                  right: '50px', // Right margin
                  bottom: '50px', // Bottom margin
                  border: `1px solid ${colors.blackAndWhite.black100}`,
                  borderRadius: '4px'
                }}>
                  {/* Background Grid Lines */}
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    right: '0',
                    bottom: '0',
                    backgroundImage: `
                      linear-gradient(to right, ${colors.blackAndWhite.black100} 1px, transparent 1px),
                      linear-gradient(to bottom, ${colors.blackAndWhite.black100} 1px, transparent 1px)
                    `,
                    backgroundSize: '25% 25%',
                    opacity: 0.3
                  }} />

                  {/* Bottom line (0% line) - Black 900 */}
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    bottom: '0',
                    right: '0',
                    height: '2px',
                    backgroundColor: colors.blackAndWhite.black900
                  }} />

                  {/* Chart Lines */}
                  <svg 
                    style={{
                      position: 'absolute',
                      left: '0',
                      top: '0',
                      width: '100%',
                      height: '100%'
                    }}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    {/* Blue line (main trend) */}
                    <path 
                      d="M0,30 Q15,25 25,35 Q40,50 50,15 Q60,10 75,12 Q85,18 100,20"
                      stroke={colors.theme.primary700}
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    {/* Purple line */}
                    <path 
                      d="M0,70 Q15,65 25,63 Q40,60 50,55 Q60,53 75,50"
                      stroke={colors.marketplace.violet700}
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    {/* Green line */}
                    <path 
                      d="M0,85 Q15,83 25,81 Q40,79 50,77 Q60,75 75,73"
                      stroke={colors.success.textAndStrokes}
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  {/* Alert Indicator */}
                  <div style={{
                    position: 'absolute',
                    left: '35%',
                    top: '40%',
                    width: '18px',
                    height: '18px',
                    backgroundColor: colors.error.fill,
                    borderRadius: '50%',
                    border: `2px solid ${colors.blackAndWhite.white}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...typography.styles.dataXS,
                    color: colors.blackAndWhite.black900,
                    transform: 'translate(-50%, -50%)'
                  }}>
                    1
                  </div>
                </div>

                {/* Loss Ratio Text - Right margin */}
                <div style={{
                  position: 'absolute',
                  right: '10px', // Inside the 50px right margin
                  top: '50%',
                  transform: 'translateY(-50%) rotate(90deg)',
                  transformOrigin: 'center',
                  ...typography.styles.dataXS,
                  color: colors.blackAndWhite.black500,
                  whiteSpace: 'nowrap'
                }}>
                  Loss Ratio
                </div>

                {/* Evaluation Date - Bottom margin */}
                <div style={{
                  position: 'absolute',
                  bottom: '15px', // Inside the 50px bottom margin
                  left: '50%',
                  transform: 'translateX(-50%)',
                  ...typography.styles.dataXS,
                  color: colors.blackAndWhite.black500
                }}>
                  Evaluation Date
                </div>
              </div>
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
            <div style={{
              backgroundColor: colors.blackAndWhite.white,
              border: `1px solid ${colors.theme.primary400}`,
              borderRadius: borderRadius[12],
              overflow: 'hidden',
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
                  Data Ingestion
                </h3>
                <button style={{
                  backgroundColor: colors.theme.primary200,
                  border: 'none',
                  borderRadius: borderRadius.absolute,
                  padding: '6px 12px',
                  ...typography.styles.bodyS,
                  fontWeight: 600,
                  color: colors.blackAndWhite.black900,
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}>
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

              {/* Card Content */}
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
                    2025-03-31
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
                      11 days
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
                  <div style={{
                    border: `1px solid ${colors.theme.primary400}`,
                    borderRadius: borderRadius[4],
                    padding: '12px 16px',
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                    backgroundColor: colors.blackAndWhite.white
                  }}>
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
            </div>

            {/* Contracts Card */}
            <div style={{
              backgroundColor: colors.blackAndWhite.white,
              border: `1px solid ${colors.theme.primary400}`,
              borderRadius: borderRadius[12],
              overflow: 'hidden',
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
                  Contracts
                </h3>
                <button 
                  onClick={() => onNavigateToPage?.('contracts-explorer')}
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
                  }}>
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

              {/* Card Content */}
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
                    58 Contracts available
                  </div>
                  <div style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black500,
                  }}>
                    5 Contracts executed in past 30 days
                  </div>
                </div>
              </div>
            </div>
          </div>
    </Layout>
  );
};