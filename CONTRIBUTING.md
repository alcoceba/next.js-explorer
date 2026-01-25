# Contributing to Next.js Explorer

Thank you for your interest in contributing to Next.js Explorer! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## Development Setup

- **Node.js 20+** is required
- Run `npm install` to install all dependencies
- Use `npm run watch:chrome` or `npm run watch:firefox` for development

## Code Style

This project uses automated tools to maintain consistent code style:

- **Prettier** for code formatting
- **ESLint** for JavaScript linting
- **Stylelint** for CSS linting

Before committing, run:

```bash
npm run lint:fix      # Fix ESLint issues
npm run format        # Format with Prettier
npm run stylelint:fix # Fix CSS issues
```

## Testing

All components should have corresponding test files (`.test.js`):

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode for development
npm run test:coverage # Generate coverage report
```

Ensure all tests pass before submitting a pull request.

## Component Development

Use Storybook for developing and documenting UI components:

```bash
npm run storybook     # Start Storybook on port 6006
```

When adding new components:

1. Create component file in appropriate directory
2. Create corresponding CSS Module (`.module.css`)
3. Create test file (`.test.js`)
4. Create Storybook story (`.stories.js`)

## Project Structure

- `src/app/components/core/` - Reusable atomic components
- `src/app/components/` - Feature-specific composite components
- `src/app/icons/` - SVG icon components
- `src/background/` - Extension background script
- `src/popup/` - Extension popup UI

For detailed architecture, see [ARCHITECTURE.md](ARCHITECTURE.md) and [AGENTS.md](AGENTS.md).

## Pull Request Process

1. Ensure your code follows the project's code style
2. Update documentation if needed
3. Add tests for new functionality
4. Ensure all tests pass
5. Update Storybook stories for UI changes
6. Submit a pull request with a clear description

## Commit Messages

Use clear, descriptive commit messages:

- `feat: add new component`
- `fix: resolve styling issue`
- `docs: update README`
- `refactor: improve code structure`

## Browser Testing

Test your changes in both supported browsers:

- **Chrome:** Load from `dist/chrome/`
- **Firefox:** Load from `dist/firefox/`

## Questions?

Open an issue for questions or discussions about contributing.

## License

By contributing, you agree that your contributions will be licensed under the BSD 3-Clause License.
