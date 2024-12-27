import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookies';

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    /* 인가코드 추출*/
    const code: string = new URL(window.location.href).searchParams.get('code') ?? '';
    const SERVER_URL = '임시서버URL';

    /** 서버로 인가코드 전달*/
    axios
      .post(SERVER_URL, { code })
      .then((res) => {
        const { accessToken, refreshToken } = res.data;

        // 액세스 토큰 쿠키 저장 (사용자 인증)
        setCookie('accessToken', accessToken, {
          path: '/',
          maxAge: 60 * 60, // 1시간 (초)(임시)
        });
        // 리프레쉬 토큰 쿠키 저장 (액세스토큰 재발급)
        setCookie('refreshToken', refreshToken, {
          path: '/',
          maxAge: 7 * 24 * 60 * 60, // 7일 (임시)
        });

        /** 로그인 성공 > 랜딩페이지 이동 */
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
