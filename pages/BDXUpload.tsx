import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '@design-library/pages';
import {
  Table,
  CustomCell,
  CustomCellElement,
  TableColumn,
  TableRow,
  DocumentCell,
  Modal,
  Button,
  colors,
  typography,
  borderRadius,
  shadows,
  useSemanticColors
} from '@design-library/components';
import {
  StatusProgressTable,
  StatusAlertTable,
  StatusErrorTable,
  StatusError,
  StatusCheckTable,
  StatusProhibitedTable,
  DocumentMedium
} from '@design-library/icons';

interface BDXUploadProps {
  onNavigate?: (page: string, subpage?: string) => void;
  onInboxClick?: () => void;
}

export const BDXUpload: React.FC<BDXUploadProps> = ({
  onNavigate,
  onInboxClick,
}) => {
  const semanticColors = useSemanticColors();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'error' | 'progress' | null;
    position: { x: number; y: number };
  }>({
    isOpen: false,
    type: null,
    position: { x: 0, y: 0 }
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Disabled click outside handler for now to avoid conflicts with hover
  // Will re-enable once hover is working properly

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Status legend data
  const statusLegend = [
    {
      icon: <StatusProgressTable color="#C1F2FF" />,
      label: 'In Progress',
      backgroundColor: '#3DA3CB', // Blue background
    },
    {
      icon: <StatusAlertTable color="#FFDD61" />,
      label: 'Needs your Attention',
      backgroundColor: '#AB8703', // Yellow background
    },
    {
      icon: <StatusErrorTable color="#FF8588" />,
      label: 'Error',
      backgroundColor: '#993234', // Red background
    },
    {
      icon: <StatusCheckTable color="#C6FFC1" />,
      label: 'Successful',
      backgroundColor: '#13B64F', // Green background
    },
  ];

  // Upload status data (based on the design)
  const uploadData = {
    policy: {
      jan: 'progress', // Blue circle with dots
      feb: 'attention', // Yellow warning
      mar: 'add',
      apr: 'attention', // Yellow warning
      may: 'add',
      jun: 'add',
      jul: 'add',
      aug: 'add',
      sep: 'add',
      oct: 'add',
      nov: 'add',
      dec: 'add',
    },
    claims: {
      jan: 'success', // Green checkmark
      feb: 'success', // Green checkmark
      mar: 'success', // Green checkmark
      apr: 'prohibited', // Prohibited icon
      may: 'error', // Red X
      jun: 'add',
      jul: 'add',
      aug: 'add',
      sep: 'add',
      oct: 'add',
      nov: 'add',
      dec: 'add',
    },
  };

  // Modal hover handlers
  const handleIconEnter = (event: React.MouseEvent, type: 'error' | 'progress') => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (modalState.isOpen && modalState.type === type) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    setModalState({
      isOpen: true,
      type,
      position: {
        x: rect.left + scrollX + rect.width / 2,
        y: rect.top + scrollY - 15
      }
    });
  };

  const handleIconLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

    hoverTimeoutRef.current = setTimeout(() => {
      setModalState({
        isOpen: false,
        type: null,
        position: { x: 0, y: 0 }
      });
      hoverTimeoutRef.current = null;
    }, 500);
  };

  const handleModalEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleModalLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

    hoverTimeoutRef.current = setTimeout(() => {
      setModalState({
        isOpen: false,
        type: null,
        position: { x: 0, y: 0 }
      });
      hoverTimeoutRef.current = null;
    }, 300);
  };

  // Function to create status icon cell
  const createStatusCell = (status: string): CustomCellElement[] => {
    switch (status) {
      case 'progress':
        return [{
          type: 'icon',
          icon: (
            <div
              onMouseEnter={(e) => handleIconEnter(e, 'progress')}
              onMouseLeave={handleIconLeave}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <StatusProgressTable color="#3DA3CB" />
            </div>
          )
        }];
      case 'attention':
        return [{ type: 'icon', icon: <StatusAlertTable color="#AB8703" /> }];
      case 'error':
        return [{
          type: 'icon',
          icon: (
            <div
              onMouseEnter={(e) => handleIconEnter(e, 'error')}
              onMouseLeave={handleIconLeave}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <StatusErrorTable color="#FF8588" />
            </div>
          )
        }];
      case 'success':
        return [{ type: 'icon', icon: <StatusCheckTable color="#13B64F" /> }];
      case 'prohibited':
        return [{ type: 'icon', icon: <StatusProhibitedTable /> }];
      case 'empty':
        // Gray circle for empty state
        return [{
          type: 'icon',
          icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="7.5" stroke="#9CA3AF" strokeWidth="2" fill="#F3F4F6"/>
            </svg>
          )
        }];
      case 'add':
      default:
        return [{
          type: 'button',
          text: 'Add',
          variant: 'small',
          color: 'white',
          onClick: () => console.log('Add clicked for month'),
          style: { boxShadow: shadows.small },
        }];
    }
  };

  // Custom table component for BDX Upload layout
  const renderBDXTable = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const cellStyles = {
      padding: '12px',
      textAlign: 'center' as const,
      borderRight: `1px solid ${semanticColors.theme.primary400}`,
      borderBottom: `1px solid ${semanticColors.theme.primary400}`,
      height: '50px',
      verticalAlign: 'middle' as const,
    };

    const headerStyles = {
      ...cellStyles,
      backgroundColor: semanticColors.blackAndWhite.white,
      fontFamily: typography.styles.captionM.fontFamily.join(', '),
      fontSize: typography.styles.captionM.fontSize,
      fontWeight: typography.styles.captionM.fontWeight,
      fontStyle: typography.styles.captionM.fontStyle,
      color: semanticColors.blackAndWhite.black900,
      borderTop: `1px solid ${semanticColors.theme.primary400}`,
    };

    const yearCellStyles = {
      ...cellStyles,
      backgroundColor: semanticColors.blackAndWhite.white,
      writingMode: 'vertical-rl' as const,
      textOrientation: 'mixed' as const,
      width: '80px',
      fontSize: typography.styles.captionM.fontSize,
      fontFamily: typography.styles.captionM.fontFamily.join(', '),
      fontWeight: typography.styles.captionM.fontWeight,
      fontStyle: typography.styles.captionM.fontStyle,
      color: semanticColors.blackAndWhite.black900,
      borderLeft: `1px solid ${semanticColors.theme.primary400}`,
    };

    const typeCellStyles = {
      ...cellStyles,
      backgroundColor: semanticColors.theme.primary200,
      textAlign: 'left' as const,
      paddingLeft: '16px',
      width: '150px',
      fontSize: typography.styles.bodyM.fontSize,
      fontFamily: typography.styles.bodyM.fontFamily.join(', '),
      fontWeight: typography.fontWeight.medium,
      color: semanticColors.blackAndWhite.black700,
    };

    const documentCellStyles = {
      ...cellStyles,
      backgroundColor: semanticColors.blackAndWhite.white,
      textAlign: 'left' as const,
      paddingLeft: '16px',
      width: '150px',
      fontSize: typography.styles.bodyM.fontSize,
      fontFamily: typography.styles.bodyM.fontFamily.join(', '),
      fontWeight: typography.fontWeight.medium,
      color: semanticColors.blackAndWhite.black700,
    };

    return (
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: semanticColors.blackAndWhite.white,
      }}>
        {/* Header row */}
        <thead>
          <tr>
            <th style={{ ...headerStyles, width: '80px', borderLeft: `1px solid ${semanticColors.theme.primary400}` }}></th>
            <th style={{ ...headerStyles, width: '150px' }}></th>
            {months.map((month) => (
              <th key={month} style={{ ...headerStyles, width: '90px' }}>
                {month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Policy row */}
          <tr>
            <td rowSpan={2} style={yearCellStyles}>
              2025
            </td>
            <td style={documentCellStyles}>
              <DocumentCell
                filename="Policy"
                onDownload={(filename) => console.log('Download:', filename)}
                align="left"
              />
            </td>
            {months.map((month) => (
              <td key={`policy-${month}`} style={cellStyles}>
                <CustomCell
                  elements={createStatusCell(uploadData.policy[month.toLowerCase() as keyof typeof uploadData.policy])}
                  alignment="center"
                />
              </td>
            ))}
          </tr>
          {/* Claims row */}
          <tr>
            <td style={documentCellStyles}>
              <DocumentCell
                filename="Claims"
                onDownload={(filename) => console.log('Download:', filename)}
                align="left"
              />
            </td>
            {months.map((month) => (
              <td key={`claims-${month}`} style={{
                ...cellStyles,
                borderBottom: month === 'Dec' ? 'none' : cellStyles.borderBottom
              }}>
                <CustomCell
                  elements={createStatusCell(uploadData.claims[month.toLowerCase() as keyof typeof uploadData.claims])}
                  alignment="center"
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  };

  const breadcrumbs = [
    { label: 'TRANSACTION MANAGEMENT', href: '#', isActive: false },
    { label: 'BDX UPLOAD', href: '#', isActive: true }
  ];

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      selectedSidebarItem="reports"
      selectedSidebarSubitem="bdx-upload"
      onNavigate={(itemId, subitemId) => {
        console.log('Navigate to:', itemId, subitemId);

        if (itemId === 'reports') {
          if (subitemId === 'reports-explorer') {
            onNavigate && onNavigate('report-navigation');
          } else if (subitemId === 'transactions') {
            onNavigate && onNavigate('transaction-management');
          }
        } else if (itemId === 'analytics' && subitemId === 'valuation') {
          onNavigate && onNavigate('analytics-valuation');
        } else if (itemId === 'contracts') {
          onNavigate && onNavigate('contracts-explorer');
        }
      }}
      onInboxClick={onInboxClick}
    >
      {/* Header Section */}
        <div style={{
          marginBottom: '32px',
          width: '80%',
        }}>
          <h2 style={{
            ...typography.styles.headlineH2,
            color: semanticColors.blackAndWhite.black500,
            margin: '0 0 12px 0',
          }}>
            You're now viewing the <span style={{
              color: semanticColors.blackAndWhite.black900
            }}>bordereau status</span> <em>of</em> <span style={{
              color: semanticColors.blackAndWhite.black900
            }}>Brazos Commercial Auto Mileage</span> Plus Bordereau. You can upload bordereau and track progress across different stages.
          </h2>
        </div>

        {/* Status Legend */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          marginBottom: '32px',
          padding: '20px 0',
        }}>
          <span style={{
            ...typography.styles.navM,
            color: semanticColors.blackAndWhite.black700,
          }}>
            STATUS
          </span>
          {statusLegend.map((status, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div style={{
                width: '29px',
                height: '29px',
                backgroundColor: status.backgroundColor,
                borderRadius: borderRadius[4],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {status.icon}
              </div>
              <span style={{
                ...typography.styles.bodyL,
                color: semanticColors.blackAndWhite.black900,
                fontWeight: typography.fontWeight.medium,
              }}>
                {status.label}
              </span>
            </div>
          ))}
        </div>

        {/* Upload Table */}
        <div style={{
          backgroundColor: semanticColors.blackAndWhite.white,
          borderRadius: borderRadius[8],
          border: `1px solid ${semanticColors.theme.primary400}`,
          overflow: 'hidden',
        }}>
          {renderBDXTable()}
        </div>

        {/* Progress Modal */}
        {modalState.isOpen && modalState.type === 'progress' && (
          <div
            ref={modalRef}
            onMouseEnter={handleModalEnter}
            onMouseLeave={handleModalLeave}
            style={{
              position: 'fixed',
              left: `${modalState.position.x - 140}px`, // Center the 280px modal
              top: `${modalState.position.y}px`,
              zIndex: 1000,
              backgroundColor: semanticColors.blackAndWhite.white,
              borderRadius: borderRadius[8],
              boxShadow: shadows.medium,
              width: '280px',
            }}
          >
            <div style={{ padding: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '16px',
                backgroundColor: '#e1f3ff', // reports blue500
                padding: '12px',
                borderRadius: borderRadius[8]
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <StatusProgressTable color="#3DA3CB" />
                </div>
                <div>
                  <div style={{
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black900,
                    fontWeight: typography.fontWeight.medium,
                    lineHeight: 1.4
                  }}>
                    You've completed 95% of your bordereau configuration
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Button
                  variant="small"
                  color="white"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  REPLACE BORDEREAU
                </Button>
                <Button
                  variant="small"
                  color="white"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  DECLARE EMPTY
                </Button>
                <Button
                  variant="small"
                  color="white"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  REMOVE REQUIREMENTS
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Error Modal */}
        {modalState.isOpen && modalState.type === 'error' && (
          <div
            ref={modalRef}
            onMouseEnter={handleModalEnter}
            onMouseLeave={handleModalLeave}
            style={{
              position: 'fixed',
              left: `${modalState.position.x - 140}px`, // Center the 280px modal
              top: `${modalState.position.y}px`,
              zIndex: 1000,
              backgroundColor: semanticColors.blackAndWhite.white,
              borderRadius: borderRadius[8],
              boxShadow: shadows.medium,
              width: '280px',
            }}
          >
            <div style={{ padding: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '16px',
                backgroundColor: '#fee7e7', // error fillLight
                padding: '12px',
                borderRadius: borderRadius[8]
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <StatusErrorTable color="#FF8588" />
                </div>
                <div>
                  <div style={{
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black900,
                    fontWeight: typography.fontWeight.medium,
                    lineHeight: 1.4
                  }}>
                    policy_group_tag, source_record_date, epistemic_rank, policy_layout, and claim_layout must all be provided for single-program ingest.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Button
                  variant="small"
                  color="white"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  REPLACE BORDEREAU
                </Button>
                <Button
                  variant="small"
                  color="white"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  DECLARE EMPTY
                </Button>
                <Button
                  variant="small"
                  color="white"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  REMOVE REQUIREMENTS
                </Button>
              </div>
            </div>
          </div>
        )}
    </Layout>
  );
};