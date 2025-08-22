import type { Meta, StoryObj } from '@storybook/react';
import { Selector } from './Selector';
import { useState } from 'react';

const meta: Meta<typeof Selector> = {
  title: 'Components/Selector',
  component: Selector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A unified selector component with two variants: Checkbox (square, independent choices) and Radio (circular, exclusive choices). Features clean state transitions and design system integration.',
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Selector variant type',
      control: 'radio',
      options: ['checkbox', 'radio'],
    },
    label: {
      description: 'Label text displayed next to the selector',
      control: 'text',
    },
    checked: {
      description: 'Controlled checked state (use with onChange)',
      control: 'boolean',
    },
    defaultChecked: {
      description: 'Initial checked state for uncontrolled usage',
      control: 'boolean',
    },
    disabled: {
      description: 'Whether the selector is disabled',
      control: 'boolean',
    },
    onChange: {
      description: 'Callback when selector state changes',
      action: 'changed',
    },
    name: {
      description: 'Name attribute for form handling',
      control: 'text',
    },
    value: {
      description: 'Value for the selector (used in radio groups)',
      control: 'text',
    },
    id: {
      description: 'ID for the selector input',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default selector (checkbox variant)
export const Default: Story = {
  args: {
    variant: 'checkbox',
    label: 'Enable notifications',
    disabled: false,
  },
};

// Checkbox Examples
export const Checkbox: Story = {
  args: {
    variant: 'checkbox',
    label: 'Enable notifications',
  },
};

export const CheckboxChecked: Story = {
  args: {
    variant: 'checkbox',
    label: 'Enable notifications',
    defaultChecked: true,
  },
};

export const CheckboxDisabled: Story = {
  args: {
    variant: 'checkbox',
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const CheckboxDisabledChecked: Story = {
  args: {
    variant: 'checkbox',
    label: 'Disabled checked',
    disabled: true,
    defaultChecked: true,
  },
};

// Radio Examples
export const Radio: Story = {
  args: {
    variant: 'radio',
    label: 'Email delivery',
    name: 'delivery',
    value: 'email',
  },
};

export const RadioSelected: Story = {
  args: {
    variant: 'radio',
    label: 'Email delivery',
    name: 'delivery',
    value: 'email',
    defaultChecked: true,
  },
};

export const RadioDisabled: Story = {
  args: {
    variant: 'radio',
    label: 'Disabled radio',
    disabled: true,
    name: 'delivery',
    value: 'disabled',
  },
};

export const RadioDisabledSelected: Story = {
  args: {
    variant: 'radio',
    label: 'Disabled selected',
    disabled: true,
    defaultChecked: true,
    name: 'delivery',
    value: 'disabled-selected',
  },
};

// Without label examples
export const CheckboxWithoutLabel: Story = {
  args: {
    variant: 'checkbox',
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox can be used without a label for custom layouts.',
      },
    },
  },
};

export const RadioWithoutLabel: Story = {
  args: {
    variant: 'radio',
    name: 'example',
    value: 'no-label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio can be used without a label for custom layouts.',
      },
    },
  },
};

// States showcase
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Checkbox States */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
          Checkbox States:
        </div>
        
        <Selector variant="checkbox" label="Default state (unchecked)" />
        <Selector variant="checkbox" label="Filled state (checked)" defaultChecked />
        <Selector variant="checkbox" label="Disabled unchecked" disabled />
        <Selector variant="checkbox" label="Disabled checked" disabled defaultChecked />
      </div>

      {/* Radio States */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
          Radio Button States:
        </div>
        
        <Selector variant="radio" label="Default state (unselected)" name="states" value="default" />
        <Selector variant="radio" label="Filled state (selected)" name="states" value="filled" defaultChecked />
        <Selector variant="radio" label="Disabled unselected" name="states" value="disabled" disabled />
        <Selector variant="radio" label="Disabled selected" name="states" value="disabled-selected" disabled defaultChecked />
      </div>
      
      <div style={{ fontSize: '12px', color: '#8b908d', marginTop: '8px' }}>
        Click selectors to toggle between default and filled states
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All selector states displayed together for both checkbox and radio variants.',
      },
    },
  },
};

