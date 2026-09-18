import { Link } from 'react-router';

const NotFound = () => (
  <>
    <h1 className="mb-4">Page not found</h1>
    <p>
      There is nothing here. Go back to the <Link to="/">home page</Link>.
    </p>
  </>
);

export default NotFound;
