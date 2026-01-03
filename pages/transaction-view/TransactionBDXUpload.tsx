import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  CustomCell,
  CustomCellElement,
  Button,
  colors,
  typography,
  borderRadius,
  shadows,
  useSemanticColors
} from '@design-library/components';
import { PageHeader } from '@design-library/pages';
import {
  StatusProgressTable,
  StatusAlertTable,
  StatusErrorTable,
  StatusCheckTable,
  StatusProhibitedTable,
} from '@design-library/icons';

interface TransactionBDXUploadProps {
  transactionName?: string;
  onNavigateToPage?: (page: string, data?: any) => void;
  transaction?: any;
}

export const TransactionBDXUpload: React.FC<TransactionBDXUploadProps> = ({
  transactionName,
  onNavigateToPage,
  transaction
}) => {
  const semanticColors = useSemanticColors();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'error' | 'progress' | 'success' | 'attention' | null;
    position: { x: number; y: number };
  }>({
    isOpen: false,
    type: null,
    position: { x: 0, y: 0 }
  });
  const [uploadedFiles, setUploadedFiles] = useState<Set<string>>(new Set());
  const [animatingCells, setAnimatingCells] = useState<Set<string>>(new Set());
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load reporting parameters from localStorage (saved by TransactionUploadSettings)
  const [reportingParams, setReportingParams] = useState<{
    dataDetailLevel: string;
    frequency: string;
  }>({
    dataDetailLevel: 'Detail',
    frequency: 'Monthly'
  });

  // Helper function to capitalize first letter
  const capitalizeFirst = (str: string) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Get default data detail level based on transaction name
  const getDefaultDataDetailLevel = () => {
    if (!transactionName) return 'detail';
    const nameLower = transactionName.toLowerCase();

    // Workers comp transactions → aggregate
    if (nameLower.includes('workers')) return 'aggregate';

    // Commercial and General transactions → detail
    if (nameLower.includes('commercial') || nameLower.includes('general')) return 'detail';

    // Default to detail
    return 'detail';
  };

  // Load reporting parameters from localStorage
  const loadReportingParams = () => {
    if (typeof window !== 'undefined') {
      // Use transaction-specific key or fallback to transaction name
      const settingsKey = transaction?.id
        ? `transaction-settings-${transaction.id}`
        : transactionName
          ? `transaction-settings-${transactionName.toLowerCase().replace(/\s+/g, '-')}`
          : 'transaction-settings-default';

      const savedSettings = localStorage.getItem(settingsKey);
      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings);
          setReportingParams({
            dataDetailLevel: capitalizeFirst(settings.dataDetailLevel || 'detail'),
            frequency: capitalizeFirst(settings.frequency || 'monthly')
          });
          console.log(`Loaded settings for ${transactionName}:`, settings);
        } catch (e) {
          console.error('Error parsing reporting settings:', e);
        }
      } else {
        // No saved settings - use defaults based on transaction type
        const defaultDetailLevel = getDefaultDataDetailLevel();
        console.log(`No saved settings found for ${transactionName}, using default: ${defaultDetailLevel}`);
        setReportingParams({
          dataDetailLevel: capitalizeFirst(defaultDetailLevel),
          frequency: 'Monthly'
        });
      }
    }
  };

  // Load on mount and when transaction changes
  useEffect(() => {
    loadReportingParams();
  }, [transactionName, transaction]);

  // Reload settings when window gains focus (returning from settings page)
  useEffect(() => {
    const handleFocus = () => {
      loadReportingParams();
    };

    window.addEventListener('focus', handleFocus);
    // Also listen for storage events
    window.addEventListener('storage', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleFocus);
    };
  }, []);

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

  // Generate multi-year upload status data based on transaction
  const generateUploadData = () => {
    // Determine number of years based on transaction ID
    const transactionId = transaction?.id || transactionName || '';
    const seed = parseInt(transactionId.replace(/\D/g, '')) || 0;
    const numYears = 2 + (seed % 4); // 2-5 years

    const years: { year: number; data: Record<string, string> }[] = [];
    const currentYear = 2025;

    // Build years from most recent (2025) to oldest - reversed display order
    for (let yearOffset = 0; yearOffset < numYears; yearOffset++) {
      const year = currentYear - yearOffset;
      const yearData: Record<string, string> = {};

      // Most recent year (2025) - mix of statuses with mostly successful
      if (year === currentYear) {
        // Determine number of missing months (1-8) based on transaction seed
        const missingMonths = 1 + (seed % 8); // Random from 1 to 8

        // All months start as success or have status
        const allMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

        yearData.jan = 'success';
        yearData.feb = (seed % 3 === 0) ? 'attention' : 'success';
        yearData.mar = 'success';
        yearData.apr = (seed % 5 === 0) ? 'error' : 'success';
        yearData.may = 'success';
        yearData.jun = 'success';
        yearData.jul = (seed % 7 === 0) ? 'attention' : 'success';
        yearData.aug = 'success';
        yearData.sep = (seed % 4 === 0) ? 'error' : ((seed % 2 === 0) ? 'progress' : 'success');
        yearData.oct = 'success';
        yearData.nov = 'success';
        yearData.dec = 'success';

        // Set the last N months to 'add' (working backwards from December)
        for (let i = 0; i < missingMonths; i++) {
          const monthIndex = allMonths.length - 1 - i;
          yearData[allMonths[monthIndex]] = 'add';
        }
      }
      // Previous years - all successful
      else {
        yearData.jan = 'success';
        yearData.feb = 'success';
        yearData.mar = 'success';
        yearData.apr = 'success';
        yearData.may = 'success';
        yearData.jun = 'success';
        yearData.jul = 'success';
        yearData.aug = 'success';
        yearData.sep = 'success';
        yearData.oct = 'success';
        yearData.nov = 'success';
        yearData.dec = 'success';
      }

      years.push({ year, data: yearData });
    }

    return years;
  };

  const uploadData = generateUploadData();

  // Handle Add button clicks - navigate to detail or aggregate mapping based on settings
  const handleAddClick = (month: string, type: string) => {
    if (onNavigateToPage) {
      const isDetailFlow = reportingParams.dataDetailLevel.toLowerCase() === 'detail';
      const targetPage = isDetailFlow ? 'reports-bdx-detail-mapping' : 'transaction-bdx-aggregated-mapping';
      console.log('Navigating to BDX Mapping for:', month, type, '- Flow:', reportingParams.dataDetailLevel, '- Page:', targetPage);
      onNavigateToPage(targetPage, {
        transactionName,
        month,
        type,
        dataDetailLevel: reportingParams.dataDetailLevel.toLowerCase()
      });
    }
  };

  // Modal hover handlers
  const handleIconEnter = (event: React.MouseEvent, type: 'error' | 'progress' | 'success' | 'attention') => {
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
  const createStatusCell = (status: string, month?: string, type?: string): CustomCellElement[] => {
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
        return [{
          type: 'icon',
          icon: (
            <div
              onMouseEnter={(e) => handleIconEnter(e, 'attention')}
              onMouseLeave={handleIconLeave}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <StatusAlertTable color="#AB8703" />
            </div>
          )
        }];
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
        return [{
          type: 'icon',
          icon: (
            <div
              onMouseEnter={(e) => handleIconEnter(e, 'success')}
              onMouseLeave={handleIconLeave}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <StatusCheckTable color="#13B64F" />
            </div>
          )
        }];
      case 'prohibited':
        return [{ type: 'icon', icon: <StatusProhibitedTable /> }];
      case 'add':
      default:
        const fileKey = `${type}-${month}`;
        const isUploaded = uploadedFiles.has(fileKey);
        const isAnimating = animatingCells.has(fileKey);

        if (isUploaded) {
          return [{
            type: 'icon',
            icon: (
              <div
                onMouseEnter={(e) => handleIconEnter(e, 'progress')}
                onMouseLeave={handleIconLeave}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: isAnimating ? 'scale(1.2)' : 'scale(1)',
                  transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                }}
              >
                <StatusProgressTable color="#3DA3CB" />
              </div>
            )
          }];
        }

        return [{
          type: 'button',
          text: 'Add',
          variant: 'small',
          color: 'white',
          onClick: () => handleAddClick(month || 'Unknown', type || 'Unknown'),
          style: {
            boxShadow: shadows.small,
            transform: 'scale(1)',
            transition: 'transform 0.2s ease',
          },
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
      fontFamily: typography.styles.captionM.fontFamily.join(', '),
      fontSize: typography.styles.captionM.fontSize,
      fontWeight: typography.styles.captionM.fontWeight,
      fontStyle: typography.styles.captionM.fontStyle,
      color: semanticColors.blackAndWhite.black900,
      borderTop: `1px solid ${semanticColors.theme.primary400}`,
    };

    const yearCellStyles = {
      ...cellStyles,
      width: '80px',
      fontSize: typography.styles.captionM.fontSize,
      fontFamily: typography.styles.captionM.fontFamily.join(', '),
      fontWeight: typography.styles.captionM.fontWeight,
      fontStyle: typography.styles.captionM.fontStyle,
      color: semanticColors.blackAndWhite.black900,
      borderRight: `1px solid ${semanticColors.theme.primary400}`,
    };

    const isLastYear = (index: number) => index === uploadData.length - 1;

    return (
      <table style={{
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: 0,
        backgroundColor: semanticColors.blackAndWhite.white,
        border: `1px solid ${semanticColors.theme.primary400}`,
        borderRadius: borderRadius[8],
      }}>
        {/* Header row */}
        <thead>
          <tr>
            <th style={{
              ...headerStyles,
              width: '80px',
              borderLeft: 'none',
              borderTop: 'none',
              borderRight: `1px solid ${semanticColors.theme.primary400}`,
              borderTopLeftRadius: borderRadius[8]
            }}></th>
            {months.map((month) => (
              <th key={month} style={{
                ...headerStyles,
                width: '75px',
                borderTop: 'none',
                borderRight: month === 'Dec' ? 'none' : `1px solid ${semanticColors.theme.primary400}`,
                borderTopRightRadius: month === 'Dec' ? borderRadius[8] : 0
              }}>
                {month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Year rows */}
          {uploadData.map((yearData, yearIndex) => (
            <tr key={yearData.year}>
              <td style={{
                ...yearCellStyles,
                borderLeft: 'none',
                borderBottom: isLastYear(yearIndex) ? 'none' : `1px solid ${semanticColors.theme.primary400}`,
                borderRight: `1px solid ${semanticColors.theme.primary400}`,
                borderBottomLeftRadius: isLastYear(yearIndex) ? borderRadius[8] : 0 // Only round last year
              }}>
                {yearData.year}
              </td>
              {months.map((month) => (
                <td key={`${yearData.year}-${month}`} style={{
                  ...cellStyles,
                  borderBottom: isLastYear(yearIndex) ? 'none' : `1px solid ${semanticColors.theme.primary400}`,
                  borderRight: month === 'Dec' ? 'none' : cellStyles.borderRight,
                  borderBottomRightRadius: (isLastYear(yearIndex) && month === 'Dec') ? borderRadius[8] : 0 // Only round last cell
                }}>
                  <CustomCell
                    elements={createStatusCell(yearData.data[month.toLowerCase()], month, 'Policy')}
                    alignment="center"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title={[
          { text: 'You are now viewing the bordereau status. You can upload bordereaux and track their progress across different stages. Reporting parameters are set to ', important: false },
          { text: reportingParams.dataDetailLevel, important: true },
          { text: ', with a ', important: false },
          { text: reportingParams.frequency, important: true },
          { text: ' reporting frequency.', important: false }
        ]}
        actions={[
          <Button
            variant="primary"
            color="white"
            onClick={() => {
              if (onNavigateToPage) {
                // Navigate to transaction upload settings and open Reporting Parameters tab
                onNavigateToPage('transaction-upload-settings', {
                  initialTab: 'reporting-config',
                  transactionName
                });
              }
            }}
            showIcon={false}
            style={{ height: '44px' }}
          >
            REPORTING PARAMETERS
          </Button>
        ]}
      />

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
      <div>
        {renderBDXTable()}
      </div>

      {/* Progress Modal */}
      {modalState.isOpen && modalState.type === 'progress' && typeof document !== 'undefined' && createPortal(
        <div
          onMouseEnter={handleModalEnter}
          onMouseLeave={handleModalLeave}
          style={{
            position: 'fixed',
            left: `${modalState.position.x - 140}px`,
            top: `${modalState.position.y + 35}px`,
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
              backgroundColor: '#e1f3ff',
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
        </div>,
        document.body
      )}

      {/* Error Modal */}
      {modalState.isOpen && modalState.type === 'error' && typeof document !== 'undefined' && createPortal(
        <div
          onMouseEnter={handleModalEnter}
          onMouseLeave={handleModalLeave}
          style={{
            position: 'fixed',
            left: `${modalState.position.x - 140}px`,
            top: `${modalState.position.y + 35}px`,
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
              backgroundColor: '#fee7e7',
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
        </div>,
        document.body
      )}

      {/* Success Modal */}
      {modalState.isOpen && modalState.type === 'success' && typeof document !== 'undefined' && createPortal(
        <div
          onMouseEnter={handleModalEnter}
          onMouseLeave={handleModalLeave}
          style={{
            position: 'fixed',
            left: `${modalState.position.x - 140}px`,
            top: `${modalState.position.y + 35}px`,
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
              backgroundColor: '#e8f5e8',
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
                <StatusCheckTable color="#13B64F" />
              </div>
              <div>
                <div style={{
                  ...typography.styles.bodyM,
                  color: semanticColors.blackAndWhite.black900,
                  fontWeight: typography.fontWeight.medium,
                  lineHeight: 1.4
                }}>
                  Bordereau successfully uploaded and processed. All data validated successfully.
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Attention Modal */}
      {modalState.isOpen && modalState.type === 'attention' && typeof document !== 'undefined' && createPortal(
        <div
          onMouseEnter={handleModalEnter}
          onMouseLeave={handleModalLeave}
          style={{
            position: 'fixed',
            left: `${modalState.position.x - 140}px`,
            top: `${modalState.position.y + 35}px`,
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
              backgroundColor: '#fffbee',
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
                <StatusAlertTable color="#AB8703" />
              </div>
              <div>
                <div style={{
                  ...typography.styles.bodyM,
                  color: semanticColors.blackAndWhite.black900,
                  fontWeight: typography.fontWeight.medium,
                  lineHeight: 1.4
                }}>
                  Minor validation issues detected. Please review and confirm data accuracy before proceeding.
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
