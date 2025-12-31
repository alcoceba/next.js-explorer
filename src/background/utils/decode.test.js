import decode from './decode';
import parseFlightPushData from './parseFlightPushData';

jest.mock('./parseFlightPushData', () => jest.fn(() => 'parsed-flight'));

describe('decode', () => {
  it('returns parsed pagesRawData if present', () => {
    const result = decode({ pagesRawData: '{"foo":1}' });
    expect(result).toEqual({ foo: 1 });
  });

  it('throws if JSON.parse fails', () => {
    expect(() => decode({ pagesRawData: 'not-json' })).toThrow();
  });

  it('calls parseFlightPushData for appRawData', () => {
    const appRawData = ['a', ['b', 'c'], 123];
    const result = decode({ appRawData });
    expect(parseFlightPushData).toHaveBeenCalledWith('a\nb\nc');
    expect(result).toBe('parsed-flight');
  });

  it('returns null if neither pagesRawData nor appRawData', () => {
    expect(decode({})).toBeNull();
  });
});
