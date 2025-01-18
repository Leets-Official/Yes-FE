import { getCookie } from './cookies';

export const isAccessToken = () => {
  const accessToken = getCookie('accessToken');
  if (accessToken && accessToken !== undefined) {
    return true;
  }
  return false;
};
