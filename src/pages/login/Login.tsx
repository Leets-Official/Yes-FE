import styled from 'styled-components';
import LOGO from '../../assets/image/yes.svg'; // 로고 SVG 파일을 import
import Button from '../../components/common/Button';

export const Login = () => {
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <Container>
      <Logo src={LOGO} />
      <KakaoLoginButton color="#ffe479" onClick={handleLogin}>
        카카오로 로그인하기
      </KakaoLoginButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100vw;
  max-width: 480px;
  overflow-y: hidden;
`;

const Logo = styled.img`
  margin-top: 90%;
  width: 100%;
  max-width: 200px;
  height: auto;
`;

const KakaoLoginButton = styled(Button)`
  width: 80%;
  margin: 2rem;
  font-weight: 400;
`;
