import React, { useState, useEffect } from 'react';
import { Layout } from '@design-library/pages';
import { Button, Input, InfoTooltip, Modal, ButtonSelector, FormDropdown, Status } from '@design-library/components';
import { typography, borderRadius, spacing, shadows } from '@design-library/tokens';
import { ThemeProvider, useSemanticColors } from '@design-library/tokens/ThemeProvider';
import { CloseSmall, AddMedium, DownloadMedium, CloseMedium, ArrowUpSmall, ArrowDownSmall } from '@design-library/icons';
import { createPageNavigationHandler, createBreadcrumbs, type NavigationHandler } from '@design-library/utils/navigation';
import { ComposedChart, Line, XAxis, YAxis, ResponsiveContainer, Area, CartesianGrid } from 'recharts';

// Add spinner animation
const spinnerStyle = document.createElement('style');
spinnerStyle.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinnerStyle);

type TriangleType = 'development-fit' | 'on-risk' | 'policy-year' | null;

// Valuation Model data type
interface ValuationModel {
  id: number;
  isNew: boolean;
  isPublished: boolean;
  meanLossRatio: number;
  meanLossRatioChange: number;
  meanLossRatio2: number;
  meanLossRatio2Change: number;
  expectedLossRatio: number;
  expectedLossRatioChange: number;
  settings: {
    paidWeight: string;
    bfParameters: string;
    paidClCutoff: string;
    lossRatioMean: string;
  };
  chartData: Array<{
    month: string;
    paid: number;
    reported: number;
    mean: number;
    outerBandBase: number;
    outerBandHeight: number;
    innerBandBase: number;
    innerBandHeight: number;
  }>;
}

