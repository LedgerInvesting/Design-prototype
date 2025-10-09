import type { Meta, StoryObj } from '@storybook/react';
import { CustomScroll } from './CustomScroll';
import { typography, colors } from '../tokens';

const meta: Meta<typeof CustomScroll> = {
  title: 'Components/CustomScroll',
  component: CustomScroll,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Custom scrollbar component with styled appearance that is always visible. Based on the Insights Explorer program list scroll design with 6px width, theme.primary200 track, and black900 thumb.',
      },
    },
  },
  argTypes: {
    children: {
      control: false,
      description: 'Child elements to be scrolled',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height for the scroll container',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class',
    },
    scrollClassName: {
      control: 'text',
      description: 'Custom scroll class name for unique styling',
    },
    trackColor: {
      control: 'color',
      description: 'Custom track background color (defaults to theme.primary200)',
    },
    thumbColor: {
      control: 'color',
      description: 'Custom thumb background color (defaults to black900)',
    },
    scrollWidth: {
      control: 'number',
      description: 'Scroll width in pixels (default: 6)',
    },
    thumbBorderRadius: {
      control: 'number',
      description: 'Thumb border radius in pixels (default: 3)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content for demonstration
const SampleContent = () => (
  <div>
    {Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        style={{
          padding: '12px',
          borderBottom: '1px solid #e0e0e0',
          ...typography.styles.bodyM,
        }}
      >
        Item {i + 1} - Sample scrollable content
      </div>
    ))}
  </div>
);

// Default story
export const Default: Story = {
  args: {
    maxHeight: '300px',
    children: <SampleContent />,
  },
};

// With custom colors
export const CustomColors: Story = {
  args: {
    maxHeight: '300px',
    children: <SampleContent />,
    trackColor: '#e3f2fd',
    thumbColor: '#1976d2',
  },
};

// Smaller scroll width
export const ThinScroll: Story = {
  args: {
    maxHeight: '300px',
    children: <SampleContent />,
    scrollWidth: 4,
  },
};

// Wider scroll width
export const WideScroll: Story = {
  args: {
    maxHeight: '300px',
    children: <SampleContent />,
    scrollWidth: 10,
    thumbBorderRadius: 5,
  },
};

// Short container
export const ShortContainer: Story = {
  args: {
    maxHeight: '150px',
    children: <SampleContent />,
  },
};

// All variations
export const AllVariations: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      gap: '24px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
    }}>
      <div style={{ width: '250px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>
          Default (Theme Colors)
        </h4>
        <CustomScroll maxHeight="200px">
          <SampleContent />
        </CustomScroll>
      </div>

      <div style={{ width: '250px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>
          Custom Colors
        </h4>
        <CustomScroll
          maxHeight="200px"
          trackColor="#fff3e0"
          thumbColor="#ff9800"
        >
          <SampleContent />
        </CustomScroll>
      </div>

      <div style={{ width: '250px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>
          Thin Scroll (4px)
        </h4>
        <CustomScroll maxHeight="200px" scrollWidth={4}>
          <SampleContent />
        </CustomScroll>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different scroll configurations side by side.',
      },
    },
  },
};

// Dropdown list example
export const DropdownListExample: Story = {
  render: () => {
    const options = [
      'First Option',
      'Second Option',
      'Third Option',
      'Fourth Option',
      'Fifth Option',
      'Sixth Option',
      'Seventh Option',
      'Eighth Option',
      'Ninth Option',
      'Tenth Option',
    ];

    return (
      <div style={{
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        width: '300px',
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>
          Dropdown List Style
        </h4>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '10px',
        }}>
          <CustomScroll maxHeight="200px" scrollClassName="dropdown-scroll">
            {options.map((option, index) => (
              <div
                key={index}
                style={{
                  padding: '12px 10px',
                  borderRadius: '4px',
                  ...typography.styles.bodyM,
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.reports.blue200;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {option}
              </div>
            ))}
          </CustomScroll>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing CustomScroll used in a dropdown-style list.',
      },
    },
  },
};
