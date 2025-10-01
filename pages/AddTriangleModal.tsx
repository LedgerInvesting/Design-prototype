import React, { useState } from 'react';
import { Button, Modal, ButtonSelector } from '@design-library/components';
import { typography, borderRadius } from '@design-library/tokens';
import { useSemanticColors } from '@design-library/tokens/ThemeProvider';
import { DownloadMedium } from '@design-library/icons';

interface AddTriangleModalProps {
  isOpen: boolean;
  onClose: () => void;
  triangleType: 'on-risk-aqt' | 'development-fit' | 'on-risk-pyt';
  onTriangleAdded: () => void;
}

export const AddTriangleModal: React.FC<AddTriangleModalProps> = ({
  isOpen,
  onClose,
  triangleType,
  onTriangleAdded
}) => {
  const colors = useSemanticColors();
  const [uploadMode, setUploadMode] = useState<'upload' | 'existing'>('upload');
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [selectedExisting, setSelectedExisting] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Reset state when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setUploadMode('upload');
      setSelectedFile('');
      setSelectedExisting('');
      setSearchQuery('');
    }
  }, [isOpen]);

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

  const handleAddTriangle = () => {
    if (uploadMode === 'upload' && !selectedFile) return;
    if (uploadMode === 'existing' && !selectedExisting) return;

    onTriangleAdded();
    onClose();
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

  const getTriangleName = (): string => {
    switch (triangleType) {
      case 'development-fit':
        return 'Loss Development Triangle';
      case 'on-risk-aqt':
        return 'On Risk Triangle';
      case 'on-risk-pyt':
        return 'Policy-Year Triangle';
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
        {getTriangleName()}
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
            onClick={onClose}
          >
            back
          </Button>

          {/* Add triangle button on the right */}
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
      {/* Upload Triangle UI */}
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
  );
};

export default AddTriangleModal;
