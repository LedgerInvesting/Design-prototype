import type { Meta, StoryObj } from '@storybook/react';
import { InfoTooltip } from './InfoTooltip';

const meta: Meta<typeof InfoTooltip> = {
  title: 'Components/InfoTooltip',
  component: InfoTooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive "i" symbol with hover tooltips. Supports simple text or complex multi-section content with 5 positioning options. Features proper vertical alignment and spacing for integration with form labels.',
      },
    },
  },
  argTypes: {
    text: {
      description: 'Simple tooltip text content (only shown when tooltipType is "simple")',
      control: 'text',
      if: { arg: 'tooltipType', eq: 'simple' },
    },
    sections: {
      description: 'Complex tooltip sections (only shown when tooltipType is "complex")',
      control: 'object',
      if: { arg: 'tooltipType', eq: 'complex' },
      table: {
        type: { 
          summary: 'InfoTooltipSection[]',
          detail: '{ title: string; description: string; }[]'
        }
      }
    },
    position: {
      description: 'Tooltip position relative to the trigger',
      control: 'radio',
      options: ['top', 'bottom', 'left', 'right', 'bottom-right'],
    },
    tooltipType: {
      description: 'Choose tooltip type - Simple (150px, plain text) or Complex (250px, titled sections)',
      control: 'radio',
      options: ['simple', 'complex'],
    },
    // Hide props that aren't directly settable
    size: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with easy toggle
export const Default: Story = {
  args: {
    tooltipType: 'simple',
    text: 'This is helpful information that provides context to the user.',
    sections: [
      {
        title: 'Complex Tooltip:',
        description: 'This shows when you select "complex" type with titled sections and separators.'
      }
    ],
    position: 'bottom-right',
  },
  render: (args) => {
    // Determine which props to pass based on tooltipType
    const tooltipProps = args.tooltipType === 'simple' 
      ? { text: args.text, position: args.position }
      : { sections: args.sections, position: args.position };
    
    return <InfoTooltip {...tooltipProps} />;
  },
};

// Complex tooltip story
export const Complex: Story = {
  args: {
    text: undefined, // Clear this to show complex tooltip
    sections: [
      {
        title: 'Internal Rate of Return (IRR):',
        description: 'Annualized return on investment based on projected cash flows'
      },
      {
        title: 'Multiple on Invested Capital (MOIC):',
        description: 'The total return on an investment relative to the capital invested.'
      }
    ],
    position: 'bottom-right',
  },
};


// All positions showcase
export const AllPositions: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', 
      gap: '40px', 
      padding: '60px',
      alignItems: 'center',
      justifyItems: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>Top</div>
        <InfoTooltip text="Tooltip on top" position="top" />
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>Bottom</div>
        <InfoTooltip text="Tooltip on bottom" position="bottom" />
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>Left</div>
        <InfoTooltip text="Tooltip on left" position="left" />
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>Right</div>
        <InfoTooltip text="Tooltip on right" position="right" />
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>Bottom-Right</div>
        <InfoTooltip text="Tooltip bottom-right (default)" position="bottom-right" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All five positioning options: top, bottom, left, right, and bottom-right (default). Hover over each icon to see the tooltip appear in the specified position.',
      },
    },
  },
};

// Simple vs Complex comparison
export const SimpleVsComplex: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '32px', 
      alignItems: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>Simple (150px width)</div>
        <InfoTooltip text="This is a simple tooltip with basic text content." />
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>Complex (250px width)</div>
        <InfoTooltip 
          sections={[
            {
              title: 'Complex Tooltip:',
              description: 'This is a complex tooltip with titled sections and separators for detailed information.'
            }
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Two tooltip types: Simple (150px width, plain text, small padding) and Complex (250px width, titled sections with separators, larger padding). Icon is always 18x18px. Use "text" prop for simple or "sections" prop for complex tooltips.',
      },
    },
  },
};

// Content variations
export const ContentVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '14px' }}>Simple text tooltip:</span>
        <InfoTooltip text="This is helpful information that provides context to the user." />
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '14px' }}>Single section tooltip:</span>
        <InfoTooltip 
          sections={[
            {
              title: 'Portfolio Allocation:',
              description: 'This shows how your investments are distributed across different asset classes and risk categories.'
            }
          ]}
        />
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '14px' }}>Multi-section tooltip:</span>
        <InfoTooltip 
          sections={[
            {
              title: 'Internal Rate of Return (IRR):',
              description: 'Annualized return on investment based on projected cash flows'
            },
            {
              title: 'Multiple on Invested Capital (MOIC):',
              description: 'The total return on an investment relative to the capital invested.'
            }
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content variations: simple text, single section with title/description, and multi-section complex tooltips with separators.',
      },
    },
  },
};

// Form integration example
export const FormIntegration: Story = {
  render: () => (
    <div style={{ 
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      maxWidth: '400px'
    }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
        Investment Performance
        <InfoTooltip 
          sections={[
            {
              title: 'Performance Metrics:',
              description: 'Key indicators showing how your investments are performing over time.'
            }
          ]}
          position="bottom-right"
        />
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '14px', fontWeight: 500 }}>Total Return:</span>
          <InfoTooltip text="The overall gain or loss on your investment including dividends" />
          <span style={{ fontSize: '14px', marginLeft: 'auto' }}>+12.5%</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '14px', fontWeight: 500 }}>Annual Return:</span>
          <InfoTooltip text="The average yearly return on your investment over the holding period" />
          <span style={{ fontSize: '14px', marginLeft: 'auto' }}>+8.7%</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world integration example showing InfoTooltips used with form labels and data metrics, demonstrating proper alignment and spacing.',
      },
    },
  },
};