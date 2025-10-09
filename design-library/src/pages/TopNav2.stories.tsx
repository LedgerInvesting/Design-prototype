import type { Meta, StoryObj } from '@storybook/react';
import { TopNav2 } from './TopNav2';
import { colors } from '../tokens';
import { PrototypeSettingsProvider } from '../contexts/PrototypeSettingsContext';

const meta: Meta<typeof TopNav2> = {
  title: 'Test Components/TopNav2 (No User Profile)',
  component: TopNav2,
  decorators: [
    (Story) => (
      <PrototypeSettingsProvider>
        <Story />
      </PrototypeSettingsProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Alternative top navigation bar without user profile section. Used when "Alt Nav Layout" prototype setting is enabled. Includes breadcrumbs, share functionality, and app action button.',
      },
    },
  },
  argTypes: {
    breadcrumbs: {
      control: 'object',
      description: 'Array of breadcrumb items for navigation hierarchy',
    },
    onShareClick: {
      action: 'share clicked',
      description: 'Callback fired when share button is clicked',
    },
    onSidebarToggle: {
      action: 'sidebar toggled',
      description: 'Callback fired when sidebar toggle button is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopNav2>;

export const Default: Story = {
  args: {
    breadcrumbs: [
      { label: 'MARKETPLACE', href: '/marketplace' },
      { label: 'MARKETPLACE', href: '/marketplace/sub' },
      { label: 'MARKETPLACE', href: '/marketplace/sub/page' },
      { label: 'MARKETPLACE', isActive: true },
    ],
  },
};

export const SimpleBreadcrumb: Story = {
  args: {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Current Page', isActive: true },
    ],
  },
};

export const DeepNavigation: Story = {
  args: {
    breadcrumbs: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Analytics', href: '/analytics' },
      { label: 'Marketplace', href: '/analytics/marketplace' },
      { label: 'Transactions', href: '/analytics/marketplace/transactions' },
      { label: 'Details', isActive: true },
    ],
  },
};

export const SinglePage: Story = {
  args: {
    breadcrumbs: [
      { label: 'Settings', isActive: true },
    ],
  },
};

export const WithAppAction: Story = {
  args: {
    breadcrumbs: [
      { label: 'Analytics', href: '/analytics' },
      { label: 'Valuation Dashboard', isActive: true },
    ],
    appAction: {
      label: 'Explore contract',
      onClick: () => alert('Navigate to Contracts app'),
      targetApp: 'contracts' as const,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'TopNav2 with AppActionButton for cross-app navigation.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const handleBreadcrumbClick = (label: string) => {
      alert(`Navigating to: ${label}`);
    };

    const handleShare = () => {
      alert('Share functionality activated!');
    };

    const handleSidebarToggle = () => {
      alert('Sidebar toggled!');
    };

    return (
      <TopNav2
        breadcrumbs={[
          {
            label: 'Dashboard',
            href: '/dashboard',
            onClick: () => handleBreadcrumbClick('Dashboard')
          },
          {
            label: 'Analytics',
            href: '/analytics',
            onClick: () => handleBreadcrumbClick('Analytics')
          },
          { label: 'Current Report', isActive: true },
        ]}
        onShareClick={handleShare}
        onSidebarToggle={handleSidebarToggle}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example with working click handlers for all navigation elements.',
      },
    },
  },
};

export const WithoutBreadcrumbs: Story = {
  args: {
    breadcrumbs: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'TopNav2 without breadcrumbs, showing just the share button.',
      },
    },
  },
};

export const ComparisonWithTopNav: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
      <div style={{ padding: '20px', backgroundColor: colors.blackAndWhite.black100 }}>
        <h3 style={{ margin: '0 0 10px 0' }}>TopNav2 (No User Profile)</h3>
        <TopNav2
          breadcrumbs={[
            { label: 'HOME', href: '/' },
            { label: 'SECTION', href: '/section' },
            { label: 'CURRENT PAGE', isActive: true },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visual comparison showing TopNav2 without the user profile section.',
      },
    },
  },
};
