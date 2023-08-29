import { Link } from 'react-router-dom';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';

export default function BackButton({ to = -1 }) {
  return (
    <div className="text-start pt-3 pb-4">
      <Link className="text-decoration-none" to={to}>
        <ArrowSmallLeftIcon height={30} />
      </Link>
    </div>
  );
}
