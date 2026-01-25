import '../src/app/index.css';

/** @type { import('@storybook/react-webpack5').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        dark: { name: 'dark', value: '#222' },
        light: { name: 'light', value: '#fff' }
      }
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

  initialGlobals: {
    backgrounds: {
      value: 'dark'
    }
  },

  tags: ['autodocs']
};

export default preview;
