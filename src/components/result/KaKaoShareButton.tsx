import kakaoshare from '../../assets/kakaoshare.svg';
import { useEffect } from 'react';
import { Container, ButtonImg } from './ShareButtonStyle';

const nickname = '공주';

const KakaoShareButton = ({ imgURL, size }: { imgURL: string; size: 'small' | 'big' }) => {
  const invitationURL = 'https://yourevents.site/' + window.location.pathname.split('/')[2];

  useEffect(() => {
    if (!window.Kakao) {
      console.error('Kakao SDK is not loaded.');
      return;
    }

    console.log('Kakao object exists:', window.Kakao);

    if (window.Kakao.isInitialized()) {
      console.log('Kakao SDK is already initialized');
    } else {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
      console.log('Kakao SDK initialized');
    }
  }, []);

  const shareToKakao = () => {
    if (!window.Kakao) {
      console.error('Kakao SDK is not loaded.');
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${nickname}로부터 초대장이 도착했어요!`,
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
    <Container size={size}>
      <ButtonImg size={size} onClick={shareToKakao}>
        <img src={kakaoshare} alt="카카오" />
      </ButtonImg>
      <div>카카오톡 공유</div>
    </Container>
  );
};

export default KakaoShareButton;
