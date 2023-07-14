import { useState, useRef, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import usePersist from '../../hooks/usePersist';
import { selectCurrentToken } from './authSlice';
import { useRefreshMutation } from './authApiSlice';

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
        console.log('verifying refresh token');
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (error) {
          console.log(error);
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

  return (
    <>
      {!token && (
        <Link
          to="/login"
          className="d-block text-danger text-center my-5 heading-1"
        >
          Please login again
        </Link>
      )}
      {!persist && token && <Outlet />}
      {isLoading && <div>Loading...</div>}
      {persist && isSuccess && trueSuccess && <Outlet />}
      {persist && token && isUninitialized && <Outlet />}
    </>
  );
}
