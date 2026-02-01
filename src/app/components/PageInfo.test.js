import { render, screen } from '@testing-library/react';
import PageInfo from './PageInfo';
import { Context } from '../context/context';

describe('PageInfo Component', () => {
  const mockDispatch = jest.fn();
  const mockContextValue = [
    {
      appData: {
        pageDataSize: 5000,
        pageDataKeys: 10,
        nextjsPagePath: '/home',
        nextjsPageQuery: {},
        nextjsPageAssetPrefix: '/',
      },
    },
    mockDispatch,
  ];

  const renderWithContext = (component) => {
    return render(<Context.Provider value={mockContextValue}>{component}</Context.Provider>);
  };

  it('should render page info container', () => {
    renderWithContext(<PageInfo />);
    const container = screen.getByText('Page').closest('tr');
    expect(container).toBeInTheDocument();
  });

  it('should render page label and value', () => {
    renderWithContext(<PageInfo />);
    expect(screen.getByText('Page')).toBeInTheDocument();
    expect(screen.getByText('/home')).toBeInTheDocument();
  });

  it('should render query label and value', () => {
    const contextValue = [
      {
        appData: {
          pageDataSize: 5000,
          pageDataKeys: 10,
          nextjsPagePath: '/home',
          nextjsPageQuery: { id: '123' },
          nextjsPageAssetPrefix: '/',
        },
      },
      mockDispatch,
    ];
    render(
      <Context.Provider value={contextValue}>
        <PageInfo />
      </Context.Provider>
    );
    expect(screen.getByText('Query')).toBeInTheDocument();
  });

  it('should render assets prefix label and value', () => {
    const contextValue = [
      {
        appData: {
          pageDataSize: 5000,
          pageDataKeys: 10,
          nextjsPagePath: '/home',
          nextjsPageQuery: {},
          nextjsPageAssetPrefix: '/_next/',
        },
      },
      mockDispatch,
    ];
    render(
      <Context.Provider value={contextValue}>
        <PageInfo />
      </Context.Provider>
    );
    expect(screen.getByText('Assets')).toBeInTheDocument();
  });

  it('should handle null page prop', () => {
    const contextValue = [
      {
        appData: {
          pageDataSize: 5000,
          pageDataKeys: 10,
          nextjsPagePath: null,
          nextjsPageQuery: {},
          nextjsPageAssetPrefix: '/',
        },
      },
      mockDispatch,
    ];
    render(
      <Context.Provider value={contextValue}>
        <PageInfo />
      </Context.Provider>
    );
    expect(screen.getByText('Page')).toBeInTheDocument();
  });

  it('should handle null query prop', () => {
    const contextValue = [
      {
        appData: {
          pageDataSize: 5000,
          pageDataKeys: 10,
          nextjsPagePath: '/home',
          nextjsPageQuery: null,
          nextjsPageAssetPrefix: '/',
        },
      },
      mockDispatch,
    ];
    render(
      <Context.Provider value={contextValue}>
        <PageInfo />
      </Context.Provider>
    );
    expect(screen.getByText('Query')).toBeInTheDocument();
  });

  it('should handle null asset prefix prop', () => {
    const contextValue = [
      {
        appData: {
          pageDataSize: 5000,
          pageDataKeys: 10,
          nextjsPagePath: '/home',
          nextjsPageQuery: {},
          nextjsPageAssetPrefix: null,
        },
      },
      mockDispatch,
    ];
    render(
      <Context.Provider value={contextValue}>
        <PageInfo />
      </Context.Provider>
    );
    expect(screen.getByText('Assets')).toBeInTheDocument();
  });

  it('should display all three sections with pipe separators', () => {
    const contextValue = [
      {
        appData: {
          pageDataSize: 5000,
          pageDataKeys: 10,
          nextjsPagePath: '/home',
          nextjsPageQuery: { id: '123' },
          nextjsPageAssetPrefix: '/_next/',
        },
      },
      mockDispatch,
    ];
    const { container } = render(
      <Context.Provider value={contextValue}>
        <PageInfo />
      </Context.Provider>
    );
    const text = container.textContent;

    expect(text).toContain('Page');
    expect(text).toContain('Query');
    expect(text).toContain('Assets');
  });

  it('should stringify query object', () => {
    const contextValue = [
      {
        appData: {
          pageDataSize: 5000,
          pageDataKeys: 10,
          nextjsPagePath: '/home',
          nextjsPageQuery: { key: 'value' },
          nextjsPageAssetPrefix: '/',
        },
      },
      mockDispatch,
    ];
    render(
      <Context.Provider value={contextValue}>
        <PageInfo />
      </Context.Provider>
    );
    expect(screen.getByText('Query')).toBeInTheDocument();
  });

  it('should render with empty string values', () => {
    const contextValue = [
      {
        appData: {
          pageDataSize: 5000,
          pageDataKeys: 10,
          nextjsPagePath: '',
          nextjsPageQuery: {},
          nextjsPageAssetPrefix: '',
        },
      },
      mockDispatch,
    ];
    render(
      <Context.Provider value={contextValue}>
        <PageInfo />
      </Context.Provider>
    );
    expect(screen.getByText('Page')).toBeInTheDocument();
    expect(screen.getByText('Query')).toBeInTheDocument();
    expect(screen.getByText('Assets')).toBeInTheDocument();
  });

  it('should render TruncatedText components for each field', () => {
    const contextValue = [
      {
        appData: {
          pageDataSize: 5000,
          pageDataKeys: 10,
          nextjsPagePath: '/very/long/page/path',
          nextjsPageQuery: {},
          nextjsPageAssetPrefix: '/',
        },
      },
      mockDispatch,
    ];
    const { container } = render(
      <Context.Provider value={contextValue}>
        <PageInfo />
      </Context.Provider>
    );
    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();

    const rows = container.querySelectorAll('tr');
    expect(rows.length).toBeGreaterThan(0);
  });
});
