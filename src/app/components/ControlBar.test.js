import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ControlBar from './ControlBar';
import { Context } from '../context/context';

jest.mock('../utils/config', () => ({
  getShowSizes: jest.fn().mockResolvedValue({ sizes: true }),
  setShowSizes: jest.fn(),
}));

describe('ControlBar Component', () => {
  const mockDispatch = jest.fn();
  const mockContextValue = {
    theme: 'dark',
    showSizes: false,
    isCollapsed: false,
    appData: {
      nextjsRouter: 'app',
      nextjsVersion: '16.0.0',
      reactVersion: '18.0.0',
      nextjsPagePath: '/test',
      nextjsPageQuery: {},
      nextjsPageAssetPrefix: '/',
      pageDataSize: 1000,
      pageDataKeys: 5,
    },
    isSearching: false,
  };

  const renderWithContext = (component, contextValue = mockContextValue) => {
    return render(
      <Context.Provider value={[contextValue, mockDispatch]}>{component}</Context.Provider>
    );
  };

  beforeEach(() => {
    mockDispatch.mockClear();
    jest.clearAllMocks();
  });

  it('should render actions container', () => {
    renderWithContext(<ControlBar />);
    const showSizesButton = screen.getByRole('button', { name: /show sizes|hide sizes/i });
    expect(showSizesButton).toBeInTheDocument();
  });

  it('should render show sizes button', () => {
    renderWithContext(<ControlBar />);
    expect(screen.getByRole('button', { name: /show sizes/i })).toBeInTheDocument();
  });

  it('should render hide sizes button when showSizes is true', () => {
    const contextValue = { ...mockContextValue, showSizes: true };
    renderWithContext(<ControlBar />, contextValue);
    expect(screen.getByRole('button', { name: /hide sizes/i })).toBeInTheDocument();
  });

  it('should render collapse button', () => {
    renderWithContext(<ControlBar />);
    expect(screen.getByRole('button', { name: /collapse all/i })).toBeInTheDocument();
  });

  it('should render expand button', () => {
    renderWithContext(<ControlBar />);
    expect(screen.getByRole('button', { name: /expand all/i })).toBeInTheDocument();
  });

  it('should render copy JSON button', () => {
    renderWithContext(<ControlBar />);
    expect(screen.getByRole('button', { name: /copy JSON/i })).toBeInTheDocument();
  });

  it('should render export menu', () => {
    renderWithContext(<ControlBar onExport={jest.fn()} />);
    expect(screen.getByText('export raw')).toBeInTheDocument();
    expect(screen.getByText('export formatted')).toBeInTheDocument();
  });

  it('should render export raw option', () => {
    renderWithContext(<ControlBar />);
    expect(screen.getByText('export raw')).toBeInTheDocument();
  });

  it('should render export formatted option', () => {
    renderWithContext(<ControlBar />);
    expect(screen.getByText('export formatted')).toBeInTheDocument();
  });

  it('should call onCopy when copy JSON is clicked', async () => {
    const handleCopy = jest.fn();
    const user = userEvent.setup();

    renderWithContext(<ControlBar onCopy={handleCopy} />);

    await user.click(screen.getByRole('button', { name: /copy JSON/i }));
    expect(handleCopy).toHaveBeenCalledTimes(1);
  });

  it('should dispatch SetIsCollapsed when collapse is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext(<ControlBar />);

    await user.click(screen.getByRole('button', { name: /collapse all/i }));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should dispatch SetIsCollapsed when expand is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext(<ControlBar />);

    await user.click(screen.getByRole('button', { name: /expand all/i }));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should dispatch SetShowSizes when show sizes is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext(<ControlBar />);

    await user.click(screen.getByRole('button', { name: /show sizes/i }));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should call onExport with 0 when export raw is clicked', async () => {
    const handleExport = jest.fn();
    const user = userEvent.setup();

    renderWithContext(<ControlBar onExport={handleExport} />);

    await user.click(screen.getByText('export raw'));
    expect(handleExport).toHaveBeenCalledWith(0);
  });

  it('should call onExport with 2 when export formatted is clicked', async () => {
    const handleExport = jest.fn();
    const user = userEvent.setup();

    renderWithContext(<ControlBar onExport={handleExport} />);

    await user.click(screen.getByText('export formatted'));
    expect(handleExport).toHaveBeenCalledWith(2);
  });

  it('should handle undefined onCopy gracefully', async () => {
    const user = userEvent.setup();
    renderWithContext(<ControlBar />);

    await user.click(screen.getByRole('button', { name: /copy JSON/i }));
    expect(screen.getByRole('button', { name: /copy JSON/i })).toBeInTheDocument();
  });

  it('should handle undefined onExport gracefully', async () => {
    const user = userEvent.setup();
    renderWithContext(<ControlBar />);

    await user.click(screen.getByText('export raw'));
    expect(screen.getByText('export raw')).toBeInTheDocument();
  });

  it('should have show sizes button highlighted', () => {
    const contextValue = { ...mockContextValue, showSizes: true };
    renderWithContext(<ControlBar />, contextValue);
    const hideSizesButton = screen.getByRole('button', { name: /hide sizes/i });
    expect(hideSizesButton).toBeInTheDocument();
  });
});
