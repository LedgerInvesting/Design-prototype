import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { icons } from '../icons';
import { colors } from '../tokens';

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Complete form input component with label, tooltip integration, left symbols, and 6 interactive states. Features automatic state transitions, custom controls for numbers, and full design token integration.',
      },
    },
  },
  argTypes: {
    label: {
      description: 'Input label text',
      control: 'text',
    },
    placeholder: {
      description: 'Placeholder text shown when empty',
      control: 'text',
    },
    value: {
      description: 'Input value',
      control: 'text',
    },
    type: {
      description: 'HTML input type',
      control: 'radio',
      options: ['text', 'number', 'email', 'password'],
    },
    state: {
      description: 'Visual state of the input',
      control: 'radio',
      options: ['default', 'active', 'filled', 'warning', 'error', 'success', 'disabled'],
    },
    leftSymbol: {
      description: 'Left symbol ($ or %)',
      control: 'radio',
      options: [null, '$', '%'],
    },
    showTooltip: {
      description: 'Show info tooltip next to label',
      control: 'boolean',
    },
    tooltipText: {
      description: 'Simple tooltip text',
      control: 'text',
    },
    tooltipSections: {
      description: 'Complex tooltip with multiple sections',
      control: 'object',
    },
    helperText: {
      description: 'Helper/error/warning text below input',
      control: 'text',
    },
    disabled: {
      description: 'Disabled state',
      control: 'boolean',
    },
    onChange: {
      description: 'Change event handler',
      action: 'changed',
    },
    onFocus: {
      description: 'Focus event handler',
      action: 'focused',
    },
    onBlur: {
      description: 'Blur event handler',
      action: 'blurred',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Enter value...',
    state: 'default',
    showTooltip: false,
    leftSymbol: null,
  },
};


// Interactive behavior demonstration
export const InteractiveBehavior: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Input 
        label="Interactive Input" 
        placeholder="Click me, then type to see state changes..."
        showTooltip={true}
        tooltipText="Watch: default → active (click) → filled (type + blur)"
      />
      
      <Input 
        label="With Dollar Symbol" 
        placeholder="0.00"
        leftSymbol="$"
      />
      
      <Input 
        label="Pre-filled Input" 
        value="Already has content"
        helperText="Shows filled state because it has a value"
      />
      
      <Input 
        label="Error State" 
        state="error"
        value="This stays in error state"
        helperText="Error state overrides interactive behavior"
      />
      
      <Input 
        label="Warning State" 
        state="warning" 
        value="This stays in warning state"
        helperText="Warning state overrides interactive behavior"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive behavior demonstration showing automatic state transitions: default → active (focus) → filled (content + blur). Error and warning states override automatic behavior.',
      },
    },
  },
};


// All states showcase
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Input label="Default State" placeholder="Enter value..." />
      
      <Input 
        label="Active State" 
        state="active"
        placeholder="Ready for input..."
        showTooltip={true}
        tooltipText="This field is focused"
      />
      
      <Input 
        label="Filled State" 
        state="filled"
        value="1,250.00"
        leftSymbol="$"
      />
      
      <Input 
        label="Warning State" 
        state="warning"
        value="12/31/2024"
        helperText="Select an end date"
      />
      
      <Input
        label="Error State"
        state="error"
        value="invalid@email"
        helperText="Please enter a valid email address"
        type="email"
      />

      <Input
        label="Success State"
        state="success"
        value="user@example.com"
        helperText="Valid email address entered"
        type="email"
      />

      <Input
        label="Disabled State"
        disabled={true}
        value="Read only value"
        leftSymbol="%"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All seven input states: Default (idle), Active (focused), Filled (has content), Warning (potential issue), Error (validation failure), Success (validation passed), and Disabled (non-interactive).',
      },
    },
  },
};

// Input types showcase
export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Input 
        label="Text Input" 
        type="text"
        placeholder="Enter text..."
      />
      
      <Input 
        label="Number Input" 
        type="number"
        placeholder="0.00"
        leftSymbol="$"
      />
      
      <Input 
        label="Email Input" 
        type="email"
        placeholder="email@example.com"
      />
      
      <Input 
        label="Password Input" 
        type="password"
        placeholder="Enter password..."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All supported HTML input types: text, number (with custom controls), email, and password. Number inputs include custom chevron controls replacing browser defaults.',
      },
    },
  },
};

// Left symbols showcase
export const LeftSymbols: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Input 
        label="Investment Amount" 
        type="number"
        placeholder="0.00"
        leftSymbol="$"
      />
      
      <Input 
        label="Interest Rate" 
        type="number"
        placeholder="0.00"
        leftSymbol="%"
      />
      
      <Input 
        label="No Symbol" 
        placeholder="Enter value..."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Left symbol support for currency ($) and percentage (%) with proper positioning and styling.',
      },
    },
  },
};

// Tooltip variations
export const TooltipVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Input 
        label="Simple Tooltip" 
        placeholder="0.00"
        leftSymbol="$"
        showTooltip={true}
        tooltipText="The total value of all investments in your portfolio"
      />
      
      <Input 
        label="Complex Tooltip" 
        placeholder="0.00"
        leftSymbol="%"
        showTooltip={true}
        tooltipSections={[
          {
            title: 'Total Return:',
            description: 'The overall gain or loss on your investment including dividends'
          },
          {
            title: 'Annualized Return:',
            description: 'The average yearly return over the holding period'
          }
        ]}
      />
      
      <Input 
        label="No Tooltip" 
        placeholder="Enter value..."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip integration: simple text tooltip, complex multi-section tooltip, and no tooltip options.',
      },
    },
  },
};

// Form integration example
export const FormIntegration: Story = {
  render: () => (
    <div style={{ 
      padding: '24px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      width: '400px'
    }}>
      <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
        Investment Details
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input 
          label="Initial Investment" 
          type="number"
          placeholder="0.00"
          leftSymbol="$"
          showTooltip={true}
          tooltipText="The initial amount you plan to invest"
          value="10,000.00"
        />
        
        <Input 
          label="Expected Return" 
          type="number"
          placeholder="0.00"
          leftSymbol="%"
          showTooltip={true}
          tooltipSections={[
            {
              title: 'Annual Return Rate:',
              description: 'The expected yearly percentage return on your investment'
            }
          ]}
          value="8.5"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete form integration example showing inputs with values, tooltips, symbols, and proper styling in a real-world context.',
      },
    },
  },
};