import { describe, expect, it } from 'vitest';

import { initialCrop, naturalRegion } from './crop';

describe('initialCrop', () => {
  it('centres a crop of the requested aspect and width', () => {
    const crop = initialCrop(16 / 9, 600, 900);
    expect(crop.unit).toBe('%');
    expect(crop.width).toBeCloseTo(30);
    // 30% of 600px is 180px wide, so 101.25px tall, which is 11.25% of 900px.
    expect(crop.height).toBeCloseTo(11.25);
    expect(crop.x).toBeCloseTo(35);
    expect(crop.y).toBeCloseTo((100 - 11.25) / 2);
  });
});

describe('naturalRegion', () => {
  it('scales a displayed-pixel crop to the source image', () => {
    const image = { naturalWidth: 1200, naturalHeight: 1800, width: 600, height: 900 };
    expect(naturalRegion({ unit: 'px', x: 10, y: 20, width: 160, height: 90 }, image)).toEqual({
      x: 20,
      y: 40,
      width: 320,
      height: 180,
    });
  });

  it('is the identity when the image is shown at its natural size', () => {
    const image = { naturalWidth: 602, naturalHeight: 905, width: 602, height: 905 };
    expect(naturalRegion({ unit: 'px', x: 1, y: 2, width: 3, height: 4 }, image)).toEqual({
      x: 1,
      y: 2,
      width: 3,
      height: 4,
    });
  });
});
