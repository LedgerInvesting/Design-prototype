import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chart } from './Chart';
import { ThemeProvider } from '../tokens/ThemeProvider';

const meta: Meta<typeof Chart> = {
  title: 'Components/Chart',
  component: Chart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible chart component built on Recharts with full design system integration. Automatically adapts colors to the current theme (Reports blue, Analytics green, Marketplace violet).',
      },
    },
  },
  argTypes: {
    data: {
      description: 'Array of data objects to display in the chart',
      control: 'object',
    },
    type: {
      description: 'Type of chart to render',
      control: 'radio',
      options: ['line', 'area', 'bar'],
    },
    dataKey: {
      description: 'Key for the data values to display',
      control: 'text',
    },
    xAxisKey: {
      description: 'Key for the x-axis labels',
      control: 'text',
    },
    height: {
      description: 'Height of the chart in pixels',
      control: { type: 'range', min: 200, max: 600, step: 50 },
    },
    showGrid: {
      description: 'Whether to show the grid lines',
      control: 'boolean',
    },
    showTooltip: {
      description: 'Whether to show tooltips on hover',
      control: 'boolean',
    },
    showLegend: {
      description: 'Whether to show the legend',
      control: 'boolean',
    },
    yAxisInside: {
      description: 'Whether to show Y-axis labels inside the chart',
      control: 'boolean',
    },
    xAxisInside: {
      description: 'Whether to show X-axis labels inside the chart',
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialTheme="reports">
        <div style={{ width: '600px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Chart>;

// Sample data for stories
const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 5500 },
];

const premiumData = [
  { quarter: 'Q1', premium: 12000 },
  { quarter: 'Q2', premium: 15000 },
  { quarter: 'Q3', premium: 13500 },
  { quarter: 'Q4', premium: 18000 },
];

const transactionData = [
  { day: 'Mon', transactions: 45 },
  { day: 'Tue', transactions: 52 },
  { day: 'Wed', transactions: 48 },
  { day: 'Thu', transactions: 61 },
  { day: 'Fri', transactions: 55 },
];

/**
 * Default line chart with revenue data
 */
export const Default: Story = {
  args: {
    data: revenueData,
    type: 'line',
    dataKey: 'revenue',
    xAxisKey: 'month',
    height: 300,
    showGrid: true,
    showTooltip: true,
    showLegend: false,
  },
};

/**
 * Area chart showing premium trends
 */
export const AreaChart: Story = {
  args: {
    data: premiumData,
    type: 'area',
    dataKey: 'premium',
    xAxisKey: 'quarter',
    height: 300,
    showGrid: true,
    showTooltip: true,
    showLegend: false,
  },
};

/**
 * Bar chart showing transaction counts
 */
export const BarChart: Story = {
  args: {
    data: transactionData,
    type: 'bar',
    dataKey: 'transactions',
    xAxisKey: 'day',
    height: 300,
    showGrid: true,
    showTooltip: true,
    showLegend: false,
  },
};

/**
 * Chart without grid lines for cleaner appearance
 */
export const NoGrid: Story = {
  args: {
    data: revenueData,
    type: 'line',
    dataKey: 'revenue',
    xAxisKey: 'month',
    height: 300,
    showGrid: false,
    showTooltip: true,
    showLegend: false,
  },
};

/**
 * Analytics theme (green) - demonstrates theme adaptation
 */
export const AnalyticsTheme: Story = {
  args: {
    data: revenueData,
    type: 'area',
    dataKey: 'revenue',
    xAxisKey: 'month',
    height: 300,
    showGrid: true,
    showTooltip: true,
    showLegend: false,
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialTheme="analytics">
        <div style={{ width: '600px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'The same chart automatically adapts to Analytics green theme colors.',
      },
    },
  },
};

/**
 * Marketplace theme (violet) - demonstrates theme adaptation
 */
export const MarketplaceTheme: Story = {
  args: {
    data: premiumData,
    type: 'bar',
    dataKey: 'premium',
    xAxisKey: 'quarter',
    height: 300,
    showGrid: true,
    showTooltip: true,
    showLegend: false,
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialTheme="marketplace">
        <div style={{ width: '600px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'The same chart automatically adapts to Marketplace violet theme colors.',
      },
    },
  },
};

/**
 * Compact chart with reduced height
 */
export const CompactChart: Story = {
  args: {
    data: transactionData,
    type: 'line',
    dataKey: 'transactions',
    xAxisKey: 'day',
    height: 200,
    showGrid: false,
    showTooltip: true,
    showLegend: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Smaller chart suitable for dashboard cards or compact layouts.',
      },
    },
  },
};

/**
 * Chart with Y-axis inside the chart area
 */
export const YAxisInside: Story = {
  args: {
    data: revenueData,
    type: 'line',
    dataKey: 'revenue',
    xAxisKey: 'month',
    height: 300,
    showGrid: true,
    showTooltip: true,
    showLegend: false,
    yAxisInside: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Y-axis labels appear inside the chart on the right side for a cleaner left edge.',
      },
    },
  },
};

/**
 * Chart with both axes inside the chart area
 */
export const BothAxesInside: Story = {
  args: {
    data: premiumData,
    type: 'area',
    dataKey: 'premium',
    xAxisKey: 'quarter',
    height: 300,
    showGrid: true,
    showTooltip: true,
    showLegend: false,
    yAxisInside: true,
    xAxisInside: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Both X and Y axis labels appear inside the chart for maximum space efficiency.',
      },
    },
  },
};
