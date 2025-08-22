import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Pages/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Navigation sidebar with expandable menu items, icons, and inbox notification. Built using design library components and tokens.',
      },
    },
  },
  argTypes: {
    onNavigate: {
      description: 'Callback function called when navigation items are clicked',
      action: 'navigate',
    },
    onInboxClick: {
      description: 'Callback function called when inbox button is clicked',
      action: 'inbox-clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    onNavigate: (itemId: string, subitemId?: string) => {
      console.log('Navigate to:', itemId, subitemId ? `-> ${subitemId}` : '');
    },
    onInboxClick: () => {
      console.log('Inbox clicked');
    },
  },
};

export const Interactive: Story = {
  args: {
    onNavigate: (itemId: string, subitemId?: string) => {
      if (subitemId) {
        alert(`Navigate to: ${itemId} -> ${subitemId}`);
      } else {
        alert(`Navigate to: ${itemId}`);
      }
    },
    onInboxClick: () => {
      alert('Opening inbox...');
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive version with alert callbacks to demonstrate navigation functionality.',
      },
    },
  },
};

export const WithBackgroundDemo: Story = {
  args: {
    onNavigate: (itemId: string, subitemId?: string) => {
      console.log('Navigate to:', itemId, subitemId ? `-> ${subitemId}` : '');
    },
    onInboxClick: () => {
      console.log('Inbox clicked');
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        display: 'flex', 
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <Story />
        <div style={{ 
          flex: 1, 
          padding: '24px',
          backgroundColor: 'white',
          margin: '24px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Main Content Area</h2>
            <p>This is where your page content would go.</p>
            <p>Click on sidebar items to see navigation in action.</p>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the sidebar looks as part of a complete layout with main content area.',
      },
    },
  },
};