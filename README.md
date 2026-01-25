# Next.js Explorer

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
[![CI](https://github.com/alcoceba/next.js-explorer/actions/workflows/ci.yml/badge.svg)](https://github.com/alcoceba/next.js-explorer/actions/workflows/ci.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://prettier.io/)
[![Coverage Status](https://img.shields.io/badge/coverage-auto-informational?style=flat)](./)

Next.js Explorer is a browser extension for Google Chrome and Firefox designed to help developers explore and visualize the structure and data of their Next.js applications.

[![Chome Web Store](public/chrome-store.png)](https://chromewebstore.google.com/detail/nextjs-explorer-nextjs-ap/iiekmbomdcmddchlplbdlkkpdgncgpdg)
[![Firefox Add-On](public/get-the-add-on.png)](https://addons.mozilla.org/en-US/firefox/addon/nextjs/)

## Getting Started

To get started with Next.js Explorer, follow the steps below.

### Prerequisites

Make sure you have the following installed:

- Node.js (v20 or higher)
- npm or yarn
- Chrome or Firefox for testing the extension

### Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/alcoceba/next.js-explorer.git
cd next.js-explorer
```

Install the necessary dependencies:

```bash
npm install
# or
yarn install
```

### Development

To bundle the project and load it as a Google Chrome extension or Firefox addon:

- **For Chrome:**

  ```bash
  npm run watch:chrome
  ```

  This command will bundle the project and watch for changes, allowing you to load it as an extension in Chrome.

- **For Firefox:**

  ```bash
  npm run watch:firefox
  ```

  This command will bundle the project and watch for changes, allowing you to load it as an addon in Firefox.

After running one of these commands, follow the steps below to load the extension/addon:

#### For Chrome:

1. Open Chrome and go to `chrome://extensions/`.
2. Enable "Developer mode" (toggle switch in the top-right corner).
3. Click on "Load unpacked" and select the `dist/chrome` directory.

#### For Firefox:

1. Open Firefox and go to `about:debugging`.
2. Click on "This Firefox" in the sidebar.
3. Click on "Load Temporary Add-on" and select the `dist/firefox/manifest.json` file.

### Code Quality

Before committing changes, ensure your code meets the project's quality standards:

#### Formatting

Prettier is configured to ensure consistent code style:

```bash
npm run format          # Format all files
npm run format:check    # Check if files are formatted (CI)
```

#### Linting

ESLint and StyleLint check code quality:

```bash
npm run lint            # Check code quality
npm run lint:fix        # Fix linting issues automatically
npm run stylelint       # Check CSS
npm run stylelint:fix   # Fix CSS issues automatically
```

#### Testing

A comprehensive test suite using Jest and React Testing Library covers all components:

```bash
npm test                # Run all tests once
npm test:watch          # Run tests in watch mode during development
npm test:coverage       # Generate coverage reports
```

All tests are located alongside their corresponding components with the `.test.js` suffix.

#### Component Documentation (Storybook)

Browse and develop UI components in isolation using Storybook:

```bash
npm run storybook       # Start Storybook dev server on port 6006
npm run build-storybook # Build static documentation site
```

All core components have stories located alongside them with the `.stories.js` suffix.

### Building for Production

To build the project for production:

- **For Chrome:**

  ```bash
  npm run build:chrome
  ```

  This command will create a production-ready bundle for Chrome in the `dist/chrome` directory.

- **For Firefox:**

  ```bash
  npm run build:firefox
  ```

  This command will create a production-ready bundle for Firefox in the `dist/firefox` directory.
  
## License

This project is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details.
