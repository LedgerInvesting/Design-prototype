import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';
import { Stack } from './Stack';
import { Button } from './Button';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A container component that provides consistent max-width and horizontal padding for content.

## Features
- **Max Width**: Predefined breakpoints or custom values
- **Centering**: Automatic horizontal centering
- **Padding**: Consistent horizontal padding using design tokens
- **Responsive**: Built-in responsive behavior
- **Semantic**: Customizable HTML element

Perfect for page layouts, content sections, and maintaining consistent content width.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Maximum width of the container',
    },
    padding: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24'],
      description: 'Horizontal padding using design tokens',
    },
    center: {
      control: 'boolean',
      description: 'Center the container horizontally',
    },
    as: {
      control: 'text',
      description: 'HTML element to render',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Demo content component
const DemoContent = ({ title, description }: { title: string; description: string }) => (
  <div style={{
    padding: '32px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    textAlign: 'center',
  }}>
    <h2 style={{ margin: '0 0 16px 0', fontSize: '24px' }}>{title}</h2>
    <p style={{ margin: '0 0 24px 0', color: '#6b7280' }}>{description}</p>
    <Stack direction="horizontal" gap="3" justify="center">
      <Button>Get Started</Button>
      <Button variant="small" color="white">Learn More</Button>
    </Stack>
  </div>
);

// Default container (medium width)
export const Default: Story = {
  args: {
    maxWidth: 'md',
    padding: 4,
    center: true,
  },
  render: (args) => (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '400px', padding: '20px' }}>
      <Container {...args}>
        <DemoContent 
          title="Default Container (768px)"
          description="Balanced width perfect for most content layouts."
        />
      </Container>
    </div>
  ),
};

// Basic examples
export const Small: Story = {
  args: {
    maxWidth: 'sm',
    padding: '4',
  },
  render: (args) => (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '400px', padding: '20px' }}>
      <Container {...args}>
        <DemoContent 
          title="Small Container (640px)"
          description="Perfect for forms, modals, and focused content."
        />
      </Container>
    </div>
  ),
};

export const Medium: Story = {
  args: {
    maxWidth: 'md',
    padding: '4',
  },
  render: (args) => (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '400px', padding: '20px' }}>
      <Container {...args}>
        <DemoContent 
          title="Medium Container (768px)"
          description="Great for articles, blog posts, and standard content."
        />
      </Container>
    </div>
  ),
};

export const Large: Story = {
  args: {
    maxWidth: 'lg',
    padding: '4',
  },
  render: (args) => (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '400px', padding: '20px' }}>
      <Container {...args}>
        <DemoContent 
          title="Large Container (1024px)"
          description="Ideal for dashboards, landing pages, and rich content."
        />
      </Container>
    </div>
  ),
};

export const ExtraLarge: Story = {
  args: {
    maxWidth: 'xl',
    padding: '6',
  },
  render: (args) => (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '400px', padding: '20px' }}>
      <Container {...args}>
        <DemoContent 
          title="Extra Large Container (1280px)"
          description="Perfect for wide layouts and data-heavy interfaces."
        />
      </Container>
    </div>
  ),
};

// Custom width example
export const CustomWidth: Story = {
  args: {
    maxWidth: '900px',
    padding: '4',
  },
  render: (args) => (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '400px', padding: '20px' }}>
      <Container {...args}>
        <DemoContent 
          title="Custom Width (900px)"
          description="Use any custom width value for specific design needs."
        />
      </Container>
    </div>
  ),
};

// No centering example
export const NotCentered: Story = {
  args: {
    maxWidth: 'md',
    padding: '4',
    center: false,
  },
  render: (args) => (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '400px', padding: '20px' }}>
      <Container {...args}>
        <DemoContent 
          title="Left-aligned Container"
          description="Container without automatic centering."
        />
      </Container>
    </div>
  ),
};

