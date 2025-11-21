import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfoTooltip } from './InfoTooltip';

const meta: Meta<typeof InfoTooltip> = {
  title: 'Components/InfoTooltip',
  component: InfoTooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive "i" symbol with hover tooltips. Supports simple text, complex multi-section content, or custom React content. Features 6 positioning modes including mouse-following with smooth delay animation.',
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
    children: {
      description: 'Custom React content for the tooltip (only shown when tooltipType is "custom")',
      control: 'text',
      if: { arg: 'tooltipType', eq: 'custom' },
    },
    position: {
      description: 'Tooltip position - relative to trigger or follow mouse cursor with smooth delay',
      control: 'radio',
      options: ['top', 'bottom', 'left', 'right', 'bottom-right', 'follow-mouse'],
    },
    easingFactor: {
      description: 'Animation smoothness for follow-mouse mode (0.01=very smooth, 0.5=fast)',
      control: { type: 'range', min: 0.01, max: 0.5, step: 0.01 },
      if: { arg: 'position', eq: 'follow-mouse' },
    },
    tooltipType: {
      description: 'Choose tooltip type - Simple, Complex, or Custom content',
      control: 'radio',
      options: ['simple', 'complex', 'custom'],
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
    children: 'Custom content with flexible styling and layout',
    position: 'bottom-right',
    easingFactor: 0.15,
  },
  render: (args) => {
    // Determine which props to pass based on tooltipType
    let tooltipProps: any = { position: args.position };

    if (args.position === 'follow-mouse') {
      tooltipProps.easingFactor = args.easingFactor;
    }

    if (args.tooltipType === 'simple') {
      tooltipProps.text = args.text;
    } else if (args.tooltipType === 'complex') {
      tooltipProps.sections = args.sections;
    } else if (args.tooltipType === 'custom') {
      tooltipProps.children = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontWeight: 'bold', color: '#7FFFB0' }}>Custom Content</div>
          <div>{args.children}</div>
          <div style={{ fontSize: '10px', opacity: 0.8 }}>✨ You can put any React content here!</div>
        </div>
      );
    }

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

      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>Follow Mouse</div>
        <InfoTooltip text="Smoothly follows your mouse cursor with delay" position="follow-mouse" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All six positioning modes: top, bottom, left, right, bottom-right (default), and follow-mouse. The follow-mouse mode uses smooth animation with configurable delay.',
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

// Custom content showcase
export const CustomContent: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>Custom JSX Content</div>
        <InfoTooltip position="bottom-right">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontWeight: 'bold', color: '#7FFFB0' }}>Triangle Types:</div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #BD8B11' }} />
              <div style={{ fontSize: '10px' }}>On risk triangle</div>
            </div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #744DEB' }} />
              <div style={{ fontSize: '10px' }}>Loss Development triangle</div>
            </div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #3DA3CB' }} />
              <div style={{ fontSize: '10px' }}>Policy-Year triangle</div>
            </div>
          </div>
        </InfoTooltip>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>Rich Content</div>
        <InfoTooltip position="bottom-right">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>📊 Performance Metrics</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
              <span style={{ fontSize: '10px' }}>ROI:</span>
              <span style={{ fontSize: '10px', color: '#7FFFB0' }}>+12.5%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
              <span style={{ fontSize: '10px' }}>Risk Score:</span>
              <span style={{ fontSize: '10px', color: '#FFDD61' }}>Medium</span>
            </div>
            <div style={{ borderTop: '1px solid #5d6460', paddingTop: '6px', fontSize: '9px', opacity: 0.8 }}>
              Updated 2 mins ago
            </div>
          </div>
        </InfoTooltip>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom React content examples showing complex layouts, colored elements, and rich information displays. The children prop accepts any React content with flexible sizing (200px-400px width).',
      },
    },
  },
};

// Mouse following showcase
export const MouseFollowing: Story = {
  render: () => (
    <div style={{
      padding: '60px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <div style={{ marginBottom: '24px', fontSize: '14px', color: '#666' }}>
        Move your mouse around these icons to see the smooth following effect
      </div>
      <div style={{ display: 'flex', gap: '80px', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>Fast (0.3)</div>
          <InfoTooltip
            text="Fast following with minimal delay"
            position="follow-mouse"
            easingFactor={0.3}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>Balanced (0.15)</div>
          <InfoTooltip
            text="Balanced following speed - default setting"
            position="follow-mouse"
            easingFactor={0.15}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>Smooth (0.05)</div>
          <InfoTooltip
            text="Very smooth with noticeable delay"
            position="follow-mouse"
            easingFactor={0.05}
          />
        </div>
      </div>
      <div style={{ marginTop: '24px', fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
        easingFactor controls the animation speed: lower = smoother/slower, higher = faster
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mouse-following tooltips with different easing factors. The easingFactor prop controls animation smoothness: 0.01-0.1 (very smooth), 0.15 (balanced), 0.3-0.5 (fast response).',
      },
    },
  },
};