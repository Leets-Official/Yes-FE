import Button from '../components/common/Button';
import Input from '../components/common/Input';
import InvitationCard from '../components/common/InvitationCard';
import Modal from '../components/common/Modal';
import { MyPageHeader } from '../components/layout/MyPageHeader';
import theme from '../style/theme';
import styled from 'styled-components';
import small_yes from '/image/small_yes.svg';
import speachBubble from '../assets/speachBubble.svg';
import { useState } from 'react';

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
  const [nickname, setNickname] = useState('');

  return (
    <Container>
      {/* TODO: 토큰 유무 확인 후 조건부 렌더링 */}
      {/* <Modal>
        <img src={small_yes} alt="logo" />
        <div>초대장 확인을 위해서 닉네임을 입력해주세요</div>
        <Input width="14.1875rem" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <ConfirmButton size="small" color={theme.color.main} textColor="#fff" onClick={() => {}}>
          확인
        </ConfirmButton>
      </Modal> */}

      <MyPageHeader />
      {/* <Title>*닉네임*님의 초대를 받았습니다</Title>
      <Description>참석여부를 위해 로그인 해주세요!</Description> */}

      <Title>우리 약속한 날에 만나자!</Title>
      <Bubble>
        <D_Day>
          <div>일정까지</div>
          <b>D-10</b>
        </D_Day>
        <img src={speachBubble} alt="speachBubble" />
      </Bubble>

      <InvitationCard
        title={data.title}
        date={data.date}
        location={data.location}
        description={data.description}
      />
      <TouchMessage>초대장을 터치해보세요</TouchMessage>

      {/* <LoginButton size="medium" color={theme.color.kakao} onClick={() => {}}>
        카카오로 로그인
      </LoginButton> */}
      {/* <ButtonList>
        <DeclineButton size="medium" color="#E6E6E6" textColor="#000" onClick={() => {}}>
          거절
        </DeclineButton>
        <AcceptButton size="medium" color={theme.color.main} textColor="#fff" onClick={() => {}}>
          yes!
        </AcceptButton>
      </ButtonList> */}

      <ButtonList>
        <MyAnswer>내 응답: yes!</MyAnswer>
        <AcceptButton size="medium" color={theme.color.main} textColor="#fff" onClick={() => {}}>
          yes!
        </AcceptButton>
      </ButtonList>
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
  margin: 0.5rem 0 1.9rem 0;
  color: #787878;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Bubble = styled.div`
  margin-top: 0.81rem;
  position: relative;
`;

const D_Day = styled.div`
  position: absolute;
  top: 36%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9375rem;
  font-weight: 600;
  gap: 0.38rem;
  width: 8.5855rem;

  b {
    font-size: 1.125rem;
    color: ${theme.color.main};
    padding-top: 0.03rem;
  }
`;

const TouchMessage = styled.div`
  margin-bottom: 1.75rem;
  color: #cfcdcd;
  font-size: 0.8125rem;
  font-weight: 500;
`;

const MyAnswer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10.5rem;
  height: 3.125rem;
  border: 1px solid #cfcdcd;
  border-radius: 0.5rem;
  color: #787878;
  font-weight: 600;
`;

const ButtonList = styled.div`
  display: flex;
  gap: 0.38rem;
`;

const ConfirmButton = styled(Button)`
  width: 5.5625rem;
  padding: 0.5rem 0;
`;

const LoginButton = styled(Button)`
  width: 90%;
  margin-bottom: 2.625rem;
`;

const DeclineButton = styled(Button)`
  width: 10.5rem;
  font-weight: 600;
`;

const AcceptButton = styled(Button)`
  width: 10.5rem;
  font-weight: 600;
`;
