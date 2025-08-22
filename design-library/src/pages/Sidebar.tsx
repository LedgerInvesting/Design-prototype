import React, { useState } from 'react';
import { Stack } from '../components/Stack';
import { Button } from '../components/Button';
import { colors, typography, spacing, borderRadius } from '../tokens';
import { 
  ChevronDownExtraSmall, 
  ChevronRightExtraSmall,
  InboxMedium,
  KorraLogo,
  MarketplaceLogo,
  ReportsLogo,
  AnalyticsLogo,
  ContractsLogo
} from '../icons';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ color?: string; className?: string }>;
  subitems?: { id: string; label: string }[];
}

interface SidebarProps {
  onNavigate?: (itemId: string, subitemId?: string) => void;
  onInboxClick?: () => void;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'marketplace',
    label: 'Marketplace',
    icon: MarketplaceLogo,
    subitems: [
      { id: 'offerings', label: 'Offerings' },
      { id: 'my-transactions', label: 'My Transactions' }
    ]
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: ReportsLogo,
    subitems: [
      { id: 'transactions', label: 'Transactions' },
      { id: 'insights-explorer', label: 'Insights Explorer' },
      { id: 'bdx-upload', label: 'BDX Upload' },
      { id: 'reports-explorer', label: 'Reports Explorer' }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: AnalyticsLogo,
    subitems: [
      { id: 'option-1', label: 'Option 1' },
      { id: 'option-2', label: 'Option 2' }
    ]
  },
  {
    id: 'contracts',
    label: 'Contracts',
    icon: ContractsLogo,
    subitems: [
      { id: 'option-1', label: 'Option 1' },
      { id: 'option-2', label: 'Option 2' }
    ]
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate, onInboxClick }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [selectedSubitem, setSelectedSubitem] = useState<string>('');

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleMainItemClick = (item: SidebarItem) => {
    if (item.subitems && item.subitems.length > 0) {
      toggleExpanded(item.id);
    } else {
      setSelectedItem(item.id);
      setSelectedSubitem('');
      onNavigate?.(item.id);
    }
  };

  const handleSubitemClick = (parentId: string, subitemId: string) => {
    setSelectedItem(parentId);
    setSelectedSubitem(subitemId);
    onNavigate?.(parentId, subitemId);
  };

  const sidebarStyles: React.CSSProperties = {
    width: '220px',
    minHeight: '100vh',
    backgroundColor: colors.blackAndWhite.black900,
    padding: `${spacing[6]} ${spacing[4]}`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1]
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[8],
    padding: `0 ${spacing[2]}`
  };


  const mainItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: `${spacing[3]} ${spacing[4]}`,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: borderRadius[4],
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    textAlign: 'left'
  };

  const mainItemHoverStyles: React.CSSProperties = {
    backgroundColor: 'rgba(58, 66, 61, 0.5)' // black800 with 50% alpha
  };

  const mainItemContentStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3]
  };

  const mainItemTextStyles: React.CSSProperties = {
    ...typography.styles.bodyM,
    color: colors.blackAndWhite.white,
    fontFamily: 'Bradford LL, serif',
    fontWeight: 700, // Bold
    fontSize: '14px'
  };

  const subitemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: `${spacing[2]} ${spacing[4]} ${spacing[2]} ${spacing[12]}`,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: borderRadius[4],
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    textAlign: 'left'
  };

  const subitemTextStyles: React.CSSProperties = {
    ...typography.styles.bodyM,
    color: colors.blackAndWhite.black300,
    fontWeight: 400
  };

  const selectedSubitemStyles: React.CSSProperties = {
    backgroundColor: colors.blackAndWhite.black800 // #3a423d - solid color for selected state
  };

  const selectedSubitemTextStyles: React.CSSProperties = {
    color: colors.blackAndWhite.white
  };

  return (
    <div style={sidebarStyles}>
      {/* Header with logo and inbox button */}
      <div style={headerStyles}>
        <KorraLogo color={colors.blackAndWhite.white} />
        <div style={{ position: 'relative' }}>
          <button
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: colors.blackAndWhite.black800,
              borderRadius: borderRadius[4],
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s ease'
            }}
            onClick={onInboxClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.blackAndWhite.black700;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.blackAndWhite.black800;
            }}
          >
            <div style={{ width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <InboxMedium color={colors.blackAndWhite.white} />
            </div>
          </button>
          {/* Notification badge */}
          <div
            style={{
              position: 'absolute',
              top: -7,
              right: -10,
              minWidth: '18px',
              height: '16px',
              backgroundColor: colors.success.fill,
              borderRadius: borderRadius.absolute,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 'bold',
              color: colors.blackAndWhite.black900,
              padding: '0 8px'
            }}
          >
            3
          </div>
        </div>
      </div>

      {/* Navigation items */}
      <Stack direction="vertical" gap={1}>
        {sidebarItems.map((item) => {
          const isExpanded = expandedItems.has(item.id);
          const hasSubitems = item.subitems && item.subitems.length > 0;

          return (
            <div key={item.id}>
              {/* Main navigation item */}
              <button
                style={{
                  ...mainItemStyles,
                  ...(selectedItem === item.id && !selectedSubitem ? { backgroundColor: colors.blackAndWhite.black800 } : {})
                }}
                onClick={() => handleMainItemClick(item)}
                onMouseEnter={(e) => {
                  if (selectedItem !== item.id || selectedSubitem) {
                    Object.assign(e.currentTarget.style, mainItemHoverStyles);
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedItem !== item.id || selectedSubitem) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={mainItemContentStyles}>
                  <item.icon />
                  <span style={mainItemTextStyles}>{item.label}</span>
                </div>
                {hasSubitems && (
                  isExpanded ? (
                    <ChevronDownExtraSmall color={colors.blackAndWhite.black700} />
                  ) : (
                    <ChevronRightExtraSmall color={colors.blackAndWhite.black700} />
                  )
                )}
              </button>

              {/* Subitems */}
              {hasSubitems && isExpanded && (
                <Stack direction="vertical" gap={0}>
                  {item.subitems!.map((subitem) => {
                    const isSelected = selectedItem === item.id && selectedSubitem === subitem.id;
                    
                    return (
                      <button
                        key={subitem.id}
                        style={{
                          ...subitemStyles,
                          ...(isSelected ? selectedSubitemStyles : {})
                        }}
                        onClick={() => handleSubitemClick(item.id, subitem.id)}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'rgba(58, 66, 61, 0.5)'; // black800 with 50% alpha
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <span
                          style={{
                            ...subitemTextStyles,
                            ...(isSelected ? selectedSubitemTextStyles : {})
                          }}
                        >
                          {subitem.label}
                        </span>
                      </button>
                    );
                  })}
                </Stack>
              )}
            </div>
          );
        })}
      </Stack>
    </div>
  );
};