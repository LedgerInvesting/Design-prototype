import type { Meta, StoryObj } from '@storybook/react';
import { DownloadButton } from './DownloadButton';

const meta: Meta<typeof DownloadButton> = {
  title: 'Components/DownloadButton',
  component: DownloadButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Button text',
      defaultValue: 'Download',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DownloadButton>;

export const Default: Story = {
  args: {
    text: 'Download',
    options: [
      {
        label: 'Download as PDF',
        onClick: () => console.log('Download as PDF'),
      },
      {
        label: 'Download as Excel',
        onClick: () => console.log('Download as Excel'),
      },
    ],
  },
};

export const CustomText: Story = {
  args: {
    text: 'Export',
    options: [
      {
        label: 'Export as CSV',
        onClick: () => console.log('Export as CSV'),
      },
      {
        label: 'Export as JSON',
        onClick: () => console.log('Export as JSON'),
      },
      {
        label: 'Export as XML',
        onClick: () => console.log('Export as XML'),
      },
    ],
  },
};

export const SingleOption: Story = {
  args: {
    text: 'Download',
    options: [
      {
        label: 'Download Report',
        onClick: () => console.log('Download Report'),
      },
    ],
  },
};

export const ManyOptions: Story = {
  args: {
    text: 'Download',
    options: [
      {
        label: 'Download as PDF',
        onClick: () => console.log('Download as PDF'),
      },
      {
        label: 'Download as Excel',
        onClick: () => console.log('Download as Excel'),
      },
      {
        label: 'Download as CSV',
        onClick: () => console.log('Download as CSV'),
      },
      {
        label: 'Download as JSON',
        onClick: () => console.log('Download as JSON'),
      },
      {
        label: 'Download as XML',
        onClick: () => console.log('Download as XML'),
      },
    ],
  },
};
