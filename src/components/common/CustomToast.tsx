import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import theme from '../../style/theme';

/*
toast.success()
toast.error()
toast.info()
toast.warning()
toast() -> default, 현재 디자인 된 부분
*/

export const CustomToast = () => {
  return (
    <StyledToastConatiner
      style={{ maxWidth: '300px' }}
      position="bottom-center" // 토스트 메시지 위치 설정
      autoClose={500} // 자동 닫힘 시간 (밀리초)
      limit={1}
      hideProgressBar={true}
      theme="colored"
      closeButton={false}
    />
  );
};

export default CustomToast;

const StyledToastConatiner = styled(ToastContainer)`
  .Toastify__toast {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8.25rem;
    height: 1.6875rem;
    min-height: 1.6875rem;
    max-height: 1.6875rem;
    margin-bottom: 4.87rem;
    padding: 0;

    background: ${theme.color.main};
    border-radius: 0.22919rem;

    color: #fff;
    font-size: 0.6875rem;
  }

  .Toastify__toast-body {
    margin: 0;
    padding: 0;
  }

  .Toastify__toast--success {
    // success 토스트 디자인
  }

  .Toastify__toast--error {
    // error 토스트 디자인
  }

  .Toastify__toast--info {
    // info 토스트 디자인
  }

  .Toastify__toast--warning {
    // warning 토스트 디자인
  }
`;
