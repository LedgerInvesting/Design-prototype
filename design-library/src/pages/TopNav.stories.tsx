import type { Meta, StoryObj } from '@storybook/react';
import { TopNav } from './TopNav';
import { colors } from '../tokens';
import { PrototypeSettingsProvider } from '../contexts/PrototypeSettingsContext';

const meta: Meta<typeof TopNav> = {
  title: 'Pages/TopNav',
  component: TopNav,
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
        component: 'Top navigation bar with breadcrumbs, share functionality, and user profile section. Provides consistent navigation and user actions across the application.',
      },
    },
  },
  argTypes: {
    breadcrumbs: {
      control: 'object',
      description: 'Array of breadcrumb items for navigation hierarchy',
    },
    userName: {
      control: 'text',
      description: 'Display name of the current user',
    },
    userInitials: {
      control: 'text',
      description: 'User initials for profile avatar',
      table: {
        defaultValue: { summary: 'DL' },
      },
    },
    profileColor: {
      control: 'color',
      description: 'Background color for profile avatar',
      table: {
        defaultValue: { summary: 'colors.reports.blue700' },
      },
    },
    onShareClick: {
      action: 'share clicked',
      description: 'Callback fired when share button is clicked',
    },
    onUserMenuClick: {
      action: 'user menu clicked',
      description: 'Callback fired when user profile section is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopNav>;

export const Default: Story = {
  args: {
    breadcrumbs: [
      { label: 'MARKETPLACE', href: '/marketplace' },
      { label: 'MARKETPLACE', href: '/marketplace/sub' },
      { label: 'MARKETPLACE', href: '/marketplace/sub/page' },
      { label: 'MARKETPLACE', isActive: true },
    ],
    userName: 'ALEC WHITTEN',
    userInitials: 'AW',
    profileColor: colors.reports.blue700,
  },
};

export const SimpleBreadcrumb: Story = {
  args: {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Current Page', isActive: true },
    ],
    userName: 'Sarah Johnson',
    userInitials: 'SJ',
    profileColor: colors.marketplace.violet700,
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
    userName: 'Michael Chen',
    userInitials: 'MC',
    profileColor: colors.success.textAndStrokes,
  },
};

export const SinglePage: Story = {
  args: {
    breadcrumbs: [
      { label: 'Settings', isActive: true },
    ],
    userName: 'Anna Rodriguez',
    userInitials: 'AR',
    profileColor: colors.error.textAndStrokes,
  },
};

export const CustomProfileColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
      <TopNav
        breadcrumbs={[
          { label: 'Team', href: '/team' },
          { label: 'Members', isActive: true },
        ]}
        userName='Alex Thompson'
        userInitials='AT'
        profileColor={colors.reports.blue700}
        onShareClick={() => console.log('Share clicked - Blue')}
        onUserMenuClick={() => console.log('User menu clicked - Blue')}
      />
      <TopNav
        breadcrumbs={[
          { label: 'Marketplace', href: '/marketplace' },
          { label: 'Offerings', isActive: true },
        ]}
        userName='Emma Wilson'
        userInitials='EW'
        profileColor={colors.marketplace.violet700}
        onShareClick={() => console.log('Share clicked - Violet')}
        onUserMenuClick={() => console.log('User menu clicked - Violet')}
      />
      <TopNav
        breadcrumbs={[
          { label: 'Projects', href: '/projects' },
          { label: 'Active', isActive: true },
        ]}
        userName='James Park'
        userInitials='JP'
        profileColor={colors.success.textAndStrokes}
        onShareClick={() => console.log('Share clicked - Green')}
        onUserMenuClick={() => console.log('User menu clicked - Green')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different profile avatar colors using design system colors.',
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

    const handleUserMenu = () => {
      alert('User menu opened!');
    };

    return (
      <TopNav
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
        userName='Interactive Demo'
        userInitials='ID'
        profileColor={colors.reports.blue450}
        onShareClick={handleShare}
        onUserMenuClick={handleUserMenu}
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
    userName: 'John Doe',
    userInitials: 'JD',
    profileColor: colors.blackAndWhite.black700,
  },
  parameters: {
    docs: {
      description: {
        story: 'TopNav without breadcrumbs, showing just the share button and user profile.',
      },
    },
  },
};

export const LongUserName: Story = {
  args: {
    breadcrumbs: [
      { label: 'Administration', href: '/admin' },
      { label: 'User Management', isActive: true },
    ],
    userName: 'Dr. Elizabeth Montgomery-Johnson',
    userInitials: 'EM',
    profileColor: colors.marketplace.violet700,
  },
  parameters: {
    docs: {
      description: {
        story: 'TopNav with a longer user name to demonstrate layout handling.',
      },
    },
  },
};