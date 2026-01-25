# AGENTS.md

Practical guidance for AI coding agents working on the Next.js Explorer browser extension project.

For detailed architecture and component documentation, see [ARCHITECTURE.md](ARCHITECTURE.md).

---

## Setup and Installation

- Install dependencies: `npm install`
- The project uses npm with workspaces configured in `package.json`
- Node.js 20+ is required

---

## Development Workflow

### Build Commands

- **Watch mode (Chrome):** `npm run watch:chrome`
- **Watch mode (Firefox):** `npm run watch:firefox`
- **Production build (Chrome):** `npm run build:chrome`
- **Production build (Firefox):** `npm run build:firefox`

The built extension will be in the `dist/` folder.

### Running the Extension

1. Build the extension using watch mode for your target browser
2. Load the unpacked extension from `dist/chrome/` or `dist/firefox/`
3. The extension will activate on any page with a Next.js application detected

### Storybook (Component Documentation)

- **Start Storybook:** `npm run storybook` (runs on port 6006)
- **Build static docs:** `npm run build-storybook`

Storybook provides interactive documentation for all core UI components. Use it to:

- Browse and test components in isolation
- View component variants and props
- Develop new components with live preview

All story files are co-located with their components using the `.stories.js` suffix.

---

## Code Quality

Run linters and formatters to check code quality before committing:

- **Prettier check:** `npm run format:check`
- **Format with Prettier:** `npm run format`
- **ESLint check:** `npm run lint`
- **Fix ESLint issues:** `npm run lint:fix`
- **Check CSS:** `npm run stylelint`
- **Fix CSS issues:** `npm run stylelint:fix`

Always run `npm run lint:fix` and `npm run format` before pushing changes.

### Code Style

- **JavaScript/Files:** Standard JavaScript with ESLint and Prettier rules
- **CSS:** Use CSS Modules for component styling (`.module.css` pattern)
- **Component Structure:** React functional components with hooks
- **State Management:** Use React Context API for cross-component state

---

## Testing and Verification

A comprehensive Jest test suite exists for all major components:

1. **Run tests:** `npm test` (if configured) or unit test files found in `**/*.test.js`
2. **Manual testing:** Navigate to any Next.js application to verify data extraction

---

## File Organization


### Key Directories

- **`src/background/`**: Contains the service worker and background-specific utilities for data extraction, page inspection, and extension logic. AI agents should update or extend background logic here for new data sources or message handling.

