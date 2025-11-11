import React, { useState } from 'react';
import { Layout } from '@design-library/pages';
import { Button, Input, DatePicker, Modal, ButtonSelector } from '@design-library/components';
import { typography, borderRadius } from '@design-library/tokens';
import { useSemanticColors } from '@design-library/tokens/ThemeProvider';
import { createPageNavigationHandler, createBreadcrumbs } from '@design-library/utils/navigation';
import { AddMedium, StatusWarning, DownloadMedium, CloseMedium } from '@design-library/icons';

type TriangleType = 'development-fit' | 'on-risk-aqt' | 'on-risk-pyt' | null;

// Triangle upload item component
const TriangleUploadItem: React.FC<{
  label: string;
  onClick: () => void;
  completedName?: string;
}> = ({ label, onClick, completedName }) => {
  const colors = useSemanticColors();

  return (
    <div style={{
      backgroundColor: colors.blackAndWhite.white,
      border: `1px solid ${colors.theme.primary400}`,
      borderRadius: borderRadius[8],
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '6px 6px 6px 12px',
      cursor: 'pointer',
      transition: 'border-color 0.2s ease',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        {/* Triangle icon container */}
        <div style={{
          width: '18.856px',
          height: '22.208px',
          backgroundColor: colors.blackAndWhite.white,
          borderRadius: '1.173px',
          boxShadow: '0px 1.318px 3.954px 0px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <img
            src="/document_small.png"
            alt="Triangle document"
            style={{
              width: '17.464px',
              height: '19.21px',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Label */}
        <div style={{
          ...typography.styles.bodyM,
          color: completedName ? colors.blackAndWhite.black900 : colors.blackAndWhite.black500,
          fontWeight: 500,
        }}>
          {completedName || label}
        </div>
      </div>

      {/* Add or Close button */}
      <Button
        variant="icon"
        color="success"
        onClick={onClick}
        icon={completedName ? <CloseMedium /> : <AddMedium />}
        showIcon={true}
        shape="square"
        style={completedName ? { backgroundColor: colors.theme.primary300 } : undefined}
      />
    </div>
  );
};

interface AnalyticsAddValuationDataProps {
  onNavigateToPage?: (page: string, data?: any) => void;
}

/**
 * AnalyticsAddValuationData Component
 *
 * Page for adding valuation data with triangle uploads.
 * First step is displayed as a full page, second step (upload/select) opens as a modal.
 */
const AnalyticsAddValuationDataContent: React.FC<AnalyticsAddValuationDataProps> = ({ onNavigateToPage }) => {
  const colors = useSemanticColors();
  const [currentPremium, setCurrentPremium] = useState('');
  const [evaluationDate, setEvaluationDate] = useState('');
  const [completedTriangles, setCompletedTriangles] = useState<Record<string, string>>({});
  const [selectedTriangle, setSelectedTriangle] = useState<TriangleType>(null);
  const [uploadMode, setUploadMode] = useState<'upload' | 'existing'>('upload');
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [selectedExisting, setSelectedExisting] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const programName = 'XPT Commercial Auto TY23';

  // Sample existing triangles data
  const existingTriangles = [
    { value: 'mango-2023', label: 'Mango Treaty 2023 - Development Fit' },
    { value: 'banana-ty22', label: 'Banana Auto TY22 - On Risk AQT' },
    { value: 'pineapple-2024', label: 'Pineapple Treaty 2024 - On Risk PYT' },
    { value: 'strawberry-ty23', label: 'Strawberry Cargo TY23 - Development Fit' },
    { value: 'watermelon-2024', label: 'Watermelon Program 2024 - On Risk AQT' },
    { value: 'orange-ty22', label: 'Orange Holdings TY22 - Development Fit' },
    { value: 'grape-2023', label: 'Grape Marine 2023 - On Risk PYT' },
    { value: 'kiwi-ty24', label: 'Kiwi Property TY24 - Development Fit' },
    { value: 'peach-2024', label: 'Peach Aviation 2024 - On Risk AQT' },
    { value: 'cherry-ty23', label: 'Cherry Liability TY23 - Development Fit' },
    { value: 'lemon-2023', label: 'Lemon Casualty 2023 - On Risk PYT' },
    { value: 'lime-ty22', label: 'Lime Workers Comp TY22 - Development Fit' },
    { value: 'plum-2024', label: 'Plum General Liability 2024 - On Risk AQT' },
    { value: 'apricot-ty23', label: 'Apricot Professional 2023 - On Risk PYT' },
    { value: 'papaya-2024', label: 'Papaya Cyber TY24 - Development Fit' },
    { value: 'guava-ty22', label: 'Guava Environmental TY22 - On Risk AQT' },
  ];

  const handleTriangleUpload = (type: TriangleType) => {
    // If triangle is already completed, remove it
    if (type && completedTriangles[type]) {
      const newCompleted = { ...completedTriangles };
      delete newCompleted[type];
      setCompletedTriangles(newCompleted);
    } else {
      // Otherwise, open upload modal
      setSelectedTriangle(type);
    }
  };

  const handleCloseModal = () => {
    setSelectedTriangle(null);
    setUploadMode('upload');
    setSelectedFile('');
    setSelectedExisting('');
    setSearchQuery('');
  };

  const handleAddTriangle = () => {
    if (!selectedTriangle) return;

    // Get the name to save
    let triangleName = '';
    if (uploadMode === 'upload' && selectedFile) {
      triangleName = selectedFile;
    } else if (uploadMode === 'existing' && selectedExisting) {
      const triangle = existingTriangles.find(t => t.value === selectedExisting);
      triangleName = triangle?.label || selectedExisting;
    }

    // Save the completed triangle
    if (triangleName) {
      setCompletedTriangles({
        ...completedTriangles,
        [selectedTriangle]: triangleName
      });
    }

    // Close modal
    handleCloseModal();
  };

  const handleAddValuation = () => {
    console.log('Add valuation data:', { currentPremium, evaluationDate, completedTriangles });
    // Navigate back to valuation dashboard
    window.location.hash = '#analytics-valuation-dashboard';
  };

  const handleBrowseClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedFile(file.name);
      }
    };
    input.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  const getTriangleName = (type: TriangleType): string => {
    switch (type) {
      case 'development-fit':
        return 'Loss Development Triangle';
      case 'on-risk-aqt':
        return 'On Risk Triangle';
      case 'on-risk-pyt':
        return 'Policy-Year Triangle';
      default:
        return '';
    }
  };

  const modalTitle = (
    <div style={{ textAlign: 'center', lineHeight: '1.1' }}>
      <div style={{
        ...typography.styles.headlineH2,
        color: colors.blackAndWhite.black500,
        marginBottom: '4px',
        letterSpacing: '-0.5px',
      }}>
        Upload
      </div>
      <div style={{
        ...typography.styles.headlineH2,
        color: colors.blackAndWhite.black900,
        letterSpacing: '-0.5px',
      }}>
        {getTriangleName(selectedTriangle)}
      </div>
    </div>
  );

  const handleBackClick = () => {
    if (onNavigateToPage) {
      onNavigateToPage('analytics-valuation-dashboard');
    } else {
      window.location.hash = '#analytics-valuation-dashboard';
    }
  };

  return (
    <Layout
      pageType="analytics-add-valuation-data"
      selectedSidebarItem="analytics"
      selectedSidebarSubitem="valuation"
      onNavigate={onNavigateToPage ? createPageNavigationHandler(onNavigateToPage, 'analytics-add-valuation-data') : undefined}
      breadcrumbs={[
        { label: 'Valuation', href: '#analytics-valuation-dashboard' },
        { label: programName, href: '#analytics-valuation-dashboard' },
        { label: 'Add Valuation Data', isActive: true }
      ]}
      isSubPage={true}
      onBackClick={handleBackClick}
    >
      {/* Page Header */}
      <div style={{
        textAlign: 'left',
        marginBottom: '40px',
      }}>
        <div style={{
          ...typography.styles.headlineH2,
          color: colors.blackAndWhite.black500,
          marginBottom: '4px',
          letterSpacing: '-0.5px',
        }}>
          Add Valuation Data for
        </div>
        <div style={{
          ...typography.styles.headlineH2,
          color: colors.blackAndWhite.black900,
          letterSpacing: '-0.5px',
        }}>
          {programName}
        </div>
      </div>

      {/* Triangle List Section */}
      <div style={{
        backgroundColor: colors.theme.primary200,
        borderRadius: borderRadius[8],
        padding: '20px 15px',
        width: '100%',
      }}>
          {/* Accident-Quarter Triangle Section */}
          <div style={{
            ...typography.styles.bodyL,
            color: colors.blackAndWhite.black900,
            fontWeight: 500,
            marginBottom: '8px',
          }}>
            Accident-Quarter
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '20px',
          }}>
            <TriangleUploadItem
              label="add On Risk Triangle"
              onClick={() => handleTriangleUpload('on-risk-aqt')}
              completedName={completedTriangles['on-risk-aqt']}
            />
            <TriangleUploadItem
              label="add Loss Development Triangle"
              onClick={() => handleTriangleUpload('development-fit')}
              completedName={completedTriangles['development-fit']}
            />
          </div>

          {/* Policy-year Triangle Section */}
          <div style={{
            ...typography.styles.bodyL,
            color: colors.blackAndWhite.black900,
            fontWeight: 500,
            marginBottom: '8px',
          }}>
            Policy-year
          </div>

          <div style={{ marginBottom: '20px' }}>
            <TriangleUploadItem
              label="add Policy-Year Triangle"
              onClick={() => handleTriangleUpload('on-risk-pyt')}
              completedName={completedTriangles['on-risk-pyt']}
            />
          </div>

          {/* Input Container */}
          <div style={{
            display: 'flex',
            gap: '20px',
            width: '100%',
          }}>
            <div style={{ flex: 1 }}>
              <Input
                label="Current Written Premium"
                leftSymbol="$"
                value={currentPremium}
                onChange={(e) => setCurrentPremium(e.target.value)}
                placeholder=""
                isOptional={true}
              />
            </div>
            <div style={{ flex: 1 }}>
              <DatePicker
                label="Evaluation Date"
                value={evaluationDate}
                onChange={(e) => setEvaluationDate(e.target.value)}
                placeholder="Select date"
                simpleMode={true}
                onDateRangeChange={(startDate, endDate) => {
                  // Format the date for display
                  if (startDate) {
                    const date = new Date(startDate);
                    const formatted = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
                    setEvaluationDate(formatted);
                  }
                }}
              />
            </div>
          </div>
        </div>

      {/* Footer Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: '40px',
      }}>
          {/* Warning message - only show if requirements not met */}
          <div>
            {(Object.keys(completedTriangles).length === 0 || !evaluationDate) && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <StatusWarning color={colors.warning.warning400} />
                <div style={{
                  ...typography.styles.bodyM,
                  color: colors.blackAndWhite.black500,
                  fontWeight: 500,
                }}>
                  {Object.keys(completedTriangles).length === 0
                    ? 'you should upload at least one triangle'
                    : 'you should select an evaluation date'}
                </div>
              </div>
            )}
          </div>

          {/* Add Valuation Button */}
          <Button
            variant="primary"
            color="black"
            showIcon={false}
            onClick={handleAddValuation}
            style={{
              width: '140px',
              height: '37px',
              ...((Object.keys(completedTriangles).length === 0 || !evaluationDate) && {
                backgroundColor: colors.blackAndWhite.black300,
                cursor: 'not-allowed',
              }),
            }}
            disabled={Object.keys(completedTriangles).length === 0 || !evaluationDate}
          >
            Add Valuation
          </Button>
        </div>

      {/* Upload/Select Modal (Second Step) */}
      <Modal
        isOpen={selectedTriangle !== null}
        onClose={handleCloseModal}
        title={modalTitle}
        width="648px"
        maxHeight="90vh"
        showBackdrop={true}
        backdropColor="white"
        backdropBlur={false}
        footer={
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}>
            {/* Back button on the left */}
            <Button
              variant="primary"
              color="white"
              showIcon={false}
              onClick={handleCloseModal}
            >
              back
            </Button>

            {/* Upload button on the right */}
            <Button
              variant="primary"
              color="black"
              showIcon={false}
              onClick={handleAddTriangle}
              style={{
                width: '140px',
                height: '37px',
                ...(((uploadMode === 'upload' && !selectedFile) || (uploadMode === 'existing' && !selectedExisting)) && {
                  backgroundColor: colors.blackAndWhite.black300,
                  cursor: 'not-allowed',
                }),
              }}
              disabled={(uploadMode === 'upload' && !selectedFile) || (uploadMode === 'existing' && !selectedExisting)}
            >
              Add triangle
            </Button>
          </div>
        }
      >
        <div style={{
          backgroundColor: colors.theme.primary200,
          borderRadius: borderRadius[8],
          padding: '20px 15px',
          marginBottom: '20px',
          height: uploadMode === 'existing' ? '400px' : '300px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Button Selectors */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '10px',
          }}>
            <div style={{ flex: 1 }}>
              <ButtonSelector
                selectorType="radio"
                label="Upload file"
                checked={uploadMode === 'upload'}
                onChange={() => setUploadMode('upload')}
              />
            </div>
            <div style={{ flex: 1 }}>
              <ButtonSelector
                selectorType="radio"
                label="Select Existing"
                checked={uploadMode === 'existing'}
                onChange={() => setUploadMode('existing')}
              />
            </div>
          </div>

          {/* Drag and Drop Box (only show when upload mode is selected) */}
          {uploadMode === 'upload' && (
            <div
              style={{
                border: `2px dashed ${colors.theme.primary400}`,
                borderRadius: borderRadius[8],
                textAlign: 'center',
                backgroundColor: colors.blackAndWhite.white,
                cursor: 'pointer',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleBrowseClick}
            >
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: colors.success.fill,
                borderRadius: borderRadius[8],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <DownloadMedium color={colors.blackAndWhite.black900} />
              </div>
              <div style={{
                ...typography.styles.bodyL,
                color: colors.blackAndWhite.black900
              }}>
                Drag and drop your file here or click to{' '}
                <span
                  style={{
                    color: colors.blackAndWhite.black900,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBrowseClick();
                  }}
                >
                  browse files
                </span>
              </div>
            </div>
          )}

          {/* Custom Triangle Selector (only show when existing mode is selected) */}
          {uploadMode === 'existing' && (
            <div style={{
              backgroundColor: colors.blackAndWhite.white,
              border: `1px solid ${colors.theme.primary400}`,
              borderRadius: borderRadius[4],
              padding: '5px 10px 10px 20px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}>
              {/* Search Input */}
              <div style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '6px',
              }}>
                <input
                  type="text"
                  placeholder="Search for an existing triangle"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black500,
                    backgroundColor: 'transparent',
                  }}
                />
              </div>

              {/* Divider */}
              <div style={{
                height: '1px',
                backgroundColor: colors.theme.primary400,
                marginBottom: '0px',
              }} />

              {/* Scrollable List */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                paddingRight: '10px',
              }}>
                {existingTriangles
                  .filter(triangle =>
                    triangle.label.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((triangle) => (
                    <div
                      key={triangle.value}
                      onClick={() => setSelectedExisting(triangle.value)}
                      style={{
                        padding: '10px 5px',
                        cursor: 'pointer',
                        ...typography.styles.bodyM,
                        color: colors.blackAndWhite.black900,
                        backgroundColor: selectedExisting === triangle.value ? colors.theme.primary700 : 'transparent',
                        borderRadius: selectedExisting === triangle.value ? borderRadius[4] : 0,
                      }}
                    >
                      {triangle.label}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </Layout>
  );
};

/**
 * AnalyticsAddValuationData Component
 */
export const AnalyticsAddValuationData: React.FC<AnalyticsAddValuationDataProps> = AnalyticsAddValuationDataContent;

export default AnalyticsAddValuationData;
