import React, { useState } from 'react';
import { ThemeProvider, useSemanticColors } from '@design-library/tokens';
import { typography, borderRadius, shadows, spacing } from '@design-library/tokens';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ArrowUpSmall, ArrowDownSmall } from '@design-library/icons';

// Generate realistic bank statement data for 24 months
const generateBankData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = [];

  let date = new Date(2023, 6, 1); // Start from Jul 2023

  for (let i = 0; i < 24; i++) {
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const monthLabel = `${months[monthIndex]} ${year}`;

    // Generate realistic income and expense patterns
    const baseIncome = 95000 + Math.random() * 30000; // $95k-$125k
    const baseExpenses = 55000 + Math.random() * 25000; // $55k-$80k

    // Add some seasonal variation
    const seasonalMultiplier = Math.sin((monthIndex / 12) * Math.PI * 2) * 0.2 + 1;

    const income = Math.round(baseIncome * seasonalMultiplier);
    const expenses = Math.round(baseExpenses * seasonalMultiplier);
    const netFlow = income - expenses;

    // Calculate cumulative balance (starting with $180k)
    const balance = i === 0 ? 180000 : data[i - 1].balance + netFlow;

    // Additional metrics
    const savingsRate = Math.round((netFlow / income) * 100);
    const expenseRatio = Math.round((expenses / income) * 100);

    data.push({
      month: monthLabel,
      shortMonth: `${months[monthIndex]} '${String(year).slice(2)}`,
      income,
      expenses,
      netFlow,
      balance: Math.round(balance),
      savingsRate,
      expenseRatio,
    });

    date.setMonth(date.getMonth() + 1);
  }

  return data;
};

const bankData = generateBankData();

/**
 * Compact Metric Card Component
 */
