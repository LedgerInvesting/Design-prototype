import React, { useState, useRef } from 'react';
import { Layout } from '@design-library/pages';
import type { BreadcrumbItem } from '@design-library/pages';
import { Button, StatusCell, ButtonSelector, FormDropdown, Status, colors } from '@design-library/components';
import { typography, spacing, borderRadius, shadows, useSemanticColors, ThemeProvider } from '@design-library/tokens';
import { createPageNavigationHandler, createBreadcrumbs } from '@design-library/utils/navigation';
import { DocumentMedium, CloseSmall, CloseMedium } from '@design-library/icons';

interface ReportsBDXDetailMappingProps {
  onNavigateToPage?: (page: string, data?: any) => void;
  transactionData?: { transactionName?: string; dataDetailLevel?: string };
}

interface UploadedFile {
  file: File;
  pageCount: number;
  status: 'processing' | 'done';
}

export const ReportsBDXDetailMapping: React.FC<ReportsBDXDetailMappingProps> = ({ onNavigateToPage, transactionData }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [selectedSheet, setSelectedSheet] = useState<string>('');

  const transactionName = transactionData?.transactionName || 'Commercial Auto Specialty Lines Q1';

  // Determine if this is detail or aggregated configuration from the passed data
  const dataDetailLevel = transactionData?.dataDetailLevel || 'detail';
  const isDetailMapping = dataDetailLevel.toLowerCase() === 'detail';
  const configurationType = isDetailMapping ? 'detail' : 'aggregated';

  const handleFileSelect = (file: File) => {
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.xlsx') || file.name.endsWith('.csv') || file.name.endsWith('.xls'))) {
      // Simulate page count
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
      alert('Please upload a PDF, Excel, or CSV file');
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

  // Financial data mapping based on transaction
  const getFinancialData = (transactionName: string) => {
    // Map transactions to different financial data sets
    const dataMapping: { [key: string]: any } = {
      'Commercial Auto Specialty Lines Q1': {
        grossWrittenPremium: 12500000.00,
        cededBasisPremium: 4812500.00,
        quotaShareCededBasisPremium: 3850000.00,
        cedingCommission: 721875.00,
        netCededBasicPremium: 4090625.00,
        paidLoss: 1636249.00,
        profitCommission: 24537.76,
        brokerageFee: 19250.00,
        totalCededToTrust: 5776661.76
      },
      'Commercial Auto Specialty Lines Q2': {
        grossWrittenPremium: 7800000.00,
        cededBasisPremium: 2736000.00,
        quotaShareCededBasisPremium: 1688000.00,
        cedingCommission: 382080.00,
        netCededBasicPremium: 2353920.00,
        paidLoss: 1176960.00,
        profitCommission: 11769.60,
        brokerageFee: 58800.00,
        totalCededToTrust: 3606549.60
      },
      'Commercial Auto Specialty Lines Q3': {
        grossWrittenPremium: 22300000.00,
        cededBasisPremium: 11165000.00,
        quotaShareCededBasisPremium: 5974520.00,
        cedingCommission: 2233000.00,
        netCededBasicPremium: 8932000.00,
        paidLoss: 3572800.00,
        profitCommission: 53592.00,
        brokerageFee: 33495.00,
        totalCededToTrust: 12531887.00
      },
      'Commercial Auto Specialty Lines Q4': {
        grossWrittenPremium: 4150000.00,
        cededBasisPremium: 1796750.00,
        quotaShareCededBasisPremium: 1080000.00,
        cedingCommission: 251575.00,
        netCededBasicPremium: 1545175.00,
        paidLoss: 693056.00,
        profitCommission: 8846.19,
        brokerageFee: 26951.00,
        totalCededToTrust: 2334028.19
      }
    };

    // Default to Echo Re data if transaction not found
    const defaultData = {
      grossWrittenPremium: 15600000.00,
      cededBasisPremium: 8196000.00,
      quotaShareCededBasisPremium: 6147000.00,
      cedingCommission: 1475280.00,
      netCededBasicPremium: 6720720.00,
      paidLoss: 2692288.00,
      profitCommission: 40243.43,
      brokerageFee: 14322.00,
      totalCededToTrust: 9474573.43
    };

    return dataMapping[transactionName] || defaultData;
  };

  const handleContinue = () => {
    if (uploadedFiles.length > 0 && onNavigateToPage) {
      const financialData = getFinancialData(transactionName);

      // Navigate to cession statement with transaction data
      onNavigateToPage('reports-cession-statement', {
        id: transactionName.toLowerCase().replace(/\s+/g, '-'),
        name: transactionName,
        type: 'Program',
        path: transactionName,
        source: 'bdx-upload',
        flowType: 'detail',
        financialData: financialData
      });
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
      backgroundColor: colors.theme.primary200,
      borderRadius: borderRadius[12],
      padding: spacing[10],
      marginBottom: spacing[12],
    };

    // Upload area styles
    const uploadAreaStyles: React.CSSProperties = {
      backgroundColor: colors.blackAndWhite.white,
      borderRadius: borderRadius[12],
      height: '184px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing[4],
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: isDragging ? `2px dashed ${colors.theme.primary700}` : `1px solid ${colors.theme.primary400}`,
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

    // Upload text styles
    const uploadTextStyles: React.CSSProperties = {
      ...typography.styles.bodyL,
      color: colors.blackAndWhite.black900,
    };

    const browseTextStyles: React.CSSProperties = {
      ...typography.styles.bodyL,
      color: colors.theme.main,
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
          <span style={subtitleStyles}>Data Mapping Tool. Upload your Excel files and configure data requirements for </span>
          <span style={titleStyles}>Sep 2025</span>
          <span style={subtitleStyles}>.</span>
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
              {/* Excel icon in bottom-left corner */}
              <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                width: '20px',
                height: '17px',
              }}>
                <img
                  src="/excel.png"
                  alt="Excel"
                  style={{ width: '20px', height: '17px' }}
                />
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
              accept=".xlsx,.csv,.xls,.pdf"
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
          </div>

          {/* Uploaded Files List - Inside same box */}
          {uploadedFiles.length > 0 && (
            <div style={{ marginTop: spacing[10] }}>
              <div>
                {uploadedFiles.map((uploadedFile, index) => {
                  // Calculate file size in KB
                  const fileSizeKB = (uploadedFile.file.size / 1024).toFixed(2);
                  // Simulate sheets count (would come from actual file parsing)
                  const sheetsCount = Math.floor(Math.random() * 5) + 1;

                  return (
                    <React.Fragment key={index}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 30px',
                          backgroundColor: colors.blackAndWhite.white,
                          border: `1px solid ${colors.theme.primary400}`,
                          borderRadius: borderRadius[12],
                          marginBottom: index < uploadedFiles.length - 1 ? spacing[4] : 0,
                        }}
                      >
                        {/* Left section: Icon + File Name + File Info */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: spacing[2],
                          flex: 1,
                          minWidth: 0, // Allow text truncation
                        }}>
                          {/* Excel Icon */}
                          <div style={{
                            width: '28px',
                            height: '24px',
                            flexShrink: 0,
                          }}>
                            <img
                              src="/excel.png"
                              alt="Excel"
                              style={{ width: '28px', height: '24px' }}
                            />
                          </div>

                          {/* File Name */}
                          <div style={{
                            ...typography.styles.bodyM,
                            color: colors.blackAndWhite.black900,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            marginRight: spacing[2],
                          }}>
                            {uploadedFile.file.name}
                          </div>

                          {/* File Size and Sheets Info */}
                          <div style={{
                            ...typography.styles.bodyS,
                            color: colors.blackAndWhite.black500,
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                          }}>
                            {fileSizeKB} KB • {sheetsCount} sheet{sheetsCount > 1 ? 's' : ''}
                          </div>
                        </div>

                        {/* Remove Button - Icon Button with primary200 background */}
                        <Button
                          variant="icon"
                          color="primary200"
                          icon={<CloseMedium color={colors.blackAndWhite.black900} />}
                          onClick={() => handleRemoveFile(uploadedFile.file)}
                          shape="square"
                        />
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Aggregated Configuration Box - Only show when files are uploaded */}
        {uploadedFiles.length > 0 && (
          <div style={{
            backgroundColor: colors.theme.primary200,
            borderRadius: borderRadius[12],
            padding: spacing[10],
            marginBottom: spacing[12],
          }}>
            {/* Title */}
            <h3 style={{
              ...typography.styles.headlineH3,
              color: colors.blackAndWhite.black900,
              marginBottom: spacing[2],
            }}>
              Aggregated Configuration
            </h3>

            {/* Borderaux Info */}
            <div style={{
              ...typography.styles.bodyM,
              marginBottom: spacing[8],
            }}>
              <span style={{ color: colors.blackAndWhite.black500 }}>Borderaux type - </span>
              <span style={{ color: colors.blackAndWhite.black900 }}>Claim</span>
              <span style={{ color: colors.blackAndWhite.black500 }}> Upload mode - </span>
              <span style={{ color: colors.blackAndWhite.black900 }}>Incremental</span>
              <span style={{ color: colors.blackAndWhite.black500 }}> Data layout - </span>
              <span style={{ color: colors.blackAndWhite.black900 }}>Snapshot</span>
              <span style={{ color: colors.blackAndWhite.black500 }}> Data detail level - </span>
              <span style={{ color: colors.blackAndWhite.black900 }}>{configurationType.charAt(0).toUpperCase() + configurationType.slice(1)}</span>
            </div>

            {/* White inner box */}
            <div style={{
              backgroundColor: colors.blackAndWhite.white,
              border: `1px solid ${colors.theme.primary400}`,
              borderRadius: borderRadius[8],
              padding: '24px',
            }}>
              {/* Premium Title */}
              <div style={{
                marginBottom: '24px',
              }}>
                <h4 style={{
                  ...typography.styles.bodyL,
                  color: colors.blackAndWhite.black900,
                  margin: '0',
                }}>
                  Premium
                </h4>
              </div>

              {/* Dropdowns - Select File and Select Excel Sheet */}
              <div style={{
                display: 'flex',
                gap: '12px',
                width: '100%',
                marginBottom: '24px',
              }}>
                {/* Select File Dropdown */}
                <div style={{ flex: 1 }}>
                  <FormDropdown
                    label="Select File"
                    value={selectedFile}
                    onChange={(value) => setSelectedFile(value)}
                    options={uploadedFiles.map(f => ({
                      value: f.file.name,
                      label: f.file.name
                    }))}
                    placeholder="Choose a file"
                  />
                </div>

                {/* Select Excel Sheet Dropdown */}
                <div style={{ flex: 1 }}>
                  <FormDropdown
                    label="Select Excel Sheet"
                    value={selectedSheet}
                    onChange={(value) => setSelectedSheet(value)}
                    options={[
                      { value: 'sheet1', label: 'Sheet 1' },
                      { value: 'sheet2', label: 'Sheet 2' },
                      { value: 'sheet3', label: 'Sheet 3' },
                      { value: 'sheet4', label: 'Sheet 4' },
                      { value: 'sheet5', label: 'Sheet 5' },
                    ]}
                    placeholder="Choose a sheet"
                  />
                </div>
              </div>

              {/* Add File Mapping Button */}
              <Button
                variant="tertiary"
                color="black"
                onClick={() => console.log('Add file mapping clicked')}
                showIcon={false}
                style={{ width: '100%' }}
              >
                ADD FILE MAPPING
              </Button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={actionsContainerStyles}>
          <Button
            variant="primary"
            color="black"
            onClick={handleContinue}
            disabled={uploadedFiles.length === 0}
            showIcon={false}
          >
            SAVE
          </Button>
        </div>
      </div>
    );
  };

  // Create tags for FormTopNav
  const formTags = [
    <div key="config-tag" style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '3px',
      padding: '0 5px',
      backgroundColor: configurationType === 'detail'
        ? colors.analytics.green600
        : colors.reports.dynamic.blue200,
      borderRadius: borderRadius[4],
      height: '20px',
      fontFamily: typography.styles.bodyS.fontFamily.join(', '),
      fontSize: typography.styles.bodyS.fontSize,
      fontWeight: typography.styles.bodyS.fontWeight,
      lineHeight: typography.styles.bodyS.lineHeight,
      letterSpacing: typography.letterSpacing.wide,
      color: colors.blackAndWhite.black700,
      whiteSpace: 'nowrap' as const,
    }}>
      {configurationType.charAt(0).toUpperCase() + configurationType.slice(1)}
    </div>
  ];

  return (
    <ThemeProvider initialTheme="reports">
      <Layout
        formMode={true}
        formTitle="BDX upload flow"
        formTags={formTags}
        showSidebarToggle={false}
        backButtonText="Close"
        pageType="reports-bdx-detail-mapping"
        selectedSidebarItem="reports"
        selectedSidebarSubitem="bdx-upload"
        onNavigate={createPageNavigationHandler(onNavigateToPage || (() => { }), 'reports-bdx-detail-mapping')}
        onBackClick={() => {
          // Navigate back to transaction dashboard (will open BDX Upload tab)
          onNavigateToPage?.('transaction-dashboard', transactionData);
        }}
      >
        <PageContent />
      </Layout>
    </ThemeProvider>
  );
};
