import React, { useState } from 'react';
import { Layout } from '@design-library/pages';
import { Button, Table } from '@design-library/components';
import { colors, typography, borderRadius } from '@design-library/tokens';
import { ThemeProvider, useSemanticColors } from '@design-library/tokens/ThemeProvider';
import { AddMedium, DownloadSmall, AddSmall } from '@design-library/icons';
import { UploadTrianglesModal } from './UploadTrianglesModal';

interface ValuationStatusProps {
  onNavigateToPage: (page: string) => void;
  programName?: string;
}

// Custom StatusCheck component matching the dashboard design
const TriangleStatusCheck: React.FC<{ color: string }> = ({ color }) => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.7998 8.27778L7.94266 10.5L11.7998 6.5" stroke={color} strokeWidth="2"/>
    <circle cx="8.7998" cy="8.5" r="7.5" stroke={color} strokeWidth="2"/>
  </svg>
);

// Triangle status component matching the design
const TriangleStatus: React.FC<{ status: 'completed' | 'add'; color: string }> = ({ status, color }) => {
  const colors = useSemanticColors();

  if (status === 'add') {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '20px',
        backgroundColor: colors.blackAndWhite.black100,
        borderRadius: '4px',
        fontSize: '10px',
        color: colors.blackAndWhite.black500,
        fontFamily: 'Söhne, system-ui, sans-serif',
        fontWeight: 500,
      }}>
        Add
      </div>
    );
  }

  return <TriangleStatusCheck color={color} />;
};

// Status indicator for official valuation
const StatusIndicator: React.FC<{ status: 'reviewed' | 'pending' | 'none' }> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'reviewed': return '#74efa3';
      case 'pending': return '#ffdd61';
      case 'none': return '#e1eae5';
      default: return '#e1eae5';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'reviewed': return 'Reviewed and approved';
      case 'pending': return 'Pending review';
      case 'none': return 'No Valuation Run';
      default: return 'No Valuation Run';
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: getStatusColor(),
      }} />
      <span style={{
        fontFamily: 'Söhne, system-ui, sans-serif',
        fontSize: '12px',
        fontWeight: 500,
        color: '#17211b',
      }}>
        {getStatusText()}
      </span>
    </div>
  );
};

