import React, { useState, useRef } from 'react';
import { Layout } from '@design-library/pages';
import type { BreadcrumbItem } from '@design-library/pages';
import { Button, StatusCell } from '@design-library/components';
import { typography, spacing, borderRadius, shadows, useSemanticColors, ThemeProvider } from '@design-library/tokens';
import { createPageNavigationHandler, createBreadcrumbs } from '@design-library/utils/navigation';
import { DocumentMedium, CloseSmall } from '@design-library/icons';

interface ContractsUploadProps {
  onNavigateToPage?: (page: string, data?: any) => void;
}

interface UploadedFile {
  file: File;
  pageCount: number;
  status: 'processing' | 'done';
}

export const ContractsUpload: React.FC<ContractsUploadProps> = ({ onNavigateToPage }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const breadcrumbs = createBreadcrumbs.contracts.upload();

  const handleFileSelect = (file: File) => {
    if (file && file.type === 'application/pdf') {
      // Simulate page count (in real app, this would be determined by PDF library)
      const pageCount = Math.floor(Math.random() * 50) + 10;
      const newFile: UploadedFile = {
        file,
        pageCount,
        status: 'processing'
      };
      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate status change to "done" after 2 seconds
      setTimeout(() => {
        setUploadedFiles(prev =>
          prev.map(f =>
            f.file === file ? { ...f, status: 'done' } : f
          )
        );
      }, 2000);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setUploadedFiles(prev => prev.filter(f => f.file !== fileToRemove));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleContinue = () => {
    if (uploadedFiles.length > 0 && onNavigateToPage) {
      // Navigate to AI Extraction page with the uploaded file data
      onNavigateToPage('contracts-ai-extraction', { fileName: uploadedFiles[0].file.name });
    }
  };

  const PageContent: React.FC = () => {
    const colors = useSemanticColors();

    // Page title styles
    const titleContainerStyles: React.CSSProperties = {
      marginBottom: spacing[8],
    };

    const titleStyles: React.CSSProperties = {
      ...typography.styles.headlineH2,
      color: colors.blackAndWhite.black900,
      display: 'inline',
    };

    const subtitleStyles: React.CSSProperties = {
      ...typography.styles.headlineH2,
      color: colors.blackAndWhite.black500,
      display: 'inline',
    };

    // Upload module container
    const uploadModuleStyles: React.CSSProperties = {
      border: `1px solid ${colors.contracts.dynamic.yellow400}`,
      borderRadius: borderRadius[12],
      padding: spacing[10],
      marginBottom: spacing[12],
    };

    // Upload area styles
    const uploadAreaStyles: React.CSSProperties = {
      backgroundColor: colors.contracts.dynamic.yellow200,
      borderRadius: borderRadius[12],
      height: '184px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing[4],
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: isDragging ? `2px dashed ${colors.contracts.yellow700}` : 'none',
      transform: isDragging ? 'scale(1.02)' : 'scale(1)',
    };

    // Document icon container
    const documentIconContainerStyles: React.CSSProperties = {
      width: '54px',
      height: '71px',
      backgroundColor: colors.blackAndWhite.white,
      borderRadius: borderRadius[8],
      boxShadow: shadows.medium,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    };

    // PDF badge styles
    const pdfBadgeStyles: React.CSSProperties = {
      position: 'absolute',
      bottom: '-8px',
      right: '-8px',
      width: '24px',
      height: '24px',
      backgroundColor: '#DC2626',
      borderRadius: borderRadius[4],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...typography.styles.captionM,
      color: colors.blackAndWhite.white,
      fontWeight: typography.fontWeight.bold,
      fontSize: '10px',
    };

    // Upload text styles
    const uploadTextStyles: React.CSSProperties = {
      ...typography.styles.bodyL,
      color: colors.blackAndWhite.black900,
    };

    const browseTextStyles: React.CSSProperties = {
      ...typography.styles.bodyL,
      color: colors.contracts.yellow900,
      textDecoration: 'underline',
      cursor: 'pointer',
    };

    // Action buttons container
    const actionsContainerStyles: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: spacing[4],
    };

    const cancelButtonStyles: React.CSSProperties = {
      ...typography.styles.bodyL,
      color: colors.blackAndWhite.black500,
      background: 'none',
      border: 'none',
      padding: `${spacing[2]} ${spacing[8]}`,
      cursor: 'pointer',
      borderRadius: borderRadius[4],
      transition: 'background-color 0.2s ease',
    };

    return (
      <div>
        {/* Page Title */}
        <div style={titleContainerStyles}>
          <span style={titleStyles}>Start uploading contracts</span>
          <span style={subtitleStyles}> — Once your upload contracts, we will start extracting the key terms. It will take few minutes.</span>
        </div>

        {/* Upload Module */}
        <div style={uploadModuleStyles}>
          <div
            style={uploadAreaStyles}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
          >
            {/* Document Icon */}
            <div style={documentIconContainerStyles}>
              {/* Document lines decoration */}
              <div style={{
                position: 'absolute',
                top: '11px',
                left: '5px',
                right: '5px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                <div style={{ height: '2px', backgroundColor: colors.contracts.dynamic.yellow300, width: '23px' }} />
                <div style={{ height: '2px', backgroundColor: colors.contracts.dynamic.yellow300, width: '28px' }} />
                <div style={{ height: '2px', backgroundColor: colors.contracts.dynamic.yellow300, width: '28px' }} />
                <div style={{ height: '2px', backgroundColor: colors.contracts.dynamic.yellow300, width: '28px' }} />
                <div style={{ height: '2px', backgroundColor: colors.contracts.dynamic.yellow300, width: '15px' }} />
              </div>

              {/* PDF Badge */}
              <div style={pdfBadgeStyles}>
                PDF
              </div>
            </div>

            {/* Upload Text */}
            <div>
              <span style={uploadTextStyles}>Drop File here to get started or </span>
              <span style={browseTextStyles}>browse</span>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
          </div>

          {/* Uploaded Files List - Inside same box */}
          {uploadedFiles.length > 0 && (
            <div style={{ marginTop: spacing[10] }}>
              <div style={{
                ...typography.styles.bodyL,
                color: colors.blackAndWhite.black900,
                marginBottom: spacing[4],
                fontWeight: typography.fontWeight.medium,
              }}>
                Document Uploaded
              </div>

              {/* Line separator between title and documents */}
              <div style={{
                height: '1px',
                backgroundColor: colors.contracts.dynamic.yellow400,
                marginBottom: spacing[6],
              }} />

              <div>
                {uploadedFiles.map((uploadedFile, index) => (
                  <React.Fragment key={index}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: `${spacing[4]} 0`,
                      }}
                    >
                      {/* PDF Icon + File Name */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing[4],
                        flex: 1,
                      }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          backgroundColor: '#DC2626',
                          borderRadius: borderRadius[4],
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          ...typography.styles.captionM,
                          color: colors.blackAndWhite.white,
                          fontWeight: typography.fontWeight.bold,
                          fontSize: '8px',
                        }}>
                          PDF
                        </div>
                        <div style={{
                          ...typography.styles.bodyL,
                          color: colors.blackAndWhite.black900,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {uploadedFile.file.name}
                        </div>
                      </div>

                      {/* Right-aligned section with gaps */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '150px',
                      }}>
                        {/* Page Count */}
                        <div style={{
                          ...typography.styles.bodyL,
                          color: colors.blackAndWhite.black500,
                          flexShrink: 0,
                        }}>
                          {uploadedFile.pageCount} pages
                        </div>

                        {/* Status using StatusCell */}
                        <div style={{ flexShrink: 0 }}>
                          <StatusCell
                            status={uploadedFile.status}
                            text={uploadedFile.status === 'processing' ? 'Processing' : 'Reviewing'}
                          />
                        </div>

                        {/* Remove Button - Square with primary 200 background */}
                        <div
                          onClick={() => handleRemoveFile(uploadedFile.file)}
                          style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: colors.theme.primary200,
                            borderRadius: borderRadius[4],
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'opacity 0.2s ease',
                            flexShrink: 0,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '0.8';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '1';
                          }}
                        >
                          <CloseSmall color={colors.blackAndWhite.black900} />
                        </div>
                      </div>
                    </div>

                    {/* Line separator between files (not after the last one) */}
                    {index < uploadedFiles.length - 1 && (
                      <div style={{
                        height: '1px',
                        backgroundColor: colors.contracts.dynamic.yellow400,
                        margin: `${spacing[2]} 0`,
                      }} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={actionsContainerStyles}>
          <button
            style={cancelButtonStyles}
            onClick={() => onNavigateToPage?.('contracts-transactions')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.blackAndWhite.black100;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Cancel
          </button>

          <Button
            variant="primary"
            color="black"
            onClick={handleContinue}
            disabled={uploadedFiles.length === 0}
            showIcon={false}
          >
            {uploadedFiles.length > 0 ? 'START EXTRACTING' : 'CONTINUE'}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <ThemeProvider initialTheme="contracts">
      <Layout
        selectedSidebarItem="contracts"
        selectedSidebarSubitem="upload"
        onNavigate={createPageNavigationHandler(onNavigateToPage || (() => {}), 'contracts-upload')}
        breadcrumbs={breadcrumbs}
      >
        <PageContent />
      </Layout>
    </ThemeProvider>
  );
};
