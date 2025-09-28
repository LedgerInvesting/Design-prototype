import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PageBanner } from './PageBanner';
import { ThemeProvider } from '../tokens/ThemeProvider';

const meta: Meta<typeof PageBanner> = {
  title: 'Pages/PageBanner',
  component: PageBanner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Standardized banner layout used across Reports, Analytics, and Marketplace pages. Features theme-aware styling, consistent 250px height, left illustration + text content, and right action button in white container.',
      },
    },
  },
  argTypes: {
    title: {
      description: 'Main title text displayed prominently',
      control: 'text',
    },
    subtitle: {
      description: 'Subtitle text below the title',
      control: 'text',
    },
    illustrationSrc: {
      description: 'Source path for the left illustration image (150x150px)',
      control: 'text',
    },
    patternSrc: {
      description: 'Source path for the background pattern image (top right, 33% size)',
      control: 'text',
    },
    buttonText: {
      description: 'Text for the action button',
      control: 'text',
    },
    onButtonClick: {
      description: 'Click handler for the action button',
      action: 'clicked',
    },
    buttonIcon: {
      description: 'Optional icon for the button',
    },
    maxTextWidth: {
      description: 'Maximum width for text content (e.g., "450px")',
      control: 'text',
    },
    illustrationAlt: {
      description: 'Alternative text for the illustration',
      control: 'text',
    },
    buttonVariant: {
      description: 'Button variant style',
      control: 'radio',
      options: ['primary', 'small', 'icon', 'tertiary', 'secondary'],
    },
    buttonColor: {
      description: 'Button color variant',
      control: 'radio',
      options: ['black', 'white', 'main', 'light', 'green', 'primary200'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Reports banner
export const Reports: Story = {
  args: {
    title: 'Transaction Management',
    subtitle: 'Manage your reinsurance transactions and workflow progress',
    illustrationSrc: '/transaction header icon.png',
    patternSrc: '/pattern_reports.svg',
    buttonText: 'New Transaction',
    buttonIcon: <span style={{ color: '#2563eb' }}>+</span>,
    illustrationAlt: 'transaction management',
  },
  render: (args) => (
    <ThemeProvider initialTheme="reports">
      <div style={{ padding: '20px', backgroundColor: '#f8fafc' }}>
        <PageBanner {...args} />
      </div>
    </ThemeProvider>
  ),
};

// Analytics banner
export const Analytics: Story = {
  args: {
    title: 'Analytics Dashboard',
    subtitle: 'Comprehensive analytics and valuation insights for your portfolio',
    illustrationSrc: '/transaction header icon.png',
    patternSrc: '/pattern_analytics.svg',
    buttonText: 'Create Report',
    buttonIcon: <span style={{ color: '#059669' }}>📊</span>,
    illustrationAlt: 'analytics dashboard',
  },
  render: (args) => (
    <ThemeProvider initialTheme="analytics">
      <div style={{ padding: '20px', backgroundColor: '#f8fafc' }}>
        <PageBanner {...args} />
      </div>
    </ThemeProvider>
  ),
};

// Marketplace banner
export const Marketplace: Story = {
  args: {
    title: 'Marketplace',
    subtitle: 'Explore opportunities to invest in casualty insurance risk and find offerings that align with your investment goals.',
    illustrationSrc: '/marketplace_illustration.png',
    patternSrc: '/pattern_marketplace.svg',
    buttonText: 'Browse Offerings',
    maxTextWidth: '450px',
    illustrationAlt: 'marketplace',
  },
  render: (args) => (
    <ThemeProvider initialTheme="marketplace">
      <div style={{ padding: '20px', backgroundColor: '#f8fafc' }}>
        <PageBanner {...args} />
      </div>
    </ThemeProvider>
  ),
};

// All themes comparison
export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px', backgroundColor: '#f8fafc' }}>
      <h2 style={{ margin: 0, textAlign: 'center' }}>Theme Adaptation</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Reports Theme (Blue)</h3>
          <ThemeProvider initialTheme="reports">
            <PageBanner
              title="Transaction Management"
              subtitle="Manage your reinsurance transactions and workflow progress"
              illustrationSrc="/transaction header icon.png"
              patternSrc="/pattern_reports.svg"
              buttonText="New Transaction"
              onButtonClick={() => {}}
            />
          </ThemeProvider>
        </div>

        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Analytics Theme (Green)</h3>
          <ThemeProvider initialTheme="analytics">
            <PageBanner
              title="Analytics Dashboard"
              subtitle="Comprehensive analytics and valuation insights for your portfolio"
              illustrationSrc="/transaction header icon.png"
              patternSrc="/pattern_analytics.svg"
              buttonText="Create Report"
              onButtonClick={() => {}}
            />
          </ThemeProvider>
        </div>

        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Marketplace Theme (Violet)</h3>
          <ThemeProvider initialTheme="marketplace">
            <PageBanner
              title="Marketplace"
              subtitle="Explore opportunities to invest in casualty insurance risk"
              illustrationSrc="/marketplace_illustration.png"
              patternSrc="/pattern_marketplace.svg"
              buttonText="Browse Offerings"
              maxTextWidth="450px"
              onButtonClick={() => {}}
            />
          </ThemeProvider>
        </div>
      </div>

      <div style={{
        fontSize: '12px',
        color: '#666',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: 1.4
      }}>
        The PageBanner component automatically adapts to different theme contexts using theme.primary700 background colors.
        Each theme provides its own primary color palette while maintaining consistent layout and spacing.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'PageBanner component automatically adapts to different theme contexts (Reports=blue, Analytics=green, Marketplace=violet) while maintaining consistent layout structure.',
      },
    },
  },
};

// Custom configurations
export const CustomConfiguration: Story = {
  args: {
    title: 'Custom Banner',
    subtitle: 'Example of customizable banner with different button styles',
    illustrationSrc: '/transaction header icon.png',
    patternSrc: '/pattern_reports.svg',
    buttonText: 'EXPLORE',
    buttonVariant: 'secondary',
    maxTextWidth: '400px',
    illustrationAlt: 'custom banner',
  },
  render: (args) => (
    <ThemeProvider initialTheme="reports">
      <div style={{ padding: '20px', backgroundColor: '#f8fafc' }}>
        <PageBanner {...args} />
      </div>
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example showing customizable aspects: button variants, text width constraints, and different content configurations.',
      },
    },
  },
};