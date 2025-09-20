import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from './Button';
import { icons } from '../icons';
import { ThemeProvider } from '../tokens/ThemeProvider';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Unified button component with 4 variants: Primary (full-featured), Small (compact), Icon (icon-only), and Tertiary (white with circular icon). Supports multiple colors, icons, disabled states, and uses design system tokens. Use the theme selector in the toolbar to see theme adaptation.',
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Button variant type',
      control: 'radio',
      options: ['primary', 'small', 'icon', 'tertiary'],
    },
    children: {
      description: 'Button text content (not used for icon variant)',
      control: 'text',
    },
    color: {
      description: 'Button color variant (options vary by variant)',
      control: 'radio',
      options: ['black', 'white', 'main', 'light', 'green'],
    },
    disabled: {
      description: 'Disabled state',
      control: 'boolean',
    },
    onClick: {
      description: 'Click handler',
      action: 'clicked',
    },
    icon: {
      description: 'Custom icon component',
    },
    iconPosition: {
      description: 'Icon position (for primary variant)',
      control: 'radio',
      options: ['left', 'right'],
      if: { arg: 'variant', eq: 'primary' },
    },
    showIcon: {
      description: 'Show/hide icon (for primary variant)',
      control: 'boolean',
      if: { arg: 'variant', eq: 'primary' },
    },
    shape: {
      description: 'Button shape (for icon variant)',
      control: 'radio',
      options: ['circle', 'square'],
      if: { arg: 'variant', eq: 'icon' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default primary button
export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Start investing',
    color: 'black',
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Primary Variant</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" color="black">Black</Button>
          <Button variant="primary" color="white">White</Button>
          <Button variant="primary" color="main">Main</Button>
          <Button variant="primary" color="light">Light</Button>
          <Button variant="primary" color="green">Green</Button>
          <Button variant="primary" color="black" disabled>Disabled</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Small Variant</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="small" color="black">Black</Button>
          <Button variant="small" color="white">White</Button>
          <Button variant="small" color="main">Main</Button>
          <Button variant="small" color="light">Light</Button>
          <Button variant="small" color="green">Green</Button>
          <Button variant="small" color="black" disabled>Disabled</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Icon Variant</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="icon" color="black" icon={<icons.small.s1ArrowRight />} />
          <Button variant="icon" color="main" icon={<icons.small.s1ArrowRight />} />
          <Button variant="icon" color="light" icon={<icons.small.open />} />
          <Button variant="icon" color="green" icon={<icons.small.check />} />
          <Button variant="icon" color="white" icon={<icons.small.edit />} />
          <Button variant="icon" color="main" shape="square" icon={<icons.small.plus />} />
          <Button variant="icon" color="black" disabled icon={<icons.small.s1ArrowRight />} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All three button variants with their available color options: Primary (black, white, main, light, green), Small (black, white, main, light, green), and Icon (black, main, light, green, white).',
      },
    },
  },
};

// Primary features
export const PrimaryFeatures: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="primary" color="black">Default icon</Button>
        <Button variant="primary" color="black" showIcon={false}>No icon</Button>
        <Button variant="primary" color="main" iconPosition="right">Right icon</Button>
        <Button variant="primary" color="main" icon={<icons.small.open />}>Custom icon</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Primary variant features: default icon, no icon, right icon position, and custom icon support.',
      },
    },
  },
};

// Icon shapes
export const IconShapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Button variant="icon" color="main" shape="circle" icon={<icons.small.plus />} />
        <span style={{ fontSize: '12px', color: '#666' }}>Circle (default)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Button variant="icon" color="main" shape="square" icon={<icons.small.plus />} />
        <span style={{ fontSize: '12px', color: '#666' }}>Square</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon variant supports both circle (default) and square shapes.',
      },
    },
  },
};

// Theme comparison
export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <h3 style={{ margin: 0 }}>Theme Adaptation</h3>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Reports</div>
          <ThemeProvider initialTheme="reports">
            <Button color="main" variant="primary">Reports Button</Button>
          </ThemeProvider>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Marketplace</div>
          <ThemeProvider initialTheme="marketplace">
            <Button color="main" variant="primary">Marketplace Button</Button>
          </ThemeProvider>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Analytics</div>
          <ThemeProvider initialTheme="analytics">
            <Button color="main" variant="primary">Analytics Button</Button>
          </ThemeProvider>
        </div>
      </div>

      <div style={{
        fontSize: '12px',
        color: '#666',
        textAlign: 'center',
        maxWidth: '400px',
        lineHeight: 1.4
      }}>
        The same Button component with color="main" automatically adapts to each theme context.
        Use ThemeProvider to wrap your components for automatic theme adaptation.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button component automatically adapts to different theme contexts (Reports=blue, Analytics=green, Marketplace=violet) when using color="main" and color="light" variants.',
      },
    },
  },
};

// Tertiary variant showcase
export const TertiaryVariant: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <Button variant="tertiary" color="white">
        Add Layer
      </Button>
      <Button variant="tertiary" color="white" icon={<icons.medium.add />}>
        Add Item
      </Button>
      <Button variant="tertiary" color="white" disabled>
        Disabled
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tertiary variant features a white background with border and a blue circular icon container. Perfect for secondary actions with visual emphasis.',
      },
    },
  },
};