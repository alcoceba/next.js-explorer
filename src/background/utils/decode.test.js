import decode from './decode';
import parseFlightPushData from './parseFlightPushData';

jest.mock('./parseFlightPushData', () => jest.fn(() => 'parsed-flight'));

describe('decode', () => {
  beforeEach(() => {
    parseFlightPushData.mockClear();
  });

  it('returns parsed pagesRawData if present', () => {
    const result = decode({ pagesRawData: '{"foo":1}' });
    expect(result).toEqual({ foo: 1 });
  });

  it('throws if JSON.parse fails', () => {
    expect(() => decode({ pagesRawData: 'not-json' })).toThrow();
  });

  it('returns null if neither pagesRawData nor appRawData', () => {
    expect(decode({})).toBeNull();
  });

  // Legacy format: strings and arrays with string values
  it('calls parseFlightPushData for legacy appRawData format', () => {
    const appRawData = ['a', ['b', 'c'], 123];
    const result = decode({ appRawData });
    expect(parseFlightPushData).toHaveBeenCalledWith('abc');
    expect(result).toBe('parsed-flight');
  });

  // Next.js 16+ tuple format
  it('handles Next.js 16 tuple format with bootstrap [0] marker', () => {
    const appRawData = [[0], [1, 'data1'], [1, 'data2']];
    decode({ appRawData });
    expect(parseFlightPushData).toHaveBeenCalledWith('data1data2');
  });

  it('handles Next.js 16 text data chunks [1, string]', () => {
    const appRawData = [
      [1, 'text-chunk-1'],
      [1, 'text-chunk-2'],
    ];
    decode({ appRawData });
    expect(parseFlightPushData).toHaveBeenCalledWith('text-chunk-1text-chunk-2');
  });

  it('handles Next.js 16 binary base64 chunks [3, base64]', () => {
    // 'aGVsbG8=' is base64 for 'hello'
    const appRawData = [[3, 'aGVsbG8=']];
    decode({ appRawData });
    expect(parseFlightPushData).toHaveBeenCalledWith('hello');
  });

  it('handles mixed Next.js 16 format with text and binary chunks', () => {
    // 'd29ybGQ=' is base64 for 'world'
    const appRawData = [[0], [1, 'hello'], [3, 'd29ybGQ=']];
    decode({ appRawData });
    expect(parseFlightPushData).toHaveBeenCalledWith('helloworld');
  });

  it('skips form state chunks [2, ...]', () => {
    const appRawData = [
      [1, 'data'],
      [2, { formState: 'value' }],
      [1, 'more'],
    ];
    decode({ appRawData });
    expect(parseFlightPushData).toHaveBeenCalledWith('datamore');
  });

  it('handles invalid base64 gracefully', () => {
    const appRawData = [[3, 'invalid-base64!!!']];
    decode({ appRawData });
    // Should not throw, just skip invalid base64
    expect(parseFlightPushData).toHaveBeenCalled();
  });
});
