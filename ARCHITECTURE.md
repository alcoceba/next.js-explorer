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

### Component Architecture

Components are organized by complexity level following **atomic design principles**:

#### Core Atomic Components ([src/app/components/core/](src/app/components/core/))

Simple, reusable components with no dependencies on other custom components:

- **[switch/](src/app/components/core/switch/)** - Toggle checkbox for boolean inputs
- **[searchBox/](src/app/components/core/searchBox/)** - Controlled search input field
- **[loading/](src/app/components/core/loading/)** - Loading spinner and overlay display
- **[message/](src/app/components/core/message/)** - Notification/toast message component
- **[portal/](src/app/components/core/portal/)** - React portal wrapper for rendering outside DOM hierarchy
- **[table/](src/app/components/core/table/)** - Data table display for structured information
- **[viewer/](src/app/components/core/viewer/)** - Agnostic JSON tree visualizer
  - **[tree/](src/app/components/core/viewer/tree/)** - Recursive tree structure renderer
  - **[key/](src/app/components/core/viewer/key/)** - Object/array key renderer with collapsible functionality
  - **[value/](src/app/components/core/viewer/value/)** - Leaf value renderer with syntax highlighting

#### Composite Components

- **[Header.js](src/app/components/Header.js)** - Navigation header with title, version info, theme toggle, search
- **[Footer.js](src/app/components/Footer.js)** - Footer section with version display
- **[ControlBar.js](src/app/components/ControlBar.js)** - Toolbar controls for data manipulation

#### Root/Layout Components

- **[App.js](src/app/components/App.js)** - Root component managing global state
- **[Theme.js](src/app/components/Theme.js)** - Theme provider wrapper

### Folder Naming Convention

Folders use **camelCase** naming:
- Aligns with modern React project conventions
- Keeps folder names lowercase (modular structure)
- Component names remain PascalCase (e.g., `switch/Switch.js`)

### Key Components Details

#### [src/app/components/core/viewer/Viewer.js](src/app/components/core/viewer/Viewer.js)
- Agnostic JSON tree visualizer
- No Next.js-specific dependencies
- Reusable for any JSON data visualization
- Delegates rendering to Tree component

#### [src/app/components/core/viewer/tree/Tree.js](src/app/components/core/viewer/tree/Tree.js)
- Recursive tree structure renderer
- Combines Key and Value components
- Handles nested object/array expansion
- Manages tree hierarchy and collapse/expand state

#### [src/app/components/core/viewer/key/Key.js](src/app/components/core/viewer/key/Key.js)
- Renders object/array keys
- Provides collapsible functionality
- Calculates and displays object size with color-coding
- Shows key count and memory usage

#### [src/app/components/core/viewer/value/Value.js](src/app/components/core/viewer/value/Value.js)
- Renders primitive values (strings, numbers, booleans, null)
- Applies syntax highlighting based on type
- Provides copy-to-clipboard functionality
- Handles large value display

### Styling
- [src/app/index.css](src/app/index.css) - Global styles and theme variables (unified file)
- CSS Module files for component-scoped styling (`.module.css` pattern)
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
│   ├── components/      # React components using atomic design
│   │   ├── core/        # Reusable atomic components
│   │   │   ├── switch/
│   │   │   ├── searchBox/
│   │   │   ├── loading/
│   │   │   ├── message/
│   │   │   ├── portal/
│   │   │   ├── table/
│   │   │   └── viewer/  # Agnostic JSON tree visualizer
│   │   │       ├── tree/
│   │   │       ├── key/
│   │   │       └── value/
│   │   ├── Header.js, Footer.js, ControlBar.js
│   │   ├── App.js, Theme.js
│   ├── context/         # State management with Context API
│   ├── hooks/           # Custom hooks
│   └── index.css        # Global and theme styles (unified)
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
