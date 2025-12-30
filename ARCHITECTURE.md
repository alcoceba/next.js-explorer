# Next.js Explorer - Application Architecture

This document describes the different applications (modules and components) that make up the Next.js Explorer browser extension. The extension follows a modular architecture with clear separation of concerns.

For practical development guidance aimed at AI coding agents, see [AGENTS.md](AGENTS.md).

## Overview

The Next.js Explorer extension is composed of three main applications:

1. **Background Script** - Service worker that manages extension logic and page data inspection
2. **App** - Main interface for exploring Next.js data
3. **Popup** - Quick access UI that appears when the extension icon is clicked

---

## Background Script

**Location:** [src/background/index.js](src/background/index.js)

The background script is the core service worker that runs continuously and handles:

### Responsibilities
- **Data Extraction:** Inspects the current webpage to extract Next.js application data using `executeScript()`
- **Version Detection:** Identifies Next.js version and React version running on the page
- **Router Detection:** Distinguishes between App Router and Pages Router
- **Data Processing:** Decodes and parses Flight data from Next.js streaming responses
- **State Management:** Maintains badge icons indicating page analysis status
- **Message Handling:** Communicates with popup and app via message passing

### Key Functions
- `getRawData()` - Extracts raw Next.js data from the page
- `getIcon()` - Determines the extension badge icon based on router type and data size
- Context management using the helper functions

### Data Extraction Strategy
- Accesses `window.__next_f` for App Router data
- Accesses `document.getElementById("__NEXT_DATA__")` for Pages Router data
- Retrieves React version from `window.React` or React DevTools hook
- Uses web extension scripting API with `world: 'MAIN'` for main context access

---

## App

**Location:** [src/app/](src/app/)

The app is the main interface for detailed exploration of Next.js data. It's injected into pages and provides a full-featured UI.

### Key Components

#### [src/app/components/App.js](src/app/components/App.js)
- Main application component that renders the explorer interface
- Manages overall layout and theme

#### [src/app/components/Viewer.js](src/app/components/Viewer.js)
- Displays the tree structure of Next.js data
- Handles data visualization

#### [src/app/components/SearchBox.js](src/app/components/SearchBox.js)
- Provides search/filter functionality for exploring data
- Enables quick navigation through large data structures

#### [src/app/components/Table.js](src/app/components/Table.js)
- Displays data in tabular format
- Shows structured information about page routes and data

#### [src/app/components/Actions.js](src/app/components/Actions.js)
- Provides action buttons (export, copy, etc.)
- Handles user interactions with displayed data

#### [src/app/context/](src/app/context/)
State management using React Context API:
- **[context.js](src/app/context/context.js)** - Context definition
- **[reducer.js](src/app/context/reducer.js)** - State reducer for handling actions
- **[actions.js](src/app/context/actions.js)** - Action creators

#### [src/app/hooks/useTheme.js](src/app/hooks/useTheme.js)
- Custom hook for theme management
- Handles light/dark mode switching

### Styling
- [src/app/index.css](src/app/index.css) - Global styles
- [src/app/theme.css](src/app/theme.css) - Theme variables and color schemes
- CSS Module files for component-scoped styling (`.module.css`)
- Webpack configured with `css-loader` modules option for CSS Modules support

---

## Popup

**Location:** [src/popup/](src/popup/)

The popup provides a lightweight UI accessed through the extension icon in the browser toolbar.

### Components

#### [src/popup/App.js](src/popup/App.js)
- Main popup application component
- Displays quick summary of Next.js app detection
- Provides navigation to full app interface

#### [src/popup/Popup.js](src/popup/Popup.js)
- Popup container and layout

#### [src/popup/Popup.module.css](src/popup/Popup.module.css)
- Popup-specific styling

### Purpose
- Quick preview of detected Next.js data
- Links to open the full explorer interface
- Shows page status and version information

---

## Helper Modules

**Location:** [src/helpers/](src/helpers/)

Utility functions shared across all applications:

### [src/helpers/const.js](src/helpers/const.js)
- Application constants (router types, default sizes, etc.)
- Configuration values

### [src/helpers/context.js](src/helpers/context.js)
- Context-related helper functions
- Message passing utilities

### [src/helpers/tabs.js](src/helpers/tabs.js)
- Browser tab management utilities
- `getCurrentTab()` - Gets the active tab information

### [src/helpers/utils.js](src/helpers/utils.js)
- General utility functions
- `decode()` - Decodes data from Next.js streams

### [src/helpers/object.js](src/helpers/object.js)
- Object manipulation utilities
- `getObjSize()` - Calculates object size

### [src/helpers/rows.js](src/helpers/rows.js)
- Data row processing for table display

### [src/helpers/copy.js](src/helpers/copy.js)
- Copy-to-clipboard utilities

### [src/helpers/classNames.js](src/helpers/classNames.js)
- CSS class name composition utility

### [src/helpers/config.js](src/helpers/config.js)
- Configuration helpers

### [src/helpers/parseFlightData.js](src/helpers/parseFlightData.js)
- Parses Next.js Flight streaming data format

---

## Application Communication Flow

```
┌─────────────────────┐
│ Background Script   │  (Service Worker)
│  - Data Extraction  │
│  - Page Inspection  │
└──────────┬──────────┘
           │
           │ Message Passing
           │
    ┌──────┴──────┐
    │             │
┌───▼────────┐  ┌─▼────────────┐
│    App     │  │    Popup     │
│ (Full UI)  │  │ (Quick View) │
└────────────┘  └──────────────┘
```

---

## Configuration

### TypeScript Configuration

The project uses TypeScript for type-safe React components. Key configuration:

- **[global.d.ts](global.d.ts)** - Global type declarations for CSS modules
- **[tsconfig.json](tsconfig.json)** - TypeScript compiler configuration with strict mode enabled
- **Webpack CSS Module Loader** - Configured in `webpack.config.js` with `css-loader` modules option to handle `.module.css` files

### File Structure

```
src/
├── background/          # Background service worker script
├── app/                 # Main explorer application
│   ├── components/      # React components
│   ├── context/         # State management
│   ├── hooks/           # Custom hooks
├── popup/               # Popup application
└── helpers/             # Shared utilities
```

---

## Technologies Used

- **React 19.2.3** - UI framework for App and Popup
- **JavaScript** - Core scripting language
- **webextension-polyfill** - Cross-browser extension API compatibility
- **Webpack** - Module bundler with CSS Modules support
- **Babel** - JavaScript transpiler
- **CSS Modules** - Component-scoped styling

---

## License

This project is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details.
