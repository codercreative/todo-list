import { NavLink } from 'react-router';
import HeaderStyles from './Header.module.css';

function Header({ title }) {
  return (
    <header className={HeaderStyles.header}>
      <h1>{title}</h1>

      <nav className={HeaderStyles.nav}>
        <NavLink
          className={({ isActive }) =>
            isActive ? HeaderStyles.active : HeaderStyles.inactive
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? HeaderStyles.active : HeaderStyles.inactive
          }
          to="/about"
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
