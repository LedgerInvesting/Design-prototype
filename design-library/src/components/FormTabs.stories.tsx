import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FormTabs, FormTab } from './FormTabs';

const meta = {
  title: 'Forms/FormTabs',
  component: FormTabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A horizontal tabs component for forms with step-like progression. Features 30px height, 2px gaps between tabs, and distinct active/inactive states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeTab: {
      control: { type: 'radio' },
      options: ['basic-info', 'policy-groups', 'structure-terms', 'reporting-config'],
      description: 'Currently active tab ID',
    },
    onTabClick: {
      description: 'Tab click handler function',
    },
  },
} satisfies Meta<typeof FormTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTabs: FormTab[] = [
  { id: 'basic-info', label: 'Basic Info' },
  { id: 'policy-groups', label: 'Policy Groups' },
  { id: 'structure-terms', label: 'Structure and Key Terms' },
  { id: 'reporting-config', label: 'Reporting Parameters & Configuration' },
];

// Interactive component for controlled behavior
const InteractiveFormTabs = (args: any) => {
  const [activeTab, setActiveTab] = useState(args.activeTab);

  return (
    <div style={{ width: '800px' }}>
      <FormTabs
        {...args}
        activeTab={activeTab}
        onTabClick={(tabId) => {
          setActiveTab(tabId);
          args.onTabClick?.(tabId);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 'basic-info',
  },
  render: InteractiveFormTabs,
};

export const SecondTabActive: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 'policy-groups',
  },
  render: InteractiveFormTabs,
};

export const LastTabActive: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 'reporting-config',
  },
  render: InteractiveFormTabs,
};

export const WithDisabledTabs: Story = {
  args: {
    tabs: [
      { id: 'basic-info', label: 'Basic Info' },
      { id: 'policy-groups', label: 'Policy Groups' },
      { id: 'structure-terms', label: 'Structure and Key Terms', disabled: true },
      { id: 'reporting-config', label: 'Reporting Parameters & Configuration', disabled: true },
    ],
    activeTab: 'policy-groups',
  },
  render: InteractiveFormTabs,
};

export const FewTabs: Story = {
  args: {
    tabs: [
      { id: 'step-1', label: 'Step 1' },
      { id: 'step-2', label: 'Step 2' },
      { id: 'step-3', label: 'Step 3' },
    ],
    activeTab: 'step-2',
  },
  render: InteractiveFormTabs,
};

export const ShortLabels: Story = {
  args: {
    tabs: [
      { id: 'info', label: 'Info' },
      { id: 'groups', label: 'Groups' },
      { id: 'structure', label: 'Structure' },
      { id: 'reporting', label: 'Reporting' },
      { id: 'review', label: 'Review' },
    ],
    activeTab: 'structure',
  },
  render: InteractiveFormTabs,
};