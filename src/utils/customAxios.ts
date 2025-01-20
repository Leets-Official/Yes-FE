// utils/privateAxios.ts
import axios from 'axios';
import { getCookie, removeCookie } from './cookies';
import { toast } from 'react-toastify';

let isToastVisible = false; // 전역 플래그 변수

// 토스트 메시지 표시 함수
const showToast = (message: string) => {
  if (!isToastVisible) {
    isToastVisible = true;
    toast.error(message);
    setTimeout(() => {
      isToastVisible = false;
    }, 3000);
  }
};

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
        showToast('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        // 토큰 만료 또는 토큰 이상 시 재로그인 필요
        resetUserInfo(); // 회원정보 초기화
        removeCookie('accessToken'); // 쿠키에서 accessToken 제거
        redirectToLoginPage(); // 로그인 페이지로 리다이렉트
      } else {
        // 일반 에러 처리
        const errorMessage = error.response.data?.message;
        if (errorMessage) {
          showToast(errorMessage);
        } else {
          showToast('알 수 없는 오류가 발생했습니다.');
        }
        throw error;
      }
      throw Promise.reject(error);
    },
  );

  return instance;
};

// 로그인유저정보 Reset함수 매개변수 전달
const privateAxios = (resetUserInfo: () => void) => createPrivateAxios(resetUserInfo);

export { privateAxios };
