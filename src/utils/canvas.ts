import { createCanvas } from '@napi-rs/canvas';

export const createColorPaletteImage = (colors: string[] | null | undefined): Buffer => {
  if (!colors || colors.length === 0) {
    throw new Error('No colors provided to create the palette image.');
  }

  const squareSize = 60;
  const gap = 20;

  const width = colors.length * squareSize + (colors.length - 1) * gap;
  const height = squareSize;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  colors.forEach((hex, index) => {
    const x = index * (squareSize + gap);

    ctx.fillStyle = hex;
    ctx.fillRect(x, 0, squareSize, squareSize);
  });

  return canvas.toBuffer('image/png');
};
