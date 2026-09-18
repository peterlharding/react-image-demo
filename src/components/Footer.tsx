import { Fragment } from 'react';
import { Link } from 'react-router';

import { navItems } from '../app/navigation';

const Footer = () => (
  <footer className="bg-light border-top py-4 text-center">
    <p className="mb-1">Sample project demonstrating image animation and image cropping</p>
    <p className="mb-1">
      {navItems.map(({ to, footerLabel }, i) => (
        <Fragment key={to}>
          {i > 0 && ' | '}
          <Link to={to}>{footerLabel}</Link>
        </Fragment>
      ))}
    </p>
    <p className="mb-0">
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/peterlharding/react-image-demo/">
        React Image Demo
      </a>
    </p>
  </footer>
);

export default Footer;
