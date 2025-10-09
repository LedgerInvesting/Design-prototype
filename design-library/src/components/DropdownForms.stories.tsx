import type { Meta, StoryObj } from '@storybook/react';
import { DropdownForms } from './DropdownForms';

const meta: Meta<typeof DropdownForms> = {
  title: 'Forms/Dropdown',
  component: DropdownForms,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Complete dropdown component with same specifications as Input field. Features 6 interactive states, InfoTooltip integration, and design system tokens.',
      },
    },
  },
  argTypes: {
    label: {
      description: 'Dropdown label',
      control: 'text',
    },
    placeholder: {
      description: 'Placeholder text when no option is selected',
      control: 'text',
    },
    value: {
      description: 'Selected value',
      control: 'text',
    },
    options: {
      description: 'Available options array',
      control: 'object',
    },
    state: {
      description: 'Dropdown state (auto-transitions: default → active → filled)',
      control: 'radio',
      options: ['default', 'active', 'filled', 'warning', 'error', 'disabled'],
    },
    showTooltip: {
      description: 'Show info tooltip',
      control: 'boolean',
    },
    tooltipText: {
      description: 'Simple tooltip text',
      control: 'text',
    },
    tooltipSections: {
      description: 'Complex tooltip sections',
      control: 'object',
    },
    helperText: {
      description: 'Error/warning/helper message',
      control: 'text',
    },
    disabled: {
      description: 'Disabled state',
      control: 'boolean',
    },
    onChange: {
      description: 'Selection change handler',
      action: 'changed'
    },
    onFocus: {
      description: 'Focus handler',
      action: 'focused'
    },
    onBlur: {
      description: 'Blur handler',
      action: 'blurred'
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample options for stories
const sampleOptions = [
  { value: 'option1', label: 'First Option' },
  { value: 'option2', label: 'Second Option' },
  { value: 'option3', label: 'Third Option' },
  { value: 'option4', label: 'Fourth Option' },
  { value: 'disabled', label: 'Disabled Option', disabled: true },
];

const investmentOptions = [
  { value: 'stocks', label: 'Stocks' },
  { value: 'bonds', label: 'Bonds' },
  { value: 'mutual-funds', label: 'Mutual Funds' },
  { value: 'etfs', label: 'ETFs' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'crypto', label: 'Cryptocurrency' },
];

// Default story
export const Default: Story = {
  args: {
    label: 'Select Option',
    placeholder: 'Choose an option...',
    options: sampleOptions,
    state: 'default',
    showTooltip: false,
  },
};

// States
export const Active: Story = {
  args: {
    ...Default.args,
    state: 'active',
    showTooltip: true,
    tooltipText: 'This dropdown is focused and ready for selection',
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    state: 'filled',
    value: 'option2',
    options: sampleOptions,
  },
};

export const Warning: Story = {
  args: {
    ...Default.args,
    state: 'warning',
    value: 'option1',
    helperText: 'Please double-check your selection',
    showTooltip: true,
    tooltipText: 'This selection might need review',
    options: sampleOptions,
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    state: 'error',
    helperText: 'Please select a valid option',
    options: sampleOptions,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    value: 'option1',
    options: sampleOptions,
  },
};

// Investment category example
export const InvestmentCategory: Story = {
  args: {
    label: 'Investment Type',
    placeholder: 'Select investment category...',
    options: investmentOptions,
    showTooltip: true,
    tooltipText: 'Choose the type of investment that matches your portfolio strategy',
  },
};

// With complex tooltip
export const WithComplexTooltip: Story = {
  args: {
    ...Default.args,
    label: 'Risk Assessment',
    placeholder: 'Select risk level...',
    showTooltip: true,
    tooltipSections: [
      {
        title: 'Conservative:',
        description: 'Low risk, stable returns, suitable for capital preservation'
      },
      {
        title: 'Moderate:',
        description: 'Balanced risk and return, suitable for long-term growth'
      },
      {
        title: 'Aggressive:',
        description: 'High risk, high potential returns, suitable for experienced investors'
      }
    ],
    options: [
      { value: 'conservative', label: 'Conservative' },
      { value: 'moderate', label: 'Moderate' },
      { value: 'aggressive', label: 'Aggressive' },
    ],
  },
};

// Interactive behavior demonstration
export const InteractiveBehavior: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      width: '400px'
    }}>
      <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>
        Click on dropdowns to see active state and option list:
      </h4>

      <DropdownForms
        label="Interactive Dropdown 1"
        placeholder="Click me to see options..."
        options={investmentOptions}
        showTooltip={true}
        tooltipText="Watch: default → active (click) → filled (select)"
      />

      <DropdownForms
        label="Pre-selected Example"
        value="bonds"
        options={investmentOptions}
        helperText="This shows filled state because it has a selected value"
      />

      <DropdownForms
        label="Error State (No Auto-Active)"
        state="error"
        options={sampleOptions}
        helperText="Error state overrides interactive behavior"
      />

      <DropdownForms
        label="Warning State (No Auto-Active)"
        state="warning"
        value="option1"
        options={sampleOptions}
        helperText="Warning state overrides interactive behavior"
      />
    </div>
  ),
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      width: '400px'
    }}>
      <DropdownForms label="Default State" placeholder="Select an option..." options={sampleOptions} />

      <DropdownForms
        label="Active State"
        state="active"
        placeholder="Ready for selection..."
        options={sampleOptions}
        showTooltip={true}
        tooltipText="This dropdown is focused"
      />

      <DropdownForms
        label="Filled State"
        state="filled"
        value="option2"
        options={sampleOptions}
      />

      <DropdownForms
        label="Warning State"
        state="warning"
        value="option1"
        options={sampleOptions}
        helperText="Please double-check your selection"
      />

      <DropdownForms
        label="Error State"
        state="error"
        options={sampleOptions}
        helperText="Please select a valid option"
      />

      <DropdownForms
        label="Disabled State"
        disabled={true}
        value="option3"
        options={sampleOptions}
      />
    </div>
  ),
};

// Complete example
export const CompleteExample: Story = {
  render: () => (
    <div style={{
      padding: '24px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      width: '400px'
    }}>
      <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>
        Investment Portfolio Setup
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <DropdownForms
          label="Investment Type"
          placeholder="Select investment category..."
          options={investmentOptions}
          showTooltip={true}
          tooltipText="Choose the primary type of investment for your portfolio"
          value="stocks"
        />

        <DropdownForms
          label="Risk Level"
          placeholder="Select risk tolerance..."
          options={[
            { value: 'conservative', label: 'Conservative' },
            { value: 'moderate', label: 'Moderate' },
            { value: 'aggressive', label: 'Aggressive' },
          ]}
          showTooltip={true}
          tooltipSections={[
            {
              title: 'Risk Assessment:',
              description: 'Choose based on your investment timeline and comfort level'
            }
          ]}
          value="moderate"
        />

        <DropdownForms
          label="Investment Term"
          placeholder="Select investment duration..."
          options={[
            { value: 'short', label: 'Short Term (< 1 year)' },
            { value: 'medium', label: 'Medium Term (1-5 years)' },
            { value: 'long', label: 'Long Term (5+ years)' },
          ]}
          showTooltip={true}
          tooltipText="Select the expected duration for your investment"
        />
      </div>
    </div>
  ),
};
