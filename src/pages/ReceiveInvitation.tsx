import { MyPageHeader } from '../components/layout/MyPageHeader';
import styled from 'styled-components';
import { isAccessToken } from '../utils/isAccessToken';
import AuthorizedView from '../components/reciveInvitation/AuthorizedView';
import UnAuthorizedView from '../components/reciveInvitation/UnauthorizedView';

const ReceiveInvitation = () => {
  const isAuth = isAccessToken();

  return (
    <Container>
      <MyPageHeader />
      {isAuth ? <AuthorizedView /> : <UnAuthorizedView />}
    </Container>
  );
};

export default ReceiveInvitation;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90vw;
  max-width: 480px;
  overflow-y: hidden;
`;
