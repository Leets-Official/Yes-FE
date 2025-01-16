import Button from '../components/common/Button';
import InvitationCard from '../components/common/InvitationCard';
import { MyPageHeader } from '../components/layout/MyPageHeader';
import theme from '../style/theme';
import styled from 'styled-components';

// 임시 데이터
const data = {
  id: 0,
  img: null,
  title: '연말파티 초대장',
  date: '2024.12.25',
  location: '강남역 어딘가',
  description: '몸만 와라 친구들아',
  made_date: '2024.12.14',
};

const ReceiveInvitation = () => {
  return (
    <Container>
      <MyPageHeader />
      <Title>*닉네임*님의 초대를 받았습니다</Title>
      <Description>참석여부를 위해 로그인 해주세요!</Description>
      <InvitationCard
        title={data.title}
        date={data.date}
        location={data.location}
        description={data.description}
      />
      <TouchMessage>초대장을 터치해보세요</TouchMessage>
      <LoginButton size="medium" color={theme.color.kakao} onClick={() => {}}>
        카카오로 로그인
      </LoginButton>
    </Container>
  );
};

export default ReceiveInvitation;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
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
  margin-top: 0.5rem;
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
