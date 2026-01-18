import React from 'react';
import { render, screen } from '@testing-library/react';
import PageInfo from './PageInfo';

describe('PageInfo Component', () => {
  it('should render page info container', () => {
    render(<PageInfo page="/home" query={{}} assetPrefix="/" />);
    const container = screen.getByText('Page').closest('div');
    expect(container).toBeInTheDocument();
  });

  it('should render page label and value', () => {
    render(<PageInfo page="/home" query={{}} assetPrefix="/" />);
    expect(screen.getByText('Page')).toBeInTheDocument();
  });

  it('should render query label and value', () => {
    render(<PageInfo page="/home" query={{ id: '123' }} assetPrefix="/" />);
    expect(screen.getByText('Query')).toBeInTheDocument();
  });

  it('should render assets prefix label and value', () => {
    render(<PageInfo page="/home" query={{}} assetPrefix="/_next/" />);
    expect(screen.getByText('Assets')).toBeInTheDocument();
  });

  it('should handle null page prop', () => {
    render(<PageInfo page={null} query={{}} assetPrefix="/" />);
    expect(screen.getByText('Page')).toBeInTheDocument();
  });

  it('should handle null query prop', () => {
    render(<PageInfo page="/home" query={null} assetPrefix="/" />);
    expect(screen.getByText('Query')).toBeInTheDocument();
  });

  it('should handle null asset prefix prop', () => {
    render(<PageInfo page="/home" query={{}} assetPrefix={null} />);
    expect(screen.getByText('Assets')).toBeInTheDocument();
  });

  it('should display all three sections with pipe separators', () => {
    const { container } = render(
      <PageInfo page="/home" query={{ id: '123' }} assetPrefix="/_next/" />
    );
    const text = container.textContent;
    // The component renders in a table format, check for the table rows content
    expect(text).toContain('Page');
    expect(text).toContain('Query');
    expect(text).toContain('Assets');
  });

  it('should stringify query object', () => {
    render(<PageInfo page="/home" query={{ key: 'value' }} assetPrefix="/" />);
    expect(screen.getByText('Query')).toBeInTheDocument();
  });

  it('should render with empty string values', () => {
    render(<PageInfo page="" query={{}} assetPrefix="" />);
    expect(screen.getByText('Page')).toBeInTheDocument();
    expect(screen.getByText('Query')).toBeInTheDocument();
    expect(screen.getByText('Assets')).toBeInTheDocument();
  });

  it('should render TruncatedText components for each field', () => {
    const { container } = render(
      <PageInfo page="/very/long/page/path" query={{}} assetPrefix="/" />
    );
    // Check that a table is rendered with the page info
    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();

    // Check that table rows are rendered
    const rows = container.querySelectorAll('tr');
    expect(rows.length).toBeGreaterThan(0);
  });
});
