import type { Meta, StoryObj } from '@storybook/react';
import { DashboardCard } from './DashboardCard';
import { CardsText, CardsGraph } from '../icons';

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