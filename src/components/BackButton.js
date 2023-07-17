import { Link } from 'react-router-dom';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';

export default function BackButton({ url }) {
  return (
    <div className="text-start py-3">
      <Link className="text-decoration-none" to={url}>
        <ArrowSmallLeftIcon height={30} />
      </Link>
    </div>
  );
}
