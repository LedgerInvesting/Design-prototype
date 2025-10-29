import React from 'react';
import { borderRadius, useSemanticColors, typography, shadows } from '../tokens';
import { DownloadMedium, CloseMedium } from '../icons';

export interface FileUploadBoxProps {
  /** Selected file (if any) */
  selectedFile?: File | null;
  /** Callback when file is selected */
  onFileSelect: (file: File) => void;
  /** Callback when file is removed */
  onFileRemove?: () => void;
  /** Accepted file types (e.g., '.pdf', '.xlsx,.csv,.xls') */
  acceptedFileTypes?: string;
  /** Whether to show the file preview when selected */
  showFilePreview?: boolean;
  /** Custom width (default: '100%') */
  width?: string;
  /** Custom height for upload area (default: 'auto') */
  height?: string;
  /** Minimum height (default: '99px') */
  minHeight?: string;
  /** Custom placeholder text */
  placeholderText?: string;
  /** Override theme colors (for use in portals where context doesn't work) */
  themeColors?: {
    primary400?: string;
    primary200?: string;
  };
}

/**
 * FileUploadBox Component
 *
 * A reusable file upload box with drag & drop functionality.
 * Adapts width to container and displays selected file with preview.
 *
 * @example
 * ```tsx
 * <FileUploadBox
 *   selectedFile={file}
 *   onFileSelect={(file) => setFile(file)}
 *   onFileRemove={() => setFile(null)}
 *   acceptedFileTypes=".pdf"
 * />
 * ```
 */
export const FileUploadBox: React.FC<FileUploadBoxProps> = ({
  selectedFile,
  onFileSelect,
  onFileRemove,
  acceptedFileTypes = '*',
  showFilePreview = true,
  width = '100%',
  height = 'auto',
  minHeight = '99px',
  placeholderText = 'Drop File here to get started or',
  themeColors,
}) => {
  const colors = useSemanticColors();

  // Use theme override colors if provided, otherwise use context colors
  const borderColor = themeColors?.primary400 || colors.theme.primary400;
  const closeButtonBg = themeColors?.primary200 || colors.theme.primary200;

  const handleBrowseClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = acceptedFileTypes;
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) onFileSelect(file);
    };
    input.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };

  // Show file preview if file is selected and preview is enabled
  if (selectedFile && showFilePreview) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        border: `2px dashed ${borderColor}`,
        borderRadius: borderRadius[8],
        backgroundColor: colors.blackAndWhite.white,
        padding: '12px',
        gap: '12px',
        width: width,
      }}>
        {/* Document illustration SVG */}
        <div style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: `drop-shadow(${shadows.small})`,
        }}>
          <svg width="50" height="70" viewBox="0 0 54 71" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="54" height="71" rx="6" fill="white" />
            <rect x="5.05542" y="9.94844" width="23.6641" height="2" fill="#DFDFDF"/>
            <rect x="5.39526" y="20.1315" width="28.4272" height="2" fill="#DFDFDF"/>
            <rect x="5.39526" y="32.3512" width="28.4272" height="2" fill="#DFDFDF"/>
            <rect x="5.39526" y="40.328" width="28.4272" height="2" fill="#DFDFDF"/>
            <rect x="5.39526" y="55.1482" width="15.377" height="2" fill="#DFDFDF"/>
            <rect x="5.39526" y="59.0518" width="5.02344" height="2" fill="#DFDFDF"/>
            <rect x="12.0144" y="59.0518" width="5.02344" height="2" fill="#DFDFDF"/>
            <rect x="48.9441" y="26.2047" width="28.4272" height="2" transform="rotate(-180 48.9441 26.2047)" fill="#DFDFDF"/>
            <rect x="48.9441" y="38.4244" width="28.4272" height="2" transform="rotate(-180 48.9441 38.4244)" fill="#DFDFDF"/>
            <rect x="48.9441" y="30.6174" width="12.4375" height="2" transform="rotate(-180 48.9441 30.6174)" fill="#DFDFDF"/>
            <rect x="36.3875" y="20.1315" width="12.5572" height="2" fill="#DFDFDF"/>
            <rect x="36.3875" y="32.3512" width="12.5572" height="2" fill="#DFDFDF"/>
            <rect x="17.9519" y="26.2047" width="12.5572" height="2" transform="rotate(-180 17.9519 26.2047)" fill="#DFDFDF"/>
            <rect x="17.9519" y="38.4244" width="12.5572" height="2" transform="rotate(-180 17.9519 38.4244)" fill="#DFDFDF"/>
            <rect x="17.9519" y="30.6174" width="12.5572" height="2" transform="rotate(-180 17.9519 30.6174)" fill="#DFDFDF"/>
            <rect x="33.2429" y="30.6174" width="12.5572" height="2" transform="rotate(-180 33.2429 30.6174)" fill="#DFDFDF"/>
          </svg>
        </div>

        {/* Filename in the center */}
        <div style={{
          flex: 1,
          ...typography.styles.bodyM,
          color: colors.blackAndWhite.black900,
          fontWeight: typography.fontWeight.medium,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {selectedFile.name}
        </div>

        {/* Close button on the right */}
        {onFileRemove && (
          <div
            style={{
              flexShrink: 0,
              width: '26px',
              height: '26px',
              backgroundColor: closeButtonBg,
              borderRadius: borderRadius[4],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onFileRemove();
            }}
          >
            <CloseMedium color={colors.blackAndWhite.black700} />
          </div>
        )}
      </div>
    );
  }

  // Show upload area if no file is selected or preview is disabled
  return (
    <div
      style={{
        border: `1px dashed ${borderColor}`,
        borderRadius: borderRadius[12],
        padding: '30px',
        textAlign: 'center',
        backgroundColor: colors.blackAndWhite.white,
        cursor: 'pointer',
        width: width,
        height: height,
        minHeight: minHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '13px',
        boxSizing: 'border-box',
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
        {placeholderText}{' '}
        <span
          style={{
            color: colors.blackAndWhite.black900,
            cursor: 'pointer',
            textDecoration: 'underline',
            textUnderlinePosition: 'from-font'
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleBrowseClick();
          }}
        >
          browse
        </span>
      </div>
    </div>
  );
};

export default FileUploadBox;
