import { useState, useRef, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import usePersist from '../../hooks/usePersist';
import { selectCurrentToken } from './authSlice';
import { useRefreshMutation } from './authApiSlice';
import FullScreenLoader from '../../components/FullScreenLoader';

export default function PersistLogin() {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef();

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isSuccess, isLoading }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (error) {
          //silent fail
        }
      };

      if (!token && persist) {
        verifyRefreshToken();
      }
    }

    return () => (effectRan.current = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <FullScreenLoader />;

  if (!token)
    return (
      <Link
        to="/login"
        className="d-block text-danger text-center my-5 heading-1"
      >
        Please login again
      </Link>
    );

  return (
    <>
      {!persist && token && <Outlet />}
      {persist && isSuccess && trueSuccess && <Outlet />}
      {persist && token && isUninitialized && <Outlet />}
    </>
  );
}
