import type { Meta, StoryObj } from '@storybook/react';
import { CustomCell } from './CustomCell';
import type { CustomCellElement } from './CustomCell';
import { AddSmall, DownloadMedium, CheckMedium, HelpExtraSmall } from '../icons';

const meta: Meta<typeof CustomCell> = {
  title: 'Components/Table/CustomCell',
  component: CustomCell,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    elements: {
      description: 'Array of elements to render in the cell',
      control: { type: 'object' },
    },
    alignment: {
      description: 'Horizontal alignment of content',
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    direction: {
      description: 'Layout direction of elements',
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    gap: {
      description: 'Gap between elements in pixels',
      control: { type: 'number' },
    },
    onClick: {
      description: 'Click handler for the entire cell',
      action: 'cell clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomCell>;

// Basic text examples
export const SimpleText: Story = {
  args: {
    elements: [
      {
        type: 'text',
        content: 'Simple text content',
      }
    ] as CustomCellElement[],
  },
};

export const StyledText: Story = {
  args: {
    elements: [
      {
        type: 'text',
        content: 'Styled Text',
        style: 'subheadingS',
        weight: 'semibold',
        color: 'primary',
      }
    ] as CustomCellElement[],
  },
};

export const ClickableText: Story = {
  args: {
    elements: [
      {
        type: 'text',
        content: 'Click me!',
        color: 'primary',
        weight: 'medium',
        onClick: () => alert('Text clicked!'),
      }
    ] as CustomCellElement[],
  },
};

// Icon examples
export const SimpleIcon: Story = {
  args: {
    elements: [
      {
        type: 'icon',
        icon: <EditMedium color="#6B7280" />,
      }
    ] as CustomCellElement[],
  },
};

export const ClickableIcon: Story = {
  args: {
    elements: [
      {
        type: 'icon',
        icon: <DownloadMedium color="#3B82F6" />,
        onClick: () => alert('Icon clicked!'),
      }
    ] as CustomCellElement[],
  },
};

// Button examples
export const SimpleButton: Story = {
  args: {
    elements: [
      {
        type: 'button',
        text: 'Click me',
        variant: 'small',
        color: 'main',
        onClick: () => alert('Button clicked!'),
      }
    ] as CustomCellElement[],
  },
};

export const ButtonWithIcon: Story = {
  args: {
    elements: [
      {
        type: 'button',
        text: 'Add Item',
        variant: 'small',
        color: 'green',
        icon: <AddSmall color="currentColor" />,
        onClick: () => alert('Add button clicked!'),
      }
    ] as CustomCellElement[],
  },
};

// Badge examples
export const SimpleBadge: Story = {
  args: {
    elements: [
      {
        type: 'badge',
        text: 'Active',
        variant: 'success',
      }
    ] as CustomCellElement[],
  },
};

export const BadgeWithIcon: Story = {
  args: {
    elements: [
      {
        type: 'badge',
        text: 'Verified',
        variant: 'primary',
        icon: <CheckMedium color="currentColor" />,
      }
    ] as CustomCellElement[],
  },
};

export const MultipleBadges: Story = {
  args: {
    elements: [
      {
        type: 'badge',
        text: 'Active',
        variant: 'success',
      },
      {
        type: 'badge',
        text: 'Premium',
        variant: 'primary',
      }
    ] as CustomCellElement[],
    gap: 6,
  },
};

// Status examples
export const StatusIndicators: Story = {
  args: {
    elements: [
      {
        type: 'status',
        status: 'active',
        text: 'Active',
      }
    ] as CustomCellElement[],
  },
};

export const StatusWithoutText: Story = {
  args: {
    elements: [
      {
        type: 'status',
        status: 'complete',
      }
    ] as CustomCellElement[],
  },
};

export const MultipleStatuses: Story = {
  args: {
    elements: [
      {
        type: 'status',
        status: 'active',
        text: 'Online',
      },
      {
        type: 'status',
        status: 'pending',
        text: 'Processing',
      }
    ] as CustomCellElement[],
    direction: 'vertical',
    alignment: 'left',
    gap: 4,
  },
};

// Complex combinations
export const TextWithIcon: Story = {
  args: {
    elements: [
      {
        type: 'icon',
        icon: <EditMedium color="#6B7280" />,
      },
      {
        type: 'text',
        content: 'Document.pdf',
        style: 'bodyM',
        weight: 'medium',
      }
    ] as CustomCellElement[],
    alignment: 'left',
    gap: 8,
  },
};

export const TextWithButton: Story = {
  args: {
    elements: [
      {
        type: 'text',
        content: 'Project Alpha',
        style: 'bodyM',
        weight: 'semibold',
      },
      {
        type: 'button',
        text: 'Edit',
        variant: 'small',
        color: 'main',
        onClick: () => alert('Edit clicked!'),
      }
    ] as CustomCellElement[],
    alignment: 'left',
    gap: 12,
  },
};

export const StatusWithActions: Story = {
  args: {
    elements: [
      {
        type: 'status',
        status: 'error',
        text: 'Failed',
      },
      {
        type: 'button',
        text: 'Retry',
        variant: 'small',
        color: 'white',
        onClick: () => alert('Retry clicked!'),
      }
    ] as CustomCellElement[],
    alignment: 'left',
    gap: 12,
  },
};

export const ComplexCell: Story = {
  args: {
    elements: [
      {
        type: 'icon',
        icon: <AlertTriangleMedium color="#F59E0B" />,
      },
      {
        type: 'text',
        content: 'Warning: Action Required',
        style: 'bodyM',
        weight: 'medium',
        color: 'warning',
      },
      {
        type: 'badge',
        text: 'High Priority',
        variant: 'error',
      },
      {
        type: 'button',
        text: 'Resolve',
        variant: 'small',
        color: 'yellow',
        onClick: () => alert('Resolve clicked!'),
      }
    ] as CustomCellElement[],
    alignment: 'left',
    gap: 8,
  },
};

// Layout variations
export const VerticalLayout: Story = {
  args: {
    elements: [
      {
        type: 'text',
        content: 'Main Title',
        style: 'bodyM',
        weight: 'semibold',
      },
      {
        type: 'text',
        content: 'Subtitle text here',
        style: 'bodyS',
        color: 'black500',
      },
      {
        type: 'badge',
        text: 'Active',
        variant: 'success',
      }
    ] as CustomCellElement[],
    direction: 'vertical',
    alignment: 'left',
    gap: 4,
  },
};

export const CenteredContent: Story = {
  args: {
    elements: [
      {
        type: 'icon',
        icon: <CheckMedium color="#10B981" />,
      },
      {
        type: 'text',
        content: 'Completed',
        style: 'bodyM',
        weight: 'medium',
        color: 'success',
      }
    ] as CustomCellElement[],
    alignment: 'center',
    gap: 6,
  },
};

export const RightAligned: Story = {
  args: {
    elements: [
      {
        type: 'text',
        content: '$1,234.56',
        style: 'dataM',
        weight: 'semibold',
        color: 'black900',
      },
      {
        type: 'button',
        text: 'View',
        variant: 'small',
        color: 'main',
        onClick: () => alert('View clicked!'),
      }
    ] as CustomCellElement[],
    alignment: 'right',
    gap: 12,
  },
};

// Interactive examples
export const ClickableCell: Story = {
  args: {
    elements: [
      {
        type: 'text',
        content: 'Click entire cell',
        style: 'bodyM',
        weight: 'medium',
      },
      {
        type: 'icon',
        icon: <EditMedium color="#6B7280" />,
      }
    ] as CustomCellElement[],
    alignment: 'left',
    gap: 8,
    onClick: () => alert('Entire cell clicked!'),
  },
};

// Table integration example
export const TableIntegrationExample: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '20px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px'
    }}>
      <h3 style={{ margin: 0, color: '#374151' }}>CustomCell in Table Context</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1px',
        backgroundColor: '#d1d5db',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ padding: '12px', backgroundColor: '#f3f4f6', fontWeight: 600 }}>Name</div>
        <div style={{ padding: '12px', backgroundColor: '#f3f4f6', fontWeight: 600 }}>Status</div>
        <div style={{ padding: '12px', backgroundColor: '#f3f4f6', fontWeight: 600 }}>Actions</div>

        {/* Row 1 */}
        <div style={{ padding: '12px', backgroundColor: 'white' }}>
          <CustomCell
            elements={[
              {
                type: 'icon',
                icon: <EditMedium color="#6B7280" />,
              },
              {
                type: 'text',
                content: 'Project Alpha',
                style: 'bodyM',
                weight: 'medium',
              }
            ]}
            alignment="left"
            gap={8}
          />
        </div>
        <div style={{ padding: '12px', backgroundColor: 'white' }}>
          <CustomCell
            elements={[
              {
                type: 'status',
                status: 'active',
                text: 'Active',
              }
            ]}
            alignment="left"
          />
        </div>
        <div style={{ padding: '12px', backgroundColor: 'white' }}>
          <CustomCell
            elements={[
              {
                type: 'button',
                text: 'Edit',
                variant: 'small',
                color: 'main',
                onClick: () => alert('Edit clicked!'),
              },
              {
                type: 'button',
                text: 'Delete',
                variant: 'small',
                color: 'white',
                onClick: () => alert('Delete clicked!'),
              }
            ]}
            alignment="right"
            gap={8}
          />
        </div>

        {/* Row 2 */}
        <div style={{ padding: '12px', backgroundColor: 'white' }}>
          <CustomCell
            elements={[
              {
                type: 'icon',
                icon: <AlertTriangleMedium color="#F59E0B" />,
              },
              {
                type: 'text',
                content: 'Project Beta',
                style: 'bodyM',
                weight: 'medium',
              }
            ]}
            alignment="left"
            gap={8}
          />
        </div>
        <div style={{ padding: '12px', backgroundColor: 'white' }}>
          <CustomCell
            elements={[
              {
                type: 'status',
                status: 'error',
                text: 'Error',
              }
            ]}
            alignment="left"
          />
        </div>
        <div style={{ padding: '12px', backgroundColor: 'white' }}>
          <CustomCell
            elements={[
              {
                type: 'button',
                text: 'Retry',
                variant: 'small',
                color: 'white',
                onClick: () => alert('Retry clicked!'),
              }
            ]}
            alignment="right"
          />
        </div>
      </div>
    </div>
  ),
};