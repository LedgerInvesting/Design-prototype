import React, { useState, useEffect, useRef } from 'react';
import { typography, colors, spacing } from '../tokens';

export interface Tab {
  id: string;
  label: string;
  content?: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'medium' | 'small';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab: controlledActiveTab,
  onTabChange,
  variant = 'medium',
  className = '',
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || '');
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  
  // Update underline position when active tab changes
  useEffect(() => {
    const updateUnderlinePosition = () => {
      const activeTabElement = tabRefs.current[activeTab];
      const containerElement = containerRef.current;
      
      if (activeTabElement && containerElement) {
        const containerRect = containerElement.getBoundingClientRect();
        const tabRect = activeTabElement.getBoundingClientRect();
        
        const left = tabRect.left - containerRect.left + parseInt(spacing[1]); // Add left padding
        const width = tabRect.width - (2 * parseInt(spacing[1])); // Subtract left and right padding
        
        setUnderlineStyle({ left, width });
      }
    };

    // Small delay to ensure DOM has updated
    const timeoutId = setTimeout(updateUnderlinePosition, 0);
    
    return () => clearTimeout(timeoutId);
  }, [activeTab, tabs]);

  const handleTabClick = (tabId: string) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tabId);
    }
    onTabChange?.(tabId);
  };

  const tabStyles = {
    fontFamily: typography.styles.navM.fontFamily.join(', '),
    fontSize: variant === 'medium' ? typography.styles.navM.fontSize : typography.styles.navS.fontSize,
    fontWeight: typography.styles.navM.fontWeight,
    lineHeight: typography.styles.navM.lineHeight,
    letterSpacing: variant === 'medium' ? typography.letterSpacing.widest : typography.letterSpacing.wider,
    textTransform: 'uppercase' as const,
    padding: `${spacing[2]} ${spacing[1]}`,
    margin: `0 ${spacing[6]} 0 0`,
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    position: 'relative' as const,
    transition: 'color 0.2s ease',
  };

  const activeTabStyles = {
    ...tabStyles,
    color: colors.blackAndWhite.black900,
  };

  const inactiveTabStyles = {
    ...tabStyles,
    color: colors.blackAndWhite.black500,
  };

  // Animated underline that moves between tabs
  const animatedUnderlineStyles = {
    position: 'absolute' as const,
    bottom: '0',
    height: '1.4px',
    backgroundColor: colors.blackAndWhite.black900,
    left: `${underlineStyle.left}px`,
    width: `${underlineStyle.width}px`,
    transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1,
  };

  const containerStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0px',
    position: 'relative' as const,
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      <div ref={containerRef} style={containerStyles} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[tab.id] = el)}
            style={activeTab === tab.id ? activeTabStyles : inactiveTabStyles}
            onClick={() => handleTabClick(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            type="button"
          >
            {tab.label}
          </button>
        ))}
        {/* Animated underline that moves between tabs */}
        <div style={animatedUnderlineStyles} />
      </div>
      {activeTabContent && (
        <div
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          style={{ marginTop: spacing[4] }}
        >
          {activeTabContent}
        </div>
      )}
    </div>
  );
};

export default Tabs;