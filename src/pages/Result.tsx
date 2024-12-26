import { useState } from 'react';
import styled from 'styled-components';
import InvitationFront from '../components/result/InvitationFront';
import InvitationBack from '../components/result/InvitationBack';
import ShareList from '../components/result/ShareList';

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

const Result = () => {
  const [isTouched, setIsTouched] = useState(false);

  return (
    <>
      <div>초대장 생성 완료!</div>
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
          <InvitationBack />
        </CardBack>
      </Card>
      <div>초대장을 터치해주세요!</div>
      <ShareList />
    </>
  );
};

export default Result;
