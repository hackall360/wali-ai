import { isSupportedLocale, truncateArray } from '../../src/utils/common.js';

describe('isSupportedLocale', () => {
  it('returns true for supported locale', () => {
    expect(isSupportedLocale('en')).toBe(true);
  });

  it('returns false for unsupported locale', () => {
    expect(isSupportedLocale('xx')).toBe(false);
  });
});

describe('truncateArray', () => {
  it('returns same array when length <= limit', () => {
    const arr = [1, 2, 3];
    expect(truncateArray(arr, 5)).toEqual(arr);
  });

  it('truncates array and appends count', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(truncateArray(arr, 3)).toEqual([1, 2, 3, 'and 2 more']);
  });
});
