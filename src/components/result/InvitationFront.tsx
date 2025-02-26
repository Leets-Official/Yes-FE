import { useState } from 'react';
import styled from 'styled-components';
import Skeleton from '../common/Skeleton';

const StyledImg = styled.img`
  width: 21.375rem;
  height: 26.6875rem;
  border-radius: 0.5rem;
  object-fit: cover;
`;

const InvitationFront = ({ imgURL }: { imgURL: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Skeleton width="21.375rem" height="26.6875rem" />}
      <StyledImg
        src={imgURL}
        alt="front"
        style={{ display: isLoading ? 'none' : 'block' }}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
};

export default InvitationFront;
