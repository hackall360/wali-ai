import { createCanvas } from '@napi-rs/canvas';

export const createColorPaletteImage = (colors: string[] | null | undefined): Buffer => {
  if (!colors || colors.length === 0) {
    throw new Error('No colors provided to create the palette image.');
  }

  const squareSize = 60;
  const gap = 20;

  const width = colors.length * squareSize + (colors.length - 1) * gap;
  const height = squareSize + 30;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  colors.forEach((hex, index) => {
    const x = index * (squareSize + gap);

    ctx.fillStyle = hex;
    ctx.fillRect(x, 0, squareSize, squareSize);

    ctx.fillStyle = 'white';
    ctx.fillText(hex, x + squareSize / 2, squareSize + 10);
  });

  return canvas.toBuffer('image/png');
}
