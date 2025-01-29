import styled from 'styled-components';

const StyledImg = styled.img`
  width: 21.375rem;
  height: 26.6875rem;
  border-radius: 0.5rem;
`;

const InvitationFront = ({ imgUrl }: { imgUrl: string }) => {
  //TODO: 경로를 동적으로 병경하도록 설정
  return <StyledImg src={imgUrl} alt="front" />;
};

export default InvitationFront;
