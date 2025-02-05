import kakaoshare from '../../assets/kakaoshare.svg';
import { useEffect } from 'react';
import { Container, ButtonImg } from './ShareButtonStyle';
import { useParams } from 'react-router-dom';

const checkName = (name: string) => {
  //name의 마지막 음절의 유니코드(UTF-16)
  const charCode = name.charCodeAt(name.length - 1);
  const consonantCode = (charCode - 44032) % 28;

  if (consonantCode === 0) {
    return `${name}로`;
  }
  return `${name}으로`;
};

const KakaoShareButton = ({
  ownerNickname,
  thumbnailUrl,
  size,
}: {
  ownerNickname: string;
  thumbnailUrl: string;
  size: 'small' | 'big';
}) => {
  const { invitationId } = useParams<{ invitationId: string }>();
  const invitationURL = 'https://yourevents.site' + `/invitation/${invitationId}`;

  useEffect(() => {
    if (!window.Kakao) {
      console.error('Kakao SDK is not loaded.');
      return;
    }

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
        title: `${checkName(ownerNickname)}부터 초대장이 도착했어요!`,
        imageUrl: thumbnailUrl,
        link: {
          webUrl: invitationURL,
        },
      },
      buttons: [
        {
          title: '초대장 확인하기',
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
