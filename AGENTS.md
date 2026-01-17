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

- **`src/background/`** - Service worker entry point (`index.js`)
  - `utils/` - Background-specific utilities (e.g. decode.js, getObjSize.js, parseFlightPushData.js, tabs.js)
- **`src/app/`** - Full explorer UI (React components and state management)
  - `components/` - React components using atomic design pattern
    - `core/` - Reusable atomic components
      - `switch/` - Toggle checkbox component
      - `loading/` - Loading spinner overlay with rocket emoji animation
      - `message/` - Notification/toast messages
      - `portal/` - React portal wrapper
      - `truncated-text/` - Text truncation component with show more/less button (default 35 chars)
      - `viewer/` - Agnostic JSON tree visualizer with search integration
        - `tree/` - Recursive tree renderer with search filtering
        - `key/` - Object/array key renderer with auto-expand on match
        - `value/` - Leaf value renderer with highlighting
        - `search/` - Search input component with focus animation and result counter
    - `Header.js` - Navigation header
    - `Footer.js` - Footer section
    - `ControlBar.js` - Toolbar controls
    - `PageInfo.js` - Pages Router information display (page, query, assets prefix)
    - `App.js` - Root application component
    - `Theme.js` - Theme provider wrapper
  - `context/` - State management with Context API
  - `hooks/` - Custom React hooks
  - `utils/` - App-specific utilities (e.g. object.js, rows.js, sanitize.js, context.js, config.js, copy.js)
  - `index.css` - Global and theme styles (unified)
- **`src/popup/`** - Quick access popup UI
- **`src/helpers/`** - Shared constants and classNames utility (only `constants.js` and `classNames.js` remain)

### Configuration Files

- **`webpack.config.js`** - Module bundler configuration
- **`tsconfig.json`** - TypeScript settings (strict mode enabled)
- **`global.d.ts`** - Global type declarations for CSS Modules
- **`eslint.config.mjs`** - ESLint configuration
- **`manifest.chrome.json`** - Chrome extension manifest
- **`manifest.firefox.json`** - Firefox extension manifest

---

## Key Components and Modules

### Component Architecture

The component structure follows **atomic design principles** with components organized by reusability level:

#### Core Atomic Components (`src/app/components/core/`)

Simple, reusable, self-contained components with no dependencies on other custom components:

- **switch/** - Toggle checkbox for boolean inputs
- **loading/** - Loading spinner and overlay display with animated 🚀 emoji
- **message/** - Notification/toast message component
- **portal/** - React portal wrapper for rendering outside DOM hierarchy
- **truncated-text/** - Text truncation component that shows first 35 characters with "show more/show less" button for long text
- **viewer/** - Agnostic JSON tree visualizer with integrated search (self-contained, reusable)
  - **tree/** - Recursive tree structure renderer with search filtering (displays all children when parent key matches)
  - **key/** - Object/array key with collapsible functionality, auto-expand on match, size display
  - **value/** - Leaf value renderer with syntax highlighting
  - **search/** - Search input with focus animation, clear button, result counter

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
- **React** - UI framework
- **webextension-polyfill** - Cross-browser API compatibility
- **Webpack** - Module bundling
- **Babel** - JavaScript transpilation
- **ESLint** - Code linting
- **StyleLint** - CSS linting

---

## Common Development Tasks

### Adding a New Component

1. Create `.js` file in `src/app/components/`
2. Create corresponding `.module.css` file for styles
3. Import and use in parent component
4. Add any required Context hooks

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
