import { Link } from 'react-router-dom';

export default function DashHeader() {
  return (
    <header className="px-header border-bottom">
      <div className="container-md px-4">
        <Link to="/dash">
          <h1>Tech Notes</h1>
        </Link>

        <nav></nav>
      </div>
    </header>
  );
}
