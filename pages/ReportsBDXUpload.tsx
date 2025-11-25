import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Layout } from '@design-library/pages';
import {
  Table,
  CustomCell,
  CustomCellElement,
  DocumentCell,
  Modal,
  Button,
  ButtonSelector,
  FileUploadBox,
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
  StatusCheckTable,
  StatusProhibitedTable,
  DocumentMedium,
  DownloadMedium,
  CloseMedium
} from '@design-library/icons';
import { createPageNavigationHandler, type PageType } from '@design-library/utils/navigation';
import { useTransactions } from './hooks/useTransactionsStable';

interface BDXUploadProps {
  onNavigateToPage?: (page: string, data?: any) => void;
  onInboxClick?: () => void;
}

export const ReportsBDXUpload: React.FC<BDXUploadProps> = ({
  onNavigateToPage,
  onInboxClick,
}) => {
  
  // Function to detect if user accessed this page directly from sidebar navigation
  const isDirectAccess = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    // Check sessionStorage for navigation source
    const navigationSource = sessionStorage.getItem('navigationSource');
    
    // If no navigation source is set, assume direct access
    // If source is 'sidebar', it's direct access
    // If source is 'page', it's navigation from another page
    return !navigationSource || navigationSource === 'sidebar' || navigationSource === 'direct';
  };
  const semanticColors = useSemanticColors();
  
  // Get transaction data to use real transaction name
  const { transactions } = useTransactions({ limit: 1 });
  const selectedTransaction = transactions[0]; // Use first transaction
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'error' | 'progress' | 'success' | 'attention' | null;
    position: { x: number; y: number };
  }>({
    isOpen: false,
    type: null,
    position: { x: 0, y: 0 }
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalContext, setAddModalContext] = useState<{ month: string; type: string } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<'policy' | 'claim'>('policy');
  const [uploadedFiles, setUploadedFiles] = useState<Set<string>>(new Set());
  const [animatingCells, setAnimatingCells] = useState<Set<string>>(new Set());
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup navigation source after detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Clear navigation source after component mounts to reset state
      const timer = setTimeout(() => {
        sessionStorage.removeItem('navigationSource');
      }, 100);
      
      return () => clearTimeout(timer);
    }
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

  // Handle Add button clicks - navigate directly to configuration page
  const handleAddClick = (month: string, type: string) => {
    if (onNavigateToPage) {
      // Prepare empty upload data for new configuration
      const uploadInfo = {
        fileName: undefined,
        documentType: type,
        month: month,
        year: '2025',
        openModal: true // Open the import modal when navigating from Add button
      };

      // Navigate to configuration page
      onNavigateToPage('reports-cession-summary-generation', uploadInfo);
    }
  };

  // File handling function
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
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
        // Check if file has been uploaded for this month/type combination
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

        if (isAnimating) {
          // Show a scaling transition from button to icon
          return [{
            type: 'icon',
            icon: (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'scale(0.8)',
                  opacity: 0.7,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
      borderRight: `1px solid ${semanticColors.theme.primary400}`, // Ensure right border
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
      textAlign: 'left' as const,
      paddingLeft: '16px',
      width: '180px',
      fontSize: typography.styles.bodyM.fontSize,
      fontFamily: typography.styles.bodyM.fontFamily.join(', '),
      fontWeight: typography.fontWeight.medium,
      color: semanticColors.blackAndWhite.black700,
    };

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
            {months.map((month, index) => (
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
          {/* Policy row */}
          <tr>
            <td style={{
              ...yearCellStyles,
              borderLeft: 'none',
              borderBottom: 'none',
              borderRight: `1px solid ${semanticColors.theme.primary400}`,
              borderBottomLeftRadius: borderRadius[8]
            }}>
              2025
            </td>
            {months.map((month) => (
              <td key={`policy-${month}`} style={{
                ...cellStyles,
                borderBottom: 'none',
                borderRight: month === 'Dec' ? 'none' : cellStyles.borderRight,
                borderBottomRightRadius: month === 'Dec' ? borderRadius[8] : 0
              }}>
                <CustomCell
                  elements={createStatusCell(uploadData.policy[month.toLowerCase() as keyof typeof uploadData.policy], month, 'Policy')}
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
    { label: 'BDX UPLOAD', isActive: true }
  ];

  return (
    <Layout
      pageType="reports-bdx-upload"
      breadcrumbs={breadcrumbs}
      selectedSidebarItem="reports"
      selectedSidebarSubitem="bdx-upload"
      onNavigate={createPageNavigationHandler(onNavigateToPage!, 'reports-bdx-upload')}
      onInboxClick={onInboxClick}
      isSubPage={!isDirectAccess()}
      onBackClick={() => {
        // Navigate back to reports explorer only if not directly accessed
        if (onNavigateToPage && !isDirectAccess()) {
          onNavigateToPage('reports-explorer');
        }
      }}
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
            }}>Cucumber GL Seasonal</span> Plus Bordereau. You can upload bordereau and track progress across different stages.
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
        <div>
          {renderBDXTable()}
        </div>

        {/* Progress Modal - Rendered in portal to avoid parent transform issues */}
        {modalState.isOpen && modalState.type === 'progress' && typeof document !== 'undefined' && createPortal(
          <div
            onMouseEnter={handleModalEnter}
            onMouseLeave={handleModalLeave}
            style={{
              position: 'fixed',
              left: `${modalState.position.x - 140}px`, // Center the 280px modal
              top: `${modalState.position.y + 35}px`, // Position below the icon
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
          </div>,
          document.body
        )}

        {/* Error Modal - Rendered in portal to avoid parent transform issues */}
        {modalState.isOpen && modalState.type === 'error' && typeof document !== 'undefined' && createPortal(
          <div
            onMouseEnter={handleModalEnter}
            onMouseLeave={handleModalLeave}
            style={{
              position: 'fixed',
              left: `${modalState.position.x - 140}px`, // Center the 280px modal
              top: `${modalState.position.y + 35}px`, // Position below the icon
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
          </div>,
          document.body
        )}

        {/* Success Modal - Rendered in portal to avoid parent transform issues */}
        {modalState.isOpen && modalState.type === 'success' && typeof document !== 'undefined' && createPortal(
          <div
            onMouseEnter={handleModalEnter}
            onMouseLeave={handleModalLeave}
            style={{
              position: 'fixed',
              left: `${modalState.position.x - 140}px`, // Center the 280px modal
              top: `${modalState.position.y + 35}px`, // Position below the icon
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
                backgroundColor: '#e8f5e8', // success light background
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

        {/* Attention Modal - Rendered in portal to avoid parent transform issues */}
        {modalState.isOpen && modalState.type === 'attention' && typeof document !== 'undefined' && createPortal(
          <div
            onMouseEnter={handleModalEnter}
            onMouseLeave={handleModalLeave}
            style={{
              position: 'fixed',
              left: `${modalState.position.x - 140}px`, // Center the 280px modal
              top: `${modalState.position.y + 35}px`, // Position below the icon
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
                backgroundColor: '#fffbee', // warning light background
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

        {/* Add Bordereau Modal */}
        {isAddModalOpen && (
          <Modal
            isOpen={isAddModalOpen}
            onClose={() => {
              setIsAddModalOpen(false);
              setSelectedFile(null);
              setDocumentType('policy');
            }}
            title={
              <div>
                <div style={{
                  ...typography.styles.subheadingL,
                  color: semanticColors.blackAndWhite.black500,
                  marginBottom: '4px'
                }}>
                  Uploading document for:
                </div>
                <div style={{
                  ...typography.styles.subheadingL
                }}>
                  {addModalContext?.type} Bordereau ({addModalContext?.month} 2023)
                </div>
              </div>
            }
            width="560px"
            maxWidth="90vw"
            showBackdrop={true}
            backdropOpacity={0.5}
            backdropColor="white"
            centered={true}
            footer={
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <Button
                  variant="primary"
                  color="black"
                  showIcon={false}
                  disabled={!selectedFile}
                  onClick={() => {
                    // Handle upload and navigate to configuration page
                    if (selectedFile && addModalContext && onNavigateToPage) {
                      // Prepare upload data
                      const uploadInfo = {
                        fileName: selectedFile.name,
                        documentType: documentType === 'policy' ? 'Policy' : 'Claim',
                        month: addModalContext.month,
                        year: '2025'
                      };

                      // Close modal
                      setIsAddModalOpen(false);
                      setSelectedFile(null);

                      // Navigate to configuration page with data
                      onNavigateToPage('reports-cession-summary-generation', uploadInfo);

                      console.log('Navigating to configuration with data:', uploadInfo);
                    }
                  }}
                >
                  Add File
                </Button>
              </div>
            }
          >
            <div>
              {/* Upload Container */}
              <div style={{
                backgroundColor: semanticColors.theme.primary200,
                padding: '20px',
                borderRadius: borderRadius[8],
                marginBottom: '12px'
              }}>
                {/* Document Type Selectors */}
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  marginBottom: '24px',
                }}>
                  <div style={{ flex: 1 }}>
                    <ButtonSelector
                      selectorType="radio"
                      label="New Policy"
                      checked={documentType === 'policy'}
                      onChange={() => setDocumentType('policy')}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <ButtonSelector
                      selectorType="radio"
                      label="New Claim"
                      checked={documentType === 'claim'}
                      onChange={() => setDocumentType('claim')}
                    />
                  </div>
                </div>

                {/* Document Name Input */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black900,
                    fontWeight: typography.fontWeight.medium,
                    marginBottom: '8px'
                  }}>
                    Name of the document
                  </label>
                  <input
                    type="text"
                    placeholder="Enter document name"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `1px solid ${semanticColors.theme.primary400}`,
                      borderRadius: borderRadius[8],
                      backgroundColor: semanticColors.blackAndWhite.white,
                      ...typography.styles.bodyM,
                      color: semanticColors.blackAndWhite.black900,
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* File Upload Box */}
                <FileUploadBox
                  selectedFile={selectedFile}
                  onFileSelect={handleFileSelect}
                  onFileRemove={() => setSelectedFile(null)}
                  acceptedFileTypes=".xlsx,.csv,.xls"
                  showFilePreview={true}
                  placeholderText="Drag and drop your file here or click to"
                />
              </div>

              {/* File Requirements */}
              <div style={{
                backgroundColor: semanticColors.warning.fillLight,
                padding: '10px',
                borderRadius: borderRadius[8],
                marginBottom: '24px'
              }}>
                <div style={{
                  ...typography.styles.bodyM,
                  color: semanticColors.blackAndWhite.black900,
                  fontWeight: typography.fontWeight.medium,
                  marginBottom: '8px'
                }}>
                  File Requirements
                </div>
                <ul style={{
                  ...typography.styles.bodyS,
                  color: semanticColors.blackAndWhite.black700,
                  margin: 0,
                  paddingLeft: '16px'
                }}>
                  <li>Supported formats: .xlsx, .csv, .xls</li>
                  <li>Maximum file size: 50MB</li>
                  <li>Must contain required columns: Policy Number, Premium, Claims, etc.</li>
                </ul>
              </div>
            </div>
          </Modal>
        )}
    </Layout>
  );
};