import { NavLink } from 'react-router-dom';

export default function NavButton({ link, children }) {
  return (
    <NavLink
      to={link}
      end
      className={({ isActive }) =>
        `d-flex flex-column btn-link ${isActive ? 'text-danger' : ''}`
      }
    >
      {children}
    </NavLink>
  );
}
