import type { Meta, StoryObj } from '@storybook/react';
import { Status } from './Chips';

const meta: Meta<typeof Status> = {
  title: 'Components/Status',
  component: Status,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Status component for displaying status indicators with dropdown menu functionality. Features colored dots, text, and interactive selection from predefined options. Available in 5 semantic variants and 3 sizes.',
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Semantic variant of the status component',
      control: 'radio',
      options: ['warning', 'success', 'error', 'info', 'inactive'],
    },
    size: {
      description: 'Size of the status component',
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
    text: {
      description: 'Initial text content (will be overridden by selection)',
      control: 'text',
    },
    showDot: {
      description: 'Whether to show the status dot',
      control: 'boolean',
    },
    showChevron: {
      description: 'Whether to show the dropdown chevron icon',
      control: 'boolean',
    },
    options: {
      description: 'Array of options for the dropdown menu',
      control: 'object',
    },
    onSelect: {
      description: 'Selection handler for dropdown functionality',
      action: 'selected',
    },
    disabled: {
      description: 'Whether the status component is disabled',
      control: 'boolean',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Status>;

// Default status with dropdown
export const Default: Story = {
  args: {
    variant: 'warning',
    size: 'small',
    text: 'Status',
    showDot: true,
    showChevron: true,
    options: ['Active', 'Inactive', 'Pending', 'Completed'],
    onSelect: (option: string) => console.log('Selected:', option),
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Status 
          variant="warning" 
          size="medium" 
          text="Warning" 
          options={['Active', 'Warning', 'Critical']}
          onSelect={(option) => console.log('Warning:', option)}
        />
        <span style={{ fontSize: '12px', color: '#666' }}>Warning</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Status 
          variant="success" 
          size="medium" 
          text="Success" 
          options={['Completed', 'Success', 'Verified']}
          onSelect={(option) => console.log('Success:', option)}
        />
        <span style={{ fontSize: '12px', color: '#666' }}>Success</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Status 
          variant="error" 
          size="medium" 
          text="Error" 
          options={['Failed', 'Error', 'Rejected']}
          onSelect={(option) => console.log('Error:', option)}
        />
        <span style={{ fontSize: '12px', color: '#666' }}>Error</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Status 
          variant="info" 
          size="medium" 
          text="Info" 
          options={['Processing', 'Info', 'Review']}
          onSelect={(option) => console.log('Info:', option)}
        />
        <span style={{ fontSize: '12px', color: '#666' }}>Info</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Status 
          variant="inactive" 
          size="medium" 
          text="Inactive" 
          options={['Inactive', 'Disabled', 'Archived']}
          onSelect={(option) => console.log('Inactive:', option)}
        />
        <span style={{ fontSize: '12px', color: '#666' }}>Inactive</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All five semantic variants: Warning (yellow), Success (green), Error (red/pink), Info (blue), and Inactive (gray).',
      },
    },
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Chips variant="warning" size="small" text="Small" />
        <span style={{ fontSize: '12px', color: '#666' }}>Small</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Chips variant="warning" size="medium" text="Medium" />
        <span style={{ fontSize: '12px', color: '#666' }}>Medium</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Chips variant="warning" size="large" text="Large" />
        <span style={{ fontSize: '12px', color: '#666' }}>Large</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All three sizes available: Small (20px height), Medium (24px height), and Large (28px height).',
      },
    },
  },
};

// Without chevron
export const WithoutChevron: Story = {
  args: {
    variant: 'success',
    size: 'medium',
    text: 'Completed',
    showDot: true,
    showChevron: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Chip without the dropdown chevron, useful for simple status indicators.',
      },
    },
  },
};

// Without dot
export const WithoutDot: Story = {
  args: {
    variant: 'info',
    size: 'medium',
    text: 'Simple Text',
    showDot: false,
    showChevron: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Chip without the status dot, useful for text-only labels with dropdown functionality.',
      },
    },
  },
};

// Text only (no dot, no chevron)
export const TextOnly: Story = {
  args: {
    variant: 'inactive',
    size: 'medium',
    text: 'Label',
    showDot: false,
    showChevron: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal chip with just text, no dot or chevron. Useful for simple labels.',
      },
    },
  },
};

