import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';
import { Button } from './Button';
import { Selector } from './Selector';
import { Card } from './Card/Card';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible layout component for arranging items in a linear direction (horizontal or vertical).

## Features
- **Direction**: Horizontal or vertical stacking
- **Gap**: Consistent spacing using design tokens
- **Alignment**: Control cross-axis alignment
- **Justification**: Control main-axis distribution
- **Wrapping**: Optional flex-wrap support
- **Semantic**: Customizable HTML element

Perfect for forms, button groups, navigation, and any linear layouts.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Stack direction',
    },
    gap: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24'],
      description: 'Gap between items using design tokens',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Align items (cross-axis)',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Justify content (main-axis)',
    },
    wrap: {
      control: 'boolean',
      description: 'Allow items to wrap',
    },
    as: {
      control: 'text',
      description: 'HTML element to render',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default stack (vertical with buttons)
export const Default: Story = {
  args: {
    direction: 'vertical',
    gap: 4,
    align: 'stretch',
    justify: 'start',
  },
  render: (args) => (
    <Stack {...args}>
      <Button variant="primary">First Button</Button>
      <Button variant="primary">Second Button</Button>
      <Button variant="primary">Third Button</Button>
    </Stack>
  ),
};

// Basic examples
export const Vertical: Story = {
  args: {
    direction: 'vertical',
    gap: '4',
  },
  render: (args) => (
    <Stack {...args}>
      <Button>First Button</Button>
      <Button>Second Button</Button>
      <Button>Third Button</Button>
    </Stack>
  ),
};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    gap: '4',
  },
  render: (args) => (
    <Stack {...args}>
      <Button>Save</Button>
      <Button variant="small">Cancel</Button>
      <Button variant="small">Reset</Button>
    </Stack>
  ),
};

// Alignment examples
export const CenterAligned: Story = {
  args: {
    direction: 'horizontal',
    gap: '3',
    align: 'center',
  },
  render: (args) => (
    <Stack {...args}>
      <Button>Large Button</Button>
      <Button variant="small">Small</Button>
      <Button variant="icon" icon={<span>→</span>} />
    </Stack>
  ),
};

export const SpaceBetween: Story = {
  args: {
    direction: 'horizontal',
    gap: '2',
    justify: 'between',
  },
  render: (args) => (
    <div style={{ width: '400px', border: '1px dashed #ccc', padding: '16px' }}>
      <Stack {...args}>
        <Button>Left</Button>
        <Button>Right</Button>
      </Stack>
    </div>
  ),
};

// Form example
export const FormLayout: Story = {
  render: () => (
    <Stack direction="vertical" gap="6" style={{ maxWidth: '400px' }}>
      <h3 style={{ margin: 0 }}>Contact Form</h3>
      
      <Stack direction="horizontal" gap="4">
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>First Name</label>
          <input 
            style={{ 
              width: '100%', 
              padding: '8px 12px', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }} 
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Last Name</label>
          <input 
            style={{ 
              width: '100%', 
              padding: '8px 12px', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }} 
          />
        </div>
      </Stack>
      
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Email</label>
        <input 
          type="email"
          style={{ 
            width: '100%', 
            padding: '8px 12px', 
            border: '1px solid #ccc', 
            borderRadius: '4px' 
          }} 
        />
      </div>
      
      <Stack direction="vertical" gap="3">
        <Selector variant="checkbox" label="Subscribe to newsletter" />
        <Selector variant="checkbox" label="Accept terms and conditions" />
      </Stack>
      
      <Stack direction="horizontal" gap="3" justify="end">
        <Button variant="small" color="white">Cancel</Button>
        <Button>Submit</Button>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using Stack for form layouts with mixed horizontal and vertical stacking.',
      },
    },
  },
};

// Navigation example
export const Navigation: Story = {
  render: () => (
    <Stack direction="horizontal" gap="6" align="center" justify="between" 
          style={{ padding: '16px 24px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
      <Stack direction="horizontal" gap="8" align="center">
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Ledger</div>
        <Stack direction="horizontal" gap="4">
          <Button variant="small" color="white">Dashboard</Button>
          <Button variant="small" color="white">Portfolio</Button>
          <Button variant="small" color="white">Reports</Button>
        </Stack>
      </Stack>
      
      <Stack direction="horizontal" gap="3" align="center">
        <Button variant="icon" icon={<span>🔔</span>} />
        <Button variant="small">Account</Button>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using Stack for navigation layouts with space-between justification.',
      },
    },
  },
};

// Wrapping example
export const Wrapping: Story = {
  args: {
    direction: 'horizontal',
    gap: '3',
    wrap: true,
  },
  render: (args) => (
    <div style={{ width: '300px', border: '1px dashed #ccc', padding: '16px' }}>
      <Stack {...args}>
        <Button variant="small">Tag 1</Button>
        <Button variant="small">Tag 2</Button>
        <Button variant="small">Long Tag Name</Button>
        <Button variant="small">Tag 4</Button>
        <Button variant="small">Another Long Tag</Button>
        <Button variant="small">Tag 6</Button>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of Stack with wrapping enabled for responsive tag layouts.',
      },
    },
  },
};

// All directions and gaps showcase
export const ShowcaseDirections: Story = {
  render: () => (
    <Stack direction="vertical" gap="8">
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Vertical Stack (gap: 2)</h4>
        <Stack direction="vertical" gap="2">
          <Button variant="small">Item 1</Button>
          <Button variant="small">Item 2</Button>
          <Button variant="small">Item 3</Button>
        </Stack>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Horizontal Stack (gap: 4)</h4>
        <Stack direction="horizontal" gap="4">
          <Button variant="small">Item 1</Button>
          <Button variant="small">Item 2</Button>
          <Button variant="small">Item 3</Button>
        </Stack>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Large Gap (gap: 8)</h4>
        <Stack direction="horizontal" gap="8">
          <Button variant="small">Wide</Button>
          <Button variant="small">Spacing</Button>
        </Stack>
      </div>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of different directions and gap sizes using design tokens.',
      },
    },
  },
};