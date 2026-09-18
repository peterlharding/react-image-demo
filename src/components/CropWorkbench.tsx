import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import Button from 'react-bootstrap/Button';
import ReactCrop, { convertToPixelCrop, type Crop, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { downloadCanvas, drawCrop, initialCrop } from '../lib/crop';

interface CropWorkbenchProps {
  src: string;
  alt: string;
  aspect?: number;
  downloadName?: string;
}

/** An image with a crop selection, a live preview of the selection, and a button to download it. */
const CropWorkbench = ({ src, alt, aspect = 16 / 9, downloadName = 'cropPreview.png' }: CropWorkbenchProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  // A new image (a fresh upload) gets a fresh selection once it has loaded and has a size.
  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const next = initialCrop(aspect, width, height);
    setCrop(next);
    setCompletedCrop(convertToPixelCrop(next, width, height));
  };

  useEffect(() => {
    if (completedCrop && imgRef.current && previewCanvasRef.current) {
      drawCrop(imgRef.current, previewCanvasRef.current, completedCrop);
    }
  }, [completedCrop]);

  const hasSelection = !!completedCrop?.width && !!completedCrop.height;

  return (
    <>
      <section className="mb-4">
        <h2 className="h4">Image to crop</h2>
        <ReactCrop
          crop={crop}
          aspect={aspect}
          onChange={(_, percentCrop) => {
            setCrop(percentCrop);
          }}
          onComplete={(pixelCrop) => {
            setCompletedCrop(pixelCrop);
          }}
        >
          <img ref={imgRef} src={src} alt={alt} onLoad={onImageLoad} style={{ maxWidth: '100%' }} />
        </ReactCrop>
      </section>

      <section className="mb-4">
        <h2 className="h4">Cropped section</h2>
        {/* Displayed at the selection's on-screen size; the backing store holds the full-resolution crop. */}
        <canvas
          ref={previewCanvasRef}
          data-testid="crop-preview"
          className={hasSelection ? 'd-block' : 'd-none'}
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
          }}
        />
        {!hasSelection && <p className="text-body-secondary">Drag on the image to select an area.</p>}
      </section>

      <p>You can download the cropped image.</p>
      <Button
        variant="primary"
        disabled={!hasSelection}
        onClick={() => {
          if (previewCanvasRef.current) {
            downloadCanvas(previewCanvasRef.current, downloadName);
          }
        }}
      >
        Download cropped image
      </Button>
    </>
  );
};

export default CropWorkbench;
