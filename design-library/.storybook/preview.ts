import type { Preview } from '@storybook/react';
import '../src/styles/base.css';
import { withThemeProvider } from './decorators';

const preview: Preview = {
  decorators: [withThemeProvider],
  globalTypes: {
    theme: {
      description: 'Product theme for components',
      defaultValue: 'reports',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'reports', title: 'Reports (Blue)', icon: 'circle' },
          { value: 'marketplace', title: 'Marketplace (Purple)', icon: 'circle' },
          { value: 'analytics', title: 'Analytics (Green)', icon: 'circle' },
          { value: 'contracts', title: 'Contracts (Yellow)', icon: 'circle' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // Global theme parameter for all stories
    theme: 'reports',
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
  },
};

export default preview;