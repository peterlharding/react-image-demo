import { centerCrop, makeAspectCrop, type PixelCrop } from 'react-image-crop';

/**
 * The initial selection: a centred crop of the given aspect ratio, `widthPercent` of the image wide.
 * Expressed in percent so it stays put if the image is laid out at a different size.
 */
export function initialCrop(aspect: number, width: number, height: number, widthPercent = 30) {
  return centerCrop(makeAspectCrop({ unit: '%', width: widthPercent }, aspect, width, height), width, height);
}

/**
 * The region of the source image, in natural (file) pixels, covered by `crop`.
 * `crop` is in the displayed image's CSS pixels, as ReactCrop reports it.
 */
export function naturalRegion(
  crop: PixelCrop,
  image: Pick<HTMLImageElement, 'naturalWidth' | 'naturalHeight' | 'width' | 'height'>,
) {
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  return {
    x: Math.round(crop.x * scaleX),
    y: Math.round(crop.y * scaleY),
    width: Math.round(crop.width * scaleX),
    height: Math.round(crop.height * scaleY),
  };
}

/**
 * Draw the cropped region of `image` onto `canvas` at the source image's full resolution,
 * so the download keeps every pixel of the original.
 */
export function drawCrop(image: HTMLImageElement, canvas: HTMLCanvasElement, crop: PixelCrop) {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context is unavailable');
  }
  const region = naturalRegion(crop, image);
  canvas.width = Math.max(1, region.width);
  canvas.height = Math.max(1, region.height);
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(image, region.x, region.y, region.width, region.height, 0, 0, canvas.width, canvas.height);
}

/** Save the canvas contents as a PNG file via a temporary download link. */
export function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  canvas.toBlob((blob) => {
    if (!blob) {
      return;
    }
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    anchor.click();
    // Revoke on the next task so the browser has started the download first.
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 0);
  }, 'image/png');
}
