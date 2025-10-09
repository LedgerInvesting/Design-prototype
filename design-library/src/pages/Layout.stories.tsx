import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from './Layout';
import type { LayoutProps } from './Layout';
import { colors, typography } from '../tokens';
import { PrototypeSettingsProvider } from '../contexts/PrototypeSettingsContext';

const meta: Meta<typeof Layout> = {
  title: 'Pages/Layout',
  component: Layout,
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
        component: 'Layout component that provides consistent page structure with Sidebar, TopNav, and main content area with standardized spacing: 120px top margin (60px TopNav + 60px gap), 60px left/right padding, 60px bottom padding.',
      },
    },
  },
  argTypes: {
    children: {
      control: false,
      description: 'Content to be rendered in the main content area',
    },
    breadcrumbs: {
      control: 'object',
      description: 'Array of breadcrumb items for navigation',
    },
    userName: {
      control: 'text',
      description: 'User name displayed in TopNav',
    },
    userInitials: {
      control: 'text',
      description: 'User initials displayed in profile avatar',
    },
    profileColor: {
      control: 'color',
      description: 'Background color for the profile avatar',
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width for the content area',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Layout>;

// Sample content component for demonstrations
const SampleContent: React.FC<{ title?: string; description?: string }> = ({ 
  title = "Page Content", 
  description = "This is the main content area with standardized margins: 60px left/right, 40px top." 
}) => (
  <div>
    <h1 style={{
      ...typography.styles.headlineH1,
      color: colors.blackAndWhite.black900,
      marginBottom: '24px',
    }}>
      {title}
    </h1>
    <p style={{
      ...typography.styles.bodyL,
      color: colors.blackAndWhite.black700,
      marginBottom: '40px',
      lineHeight: 1.6,
    }}>
      {description}
    </p>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
      marginBottom: '40px'
    }}>
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} style={{
          backgroundColor: colors.blackAndWhite.white,
          border: `1px solid ${colors.reports.dynamic.blue400}`,
          borderRadius: '8px',
          padding: '24px',
          minHeight: '120px',
        }}>
          <h3 style={{
            ...typography.styles.bodyL,
            color: colors.blackAndWhite.black900,
            marginBottom: '12px',
          }}>
            Card {i + 1}
          </h3>
          <p style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black600,
            margin: 0,
          }}>
            Sample content demonstrating the standardized layout margins and responsive grid system.
          </p>
        </div>
      ))}
    </div>
  </div>
);

export const Default: Story = {
  args: {
    children: <SampleContent />,
    breadcrumbs: [
      { label: 'HOME', href: '/' },
      { label: 'SECTION', href: '/section' },
      { label: 'CURRENT PAGE', isActive: true },
    ],
  },
};

export const SimpleLayout: Story = {
  args: {
    children: <SampleContent title="Simple Layout" description="Basic layout with minimal breadcrumbs." />,
    breadcrumbs: [
      { label: 'DASHBOARD', isActive: true },
    ],
  },
};

export const WideContent: Story = {
  args: {
    children: <SampleContent title="Wide Content Layout" description="Layout with wider maximum width for content that needs more space." />,
    maxWidth: '1400px',
    breadcrumbs: [
      { label: 'REPORTS', href: '/reports' },
      { label: 'ANALYTICS', href: '/reports/analytics' },
      { label: 'DASHBOARD', isActive: true },
    ],
  },
};

export const NarrowContent: Story = {
  args: {
    children: <SampleContent title="Narrow Content Layout" description="Layout with narrower maximum width for focused content like forms or settings." />,
    maxWidth: '800px',
    breadcrumbs: [
      { label: 'SETTINGS', href: '/settings' },
      { label: 'USER PROFILE', isActive: true },
    ],
  },
};

export const TransactionExample: Story = {
  args: {
    children: (
      <div>
        <SampleContent 
          title="Transaction Management" 
          description="Example showing how the Layout component would be used for a transaction management page with consistent margins." 
        />
        <div style={{
          backgroundColor: colors.reports.blue700,
          borderRadius: '12px',
          padding: '40px',
          color: colors.blackAndWhite.black900,
          marginBottom: '40px',
        }}>
          <h2 style={{
            ...typography.styles.headlineH2,
            margin: 0,
          }}>
            Transaction Header
          </h2>
        </div>
      </div>
    ),
    breadcrumbs: [
      { label: 'TRANSACTION MANAGEMENT', isActive: true },
    ],
  },
};