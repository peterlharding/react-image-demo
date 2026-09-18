import { useEffect, useState, type ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';

import CropWorkbench from './CropWorkbench';

interface Upload {
  name: string;
  url: string;
}

const ImageUploadAndCrop = () => {
  const [upload, setUpload] = useState<Upload>();

  // An object URL pins the file in memory until revoked: release each one once it is replaced or the page unmounts.
  const url = upload?.url;
  useEffect(
    () => () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    },
    [url],
  );

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUpload({ name: file.name, url: URL.createObjectURL(file) });
    }
  };

  return (
    <>
      <h1 className="mb-4 text-primary">Upload and Crop an Image</h1>

      <Form.Group controlId="image-upload" className="mb-4" style={{ maxWidth: '32rem' }}>
        <Form.Label>Image file</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={onSelectFile} />
      </Form.Group>

      {upload ? (
        <CropWorkbench src={upload.url} alt={`Uploaded image ${upload.name}`} />
      ) : (
        <p className="text-body-secondary">Choose an image to start cropping.</p>
      )}
    </>
  );
};

export default ImageUploadAndCrop;
