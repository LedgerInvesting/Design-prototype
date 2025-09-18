import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef } from 'react';
import { Modal } from './Modal';
import { Button, Input } from './index';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A flexible modal component with customizable positioning, theming, and content.',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    animationDuration: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: 'Animation duration in milliseconds',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    subtitle: {
      control: 'text',
      description: 'Modal subtitle',
    },
    width: {
      control: 'text',
      description: 'Modal width',
    },
    centered: {
      control: 'boolean',
      description: 'Whether to center the modal',
    },
    showBackdrop: {
      control: 'boolean',
      description: 'Whether to show backdrop',
    },
    footer: {
      control: false,
      description: 'Footer content (typically buttons)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Interactive wrapper for stories
const InteractiveModal = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

// Basic centered modal
export const Default: Story = {
  render: () => <InteractiveModal />,
  args: {
    title: 'Modal Title',
    subtitle: 'This is a subtitle that provides additional context.',
    children: (
      <div style={{ padding: '20px 0' }}>
        <p>This is the modal content. You can put any React components here.</p>
        <div style={{ marginTop: '20px' }}>
          <Input label="Example Input" placeholder="Type something..." />
        </div>
      </div>
    ),
    width: '500px',
    showBackdrop: true,
    footer: (
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <Button variant="primary" color="white">
          Cancel
        </Button>
        <Button variant="primary" color="main">
          Save
        </Button>
      </div>
    ),
  },
};

// Form modal example
export const FormModal: Story = {
  render: () => <InteractiveModal />,
  args: {
    title: 'Create New Item',
    subtitle: 'Fill in the details below to create a new item.',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Input label="Item Name" placeholder="Enter item name" required />
        <Input label="Description" placeholder="Enter description" />
        <Input label="Price" leftSymbol="$" placeholder="0.00" type="number" />
      </div>
    ),
    width: '450px',
    showBackdrop: true,
    footer: (
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button variant="primary" color="white" style={{ flex: 1 }}>
          Cancel
        </Button>
        <Button variant="primary" color="main" style={{ flex: 1 }}>
          Create
        </Button>
      </div>
    ),
  },
};

// Large content modal
export const LargeContent: Story = {
  render: () => <InteractiveModal />,
  args: {
    title: 'Terms of Service',
    children: (
      <div style={{ lineHeight: '1.6' }}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
        <div style={{ marginTop: '30px' }}>
          <Button variant="primary" color="main">
            I Agree
          </Button>
        </div>
      </div>
    ),
    width: '600px',
    maxHeight: '70vh',
    showBackdrop: true,
  },
};

// Button-positioned modal
const ButtonPositionedModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div style={{ padding: '100px 20px', display: 'flex', justifyContent: 'flex-end' }}>
      <Button ref={buttonRef} onClick={() => setIsOpen(true)}>
        Open Positioned Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Positioned Modal"
        subtitle="This modal is positioned relative to the button"
        buttonRef={buttonRef}
        showBackdrop={false}
        width="400px"
      >
        <div style={{ padding: '20px 0' }}>
          <p>This modal appears positioned relative to the button that opened it.</p>
          <Input label="Quick Input" placeholder="Type here..." />
        </div>
      </Modal>
    </div>
  );
};

export const ButtonPositioned: Story = {
  render: () => <ButtonPositionedModal />,
};

// Custom styled modal
export const CustomStyled: Story = {
  render: () => <InteractiveModal />,
  args: {
    title: 'Custom Styled Modal',
    children: (
      <div>
        <p>This modal has custom styling applied.</p>
        <Button variant="primary" color="main">
          Action Button
        </Button>
      </div>
    ),
    width: '400px',
    padding: '40px 30px',
    modalStyle: {
      border: '2px solid #e1eae5',
    },
  },
};

// No backdrop modal
export const NoBackdrop: Story = {
  render: () => <InteractiveModal />,
  args: {
    title: 'No Backdrop Modal',
    subtitle: 'This modal has no backdrop',
    showBackdrop: false,
    children: (
      <div style={{ padding: '20px 0' }}>
        <p>This modal doesn't have a backdrop, so you can see the content behind it.</p>
      </div>
    ),
    width: '400px',
  },
};