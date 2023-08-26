import { NavLink } from 'react-router-dom';

export default function NavButton({ link, children }) {
  return (
    <NavLink
      to={link}
      end
      className={({ isActive }) =>
        `d-flex align-items-center flex-lg-column gap-4 gap-lg-1 header-btn ${
          isActive ? 'text-danger' : ''
        }`
      }
    >
      {children}
    </NavLink>
  );
}
