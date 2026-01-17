# Next.js Explorer - Application Architecture

This document describes the architecture, modules, and component structure of the Next.js Explorer browser extension.  
**For setup, installation, build, and workflow details, see [README.md](README.md) and [AGENTS.md](AGENTS.md).**

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

Main interface for exploring Next.js data.

### Component Organization

Components are organized by atomic design principles with three layers:

**Core Atomic Components** (`src/app/components/core/`):
- Self-contained, reusable components
- Examples: switch, loading, message, portal, truncated-text, viewer (with tree, key, value, search)

**Composite Components** (`src/app/components/`):
- Combine atomic components with feature-specific functionality
- Examples: Header, Footer, ControlBar, PageInfo

**Root/Layout Components**:
- App (root, manages global state)
- Theme (provides CSS theme variables)

---

## Popup

**Location:** [src/popup/](src/popup/)

Lightweight UI for quick Next.js app detection and navigation to the full explorer.

---

## Helper Modules

**Location:** [src/helpers/](src/helpers/)

Shared utilities for data parsing, context, tabs, object utilities, config, and more.

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

## Configuration & Technologies

- **TypeScript** for type safety ([tsconfig.json](tsconfig.json))
- **Prettier** for code formatting ([.prettierrc.json](.prettierrc.json))
- **ESLint** for linting ([eslint.config.mjs](eslint.config.mjs))
- **React 19** for UI
- **webextension-polyfill** for browser API
- **Webpack** for bundling
- **CSS Modules** for styling

---

## File Structure

See [README.md](README.md) and [AGENTS.md](AGENTS.md) for up-to-date file/folder structure and development workflow.

---

## License

This project is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details.
