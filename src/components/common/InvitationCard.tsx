import { useState } from 'react';
import styled from 'styled-components';
import InvitationFront from '../result/InvitationFront';
import InvitationBack from '../result/InvitationBack';

const InvitationCard = ({
  imgUrl,
  title,
  imgURL,
  date,
  location,
  description,
  backgroundColor = '#fff',
  fontColor = '#000',
}: {
  imgUrl: string;
  title: string;
  imgURL: string;
  date: string;
  location: string;
  description: string;
  backgroundColor: string;
  fontColor: string;
}) => {
  const [isTouched, setIsTouched] = useState(false);

  return (
    <Card
      onClick={() => {
        setIsTouched((prev) => !prev);
      }}
      isTouched={isTouched}
    >
      <CardFront>
        <InvitationFront imgURL={imgURL} />
      </CardFront>

      <CardBack>
        <InvitationBack
          size="big"
          title={title}
          date={date}
          location={location}
          description={description}
          backgroundColor={backgroundColor}
          fontColor={fontColor}
        />
      </CardBack>
    </Card>
  );
};

export default InvitationCard;

const Card = styled.div<{ isTouched: boolean }>`
  position: relative;
  width: 21.375rem;
  height: 26.6875rem;
  margin: 0 0 1.9rem 0;
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
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.25);
`;

const CardFront = styled(DefaultCardStyle)``;

const CardBack = styled(DefaultCardStyle)`
  transform: rotateY(180deg);
`;
