import React, { useState } from 'react';
import { Modal, Button, FileUploadBox } from '@design-library/components';
import { useSemanticColors, typography, borderRadius } from '@design-library/tokens';
import { ContractsLogo } from '@design-library/icons';

// ContractsAI badge component (outside main component to prevent re-creation)
const ContractsAIBadge = React.memo(() => {
  const colors = useSemanticColors();
  return (
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
});
ContractsAIBadge.displayName = 'ContractsAIBadge';

// Modal content component that uses theme colors from context
const ModalContentInner: React.FC<{
  transactionName: string;
  description: string;
  selectedFile: File | null;
  onTransactionNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
}> = React.memo(({
  transactionName,
  description,
  selectedFile,
  onTransactionNameChange,
  onDescriptionChange,
  onFileSelect,
  onFileRemove
}) => {
  const colors = useSemanticColors();

  return (
    <>
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
            onChange={(e) => onTransactionNameChange(e.target.value)}
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
            onChange={(e) => onDescriptionChange(e.target.value)}
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

        {/* File Upload Box */}
        <FileUploadBox
          selectedFile={selectedFile}
          onFileSelect={onFileSelect}
          onFileRemove={onFileRemove}
          acceptedFileTypes=".pdf"
          showFilePreview={true}
          themeColors={{
            primary400: colors.theme.primary400,
            primary200: colors.theme.primary200,
          }}
        />
      </div>
    </>
  );
});
ModalContentInner.displayName = 'ModalContentInner';

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
      theme="contracts"
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
      <ModalContentInner
        transactionName={transactionName}
        description={description}
        selectedFile={selectedFile}
        onTransactionNameChange={setTransactionName}
        onDescriptionChange={setDescription}
        onFileSelect={setSelectedFile}
        onFileRemove={() => setSelectedFile(null)}
      />
    </Modal>
  );
};

export default UploadContractModal;
