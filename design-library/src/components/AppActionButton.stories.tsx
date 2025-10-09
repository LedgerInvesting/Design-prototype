import type { Meta, StoryObj } from '@storybook/react';
import { AppActionButton } from './AppActionButton';

const meta = {
  title: 'Test Components/AppActionButton',
  component: AppActionButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Test component for displaying app action buttons with icon and text. Used in TopNav for cross-app navigation actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    app: {
      control: 'select',
      options: ['marketplace', 'reports', 'analytics', 'contracts'],
      description: 'The app/product to show icon for',
    },
    actionText: {
      control: 'text',
      description: 'The action text to display',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
} satisfies Meta<typeof AppActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default AppActionButton with Contracts icon
 */
export const Default: Story = {
  args: {
    app: 'contracts',
    actionText: 'Review contract',
  },
};

/**
 * Marketplace app action
 */
export const Marketplace: Story = {
  args: {
    app: 'marketplace',
    actionText: 'View Offering',
  },
};

/**
 * Reports app action
 */
export const Reports: Story = {
  args: {
    app: 'reports',
    actionText: 'View Report',
  },
};

/**
 * Analytics app action
 */
export const Analytics: Story = {
  args: {
    app: 'analytics',
    actionText: 'Run Valuation',
  },
};

/**
 * Multiple action buttons together (as they would appear in TopNav)
 */
export const MultipleButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <AppActionButton
        app="contracts"
        actionText="Review contract"
        onClick={() => console.log('Navigate to Contracts')}
      />
      <AppActionButton
        app="analytics"
        actionText="Run Valuation"
        onClick={() => console.log('Navigate to Analytics')}
      />
    </div>
  ),
};
