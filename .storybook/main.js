/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-webpack5-compiler-babel'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config) => {
    // Remove existing CSS rules
    config.module.rules = config.module.rules.filter(
      (rule) => !(rule.test && rule.test.toString().includes('css'))
    );

    // Add custom CSS rule for CSS modules
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
              exportLocalsConvention: 'asIs',
            },
          },
        },
      ],
    });

    // Add rule for regular CSS files
    config.module.rules.push({
      test: /\.css$/,
      exclude: /\.module\.css$/,
      use: ['style-loader', 'css-loader'],
    });

    return config;
  },
};

export default config;
