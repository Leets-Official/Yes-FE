import { privateAxios } from '../utils/customAxios';

// [ ex. Page 내 API 호출 시 필수 코드 ]
// const resetUserInfo = useResetRecoilState(UserInfo);
// const { showBoundary } = useErrorBoundary();

// const onClickButton = () => {
//   fetchAPI(resetUserInfo, showBoundary).then((res) => {
//     if (res.isSuccess) {
//       alert(res.message);       // res.isSuccess == true 인 경우 로직 작성
//     } else {
//       console.log(res.message); // res.isSuccess == false인 경우 로직 작성
//     }
//   });
// };

// EXAMPLE API (참조용으로 추후 삭제할 것!!!)
/**
 *
 * @param resetUserInfo    // 통신 중 토큰 만료 시, 저장된 userInfo 제거를 위함.
 * @param showBoundary     // 서버 에러(500)를 catch하여 에러컴포넌트 ErrorFallback을 보여주기 위함.
 * @returns
 */
export const fetchAPI = async (resetUserInfo: () => void, showBoundary: (error: any) => void) => {
  const body = { code: '' };

  const response = {
    isSuccess: false,
    message: '',
    result: null,
  };

  try {
    const result = await privateAxios(resetUserInfo).post('/invitation', body);
    if (result.status === 200) {
      response.isSuccess = true;
      response.result = result.data.result;
      response.message = result.data.message;
    }
  } catch (error: any) {
    if (error.name !== 'GENERAL') {
      // System Error (서버, 네트워크 에러)
      showBoundary(error); // ErrorBoundary로 전달
    } else {
      // General Error (get, post)
      console.log(error.message);
    }
    response.isSuccess = false;
    response.message = error.message;
  }
  return response;
};
