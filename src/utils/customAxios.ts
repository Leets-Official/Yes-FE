// utils/privateAxios.ts
import axios from 'axios';
import { getCookie, removeCookie } from './cookies';

const redirectToLoginPage = () => {
  window.location.href = `https://localhost:3000/login`; // 임시
};

const ADDRESS = import.meta.env.VITE_SERVER_URL;

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
    (response) => response.data,
    async (error) => {
      if (error.response && error.response.data.httpStatus === 401) {
        // 토큰 만료 또는 토큰 이상 시 재로그인 필요
        resetUserInfo(); // 회원정보 초기화
        removeCookie('accessToken'); // 쿠키에서 accessToken 제거
        redirectToLoginPage(); // 로그인 페이지로 리다이렉트
      } else {
        const customError = new Error(
          error.response?.data?.message || '알 수 없는 에러가 발생하였습니다',
        );
        customError.name = `${error.response?.data.code || 'UNKNOWN_ERROR'}`;
        throw customError; // ErrorBoundary로 전달될 에러
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

// 로그인유저정보 Reset함수 매개변수 전달
const privateAxios = (resetUserInfo: () => void) => createPrivateAxios(resetUserInfo);

export { privateAxios };
