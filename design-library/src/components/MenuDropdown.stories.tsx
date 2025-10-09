import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MenuDropdown } from './MenuDropdown';
import { useSemanticColors } from '../tokens';

const meta: Meta<typeof MenuDropdown> = {
  title: 'Components/MenuDropdown',
  component: MenuDropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Dropdown component with theme.primary200 background, no border, fully rounded corners, and no label by default. Width adapts to content. When selected, displays custom prefix (default "Option") in black500 followed by the selected value in black900. Features 6 interactive states, InfoTooltip integration, and customization options.',
      },
    },
  },
  argTypes: {
    label: {
      description: 'Dropdown label',
      control: 'text',
    },
    showLabel: {
      description: 'Show label (default: false)',
      control: 'boolean',
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
    triggerBackgroundColor: {
      description: 'Custom trigger background color',
      control: 'color',
    },
    showBorder: {
      description: 'Show border (default: false)',
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
    selectedPrefix: {
      description: 'Selected value prefix (e.g., "Option", "Year", "Type")',
      control: 'text',
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

// Interactive example with state
const InteractiveDropdown = () => {
  const [value, setValue] = useState('');

  return (
    <div style={{ width: '300px' }}>
      <MenuDropdown
        placeholder="Choose an option..."
        options={sampleOptions}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <InteractiveDropdown />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive dropdown that displays "Option: [label]" when an option is selected.',
      },
    },
  },
};

// Many options to test scrollbar
const manyOptions = Array.from({ length: 20 }, (_, i) => ({
  value: `option-${i + 1}`,
  label: `Option ${i + 1}`,
}));

const InteractiveScrollbarDropdown = () => {
  const [value, setValue] = useState('');

  return (
    <div style={{ width: '300px' }}>
      <MenuDropdown
        placeholder="Choose an option..."
        options={manyOptions}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </div>
  );
};

export const WithScrollbar: Story = {
  render: () => <InteractiveScrollbarDropdown />,
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with many options to demonstrate the custom scrollbar styling. Select an option to see "Option: [label]" format.',
      },
    },
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

// Custom trigger styling
const CustomTriggerExample = () => {
  const colors = useSemanticColors();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      width: '400px'
    }}>
      <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>
        Custom Trigger Examples:
      </h4>

      <MenuDropdown
        label="Theme 200 Background, No Border"
        showLabel={false}
        placeholder="Select option..."
        options={investmentOptions}
        triggerBackgroundColor={colors.theme.primary200}
        showBorder={false}
      />

      <MenuDropdown
        label="Theme 200 Background with Border"
        showLabel={false}
        placeholder="Select option..."
        options={investmentOptions}
        triggerBackgroundColor={colors.theme.primary200}
        showBorder={true}
      />

      <MenuDropdown
        label="Default with Label Hidden"
        showLabel={false}
        placeholder="Select option..."
        options={investmentOptions}
      />
    </div>
  );
};

export const CustomTrigger: Story = {
  render: () => <CustomTriggerExample />,
  parameters: {
    docs: {
      description: {
        story: 'Examples of customized dropdown triggers with different background colors, borders, and label visibility.',
      },
    },
  },
};

// Interactive behavior demonstration
const InteractiveBehaviorExample = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('bonds');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('option1');

  return (
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

      <MenuDropdown
        label="Interactive Dropdown 1"
        placeholder="Click me to see options..."
        options={investmentOptions}
        value={value1}
        onChange={setValue1}
        showTooltip={true}
        tooltipText="Watch: default → active (click) → filled (select)"
      />

      <MenuDropdown
        label="Pre-selected Example"
        value={value2}
        onChange={setValue2}
        options={investmentOptions}
        helperText="This shows filled state because it has a selected value"
      />

      <MenuDropdown
        label="Error State (No Auto-Active)"
        state="error"
        options={sampleOptions}
        value={value3}
        onChange={setValue3}
        helperText="Error state overrides interactive behavior"
      />

      <MenuDropdown
        label="Warning State (No Auto-Active)"
        state="warning"
        value={value4}
        onChange={setValue4}
        options={sampleOptions}
        helperText="Warning state overrides interactive behavior"
      />
    </div>
  );
};

