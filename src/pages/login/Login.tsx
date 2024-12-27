import styled from 'styled-components';
import LOGO from '../../assets/image/yes.svg'; // 로고 SVG 파일을 import
import KakaoLoginButton from '../../components/login/KakaoLoginButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  overflow-y: hidden;
  box-sizing: border-box;
`;

const Logo = styled.img`
  margin-top: 90%;
  max-width: 100%;
  height: auto;
`;

const Login = () => {
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <Container>
      <Logo src={LOGO} />
      <KakaoLoginButton onClick={handleLogin} />
    </Container>
  );
};

export default Login;
