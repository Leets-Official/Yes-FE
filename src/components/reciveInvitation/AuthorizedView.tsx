import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useGetIsMine from '../../api/useGetIsMine';
import InvitationDetail from '../../pages/mypage/InvitationDetail';
import NotMine from './NotMine';

const AuthorizedView = () => {
  const { invitationId } = useParams<{ invitationId: string }>();
  const { data: isMine } = useGetIsMine(invitationId || '');

  return <Container>{isMine ? <InvitationDetail /> : <NotMine />}</Container>;
};

export default AuthorizedView;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90vw;
  max-width: 480px;
  overflow-y: hidden;
`;
