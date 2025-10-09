import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      canvas: {
        style: {
          height: '700px',
          minHeight: '700px',
        },
      },
      description: {
        component: 'Advanced date picker component with modal interface, time period presets, dual calendar support, and all input field functionality. Features automatic state transitions, tooltip integration, and comprehensive date selection modes.',
      },
    },
  },
  argTypes: {
    label: {
      description: 'Date picker label text',
      control: 'text',
    },
    placeholder: {
      description: 'Placeholder text shown when empty',
      control: 'text',
    },
    value: {
      description: 'Date picker value',
      control: 'text',
    },
    state: {
      description: 'Visual state of the date picker',
      control: 'radio',
      options: ['default', 'active', 'filled', 'warning', 'error', 'disabled'],
    },
    showTooltip: {
      description: 'Show info tooltip next to label',
      control: 'boolean',
    },
    tooltipText: {
      description: 'Simple tooltip text',
      control: 'text',
      if: { arg: 'showTooltip', eq: true },
    },
    helperText: {
      description: 'Helper/error/warning text below input',
      control: 'text',
    },
    disabled: {
      description: 'Disabled state',
      control: 'boolean',
    },
    onCalendarClick: {
      description: 'Calendar icon click handler',
      action: 'calendar-clicked',
    },
    onChange: {
      description: 'Input change handler',
      action: 'changed',
    },
    onFocus: {
      description: 'Input focus handler',
      action: 'focused',
    },
    onBlur: {
      description: 'Input blur handler',
      action: 'blurred',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default date picker
export const Default: Story = {
  args: {
    label: 'Date Range',
    placeholder: 'Select date range...',
    state: 'default',
    showTooltip: false,
  },
};


// Modal functionality example
export const WithModal: Story = {
  render: () => {
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

    const handleDateRangeChange = (start: string, end: string) => {
      setStartDate(start);
      setEndDate(end);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setStartDate(e.target.value);
    };

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px', 
        minWidth: '300px'
      }}>
        <DatePicker
          label="Date Range Picker with Modal"
          value={startDate}
          endDate={endDate}
          onChange={handleInputChange}
          onDateRangeChange={handleDateRangeChange}
          helperText="Click anywhere on the input field to open the date range selector modal"
        />
        
        <div style={{ 
          fontSize: '12px', 
          color: '#6b7280',
          padding: '12px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px'
        }}>
          <strong>Selected Range:</strong><br />
          Start: {startDate || 'Not selected'}<br />
          End: {endDate || 'Not selected'}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'DatePicker with modal functionality. Click the calendar icon to open the advanced date range selector with time period buttons, dual calendars, and conditional action buttons.',
      },
      canvas: {
        style: {
          height: '800px',
          minHeight: '800px',
        },
      },
    },
    viewport: {
      defaultViewport: null,
    },
  },
};

// Click to open modal example
export const ClickToOpen: Story = {
  args: {
    label: 'Date Range (Click to Open)',
    helperText: 'Click on the input field or calendar icon to open the date picker modal',
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker input field is read-only and opens the modal when clicked. The calendar icon also opens the modal.',
      },
    },
  },
};

// Current period mode example
export const CurrentPeriodMode: Story = {
  render: () => {
    const [startDate, setStartDate] = React.useState('');

    const handleDateRangeChange = (start: string, end: string) => {
      setStartDate(start);
      // For current mode, end date should always be empty
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setStartDate(e.target.value);
    };

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px', 
        minWidth: '300px'
      }}>
        <DatePicker
          label="Current Period Date Picker"
          value={startDate}
          onChange={handleInputChange}
          onDateRangeChange={handleDateRangeChange}
          helperText="Click to open the modal, then select 'Current' to see single calendar mode"
        />
        
        <div style={{ 
          fontSize: '12px', 
          color: '#6b7280',
          padding: '12px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px'
        }}>
          <strong>Selected Date:</strong><br />
          Start: {startDate || 'Not selected'}<br />
          <em>Click "Current" in the modal to test single date selection with black900/blue700 styling</em>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker in Current mode shows a single calendar. Click "Current" in the time period buttons to see single date selection with black900 background and blue700 text.',
      },
    },
  },
};

