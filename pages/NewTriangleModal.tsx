import React, { useState, useEffect } from 'react';
import { Button, Input, FormDropdown, DropdownOption, Modal } from '@design-library/components';
import { borderRadius, typography } from '@design-library/tokens';
import { useSemanticColors } from '@design-library/tokens/ThemeProvider';
import { DownloadMedium } from '@design-library/icons';

export interface NewTriangleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTriangle: (formData: TriangleFormData) => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

export interface TriangleFormData {
  triangleName: string;
  policyGroup: string;
  riskPeriod: string;
  file: File | null;
  fileName: string;
}

export const NewTriangleModal: React.FC<NewTriangleModalProps> = ({
  isOpen,
  onClose,
  onCreateTriangle,
  buttonRef,
}) => {
  const semanticColors = useSemanticColors();
  const [formData, setFormData] = useState<TriangleFormData>({
    triangleName: '',
    policyGroup: '',
    riskPeriod: '',
    file: null,
    fileName: '',
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        triangleName: '',
        policyGroup: '',
        riskPeriod: '',
        file: null,
        fileName: '',
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof TriangleFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBrowseClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        setFormData(prev => ({
          ...prev,
          file: file,
          fileName: file.name
        }));
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
      setFormData(prev => ({
        ...prev,
        file: file,
        fileName: file.name
      }));
    }
  };

  const handleUploadTriangle = () => {
    onCreateTriangle(formData);
    onClose();
  };

  // Check if all required fields are filled
  const isFormValid =
    formData.triangleName.trim() !== '' &&
    formData.policyGroup.trim() !== '' &&
    formData.riskPeriod.trim() !== '' &&
    formData.fileName.trim() !== '';

  // Content styles
  const contentStyles: React.CSSProperties = {
    padding: '0',
  };

  const formContainerStyles: React.CSSProperties = {
    backgroundColor: semanticColors.theme.primary200,
    borderRadius: borderRadius[8],
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  // Policy Group options
  const policyGroupOptions: DropdownOption[] = [
    { value: 'Aviation Treaty 2023', label: 'Aviation Treaty 2023' },
    { value: 'Cyber Treaty 2024', label: 'Cyber Treaty 2024' },
    { value: 'Health Insurance Stop Loss Cover', label: 'Health Insurance Stop Loss Cover' },
    { value: 'Liability Excess of Loss Treaty', label: 'Liability Excess of Loss Treaty' },
    { value: 'Property Catastrophe Treaty', label: 'Property Catastrophe Treaty' },
    { value: 'Marine Cargo Treaty', label: 'Marine Cargo Treaty' },
  ];

  // Risk Period options
  const riskPeriodOptions: DropdownOption[] = [
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
    { value: 'TY23', label: 'TY23' },
    { value: 'TY24', label: 'TY24' },
    { value: 'TY25', label: 'TY25' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Triangle"
      buttonRef={buttonRef}
      showBackdrop={true}
      backdropColor="white"
      backdropBlur={false}
      backdropOpacity={0.6}
      width="730px"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="primary"
            color="black"
            onClick={handleUploadTriangle}
            disabled={!isFormValid}
            showIcon={false}
          >
            Upload Triangle
          </Button>
        </div>
      }
    >
      {/* Content */}
      <div style={contentStyles}>
        <div style={formContainerStyles}>
          {/* Triangle Name */}
          <Input
            label="Triangle Name"
            value={formData.triangleName}
            onChange={(e) => handleInputChange('triangleName', e.target.value)}
            placeholder="Enter Triangle Name"
            type="text"
          />

          {/* Policy Group and Risk Period - Side by Side */}
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* Policy Group Dropdown */}
            <div style={{ flex: 1 }}>
              <FormDropdown
                label="Policy group"
                value={formData.policyGroup}
                onChange={(value) => handleInputChange('policyGroup', value)}
                options={policyGroupOptions}
                placeholder="Select Policy group"
              />
            </div>

            {/* Risk Period Dropdown */}
            <div style={{ flex: 1 }}>
              <FormDropdown
                label="Risk Period"
                value={formData.riskPeriod}
                onChange={(value) => handleInputChange('riskPeriod', value)}
                options={riskPeriodOptions}
                placeholder="Select Risk Period"
              />
            </div>
          </div>

          {/* Drag and Drop File Upload Area */}
          <div style={{ marginTop: '8px' }}>
            <div
              style={{
                border: `2px dashed ${semanticColors.theme.primary400}`,
                borderRadius: borderRadius[8],
                textAlign: 'center',
                backgroundColor: semanticColors.blackAndWhite.white,
                cursor: 'pointer',
                height: '180px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleBrowseClick}
            >
              {formData.fileName ? (
                /* Show selected file name */
                <div style={{
                  ...typography.styles.bodyL,
                  color: semanticColors.blackAndWhite.black900,
                  fontWeight: 500,
                }}>
                  {formData.fileName}
                </div>
              ) : (
                /* Show upload prompt */
                <>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: semanticColors.success.fill,
                    borderRadius: borderRadius[8],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <DownloadMedium color={semanticColors.blackAndWhite.black900} />
                  </div>
                  <div style={{
                    ...typography.styles.bodyL,
                    color: semanticColors.blackAndWhite.black900
                  }}>
                    Drag and drop your file here or click to{' '}
                    <span
                      style={{
                        color: semanticColors.blackAndWhite.black900,
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewTriangleModal;