// Loading Model Card Component
const LoadingModelCard: React.FC<{
  modelId: number;
}> = ({ modelId }) => {
  const colors = useSemanticColors();

  return (
    <div style={{
      backgroundColor: colors.blackAndWhite.white,
      borderRadius: borderRadius[12],
      padding: '20px',
      boxShadow: shadows.small,
      border: `1px solid ${colors.theme.primary400}`,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '20px',
        marginBottom: '20px',
        borderBottom: `1px solid ${colors.theme.primary400}`,
      }}>
        <h3 style={{
          ...typography.styles.bodyL,
          color: colors.blackAndWhite.black900,
          margin: 0,
          fontWeight: 500,
        }}>
          Valuation model {modelId}
        </h3>
      </div>

      {/* Loading Content - Aligned with chart */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '60px 0',
        paddingLeft: '120px',
        paddingRight: '120px',
      }}>
        {/* Spinner */}
        <div style={{
          width: '40px',
          height: '40px',
          border: `3px solid ${colors.theme.primary300}`,
          borderTop: `3px solid ${colors.theme.main}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />

        {/* Loading Text */}
        <div>
          <div style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black800,
            marginBottom: '4px',
          }}>
            Running valuation model
          </div>
          <div style={{
            ...typography.styles.bodyS,
            color: colors.blackAndWhite.black500,
          }}>
            Processing time: 3-5 minutes. Safe to close this page - your results will be saved.
          </div>
        </div>
      </div>

      {/* Settings Summary */}
      <div style={{
        height: '1px',
        backgroundColor: colors.theme.primary400,
        marginBottom: '16px',
      }} />
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        alignItems: 'center',
      }}>
        <span style={{
          ...typography.styles.bodyS,
          color: colors.blackAndWhite.black500,
        }}>
          Settings
        </span>
        <span style={{
          ...typography.styles.bodyS,
          color: colors.blackAndWhite.black900,
        }}>
          Paid Weight: 20.0%
        </span>
        <span style={{
          ...typography.styles.bodyS,
          color: colors.blackAndWhite.black900,
        }}>
          BF parameters: 1.5%
        </span>
        <span style={{
          ...typography.styles.bodyS,
          color: colors.blackAndWhite.black900,
        }}>
          Paid CL Cutoff: 66.7%
        </span>
        <span style={{
          ...typography.styles.bodyS,
          color: colors.blackAndWhite.black900,
        }}>
          Loss Ratio Mean: 0.532%
        </span>
      </div>
    </div>
  );
};

// Valuation Model Card Component
const ValuationModelCard: React.FC<{
  model: ValuationModel;
  onPublish: () => void;
}> = ({ model, onPublish }) => {
  const colors = useSemanticColors();

  return (
    <div style={{
      backgroundColor: colors.blackAndWhite.white,
      borderRadius: borderRadius[12],
      padding: '20px',
      boxShadow: shadows.small,
      border: `1px solid ${colors.theme.primary400}`,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '20px',
        marginBottom: '20px',
        borderBottom: `1px solid ${colors.theme.primary400}`,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <h3 style={{
            ...typography.styles.bodyL,
            color: colors.blackAndWhite.black900,
            margin: 0,
            fontWeight: 500,
          }}>
            Valuation model {model.id}
          </h3>
        </div>
        <Button
          variant="primary"
          color={model.isPublished ? "black" : "white"}
          showIcon={false}
          onClick={onPublish}
        >
          {model.isPublished ? "Unpublish" : "Publish"}
        </Button>
      </div>

      {/* Loss Metrics Row - Aligned with chart */}
      <div style={{
        marginBottom: '20px',
        paddingLeft: '120px',
        paddingRight: '120px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr auto 1fr',
          gap: '20px',
          alignItems: 'center',
        }}>
        {/* Mean Loss Ratio 1 */}
        <div>
          <div style={{
            fontFamily: 'Söhne, system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            lineHeight: 1.3,
            color: colors.blackAndWhite.black500,
            marginBottom: '5px',
          }}>
            Mean Loss Ratio
          </div>
          {/* Growth Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: 'Söhne, system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: colors.blackAndWhite.black900,
            marginBottom: '12px',
          }}>
            {model.meanLossRatioChange >= 0 ? (
              <ArrowUpSmall color={colors.success.textAndStrokes} />
            ) : (
              <ArrowDownSmall color={colors.error.textAndStrokes} />
            )}
            <span>
              {model.meanLossRatioChange >= 0 ? '+' : ''}{model.meanLossRatioChange.toFixed(2)} from previous
            </span>
          </div>
          <div style={{
            fontFamily: 'Söhne, system-ui, sans-serif',
            lineHeight: 1.3,
            color: colors.blackAndWhite.black900,
            fontSize: '26px',
            fontWeight: 400,
          }}>
            {model.meanLossRatio.toFixed(2)}%
          </div>
        </div>

        {/* Divider 1 */}
        <div style={{
          width: '1px',
          height: '60px',
          backgroundColor: colors.theme.primary400,
        }} />

        {/* Mean Loss Ratio 2 */}
        <div>
          <div style={{
            fontFamily: 'Söhne, system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            lineHeight: 1.3,
            color: colors.blackAndWhite.black500,
            marginBottom: '5px',
          }}>
            Mean Loss Ratio
          </div>
          {/* Growth Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: 'Söhne, system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: colors.blackAndWhite.black900,
            marginBottom: '12px',
          }}>
            {model.meanLossRatio2Change >= 0 ? (
              <ArrowUpSmall color={colors.success.textAndStrokes} />
            ) : (
              <ArrowDownSmall color={colors.error.textAndStrokes} />
            )}
            <span>
              {model.meanLossRatio2Change >= 0 ? '+' : ''}{model.meanLossRatio2Change.toFixed(2)} from previous
            </span>
          </div>
          <div style={{
            fontFamily: 'Söhne, system-ui, sans-serif',
            lineHeight: 1.3,
            color: colors.blackAndWhite.black900,
            fontSize: '26px',
            fontWeight: 400,
          }}>
            {model.meanLossRatio2.toFixed(2)}%
          </div>
        </div>

        {/* Divider 2 */}
        <div style={{
          width: '1px',
          height: '60px',
          backgroundColor: colors.theme.primary400,
        }} />

        {/* Expected Loss Ratio */}
        <div>
          <div style={{
            fontFamily: 'Söhne, system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            lineHeight: 1.3,
            color: colors.blackAndWhite.black500,
            marginBottom: '5px',
          }}>
            Expected Loss Ratio
          </div>
          {/* Growth Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: 'Söhne, system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: colors.blackAndWhite.black900,
            marginBottom: '12px',
          }}>
            {model.expectedLossRatioChange >= 0 ? (
              <ArrowUpSmall color={colors.success.textAndStrokes} />
            ) : (
              <ArrowDownSmall color={colors.error.textAndStrokes} />
            )}
            <span>
              {model.expectedLossRatioChange >= 0 ? '+' : ''}{model.expectedLossRatioChange.toFixed(2)} from previous
            </span>
          </div>
          <div style={{
            fontFamily: 'Söhne, system-ui, sans-serif',
            lineHeight: 1.3,
            color: colors.blackAndWhite.black900,
            fontSize: '26px',
            fontWeight: 400,
          }}>
            {model.expectedLossRatio.toFixed(2)}%
          </div>
        </div>
        </div>
      </div>

      {/* Chart Section - Aligned with losses */}
      <div style={{
        marginBottom: '20px',
        paddingLeft: '60px',
        paddingRight: '60px',
      }}>
        <div style={{
          height: '200px',
          position: 'relative',
        }}>
        {/* Previous / Current Labels - Aligned with chart top */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}>
          <span style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black500,
          }}>
            Previous
          </span>
          <span style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black500,
          }}>
            Current
          </span>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={model.chartData} margin={{ top: 10, right: 60, left: 60, bottom: 10 }}>
            {/* Grid lines (dotted) */}
            <CartesianGrid strokeDasharray="3 3" stroke={colors.theme.primary450} />

            {/* X-axis with baseline */}
            <XAxis
              dataKey="month"
              hide={true}
              axisLine={{ stroke: colors.blackAndWhite.black900, strokeWidth: 2 }}
            />

            {/* Y-axis (hidden but defines domain) */}
            <YAxis
              hide={true}
              domain={[0, 120]}
            />

            {/* Outer uncertainty band (±10%, lighter) */}
            <Area
              type="monotone"
              dataKey="outerBandBase"
              stroke="none"
              fill="transparent"
              stackId="outer"
            />
            <Area
              type="monotone"
              dataKey="outerBandHeight"
              stroke="none"
              fill="#64EF99"
              fillOpacity={0.3}
              stackId="outer"
            />

            {/* Inner uncertainty band (±5%, darker) */}
            <Area
              type="monotone"
              dataKey="innerBandBase"
              stroke="none"
              fill="transparent"
              stackId="inner"
            />
            <Area
              type="monotone"
              dataKey="innerBandHeight"
              stroke="none"
              fill="#64EF99"
              fillOpacity={0.6}
              stackId="inner"
            />

            {/* Mean line (green) */}
            <Line
              type="monotone"
              dataKey="mean"
              stroke="#0f9342"
              strokeWidth={2}
              dot={{ fill: '#0f9342', r: 5, stroke: colors.blackAndWhite.white, strokeWidth: 2 }}
              label={({ x, y, index, value }) => {
                const isFirst = index === 0;
                return (
                  <g>
                    <rect
                      x={isFirst ? x - 50 : x + 10}
                      y={y - 10}
                      width={40}
                      height={20}
                      fill={colors.blackAndWhite.white}
                      stroke={colors.blackAndWhite.black100}
                      strokeWidth="1"
                      rx="4"
                      ry="4"
                    />
                    <text
                      x={isFirst ? x - 30 : x + 30}
                      y={y + 4}
                      textAnchor="middle"
                      fill={colors.blackAndWhite.black500}
                      fontSize="10px"
                      fontFamily="Söhne, system-ui, sans-serif"
                      fontWeight="500"
                    >
                      {value}%
                    </text>
                  </g>
                );
              }}
            />

            {/* Reported line (yellow, dashed) */}
            <Line
              type="monotone"
              dataKey="reported"
              stroke="#ffd028"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#ffd028', r: 5, stroke: colors.blackAndWhite.white, strokeWidth: 2 }}
              label={({ x, y, index, value }) => {
                const isFirst = index === 0;
                return (
                  <g>
                    <rect
                      x={isFirst ? x - 50 : x + 10}
                      y={y - 10}
                      width={40}
                      height={20}
                      fill={colors.blackAndWhite.white}
                      stroke={colors.blackAndWhite.black100}
                      strokeWidth="1"
                      rx="4"
                      ry="4"
                    />
                    <text
                      x={isFirst ? x - 30 : x + 30}
                      y={y + 4}
                      textAnchor="middle"
                      fill={colors.blackAndWhite.black500}
                      fontSize="10px"
                      fontFamily="Söhne, system-ui, sans-serif"
                      fontWeight="500"
                    >
                      {value}%
                    </text>
                  </g>
                );
              }}
            />

            {/* Paid line (purple) */}
            <Line
              type="monotone"
              dataKey="paid"
              stroke="#8b68f5"
              strokeWidth={2}
              dot={{ fill: '#8b68f5', r: 5, stroke: colors.blackAndWhite.white, strokeWidth: 2 }}
              label={({ x, y, index, value }) => {
                const isFirst = index === 0;
                return (
                  <g>
                    <rect
                      x={isFirst ? x - 50 : x + 10}
                      y={y - 10}
                      width={40}
                      height={20}
                      fill={colors.blackAndWhite.white}
                      stroke={colors.blackAndWhite.black100}
                      strokeWidth="1"
                      rx="4"
                      ry="4"
                    />
                    <text
                      x={isFirst ? x - 30 : x + 30}
                      y={y + 4}
                      textAnchor="middle"
                      fill={colors.blackAndWhite.black500}
                      fontSize="10px"
                      fontFamily="Söhne, system-ui, sans-serif"
                      fontWeight="500"
                    >
                      {value}%
                    </text>
                  </g>
                );
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        backgroundColor: colors.theme.primary400,
        marginBottom: '16px',
      }} />

      {/* Settings Summary */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        alignItems: 'center',
      }}>
        <span style={{
          ...typography.styles.bodyS,
          color: colors.blackAndWhite.black500,
        }}>
          Settings
        </span>
        <span style={{
          ...typography.styles.bodyS,
          color: colors.blackAndWhite.black900,
        }}>
          Paid Weight: {model.settings.paidWeight}
        </span>
        <span style={{
          ...typography.styles.bodyS,
          color: colors.blackAndWhite.black900,
        }}>
          BF parameters: {model.settings.bfParameters}
        </span>
        <span style={{
          ...typography.styles.bodyS,
          color: colors.blackAndWhite.black900,
        }}>
          Paid CL Cutoff: {model.settings.paidClCutoff}
        </span>
        <span style={{
          ...typography.styles.bodyS,
          color: colors.blackAndWhite.black900,
        }}>
          Loss Ratio Mean: {model.settings.lossRatioMean}
        </span>
      </div>
    </div>
  );
};

// Triangle upload item component
const TriangleUploadItem: React.FC<{
  label: string;
  onClick: () => void;
  completedName?: string;
}> = ({ label, onClick, completedName }) => {
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
          color: completedName ? colors.blackAndWhite.black900 : colors.blackAndWhite.black500,
          fontWeight: 500,
        }}>
          {completedName || label}
        </div>
      </div>

      {/* Add or Close button */}
      <Button
        variant="icon"
        color="success"
        onClick={onClick}
        icon={completedName ? <CloseMedium /> : <AddMedium />}
        showIcon={true}
        shape="square"
        style={completedName ? { backgroundColor: colors.theme.primary300 } : undefined}
      />
    </div>
  );
};

interface AnalyticsValuationEditProps {
  onNavigateToPage?: NavigationHandler;
  selectedDate?: string;
  programName?: string;
}

const AnalyticsValuationEditContent: React.FC<AnalyticsValuationEditProps> = ({
  onNavigateToPage,
  selectedDate = 'Jan 25',
  programName = 'XPT Commercial Auto TY23'
}) => {
  const colors = useSemanticColors();

  // State management
  const [selectedModel, setSelectedModel] = useState('accident-quarter-triangle');
  const [completedTriangles, setCompletedTriangles] = useState<Record<string, string>>({
    'development-fit': 'On_Risk_Triangle_v4.xml',
    'on-risk': 'On_Risk_Triangle_v4.xml'
  });
  const [selectedTriangle, setSelectedTriangle] = useState<TriangleType>(null);
  const [uploadMode, setUploadMode] = useState<'upload' | 'existing'>('upload');
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [selectedExisting, setSelectedExisting] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [paidWeight, setPaidWeight] = useState('20.0');
  const [bfParameters, setBfParameters] = useState('1.5');
  const [paidClCutoff, setPaidClCutoff] = useState('66.7');
  const [lossRatioMean, setLossRatioMean] = useState('0.532');

  // Valuation models state - initialize with one default model using dashboard data
  const [valuationModels, setValuationModels] = useState<ValuationModel[]>([
    {
      id: 1,
      isNew: false,
      isPublished: true,
      meanLossRatio: 93.0,
      meanLossRatioChange: 6.4,
      meanLossRatio2: 82.4,
      meanLossRatio2Change: -0.8,
      expectedLossRatio: 83.1,
      expectedLossRatioChange: -0.8,
      settings: {
        paidWeight: '20.0%',
        bfParameters: '1.5%',
        paidClCutoff: '66.7%',
        lossRatioMean: '0.532%',
      },
      chartData: [
        {
          month: 'Dec 24',
          paid: 35,
          reported: 80,
          mean: 95,
          outerBandBase: 85,
          outerBandHeight: 20,
          innerBandBase: 90,
          innerBandHeight: 10
        },
        {
          month: 'Jan 25',
          paid: 60,
          reported: 80,
          mean: 98,
          outerBandBase: 88,
          outerBandHeight: 20,
          innerBandBase: 93,
          innerBandHeight: 10
        },
      ],
    }
  ]);

  // Loading state for new models
  const [loadingModels, setLoadingModels] = useState<number[]>([]);

  // Sample existing triangles data
  const existingTriangles = [
    { value: 'mango-2023', label: 'Mango Treaty 2023 - Development Fit' },
    { value: 'banana-ty22', label: 'Banana Auto TY22 - On Risk AQT' },
    { value: 'pineapple-2024', label: 'Pineapple Treaty 2024 - On Risk PYT' },
    { value: 'strawberry-ty23', label: 'Strawberry Cargo TY23 - Development Fit' },
    { value: 'watermelon-2024', label: 'Watermelon Program 2024 - On Risk AQT' },
    { value: 'orange-ty22', label: 'Orange Holdings TY22 - Development Fit' },
    { value: 'grape-2023', label: 'Grape Marine 2023 - On Risk PYT' },
    { value: 'kiwi-ty24', label: 'Kiwi Property TY24 - Development Fit' },
    { value: 'peach-2024', label: 'Peach Aviation 2024 - On Risk AQT' },
    { value: 'cherry-ty23', label: 'Cherry Liability TY23 - Development Fit' },
    { value: 'lemon-2023', label: 'Lemon Casualty 2023 - On Risk PYT' },
    { value: 'lime-ty22', label: 'Lime Workers Comp TY22 - Development Fit' },
    { value: 'plum-2024', label: 'Plum General Liability 2024 - On Risk AQT' },
    { value: 'apricot-ty23', label: 'Apricot Professional 2023 - On Risk PYT' },
    { value: 'papaya-2024', label: 'Papaya Cyber TY24 - Development Fit' },
    { value: 'guava-ty22', label: 'Guava Environmental TY22 - On Risk AQT' },
  ];

  // Navigation setup
  const navigationHandler = onNavigateToPage
    ? createPageNavigationHandler(onNavigateToPage, 'analytics-valuation-edit')
    : undefined;

  const breadcrumbs = onNavigateToPage
    ? createBreadcrumbs.analytics.valuationEdit(selectedDate, programName, onNavigateToPage)
    : [
        { label: 'Analytics' },
        { label: 'Valuation', onClick: () => onNavigateToPage?.('analytics-valuation-dashboard') },
        { label: programName },
        { label: `Edit ${selectedDate}` }
      ];

  // Model dropdown options
  const modelOptions = [
    { value: 'accident-quarter-triangle', label: 'Accident-Quarter Triangle' },
    { value: 'policy-year', label: 'Policy-Year' },
  ];

  const handleTestValuation = () => {
    const newModelId = valuationModels.length + 1;

    // Add the new model ID to loading state
    setLoadingModels([...loadingModels, newModelId]);

    // Simulate 3-5 minute processing time (using 3 seconds for demo)
    setTimeout(() => {
      // Generate sample chart data - Previous month uses same values as Dec 24
      const chartData = [
        {
          month: 'Dec 24',
          paid: 35,
          reported: 80,
          mean: 95,
          outerBandBase: 85,
          outerBandHeight: 20,
          innerBandBase: 90,
          innerBandHeight: 10
        },
        {
          month: 'Jan 25',
          paid: 60 + Math.floor(Math.random() * 10 - 5),
          reported: 80 + Math.floor(Math.random() * 10 - 5),
          mean: 98 + Math.floor(Math.random() * 6 - 3),
          outerBandBase: 88,
          outerBandHeight: 20,
          innerBandBase: 93,
          innerBandHeight: 10
        },
      ];

      const newModel: ValuationModel = {
        id: newModelId,
        isNew: true,
        isPublished: false,
        meanLossRatio: 93.0 + Math.random() * 4 - 2,
        meanLossRatioChange: Math.random() * 10 - 5,
        meanLossRatio2: 82.4 + Math.random() * 4 - 2,
        meanLossRatio2Change: Math.random() * 10 - 5,
        expectedLossRatio: 83.1 + Math.random() * 4 - 2,
        expectedLossRatioChange: Math.random() * 10 - 5,
        settings: {
          paidWeight: `${paidWeight}%`,
          bfParameters: `${bfParameters}%`,
          paidClCutoff: `${paidClCutoff}%`,
          lossRatioMean: `${lossRatioMean}%`,
        },
        chartData,
      };

      setValuationModels([...valuationModels, newModel]);
      setLoadingModels(loadingModels.filter(id => id !== newModelId));
    }, 90000); // 90 seconds (1 minute and 30 seconds)
  };

  const handlePublishModel = (modelId: number) => {
    setValuationModels(valuationModels.map(model => {
      if (model.id === modelId) {
        // Toggle the published state for the clicked model
        return {
          ...model,
          isPublished: !model.isPublished,
          isNew: false,
        };
      }
      // Unpublish all other models when publishing a new one
      if (!model.isPublished && valuationModels.find(m => m.id === modelId)?.isPublished === false) {
        return model;
      }
      return {
        ...model,
        isPublished: model.id === modelId ? true : false,
      };
    }));
    // TODO: Update the Analytics Valuation Dashboard chart data
  };

  const handleTriangleUpload = (type: TriangleType) => {
    // If triangle is already completed, remove it
    if (type && completedTriangles[type]) {
      const newCompleted = { ...completedTriangles };
      delete newCompleted[type];
      setCompletedTriangles(newCompleted);
    } else {
      // Otherwise, open upload modal
      setSelectedTriangle(type);
    }
  };

  const handleCloseModal = () => {
    setSelectedTriangle(null);
    setUploadMode('upload');
    setSelectedFile('');
    setSelectedExisting('');
    setSearchQuery('');
  };

  const handleAddTriangle = () => {
    if (!selectedTriangle) return;

    // Get the name to save
    let triangleName = '';
    if (uploadMode === 'upload' && selectedFile) {
      triangleName = selectedFile;
    } else if (uploadMode === 'existing' && selectedExisting) {
      const triangle = existingTriangles.find(t => t.value === selectedExisting);
      triangleName = triangle?.label || selectedExisting;
    }

    // Save the completed triangle
    if (triangleName) {
      setCompletedTriangles({
        ...completedTriangles,
        [selectedTriangle]: triangleName
      });
    }

    // Close modal
    handleCloseModal();
  };

  const handleBrowseClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedFile(file.name);
      }
    };
    input.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  const getTriangleName = (type: TriangleType): string => {
    switch (type) {
      case 'development-fit':
        return 'Development Fit Triangle';
      case 'on-risk':
        return 'On Risk Triangle';
      case 'policy-year':
        return 'Policy-Year Triangle';
      default:
        return '';
    }
  };

  const modalTitle = (
    <div style={{ textAlign: 'center', lineHeight: '1.1' }}>
      <div style={{
        ...typography.styles.headlineH2,
        color: colors.blackAndWhite.black500,
        marginBottom: '4px',
        letterSpacing: '-0.5px',
      }}>
        Upload
      </div>
      <div style={{
        ...typography.styles.headlineH2,
        color: colors.blackAndWhite.black900,
        letterSpacing: '-0.5px',
      }}>
        {getTriangleName(selectedTriangle)}
      </div>
    </div>
  );

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      pageType="analytics-valuation-edit"
      selectedSidebarItem="analytics"
      selectedSidebarSubitem="valuation"
      onNavigate={navigationHandler}
    >
      {/* Page Title */}
      <h2 style={{
        ...typography.styles.headlineH2,
        color: colors.blackAndWhite.black500,
        margin: 0,
        marginBottom: '40px'
      }}>
        You're editing <span style={{ color: colors.blackAndWhite.black900 }}>{selectedDate}</span> valuation for
        <br />
        <span style={{ color: colors.blackAndWhite.black900 }}>{programName}</span>.
      </h2>

      {/* Two-column layout: 30% settings / 70% content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '30% 1fr',
        gap: '20px',
        width: '100%'
      }}>
        {/* Left Column - Settings and Helper Text */}
        <div>
          {/* Settings Box */}
          <div style={{
            backgroundColor: colors.theme.primary200,
            borderRadius: borderRadius[16],
            padding: '0px 30px 30px 30px',
            boxShadow: shadows.small
          }}>
            {/* Settings Header */}
            <h2 style={{
              ...typography.styles.bodyL,
              color: colors.blackAndWhite.black900,
              margin: 0,
              padding: '30px 0 20px 0',
              fontWeight: 500
            }}>
              Settings
            </h2>

            {/* Line under Settings */}
            <div style={{
              height: '1px',
              backgroundColor: colors.theme.primary400,
              marginBottom: '20px'
            }} />

            {/* Model Dropdown */}
            <div style={{ marginBottom: '20px' }}>
              <FormDropdown
                label="Model"
                options={modelOptions}
                value={selectedModel}
                onChange={(value) => setSelectedModel(value)}
                placeholder="Select model"
              />
            </div>

            {/* Triangles - conditionally rendered based on selected model */}
            {selectedModel === 'accident-quarter-triangle' && (
              <>
                {/* Development Fit Triangle */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                    fontWeight: 500,
                    marginBottom: '8px'
                  }}>
                    Development Fit Triangle
                  </div>
                  <TriangleUploadItem
                    label="add Development Fit Triangle"
                    onClick={() => handleTriangleUpload('development-fit')}
                    completedName={completedTriangles['development-fit']}
                  />
                </div>

                {/* On Risk Triangle */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                    fontWeight: 500,
                    marginBottom: '8px'
                  }}>
                    On Risk Triangle
                  </div>
                  <TriangleUploadItem
                    label="add On Risk Triangle"
                    onClick={() => handleTriangleUpload('on-risk')}
                    completedName={completedTriangles['on-risk']}
                  />
                </div>
              </>
            )}

            {selectedModel === 'policy-year' && (
              <>
                {/* Policy-Year Triangle */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                    fontWeight: 500,
                    marginBottom: '8px'
                  }}>
                    Policy-Year Triangle
                  </div>
                  <TriangleUploadItem
                    label="add Policy-Year Triangle"
                    onClick={() => handleTriangleUpload('policy-year')}
                    completedName={completedTriangles['policy-year']}
                  />
                </div>
              </>
            )}

            {/* Divider Line */}
            <div style={{
              height: '1px',
              backgroundColor: colors.theme.primary400,
              marginBottom: '20px'
            }} />

            {/* Input Fields - Two columns */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '20px'
            }}>
              {/* Paid Weight */}
              <Input
                label="Paid Weight"
                value={paidWeight}
                onChange={(e) => setPaidWeight(e.target.value)}
                leftSymbol="%"
                placeholder="0.0"
                showTooltip={true}
                tooltipText="Weight given to paid loss data in the valuation"
              />

              {/* BF Parameters */}
              <Input
                label="BF parameters"
                value={bfParameters}
                onChange={(e) => setBfParameters(e.target.value)}
                leftSymbol="%"
                placeholder="0.0"
                showTooltip={true}
                tooltipText="Bornhuetter-Ferguson method parameters"
              />

              {/* Paid CL Cutoff */}
              <Input
                label="Paid CL Cutoff"
                value={paidClCutoff}
                onChange={(e) => setPaidClCutoff(e.target.value)}
                leftSymbol="%"
                placeholder="0.0"
                showTooltip={true}
                tooltipText="Cutoff point for paid chain ladder method"
              />

              {/* Loss Ratio Mean */}
              <Input
                label="Loss Ratio Mean"
                value={lossRatioMean}
                onChange={(e) => setLossRatioMean(e.target.value)}
                placeholder="0.000"
                showTooltip={true}
                tooltipText="Expected mean loss ratio for the valuation"
              />
            </div>

            {/* Test Valuation Button */}
            <Button
              variant="primary"
              color="black"
              showIcon={false}
              onClick={handleTestValuation}
              style={{
                width: '100%'
              }}
            >
              TEST VALUATION
            </Button>
          </div>

          {/* Helper Text - Below Settings Box */}
          <p style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black500,
            margin: 0,
            marginTop: '16px',
            textAlign: 'center'
          }}>
            Run <span style={{ color: colors.blackAndWhite.black900 }}>multiple valuation</span> scenarios, evaluate the outputs, and decide which model to publish
          </p>
        </div>

        {/* Right Column - Valuation Models */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Render valuation model cards */}
          {valuationModels.map((model) => (
            <ValuationModelCard
              key={model.id}
              model={model}
              onPublish={() => handlePublishModel(model.id)}
            />
          ))}

          {/* Render loading cards */}
          {loadingModels.map((modelId) => (
            <LoadingModelCard
              key={`loading-${modelId}`}
              modelId={modelId}
            />
          ))}

          {/* Empty state - always shown at bottom */}
          <div style={{
            border: `1px solid ${colors.theme.primary400}`,
            borderRadius: borderRadius[12],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            minHeight: '200px'
          }}>
            <p style={{
              ...typography.styles.bodyL,
              color: colors.blackAndWhite.black300,
              textAlign: 'center',
              margin: 0
            }}>
              Adjust the settings and click "Test valuation" to add new models.
            </p>
          </div>
        </div>
      </div>

      {/* Upload Triangle Modal */}
      <Modal
        isOpen={selectedTriangle !== null}
        onClose={handleCloseModal}
        title={modalTitle}
        width="648px"
        maxHeight="90vh"
        showBackdrop={true}
        backdropColor="white"
        backdropBlur={false}
        footer={
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}>
            {/* Back button on the left */}
            <Button
              variant="primary"
              color="white"
              showIcon={false}
              onClick={handleCloseModal}
            >
              back
            </Button>

            {/* Upload button on the right */}
            <Button
              variant="primary"
              color="black"
              showIcon={false}
              onClick={handleAddTriangle}
              style={{
                width: '140px',
                height: '37px',
                ...(((uploadMode === 'upload' && !selectedFile) || (uploadMode === 'existing' && !selectedExisting)) && {
                  backgroundColor: colors.blackAndWhite.black300,
                  cursor: 'not-allowed',
                }),
              }}
              disabled={(uploadMode === 'upload' && !selectedFile) || (uploadMode === 'existing' && !selectedExisting)}
            >
              Add triangle
            </Button>
          </div>
        }
      >
        <div style={{
          backgroundColor: colors.theme.primary200,
          borderRadius: borderRadius[8],
          padding: '20px 15px',
          marginBottom: '20px',
          height: uploadMode === 'existing' ? '400px' : '300px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Button Selectors */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '10px',
          }}>
            <div style={{ flex: 1 }}>
              <ButtonSelector
                selectorType="radio"
                label="Upload file"
                checked={uploadMode === 'upload'}
                onChange={() => setUploadMode('upload')}
              />
            </div>
            <div style={{ flex: 1 }}>
              <ButtonSelector
                selectorType="radio"
                label="Select Existing"
                checked={uploadMode === 'existing'}
                onChange={() => setUploadMode('existing')}
              />
            </div>
          </div>

          {/* Drag and Drop Box (only show when upload mode is selected) */}
          {uploadMode === 'upload' && (
            <div
              style={{
                border: `2px dashed ${colors.theme.primary400}`,
                borderRadius: borderRadius[8],
                textAlign: 'center',
                backgroundColor: colors.blackAndWhite.white,
                cursor: 'pointer',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleBrowseClick}
            >
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: colors.success.fill,
                borderRadius: borderRadius[8],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <DownloadMedium color={colors.blackAndWhite.black900} />
              </div>
              <div style={{
                ...typography.styles.bodyL,
                color: colors.blackAndWhite.black900
              }}>
                Drag and drop your file here or click to{' '}
                <span
                  style={{
                    color: colors.blackAndWhite.black900,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBrowseClick();
                  }}
                >
                  browse files
                </span>
              </div>
            </div>
          )}

          {/* Custom Triangle Selector (only show when existing mode is selected) */}
          {uploadMode === 'existing' && (
            <div style={{
              backgroundColor: colors.blackAndWhite.white,
              border: `1px solid ${colors.theme.primary400}`,
              borderRadius: borderRadius[4],
              padding: '5px 10px 10px 20px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}>
              {/* Search Input */}
              <div style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '6px',
              }}>
                <input
                  type="text"
                  placeholder="Search for an existing triangle"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black500,
                    backgroundColor: 'transparent',
                  }}
                />
              </div>

              {/* Divider */}
              <div style={{
                height: '1px',
                backgroundColor: colors.theme.primary400,
                marginBottom: '0px',
              }} />

              {/* Scrollable List */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                paddingRight: '10px',
              }}>
                {existingTriangles
                  .filter(triangle =>
                    triangle.label.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((triangle) => (
                    <div
                      key={triangle.value}
                      onClick={() => setSelectedExisting(triangle.value)}
                      style={{
                        padding: '10px 5px',
                        cursor: 'pointer',
                        ...typography.styles.bodyM,
                        color: colors.blackAndWhite.black900,
                        backgroundColor: selectedExisting === triangle.value ? colors.theme.primary700 : 'transparent',
                        borderRadius: selectedExisting === triangle.value ? borderRadius[4] : 0,
                      }}
                    >
                      {triangle.label}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </Layout>
  );
};

// Analytics Valuation Edit Page
export const AnalyticsValuationEdit: React.FC<AnalyticsValuationEditProps> = (props) => {
  return (
    <ThemeProvider initialTheme="analytics">
      <AnalyticsValuationEditContent {...props} />
    </ThemeProvider>
  );
};
