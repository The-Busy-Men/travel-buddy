export const interpolateColor = (
  color1: string,
  color2: string,
  factor: number,
) => {
  const rgb1 = parseInt(color1.slice(1), 16);
  const rgb2 = parseInt(color2.slice(1), 16);

  const r1 = (rgb1 >> 16) & 0xff;
  const g1 = (rgb1 >> 8) & 0xff;
  const b1 = rgb1 & 0xff;

  const r2 = (rgb2 >> 16) & 0xff;
  const g2 = (rgb2 >> 8) & 0xff;
  const b2 = rgb2 & 0xff;

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};
