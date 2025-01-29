import { privateAxios } from '../utils/customAxios';

// 마이페이지 사용자 정보조회 API
export const myPageInfoAPI = async (
  resetUserInfo: () => void,
  showBoundary: (error: any) => void,
) => {
  const response = {
    isSuccess: false,
    message: '',
    result: null,
  };
  try {
    const result = await privateAxios(resetUserInfo).get('/mypage');
    response.isSuccess = true;
    response.message = result.data.message;
    response.result = result.data.result;
  } catch (error: any) {
    if (error.name !== 'GENERAL') {
      showBoundary(error);
    }
    response.isSuccess = false;
    response.message = error.message;
  }
  return response;
};

// 마이페이지 받은 초대장 조회 API
export const receivedInvatationListAPI = async (
  resetUserInfo: () => void,
  showBoundary: (error: any) => void,
) => {
  const response = {
    isSuccess: false,
    message: '',
    result: null,
  };
  try {
    const result = await privateAxios(resetUserInfo).get('/mypage/invitation/received');
    response.isSuccess = true;
    response.message = result.data.message;
    response.result = result.data.result;
  } catch (error: any) {
    if (error.name !== 'GENERAL') {
      showBoundary(error);
    }
    response.isSuccess = false;
    response.message = error.message;
  }
  return response;
};

// 마이페이지 보낸 초대장 조회 API
export const sendInvatationListAPI = async (
  resetUserInfo: () => void,
  showBoundary: (error: any) => void,
) => {
  const response = {
    isSuccess: false,
    message: '',
    result: null,
  };
  try {
    const result = await privateAxios(resetUserInfo).get('/mypage/invitation/sent');
    response.isSuccess = true;
    response.message = result.data.message;
    response.result = result.data.result;
  } catch (error: any) {
    if (error.name !== 'GENERAL') {
      showBoundary(error);
    }
    response.isSuccess = false;
    response.message = error.message;
  }
  return response;
};

// 마이페이지 상세 초대장 조회 API

// QR 조회 API
