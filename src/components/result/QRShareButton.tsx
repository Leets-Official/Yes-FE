import styled from 'styled-components';
import QRshare from '../../assets/QRsahre.svg';

const QRShareButton = () => {
  return (
    <Container>
      <Button>
        <img src={QRshare} alt="링크 복사" />
      </Button>
      <div>QR 코드</div>
    </Container>
  );
};
export default QRShareButton;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.31rem;

  div {
    font-size: 0.75rem;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  img {
    width: 2.75rem;
    height: 2.75rem;
  }
`;
