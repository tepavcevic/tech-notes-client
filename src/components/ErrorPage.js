import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="container-md py-5">
      <img src="assets/repairIcon.svg" alt="repair icon" />
      <h1 className="display-2 my-4">Oooops! Page not found...</h1>

      <Link to={'/dash'} className="btn btn-outline mt-4">
        Back to dash
      </Link>
    </div>
  );
}
