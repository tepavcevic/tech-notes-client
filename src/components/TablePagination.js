import { useSearchParams } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

import { LIMIT } from '../config/noteOperations';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function TablePagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const pageCount = Math.ceil(count / LIMIT);

  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set('page', next);
    setSearchParams(searchParams);
  };
  const previousPage = () => {
    const previous = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set('page', previous);
    setSearchParams(searchParams);
  };

  if (pageCount <= 1) return null;

  return (
    <>
      <p className="pb-3 pt-4 m-0 text-end">
        Showing <span>{(currentPage - 1) * LIMIT + 1}</span> to{' '}
        <span>{currentPage === pageCount ? count : currentPage * LIMIT}</span>{' '}
        of <span>{count}</span> results
      </p>

      <div className="d-flex justify-content-end">
        <Pagination size="sm">
          <Pagination.Item
            className="d-flex gap3"
            onClick={previousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon height={16} /> <span>Previous</span>
          </Pagination.Item>
          <Pagination.Item
            onClick={nextPage}
            disabled={currentPage === pageCount}
          >
            <span>Next</span> <ChevronRightIcon height={16} />
          </Pagination.Item>
        </Pagination>
      </div>
    </>
  );
}
