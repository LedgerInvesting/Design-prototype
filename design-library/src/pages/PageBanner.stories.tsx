import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PageBanner } from './PageBanner';
import { ThemeProvider } from '../tokens/ThemeProvider';
import { AddSmall } from '../icons';

const meta: Meta<typeof PageBanner> = {
  title: 'Pages/PageBanner',
  component: PageBanner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Standardized banner layout used across Reports, Analytics, Marketplace, and Contracts pages. Features theme-aware styling with primary700 background, consistent 250px height, left illustration + text content with black900 text, and right action button in white container. SVG patterns use the 500 color variants.',
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
    buttonIcon: <AddSmall color="#9ad5f7" />,
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
    title: 'Analytics Valuation',
    subtitle: 'Comprehensive analytics and valuation insights for your portfolio',
    illustrationSrc: '/transaction header icon.png',
    patternSrc: '/pattern_analytics.svg',
    buttonText: 'Settings',
    buttonIcon: <AddSmall color="#74efa3" />,
    illustrationAlt: 'analytics valuation',
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
    buttonIcon: <AddSmall color="#ceb5fb" />,
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

// Contracts banner
export const Contracts: Story = {
  args: {
    title: 'AI Extraction',
    subtitle: 'Extract and analyze contract terms using advanced AI technology',
    illustrationSrc: '/transaction header icon.png',
    patternSrc: '/pattern_contracts.svg',
    buttonText: 'Upload Document',
    buttonIcon: <AddSmall color="#fcdc6a" />,
    illustrationAlt: 'contracts AI extraction',
  },
  render: (args) => (
    <ThemeProvider initialTheme="contracts">
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
              buttonIcon={<AddSmall color="#9ad5f7" />}
              onButtonClick={() => {}}
            />
          </ThemeProvider>
        </div>

        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Analytics Theme (Green)</h3>
          <ThemeProvider initialTheme="analytics">
            <PageBanner
              title="Analytics Valuation"
              subtitle="Comprehensive analytics and valuation insights for your portfolio"
              illustrationSrc="/transaction header icon.png"
              patternSrc="/pattern_analytics.svg"
              buttonText="Settings"
              buttonIcon={<AddSmall color="#74efa3" />}
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
              buttonIcon={<AddSmall color="#ceb5fb" />}
              maxTextWidth="450px"
              onButtonClick={() => {}}
            />
          </ThemeProvider>
        </div>

        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Contracts Theme (Yellow)</h3>
          <ThemeProvider initialTheme="contracts">
            <PageBanner
              title="AI Extraction"
              subtitle="Extract and analyze contract terms using advanced AI technology"
              illustrationSrc="/transaction header icon.png"
              patternSrc="/pattern_contracts.svg"
              buttonText="Upload Document"
              buttonIcon={<AddSmall color="#fcdc6a" />}
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
        Each theme provides its own primary color palette while maintaining consistent layout, spacing, and black900 text.
        SVG patterns should use the corresponding 500 color variants (Reports: blue500, Analytics: green500, Marketplace: violet500, Contracts: yellow500).
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'PageBanner component automatically adapts to different theme contexts (Reports=blue, Analytics=green, Marketplace=violet, Contracts=yellow) while maintaining consistent layout structure.',
      },
    },
  },
};

