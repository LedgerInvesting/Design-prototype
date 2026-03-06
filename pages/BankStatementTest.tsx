import React, { useState } from 'react';
import { ThemeProvider, useSemanticColors } from '@design-library/tokens';
import { typography, borderRadius, shadows, spacing } from '@design-library/tokens';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot } from 'recharts';
import { ChevronLeftSmall, ChevronRightSmall } from '@design-library/icons';

// Generate realistic bank statement data for 18 months
const generateBankData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const years = [2024, 2025];
  const data = [];

  let date = new Date(2024, 0, 1); // Start from Jan 2024

  for (let i = 0; i < 18; i++) {
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const monthLabel = `${months[monthIndex]} ${year}`;

    // Generate realistic income and expense patterns
    const baseIncome = 85000 + Math.random() * 25000; // $85k-$110k
    const baseExpenses = 45000 + Math.random() * 20000; // $45k-$65k

    // Add some seasonal variation
    const seasonalMultiplier = Math.sin((monthIndex / 12) * Math.PI * 2) * 0.15 + 1;

    const income = Math.round(baseIncome * seasonalMultiplier);
    const expenses = Math.round(baseExpenses * seasonalMultiplier);
    const netFlow = income - expenses;

    // Calculate cumulative balance (starting with $250k)
    const balance = i === 0 ? 250000 : data[i - 1].balance + netFlow;

    // Calculate daily averages
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const avgDailyIncome = Math.round(income / daysInMonth);
    const avgDailyExpense = Math.round(expenses / daysInMonth);

    // Transaction counts
    const depositCount = Math.floor(10 + Math.random() * 15);
    const withdrawalCount = Math.floor(25 + Math.random() * 20);

    data.push({
      month: monthLabel,
      income,
      expenses,
      netFlow,
      balance: Math.round(balance),
      avgDailyIncome,
      avgDailyExpense,
      depositCount,
      withdrawalCount,
      largestDeposit: Math.round(income * (0.3 + Math.random() * 0.4)),
      largestWithdrawal: Math.round(expenses * (0.25 + Math.random() * 0.35)),
    });

    date.setMonth(date.getMonth() + 1);
  }

  return data;
};

const bankData = generateBankData();

/**
 * Metric Card Component
 *
 * Displays a single financial metric with label and value
 */
const MetricCard: React.FC<{
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}> = ({ label, value, trend, trendValue }) => {
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
      borderRadius: borderRadius[12],
      padding: spacing[6],
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[2],
      boxShadow: shadows.base,
    }}>
      <div style={{
        ...typography.styles.captionL,
        color: colors.blackAndWhite.black500,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        {label}
      </div>
      <div style={{
        ...typography.styles.dataXL,
        color: colors.blackAndWhite.black900,
      }}>
        {value}
      </div>
      {trend && trendValue && (
        <div style={{
          ...typography.styles.captionM,
          color: getTrendColor(),
          display: 'flex',
          alignItems: 'center',
          gap: spacing[1],
        }}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
        </div>
      )}
    </div>
  );
};

/**
 * Custom Tooltip for Chart
 */
