export const mockHelpers = {
  copy: jest.fn().mockResolvedValue(true),
  calculateSize: jest.fn().mockReturnValue('1.2 KB'),
  formatValue: jest.fn((val) => String(val)),
  getClassNames: jest.fn((names) =>
    Object.keys(names)
      .filter((key) => names[key])
      .join(' ')
  ),
};

export const mockTabs = {
  query: jest.fn().mockResolvedValue([{ id: 1, url: 'http://localhost:3000' }]),
  sendMessage: jest.fn().mockResolvedValue({ success: true }),
};

export const mockRuntime = {
  sendMessage: jest.fn().mockResolvedValue({ success: true }),
};
