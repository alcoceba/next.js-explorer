import '../src/app/index.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#222' },
        { name: 'light', value: '#fff' },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.backgrounds?.value === '#fff' ? 'light' : 'dark';
      return (
        <div data-theme={theme} style={{ padding: '1rem' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
