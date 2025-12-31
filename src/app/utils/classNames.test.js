import { classNames } from './classNames';

describe('classNames', () => {
  it('joins truthy values with spaces', () => {
    expect(classNames('a', false, 'b', null, 'c')).toBe('a b c');
  });
});
