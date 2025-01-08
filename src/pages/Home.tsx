import styled from 'styled-components';
import LOGO from '/image/yes.svg';
import { useNavigate } from 'react-router-dom';
import { HomeHeader } from '../components/layout/HomeHeader';
import Button from '../components/common/Button';
import theme from '../style/theme';

export const Home = () => {
  const navigate = useNavigate();

  const handleMakeInvitation = () => {
    navigate('/invitation/create');
  };

  return (
    <Container>
      <HomeHeader />
      <Logo src={LOGO} />
      <HomeButton color={theme.color.main} textColor="white" onClick={handleMakeInvitation}>
        초대장 만들기
      </HomeButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100vw;
  max-width: 480px;
  overflow-y: hidden;
`;

const Logo = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
`;

const HomeButton = styled(Button)`
  width: 90%;
  margin-bottom: 2.625rem;
`;
