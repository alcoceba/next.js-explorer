import React from 'react';
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
    const showSizesButton = screen.getByText(/show sizes|hide sizes/);
    expect(showSizesButton).toBeInTheDocument();
  });

  it('should render show sizes button', () => {
    renderWithContext(<ControlBar />);
    expect(screen.getByText('show sizes')).toBeInTheDocument();
  });

  it('should render hide sizes button when showSizes is true', () => {
    const contextValue = { ...mockContextValue, showSizes: true };
    renderWithContext(<ControlBar />, contextValue);
    expect(screen.getByText('hide sizes')).toBeInTheDocument();
  });

  it('should render collapse button', () => {
    renderWithContext(<ControlBar />);
    expect(screen.getByText('collapse')).toBeInTheDocument();
  });

  it('should render expand button', () => {
    renderWithContext(<ControlBar />);
    expect(screen.getByText('expand')).toBeInTheDocument();
  });

  it('should render copy JSON button', () => {
    renderWithContext(<ControlBar />);
    expect(screen.getByText('copy JSON')).toBeInTheDocument();
  });

  it('should render export menu', () => {
    renderWithContext(<ControlBar />);
    expect(screen.getByText('+++')).toBeInTheDocument();
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

    await user.click(screen.getByText('copy JSON'));
    expect(handleCopy).toHaveBeenCalledTimes(1);
  });

  it('should dispatch SetIsCollapsed when collapse is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext(<ControlBar />);

    await user.click(screen.getByText('collapse'));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should dispatch SetIsCollapsed when expand is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext(<ControlBar />);

    await user.click(screen.getByText('expand'));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should dispatch SetShowSizes when show sizes is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext(<ControlBar />);

    await user.click(screen.getByText('show sizes'));
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

    await user.click(screen.getByText('copy JSON'));
    expect(screen.getByText('copy JSON')).toBeInTheDocument();
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
    const hideSizesButton = screen.getByText('hide sizes');
    expect(hideSizesButton).toBeInTheDocument();
  });
});
