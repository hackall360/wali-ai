import { vi } from 'vitest';

vi.mock('@napi-rs/canvas', () => ({
  createCanvas: vi.fn((width, height) => ({
    getContext: () => ({ fillStyle: '', fillRect: vi.fn() }),
    toBuffer: () => Buffer.from('image'),
  })),
}));

import { createColorPaletteImage } from '../../src/utils/canvas';
import { createCanvas } from '@napi-rs/canvas';

describe('createColorPaletteImage', () => {
  it('creates an image from provided colors', () => {
    const buf = createColorPaletteImage(['#ff0000', '#00ff00']);
    expect(Buffer.isBuffer(buf)).toBe(true);
    expect(createCanvas).toHaveBeenCalledWith(140, 60);
  });

  it('throws if colors are missing', () => {
    expect(() => createColorPaletteImage(null)).toThrow('No colors provided');
    expect(() => createColorPaletteImage([])).toThrow('No colors provided');
  });
});

