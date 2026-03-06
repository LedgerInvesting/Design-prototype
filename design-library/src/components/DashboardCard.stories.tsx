import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { DashboardCard } from './DashboardCard';
import { CardsText, CardsGraph, DownloadMedium, SettingsMedium, ReloadMedium, ListMedium } from '../icons';

const meta: Meta<typeof DashboardCard> = {
  title: 'Components/DashboardCard',
  component: DashboardCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title displayed in the header'
    },
    icon: {
      control: false,
      description: 'Optional icon to display next to the title'
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the icon (default: true)'
    },
    button: {
      control: false,
      description: 'Optional button configuration'
    },
    showButton: {
      control: 'boolean',
      description: 'Whether to show the button (default: true)'
    },
    width: {
      control: 'select',
      options: ['50%', '100%'],
      description: 'Card width - 50% or 100% (default: 50%)'
    },
    onClick: {
      control: false,
      description: 'Optional click handler for the entire card'
    }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content for stories
const SampleContent = () => (
  <div style={{ padding: '20px 30px' }}>
    <div style={{ marginBottom: '12px' }}>
      <div style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a1a' }}>$1,234,567</div>
      <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Value</div>
    </div>
    <div style={{ marginBottom: '12px' }}>
      <div style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>42</div>
      <div style={{ fontSize: '14px', color: '#6b7280' }}>Active Items</div>
    </div>
    <div>
      <div style={{ fontSize: '16px', fontWeight: 500, color: '#059669' }}>+12.5%</div>
      <div style={{ fontSize: '12px', color: '#6b7280' }}>vs last month</div>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    title: 'Dashboard Card',
    icon: <CardsText />,
    showIcon: true,
    button: {
      text: 'VIEW ALL',
      onClick: () => alert('Button clicked!')
    },
    showButton: true,
    width: '50%',
    children: <SampleContent />
  },
};

export const WithoutIcon: Story = {
  args: {
    title: 'Card Without Icon',
    showIcon: false,
    button: {
      text: 'ACTION',
      onClick: () => alert('Action clicked!')
    },
    showButton: true,
    width: '50%',
    children: <SampleContent />
  },
};

export const WithoutButton: Story = {
  args: {
    title: 'Card Without Button',
    icon: <CardsGraph />,
    showIcon: true,
    showButton: false,
    width: '50%',
    children: <SampleContent />
  },
};

export const FullWidth: Story = {
  args: {
    title: 'Full Width Card',
    icon: <CardsText />,
    showIcon: true,
    button: {
      text: 'MANAGE',
      onClick: () => alert('Manage clicked!')
    },
    showButton: true,
    width: '100%',
    children: (
      <div style={{ padding: '20px 30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>$856,234</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Revenue</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>$234,567</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Profit</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>$145,890</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Expenses</div>
          </div>
        </div>
      </div>
    )
  },
};

export const Clickable: Story = {
  args: {
    title: 'Clickable Card',
    icon: <CardsGraph />,
    showIcon: true,
    button: {
      text: 'DETAILS',
      onClick: () => alert('Button clicked!')
    },
    showButton: true,
    width: '50%',
    onClick: () => alert('Card clicked!'),
    children: <SampleContent />
  },
};

export const CustomStyling: Story = {
  args: {
    title: 'Custom Styled Card',
    icon: <CardsText />,
    showIcon: true,
    showButton: false,
    width: '50%',
    style: {
      border: '2px solid #3b82f6',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    bodyStyle: {
      padding: '30px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    },
    children: (
      <div>
        <div style={{ fontSize: '28px', fontWeight: 700, color: '#3b82f6' }}>Custom Content</div>
        <div style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
          This card demonstrates custom styling capabilities
        </div>
      </div>
    )
  },
};

// Side by side layout to demonstrate height matching
export const SideBySideLayout: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
      <DashboardCard
        title="Shorter Card"
        icon={<CardsText />}
        button={{ text: 'VIEW', onClick: () => {} }}
        width="50%"
      >
        <div style={{ padding: '20px 30px' }}>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>$123,456</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Simple metric</div>
        </div>
      </DashboardCard>

      <DashboardCard
        title="Taller Card"
        icon={<CardsGraph />}
        showButton={false}
        width="50%"
      >
        <div style={{ padding: '20px 30px' }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '32px', fontWeight: 700 }}>$987,654</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Primary metric</div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '24px', fontWeight: 600 }}>156</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Secondary metric</div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '18px', fontWeight: 500, color: '#059669' }}>+8.2%</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Growth rate</div>
          </div>
          <div>
            <div style={{ fontSize: '16px', color: '#6b7280' }}>Additional details and more content to make this card taller</div>
          </div>
        </div>
      </DashboardCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how cards with different content heights automatically match each other when displayed side by side.'
      }
    }
  }
};

