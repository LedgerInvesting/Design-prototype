import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A specialized search input component with rounded corners, theme-aware background, and integrated search icon. Features borderRadius[24] and theme.primary400 background color.',
      },
    },
  },
  argTypes: {
    value: {
      description: 'Current search value',
      control: 'text',
    },
    placeholder: {
      description: 'Placeholder text',
      control: 'text',
    },
    disabled: {
      description: 'Disabled state',
      control: 'boolean',
    },
    onChange: {
      description: 'Change handler function',
      action: 'changed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <SearchBar {...args} />
    </div>
  ),
};

export const WithValue: Story = {
  args: {
    value: 'Commercial property',
    placeholder: 'Search...',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <SearchBar {...args} />
    </div>
  ),
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Search by transaction name, ID, reinsurer, or subject business...',
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <SearchBar {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Search...',
    disabled: true,
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <SearchBar {...args} />
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
      <div style={{ width: '300px' }}>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Small (300px)</div>
        <SearchBar placeholder="Search..." />
      </div>

      <div style={{ width: '400px' }}>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Medium (400px)</div>
        <SearchBar placeholder="Search transactions..." />
      </div>

      <div style={{ width: '600px' }}>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Large (600px)</div>
        <SearchBar placeholder="Search by transaction name, ID, reinsurer, or subject business..." />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'SearchBar components adapt to their container width. The component maintains consistent height (40px) and styling across different widths.',
      },
    },
  },
};

export const FormIntegration: Story = {
  render: () => (
    <div style={{
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      maxWidth: '500px'
    }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>
        Transaction Search
      </h3>

      <div style={{ marginBottom: '16px' }}>
        <SearchBar placeholder="Search transactions..." />
      </div>

      <div style={{ fontSize: '12px', color: '#666' }}>
        Search across transaction names, IDs, reinsuers, and other attributes
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example integration of SearchBar in a form context with proper labeling and helper text.',
      },
    },
  },
};