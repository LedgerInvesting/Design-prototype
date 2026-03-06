import type { Meta, StoryObj } from '@storybook/react-vite';
import { SideNav2 } from './SideNav2';

const meta: Meta<typeof SideNav2> = {
  title: 'Test Components/SideNav2',
  component: SideNav2,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Test navigation component for experimentation. Features responsive compact mode, hover expansion, collapsible sections, and persistent state via localStorage.',
      },
    },
  },
  argTypes: {
    selectedItem: {
      description: 'Currently selected main navigation item',
      control: 'select',
      options: ['marketplace', 'reports', 'analytics', 'contracts'],
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
    onHomeClick: {
      description: 'Callback fired when home button is clicked',
    },
    onInboxClick: {
      description: 'Callback fired when inbox button is clicked',
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
type Story = StoryObj<typeof SideNav2>;

export const Default: Story = {
  args: {
    selectedItem: 'reports',
    selectedSubitem: 'reports-explorer',
    isCompact: false,
    userName: 'Sarah Johnson',
    userInitials: 'SJ',
    profileColor: '#1c6297',
    onNavigate: (itemId: string, subitemId?: string) => {
      console.log('Navigate:', itemId, subitemId);
    },
    onHomeClick: () => {
      console.log('Home clicked');
    },
    onInboxClick: () => {
      console.log('Inbox clicked');
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
};

export const CompactMode: Story = {
  args: {
    selectedItem: 'reports',
    selectedSubitem: 'reports-explorer',
    isCompact: true,
    userName: 'Sarah Johnson',
    userInitials: 'SJ',
    profileColor: '#1c6297',
    onNavigate: (itemId: string, subitemId?: string) => {
      console.log('Navigate:', itemId, subitemId);
    },
    onHomeClick: () => {
      console.log('Home clicked');
    },
    onInboxClick: () => {
      console.log('Inbox clicked');
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
        story: 'Compact mode shows only icons (80px width). Hover to expand and see full navigation.',
      },
    },
  },
};

export const AnalyticsSelected: Story = {
  args: {
    selectedItem: 'analytics',
    selectedSubitem: 'valuation',
    isCompact: false,
    userName: 'Sarah Johnson',
    userInitials: 'SJ',
    profileColor: '#0f9342',
    onNavigate: (itemId: string, subitemId?: string) => {
      console.log('Navigate:', itemId, subitemId);
    },
    onHomeClick: () => {
      console.log('Home clicked');
    },
    onInboxClick: () => {
      console.log('Inbox clicked');
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
        story: 'Demonstrates the sidebar with Analytics section selected.',
      },
    },
  },
};

export const MarketplaceSelected: Story = {
  args: {
    selectedItem: 'marketplace',
    selectedSubitem: 'offerings',
    isCompact: false,
    userName: 'Sarah Johnson',
    userInitials: 'SJ',
    profileColor: '#643ed8',
    onNavigate: (itemId: string, subitemId?: string) => {
      console.log('Navigate:', itemId, subitemId);
    },
    onHomeClick: () => {
      console.log('Home clicked');
    },
    onInboxClick: () => {
      console.log('Inbox clicked');
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
        story: 'Demonstrates the sidebar with Marketplace section selected.',
      },
    },
  },
};
