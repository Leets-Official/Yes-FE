import { Outlet, useNavigate } from 'react-router-dom';
import { isAccessToken } from '../utils/isAccessToken';
import DefaultError from '../components/error/DefaultError';

export const PrivateRoutes = () => {
  const navigate = useNavigate();
  const isAuth = isAccessToken();

  const handleRedirectLogin = () => {
    if (!isAuth) {
      navigate('/', {
        replace: true,
      });
    }
  };

  return isAuth ? (
    <Outlet />
  ) : (
    <DefaultError
      message="로그인된 사용자만 접근가능합니다"
      btnText="로그인하러가기"
      onClick={handleRedirectLogin}
    />
  );
};
