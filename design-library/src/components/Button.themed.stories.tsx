import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from './Button';
import { ThemeProvider } from '../tokens/ThemeProvider';

const meta: Meta<typeof Button> = {
  title: 'Components/Button (Themed)',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button component demonstrating theme adaptation across different product contexts.',
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Button variant type',
      control: 'radio',
      options: ['primary', 'small', 'icon'],
    },
    color: {
      description: 'Button color (main adapts to current theme)',
      control: 'radio', 
      options: ['black', 'white', 'main', 'light', 'green'],
    },
    children: {
      description: 'Button text content',
      control: 'text',
    },
    disabled: {
      description: 'Disabled state',
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MainColor: Story = {
  args: {
    children: 'Themed Button',
    variant: 'primary',
    color: 'main',
  },
};

export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <h3 style={{ margin: 0 }}>Theme Comparison</h3>
      
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
        The same Button component with color="main" automatically adapts to each theme.
        Use the theme selector in the Storybook toolbar to see live adaptation.
      </div>
    </div>
  ),
};