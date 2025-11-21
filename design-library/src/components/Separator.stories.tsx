import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from './Separator';
import { Card, CardHeader, CardContent } from './Card/Card';
import { spacing, useSemanticColors } from '../tokens';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible separator component for dividing content sections. Supports full-width and content-aware variants to match card padding specifications.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['fullWidth', 'content'],
      description: 'Separator width behavior - fullWidth spans entire container, content respects horizontal padding',
    },
    margin: {
      control: 'select',
      options: Object.keys(spacing),
      description: 'Horizontal margin for content variant (using design system spacing tokens)',
    },
    color: {
      control: 'color',
      description: 'Separator color (defaults to theme.primary400)',
    },
    thickness: {
      control: 'text',
      description: 'Separator thickness (defaults to 1px)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  args: {
    variant: 'fullWidth',
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'fullWidth',
  },
  render: (args) => (
    <div style={{ width: '400px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
      <div style={{ padding: '16px' }}>
        <h3>Card Title</h3>
      </div>
      <Separator {...args} />
      <div style={{ padding: '16px' }}>
        <p>Main content area</p>
      </div>
    </div>
  ),
};

export const ContentPadded: Story = {
  args: {
    variant: 'content',
    margin: '4',
  },
  render: (args) => (
    <div style={{ width: '400px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
      <div style={{ padding: '16px' }}>
        <div style={{ marginBottom: '12px' }}>
          <strong>Quota Share:</strong> $150,000
        </div>
        <Separator {...args} />
        <div style={{ margin: '12px 0' }}>
          <strong>Total Remittance:</strong> $75,000
        </div>
        <Separator {...args} />
        <div style={{ marginTop: '12px' }}>
          <strong>Collateral Required:</strong> $25,000
        </div>
      </div>
    </div>
  ),
};

export const CardIntegration: Story = {
  render: () => (
    <Card variant="outlined" padding="none" style={{ width: '400px' }}>
      <CardHeader style={{ 
        padding: '16px', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ margin: 0, fontSize: '19px', fontWeight: 500 }}>Financial Summary</h3>
        <button style={{
          padding: '8px 12px',
          backgroundColor: '#f4f9ff',
          border: '1px solid #D9E7EC',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 500,
          cursor: 'pointer'
        }}>
          EXPLORE
        </button>
      </CardHeader>
      
      {/* Full-width separator between title and content */}
      <Separator variant="fullWidth" />
      
      <CardContent style={{ padding: '16px' }}>
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '12px', color: '#8b908d', marginBottom: '4px' }}>Quota Share</div>
          <div style={{ fontSize: '26px', fontWeight: 400 }}>$150,000</div>
        </div>
        
        {/* Content-padded separator */}
        <Separator variant="content" margin="4" />
        
        <div style={{ margin: '12px 0' }}>
          <div style={{ fontSize: '12px', color: '#8b908d', marginBottom: '4px' }}>Total Remittance</div>
          <div style={{ fontSize: '26px', fontWeight: 400 }}>$75,000</div>
        </div>
        
        {/* Content-padded separator */}
        <Separator variant="content" margin="4" />
        
        <div style={{ marginTop: '12px' }}>
          <div style={{ fontSize: '12px', color: '#8b908d', marginBottom: '4px' }}>Collateral Required</div>
          <div style={{ fontSize: '26px', fontWeight: 400 }}>$25,000</div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const ColorVariants: Story = {
  render: () => {
    const colors = useSemanticColors();
    return (
      <div style={{ width: '400px', padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h4>Default (Theme Primary400)</h4>
          <Separator variant="fullWidth" />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <h4>Black900 (High Contrast)</h4>
          <Separator variant="fullWidth" color={colors.blackAndWhite.black900} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <h4>Custom Color</h4>
          <Separator variant="fullWidth" color="#db2d31" />
        </div>

        <div>
          <h4>Thick Separator</h4>
          <Separator variant="fullWidth" thickness="2px" />
        </div>
      </div>
    );
  },
};