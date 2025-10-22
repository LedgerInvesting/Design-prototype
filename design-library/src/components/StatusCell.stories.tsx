import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatusCell } from './StatusCell';
import { ThemeProvider } from '../tokens/ThemeProvider';

const meta: Meta<typeof StatusCell> = {
  title: 'Components/Table/StatusCell',
  component: StatusCell,
  decorators: [
    (Story) => (
      <ThemeProvider theme="contracts">
        <div style={{ padding: '20px', maxWidth: '300px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'StatusCell component displays status indicators with colored circles in table cells. Features a 6px circle with a 4px stroke.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['ready', 'processing', 'error', 'done'],
      description: 'The status type to display',
    },
    text: {
      control: 'text',
      description: 'Optional custom text to display (defaults to capitalized status)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusCell>;

/**
 * Default status cell showing "Ready" state
 */
export const Ready: Story = {
  args: {
    status: 'ready',
  },
};

/**
 * Processing status cell
 */
export const Processing: Story = {
  args: {
    status: 'processing',
  },
};

/**
 * Error status cell
 */
export const Error: Story = {
  args: {
    status: 'error',
  },
};

/**
 * Done status cell
 */
export const Done: Story = {
  args: {
    status: 'done',
  },
};

/**
 * Status cell with custom text
 */
export const CustomText: Story = {
  args: {
    status: 'processing',
    text: 'In Progress',
  },
};

/**
 * All status types in a table view
 */
export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '200px' }}>
      <StatusCell status="ready" />
      <StatusCell status="processing" />
      <StatusCell status="error" />
      <StatusCell status="done" />
    </div>
  ),
};

/**
 * Status cells with custom text labels
 */
export const CustomLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '200px' }}>
      <StatusCell status="ready" text="Draft" />
      <StatusCell status="processing" text="Pending" />
      <StatusCell status="error" text="Cancelled" />
      <StatusCell status="done" text="Active" />
    </div>
  ),
};
