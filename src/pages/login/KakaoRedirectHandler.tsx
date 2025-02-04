import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserInfo } from '../../atom/UserInfo';
import { setCookie } from '../../utils/cookies';

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();
  const [, setUserInfo] = useRecoilState(UserInfo);

  useEffect(() => {
    const code: string = new URL(window.location.href).searchParams.get('code') ?? '';
    /** 서버로 인가코드 전달(req) > 토큰 쿠키 저장 (res)
     * accessToken(액세스토큰) : 하루 만료기한
     */
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/login`, { code: code })
      .then((res) => {
        const { userId, socialId, nickname, accessToken } = res.data.result;
        setUserInfo({
          isLoggedIn: true,
          userId,
          socialId,
          nickname,
        });
        setCookie('accessToken', accessToken, {
          path: '/',
          maxAge: 24 * 60 * 60, // 하루
        });
        // 로그인 성공 후, 랜딩페이지 이동
        const redirectUrl = localStorage.getItem('redirectUrl') || '/home';
        navigate(redirectUrl, { replace: true });
        localStorage.removeItem('redirectUrl'); // 사용 후 저장된 URL 삭제
      })
      .catch((err) => {
        console.error('로그인 처리 중 에러 발생 : ' + err.response);
        navigate('/', { replace: true });
      });
  }, []);

  return <div></div>;
};

export default KakaoRedirectHandler;
