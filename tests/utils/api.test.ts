import { api } from '../../src/utils/api';
import { cache } from '../../src/utils/cache';
import { config } from '../../src/config';
import { logger } from '../../src/utils/logger';
import type { SearchEntry } from '../../src/types/database';
import { vi } from 'vitest';

const originalFetch = global.fetch;

describe('api utilities', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cache.clear();
    config.secretToken = undefined;
    global.fetch = originalFetch;
  });

  it('returns cached data without fetching', async () => {
    cache.set('en/test', { value: 1 });
    const fetchMock = vi.fn();
    // @ts-ignore
    global.fetch = fetchMock;

    const result = await api.get<{ value: number }>('test', 'en');
    expect(result).toEqual({ value: 1 });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('fetches data and caches it with secret token', async () => {
    config.secretToken = 'secret';
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ value: 2 }),
    });
    // @ts-ignore
    global.fetch = fetchMock;

    const result = await api.get<{ value: number }>('test', 'en');
    expect(result).toEqual({ value: 2 });
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('en/test'),
      { headers: { 'X-Secret-Token': 'secret' } }
    );
    expect(cache.get('en/test')).toEqual({ value: 2 });
  });

  it('handles non-ok response', async () => {
    const errSpy = vi.spyOn(logger, 'error').mockReturnValue();
    // @ts-ignore
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 });

    const result = await api.get('test', 'en');
    expect(result).toBeNull();
    expect(errSpy).toHaveBeenCalled();
  });

  it('handles json syntax error', async () => {
    const errSpy = vi.spyOn(logger, 'error').mockReturnValue();
    // @ts-ignore
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockRejectedValue(new SyntaxError('bad')),
    });

    const result = await api.get('test', 'en');
    expect(result).toBeNull();
    expect(errSpy).toHaveBeenCalledWith(
      expect.stringContaining('Syntax error')
    );
  });

  it('handles fetch failure', async () => {
    const errSpy = vi.spyOn(logger, 'error').mockReturnValue();
    // @ts-ignore
    global.fetch = vi.fn().mockRejectedValue(new Error('network'));

    const result = await api.get('test', 'en');
    expect(result).toBeNull();
    expect(errSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to fetch')
    );
  });

  it('search returns empty array when no data', async () => {
    // @ts-ignore
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 404 });

    const result = await api.search('en');
    expect(result).toEqual([]);
  });

  it('search filters by types', async () => {
    const data: SearchEntry[] = [
      { path: 'type1/foo', name: 'Foo' },
      { path: 'type2/bar', name: 'Bar' },
      { name: 'NoPath' },
    ];
    // @ts-ignore
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(data),
    });

    const result = await api.search('en', undefined, ['type1']);
    expect(result).toEqual([{ path: 'type1/foo', name: 'Foo' }]);
  });

  it('search filters by query', async () => {
    const data: SearchEntry[] = [
      { path: 'type1/foo', name: 'Alpha.*' },
      { path: 'type1/bar', name: 'Beta' },
    ];
    // @ts-ignore
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(data),
    });

    const result = await api.search('en', 'Alpha.*');
    expect(result).toEqual([{ path: 'type1/foo', name: 'Alpha.*' }]);
  });
});

