import { useDispatch } from 'react-redux';

import { useRefreshMutation } from '../features/auth/authApiSlice';
import { setCredentials } from '../features/auth/authSlice';

export default function useRefreshCredentials() {
  const [refresh, { isLoading: isRefreshingToken }] = useRefreshMutation();
  const dispatch = useDispatch();

  return {
    refreshToken: async () => {
      const { accessToken } = await refresh().unwrap();
      dispatch(setCredentials({ accessToken }));
    },
    isRefreshingToken,
  };
}