export const InteractiveBehavior: Story = {
  render: () => <InteractiveBehaviorExample />,
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
      <MenuDropdown label="Default State" placeholder="Select an option..." options={sampleOptions} />
      
      <MenuDropdown 
        label="Active State" 
        state="active"
        placeholder="Ready for selection..."
        options={sampleOptions}
        showTooltip={true}
        tooltipText="This dropdown is focused"
      />
      
      <MenuDropdown 
        label="Filled State" 
        state="filled"
        value="option2"
        options={sampleOptions}
      />
      
      <MenuDropdown 
        label="Warning State" 
        state="warning"
        value="option1"
        options={sampleOptions}
        helperText="Please double-check your selection"
      />
      
      <MenuDropdown 
        label="Error State" 
        state="error"
        options={sampleOptions}
        helperText="Please select a valid option"
      />
      
      <MenuDropdown 
        label="Disabled State" 
        disabled={true}
        value="option3"
        options={sampleOptions}
      />
    </div>
  ),
};

// Complete example
const CompleteFormExample = () => {
  const [investmentType, setInvestmentType] = useState('stocks');
  const [riskLevel, setRiskLevel] = useState('moderate');
  const [investmentTerm, setInvestmentTerm] = useState('');

  return (
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
        <MenuDropdown
          label="Investment Type"
          placeholder="Select investment category..."
          options={investmentOptions}
          value={investmentType}
          onChange={setInvestmentType}
          showTooltip={true}
          tooltipText="Choose the primary type of investment for your portfolio"
        />

        <MenuDropdown
          label="Risk Level"
          placeholder="Select risk tolerance..."
          options={[
            { value: 'conservative', label: 'Conservative' },
            { value: 'moderate', label: 'Moderate' },
            { value: 'aggressive', label: 'Aggressive' },
          ]}
          value={riskLevel}
          onChange={setRiskLevel}
          showTooltip={true}
          tooltipSections={[
            {
              title: 'Risk Assessment:',
              description: 'Choose based on your investment timeline and comfort level'
            }
          ]}
        />

        <MenuDropdown
          label="Investment Term"
          placeholder="Select investment duration..."
          options={[
            { value: 'short', label: 'Short Term (< 1 year)' },
            { value: 'medium', label: 'Medium Term (1-5 years)' },
            { value: 'long', label: 'Long Term (5+ years)' },
          ]}
          value={investmentTerm}
          onChange={setInvestmentTerm}
          showTooltip={true}
          tooltipText="Select the expected duration for your investment"
        />
      </div>
    </div>
  );
};

export const CompleteExample: Story = {
  render: () => <CompleteFormExample />,
};

// Custom prefix examples
const CustomPrefixExample = () => {
  const [year, setYear] = useState('2024');
  const [type, setType] = useState('stocks');
  const [category, setCategory] = useState('');

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      width: '400px'
    }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>
        Custom Prefix Examples
      </h4>

      <MenuDropdown
        label="Select Year"
        placeholder="Choose a year..."
        selectedPrefix="Year"
        options={[
          { value: '2024', label: '2024' },
          { value: '2023', label: '2023' },
          { value: '2022', label: '2022' },
        ]}
        value={year}
        onChange={setYear}
      />

      <MenuDropdown
        label="Investment Type"
        placeholder="Select type..."
        selectedPrefix="Type"
        options={investmentOptions}
        value={type}
        onChange={setType}
      />

      <MenuDropdown
        label="Product Category"
        placeholder="Select category..."
        selectedPrefix="Category"
        options={[
          { value: 'electronics', label: 'Electronics' },
          { value: 'furniture', label: 'Furniture' },
          { value: 'clothing', label: 'Clothing' },
        ]}
        value={category}
        onChange={setCategory}
      />
    </div>
  );
};

export const CustomPrefix: Story = {
  render: () => <CustomPrefixExample />,
  parameters: {
    docs: {
      description: {
        story: 'Dropdowns with custom prefixes. The prefix (e.g., "Year:", "Type:") appears in black500, while the selected value appears in black900.',
      },
    },
  },
};