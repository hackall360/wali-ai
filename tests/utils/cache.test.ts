import { cache, contributors } from '../../src/utils/cache';

describe('cache utilities', () => {
  it('stores and retrieves values in cache', () => {
    cache.set('foo', 'bar');
    expect(cache.get('foo')).toBe('bar');
  });

  it('stores and retrieves contributor entries', () => {
    const id = '1234567890';
    const date = new Date();
    // @ts-expect-error - test uses plain string as Snowflake
    contributors.set(id, date);
    // @ts-expect-error - test uses plain string as Snowflake
    expect(contributors.get(id)).toBe(date);
  });
});