// Dropdown functionality showcase
export const DropdownShowcase: Story = {
  args: {
    variant: 'info',
    size: 'medium',
    text: 'Select Status',
    showChevron: true,
    options: ['Draft', 'In Progress', 'Review', 'Completed', 'Archived'],
    onSelect: (option: string) => console.log('Selected status:', option),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive status component with dropdown menu. Click to see the selection options with close button and hover states.',
      },
    },
  },
};

// Static status (no dropdown)
export const StaticStatus: Story = {
  args: {
    variant: 'success',
    size: 'medium',
    text: 'Completed',
    showDot: true,
    showChevron: false,
    // No onSelect - renders as static component
  },
  parameters: {
    docs: {
      description: {
        story: 'Static status indicator without dropdown functionality. Used for display-only status.',
      },
    },
  },
};

// Disabled state
export const DisabledState: Story = {
  args: {
    variant: 'warning',
    size: 'medium',
    text: 'Disabled',
    showChevron: true,
    options: ['Option 1', 'Option 2', 'Option 3'],
    onSelect: (option: string) => console.log('This should not trigger'),
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled status component that cannot be clicked or interacted with.',
      },
    },
  },
};

// Size comparison grid
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', fontWeight: 500, width: '60px' }}>Small:</span>
        <Chips variant="warning" size="small" text="Warning" />
        <Chips variant="success" size="small" text="Success" />
        <Chips variant="error" size="small" text="Error" />
        <Chips variant="info" size="small" text="Info" />
        <Chips variant="inactive" size="small" text="Inactive" />
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', fontWeight: 500, width: '60px' }}>Medium:</span>
        <Chips variant="warning" size="medium" text="Warning" />
        <Chips variant="success" size="medium" text="Success" />
        <Chips variant="error" size="medium" text="Error" />
        <Chips variant="info" size="medium" text="Info" />
        <Chips variant="inactive" size="medium" text="Inactive" />
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', fontWeight: 500, width: '60px' }}>Large:</span>
        <Chips variant="warning" size="large" text="Warning" />
        <Chips variant="success" size="large" text="Success" />
        <Chips variant="error" size="large" text="Error" />
        <Chips variant="info" size="large" text="Info" />
        <Chips variant="inactive" size="large" text="Inactive" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete size and variant comparison showing all combinations in a grid layout.',
      },
    },
  },
};

// Real-world usage examples
export const RealWorldUsage: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Order Status</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Chips variant="warning" size="small" text="Pending" showChevron={false} />
          <Chips variant="info" size="small" text="Processing" showChevron={false} />
          <Chips variant="success" size="small" text="Completed" showChevron={false} />
          <Chips variant="error" size="small" text="Cancelled" showChevron={false} />
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Filter Dropdown</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Chips variant="info" size="medium" text="Category" onClick={() => {}} />
          <Chips variant="info" size="medium" text="Status" onClick={() => {}} />
          <Chips variant="info" size="medium" text="Date Range" onClick={() => {}} />
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>System Health</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Chips variant="success" size="large" text="API: Healthy" showChevron={false} />
          <Chips variant="warning" size="large" text="Database: Slow" showChevron={false} />
          <Chips variant="error" size="large" text="Cache: Down" showChevron={false} />
          <Chips variant="inactive" size="large" text="Backup: Offline" showChevron={false} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world usage examples showing chips as status indicators, filter dropdowns, and system health monitors.',
      },
    },
  },
};

// Custom text examples
export const CustomText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <Chips variant="success" size="medium" text="✓ Verified" showChevron={false} />
      <Chips variant="warning" size="medium" text="⚠ Review" showChevron={false} />
      <Chips variant="error" size="medium" text="✗ Failed" showChevron={false} />
      <Chips variant="info" size="medium" text="ℹ More Info" />
      <Chips variant="inactive" size="medium" text="— N/A" showChevron={false} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples with custom text content including symbols and emojis.',
      },
    },
  },
};

// Individual variant stories
export const Warning: Story = {
  args: {
    variant: 'warning',
    size: 'medium',
    text: 'Warning',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    size: 'medium',
    text: 'Success',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    size: 'medium',
    text: 'Error',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    size: 'medium',
    text: 'Info',
  },
};

export const Inactive: Story = {
  args: {
    variant: 'inactive',
    size: 'medium',
    text: 'Inactive',
  },
};