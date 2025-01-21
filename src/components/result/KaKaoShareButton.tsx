import styled from 'styled-components';
import kakaoshare from '../../assets/kakaoshare.svg';
import { useEffect } from 'react';

const KakaoShareButton = ({ imgURL }: { imgURL: string }) => {
  const invitationURL = 'https://localhost:3000/' + window.location.pathname.split('/')[2];

  // Kakao SDK 초기화
  useEffect(() => {
    if (!window.Kakao) {
      console.error('Kakao SDK is not loaded.');
      return;
    }
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_KAKAO_JS_KEY);
      console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
    }
  }, []);

  // 메시지 공유 함수
  const shareToKakao = () => {
    if (!window.Kakao) {
      console.error('Kakao SDK is not loaded.');
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '친구로부터 초대장이 도착했어요!',
        description: '머라쓰지.....',
        imageUrl: imgURL,
        link: {
          webUrl: invitationURL,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            webUrl: invitationURL,
          },
        },
      ],
    });
  };

  return (
    <Container>
      <Button onClick={shareToKakao}>
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
