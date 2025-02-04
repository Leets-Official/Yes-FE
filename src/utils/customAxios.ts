// utils/privateAxios.ts
import axios from 'axios';
import { getCookie, removeCookie } from './cookies';
import { toast } from 'react-toastify';

const redirectToLoginPage = () => {
  window.location.href = `http://localhost:3000/`; // 임시
};

const ADDRESS = import.meta.env.VITE_SERVER_URL;
const createPublicAxios = () => {
  return axios.create({
    baseURL: `${ADDRESS}`,
  });
};
const publicAxios = createPublicAxios();
const createPrivateAxios = (resetUserInfo: () => void) => {
  const instance = axios.create({
    baseURL: `${ADDRESS}`,
  });

  instance.interceptors.request.use(
    (config) => {
      const accessToken = getCookie('accessToken');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log(error.response.data);
      if (error.response && error.response.data.status === 401) {
        toast.error('로그인이 필요합니다. 로그인 페이지로 이동합니다.', {
          position: 'top-center',
          autoClose: 2000,
        });
        // 토큰 만료 또는 토큰 이상 시 재로그인 필요 (only error toast + redirect)
        resetUserInfo(); // 회원정보 초기화
        removeCookie('accessToken'); // 쿠키에서 accessToken 제거
        redirectToLoginPage(); // 로그인 페이지로 리다이렉트
      } else if (error.response.data.status === 500) {
        // 서버 에러 (only error 페이지)
        let err = new Error(error.response.data.message);
        err.name = error.response.data.code;
        throw err;
      } else {
        // 일반 에러 처리 (only error toast)
        const errorMessage = error.response.data.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
        let err = new Error(errorMessage);
        err.name = 'GENERAL';
        throw err;
      }
      throw Promise.reject(error);
    },
  );

  return instance;
};

// 로그인유저정보 Reset함수 매개변수 전달
const privateAxios = (resetUserInfo: () => void) => createPrivateAxios(resetUserInfo);
export { privateAxios, publicAxios };
