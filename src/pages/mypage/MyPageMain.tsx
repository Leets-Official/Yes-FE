import styled from 'styled-components';
import InvitationStats from '../../components/mypage/InvitationStats';
import { removeCookie } from '../../utils/cookies';
import { useNavigate } from 'react-router-dom';
import { useGetMyPageInfo } from '../../api/useGetMyPageInfo';

const MyPageMain = () => {
  const { user } = useGetMyPageInfo();
  const navigate = useNavigate();
  const handleLogout = () => {
    removeCookie('accessToken');
    navigate('/', { replace: true });
  };

  return (
    <UserBox>
      <UserName>{user.nickname}</UserName>
      <InvitationStats
        receivedInvitationCount={user.receivedInvitationCount}
        sentInvitationCount={user.sentInvitationCount}
      />
      <AccountControls>
        <AccountControl onClick={handleLogout}>로그아웃</AccountControl>
      </AccountControls>
    </UserBox>
  );
};

export default MyPageMain;

const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const UserName = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const AccountControls = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  gap: 2.063rem;
  margin-right: auto;
`;

const AccountControl = styled.div`
  color: #3e3e3e;
  font-weight: 400;
  cursor: pointer;
`;
