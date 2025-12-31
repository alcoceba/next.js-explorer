import { sanitize } from './sanitize';

describe('sanitize', () => {
  it('removes script tags', () => {
    expect(sanitize('<script>alert(1)</script>abc')).not.toContain('script');
  });
});
