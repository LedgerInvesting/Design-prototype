import React, { useState } from 'react';
import { Layout } from '@design-library/pages';
import { Button, Table, shadows } from '@design-library/components';
import { colors, typography, borderRadius } from '@design-library/tokens';
import { ThemeProvider, useSemanticColors } from '@design-library/tokens/ThemeProvider';
import { AddMedium, CalendarTable, TextTable, StatusProgressTable } from '@design-library/icons';
import { UploadTrianglesModal } from './UploadTrianglesModal';
import { AddTriangleModal } from './AddTriangleModal';
import { createPageNavigationHandler } from '@design-library/utils/navigation';

interface ValuationStatusProps {
  onNavigateToPage: (page: string) => void;
  programName?: string;
}

/**
 * Triangle Status Check Icon
 *
 * Custom check icon for completed triangles.
 * Sized at 19x19px to match the table design.
 */
const TriangleStatusCheck: React.FC<{ color: string }> = ({ color }) => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.7998 9.27778L8.94266 11.5L12.7998 7.5" stroke={color} strokeWidth="2"/>
    <circle cx="9.7998" cy="9.5" r="7.5" stroke={color} strokeWidth="2"/>
  </svg>
);

/**
 * Triangle Status Component
 *
 * Displays the status of triangle uploads in the table.
 * - 'completed': Shows check icon (reviewed and approved)
 * - 'pending-review': Shows animated progress icon (uploaded but needs review)
 * - 'add': Shows "Add" button to upload a new triangle
 */
const TriangleStatus: React.FC<{ status: 'completed' | 'add' | 'pending-review'; color: string; onClick?: () => void }> = ({ status, color, onClick }) => {
  const colors = useSemanticColors();

  if (status === 'add') {
    return (
      <Button
        variant="small"
        color="white"
        showIcon={false}
        onClick={onClick}
        style={{
          boxShadow: shadows.small,
          transform: 'scale(1)',
          transition: 'transform 0.2s ease',
        }}
      >
        Add
      </Button>
    );
  }

  if (status === 'pending-review') {
    return <StatusProgressTable color={color} />;
  }

  return <TriangleStatusCheck color={color} />;
};