// Checkbox form example
export const CheckboxForm: Story = {
  render: () => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [newsletter, setNewsletter] = useState(false);

    return (
      <form style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '200px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
          Preferences:
        </div>
        
        <Selector 
          variant="checkbox"
          name="notifications" 
          id="notifications"
          label="Email notifications" 
          checked={emailNotifications}
          onChange={setEmailNotifications}
        />
        <Selector 
          variant="checkbox"
          name="push" 
          id="push"
          label="Push notifications" 
          checked={pushNotifications}
          onChange={setPushNotifications}
        />
        <Selector 
          variant="checkbox"
          name="newsletter" 
          id="newsletter"
          label="Newsletter subscription" 
          checked={newsletter}
          onChange={setNewsletter}
        />
        <Selector 
          variant="checkbox"
          name="beta" 
          id="beta"
          label="Beta features (coming soon)" 
          disabled
        />
        
        <button 
          type="submit" 
          style={{ 
            marginTop: '16px', 
            padding: '8px 16px',
            backgroundColor: '#9ad5f7',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Save Preferences
        </button>
        
        <div style={{ 
          marginTop: '8px', 
          padding: '8px',
          backgroundColor: '#f8f3ff',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#5d6460'
        }}>
          Selected: {[
            emailNotifications && 'Email',
            pushNotifications && 'Push', 
            newsletter && 'Newsletter'
          ].filter(Boolean).join(', ') || 'None'}
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of checkbox selectors in a form with controlled state.',
      },
    },
  },
};

// Radio group example
export const RadioGroup: Story = {
  render: () => {
    const [deliveryMethod, setDeliveryMethod] = useState('email');
    const [accountType, setAccountType] = useState('personal');

    return (
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '250px' }}>
        
        {/* Delivery Method */}
        <div>
          <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
            Delivery Method:
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Selector 
              variant="radio"
              name="deliveryMethod"
              value="email"
              id="delivery-email"
              label="Email delivery" 
              checked={deliveryMethod === 'email'}
              onChange={() => setDeliveryMethod('email')}
            />
            <Selector 
              variant="radio"
              name="deliveryMethod"
              value="sms"
              id="delivery-sms"
              label="SMS delivery" 
              checked={deliveryMethod === 'sms'}
              onChange={() => setDeliveryMethod('sms')}
            />
            <Selector 
              variant="radio"
              name="deliveryMethod"
              value="app"
              id="delivery-app"
              label="In-app only" 
              checked={deliveryMethod === 'app'}
              onChange={() => setDeliveryMethod('app')}
            />
          </div>
        </div>
        
        {/* Account Type */}
        <div>
          <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
            Account Type:
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Selector 
              variant="radio"
              name="accountType"
              value="personal"
              id="account-personal"
              label="Personal account" 
              checked={accountType === 'personal'}
              onChange={() => setAccountType('personal')}
            />
            <Selector 
              variant="radio"
              name="accountType"
              value="business"
              id="account-business"
              label="Business account" 
              checked={accountType === 'business'}
              onChange={() => setAccountType('business')}
            />
            <Selector 
              variant="radio"
              name="accountType"
              value="enterprise"
              id="account-enterprise"
              label="Enterprise account" 
              checked={accountType === 'enterprise'}
              onChange={() => setAccountType('enterprise')}
              disabled
            />
          </div>
        </div>
        
        <div style={{ 
          marginTop: '8px', 
          padding: '12px',
          backgroundColor: '#f8f3ff',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#5d6460'
        }}>
          <strong>Selected:</strong> {deliveryMethod} delivery, {accountType} account
        </div>
        
        <button 
          type="submit" 
          style={{ 
            marginTop: '8px', 
            padding: '8px 16px',
            backgroundColor: '#9ad5f7',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Continue Setup
        </button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of radio selectors in groups with controlled state. Only one option can be selected per group.',
      },
    },
  },
};