const ValuationStatusContent: React.FC<ValuationStatusProps> = ({
  onNavigateToPage,
  programName = 'XPT Commercial Auto TY23'
}) => {
  const colors = useSemanticColors();
  const [activeTab, setActiveTab] = useState('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Sample data for the table
  const tableData = [
    {
      id: '1',
      evaluationDate: 'Jan 30, 2025',
      triangles: 'triangles',
      triangleData: [
        { status: 'completed' as const, color: '#BD8B11' },
        { status: 'add' as const, color: '#744DEB' },
        { status: 'add' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'reviewed' as const,
      action: 'generate'
    },
    {
      id: '2',
      evaluationDate: 'Jan 30, 2025',
      triangles: 'triangles',
      triangleData: [
        { status: 'completed' as const, color: '#BD8B11' },
        { status: 'completed' as const, color: '#744DEB' },
        { status: 'completed' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'reviewed' as const,
      action: 'generate'
    },
    {
      id: '3',
      evaluationDate: 'Jan 30, 2025',
      triangles: 'triangles',
      triangleData: [
        { status: 'completed' as const, color: '#BD8B11' },
        { status: 'completed' as const, color: '#744DEB' },
        { status: 'completed' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'pending' as const,
      action: 'generate'
    },
    {
      id: '4',
      evaluationDate: 'Jan 30, 2025',
      triangles: 'triangles',
      triangleData: [
        { status: 'completed' as const, color: '#BD8B11' },
        { status: 'add' as const, color: '#744DEB' },
        { status: 'add' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'pending' as const,
      action: 'generate'
    },
    {
      id: '5',
      evaluationDate: 'Jan 30, 2025',
      triangles: 'triangles',
      triangleData: [
        { status: 'completed' as const, color: '#BD8B11' },
        { status: 'completed' as const, color: '#744DEB' },
        { status: 'completed' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'none' as const,
      action: 'upload'
    },
    {
      id: '6',
      evaluationDate: 'Jan 30, 2025',
      triangles: 'triangles',
      triangleData: [
        { status: 'add' as const, color: '#BD8B11' },
        { status: 'add' as const, color: '#744DEB' },
        { status: 'add' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'none' as const,
      action: 'validate'
    },
    {
      id: '7',
      evaluationDate: 'Jan 30, 2025',
      triangles: 'triangles',
      triangleData: [
        { status: 'add' as const, color: '#BD8B11' },
        { status: 'add' as const, color: '#744DEB' },
        { status: 'completed' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'none' as const,
      action: 'generate'
    }
  ];

  const columns = [
    {
      key: 'evaluationDate',
      title: 'Evaluation Date',
      cellType: 'simple' as const,
      width: 150
    },
    {
      key: 'triangles',
      title: 'Triangles',
      cellType: 'simple' as const,
      width: 180,
      render: (value: any, row: any) => (
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '8px 0'
        }}>
          {row.triangleData.map((triangle: any, index: number) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '30px',
              }}
            >
              <TriangleStatus
                status={triangle.status}
                color={triangle.color}
              />
            </div>
          ))}
        </div>
      )
    },
    {
      key: 'officialStatus',
      title: 'Official valuation',
      cellType: 'simple' as const,
      width: 220,
      render: (value: any) => <StatusIndicator status={value} />
    },
    {
      key: 'action',
      title: 'Actions',
      cellType: 'action' as const,
      width: 180,
      onAction: (actionType, text) => {
        console.log('Action clicked:', actionType, text);
        // Handle different actions here
        switch (actionType) {
          case 'upload':
            console.log('Upload action for:', text);
            break;
          case 'validate':
            console.log('Validate action for:', text);
            break;
          case 'generate':
            console.log('Generate action for:', text);
            break;
          case 'setup':
            console.log('Setup action for:', text);
            break;
          default:
            console.log('Unknown action:', actionType);
        }
      }
    }
  ];

  return (
    <Layout
      selectedSidebarItem="analytics"
      selectedSidebarSubitem="valuation"
      onNavigate={(itemId, subitemId) => {
        if (itemId === 'analytics' && subitemId === 'valuation') {
          onNavigateToPage('analytics-valuation');
        } else if (itemId === 'reports') {
          if (subitemId === 'transactions') {
            onNavigateToPage('transaction-management');
          } else if (subitemId === 'insights-explorer') {
            onNavigateToPage('report-navigation');
          }
        } else if (itemId === 'contracts') {
          onNavigateToPage('contracts-explorer');
        }
      }}
      breadcrumbs={[
        { label: 'Valuation', onClick: () => onNavigateToPage?.('analytics-valuation'), isActive: false },
        { label: programName, onClick: () => onNavigateToPage?.('valuation-dashboard'), isActive: false },
        { label: 'Valuation Status', isActive: true }
      ]}
    >
      {/* Header Section */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '40px',
      }}>
        <div>
          <h1 style={{
            ...typography.styles.headlineH2,
            color: colors.blackAndWhite.black900,
            margin: '0 0 8px 0',
            lineHeight: '1.2',
          }}>
            <span style={{ color: colors.blackAndWhite.black500 }}>You're now viewing all Valuation Status of </span>
            <span>{programName}</span>
            <span>.</span>
          </h1>
        </div>

        {/* Add New Button */}
        <Button
          variant="primary"
          color="black"
          icon={<AddMedium color={colors.theme.primary700} />}
          onClick={() => setIsUploadModalOpen(true)}
          style={{
            minWidth: '240px',
          }}
        >
          Add New Valuation Data
        </Button>
      </div>

      {/* Table */}
      <div style={{ marginBottom: '20px' }}>
        <Table
          columns={columns}
          data={tableData}
          showHeader={true}
          showTabs={false}
          showPagination={true}
          paginationPosition="footer"
          activeTab={activeTab}
          onTabChange={setActiveTab}
          recordsInfo="10 of 60 Policy groups"
        />
      </div>

      {/* Triangle Legend */}
      <div style={{
        display: 'flex',
        gap: '30px',
        alignItems: 'center',
        padding: '20px 0',
        borderTop: `1px solid ${colors.theme.primary400}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            border: '2px solid #BD8B11',
            backgroundColor: 'transparent',
          }} />
          <span style={{
            fontFamily: 'Söhne, system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: colors.blackAndWhite.black500,
          }}>
            On risk triangle (Accident-quarter)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            border: '2px solid #744DEB',
            backgroundColor: 'transparent',
          }} />
          <span style={{
            fontFamily: 'Söhne, system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: colors.blackAndWhite.black500,
          }}>
            Loss Development triangle (Accident-quarter)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            border: '2px solid #3DA3CB',
            backgroundColor: 'transparent',
          }} />
          <span style={{
            fontFamily: 'Söhne, system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: colors.blackAndWhite.black500,
          }}>
            Policy-Year triangle
          </span>
        </div>
      </div>

      {/* Upload Triangles Modal */}
      <UploadTrianglesModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        programName={programName}
      />
    </Layout>
  );
};

export const ValuationStatus: React.FC<ValuationStatusProps> = (props) => {
  return (
    <ThemeProvider initialTheme="analytics">
      <ValuationStatusContent {...props} />
    </ThemeProvider>
  );
};