// Custom Button Icons - showing the new actions prop with icon buttons
export const CustomButtonIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Single Icon Button */}
      <DashboardCard
        title="Single Icon Button"
        icon={<CardsGraph />}
        actions={[
          {
            type: 'icon',
            icon: <DownloadMedium />,
            onClick: () => alert('Download clicked!'),
            color: 'primary200'
          }
        ]}
        width="100%"
      >
        <div style={{ padding: '20px 30px' }}>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>$1,234,567</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Card with single icon button</div>
        </div>
      </DashboardCard>

      {/* Two Icon Buttons */}
      <DashboardCard
        title="Two Icon Buttons"
        icon={<CardsText />}
        actions={[
          {
            type: 'icon',
            icon: <ReloadMedium />,
            onClick: () => alert('Reload clicked!'),
            color: 'primary200'
          },
          {
            type: 'icon',
            icon: <SettingsMedium />,
            onClick: () => alert('Settings clicked!'),
            color: 'primary200'
          }
        ]}
        width="100%"
      >
        <div style={{ padding: '20px 30px' }}>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>42</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Card with two icon buttons</div>
        </div>
      </DashboardCard>

      {/* Three Icon Buttons */}
      <DashboardCard
        title="Three Icon Buttons"
        icon={<CardsGraph />}
        actions={[
          {
            type: 'icon',
            icon: <DownloadMedium />,
            onClick: () => alert('Download clicked!'),
            color: 'primary200'
          },
          {
            type: 'icon',
            icon: <SettingsMedium />,
            onClick: () => alert('Settings clicked!'),
            color: 'primary200'
          },
          {
            type: 'icon',
            icon: <ListMedium />,
            onClick: () => alert('More options clicked!'),
            color: 'primary200'
          }
        ]}
        width="100%"
      >
        <div style={{ padding: '20px 30px' }}>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>+12.5%</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Card with three icon buttons</div>
        </div>
      </DashboardCard>

      {/* Mixed: Text + Icon Button */}
      <DashboardCard
        title="Mixed Buttons"
        icon={<CardsText />}
        actions={[
          {
            type: 'text',
            label: 'Export',
            onClick: () => alert('Export clicked!'),
            variant: 'secondary'
          },
          {
            type: 'icon',
            icon: <ReloadMedium />,
            onClick: () => alert('Reload clicked!'),
            color: 'primary200'
          }
        ]}
        width="100%"
      >
        <div style={{ padding: '20px 30px' }}>
          <div style={{ fontSize: '32px', fontWeight: 700 }}>$856,234</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Card with mixed button types</div>
        </div>
      </DashboardCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the new actions prop that allows 1-3 buttons (icon or text) in the card header.'
      }
    }
  }
};

// Chart Version - showing dropdown variant for switching charts
export const ChartVersion: Story = {
  render: () => {
    const ChartCard = () => {
      const [selectedChart, setSelectedChart] = useState('revenue');

      const chartOptions = [
        { value: 'revenue', label: 'Revenue Chart' },
        { value: 'profit', label: 'Profit Chart' },
        { value: 'expenses', label: 'Expenses Chart' },
        { value: 'growth', label: 'Growth Chart' }
      ];

      const renderChart = () => {
        switch (selectedChart) {
          case 'revenue':
            return (
              <div style={{ padding: '20px 30px' }}>
                <div style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '48px', fontWeight: 700, color: '#3b82f6' }}>$1,234,567</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Revenue</div>
                  <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: 600 }}>$856,234</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Q1 2024</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: 600 }}>$378,333</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Q2 2024</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          case 'profit':
            return (
              <div style={{ padding: '20px 30px' }}>
                <div style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '48px', fontWeight: 700, color: '#10b981' }}>$456,789</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Net Profit</div>
                  <div style={{ fontSize: '16px', fontWeight: 500, color: '#10b981', marginTop: '20px' }}>
                    +18.2% margin increase
                  </div>
                </div>
              </div>
            );
          case 'expenses':
            return (
              <div style={{ padding: '20px 30px' }}>
                <div style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '48px', fontWeight: 700, color: '#ef4444' }}>$777,778</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Expenses</div>
                  <div style={{ fontSize: '16px', fontWeight: 500, color: '#6b7280', marginTop: '20px' }}>
                    Operating costs breakdown available
                  </div>
                </div>
              </div>
            );
          case 'growth':
            return (
              <div style={{ padding: '20px 30px' }}>
                <div style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '48px', fontWeight: 700, color: '#8b5cf6' }}>+23.5%</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Year over Year Growth</div>
                  <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: 600, color: '#10b981' }}>+15%</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Customer Growth</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: 600, color: '#3b82f6' }}>+32%</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Revenue Growth</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          default:
            return null;
        }
      };

      return (
        <DashboardCard
          titleDropdown={{
            options: chartOptions,
            value: selectedChart,
            onChange: (value) => setSelectedChart(value),
            placeholder: 'Select a chart'
          }}
          icon={<CardsGraph />}
          actions={[
            {
              type: 'icon',
              icon: <DownloadMedium />,
              onClick: () => alert(`Downloading ${selectedChart} chart...`),
              color: 'primary200'
            },
            {
              type: 'icon',
              icon: <ReloadMedium />,
              onClick: () => alert(`Reloading ${selectedChart} data...`),
              color: 'primary200'
            }
          ]}
          width="100%"
        >
          {renderChart()}
        </DashboardCard>
      );
    };

    return <ChartCard />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the dropdown title variant that allows users to switch between different views/charts dynamically.'
      }
    }
  }
};