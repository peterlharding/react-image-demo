import cleo from '../assets/cleopatra.jpg';
import CropWorkbench from './CropWorkbench';

const ImageCrop = () => (
  <>
    <h1 className="mb-4">Image Crop</h1>
    <CropWorkbench src={cleo} alt="Cleopatra, to crop" />
  </>
);

export default ImageCrop;
