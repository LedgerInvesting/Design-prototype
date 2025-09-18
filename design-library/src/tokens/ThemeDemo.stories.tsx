import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThemeProvider, useSemanticColors, useTheme, ProductTheme } from './ThemeProvider';
import { Button } from '../components/Button';

// Demo component that shows themed elements
const ThemedComponentDemo: React.FC = () => {
  const colors = useSemanticColors();
  const { currentTheme, setTheme } = useTheme();
  
  return (
    <div style={{ padding: '24px' }}>
      {/* Theme Switcher */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>Current Theme: {currentTheme}</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          {(['reports', 'marketplace', 'analytics'] as ProductTheme[]).map((theme) => (
            <button
              key={theme}
              onClick={() => setTheme(theme)}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: currentTheme === theme ? '2px solid #333' : '1px solid #ccc',
                backgroundColor: currentTheme === theme ? '#f0f0f0' : 'white',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Themed Color Swatches */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>Theme Colors</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {[
            { key: 'primary700', label: '700 (Main)', color: colors.theme.primary700 },
            { key: 'primary400', label: '400 (Strokes)', color: colors.theme.primary400 },
            { key: 'primary300', label: '300 (Hover)', color: colors.theme.primary300 },
            { key: 'primary200', label: '200 (Background)', color: colors.theme.primary200 },
          ].map(({ key, label, color }) => (
            <div key={key} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: color,
                  borderRadius: '8px',
                  marginBottom: '8px',
                  border: '1px solid #e0e0e0',
                }}
              />
              <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{label}</div>
              <div style={{ fontSize: '10px', color: '#666', fontFamily: 'monospace' }}>{color}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Themed UI Elements */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>Themed UI Elements</h3>
        
        {/* Card with themed styling */}
        <div
          style={{
            border: `1px solid ${colors.theme.stroke}`,
            borderRadius: '8px',
            padding: '24px',
            backgroundColor: colors.theme.background,
            marginBottom: '16px',
          }}
        >
          <h4 style={{ color: colors.theme.main, marginBottom: '8px' }}>
            Themed Card ({currentTheme})
          </h4>
          <p style={{ color: colors.blackAndWhite.black700, marginBottom: '16px' }}>
            This card automatically adapts its colors based on the current theme.
            The border uses theme.stroke, background uses theme.background, 
            and the title uses theme.main.
          </p>
          
          {/* Themed button */}
          <Button 
            variant="primary" 
            color="main" 
            style={{ backgroundColor: colors.theme.main }}
          >
            Themed Button
          </Button>
        </div>

        {/* Input field with themed styling */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: colors.blackAndWhite.black700 }}>
            Themed Input Field
          </label>
          <input
            type="text"
            placeholder="This input uses theme colors"
            style={{
              width: '300px',
              padding: '12px',
              border: `1px solid ${colors.theme.stroke}`,
              borderRadius: '4px',
              backgroundColor: 'white',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.target.style.border = `2px solid ${colors.theme.main}`;
            }}
            onBlur={(e) => {
              e.target.style.border = `1px solid ${colors.theme.stroke}`;
            }}
          />
        </div>
      </div>

      {/* Theme Usage Guide */}
      <div
        style={{
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '20px',
        }}
      >
        <h4 style={{ marginBottom: '12px' }}>How to Use Themed Colors</h4>
        <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#374151' }}>
          <p style={{ marginBottom: '8px' }}>
            <strong>In Components:</strong> Use <code>const {`{ colors }`} = useSemanticColors()</code>
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>Common patterns:</strong>
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '8px' }}>
            <li><code>colors.theme['primary400 (strokes)']</code> or <code>colors.theme.stroke</code> - for borders and separators</li>
            <li><code>colors.theme['primary200 (background)']</code> or <code>colors.theme.background</code> - for light backgrounds</li>
            <li><code>colors.theme['primary300 (hover)']</code> or <code>colors.theme.hover</code> - for hover states</li>
            <li><code>colors.theme['primary700 (main)']</code> or <code>colors.theme.main</code> - for primary brand elements</li>
          </ul>
          <p>
            <strong>Result:</strong> Components automatically adapt to the current product theme!
          </p>
        </div>
      </div>
    </div>
  );
};

// Wrapper component with theme provider
const ThemeDemoWithProvider: React.FC<{ initialTheme?: ProductTheme }> = ({ 
  initialTheme = 'reports' 
}) => (
  <ThemeProvider initialTheme={initialTheme}>
    <ThemedComponentDemo />
  </ThemeProvider>
);

const meta: Meta<typeof ThemeDemoWithProvider> = {
  title: 'Design System/Theme System',
  component: ThemeDemoWithProvider,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interactive demonstration of the product theming system. Switch between Reports (blue), Marketplace (violet), and Analytics (green) themes to see how components automatically adapt their colors.',
      },
    },
  },
  argTypes: {
    initialTheme: {
      description: 'Initial theme to display',
      control: 'select',
      options: ['reports', 'marketplace', 'analytics'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemeDemo: Story = {
  args: {
    initialTheme: 'reports',
  },
};

export const ReportsTheme: Story = {
  args: {
    initialTheme: 'reports',
  },
};

export const MarketplaceTheme: Story = {
  args: {
    initialTheme: 'marketplace',
  },
};

export const AnalyticsTheme: Story = {
  args: {
    initialTheme: 'analytics',
  },
};