// useAuthenticatedApi.ts
import { useSelector } from 'react-redux';
import { useAuth } from '~/store/useAuth';

const useAuthenticatedApi = () => {
  const { user, tokens } = useAuth()

  const getAuthenticatedHeaders = () => {
    const headers = new Headers();
    if (tokens && tokens?.accessToken) {
      headers.set('authorization', tokens?.accessToken);
    }
    if (user && user._id) {
      headers.set('x-client-id', user._id);
    }
    headers.set('x-api-key', import.meta.env.VITE_API_KEY);

    return headers;
  };

  return {
    getAuthenticatedHeaders,
  };
};

export default useAuthenticatedApi;
