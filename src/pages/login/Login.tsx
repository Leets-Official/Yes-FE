import styled from 'styled-components';
import Button from '../../components/common/Button';
import theme from '../../style/theme';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const Login = () => {
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <Container>
      <LottieWrapper>
        <DotLottieReact
          src="https://lottie.host/86ced484-225b-440b-83cf-d99e3f1056c0/IejUx6FXJ1.lottie"
          autoplay
        />
      </LottieWrapper>
      <KakaoLoginButton color={theme.color.kakao} onClick={handleLogin}>
        카카오로 로그인하기
      </KakaoLoginButton>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100vh;
  width: 100vw;
  max-width: 480px;
  overflow: hidden;
`;

const LottieWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  bottom: -5rem;
`;

const KakaoLoginButton = styled(Button)`
  position: absolute;
  bottom: 2.625rem;
  width: 90%;
  z-index: 1;
`;
