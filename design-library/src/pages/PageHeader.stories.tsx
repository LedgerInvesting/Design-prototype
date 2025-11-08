import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PageHeader } from './PageHeader';
import { Button } from '../components';
import { ThemeProvider, useSemanticColors } from '../tokens/ThemeProvider';

const meta: Meta<typeof PageHeader> = {
  title: 'Pages/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Standardized header layout for pages that need title + action button(s). Provides consistent spacing, typography, and responsive behavior.

**Features:**
- Two-color title pattern (important/not important text)
- Built-in primary and secondary button support
- Custom action elements support
- Theme-aware button styling
        `,
      },
    },
  },
  argTypes: {
    title: {
      description: 'Main title content - can be string, array of TitlePart objects, or JSX',
    },
    subtitle: {
      description: 'Optional subtitle text below the title',
      control: 'text',
    },
    primaryAction: {
      description: 'Primary action button (black variant)',
    },
    secondaryAction: {
      description: 'Secondary action button (white no-border variant)',
    },
    actions: {
      description: 'Array of custom action elements (buttons, etc.)',
    },
    spacing: {
      description: 'Spacing variant for bottom margin',
      control: 'radio',
      options: ['normal', 'compact'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Two-color title with primary and secondary buttons (NEW PATTERN)
export const TwoColorTitle: Story = {
  render: () => (
    <ThemeProvider initialTheme="reports">
      <div style={{ width: '800px', padding: '20px', backgroundColor: '#f8fafc' }}>
        <PageHeader
          title={[
            { text: 'You are now viewing the ', important: false },
            { text: 'Atlas.wc-ilsTY23 insights', important: true },
            { text: ' from Lulo Capital Markets', important: false }
          ]}
          primaryAction={{ label: 'Edit Configuration', onClick: () => alert('Primary action') }}
          secondaryAction={{ label: 'Export', onClick: () => alert('Secondary action') }}
        />
        <div style={{ height: '200px', backgroundColor: '#e5e7eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
          Page Content Area
        </div>
      </div>
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Two-color title pattern with important text in black900 and descriptive text in black500. Primary button is black variant, secondary is white no-border variant.',
      },
    },
  },
};

// Primary button only (common pattern)
export const WithPrimaryButton: Story = {
  render: () => (
    <ThemeProvider initialTheme="analytics">
      <div style={{ width: '800px', padding: '20px', backgroundColor: '#f8fafc' }}>
        <PageHeader
          title="Valuation Dashboard"
          primaryAction={{ label: 'Edit Configuration', onClick: () => alert('Edit clicked') }}
        />
        <div style={{ height: '200px', backgroundColor: '#e5e7eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
          Page Content Area
        </div>
      </div>
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Simple title with primary button (black variant)',
      },
    },
  },
};

// Primary and secondary buttons
export const WithBothButtons: Story = {
  render: () => (
    <ThemeProvider initialTheme="marketplace">
      <div style={{ width: '800px', padding: '20px', backgroundColor: '#f8fafc' }}>
        <PageHeader
          title="Configuration Settings"
          subtitle="Manage your preferences"
          primaryAction={{ label: 'Save Changes', onClick: () => alert('Save clicked') }}
          secondaryAction={{ label: 'Cancel', onClick: () => alert('Cancel clicked') }}
        />
        <div style={{ height: '200px', backgroundColor: '#e5e7eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
          Page Content Area
        </div>
      </div>
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Both primary (black) and secondary (white no-border) button variants',
      },
    },
  },
};

// Simple header with single action (LEGACY)
export const SimpleHeader: Story = {
  args: {
    title: 'Valuation Dashboard',
    actions: [
      <Button key="edit" variant="primary" color="white">
        Edit Configuration
      </Button>
    ],
  },
  render: (args) => (
    <ThemeProvider initialTheme="analytics">
      <div style={{ width: '800px', padding: '20px', backgroundColor: '#f8fafc' }}>
        <PageHeader {...args} />
        <div style={{ height: '200px', backgroundColor: '#e5e7eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
          Page Content Area
        </div>
      </div>
    </ThemeProvider>
  ),
};

// Header with subtitle
export const WithSubtitle: Story = {
  args: {
    title: 'Configuration Settings',
    subtitle: 'Manage your valuation parameters and preferences',
    actions: [
      <Button key="cancel" variant="small" color="white">
        Cancel
      </Button>,
      <Button key="save" variant="primary" color="main">
        Save Changes
      </Button>
    ],
  },
  render: (args) => (
    <ThemeProvider initialTheme="analytics">
      <div style={{ width: '800px', padding: '20px', backgroundColor: '#f8fafc' }}>
        <PageHeader {...args} />
        <div style={{ height: '200px', backgroundColor: '#e5e7eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
          Page Content Area
        </div>
      </div>
    </ThemeProvider>
  ),
};

// Complex title with highlighted text
export const ComplexTitle: Story = {
  render: () => {
    const ExampleComponent = () => {
      const colors = useSemanticColors();

      return (
        <ThemeProvider initialTheme="analytics">
          <div style={{ width: '800px', padding: '20px', backgroundColor: '#f8fafc' }}>
            <PageHeader
              title={
                <span>
                  Program ABC. <span style={{ color: colors.blackAndWhite.black500 }}>
                    Valuation dashboard
                  </span>
                </span>
              }
              actions={[
                <Button key="edit" variant="primary" color="white">
                  Edit Configuration
                </Button>
              ]}
            />
            <div style={{ height: '200px', backgroundColor: '#e5e7eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              Page Content Area
            </div>
          </div>
        </ThemeProvider>
      );
    };

    return <ExampleComponent />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing complex title with highlighted program name and muted description text.',
      },
    },
  },
};

// Multiple actions
export const MultipleActions: Story = {
  args: {
    title: 'Document Processing',
    subtitle: 'Review and approve extracted contract terms',
    actions: [
      <Button key="reject" variant="small" color="white">
        Reject
      </Button>,
      <Button key="review" variant="small" color="light">
        Need Review
      </Button>,
      <Button key="approve" variant="primary" color="green">
        Approve
      </Button>
    ],
  },
  render: (args) => (
    <ThemeProvider initialTheme="reports">
      <div style={{ width: '800px', padding: '20px', backgroundColor: '#f8fafc' }}>
        <PageHeader {...args} />
        <div style={{ height: '200px', backgroundColor: '#e5e7eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
          Page Content Area
        </div>
      </div>
    </ThemeProvider>
  ),
};

// Compact spacing
export const CompactSpacing: Story = {
  args: {
    title: 'Quick Actions',
    spacing: 'compact',
    actions: [
      <Button key="action" variant="primary" color="main">
        Primary Action
      </Button>
    ],
  },
  render: (args) => (
    <ThemeProvider initialTheme="marketplace">
      <div style={{ width: '800px', padding: '20px', backgroundColor: '#f8fafc' }}>
        <PageHeader {...args} />
        <div style={{ height: '200px', backgroundColor: '#e5e7eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
          Page Content Area (note reduced spacing above)
        </div>
      </div>
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact spacing variant with reduced bottom margin (20px instead of 40px).',
      },
    },
  },
};

// Theme comparison
export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px', backgroundColor: '#f8fafc' }}>
      <h2 style={{ margin: 0, textAlign: 'center' }}>Theme Adaptation</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Reports Theme</h3>
          <ThemeProvider initialTheme="reports">
            <div style={{ width: '800px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
              <PageHeader
                title="Transaction Management"
                subtitle="Manage reinsurance transactions"
                actions={[
                  <Button key="action" variant="primary" color="main">Reports Action</Button>
                ]}
              />
            </div>
          </ThemeProvider>
        </div>

        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Analytics Theme</h3>
          <ThemeProvider initialTheme="analytics">
            <div style={{ width: '800px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
              <PageHeader
                title="Analytics Dashboard"
                subtitle="Valuation insights and metrics"
                actions={[
                  <Button key="action" variant="primary" color="main">Analytics Action</Button>
                ]}
              />
            </div>
          </ThemeProvider>
        </div>

        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Marketplace Theme</h3>
          <ThemeProvider initialTheme="marketplace">
            <div style={{ width: '800px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
              <PageHeader
                title="Marketplace Offerings"
                subtitle="Investment opportunities"
                actions={[
                  <Button key="action" variant="primary" color="main">Marketplace Action</Button>
                ]}
              />
            </div>
          </ThemeProvider>
        </div>
      </div>

      <div style={{
        fontSize: '12px',
        color: '#666',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: 1.4
      }}>
        PageHeader component maintains consistent typography and spacing while adapting button colors to the current theme context.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'PageHeader component works seamlessly across different theme contexts while maintaining consistent typography and layout.',
      },
    },
  },
};