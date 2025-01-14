import styled from 'styled-components';
import { MyPageHeader } from '../../components/layout/MyPageHeader';
import { Outlet } from 'react-router-dom';

const MyPage = () => {
  return (
    <Container>
      <MyPageHeader />
      <Outlet />
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  gap: 2.625rem;
  max-width: 480px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  box-sizing: border-box;
  padding: 0 1.188rem;
`;
