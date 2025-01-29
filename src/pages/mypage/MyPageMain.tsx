import styled from 'styled-components';
import InvitationStats from '../../components/mypage/InvitationStats';
import { removeCookie } from '../../utils/cookies';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useResetRecoilState } from 'recoil';
import { UserInfo } from '../../atom/UserInfo';
import { useErrorBoundary } from 'react-error-boundary';
import { myPageInfoAPI } from '../../api';

const MyPageMain = () => {
  const resetUserInfo = useResetRecoilState(UserInfo);
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();
  const handleLogout = () => {
    removeCookie('accessToken');
    navigate('/', { replace: true });
  };

  const [user, setUser] = useState({
    nickname: '',
    receivedInvitationCount: 0,
    sentInvitationCount: 0,
  });

  useEffect(() => {
    myPageInfoAPI(resetUserInfo, showBoundary).then((res) => {
      if (res.isSuccess && res.result !== null) {
        setUser(res.result);
      }
    });
  }, []);

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
