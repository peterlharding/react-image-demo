import Image from 'react-bootstrap/Image';

import cleo from '../assets/cleopatra.jpg';

const Home = () => (
  <>
    <h1 className="mb-4">Simple Image Display</h1>
    <Image src={cleo} alt="Cleopatra seated on a throne" fluid />
  </>
);

export default Home;
