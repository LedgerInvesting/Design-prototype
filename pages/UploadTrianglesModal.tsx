import React, { useState } from 'react';
import { Button, Input, Modal } from '@design-library/components';
import { colors, typography, borderRadius } from '@design-library/tokens';
import { useSemanticColors } from '@design-library/tokens/ThemeProvider';
import { AddSmall, StatusWarning } from '@design-library/icons';

interface UploadTrianglesModalProps {
  isOpen: boolean;
  onClose: () => void;
  programName?: string;
}

// Triangle upload item component
const TriangleUploadItem: React.FC<{
  label: string;
  onClick: () => void;
}> = ({ label, onClick }) => {
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
          color: colors.blackAndWhite.black500,
          fontWeight: 500,
        }}>
          {label}
        </div>
      </div>

      {/* Add button */}
      <div
        onClick={onClick}
        style={{
          width: '26px',
          height: '26px',
          backgroundColor: colors.success.success400,
          borderRadius: borderRadius[8],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
        }}
      >
        <AddSmall color={colors.blackAndWhite.black900} />
      </div>
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

  const handleTriangleUpload = (type: string) => {
    console.log(`Upload ${type} triangle`);
    // This will open another modal later
  };

  const handleAdd = () => {
    console.log('Add valuation data:', { currentPremium, evaluationDate });
    // Add validation and submit logic here
  };

  const modalTitle = (
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
      subtitle="Upload triangle files and set current written premium for valuation analysis."
      width="648px"
      maxHeight="90vh"
      showBackdrop={false}
      footer={
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          {/* Warning message on the left */}
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

          {/* Button on the right */}
          <Button
            variant="primary"
            color="black"
            showIcon={false}
            onClick={handleAdd}
            style={{
              width: '140px',
              height: '37px',
              backgroundColor: colors.blackAndWhite.black300, // Disabled state
              cursor: 'not-allowed',
            }}
            disabled
          >
            add
          </Button>
        </div>
      }
    >

        {/* Triangle Container */}
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
            />
            <TriangleUploadItem
              label="add On Risk Triangle"
              onClick={() => handleTriangleUpload('on-risk-aqt')}
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

    </Modal>
  );
};