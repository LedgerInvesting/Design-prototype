import React, { useState } from 'react';
import { Button, Input, Modal, ButtonSelector } from '@design-library/components';
import { typography, borderRadius } from '@design-library/tokens';
import { useSemanticColors } from '@design-library/tokens/ThemeProvider';
import { AddMedium, StatusWarning, DownloadMedium, CloseMedium } from '@design-library/icons';

interface UploadTrianglesModalProps {
  isOpen: boolean;
  onClose: () => void;
  programName?: string;
}

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

export const UploadTrianglesModal: React.FC<UploadTrianglesModalProps> = ({
  isOpen,
  onClose,
  programName = 'XPT Commercial Auto TY23'
}) => {
  const colors = useSemanticColors();
  const [currentPremium, setCurrentPremium] = useState('');
  const [evaluationDate, setEvaluationDate] = useState('');
  const [selectedTriangle, setSelectedTriangle] = useState<TriangleType>(null);
  const [uploadMode, setUploadMode] = useState<'upload' | 'existing'>('upload');
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [selectedExisting, setSelectedExisting] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedTriangles, setCompletedTriangles] = useState<Record<string, string>>({});

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

  const handleBack = () => {
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

    // Go back to first modal
    handleBack();
  };

  const handleAdd = () => {
    console.log('Add valuation data:', { currentPremium, evaluationDate });
    // Add validation and submit logic here
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
        return 'Development Fit Triangle';
      case 'on-risk-aqt':
        return 'On Risk Triangle (AQT)';
      case 'on-risk-pyt':
        return 'On Risk Triangle (PYT)';
      default:
        return '';
    }
  };

  const modalTitle = selectedTriangle ? (
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
  ) : (
    <div style={{ textAlign: 'center', lineHeight: '1.1' }}>
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
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      width="648px"
      maxHeight="90vh"
      showBackdrop={true}
      backdropColor="white"
      backdropBlur={false}
      footer={
        selectedTriangle ? (
          /* Upload mode footer */
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
              onClick={handleBack}
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
        ) : (
          /* Triangle list mode footer */
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: Object.keys(completedTriangles).length > 0 ? 'flex-end' : 'space-between',
            width: '100%'
          }}>
            {/* Warning message on the left - only show if no triangles completed */}
            {Object.keys(completedTriangles).length === 0 && (
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
                  you should upload at least one triangle
                </div>
              </div>
            )}

            {/* Button on the right */}
            <Button
              variant="primary"
              color="black"
              showIcon={false}
              onClick={handleAdd}
              style={{
                width: '140px',
                height: '37px',
                ...(Object.keys(completedTriangles).length === 0 && {
                  backgroundColor: colors.blackAndWhite.black300,
                  cursor: 'not-allowed',
                }),
              }}
              disabled={Object.keys(completedTriangles).length === 0}
            >
              Add Valuation
            </Button>
          </div>
        )
      }
    >
      {selectedTriangle ? (
        /* Upload Triangle UI */
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
      ) : (
        /* Triangle List UI */
        <div style={{
          backgroundColor: colors.theme.primary200,
          borderRadius: borderRadius[8],
          padding: '20px 15px',
          marginBottom: '20px',
        }}>
          {/* Accident-Quarter Triangle Section */}
          <div style={{
            ...typography.styles.bodyL,
            color: colors.blackAndWhite.black900,
            fontWeight: 500,
            marginBottom: '8px',
          }}>
            Accident-Quarter Triangle (AQT)
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '20px',
          }}>
            <TriangleUploadItem
              label="add Development Fit Triangle"
              onClick={() => handleTriangleUpload('development-fit')}
              completedName={completedTriangles['development-fit']}
            />
            <TriangleUploadItem
              label="add On Risk Triangle"
              onClick={() => handleTriangleUpload('on-risk-aqt')}
              completedName={completedTriangles['on-risk-aqt']}
            />
          </div>

          {/* Policy-year Triangle Section */}
          <div style={{
            ...typography.styles.bodyL,
            color: colors.blackAndWhite.black900,
            fontWeight: 500,
            marginBottom: '8px',
          }}>
            Policy-year Triangle (PYT)
          </div>

          <div style={{ marginBottom: '20px' }}>
            <TriangleUploadItem
              label="add On Risk Triangle"
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
              <Input
                label="Evaluation Date"
                value={evaluationDate}
                onChange={(e) => setEvaluationDate(e.target.value)}
                placeholder="MM/DD/YYYY"
                required={true}
                showCalendarIcon={true}
              />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};