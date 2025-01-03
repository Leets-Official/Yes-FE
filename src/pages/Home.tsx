import styled from 'styled-components';
import LOGO from '../assets/image/yes.svg';
import { useNavigate } from 'react-router-dom';
import { HomeHeader } from '../components/layout/HomeHeader';
import Button from '../components/common/Button';

export const Home = () => {
  const navigate = useNavigate();

  const handleMakeInvitation = () => {
    navigate('/invite'); // 임시 url
  };

  return (
    <Container>
      <HomeHeader />
      <Logo src={LOGO} />
      <HomeButton onClick={handleMakeInvitation}>초대장 만들기</HomeButton>
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
  width: 80%;
  margin: 2rem;
`;