const CompactMetricCard: React.FC<{
  icon?: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  color?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}> = ({ icon, label, value, subValue, color, trend, trendValue }) => {
  const colors = useSemanticColors();

  const getTrendColor = () => {
    if (!trend) return colors.blackAndWhite.black500;
    if (trend === 'up') return '#2fa915';
    if (trend === 'down') return '#e72b2b';
    return colors.blackAndWhite.black500;
  };

  return (
    <div style={{
      backgroundColor: colors.blackAndWhite.white,
      border: `1px solid ${colors.blackAndWhite.black100}`,
      borderRadius: borderRadius[8],
      padding: spacing[5],
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[2],
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[2],
      }}>
        {icon}
        <div style={{
          ...typography.styles.captionM,
          color: colors.blackAndWhite.black500,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          {label}
        </div>
      </div>

      <div style={{
        ...typography.styles.dataL,
        color: color || colors.blackAndWhite.black900,
        fontWeight: 600,
      }}>
        {value}
      </div>

      {subValue && (
        <div style={{
          ...typography.styles.captionL,
          color: colors.blackAndWhite.black500,
        }}>
          {subValue}
        </div>
      )}

      {trend && trendValue && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[1],
          marginTop: spacing[1],
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: borderRadius[4],
            backgroundColor: trend === 'up' ? '#e7f8e3' : trend === 'down' ? '#ffe7e7' : colors.blackAndWhite.black50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {trend === 'up' ? (
              <ArrowUpSmall color="#2fa915" />
            ) : trend === 'down' ? (
              <ArrowDownSmall color="#e72b2b" />
            ) : null}
          </div>
          <span style={{
            ...typography.styles.captionM,
            color: getTrendColor(),
            fontWeight: 500,
          }}>
            {trendValue}
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Custom Tooltip for Area Chart
 */
const CustomAreaTooltip = ({ active, payload, label }: any) => {
  const colors = useSemanticColors();

  if (active && payload && payload.length) {
    const income = payload.find((p: any) => p.dataKey === 'income')?.value || 0;
    const expenses = payload.find((p: any) => p.dataKey === 'expenses')?.value || 0;
    const netFlow = income - expenses;

    return (
      <div style={{
        backgroundColor: colors.blackAndWhite.white,
        padding: '16px',
        borderRadius: borderRadius[8],
        border: `1px solid ${colors.theme.primary400}`,
        boxShadow: shadows.large,
        minWidth: '200px',
      }}>
        <p style={{
          ...typography.styles.bodyM,
          color: colors.blackAndWhite.black900,
          margin: '0 0 12px 0',
          fontWeight: 600,
        }}>
          {label}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '10px',
                height: '10px',
                backgroundColor: '#2fa915',
                borderRadius: '2px',
              }} />
              <span style={{
                ...typography.styles.bodyS,
                color: colors.blackAndWhite.black700,
              }}>
                Income
              </span>
            </div>
            <span style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900,
              fontWeight: 600,
            }}>
              ${income.toLocaleString()}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '10px',
                height: '10px',
                backgroundColor: '#e72b2b',
                borderRadius: '2px',
              }} />
              <span style={{
                ...typography.styles.bodyS,
                color: colors.blackAndWhite.black700,
              }}>
                Expenses
              </span>
            </div>
            <span style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900,
              fontWeight: 600,
            }}>
              ${expenses.toLocaleString()}
            </span>
          </div>

          <div style={{
            borderTop: `1px solid ${colors.blackAndWhite.black100}`,
            paddingTop: '8px',
            marginTop: '4px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                ...typography.styles.bodyS,
                color: colors.blackAndWhite.black700,
                fontWeight: 600,
              }}>
                Net Flow
              </span>
              <span style={{
                ...typography.styles.bodyM,
                color: netFlow >= 0 ? '#2fa915' : '#e72b2b',
                fontWeight: 600,
              }}>
                {netFlow >= 0 ? '+' : ''}${netFlow.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

/**
 * Bank Statement Test Page V2
 *
 * Alternative approach with area chart and different layout.
 * Features:
 * - Stacked area chart showing income vs expenses
 * - Net flow visualization
 * - Compact metric cards in horizontal layout
 * - Click on chart to select different months
 */
const BankStatementTest2Content: React.FC = () => {
  const colors = useSemanticColors();

  // State for selected month (default to most recent)
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(bankData.length - 1);

  const selectedData = bankData[selectedMonthIndex];

  // Calculate trend compared to previous month
  const prevMonthData = selectedMonthIndex > 0 ? bankData[selectedMonthIndex - 1] : null;
  const incomeTrend = prevMonthData ?
    ((selectedData.income - prevMonthData.income) / prevMonthData.income * 100).toFixed(1) : '0.0';
  const netFlowTrend = prevMonthData ?
    ((selectedData.netFlow - prevMonthData.netFlow) / Math.abs(prevMonthData.netFlow) * 100).toFixed(1) : '0.0';

  const handleChartClick = (data: any) => {
    if (data && data.activeLabel) {
      const clickedIndex = bankData.findIndex(item => item.month === data.activeLabel);
      if (clickedIndex !== -1) {
        setSelectedMonthIndex(clickedIndex);
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.blackAndWhite.black50,
      padding: '60px',
    }}>
      {/* Header with Selected Month */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: spacing[8],
      }}>
        <div>
          <h1 style={{
            ...typography.styles.headlineH2,
            color: colors.blackAndWhite.black900,
            margin: 0,
            marginBottom: spacing[2],
          }}>
            Financial Dashboard
          </h1>
          <p style={{
            ...typography.styles.bodyL,
            color: colors.blackAndWhite.black500,
            margin: 0,
          }}>
            Click on the chart to explore monthly financial data
          </p>
        </div>

        <div style={{
          backgroundColor: colors.blackAndWhite.white,
          border: `2px solid ${colors.theme.main}`,
          borderRadius: borderRadius[8],
          padding: `${spacing[3]} ${spacing[5]}`,
        }}>
          <div style={{
            ...typography.styles.captionM,
            color: colors.blackAndWhite.black500,
            marginBottom: spacing[1],
          }}>
            VIEWING
          </div>
          <div style={{
            ...typography.styles.dataM,
            color: colors.blackAndWhite.black900,
            fontWeight: 600,
          }}>
            {selectedData.month}
          </div>
        </div>
      </div>

      {/* Chart Section - Full Width */}
      <div style={{
        backgroundColor: colors.blackAndWhite.white,
        border: `1px solid ${colors.blackAndWhite.black100}`,
        borderRadius: borderRadius[12],
        padding: spacing[8],
        marginBottom: spacing[8],
        boxShadow: shadows.base,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: spacing[6],
        }}>
          <h2 style={{
            ...typography.styles.headlineH3,
            color: colors.blackAndWhite.black900,
            margin: 0,
          }}>
            Cash Flow Analysis
          </h2>

          {/* Legend */}
          <div style={{ display: 'flex', gap: spacing[6] }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
              <div style={{
                width: '24px',
                height: '12px',
                backgroundColor: 'rgba(47, 169, 21, 0.3)',
                border: '2px solid #2fa915',
                borderRadius: borderRadius[4],
              }} />
              <span style={{
                ...typography.styles.bodyM,
                color: colors.blackAndWhite.black700,
              }}>
                Income
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
              <div style={{
                width: '24px',
                height: '12px',
                backgroundColor: 'rgba(231, 43, 43, 0.3)',
                border: '2px solid #e72b2b',
                borderRadius: borderRadius[4],
              }} />
              <span style={{
                ...typography.styles.bodyM,
                color: colors.blackAndWhite.black700,
              }}>
                Expenses
              </span>
            </div>
          </div>
        </div>

        {/* Area Chart */}
        <div style={{ height: '400px', overflow: 'visible' }}>
          <ResponsiveContainer width="100%" height="100%" style={{ overflow: 'visible' }}>
            <ComposedChart
              data={bankData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              onClick={handleChartClick}
            >
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2fa915" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#2fa915" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e72b2b" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#e72b2b" stopOpacity={0.1}/>
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.theme.primary450}
                vertical={false}
              />

              <XAxis
                dataKey="shortMonth"
                stroke={colors.theme.primary450}
                axisLine={{ stroke: colors.blackAndWhite.black900, strokeWidth: 2 }}
                tick={{ fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }}
                tickLine={false}
              />

              <YAxis
                stroke={colors.theme.primary450}
                axisLine={false}
                tick={{ fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }}
                tickLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />

              <Tooltip content={<CustomAreaTooltip />} cursor={{ stroke: colors.theme.primary400, strokeWidth: 2, strokeDasharray: '5 5' }} />

              {/* Income Area */}
              <Area
                type="monotone"
                dataKey="income"
                stroke="#2fa915"
                strokeWidth={3}
                fill="url(#incomeGradient)"
                fillOpacity={1}
                name="Income"
              />

              {/* Expenses Area */}
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#e72b2b"
                strokeWidth={3}
                fill="url(#expensesGradient)"
                fillOpacity={1}
                name="Expenses"
              />

              {/* Vertical line for selected month */}
              <ReferenceLine
                x={selectedData.shortMonth}
                stroke={colors.theme.main}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Metrics Grid - 3 Columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: spacing[6],
        marginBottom: spacing[6],
      }}>
        <CompactMetricCard
          label="Total Income"
          value={`$${selectedData.income.toLocaleString()}`}
          subValue={`${selectedData.savingsRate}% savings rate`}
          color="#2fa915"
          trend={prevMonthData ? (parseFloat(incomeTrend) >= 0 ? 'up' : 'down') : undefined}
          trendValue={prevMonthData ? `${Math.abs(parseFloat(incomeTrend))}% vs last month` : undefined}
        />

        <CompactMetricCard
          label="Total Expenses"
          value={`$${selectedData.expenses.toLocaleString()}`}
          subValue={`${selectedData.expenseRatio}% of income`}
          color="#e72b2b"
        />

        <CompactMetricCard
          label="Net Cash Flow"
          value={`${selectedData.netFlow >= 0 ? '+' : ''}$${selectedData.netFlow.toLocaleString()}`}
          subValue={selectedData.netFlow >= 0 ? 'Positive flow' : 'Negative flow'}
          color={selectedData.netFlow >= 0 ? '#2fa915' : '#e72b2b'}
          trend={prevMonthData ? (parseFloat(netFlowTrend) >= 0 ? 'up' : 'down') : undefined}
          trendValue={prevMonthData ? `${Math.abs(parseFloat(netFlowTrend))}%` : undefined}
        />
      </div>

      {/* Balance Card - Full Width */}
      <div style={{
        backgroundColor: colors.theme.primary200,
        border: `2px solid ${colors.theme.primary400}`,
        borderRadius: borderRadius[12],
        padding: spacing[8],
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <div style={{
            ...typography.styles.captionL,
            color: colors.blackAndWhite.black700,
            marginBottom: spacing[2],
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            Account Balance
          </div>
          <div style={{
            ...typography.styles.dataXXL,
            color: colors.blackAndWhite.black900,
            fontWeight: 600,
          }}>
            ${selectedData.balance.toLocaleString()}
          </div>
        </div>

        <div style={{
          textAlign: 'right',
        }}>
          <div style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black700,
            marginBottom: spacing[2],
          }}>
            24-month trend
          </div>
          <div style={{
            ...typography.styles.dataL,
            color: bankData[bankData.length - 1].balance > bankData[0].balance ? '#2fa915' : '#e72b2b',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: spacing[2],
            justifyContent: 'flex-end',
          }}>
            {bankData[bankData.length - 1].balance > bankData[0].balance ? (
              <ArrowUpSmall color="#2fa915" />
            ) : (
              <ArrowDownSmall color="#e72b2b" />
            )}
            {((bankData[bankData.length - 1].balance - bankData[0].balance) / bankData[0].balance * 100).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Bank Statement Test Page V2 with Theme Provider
 */
export const BankStatementTest2: React.FC = () => {
  return (
    <ThemeProvider initialTheme="reports">
      <BankStatementTest2Content />
    </ThemeProvider>
  );
};
