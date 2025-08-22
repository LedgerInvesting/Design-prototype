import type { Meta, StoryObj } from '@storybook/react';
import { Spacer } from './Spacer';
import { Stack } from './Stack';
import { Button } from './Button';

const meta: Meta<typeof Spacer> = {
  title: 'Layout/Spacer',
  component: Spacer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible spacer component for creating space between elements.

## Features
- **Flexible Growth**: Grows to fill available space by default
- **Fixed Size**: Use design tokens for consistent fixed spacing
- **Direction**: Works in both horizontal and vertical layouts
- **Invisible**: Creates space without visual elements

Perfect for pushing elements apart, creating flexible layouts, and maintaining consistent spacing.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24'],
      description: 'Fixed size using design tokens',
    },
    grow: {
      control: 'boolean',
      description: 'Whether to grow to fill available space',
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the spacer (for fixed size)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default spacer (flexible)
export const Default: Story = {
  args: {
    grow: true,
    size: undefined,
  },
  render: (args) => (
    <div style={{ border: '2px dashed #ccc', borderRadius: '8px', padding: '16px' }}>
      <Stack direction="horizontal" align="center" style={{ width: '100%' }}>
        <Button variant="primary">Left Button</Button>
        <Spacer {...args} />
        <Button variant="primary">Right Button</Button>
      </Stack>
      <div style={{ fontSize: '12px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
        The spacer {args.grow ? 'grows to fill available space' : `has fixed size: ${args.size}`}
      </div>
    </div>
  ),
};

// Basic examples
export const FlexibleSpacer: Story = {
  render: () => (
    <div style={{ border: '2px dashed #ccc', borderRadius: '8px', padding: '16px' }}>
      <Stack direction="horizontal" align="center" style={{ width: '100%' }}>
        <Button>Left Button</Button>
        <Spacer />
        <Button>Right Button</Button>
      </Stack>
      <div style={{ fontSize: '12px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
        The spacer grows to fill the space between buttons
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Flexible spacer that grows to fill available space, pushing elements apart.',
      },
    },
  },
};

export const FixedSpacer: Story = {
  args: {
    size: '8',
    grow: false,
  },
  render: (args) => (
    <div style={{ border: '2px dashed #ccc', borderRadius: '8px', padding: '16px' }}>
      <Stack direction="horizontal" align="center">
        <Button>Button 1</Button>
        <Spacer {...args} />
        <Button>Button 2</Button>
        <Spacer {...args} />
        <Button>Button 3</Button>
      </Stack>
      <div style={{ fontSize: '12px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
        Fixed spacers with consistent {args.size && `size: ${args.size}`} spacing
      </div>
    </div>
  ),
};

// Horizontal layouts
export const HorizontalLayouts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Navigation example */}
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>Navigation Bar</h4>
        <div style={{ 
          border: '1px solid #e5e7eb', 
          borderRadius: '8px', 
          padding: '12px 16px',
          backgroundColor: '#f8f9fa'
        }}>
          <Stack direction="horizontal" align="center">
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Logo</div>
            <Spacer />
            <Stack direction="horizontal" gap="3">
              <Button variant="small" color="white">Home</Button>
              <Button variant="small" color="white">About</Button>
              <Button variant="small" color="white">Contact</Button>
            </Stack>
            <Spacer size="4" grow={false} />
            <Button variant="small">Sign In</Button>
          </Stack>
        </div>
      </div>

      {/* Toolbar example */}
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>Toolbar</h4>
        <div style={{ 
          border: '1px solid #e5e7eb', 
          borderRadius: '8px', 
          padding: '12px 16px',
          backgroundColor: '#fff'
        }}>
          <Stack direction="horizontal" align="center">
            <Stack direction="horizontal" gap="2">
              <Button variant="small">Bold</Button>
              <Button variant="small">Italic</Button>
              <Button variant="small">Underline</Button>
            </Stack>
            <Spacer size="6" grow={false} />
            <Stack direction="horizontal" gap="2">
              <Button variant="small">Left</Button>
              <Button variant="small">Center</Button>
              <Button variant="small">Right</Button>
            </Stack>
            <Spacer />
            <Button variant="small" color="main">Save</Button>
          </Stack>
        </div>
      </div>

      {/* Card header example */}
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>Card Header</h4>
        <div style={{ 
          border: '1px solid #e5e7eb', 
          borderRadius: '8px', 
          padding: '16px',
          backgroundColor: '#fff'
        }}>
          <Stack direction="horizontal" align="center">
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>Settings</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Manage your account preferences</p>
            </div>
            <Spacer />
            <Stack direction="horizontal" gap="2">
              <Button variant="small" color="white">Cancel</Button>
              <Button variant="small">Save</Button>
            </Stack>
          </Stack>
        </div>
      </div>

    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common horizontal layout patterns using Spacer for flexible and fixed spacing.',
      },
    },
  },
};

