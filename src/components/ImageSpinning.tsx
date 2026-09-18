import cleo from '../assets/cleopatra.jpg';

const ImageSpinning = () => (
  <>
    <h1 className="mb-4">Image Spinning</h1>
    <div className="spin-stage d-flex align-items-center justify-content-center">
      <img src={cleo} className="app-logo" alt="Cleopatra, spinning" />
    </div>
  </>
);

export default ImageSpinning;
