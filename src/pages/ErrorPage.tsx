import styled from 'styled-components';
import Button from '../components/common/Button';
import { BiSolidMessageError } from 'react-icons/bi';
import { getCookie } from '../utils/cookies';
import { useNavigate } from 'react-router-dom';
import theme from '../style/theme';

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
    <Container>
      <BiSolidMessageError color={theme.color.main} size={56} />
      <Phrase>존재하지 않는 페이지입니다.</Phrase>
      <Button
        onClick={handleBackStep}
        color="white"
        textColor="#3E3E3E"
        border="1.5px solid #C2C2C2"
        size="medium"
      >
        돌아가기
      </Button>
    </Container>
  );
};

export default ErrorPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 480px;
  height: 100vh;
`;

const Phrase = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;
