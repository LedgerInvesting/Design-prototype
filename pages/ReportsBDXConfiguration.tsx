import React, { useState } from 'react';
import { Layout } from '@design-library/pages';
import { Button, colors, typography, useSemanticColors } from '@design-library/components';
import { createPageNavigationHandler, createBreadcrumbs, type NavigationHandler } from '@design-library/utils/navigation';

interface ReportsBDXConfigurationProps {
  onNavigateToPage?: NavigationHandler;
  uploadData?: {
    fileName?: string;
    documentType?: string;
    month?: string;
    year?: string;
  };
}

export const ReportsBDXConfiguration: React.FC<ReportsBDXConfigurationProps> = ({
  onNavigateToPage,
  uploadData
}) => {
  const semanticColors = useSemanticColors();

  // Create navigation handler
  const navigationHandler = onNavigateToPage
    ? createPageNavigationHandler(onNavigateToPage, 'reports-bdx-configuration')
    : undefined;

  // Create breadcrumbs with back navigation to BDX Upload
  const breadcrumbs = onNavigateToPage
    ? [
        { label: 'Reports', isActive: false },
        { label: 'BDX Upload', onClick: () => onNavigateToPage('reports-bdx-upload'), isActive: false },
        { label: 'Configure Bordereau', isActive: true }
      ]
    : [
        { label: 'Reports' },
        { label: 'BDX Upload' },
        { label: 'Configure Bordereau' }
      ];

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      pageType="reports-bdx-configuration"
      onNavigate={navigationHandler}
      isSubPage={true}
      onBackClick={() => {
        if (onNavigateToPage) {
          onNavigateToPage('reports-bdx-upload');
        }
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
      }}>
        {/* Header Section */}
        <div>
          <h2 style={{
            ...typography.styles.headlineH2,
            color: semanticColors.blackAndWhite.black900,
            margin: '0 0 12px 0',
          }}>
            Configure Bordereau Upload
          </h2>
          <p style={{
            ...typography.styles.bodyL,
            color: semanticColors.blackAndWhite.black500,
            margin: 0,
          }}>
            {uploadData?.fileName
              ? `Configure your ${uploadData.documentType} bordereau for ${uploadData.month} ${uploadData.year}`
              : 'Configure your bordereau upload settings and validate data'
            }
          </p>
        </div>

        {/* Placeholder content */}
        <div style={{
          padding: '40px',
          backgroundColor: semanticColors.theme.primary200,
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <p style={{
            ...typography.styles.bodyL,
            color: semanticColors.blackAndWhite.black700,
            margin: 0
          }}>
            Configuration page content will go here
          </p>
        </div>
      </div>
    </Layout>
  );
};
