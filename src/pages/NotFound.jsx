import { NavLink } from 'react-router';

function NotFound() {
  return (
    <>
      <h2>Page not found</h2>

      <NavLink to="/">Go back home</NavLink>
    </>
  );
}

export default NotFound;