// Vertical layouts
export const VerticalLayouts: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      
      {/* Sidebar example */}
      <div style={{ width: '200px' }}>
        <h4 style={{ margin: '0 0 12px 0' }}>Sidebar</h4>
        <div style={{ 
          border: '1px solid #e5e7eb', 
          borderRadius: '8px', 
          padding: '16px',
          backgroundColor: '#f8f9fa',
          height: '300px'
        }}>
          <Stack direction="vertical" style={{ height: '100%' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Menu</div>
            <Button variant="small" color="white" style={{ justifyContent: 'flex-start' }}>Dashboard</Button>
            <Button variant="small" color="white" style={{ justifyContent: 'flex-start' }}>Projects</Button>
            <Button variant="small" color="white" style={{ justifyContent: 'flex-start' }}>Team</Button>
            <Spacer />
            <Button variant="small" color="white" style={{ justifyContent: 'flex-start' }}>Settings</Button>
            <Button variant="small" color="white" style={{ justifyContent: 'flex-start' }}>Logout</Button>
          </Stack>
        </div>
      </div>

      {/* Modal example */}
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 12px 0' }}>Modal Dialog</h4>
        <div style={{ 
          border: '1px solid #e5e7eb', 
          borderRadius: '8px', 
          padding: '24px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          height: '300px'
        }}>
          <Stack direction="vertical" style={{ height: '100%' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>Delete Project</h3>
            <p style={{ margin: '0', color: '#6b7280', fontSize: '14px' }}>
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <Spacer size="4" grow={false} />
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#fef2f2', 
              borderRadius: '6px', 
              border: '1px solid #fecaca',
              fontSize: '14px',
              color: '#991b1b'
            }}>
              <strong>Warning:</strong> All project data will be permanently lost.
            </div>
            <Spacer />
            <Stack direction="horizontal" gap="3" justify="end">
              <Button variant="small" color="white">Cancel</Button>
              <Button variant="small" color="main">Delete Project</Button>
            </Stack>
          </Stack>
        </div>
      </div>

    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical layout patterns showing how Spacer works in column layouts.',
      },
    },
  },
};

// Size comparison
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Horizontal sizes */}
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Horizontal Fixed Sizes</h4>
        {['2', '4', '6', '8', '12'].map(size => (
          <div key={size} style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Size: {size}</div>
            <div style={{ 
              border: '1px dashed #ccc', 
              borderRadius: '4px', 
              padding: '8px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Button variant="small">Left</Button>
              <Spacer size={size as any} grow={false} />
              <Button variant="small">Right</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Vertical sizes */}
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Vertical Fixed Sizes</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['2', '4', '8', '12'].map(size => (
            <div key={size}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', textAlign: 'center' }}>
                Size: {size}
              </div>
              <div style={{ 
                border: '1px dashed #ccc', 
                borderRadius: '4px', 
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Button variant="small">Top</Button>
                <Spacer size={size as any} grow={false} direction="vertical" />
                <Button variant="small">Bottom</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visual comparison of different spacer sizes in both horizontal and vertical directions.',
      },
    },
  },
};

// Complex layout example
export const ComplexLayout: Story = {
  render: () => (
    <div style={{ 
      border: '1px solid #e5e7eb', 
      borderRadius: '12px', 
      padding: '24px',
      backgroundColor: '#fff',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px'
    }}>
      <Stack direction="vertical" style={{ height: '400px' }}>
        
        {/* Header */}
        <Stack direction="horizontal" align="center">
          <div>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '24px' }}>Invoice #1234</h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Due: March 15, 2024</p>
          </div>
          <Spacer />
          <div style={{ 
            padding: '6px 12px', 
            backgroundColor: '#dcfce7', 
            color: '#166534', 
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            PAID
          </div>
        </Stack>

        <Spacer size="6" grow={false} />

        {/* Content */}
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          flex: 1
        }}>
          <Stack direction="vertical" style={{ height: '100%' }}>
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Services</h3>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Design Services</span>
                  <span>$2,500.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Development</span>
                  <span>$3,500.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Consulting</span>
                  <span>$1,000.00</span>
                </div>
              </div>
            </div>
            
            <Spacer />
            
            <div style={{ 
              borderTop: '1px solid #e5e7eb', 
              paddingTop: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              <span>Total</span>
              <span>$7,000.00</span>
            </div>
          </Stack>
        </div>

        <Spacer size="6" grow={false} />

        {/* Footer */}
        <Stack direction="horizontal" justify="between" align="center">
          <Stack direction="horizontal" gap="3">
            <Button variant="small" color="white">Download PDF</Button>
            <Button variant="small" color="white">Print</Button>
          </Stack>
          <Button variant="small" color="main">Send Reminder</Button>
        </Stack>

      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex layout example showing how Spacer components work together to create professional interfaces.',
      },
    },
  },
};