// Interactive examples
export const InteractiveDemo: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [state, setState] = React.useState<'default' | 'active' | 'filled' | 'warning' | 'error' | 'disabled'>('default');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      // Auto-detect state based on content
      if (e.target.value) {
        if (e.target.value.includes('error')) {
          setState('error');
        } else if (e.target.value.includes('warn')) {
          setState('warning');
        } else {
          setState('filled');
        }
      } else {
        setState('default');
      }
    };

    const handleCalendarClick = () => {
      // Simulate date picker opening
      alert('Calendar picker would open here');
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
        <DatePicker
          label="Interactive Date Picker"
          value={value}
          state={state}
          onChange={handleChange}
          onCalendarClick={handleCalendarClick}
          helperText={
            state === 'error' ? 'This is an error message' :
            state === 'warning' ? 'This is a warning message' :
            'Click to open date picker modal'
          }
        />
        <div style={{ 
          fontSize: '12px', 
          color: '#6b7280',
          textAlign: 'center',
          padding: '8px'
        }}>
          Current state: <strong>{state}</strong>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing automatic state transitions and calendar icon functionality.',
      },
    },
  },
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '350px' }}>
      <DatePicker
        label="Default State"
        state="default"
      />
      
      <DatePicker
        label="Active State"
        state="active"
      />
      
      <DatePicker
        label="Filled State"
        value="15/03/2024 to 20/03/2024"
        state="filled"
      />
      
      <DatePicker
        label="Warning State"
        value="01/12/2025 to 31/12/2025"
        state="warning"
        helperText="Future date range may not be valid"
      />
      
      <DatePicker
        label="Error State"
        value="invalid date range"
        state="error"
        helperText="Please select a valid date range"
      />
      
      <DatePicker
        label="Disabled State"
        disabled={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All six DatePicker states: Default (idle), Active (focused), Filled (has content), Warning (potential issue), Error (validation failure), and Disabled (non-interactive).',
      },
    },
  },
};

// Tooltip variations
export const TooltipVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '350px' }}>
      <DatePicker
        label="Simple Tooltip"
        showTooltip={true}
        tooltipText="Choose the project date range. This will be used for scheduling."
      />
      
      <DatePicker
        label="Complex Tooltip"
        showTooltip={true}
        tooltipSections={[
          {
            title: 'Contract Period',
            description: 'The date range when the contract is effective.',
          },
          {
            title: 'Important Notes',
            description: 'This period cannot be changed after contract signing.',
          },
          {
            title: 'Selection',
            description: 'Click to open the date range picker modal.',
          },
        ]}
      />
      
      <DatePicker
        label="No Tooltip"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip integration: simple text tooltip, complex multi-section tooltip, and no tooltip options.',
      },
    },
  },
};

// Form integration example
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      startDate: '',
      endDate: '',
      birthDate: '',
    });

    const handleDateChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }));
    };

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px', 
        minWidth: '350px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>Project Timeline</h3>
        
        <DatePicker
          label="Project Period"
          value={formData.startDate}
          onChange={handleDateChange('startDate')}
          showTooltip={true}
          tooltipText="The date range when the project is active"
        />
        
        <DatePicker
          label="Review Period"
          value={formData.endDate}
          onChange={handleDateChange('endDate')}
          helperText="Select the review period for this project"
        />
        
        <DatePicker
          label="Budget Period"
          value={formData.birthDate}
          onChange={handleDateChange('birthDate')}
        />
        
        <div style={{ 
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          <strong>Form Data:</strong>
          <pre style={{ margin: '8px 0 0 0', fontSize: '12px' }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing DatePicker integration in a form with validation and state management.',
      },
    },
  },
};