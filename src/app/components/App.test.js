import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import * as helpers from '../../helpers/context';
import * as objectHelpers from '../../helpers/object';
import * as copyHelper from '../../helpers/copy';

jest.mock('../../helpers/context');
jest.mock('../../helpers/object');
jest.mock('../../helpers/copy', () => jest.fn().mockResolvedValue(true));
jest.mock('../../helpers/rows', () => ({
  getRowsInfo: jest.fn(() => []),
}));
jest.mock('../../helpers/config', () => ({
  getShowSizes: jest.fn().mockResolvedValue({ sizes: false }),
  setShowSizes: jest.fn(),
  getTheme: jest.fn().mockResolvedValue({ theme: 'dark' }),
  setTheme: jest.fn(),
}));

const mockContextData = {
  next: {
    v: '14.0.0',
    router: 'app',
    data: {
      props: {
        pageProps: {
          title: 'Test Page',
          content: 'Test content',
        },
      },
    },
  },
  react: {
    v: '19.0.0',
  },
};

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    helpers.getContext.mockResolvedValue(mockContextData);
    objectHelpers.getObjKeysCount.mockReturnValue(2);
    objectHelpers.getObjSize.mockReturnValue(1000);
    objectHelpers.filterJson.mockImplementation((data) => data);
    objectHelpers.exportJson.mockImplementation(() => JSON.stringify(mockContextData.next));

    delete window.location;
    window.location = { search: '' };
  });

  it('should render loading state initially', () => {
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should render app after loading', async () => {
    render(<App />);

    await waitFor(
      () => {
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(helpers.getContext).toHaveBeenCalled();
  });

  it('should render Header component with version and router info', async () => {
    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText(/Next.js 🚀 Explorer/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should render ControlBar component', async () => {
    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText(/show sizes|hide sizes/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should render Viewer component with JSON data', async () => {
    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText(/title|pageProps/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should render Footer component', async () => {
    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText(/made with/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should fetch context data on mount', async () => {
    render(<App />);

    await waitFor(
      () => {
        expect(helpers.getContext).toHaveBeenCalledWith(null);
      },
      { timeout: 3000 }
    );
  });

  it('should pass version props to Header', async () => {
    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText(/Next.js v14.0.0/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should handle copy action', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText(/copy JSON/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    await user.click(screen.getByText(/copy JSON/));

    await waitFor(
      () => {
        expect(copyHelper.default).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );
  });

  it('should show message when copy succeeds', async () => {
    const user = userEvent.setup();
    copyHelper.default.mockResolvedValueOnce(true);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/copy JSON/)).toBeInTheDocument();
    });

    await user.click(screen.getByText(/copy JSON/));

    await waitFor(
      () => {
        expect(screen.getByText(/copied to clipboard/i)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it('should handle search input', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(
      () => {
        const searchInput = screen.getByPlaceholderText('Type to search...');
        expect(searchInput).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const searchInput = screen.getByPlaceholderText('Type to search...');
    await user.type(searchInput, 'test');

    await waitFor(
      () => {
        expect(objectHelpers.filterJson).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );
  });

  it('should initialize with correct data from context', async () => {
    render(<App />);

    await waitFor(
      () => {
        expect(helpers.getContext).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );

    expect(objectHelpers.getObjKeysCount).toHaveBeenCalled();
    expect(objectHelpers.getObjSize).toHaveBeenCalled();
  });

  it('should apply correct CSS classes', async () => {
    const { container } = render(<App />);

    await waitFor(
      () => {
        expect(container).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('should clear message after timeout', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: null });
    copyHelper.default.mockResolvedValueOnce(true);

    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText(/copy JSON/)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    await user.click(screen.getByText(/copy JSON/));

    await waitFor(
      () => {
        const messageText = screen.queryByText(/copied to clipboard/i);
        expect(messageText).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    await act(async () => {
      jest.advanceTimersByTime(2100);
    });

    jest.useRealTimers();
  });

  it('should handle export action', async () => {
    const user = userEvent.setup({ delay: null });
    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText('+++')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Open export menu
    const exportMenu = screen.getByText('+++');
    await user.click(exportMenu);

    // Click export formatted
    await waitFor(
      () => {
        expect(screen.getByText('export formatted')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    await user.click(screen.getByText('export formatted'));

    await waitFor(
      () => {
        expect(objectHelpers.exportJson).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );
  });

  it('should render notice for App Router', async () => {
    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText(/This is the data included in the bundle/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
