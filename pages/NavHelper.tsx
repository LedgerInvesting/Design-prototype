import React from 'react';

interface NavHelperProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const NavHelper: React.FC<NavHelperProps> = ({ currentPage, onNavigate }) => {
  const pages = [
    { key: 'analytics-valuation', label: '📊 Analytics - Valuation (GREEN)', theme: 'analytics' },
    { key: 'transaction-management', label: '💰 Reports - Transaction Management (BLUE)', theme: 'reports' },
    { key: 'cash-settlement', label: '💵 Reports - Cash Settlement (BLUE)', theme: 'reports' },
    { key: 'contracts-explorer', label: '📄 Reports - Contracts Explorer (BLUE)', theme: 'reports' },
    { key: 'report-navigation', label: '📈 Reports - Navigation (BLUE)', theme: 'reports' },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      minWidth: '300px',
      fontSize: '12px',
    }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '14px' }}>Page Navigation</h3>
      {pages.map((page) => (
        <button
          key={page.key}
          onClick={() => onNavigate(page.key)}
          style={{
            display: 'block',
            width: '100%',
            padding: '8px 12px',
            margin: '4px 0',
            backgroundColor: currentPage === page.key ? '#e3f2fd' : 'transparent',
            border: currentPage === page.key ? '2px solid #2196f3' : '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer',
            textAlign: 'left',
            fontSize: '11px',
            lineHeight: 1.3,
          }}
        >
          {page.label}
        </button>
      ))}
      <div style={{ 
        marginTop: '12px', 
        fontSize: '10px', 
        color: '#666',
        borderTop: '1px solid #eee',
        paddingTop: '8px'
      }}>
        🎨 Theme Test: Analytics pages use GREEN, Reports pages use BLUE
      </div>
    </div>
  );
};