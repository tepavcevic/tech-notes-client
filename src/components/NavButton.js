import { NavLink } from 'react-router-dom';

export default function NavButton({ link, children }) {
  return (
    <NavLink
      to={link}
      end
      className={({ isActive }) =>
        `d-flex flex-lg-column gap-4 gap-lg-1 btn-link ${
          isActive ? 'text-danger' : ''
        }`
      }
    >
      {children}
    </NavLink>
  );
}
