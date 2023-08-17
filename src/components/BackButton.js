import { Link } from 'react-router-dom';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';

export default function BackButton() {
  return (
    <div className="text-start pt-3 pb-4">
      <Link className="text-decoration-none" to={-1}>
        <ArrowSmallLeftIcon height={30} />
      </Link>
    </div>
  );
}
