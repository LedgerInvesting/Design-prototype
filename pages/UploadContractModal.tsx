import React, { useState } from 'react';
import { Modal, Button, Input } from '@design-library/components';
import { useSemanticColors, typography, borderRadius } from '@design-library/tokens';
import { DownloadMedium, CloseMedium, ContractsLogo } from '@design-library/icons';

export interface UploadContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (data: { transactionName: string; description: string; file: File | null }) => void;
  onBack?: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

export const UploadContractModal: React.FC<UploadContractModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  onBack,
  buttonRef,
}) => {
  const colors = useSemanticColors();
  const [transactionName, setTransactionName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleContinue = () => {
    onContinue({
      transactionName,
      description,
      file: selectedFile
    });
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleBrowseClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleFileSelect(file);
    };
    input.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  // ContractsAI badge component
  const ContractsAIBadge: React.FC = () => (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '40px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      backgroundColor: '#FCDC6A',
      padding: '5px 6px 5px 5px',
      borderRadius: borderRadius[8],
      zIndex: 2
    }}>
      <div style={{
        width: '16px',
        height: '16px',
        backgroundColor: colors.blackAndWhite.black900,
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '10px',
          height: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ContractsLogo color="#FFDB57" />
        </div>
      </div>
      <span style={{
        ...typography.styles.bodyS,
        color: colors.blackAndWhite.black800,
        fontWeight: 500
      }}>
        ContractsAI
      </span>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Contract file"
      subtitle="Upload your contract file, and enter a Transaction Name and a Description for this record."
      buttonRef={buttonRef}
      showBackdrop={true}
      backdropColor="white"
      backdropBlur={false}
      backdropOpacity={0.6}
      width="670px"
      padding="30px 15px"
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button
            variant="primary"
            color="white"
            onClick={onBack || onClose}
            showIcon={false}
            style={{ width: '140px' }}
          >
            Back
          </Button>
          <Button
            variant="primary"
            color="black"
            onClick={handleContinue}
            disabled={!transactionName || !description || !selectedFile}
            showIcon={false}
            style={{ width: '140px' }}
          >
            Continue
          </Button>
        </div>
      }
    >
      {/* ContractsAI Badge - positioned absolutely */}
      <ContractsAIBadge />

      {/* Form Content */}
      <div style={{
        backgroundColor: colors.theme.primary200,
        borderRadius: borderRadius[8],
        padding: '30px 15px 20px 15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginTop: '20px'
      }}>
        {/* Transaction Name Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black900,
            fontWeight: 500,
            lineHeight: 1.3
          }}>
            Transaction Name
          </label>
          <input
            type="text"
            placeholder=""
            value={transactionName}
            onChange={(e) => setTransactionName(e.target.value)}
            style={{
              width: '100%',
              height: '34px',
              padding: '8px 20px 10px 20px',
              border: `1px solid ${colors.theme.primary400}`,
              borderRadius: borderRadius[4],
              backgroundColor: colors.blackAndWhite.white,
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900,
              boxSizing: 'border-box',
              outline: 'none',
              fontFamily: 'Söhne, system-ui, sans-serif',
            }}
          />
        </div>

        {/* Description Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black900,
            fontWeight: 500,
            lineHeight: 1.3
          }}>
            Description
          </label>
          <input
            type="text"
            placeholder=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: '100%',
              height: '34px',
              padding: '8px 20px 10px 20px',
              border: `1px solid ${colors.theme.primary400}`,
              borderRadius: borderRadius[4],
              backgroundColor: colors.blackAndWhite.white,
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900,
              boxSizing: 'border-box',
              outline: 'none',
              fontFamily: 'Söhne, system-ui, sans-serif',
            }}
          />
        </div>

        {/* Upload Area */}
        <div
          style={{
            border: `1px dashed ${colors.theme.primary400}`,
            borderRadius: borderRadius[12],
            padding: '30px',
            textAlign: 'center',
            backgroundColor: colors.blackAndWhite.white,
            cursor: 'pointer',
            minHeight: '99px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '13px'
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
        >
          {/* Upload Icon */}
          <div style={{
            width: '45px',
            height: '45px',
            background: 'linear-gradient(180deg, #7FFFB0 0%, #C6FFC1 100%)',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <DownloadMedium color={colors.blackAndWhite.black900} />
          </div>

          {/* Upload Text */}
          <div style={{
            ...typography.styles.bodyL,
            color: colors.blackAndWhite.black900,
            lineHeight: '18px'
          }}>
            Drop File here to get started or{' '}
            <span
              style={{
                color: colors.blackAndWhite.black900,
                cursor: 'pointer',
                textDecoration: 'underline',
                textUnderlinePosition: 'from-font'
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (!selectedFile) {
                  handleBrowseClick();
                }
              }}
            >
              browse
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UploadContractModal;