// Status indicator for official valuation
const StatusIndicator: React.FC<{ status: 'reviewed' | 'pending' | 'none' }> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'reviewed': return '#74efa3';
      case 'pending': return '#ffdd61';
      case 'none': return '#ff8588';
      default: return '#ff8588';
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
  const [selectedTriangleType, setSelectedTriangleType] = useState<'on-risk-aqt' | 'development-fit' | 'on-risk-pyt' | null>(null);
  const [currentRowId, setCurrentRowId] = useState<string | null>(null);
  const [currentTriangleIndex, setCurrentTriangleIndex] = useState<number | null>(null);

  // Customize columns state - start with all data columns visible (excluding first column)
  const [visibleColumns, setVisibleColumns] = useState([
    'triangles',
    'officialStatus',
  ]);

  // Sample data for the table
  const [tableData, setTableData] = useState([
    {
      id: '1',
      evaluationDate: 'Dec 31, 2024',
      triangles: 'triangles',
      triangleData: [
        { status: 'completed' as const, color: '#BD8B11' },
        { status: 'completed' as const, color: '#744DEB' },
        { status: 'completed' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'reviewed' as const,
      action: 'download'
    },
    {
      id: '2',
      evaluationDate: 'Nov 30, 2024',
      triangles: 'triangles',
      triangleData: [
        { status: 'completed' as const, color: '#BD8B11' },
        { status: 'completed' as const, color: '#744DEB' },
        { status: 'completed' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'reviewed' as const,
      action: 'download'
    },
    {
      id: '3',
      evaluationDate: 'Oct 31, 2024',
      triangles: 'triangles',
      triangleData: [
        { status: 'completed' as const, color: '#BD8B11' },
        { status: 'completed' as const, color: '#744DEB' },
        { status: 'completed' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'reviewed' as const,
      action: 'download'
    },
    {
      id: '4',
      evaluationDate: 'Sep 30, 2024',
      triangles: 'triangles',
      triangleData: [
        { status: 'completed' as const, color: '#BD8B11' },
        { status: 'completed' as const, color: '#744DEB' },
        { status: 'add' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'pending' as const,
      action: 'download'
    },
    {
      id: '5',
      evaluationDate: 'Aug 31, 2024',
      triangles: 'triangles',
      triangleData: [
        { status: 'completed' as const, color: '#BD8B11' },
        { status: 'add' as const, color: '#744DEB' },
        { status: 'add' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'pending' as const,
      action: 'download'
    },
    {
      id: '6',
      evaluationDate: 'Jul 31, 2024',
      triangles: 'triangles',
      triangleData: [
        { status: 'completed' as const, color: '#BD8B11' },
        { status: 'completed' as const, color: '#744DEB' },
        { status: 'add' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'none' as const,
      action: 'run-valuation'
    },
    {
      id: '7',
      evaluationDate: 'Jun 30, 2024',
      triangles: 'triangles',
      triangleData: [
        { status: 'completed' as const, color: '#BD8B11' },
        { status: 'add' as const, color: '#744DEB' },
        { status: 'add' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'none' as const,
      action: 'run-valuation'
    },
    {
      id: '8',
      evaluationDate: 'May 31, 2024',
      triangles: 'triangles',
      triangleData: [
        { status: 'add' as const, color: '#BD8B11' },
        { status: 'add' as const, color: '#744DEB' },
        { status: 'add' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'none' as const,
      action: 'add-data'
    },
    {
      id: '9',
      evaluationDate: 'Apr 30, 2024',
      triangles: 'triangles',
      triangleData: [
        { status: 'completed' as const, color: '#BD8B11' },
        { status: 'completed' as const, color: '#744DEB' },
        { status: 'completed' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'reviewed' as const,
      action: 'download'
    },
    {
      id: '10',
      evaluationDate: 'Mar 31, 2024',
      triangles: 'triangles',
      triangleData: [
        { status: 'completed' as const, color: '#BD8B11' },
        { status: 'add' as const, color: '#744DEB' },
        { status: 'completed' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'pending' as const,
      action: 'download'
    },
    {
      id: '11',
      evaluationDate: 'Feb 28, 2024',
      triangles: 'triangles',
      triangleData: [
        { status: 'add' as const, color: '#BD8B11' },
        { status: 'add' as const, color: '#744DEB' },
        { status: 'completed' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'none' as const,
      action: 'run-valuation'
    },
    {
      id: '12',
      evaluationDate: 'Jan 31, 2024',
      triangles: 'triangles',
      triangleData: [
        { status: 'completed' as const, color: '#BD8B11' },
        { status: 'completed' as const, color: '#744DEB' },
        { status: 'add' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'pending' as const,
      action: 'download'
    },
    {
      id: '13',
      evaluationDate: 'Dec 31, 2023',
      triangles: 'triangles',
      triangleData: [
        { status: 'completed' as const, color: '#BD8B11' },
        { status: 'completed' as const, color: '#744DEB' },
        { status: 'completed' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'reviewed' as const,
      action: 'download'
    },
    {
      id: '14',
      evaluationDate: 'Nov 30, 2023',
      triangles: 'triangles',
      triangleData: [
        { status: 'add' as const, color: '#BD8B11' },
        { status: 'completed' as const, color: '#744DEB' },
        { status: 'completed' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'pending' as const,
      action: 'download'
    },
    {
      id: '15',
      evaluationDate: 'Oct 31, 2023',
      triangles: 'triangles',
      triangleData: [
        { status: 'completed' as const, color: '#BD8B11' },
        { status: 'completed' as const, color: '#744DEB' },
        { status: 'completed' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'reviewed' as const,
      action: 'download'
    },
    {
      id: '16',
      evaluationDate: 'Sep 30, 2023',
      triangles: 'triangles',
      triangleData: [
        { status: 'add' as const, color: '#BD8B11' },
        { status: 'add' as const, color: '#744DEB' },
        { status: 'add' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'none' as const,
      action: 'add-data'
    },
    {
      id: '17',
      evaluationDate: 'Aug 31, 2023',
      triangles: 'triangles',
      triangleData: [
        { status: 'completed' as const, color: '#BD8B11' },
        { status: 'completed' as const, color: '#744DEB' },
        { status: 'completed' as const, color: '#3DA3CB' }
      ],
      officialStatus: 'reviewed' as const,
      action: 'download'
    }
  ]);

  // Handler for when an "Add" triangle button is clicked
  const handleAddTriangleClick = (rowId: string, triangleIndex: number) => {
    // Map triangle index to type
    const triangleTypeMap = {
      0: 'on-risk-aqt' as const,
      1: 'development-fit' as const,
      2: 'on-risk-pyt' as const,
    };

    setCurrentRowId(rowId);
    setCurrentTriangleIndex(triangleIndex);
    setSelectedTriangleType(triangleTypeMap[triangleIndex as 0 | 1 | 2]);
    setIsUploadModalOpen(true);
  };

  /**
   * Handle Triangle Upload Success
   *
   * Updates triangle status from 'add' to 'pending-review' after successful upload.
   * The triangle will show an animated progress icon until it's reviewed and approved.
   */
  const handleTriangleAdded = () => {
    if (!currentRowId || currentTriangleIndex === null) return;

    // Update the table data to change 'add' to 'pending-review' for the specific triangle
    setTableData(prevData =>
      prevData.map(row => {
        if (row.id === currentRowId) {
          const newTriangleData = [...row.triangleData];
          if (newTriangleData[currentTriangleIndex].status === 'add') {
            newTriangleData[currentTriangleIndex] = {
              ...newTriangleData[currentTriangleIndex],
              status: 'pending-review' as const
            };
          }
          return { ...row, triangleData: newTriangleData };
        }
        return row;
      })
    );

    setIsUploadModalOpen(false);
    setSelectedTriangleType(null);
    setCurrentRowId(null);
    setCurrentTriangleIndex(null);
  };

  const handleColumnVisibilityChange = (columnKey: string, visible: boolean) => {
    if (visible) {
      setVisibleColumns([...visibleColumns, columnKey]);
    } else {
      setVisibleColumns(visibleColumns.filter(key => key !== columnKey));
    }
  };

  const columns = [
    {
      key: 'evaluationDate',
      title: 'Evaluation Date',
      icon: <CalendarTable color={colors.theme.primary450} />,
      sortable: true,
      cellType: 'simple' as const,
      width: '30%',
      align: 'left' as const,
      headerAlign: 'left' as const
    },
    {
      key: 'triangles',
      title: 'Triangles',
      icon: <TextTable color={colors.theme.primary450} />,
      sortable: true,
      cellType: 'simple' as const,
      width: '25%',
      align: 'center' as const,
      headerAlign: 'left' as const,
      render: (value: any, row: any) => (
        <div style={{
          display: 'flex',
          gap: '50px',
          alignItems: 'center',
          justifyContent: 'center',
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
                onClick={() => {
                  if (triangle.status === 'add') {
                    handleAddTriangleClick(row.id, index);
                  }
                }}
              />
            </div>
          ))}
        </div>
      )
    },
    {
      key: 'officialStatus',
      title: 'Official valuation',
      icon: <TextTable color={colors.theme.primary450} />,
      sortable: true,
      cellType: 'simple' as const,
      width: 220,
      align: 'left' as const,
      headerAlign: 'left' as const,
      render: (value: any) => <StatusIndicator status={value} />
    },
    {
      key: 'action',
      title: 'Actions',
      icon: <TextTable color={colors.theme.primary450} />,
      sortable: true,
      cellType: 'action' as const,
      width: 180,
      align: 'right' as const,
      headerAlign: 'left' as const,
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
          case 'download':
            console.log('Download Cashflow action for:', text);
            break;
          case 'setup':
            console.log('Setup action for:', text);
            break;
          case 'add-data':
            console.log('Add data action for:', text);
            // Open the upload modal without pre-selecting a triangle
            setSelectedTriangleType(null);
            setCurrentRowId(null);
            setCurrentTriangleIndex(null);
            setIsUploadModalOpen(true);
            break;
          case 'run-valuation':
            console.log('Run valuation action for:', text);
            // Handle run valuation logic here
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
      onNavigate={createPageNavigationHandler(onNavigateToPage, 'analytics-valuation-status')}
      breadcrumbs={[
        { label: 'Valuation', onClick: () => onNavigateToPage?.('analytics-valuation'), isActive: false },
        { label: programName, onClick: () => onNavigateToPage?.('analytics-valuation-dashboard'), isActive: false },
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
            <div style={{ color: colors.blackAndWhite.black500 }}>You're now viewing all Valuation Status of</div>
            <div>{programName}</div>
          </h1>
        </div>

        {/* Add New Button */}
        <Button
          variant="primary"
          color="black"
          icon={<AddMedium color={colors.theme.primary700} />}
          onClick={() => {
            setSelectedTriangleType(null);
            setCurrentRowId(null);
            setCurrentTriangleIndex(null);
            setIsUploadModalOpen(true);
          }}
          style={{
            minWidth: '240px',
          }}
        >
          Add New Valuation Data
        </Button>
      </div>

      {/* Triangle Legend */}
      <div style={{
        display: 'flex',
        gap: '30px',
        alignItems: 'center',
        padding: '0 0 40px 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: borderRadius[4],
            backgroundColor: '#EBCE87',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <TriangleStatusCheck color="#BD8B11" />
          </div>
          <span style={{
            fontFamily: 'Söhne, system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: colors.blackAndWhite.black900,
          }}>
            On risk triangle (Accident-quarter)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: borderRadius[4],
            backgroundColor: '#C7B4F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <TriangleStatusCheck color="#744DEB" />
          </div>
          <span style={{
            fontFamily: 'Söhne, system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: colors.blackAndWhite.black900,
          }}>
            Loss Development triangle (Accident-quarter)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: borderRadius[4],
            backgroundColor: '#9AD5F7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <TriangleStatusCheck color="#3DA3CB" />
          </div>
          <span style={{
            fontFamily: 'Söhne, system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: colors.blackAndWhite.black900,
          }}>
            Policy-Year triangle
          </span>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={tableData}
        showHeader={true}
        title="Valuation Status"
        showTabs={false}
        showCustomizeColumns={true}
        visibleColumns={visibleColumns}
        onColumnVisibilityChange={handleColumnVisibilityChange}
        showPagination={true}
        showFooterPagination={true}
        currentPage={1}
        totalPages={2}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        totalItems={tableData.length}
        itemsPerPage={10}
      />

      {/* Upload Triangles Modal - for "Add Valuation" button */}
      <UploadTrianglesModal
        isOpen={isUploadModalOpen && !selectedTriangleType}
        onClose={() => {
          setIsUploadModalOpen(false);
          setSelectedTriangleType(null);
          setCurrentRowId(null);
          setCurrentTriangleIndex(null);
        }}
        programName={programName}
      />

      {/* Add Triangle Modal - for direct triangle additions from table */}
      {selectedTriangleType && (
        <AddTriangleModal
          isOpen={isUploadModalOpen}
          onClose={() => {
            setIsUploadModalOpen(false);
            setSelectedTriangleType(null);
            setCurrentRowId(null);
            setCurrentTriangleIndex(null);
          }}
          triangleType={selectedTriangleType}
          onTriangleAdded={handleTriangleAdded}
        />
      )}
    </Layout>
  );
};

export const AnalyticsValuationStatus: React.FC<ValuationStatusProps> = (props) => {
  return (
    <ThemeProvider initialTheme="analytics">
      <ValuationStatusContent {...props} />
    </ThemeProvider>
  );
};