const CustomChartTooltip = ({ active, payload, label }: any) => {
  const colors = useSemanticColors();

  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: colors.blackAndWhite.white,
        padding: '12px',
        borderRadius: borderRadius[8],
        border: `1px solid ${colors.theme.primary400}`,
        boxShadow: shadows.medium,
      }}>
        <p style={{
          ...typography.styles.bodyM,
          color: colors.blackAndWhite.black900,
          margin: '0 0 8px 0',
          fontWeight: 600,
        }}>
          {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: index < payload.length - 1 ? '4px' : 0,
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              backgroundColor: entry.color,
              borderRadius: '2px',
            }} />
            <p style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black500,
              margin: 0,
            }}>
              {entry.name}: ${(entry.value || 0).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * Bank Statement Test Page
 *
 * Interactive financial dashboard with scrollable graph that updates metrics based on selected time period.
 * Features:
 * - Line chart showing income and expenses over 18 months
 * - 7 key financial metrics
 * - Click on chart to select different months and update metrics
 * - Scroll navigation for viewing different time periods
 */
const BankStatementTestContent: React.FC = () => {
  const colors = useSemanticColors();

  // State for selected month (default to most recent)
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(bankData.length - 1);
  const [visibleStartIndex, setVisibleStartIndex] = useState(Math.max(0, bankData.length - 12));

  const selectedData = bankData[selectedMonthIndex];
  const visibleData = bankData.slice(visibleStartIndex, visibleStartIndex + 12);

  // Calculate trend compared to previous month
  const prevMonthData = selectedMonthIndex > 0 ? bankData[selectedMonthIndex - 1] : null;
  const incomeTrend = prevMonthData ?
    ((selectedData.income - prevMonthData.income) / prevMonthData.income * 100).toFixed(1) : '0.0';
  const expenseTrend = prevMonthData ?
    ((selectedData.expenses - prevMonthData.expenses) / prevMonthData.expenses * 100).toFixed(1) : '0.0';

  const handleChartClick = (data: any) => {
    if (data && data.activeLabel) {
      const clickedIndex = bankData.findIndex(item => item.month === data.activeLabel);
      if (clickedIndex !== -1) {
        setSelectedMonthIndex(clickedIndex);
      }
    }
  };

  const handleScrollLeft = () => {
    setVisibleStartIndex(Math.max(0, visibleStartIndex - 1));
  };

  const handleScrollRight = () => {
    setVisibleStartIndex(Math.min(bankData.length - 12, visibleStartIndex + 1));
  };

  const canScrollLeft = visibleStartIndex > 0;
  const canScrollRight = visibleStartIndex < bankData.length - 12;

  // Custom dot component to highlight selected month
  const CustomDot = (props: any) => {
    const { cx, cy, dataKey, payload } = props;
    const isSelected = payload.month === selectedData.month;

    if (isSelected) {
      return (
        <g>
          <circle
            cx={cx}
            cy={cy}
            r={8}
            fill={colors.blackAndWhite.white}
            stroke={dataKey === 'income' ? '#2fa915' : '#e72b2b'}
            strokeWidth={3}
          />
        </g>
      );
    }

    return null;
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.blackAndWhite.black50,
      padding: '60px',
    }}>
      {/* Header */}
      <div style={{ marginBottom: spacing[10] }}>
        <h1 style={{
          ...typography.styles.headlineH2,
          color: colors.blackAndWhite.black900,
          margin: 0,
          marginBottom: spacing[2],
        }}>
          Bank Statement Overview
        </h1>
        <p style={{
          ...typography.styles.bodyL,
          color: colors.blackAndWhite.black500,
          margin: 0,
        }}>
          Interactive cash flow analysis • Click on any month to view details
        </p>
      </div>

      {/* Currently Viewing */}
      <div style={{
        backgroundColor: colors.theme.primary200,
        border: `1px solid ${colors.theme.primary400}`,
        borderRadius: borderRadius[8],
        padding: spacing[4],
        marginBottom: spacing[8],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <span style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black700,
          }}>
            Currently viewing:
          </span>
          <span style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black900,
            fontWeight: 600,
            marginLeft: spacing[2],
          }}>
            {selectedData.month}
          </span>
        </div>
        <div style={{
          ...typography.styles.captionL,
          color: colors.blackAndWhite.black500,
        }}>
          {selectedData.depositCount + selectedData.withdrawalCount} total transactions
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: spacing[6],
        marginBottom: spacing[10],
      }}>
        <MetricCard
          label="Total Income"
          value={`$${selectedData.income.toLocaleString()}`}
          trend={prevMonthData ? (selectedData.income > prevMonthData.income ? 'up' : 'down') : undefined}
          trendValue={prevMonthData ? `${Math.abs(parseFloat(incomeTrend))}% vs last month` : undefined}
        />
        <MetricCard
          label="Total Expenses"
          value={`$${selectedData.expenses.toLocaleString()}`}
          trend={prevMonthData ? (selectedData.expenses > prevMonthData.expenses ? 'down' : 'up') : undefined}
          trendValue={prevMonthData ? `${Math.abs(parseFloat(expenseTrend))}% vs last month` : undefined}
        />
        <MetricCard
          label="Net Cash Flow"
          value={`$${selectedData.netFlow.toLocaleString()}`}
        />
        <MetricCard
          label="Account Balance"
          value={`$${selectedData.balance.toLocaleString()}`}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: spacing[6],
        marginBottom: spacing[10],
      }}>
        <MetricCard
          label="Avg Daily Income"
          value={`$${selectedData.avgDailyIncome.toLocaleString()}`}
        />
        <MetricCard
          label="Avg Daily Expense"
          value={`$${selectedData.avgDailyExpense.toLocaleString()}`}
        />
        <MetricCard
          label="Largest Transaction"
          value={`$${Math.max(selectedData.largestDeposit, selectedData.largestWithdrawal).toLocaleString()}`}
        />
      </div>

      {/* Chart Section */}
      <div style={{
        backgroundColor: colors.blackAndWhite.white,
        border: `1px solid ${colors.blackAndWhite.black100}`,
        borderRadius: borderRadius[12],
        padding: spacing[8],
        boxShadow: shadows.base,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: spacing[6],
        }}>
          <div>
            <h2 style={{
              ...typography.styles.headlineH3,
              color: colors.blackAndWhite.black900,
              margin: 0,
              marginBottom: spacing[1],
            }}>
              Cash Flow Timeline
            </h2>
            <p style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black500,
              margin: 0,
            }}>
              Monthly income and expenses • Click to select a month
            </p>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', gap: spacing[2], alignItems: 'center' }}>
            <button
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: borderRadius[8],
                border: `1px solid ${colors.blackAndWhite.black200}`,
                backgroundColor: canScrollLeft ? colors.blackAndWhite.white : colors.blackAndWhite.black50,
                cursor: canScrollLeft ? 'pointer' : 'not-allowed',
                opacity: canScrollLeft ? 1 : 0.4,
              }}
            >
              <ChevronLeftSmall color={colors.blackAndWhite.black700} />
            </button>

            <div style={{
              ...typography.styles.captionL,
              color: colors.blackAndWhite.black700,
              minWidth: '150px',
              textAlign: 'center',
            }}>
              {visibleData[0]?.month} - {visibleData[visibleData.length - 1]?.month}
            </div>

            <button
              onClick={handleScrollRight}
              disabled={!canScrollRight}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: borderRadius[8],
                border: `1px solid ${colors.blackAndWhite.black200}`,
                backgroundColor: canScrollRight ? colors.blackAndWhite.white : colors.blackAndWhite.black50,
                cursor: canScrollRight ? 'pointer' : 'not-allowed',
                opacity: canScrollRight ? 1 : 0.4,
              }}
            >
              <ChevronRightSmall color={colors.blackAndWhite.black700} />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          gap: spacing[6],
          marginBottom: spacing[6],
          paddingLeft: spacing[2],
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
            <div style={{
              width: '16px',
              height: '3px',
              backgroundColor: '#2fa915',
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
              width: '16px',
              height: '3px',
              backgroundColor: '#e72b2b',
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

        {/* Chart */}
        <div style={{ height: '450px', overflow: 'visible' }}>
          <ResponsiveContainer width="100%" height="100%" style={{ overflow: 'visible' }}>
            <ComposedChart
              data={visibleData}
              margin={{ top: 20, right: 50, left: 20, bottom: 40 }}
              onClick={handleChartClick}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.theme.primary450}
              />
              <XAxis
                dataKey="month"
                stroke={colors.theme.primary450}
                axisLine={{ stroke: colors.blackAndWhite.black900, strokeWidth: 2 }}
                tick={{ fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }}
                tickLine={false}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke={colors.theme.primary450}
                axisLine={false}
                tick={{ fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }}
                tickLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomChartTooltip />} cursor={{ stroke: colors.theme.primary400, strokeWidth: 1 }} />

              {/* Income Line */}
              <Line
                type="monotone"
                dataKey="income"
                stroke="#2fa915"
                strokeWidth={3}
                dot={<CustomDot />}
                activeDot={{ r: 8, fill: colors.blackAndWhite.white, stroke: '#2fa915', strokeWidth: 3 }}
                name="Income"
              />

              {/* Expenses Line */}
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#e72b2b"
                strokeWidth={3}
                dot={<CustomDot />}
                activeDot={{ r: 8, fill: colors.blackAndWhite.white, stroke: '#e72b2b', strokeWidth: 3 }}
                name="Expenses"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Instructions */}
        <div style={{
          marginTop: spacing[6],
          padding: spacing[4],
          backgroundColor: colors.blackAndWhite.black50,
          borderRadius: borderRadius[8],
          ...typography.styles.captionL,
          color: colors.blackAndWhite.black500,
          textAlign: 'center',
        }}>
          💡 Click on any point on the chart to view that month's financial details
        </div>
      </div>
    </div>
  );
};

/**
 * Bank Statement Test Page with Theme Provider
 */
export const BankStatementTest: React.FC = () => {
  return (
    <ThemeProvider initialTheme="reports">
      <BankStatementTestContent />
    </ThemeProvider>
  );
};
