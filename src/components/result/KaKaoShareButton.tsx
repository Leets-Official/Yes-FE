import styled from 'styled-components';
import kakaoshare from '../../assets/kakaoshare.svg';

const KakaoShareButton = () => {
  return (
    <Container>
      <Button>
        <img src={kakaoshare} alt="링크 복사" />
      </Button>
      <div>카카오톡 공유</div>
    </Container>
  );
};
export default KakaoShareButton;

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
