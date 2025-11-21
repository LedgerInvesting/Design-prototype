import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Breadcrumbs component for displaying navigation hierarchy.

**Key Features:**
- Hides ONLY app name (Reports, Analytics, Marketplace, Contracts)
- Shows all other breadcrumbs including main page name
- Last item is current page (black500, not clickable)
- Other items are clickable with hover state (black900)
- Uses chevron separator between items
- Responsive text with uppercase styling

**Rules:**
- App names (Reports, Analytics, Marketplace, Contracts) are automatically hidden
- Main page names and all intermediate pages are shown
- Current page (last item) is \`black500\` and not clickable
- Intermediate pages are \`black900\` and clickable
- Chevron separators between breadcrumb items
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Array of breadcrumb items. App names (Reports, Analytics, Marketplace, Contracts) are automatically hidden. Last item is treated as current page.',
      control: 'object',
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default breadcrumbs - app name automatically hidden, main page shown
 */
export const Default: Story = {
  args: {
    items: [
      { label: 'Reports' },  // App name - will be hidden
      { label: 'Insights Explorer', onClick: () => alert('Navigate to Insights Explorer') },
      { label: 'Program Details' }
    ],
  },
};

/**
 * Simple two-level - app name hidden, main page shown
 */
export const SimpleTwoLevel: Story = {
  args: {
    items: [
      { label: 'Analytics' },  // App name - will be hidden
      { label: 'Dashboard' }
    ],
  },
};

/**
 * Deep navigation with multiple levels - all pages shown except app name
 */
export const DeepNavigation: Story = {
  args: {
    items: [
      { label: 'Reports' },  // App name - will be hidden
      { label: 'Explorer', onClick: () => alert('Navigate to Explorer') },
      { label: 'Contracts', onClick: () => alert('Navigate to Contracts') },
      { label: 'Details', onClick: () => alert('Navigate to Details') },
      { label: 'Document View' }
    ],
  },
};

/**
 * With path URLs instead of onClick handlers
 */
export const WithPaths: Story = {
  args: {
    items: [
      { label: 'Reports' },  // App name - will be hidden
      { label: 'Insights Explorer', path: '/reports/insights-explorer' },
      { label: 'Program Details' }
    ],
  },
};

/**
 * Analytics theme example - Analytics app name hidden, Valuation main page shown
 */
export const AnalyticsTheme: Story = {
  args: {
    items: [
      { label: 'Analytics' },  // App name - will be hidden
      { label: 'Valuation', onClick: () => alert('Navigate to Valuation') },
      { label: 'Configuration' }
    ],
  },
};

/**
 * Marketplace theme example - Marketplace app name hidden
 */
export const MarketplaceTheme: Story = {
  args: {
    items: [
      { label: 'Marketplace' },  // App name - will be hidden
      { label: 'Offerings', onClick: () => alert('Navigate to Offerings') },
      { label: 'Product Details' }
    ],
  },
};

/**
 * Contracts theme example - Contracts app name hidden
 */
export const ContractsTheme: Story = {
  args: {
    items: [
      { label: 'Contracts' },  // App name - will be hidden
      { label: 'AI Extraction', onClick: () => alert('Navigate to AI Extraction') },
      { label: 'Document Details' }
    ],
  },
};
