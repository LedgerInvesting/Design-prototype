import type { Meta, StoryObj } from '@storybook/react';
import { ButtonSelector } from './ButtonSelector';
import { useState } from 'react';

const meta: Meta<typeof ButtonSelector> = {
  title: 'Forms/ButtonSelector',
  component: ButtonSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A button selector component that combines button styling with an embedded selector (checkbox or radio). Perfect for forms with binary choices where you want the selector to be prominent.',
      },
    },
  },
  argTypes: {
    label: {
      description: 'Button text/label displayed next to the selector',
      control: 'text',
    },
    selectorType: {
      description: 'Type of selector - checkbox or radio',
      control: 'radio',
      options: ['checkbox', 'radio'],
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
      description: 'Whether the button selector is disabled',
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
      description: 'Value for the input (used in radio groups)',
      control: 'text',
    },
    id: {
      description: 'ID for the input',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default button selector (checkbox variant)
export const Default: Story = {
  args: {
    label: 'Enable notifications',
    selectorType: 'checkbox',
    disabled: false,
  },
};

// Basic examples
export const CheckboxDefault: Story = {
  args: {
    label: 'Enable notifications',
    selectorType: 'checkbox',
  },
};

export const CheckboxSelected: Story = {
  args: {
    label: 'Enable notifications',
    selectorType: 'checkbox',
    defaultChecked: true,
  },
};

export const RadioDefault: Story = {
  args: {
    label: 'Email delivery',
    selectorType: 'radio',
    name: 'delivery',
    value: 'email',
  },
};

export const RadioSelected: Story = {
  args: {
    label: 'Email delivery',
    selectorType: 'radio',
    name: 'delivery',
    value: 'email',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Premium feature (coming soon)',
    selectorType: 'checkbox',
    disabled: true,
  },
};

export const DisabledSelected: Story = {
  args: {
    label: 'Premium feature (active)',
    selectorType: 'checkbox',
    disabled: true,
    defaultChecked: true,
  },
};

// States showcase
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
      <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
        Checkbox Button Selectors:
      </div>
      
      <ButtonSelector label="Default state" selectorType="checkbox" />
      <ButtonSelector label="Selected state" selectorType="checkbox" defaultChecked />
      <ButtonSelector label="Disabled state" selectorType="checkbox" disabled />
      <ButtonSelector label="Disabled selected" selectorType="checkbox" disabled defaultChecked />
      
      <div style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '16px', marginBottom: '8px' }}>
        Radio Button Selectors:
      </div>
      
      <ButtonSelector label="Default radio" selectorType="radio" name="demo" value="default" />
      <ButtonSelector label="Selected radio" selectorType="radio" name="demo" value="selected" defaultChecked />
      <ButtonSelector label="Disabled radio" selectorType="radio" name="demo" value="disabled" disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button selector states displayed together for both checkbox and radio types.',
      },
    },
  },
};

// Binary choice form example
export const BinaryChoiceForm: Story = {
  render: () => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [newsletter, setNewsletter] = useState(false);

    return (
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '350px' }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
          Notification Preferences
        </div>
        
        <ButtonSelector 
          label="Email notifications"
          selectorType="checkbox"
          checked={emailNotifications}
          onChange={setEmailNotifications}
          id="email-notifications"
          name="emailNotifications"
        />
        
        <ButtonSelector 
          label="Push notifications"
          selectorType="checkbox"
          checked={pushNotifications}
          onChange={setPushNotifications}
          id="push-notifications"
          name="pushNotifications"
        />
        
        <ButtonSelector 
          label="Weekly newsletter"
          selectorType="checkbox"
          checked={newsletter}
          onChange={setNewsletter}
          id="newsletter"
          name="newsletter"
        />
        
        <ButtonSelector 
          label="Beta features (coming soon)"
          selectorType="checkbox"
          disabled
          id="beta"
          name="beta"
        />
        
        <div style={{ 
          marginTop: '16px', 
          padding: '12px',
          backgroundColor: '#f8f3ff',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#5d6460'
        }}>
          <strong>Selected:</strong> 
          {emailNotifications && ' Email'}
          {pushNotifications && ' Push'}
          {newsletter && ' Newsletter'}
          {!emailNotifications && !pushNotifications && !newsletter && ' None'}
        </div>
        
        <button 
          type="submit" 
          style={{ 
            marginTop: '8px', 
            padding: '12px 16px',
            backgroundColor: '#9ad5f7',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          Save Preferences
        </button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of button selectors in a form for binary choices. Perfect for settings pages where each option is independent.',
      },
    },
  },
};

// Radio group example  
export const RadioGroupForm: Story = {
  render: () => {
    const [deliveryMethod, setDeliveryMethod] = useState('email');
    const [accountType, setAccountType] = useState('personal');

    return (
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '350px' }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
            Delivery Method
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <ButtonSelector 
              label="Email delivery"
              selectorType="radio"
              name="deliveryMethod"
              value="email"
              checked={deliveryMethod === 'email'}
              onChange={() => setDeliveryMethod('email')}
              id="delivery-email"
            />
            <ButtonSelector 
              label="SMS delivery"
              selectorType="radio"
              name="deliveryMethod"
              value="sms"
              checked={deliveryMethod === 'sms'}
              onChange={() => setDeliveryMethod('sms')}
              id="delivery-sms"
            />
            <ButtonSelector 
              label="In-app only"
              selectorType="radio"
              name="deliveryMethod"
              value="app"
              checked={deliveryMethod === 'app'}
              onChange={() => setDeliveryMethod('app')}
              id="delivery-app"
            />
          </div>
        </div>
        
        <div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
            Account Type
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <ButtonSelector 
              label="Personal account"
              selectorType="radio"
              name="accountType"
              value="personal"
              checked={accountType === 'personal'}
              onChange={() => setAccountType('personal')}
              id="account-personal"
            />
            <ButtonSelector 
              label="Business account"
              selectorType="radio"
              name="accountType"
              value="business"
              checked={accountType === 'business'}
              onChange={() => setAccountType('business')}
              id="account-business"
            />
            <ButtonSelector 
              label="Enterprise account"
              selectorType="radio"
              name="accountType"
              value="enterprise"
              checked={accountType === 'enterprise'}
              onChange={() => setAccountType('enterprise')}
              id="account-enterprise"
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
            padding: '12px 16px',
            backgroundColor: '#9ad5f7',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 500
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
        story: 'Example of radio button selectors in groups. Perfect for forms where users must choose one option from multiple choices.',
      },
    },
  },
};