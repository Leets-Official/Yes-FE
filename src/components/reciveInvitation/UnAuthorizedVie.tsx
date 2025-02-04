import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import theme from '../../style/theme';
import Button from '../common/Button';
import InvitationCard from '../common/InvitationCard';
import { useGetInvitation } from '../../api/useGetInvitation';

const UnAuthorizedView = () => {
  const { invitationId } = useParams<{ invitationId: string }>();
  const { invitation } = useGetInvitation(invitationId || '');

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <Container>
      <Title>{invitation?.ownerNickname}님의 초대를 받았습니다</Title>
      <Description>참석여부를 위해 로그인 해주세요!</Description>

      <InvitationCard
        title={invitation?.title || ''}
        imgURL={invitation?.thumbnailUrl || ''}
        date={invitation?.schedule || ''}
        location={invitation?.location || ''}
        description={invitation?.remark || ''}
        // TODO: 컬러 값 수정 필요
        backgroundColor="#fff"
        fontColor="#000"
      />

      <TouchMessage>초대장을 터치해보세요</TouchMessage>

      <LoginButton
        size="medium"
        color={theme.color.kakao}
        onClick={() => {
          localStorage.setItem('redirectUrl', `/invitation/${invitationId}`);
          handleLogin();
        }}
      >
        카카오로 로그인
      </LoginButton>
    </Container>
  );
};

export default UnAuthorizedView;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90vw;
  max-width: 480px;
  overflow-y: hidden;
`;

const Title = styled.div`
  margin-top: 1rem;
  color: #3e3e3e;
  font-size: 1.25rem;
  font-weight: 600;
`;

const Description = styled.div`
  margin: 0.5rem 0 1.9rem 0;
  color: #787878;
  font-size: 0.875rem;
  font-weight: 500;
`;

const TouchMessage = styled.div`
  margin-bottom: 1.75rem;
  color: #cfcdcd;
  font-size: 0.8125rem;
  font-weight: 500;
`;

const LoginButton = styled(Button)`
  width: 90%;
  margin-bottom: 2.625rem;
`;
