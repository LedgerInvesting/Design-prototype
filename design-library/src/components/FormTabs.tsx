import React from 'react';
import { colors, typography, spacing } from '../tokens';

export interface FormTab {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface FormTabsProps {
  /** Array of tabs */
  tabs: FormTab[];
  /** Currently active tab ID */
  activeTab: string;
  /** Tab click handler */
  onTabClick?: (tabId: string) => void;
  /** Additional CSS class */
  className?: string;
}

export const FormTabs: React.FC<FormTabsProps> = ({
  tabs,
  activeTab,
  onTabClick,
  className,
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    height: '30px',
    gap: '2px',
    width: '100%',
  };

  const getTabStyles = (tab: FormTab, isActive: boolean): React.CSSProperties => ({
    flex: 1,
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 16px',
    backgroundColor: isActive 
      ? colors.reports.blue700 
      : colors.reports.dynamic.blue200,
    color: isActive 
      ? colors.blackAndWhite.black900 
      : colors.blackAndWhite.black500,
    fontFamily: typography.styles.bodyS.fontFamily.join(', '),
    fontSize: typography.styles.bodyS.fontSize,
    fontWeight: typography.styles.bodyS.fontWeight,
    lineHeight: typography.styles.bodyS.lineHeight,
    cursor: tab.disabled ? 'default' : 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.2s ease, color 0.2s ease',
    opacity: tab.disabled ? 0.6 : 1,
    whiteSpace: 'nowrap',
    textAlign: 'center',
  });

  const handleTabClick = (tab: FormTab) => {
    if (!tab.disabled && onTabClick) {
      onTabClick(tab.id);
    }
  };

  return (
    <div style={containerStyles} className={className}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        
        return (
          <button
            key={tab.id}
            style={getTabStyles(tab, isActive)}
            onClick={() => handleTabClick(tab)}
            disabled={tab.disabled}
            type="button"
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default FormTabs;