import styled from 'styled-components';

const StyledImg = styled.img`
  width: 21.375rem;
  height: 26.6875rem;
  border-radius: 0.5rem;
`;

const InvitationFront = ({ imgURL }: { imgURL: string }) => {
  return <StyledImg src={imgURL} alt="front" />;
};

export default InvitationFront;
