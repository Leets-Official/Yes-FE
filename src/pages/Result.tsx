import { useState } from 'react';
import styled from 'styled-components';
import InvitationFront from '../components/result/InvitationFront';
import InvitationBack from '../components/result/InvitationBack';
import ShareList from '../components/result/ShareList';
import { MyPageHeader } from '../components/layout/MyPageHeader';

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

const Result = () => {
  const [isTouched, setIsTouched] = useState(false);

  return (
    <Container>
      <MyPageHeader />
      <Title>초대장 생성 완료!</Title>
      <Card
        onClick={() => {
          setIsTouched((prev) => !prev);
        }}
        isTouched={isTouched}
      >
        <CardFront>
          <InvitationFront />
        </CardFront>

        <CardBack>
          <InvitationBack
            size="big"
            title={data['title']}
            date={data['date']}
            location={data['location']}
            description={data['description']}
          />
        </CardBack>
      </Card>
      <Description>초대장을 터치해주세요!</Description>
      <ShareList />
    </Container>
  );
};

export default Result;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  max-width: 480px;
  box-sizing: border-box;
  padding: 0 5%;
`;

const Title = styled.div`
  color: #3e3e3e;
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0.75rem;
`;

const Card = styled.div<{ isTouched: boolean }>`
  position: relative;
  width: 100vw;
  height: 500px;
  transform-style: preserve-3d;
  transition: transform 0.8s ease;
  transform: ${({ isTouched }) => (isTouched ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

const DefaultCardStyle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardFront = styled(DefaultCardStyle)``;

const CardBack = styled(DefaultCardStyle)`
  transform: rotateY(180deg);
`;

const Description = styled.div`
  color: #cfcdcd;
  font-size: 0.8125rem;
  font-weight: 500;
`;
