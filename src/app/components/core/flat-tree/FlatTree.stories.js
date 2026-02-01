import FlatTree from './FlatTree';

export default {
  title: 'Core/FlatTree',
  component: FlatTree,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Data object to display as a tree',
    },
    search: {
      control: 'text',
      description: 'Search query string',
    },
    searchType: {
      control: 'select',
      options: ['keys', 'values', 'both'],
      description: 'Type of search to perform',
    },
    expandedPaths: {
      control: false,
      description: 'Set of expanded paths',
    },
    onTogglePath: {
      action: 'toggled',
      description: 'Toggle expansion handler',
    },
    showSizes: {
      control: 'boolean',
      description: 'Show object/string sizes',
    },
    onCopy: {
      action: 'copied',
      description: 'Copy handler',
    },
  },
};

const sampleData = {
  user: {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    address: {
      street: '123 Main St',
      city: 'New York',
      zip: '10001',
    },
    tags: ['admin', 'user', 'verified'],
  },
  settings: {
    theme: 'dark',
    notifications: true,
    language: 'en',
  },
};

const complexData = {
  response: {
    status: 200,
    data: {
      items: [
        { id: 1, name: 'Item 1', active: true },
        { id: 2, name: 'Item 2', active: false },
        { id: 3, name: 'Item 3', active: true },
      ],
      total: 3,
      page: 1,
    },
    meta: {
      timestamp: '2024-01-25T10:30:00Z',
      version: '1.0',
      requestId: 'abc123def456',
    },
  },
};

export const Default = {
  args: {
    data: sampleData,
    search: '',
    searchType: 'both',
    showSizes: false,
    expandedPaths: new Set(),
  },
};

export const WithExpandedPaths = {
  args: {
    data: sampleData,
    search: '',
    searchType: 'both',
    showSizes: false,
    expandedPaths: new Set(['user', 'user.address']),
  },
};

export const WithSizes = {
  args: {
    data: sampleData,
    search: '',
    searchType: 'both',
    showSizes: true,
    expandedPaths: new Set(['user']),
  },
};

export const SearchResults = {
  args: {
    data: sampleData,
    search: 'john',
    searchType: 'values',
    showSizes: false,
    expandedPaths: new Set(['user']),
  },
};

export const ComplexData = {
  args: {
    data: complexData,
    search: '',
    searchType: 'both',
    showSizes: false,
    expandedPaths: new Set(['response', 'response.data', 'response.data.items']),
  },
};

export const SearchInKeys = {
  args: {
    data: sampleData,
    search: 'address',
    searchType: 'keys',
    showSizes: false,
    expandedPaths: new Set(['user']),
  },
};

export const EmptyData = {
  args: {
    data: {},
    search: '',
    searchType: 'both',
    showSizes: false,
    expandedPaths: new Set(),
  },
};