// Page layout example
export const PageLayout: Story = {
  render: () => (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb' }}>
        <Container maxWidth="xl" padding="4">
          <Stack direction="horizontal" justify="between" align="center" style={{ height: '64px' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Ledger</div>
            <Stack direction="horizontal" gap="4">
              <Button variant="small" color="white">Dashboard</Button>
              <Button variant="small" color="white">Reports</Button>
              <Button variant="small">Sign In</Button>
            </Stack>
          </Stack>
        </Container>
      </div>

      {/* Hero Section */}
      <Container maxWidth="lg" padding="4" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', margin: '0 0 24px 0' }}>
            Welcome to Ledger
          </h1>
          <p style={{ fontSize: '20px', color: '#6b7280', margin: '0 0 40px 0', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            The most intuitive way to manage your finances and track your investments with powerful tools and insights.
          </p>
          <Stack direction="horizontal" gap="4" justify="center">
            <Button>Get Started Free</Button>
            <Button variant="small" color="white">Watch Demo</Button>
          </Stack>
        </div>
      </Container>

      {/* Content Section */}
      <Container maxWidth="xl" padding="4" style={{ paddingBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          <div style={{ padding: '32px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '20px', margin: '0 0 16px 0' }}>Portfolio Tracking</h3>
            <p style={{ color: '#6b7280', margin: '0 0 24px 0' }}>
              Monitor all your investments in real-time with detailed analytics and performance metrics.
            </p>
            <Button variant="small">Learn More</Button>
          </div>
          
          <div style={{ padding: '32px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '20px', margin: '0 0 16px 0' }}>Expense Management</h3>
            <p style={{ color: '#6b7280', margin: '0 0 24px 0' }}>
              Categorize and track your expenses with smart insights and budgeting tools.
            </p>
            <Button variant="small">Learn More</Button>
          </div>
          
          <div style={{ padding: '32px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '20px', margin: '0 0 16px 0' }}>Financial Reports</h3>
            <p style={{ color: '#6b7280', margin: '0 0 24px 0' }}>
              Generate comprehensive reports and visualizations for better financial decisions.
            </p>
            <Button variant="small">Learn More</Button>
          </div>
        </div>
      </Container>

      {/* Footer */}
      <div style={{ backgroundColor: '#1f2937', color: '#fff' }}>
        <Container maxWidth="xl" padding="4" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <Stack direction="horizontal" justify="between" align="center">
            <div>&copy; 2024 Ledger. All rights reserved.</div>
            <Stack direction="horizontal" gap="4">
              <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Privacy</a>
              <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Terms</a>
              <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contact</a>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete page layout example showing how Container works with different sections and max-widths.',
      },
    },
  },
};

// Nested containers example
export const NestedContainers: Story = {
  render: () => (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '400px', padding: '20px' }}>
      <Container maxWidth="xl" padding="6">
        <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '8px', marginBottom: '24px' }}>
          <h2 style={{ margin: '0 0 24px 0', textAlign: 'center' }}>Outer Container (XL)</h2>
          
          <Container maxWidth="md" padding="4" center={true}>
            <div style={{ backgroundColor: '#e3f2fd', padding: '24px', borderRadius: '8px', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Inner Container (MD)</h3>
              <p style={{ margin: 0, color: '#1565c0' }}>
                Nested containers can be useful for creating focused content areas within larger layouts.
              </p>
            </div>
          </Container>
        </div>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of nesting containers for creating hierarchical layouts.',
      },
    },
  },
};

// All sizes comparison
export const SizeComparison: Story = {
  render: () => (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
      <Stack direction="vertical" gap="6">
        {[
          { size: 'sm' as const, width: '640px' },
          { size: 'md' as const, width: '768px' },
          { size: 'lg' as const, width: '1024px' },
          { size: 'xl' as const, width: '1280px' },
          { size: '2xl' as const, width: '1536px' },
        ].map(({ size, width }) => (
          <Container key={size} maxWidth={size} padding="4">
            <div style={{
              backgroundColor: '#fff',
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'center',
              border: '2px solid #e5e7eb',
            }}>
              <strong>{size.toUpperCase()}</strong> - {width}
            </div>
          </Container>
        ))}
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visual comparison of all container sizes and their max-widths.',
      },
    },
  },
};