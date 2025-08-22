import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';
import { Card } from './Card/Card';
import { Button } from './Button';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible grid layout component for arranging items in a two-dimensional grid.

## Features
- **Columns**: Fixed columns (1-12) or responsive auto-fit
- **Gap**: Consistent spacing using design tokens
- **Auto-fit**: Responsive columns with minimum width
- **Alignment**: Control item alignment within grid areas
- **Semantic**: Customizable HTML element

Perfect for card layouts, image galleries, dashboards, and responsive grids.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 12, 'auto', 'fit'],
      description: 'Number of columns or auto-fit behavior',
    },
    gap: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24'],
      description: 'Gap between items using design tokens',
    },
    minColumnWidth: {
      control: 'text',
      description: 'Minimum column width for auto-fit grids',
    },
    alignItems: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Align items in their grid areas',
    },
    justifyItems: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Justify items in their grid areas',
    },
    as: {
      control: 'text',
      description: 'HTML element to render',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Demo card component
const DemoCard = ({ children, color = '#f8f9fa' }: { children: React.ReactNode; color?: string }) => (
  <div style={{
    padding: '24px',
    backgroundColor: color,
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    textAlign: 'center',
    minHeight: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '500',
  }}>
    {children}
  </div>
);

// Default grid (3 columns)
export const Default: Story = {
  args: {
    columns: 3,
    gap: 4,
    alignItems: 'stretch',
    justifyItems: 'stretch',
  },
  render: (args) => (
    <Grid {...args}>
      <DemoCard>Item 1</DemoCard>
      <DemoCard>Item 2</DemoCard>
      <DemoCard>Item 3</DemoCard>
      <DemoCard>Item 4</DemoCard>
      <DemoCard>Item 5</DemoCard>
      <DemoCard>Item 6</DemoCard>
    </Grid>
  ),
};

// Basic examples
export const TwoColumns: Story = {
  args: {
    columns: 2,
    gap: '4',
  },
  render: (args) => (
    <Grid {...args}>
      <DemoCard>Item 1</DemoCard>
      <DemoCard>Item 2</DemoCard>
      <DemoCard>Item 3</DemoCard>
      <DemoCard>Item 4</DemoCard>
    </Grid>
  ),
};

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    gap: '6',
  },
  render: (args) => (
    <Grid {...args}>
      <DemoCard color="#e3f2fd">Feature 1</DemoCard>
      <DemoCard color="#f3e5f5">Feature 2</DemoCard>
      <DemoCard color="#e8f5e8">Feature 3</DemoCard>
      <DemoCard color="#fff3e0">Feature 4</DemoCard>
      <DemoCard color="#fce4ec">Feature 5</DemoCard>
      <DemoCard color="#f1f8e9">Feature 6</DemoCard>
    </Grid>
  ),
};

export const AutoFit: Story = {
  args: {
    columns: 'auto',
    gap: '4',
    minColumnWidth: '200px',
  },
  render: (args) => (
    <Grid {...args}>
      <DemoCard>Responsive 1</DemoCard>
      <DemoCard>Responsive 2</DemoCard>
      <DemoCard>Responsive 3</DemoCard>
      <DemoCard>Responsive 4</DemoCard>
      <DemoCard>Responsive 5</DemoCard>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Auto-fit grid that adjusts columns based on available space and minimum width.',
      },
    },
  },
};

// Card gallery example
export const CardGallery: Story = {
  render: () => (
    <Grid columns="auto" gap="6" minColumnWidth="280px">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} style={{ height: '200px' }}>
          <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '18px' }}>Card Title {i}</h3>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
                This is a demo card with some content to show how the grid layout works with real components.
              </p>
            </div>
            <Button variant="small" style={{ alignSelf: 'flex-start' }}>
              Learn More
            </Button>
          </div>
        </Card>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive card gallery using auto-fit grid with real Card components.',
      },
    },
  },
};

// Dashboard layout
export const Dashboard: Story = {
  render: () => (
    <Grid columns="auto" gap="6" minColumnWidth="300px">
      {/* Stats Cards */}
      <Card>
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '32px', color: '#059669' }}>$12,345</h3>
          <p style={{ margin: 0, color: '#6b7280' }}>Total Revenue</p>
        </div>
      </Card>
      
      <Card>
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '32px', color: '#dc2626' }}>-$1,234</h3>
          <p style={{ margin: 0, color: '#6b7280' }}>Total Expenses</p>
        </div>
      </Card>
      
      <Card>
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '32px', color: '#7c3aed' }}>1,234</h3>
          <p style={{ margin: 0, color: '#6b7280' }}>Active Users</p>
        </div>
      </Card>
      
      {/* Chart Placeholder */}
      <Card style={{ gridColumn: 'span 2' }}>
        <div style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0' }}>Revenue Chart</h3>
          <div style={{ 
            height: '200px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280'
          }}>
            Chart would go here
          </div>
        </div>
      </Card>
      
      {/* Activity Feed */}
      <Card>
        <div style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '14px' }}>
              <strong>User signed up</strong><br />
              <span style={{ color: '#6b7280' }}>2 minutes ago</span>
            </div>
            <div style={{ fontSize: '14px' }}>
              <strong>Payment received</strong><br />
              <span style={{ color: '#6b7280' }}>1 hour ago</span>
            </div>
            <div style={{ fontSize: '14px' }}>
              <strong>New order placed</strong><br />
              <span style={{ color: '#6b7280' }}>3 hours ago</span>
            </div>
          </div>
        </div>
      </Card>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dashboard layout with mixed card sizes using CSS grid span.',
      },
    },
  },
};

// Alignment examples
export const ItemAlignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Center Aligned</h4>
        <Grid columns={3} gap="4" alignItems="center" justifyItems="center">
          <div style={{ width: '60px', height: '60px', backgroundColor: '#e3f2fd', borderRadius: '4px' }} />
          <div style={{ width: '80px', height: '40px', backgroundColor: '#f3e5f5', borderRadius: '4px' }} />
          <div style={{ width: '50px', height: '80px', backgroundColor: '#e8f5e8', borderRadius: '4px' }} />
        </Grid>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Start Aligned</h4>
        <Grid columns={3} gap="4" alignItems="start" justifyItems="start">
          <div style={{ width: '60px', height: '60px', backgroundColor: '#e3f2fd', borderRadius: '4px' }} />
          <div style={{ width: '80px', height: '40px', backgroundColor: '#f3e5f5', borderRadius: '4px' }} />
          <div style={{ width: '50px', height: '80px', backgroundColor: '#e8f5e8', borderRadius: '4px' }} />
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of different item alignment options within grid areas.',
      },
    },
  },
};

// Responsive showcase
export const ResponsiveShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Fixed 4 Columns</h4>
        <Grid columns={4} gap="3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <DemoCard key={i}>Item {i}</DemoCard>
          ))}
        </Grid>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Auto-fit (min: 150px)</h4>
        <Grid columns="auto" gap="3" minColumnWidth="150px">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <DemoCard key={i}>Item {i}</DemoCard>
          ))}
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison between fixed columns and responsive auto-fit behavior.',
      },
    },
  },
};