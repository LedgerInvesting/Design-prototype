import React, { useState, useCallback, useMemo } from 'react';
import { Layout, PageBanner } from '@design-library/pages';
import { Table } from '@design-library/components';
import { AddSmall, DocumentTable, TextTable, AmmountTable, ArrangeTable, CalendarTable } from '@design-library/icons';
import { ThemeProvider, useSemanticColors } from '@design-library/tokens/ThemeProvider';
import { createPageNavigationHandler, createBreadcrumbs } from '@design-library/utils/navigation';

/**
 * Props for the AnalyticsTriangle component
 */
interface AnalyticsTriangleProps {
  /** Optional navigation handler for page transitions */
  onNavigateToPage?: (page: string, data?: any) => void;
}

/**
 * Filters table data to show only visible rows based on group expansion state
 * @param tableData - The full table data array
 * @returns Filtered array containing only visible rows
 */
const filterVisibleRows = (tableData: any[]) => {
  return tableData.filter((row, index) => {
    if (!row.isGroupChild) return true;

    // Find the parent group
    let groupIndex = index - 1;
    while (groupIndex >= 0 && !tableData[groupIndex].isGroup) {
      groupIndex--;
    }

    if (groupIndex >= 0 && tableData[groupIndex].isGroup) {
      return tableData[groupIndex].isExpanded !== false;
    }

    return true;
  });
};

/**
 * AnalyticsTriangle Page Component
 *
 * Displays a comprehensive triangle management interface with:
 * - Grouped and collapsible triangle rows
 * - Multiple data columns (loss reserve, cells, portfolio volume, etc.)
 * - Sortable columns with intelligent detection
 * - Search and pagination functionality
 *
 * @component
 * @example
 * ```tsx
 * <AnalyticsTriangle onNavigateToPage={handleNavigation} />
 * ```
 */
