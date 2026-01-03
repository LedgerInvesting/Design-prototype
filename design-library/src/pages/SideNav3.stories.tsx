import type { Meta, StoryObj } from '@storybook/react-vite';
import { SideNav3 } from './SideNav3';

const meta: Meta<typeof SideNav3> = {
  title: 'Transaction View/SideNav3',
  component: SideNav3,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Transaction-centric navigation component. Features "All Transactions", "Notifications", and "Apps" navigation items, replacing the app-based structure with a unified transaction view.',
      },
    },
  },
  argTypes: {
    selectedItem: {
      description: 'Currently selected main navigation item',
      control: 'select',
      options: ['all-transactions', 'notifications', 'apps', 'marketplace', 'reports', 'analytics', 'contracts'],
    },
    selectedSubitem: {
      description: 'Currently selected sub-navigation item',
      control: 'text',
    },
    isCompact: {
      description: 'Whether the sidebar is in compact mode (80px width)',
      control: 'boolean',
    },
    userName: {
      description: 'User name displayed in the profile section',
      control: 'text',
    },
    userInitials: {
      description: 'User initials shown if avatar fails to load',
      control: 'text',
    },
    profileColor: {
      description: 'Background color for the user avatar',
      control: 'color',
    },
    onNavigate: {
      description: 'Callback fired when navigation item is clicked',
    },
    onManageAccountClick: {
      description: 'Callback fired when manage account menu item is clicked',
    },
    onSettingsClick: {
      description: 'Callback fired when settings menu item is clicked',
    },
    onHoverChange: {
      description: 'Callback fired when hover state changes in compact mode',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SideNav3>;

export const Default: Story = {
  args: {
    selectedItem: 'all-transactions',
    isCompact: false,
    userName: 'Sarah Johnson',
    userInitials: 'SJ',
    profileColor: '#1c6297',
    onNavigate: (itemId: string, subitemId?: string) => {
      console.log('Navigate:', itemId, subitemId);
    },
    onManageAccountClick: () => {
      console.log('Manage account clicked');
    },
    onSettingsClick: () => {
      console.log('Settings clicked');
    },
    onHoverChange: (isHovered: boolean) => {
      console.log('Hover state:', isHovered);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default transaction-centric navigation with "All Transactions" selected.',
      },
    },
  },
};

export const CompactMode: Story = {
  args: {
    selectedItem: 'all-transactions',
    isCompact: true,
    userName: 'Sarah Johnson',
    userInitials: 'SJ',
    profileColor: '#1c6297',
    onNavigate: (itemId: string, subitemId?: string) => {
      console.log('Navigate:', itemId, subitemId);
    },
    onManageAccountClick: () => {
      console.log('Manage account clicked');
    },
    onSettingsClick: () => {
      console.log('Settings clicked');
    },
    onHoverChange: (isHovered: boolean) => {
      console.log('Hover state:', isHovered);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact mode shows only icons (80px width). Hover to expand and see full navigation with transaction-centric items.',
      },
    },
  },
};

export const NotificationsSelected: Story = {
  args: {
    selectedItem: 'notifications',
    isCompact: false,
    userName: 'Sarah Johnson',
    userInitials: 'SJ',
    profileColor: '#1c6297',
    onNavigate: (itemId: string, subitemId?: string) => {
      console.log('Navigate:', itemId, subitemId);
    },
    onManageAccountClick: () => {
      console.log('Manage account clicked');
    },
    onSettingsClick: () => {
      console.log('Settings clicked');
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the sidebar with Notifications selected.',
      },
    },
  },
};

export const AppsSelected: Story = {
  args: {
    selectedItem: 'apps',
    isCompact: false,
    userName: 'Sarah Johnson',
    userInitials: 'SJ',
    profileColor: '#1c6297',
    onNavigate: (itemId: string, subitemId?: string) => {
      console.log('Navigate:', itemId, subitemId);
    },
    onManageAccountClick: () => {
      console.log('Manage account clicked');
    },
    onSettingsClick: () => {
      console.log('Settings clicked');
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the sidebar with Apps selected, showing the familiar app structure.',
      },
    },
  },
};

export const ReportsExpanded: Story = {
  args: {
    selectedItem: 'reports',
    selectedSubitem: 'transactions',
    isCompact: false,
    userName: 'Sarah Johnson',
    userInitials: 'SJ',
    profileColor: '#1c6297',
    onNavigate: (itemId: string, subitemId?: string) => {
      console.log('Navigate:', itemId, subitemId);
    },
    onManageAccountClick: () => {
      console.log('Manage account clicked');
    },
    onSettingsClick: () => {
      console.log('Settings clicked');
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the expanded Reports app view with transactions selected.',
      },
    },
  },
};
