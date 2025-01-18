import { getCookie } from '../utils/cookies';
import { useNavigate } from 'react-router-dom';
import DefaultError from '../components/error/DefaultError';

const ErrorPage = () => {
  const navigate = useNavigate();
  const handleBackStep = () => {
    const accessToken = getCookie('accessToken');
    if (accessToken == undefined) {
      // 토큰이 존재하지 않은 경우
      navigate('/', { replace: true });
    } else {
      // 토큰이 존재하는 경우
      navigate('/home', { replace: true });
    }
  };

  return (
    <DefaultError
      message="존재하지 않는 페이지입니다"
      btnText="돌아가기"
      onClick={handleBackStep}
    />
  );
};

export default ErrorPage;