- **`src/app/`**: Main explorer UI. Contains:
  - **components/core/**: Atomic UI components (buttons, inputs, modals, tooltips, JSON viewer, etc.) for building reusable interface elements.
  - **components/**: Composite components that orchestrate core atoms and icons for feature-specific UI (app shell, toolbars, headers, footers, data viewers).
  - **icons/**: All toolbar and UI icons in SVG format (18x18), used for actions and status indicators throughout the app.
  - **context/**: State management using React Context API. Extend context here for new global state or actions.
  - **hooks/**: Custom React hooks for encapsulating reusable logic.
  - **utils/**: App-specific utility functions for object manipulation, config, copying, etc.

- **`src/popup/`**: Quick-access popup UI for extension icon click. Update here for fast status or navigation features.

- **`src/helpers/`**: Shared constants and utility functions. Add here for cross-cutting helpers used in multiple modules.

### Configuration Files

- **`webpack.config.js`** - Module bundler configuration
- **`tsconfig.json`** - TypeScript settings (strict mode enabled)
- **`eslint.config.mjs`** - ESLint configuration
- **`manifest.chrome.json`** - Chrome extension manifest
- **`manifest.firefox.json`** - Firefox extension manifest

---

## Key Components and Modules

### Component Architecture

The component structure follows **atomic design principles** with components organized by reusability level:

#### Core Atomic Components (`src/app/components/core/`)

Simple, reusable, self-contained components with no dependencies on other custom components. Each component folder contains:

- Component file (e.g., `Button.js`)
- CSS Module (e.g., `Button.module.css`)
- Test file (e.g., `Button.test.js`)
- Storybook story (e.g., `Button.stories.js`)

Examples include: badge, button, input, loading, message, modal, portal, radio-group, switch, tooltip, flat-tree (JSON viewer with search).

All core components are documented in Storybook - run `npm run storybook` to browse.

#### Composite Components

Components combining atoms and providing feature-specific functionality:

- **Header** - Navigation with title, version info, theme toggle, badge display for router/version info
- **Footer** - Footer section with version display and interactive emoji
- **ControlBar** - Toolbar controls (show/hide sizes, collapse, expand, copy JSON, export options)
- **PageInfo** - Displays Next.js Pages Router information (page path, query parameters, assets prefix) using TruncatedText for long values

#### Root/Layout Components

- **App** - Root component managing global state and orchestrating all components
- **Theme** - Theme provider wrapper applying CSS theme variables

### Background Script (`src/background/index.js`)

The main service worker:

- Detects Next.js apps and their router type
- Extracts application data from the page
- Manages extension badge state
- Communicates with app and popup via message passing

Key functions:

- `getRawData()` - Extracts Next.js data from the page
- `getIcon()` - Determines badge icon based on context

### Popup (`src/popup/`)

Quick-access UI shown when extension icon is clicked:

- Shows detected Next.js version
- Links to open full explorer
- Displays page status

### Helper Modules (`src/helpers/`)

### Helper Modules

- **`src/app/utils/`** - App-specific utilities (object manipulation, context, config, rows, sanitize, copy)
- **`src/background/utils/`** - Background-specific utilities (decode, getObjSize, parseFlightPushData, tabs)
- **`src/helpers/`** - Shared constants and classNames utility only

---

## Data Flow

1. **Detection:** Background script scans page for `window.__next_f` (App Router) or `__NEXT_DATA__` (Pages Router)
2. **Parsing:** Flight data is decoded and parsed into structured format
3. **Storage:** Data is processed and made available to app/popup
4. **Display:** React components render data in tree or other views

---

## Extension Manifest Notes

Two manifests maintained:

- **`manifest.chrome.json`** - Chrome/Chromium manifest (MV3)
- **`manifest.firefox.json`** - Firefox manifest (MV2 compatibility)

Build process selects appropriate manifest based on target browser.

---

## Debugging Tips

- **Check service worker:** Open `chrome://extensions/` → Next.js Explorer → Service Worker
- **Check popup errors:** Right-click extension icon → Inspect popup
- **Page data:** Open browser DevTools → check `window.__next_f` or `window.__NEXT_DATA__`
- **Message passing:** Check background script logs for message failures
- **CSS Issues:** Verify CSS Module imports in components (should reference `.module.css` files)

---

## Dependencies

Core dependencies (see `package.json` for versions):

- **react** - UI framework
- **react-dom** - React DOM rendering
- **prop-types** - Runtime type checking for React props
- **webextension-polyfill** - Cross-browser API compatibility
- **webpack** - Module bundling
- **babel-loader**, **@babel/core**, **@babel/preset-env**, **@babel/preset-react** - JavaScript/React transpilation
- **eslint**, **eslint-plugin-react**, **@eslint/js** - Code linting
- **prettier** - Code formatting
- **stylelint**, **stylelint-config-standard-scss** - CSS linting
- **css-loader**, **style-loader** - CSS Modules support
- **copy-webpack-plugin**, **html-webpack-plugin** - Webpack plugins
- **jest**, **@testing-library/react**, **@testing-library/jest-dom**, **@testing-library/user-event**, **babel-jest**, **identity-obj-proxy**, **jest-environment-jsdom** - Testing
- **husky** - Git hooks
- **globals** - Global variables for linting
- **storybook**, **@storybook/react**, **@storybook/react-webpack5**, **@storybook/addon-essentials** - Component documentation

## Core Atomic Components (`src/app/components/core/`)

Purpose: Contains general-purpose atomic UI components. These are simple, reusable, and self-contained building blocks for the app's interface (e.g., buttons, inputs, modals, tooltips, JSON viewer). Designed for maximum reusability and minimal dependencies. Use these to build higher-level UI features.

## Icon Components (`src/app/icons/`)

Purpose: Contains all toolbar and UI icons in SVG format. All icons are designed at 18x18 size for visual consistency and are used throughout the app for actions like collapse, expand, copy, export, info, theme switching, and search. Use these icons for any UI action or status indicator.

## Composite Components (`src/app/components/`)

Purpose: Composite components orchestrate atomic components to provide feature-specific UI and app logic. They combine multiple atoms (from core and icons) and manage state, context, and user interaction. Examples include the main app shell, toolbars, headers, footers, and data viewers. Use these as the main entry points for user-facing features and workflows.

## Context

Purpose: The project uses the React Context API for cross-component state management. Context provides a way to share state, actions, and configuration across atomic and composite components without prop drilling.

Guidance for AI agents:

- Use context to manage global state (e.g., theme, data, UI flags, modal visibility).
- When adding new features that require shared state, extend the context provider and actions.
- Access context in components using React's useContext hook.
- Update context actions and reducers to support new state requirements.
- Ensure context changes are reflected in all relevant components for a consistent user experience.

---

## Common Development Tasks

### Adding a New Component

1. Create component file (e.g., `ComponentName.js`)
2. Create corresponding CSS Module (e.g., `ComponentName.module.css`)
3. Create test file (e.g., `ComponentName.test.js`)
4. Create Storybook story (e.g., `ComponentName.stories.js`) for documentation
5. Import and use in parent component
6. Add any required Context hooks

For core atomic components, place in `src/app/components/core/`. For composite components, place in `src/app/components/`.

### Adding a Helper Function

1. Create or edit file in `src/helpers/`
2. Export function with clear naming
3. Import where needed (avoid circular dependencies)

### Changing the Data Extraction Logic

1. Modify `src/background/index.js` getRawData() function
2. Update parsing in `src/helpers/parseFlightData.js` if needed
3. Test with different Next.js app variations
4. Rebuild and reload extension

### Modifying UI Components

1. Edit component in `src/app/components/`
2. Update styles in corresponding `.module.css`
3. Test theme switching (dark/light mode)
4. Verify responsive layout

---

## Browser Support

- **Chrome/Chromium:** Full support via MV3 manifest
- **Firefox:** Support via MV2-compatible manifest

Build for your target browser using appropriate npm script.

---

## Performance Considerations

- Data parsing happens in background script to avoid blocking main thread
- Component memoization used in Viewer for large data trees
- CSS Modules keep styling scoped and minimal
- Lazy loading in app explorer for large datasets

---

## License

BSD 3-Clause License - See [LICENSE](LICENSE) file for details.