export const AnalyticsTriangle: React.FC<AnalyticsTriangleProps> = ({ onNavigateToPage }) => {
  const colors = useSemanticColors();

  // Table data with grouped and ungrouped rows
  const [tableData, setTableData] = useState([
    // Ungrouped triangle rows (normal padding)
    {
      id: 'standalone-1',
      triangle: 'cd12345e-6789-012b-345c-6d7cd12345e-6789-01...',
      lossReserve: '£8,542,190',
      numberOfCells: '412',
      portfolioVolume: '13.45%',
      expectedPeriods: '23-06-20 to 24-06-20',
      evaluationDates: '23-06-20 to 24-06-20',
      developmentLags: '0.0 to 60.0',
      sourceNotes: '£8,542,190',
    },
    {
      id: 'standalone-2',
      triangle: 'ef56789a-bcde-f012-3456-789ef56789a-bcde-f0...',
      lossReserve: '£6,321,450',
      numberOfCells: '287',
      portfolioVolume: '9.87%',
      expectedPeriods: '23-06-20 to 24-06-20',
      evaluationDates: '23-06-20 to 24-06-20',
      developmentLags: '0.0 to 55.0',
      sourceNotes: '£6,321,450',
    },
    {
      id: 'standalone-3',
      triangle: 'gh78901b-cdef-0123-4567-89gh78901b-cdef-01...',
      lossReserve: '£11,234,567',
      numberOfCells: '389',
      portfolioVolume: '17.23%',
      expectedPeriods: '23-06-20 to 24-06-20',
      evaluationDates: '23-06-20 to 24-06-20',
      developmentLags: '0.0 to 64.0',
      sourceNotes: '£11,234,567',
    },
    // Pomelo Treaty 2024 Group
    {
      isGroup: true,
      groupName: 'Pomelo Treaty 2024',
      isExpanded: true,
    },
    {
      id: '1',
      triangle: 'ab09272d-8923-472b-925e-9c5ab09272d-8923-47...',
      lossReserve: '£14,235,825',
      numberOfCells: '356',
      portfolioVolume: '21.34%',
      expectedPeriods: '23-06-20 to 24-06-20',
      evaluationDates: '23-06-20 to 24-06-20',
      developmentLags: '0.0 to 69.0',
      sourceNotes: '£14,235,825',
      isGroupChild: true,
    },
    {
      id: '2',
      triangle: 'ab09272d-8923-472b-925e-9c5ab09272d-8923-47...',
      lossReserve: '£12,150,320',
      numberOfCells: '298',
      portfolioVolume: '18.72%',
      expectedPeriods: '23-06-20 to 24-06-20',
      evaluationDates: '23-06-20 to 24-06-20',
      developmentLags: '0.0 to 65.0',
      sourceNotes: '£12,150,320',
      isGroupChild: true,
    },
    {
      id: '5',
      triangle: 'pm45678f-9abc-def0-1234-56pm45678f-9abc-de...',
      lossReserve: '£10,987,654',
      numberOfCells: '321',
      portfolioVolume: '16.89%',
      expectedPeriods: '23-06-20 to 24-06-20',
      evaluationDates: '23-06-20 to 24-06-20',
      developmentLags: '0.0 to 66.0',
      sourceNotes: '£10,987,654',
      isGroupChild: true,
    },
    {
      id: '6',
      triangle: 'pm78901g-2345-6789-abcd-efpm78901g-2345-67...',
      lossReserve: '£13,456,789',
      numberOfCells: '345',
      portfolioVolume: '20.12%',
      expectedPeriods: '23-06-20 to 24-06-20',
      evaluationDates: '23-06-20 to 24-06-20',
      developmentLags: '0.0 to 70.0',
      sourceNotes: '£13,456,789',
      isGroupChild: true,
    },
    // Aviation Treaty 2023 Group
    {
      isGroup: true,
      groupName: 'Aviation Treaty 2023',
      isExpanded: true,
    },
    {
      id: '3',
      triangle: 'ab09272d-8923-472b-925e-9c5ab09272d-8923-47...',
      lossReserve: '£14,235,825',
      numberOfCells: '255',
      portfolioVolume: '21.34%',
      expectedPeriods: '23-06-20 to 24-06-20',
      evaluationDates: '23-06-20 to 24-06-20',
      developmentLags: '0.0 to 68.0',
      sourceNotes: '£14,235,825',
      isGroupChild: true,
    },
    {
      id: '4',
      triangle: 'ab09272d-8923-472b-925e-9c5ab09272d-8923-47...',
      lossReserve: '£9,876,543',
      numberOfCells: '342',
      portfolioVolume: '15.67%',
      expectedPeriods: '23-06-20 to 24-06-20',
      evaluationDates: '23-06-20 to 24-06-20',
      developmentLags: '0.0 to 72.0',
      sourceNotes: '£9,876,543',
      isGroupChild: true,
    },
    // More ungrouped triangle rows
    {
      id: 'standalone-4',
      triangle: 'ij23456c-def0-1234-5678-9aij23456c-def0-12...',
      lossReserve: '£7,654,321',
      numberOfCells: '298',
      portfolioVolume: '11.78%',
      expectedPeriods: '23-06-20 to 24-06-20',
      evaluationDates: '23-06-20 to 24-06-20',
      developmentLags: '0.0 to 58.0',
      sourceNotes: '£7,654,321',
    },
    {
      id: 'standalone-5',
      triangle: 'kl56789d-0123-4567-89ab-cdkl56789d-0123-45...',
      lossReserve: '£9,123,456',
      numberOfCells: '367',
      portfolioVolume: '14.56%',
      expectedPeriods: '23-06-20 to 24-06-20',
      evaluationDates: '23-06-20 to 24-06-20',
      developmentLags: '0.0 to 62.0',
      sourceNotes: '£9,123,456',
    },
    {
      id: 'standalone-6',
      triangle: 'mn78901e-2345-6789-abcd-efmn78901e-2345-67...',
      lossReserve: '£5,432,109',
      numberOfCells: '234',
      portfolioVolume: '8.34%',
      expectedPeriods: '23-06-20 to 24-06-20',
      evaluationDates: '23-06-20 to 24-06-20',
      developmentLags: '0.0 to 52.0',
      sourceNotes: '£5,432,109',
    },
    {
      id: 'standalone-7',
      triangle: 'op90123f-4567-89ab-cdef-0op90123f-4567-89...',
      lossReserve: '£12,345,678',
      numberOfCells: '401',
      portfolioVolume: '18.90%',
      expectedPeriods: '23-06-20 to 24-06-20',
      evaluationDates: '23-06-20 to 24-06-20',
      developmentLags: '0.0 to 67.0',
      sourceNotes: '£12,345,678',
    },
    {
      id: 'standalone-8',
      triangle: 'qr12345g-6789-0abc-def1-23qr12345g-6789-0a...',
      lossReserve: '£8,765,432',
      numberOfCells: '312',
      portfolioVolume: '13.21%',
      expectedPeriods: '23-06-20 to 24-06-20',
      evaluationDates: '23-06-20 to 24-06-20',
      developmentLags: '0.0 to 61.0',
      sourceNotes: '£8,765,432',
    },
    {
      id: 'standalone-9',
      triangle: 'st34567h-89ab-cdef-0123-45st34567h-89ab-cd...',
      lossReserve: '£6,789,012',
      numberOfCells: '276',
      portfolioVolume: '10.45%',
      expectedPeriods: '23-06-20 to 24-06-20',
      evaluationDates: '23-06-20 to 24-06-20',
      developmentLags: '0.0 to 56.0',
      sourceNotes: '£6,789,012',
    },
  ]);

  /**
   * Handle group toggle (expand/collapse)
   * Finds the actual group in tableData using the visible row index and groupName
   */
  const handleGroupToggle = useCallback((visibleRowIndex: number) => {
    // Get visible rows using the same filter logic
    const visibleRows = filterVisibleRows(tableData);

    // Find the clicked row in visible data
    const clickedRow = visibleRows[visibleRowIndex];
    if (!clickedRow) return;

    // Find this group's index in the original tableData by groupName
    const actualIndex = tableData.findIndex(row =>
      row.isGroup && row.groupName === clickedRow.groupName
    );

    if (actualIndex === -1) return;

    setTableData(prevData => {
      const newData = [...prevData];
      const groupRow = newData[actualIndex];

      if (groupRow.isGroup) {
        groupRow.isExpanded = !groupRow.isExpanded;
      }

      return newData;
    });
  }, [tableData]);

  // Filter out collapsed group children for display
  const visibleData = useMemo(() => filterVisibleRows(tableData), [tableData]);

  const navigationHandler = onNavigateToPage
    ? createPageNavigationHandler(onNavigateToPage, 'analytics-triangle')
    : undefined;

  const breadcrumbs = createBreadcrumbs.analytics.triangle();

  return (
    <ThemeProvider initialTheme="analytics">
      <Layout
        pageType="analytics"
        selectedSidebarItem="analytics"
        selectedSidebarSubitem="triangle"
        onNavigate={navigationHandler}
        breadcrumbs={breadcrumbs}
      >
        {/* Header Section */}
        <PageBanner
          title="Triangle"
          subtitle="Visualize and manage triangle data. Explore triangle data structures and model predictions.
Import and export triangles in a variety of formats."
          illustrationSrc="/Triangle_illustration.png"
          patternSrc="/pattern_analytics.svg"
          buttonText="New Triangle"
          buttonIcon={<AddSmall color={colors.theme.main} />}
          onButtonClick={() => console.log('New Triangle clicked')}
          illustrationAlt="triangle"
        />

        {/* Triangle Table */}
        <div style={{ marginTop: '40px' }}>
          <Table
            showHeader={true}
            title="Triangles"
            currentPage={1}
            totalPages={3}
            totalItems={15}
            itemsPerPage={5}
            columns={[
              {
                key: 'triangle',
                title: 'Triangle',
                icon: <DocumentTable color={colors.theme.primary450} />,
                sortIcon: <ArrangeTable color={colors.theme.primary450} />,
                sortable: true,
                width: '309px',
                cellType: 'document',
                align: 'left',
                headerAlign: 'left',
                hoverIcon: 'open',
                onDownload: (triangleId: string) => {
                  console.log('Opening triangle:', triangleId);
                }
              },
              {
                key: 'lossReserve',
                title: 'Loss reserve',
                icon: <AmmountTable color={colors.theme.primary450} />,
                sortIcon: <ArrangeTable color={colors.theme.primary450} />,
                sortable: true,
                width: '150px',
                align: 'right',
                headerAlign: 'right',
                cellType: 'simple'
              },
              {
                key: 'numberOfCells',
                title: 'Number of Cells',
                icon: <TextTable color={colors.theme.primary450} />,
                sortIcon: <ArrangeTable color={colors.theme.primary450} />,
                sortable: true,
                width: '150px',
                align: 'right',
                headerAlign: 'right',
                cellType: 'simple'
              },
              {
                key: 'portfolioVolume',
                title: 'Portfolio Volume',
                icon: <TextTable color={colors.theme.primary450} />,
                sortIcon: <ArrangeTable color={colors.theme.primary450} />,
                sortable: true,
                width: '150px',
                align: 'right',
                headerAlign: 'right',
                cellType: 'simple'
              },
              {
                key: 'expectedPeriods',
                title: 'Expected Periods',
                icon: <CalendarTable color={colors.theme.primary450} />,
                sortIcon: <ArrangeTable color={colors.theme.primary450} />,
                sortable: true,
                width: '180px',
                align: 'right',
                headerAlign: 'right',
                cellType: 'simple'
              },
              {
                key: 'evaluationDates',
                title: 'Evaluation Dates',
                icon: <CalendarTable color={colors.theme.primary450} />,
                sortIcon: <ArrangeTable color={colors.theme.primary450} />,
                sortable: true,
                width: '180px',
                align: 'right',
                headerAlign: 'right',
                cellType: 'simple'
              },
              {
                key: 'developmentLags',
                title: 'Development Lags',
                icon: <TextTable color={colors.theme.primary450} />,
                sortIcon: <ArrangeTable color={colors.theme.primary450} />,
                sortable: true,
                width: '180px',
                align: 'right',
                headerAlign: 'right',
                cellType: 'simple'
              },
              {
                key: 'sourceNotes',
                title: 'Source Notes',
                icon: <AmmountTable color={colors.theme.primary450} />,
                sortIcon: <ArrangeTable color={colors.theme.primary450} />,
                sortable: true,
                width: '150px',
                align: 'right',
                headerAlign: 'right',
                cellType: 'simple'
              }
            ]}
            data={visibleData}
            onGroupToggle={handleGroupToggle}
            pagination={{ enabled: true, variant: 'modern' }}
          />
        </div>
      </Layout>
    </ThemeProvider>
  );
};
