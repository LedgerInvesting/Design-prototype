import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, Tab } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Navigation tabs component with support for 2-7 tabs, following the design system typography and spacing. Features automatic state management, custom content areas, and proper accessibility attributes.',
      },
    },
  },
  argTypes: {
    tabs: {
      description: 'Array of tab objects with id, label, and optional content',
      control: 'object',
    },
    activeTab: {
      description: 'ID of the currently active tab (controlled mode)',
      control: 'text',
    },
    onTabChange: {
      description: 'Callback function when tab changes',
      action: 'tab-changed',
    },
    variant: {
      description: 'Size variant of the tabs',
      control: 'radio',
      options: ['medium', 'small'],
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;


// Default story with 7 tabs
export const Default: Story = {
  args: {
    tabs: [
      { id: 'section-a', label: 'Section A' },
      { id: 'section-b', label: 'Section B' },
      { id: 'section-c', label: 'Section C' },
      { id: 'section-d', label: 'Section D' },
      { id: 'section-e', label: 'Section E' },
      { id: 'section-f', label: 'Section F' },
      { id: 'section-g', label: 'Section G' },
    ],
    variant: 'medium',
  },
};

// Two tabs
export const TwoTabs: Story = {
  args: {
    tabs: [
      { id: 'section-a', label: 'Section A' },
      { id: 'section-b', label: 'Section B' },
    ],
    variant: 'medium',
  },
};

// Three tabs
export const ThreeTabs: Story = {
  args: {
    tabs: [
      { id: 'section-a', label: 'Section A' },
      { id: 'section-b', label: 'Section B' },
      { id: 'section-c', label: 'Section C' },
    ],
    variant: 'medium',
  },
};

// Four tabs
export const FourTabs: Story = {
  args: {
    tabs: [
      { id: 'section-a', label: 'Section A' },
      { id: 'section-b', label: 'Section B' },
      { id: 'section-c', label: 'Section C' },
      { id: 'section-d', label: 'Section D' },
    ],
    variant: 'medium',
  },
};

// Five tabs
export const FiveTabs: Story = {
  args: {
    tabs: [
      { id: 'section-a', label: 'Section A' },
      { id: 'section-b', label: 'Section B' },
      { id: 'section-c', label: 'Section C' },
      { id: 'section-d', label: 'Section D' },
      { id: 'section-e', label: 'Section E' },
    ],
    variant: 'medium',
  },
};

// Six tabs
export const SixTabs: Story = {
  args: {
    tabs: [
      { id: 'section-a', label: 'Section A' },
      { id: 'section-b', label: 'Section B' },
      { id: 'section-c', label: 'Section C' },
      { id: 'section-d', label: 'Section D' },
      { id: 'section-e', label: 'Section E' },
      { id: 'section-f', label: 'Section F' },
    ],
    variant: 'medium',
  },
};

// Small variant
export const SmallVariant: Story = {
  args: {
    tabs: [
      { id: 'section-a', label: 'Section A' },
      { id: 'section-b', label: 'Section B' },
      { id: 'section-c', label: 'Section C' },
      { id: 'section-d', label: 'Section D' },
    ],
    variant: 'small',
  },
};

// Without content (navigation only)
export const NavigationOnly: Story = {
  args: {
    tabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'reports', label: 'Reports' },
      { id: 'settings', label: 'Settings' },
    ],
    variant: 'medium',
  },
};

// Controlled example
export const Controlled: Story = {
  args: {
    tabs: [
      { id: 'section-a', label: 'Section A' },
      { id: 'section-b', label: 'Section B' },
      { id: 'section-c', label: 'Section C' },
    ],
    activeTab: 'section-b',
    variant: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of controlled tabs where the active tab is set externally. The second tab is pre-selected.',
      },
    },
  },
};

// Real-world example with longer labels
export const RealWorldExample: Story = {
  args: {
    tabs: [
      { id: 'dashboard', label: 'Dashboard', content: (
        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 16px 0' }}>Dashboard Overview</h2>
          <p>Welcome to your dashboard. Here you can see your key metrics and recent activity.</p>
        </div>
      )},
      { id: 'transactions', label: 'Transactions', content: (
        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 16px 0' }}>Transaction History</h2>
          <p>View and manage all your transactions here.</p>
        </div>
      )},
      { id: 'portfolio', label: 'Portfolio', content: (
        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 16px 0' }}>Portfolio Management</h2>
          <p>Track your investments and portfolio performance.</p>
        </div>
      )},
      { id: 'reports', label: 'Reports', content: (
        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 16px 0' }}>Financial Reports</h2>
          <p>Generate and view detailed financial reports.</p>
        </div>
      )},
    ],
    variant: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'A real-world example showing how tabs might be used in a financial application with meaningful content.',
      },
    },
  },
};

// Animation showcase with 7 tabs to test long-distance transitions
export const AnimationShowcase: Story = {
  args: {
    tabs: [
      { id: 'section-a', label: 'Section A' },
      { id: 'section-b', label: 'Section B' },
      { id: 'section-c', label: 'Section C' },
      { id: 'section-d', label: 'Section D' },
      { id: 'section-e', label: 'Section E' },
      { id: 'section-f', label: 'Section F' },
      { id: 'section-g', label: 'Section G' },
    ],
    variant: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Showcase the smooth underline animation. Try clicking between distant tabs (A → G, A → D, etc.) to see the underline travel smoothly across intermediate tabs with a beautiful cubic-bezier animation.',
      },
    },
  },
};