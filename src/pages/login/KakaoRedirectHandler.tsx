import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookies';

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 인가코드 추출출
    const code: string = new URL(window.location.href).searchParams.get('code') ?? '';
    const SERVER_URL = '임시서버URL';

    /** 서버로 인가코드 전달(req) > 토큰 쿠키 저장 (res)
     * accessToken(액세스토큰) : 1시간 만료기한 (임시)
     * refreshToken(리프레쉬토큰) : 7일 만료기한 (임시시)
     */
    axios
      .post(SERVER_URL, { code })
      .then((res) => {
        const { accessToken, refreshToken } = res.data;

        setCookie('accessToken', accessToken, {
          path: '/',
          maxAge: 60 * 60, // 1시간
        });
        setCookie('refreshToken', refreshToken, {
          path: '/',
          maxAge: 7 * 24 * 60 * 60, // 7일
        });

        // 로그인 성공 후, 랜딩페이지 이동
        navigate('/home', { replace: true });
      })
      .catch((err) => {
        console.log(code);
        alert('로그인 처리 중 에러 발생 : ' + err);
      });
  }, []);

  return <div></div>;
};

export default KakaoRedirectHandler;
