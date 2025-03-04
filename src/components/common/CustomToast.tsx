import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import theme from '../../style/theme';

export const CustomToast = () => {
  return (
    <StyledToastConatiner
      position="bottom-center"
      autoClose={500}
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
    width: auto;
    height: 1.6875rem;
    min-height: 1.6875rem;
    margin-bottom: 4.87rem;
    padding: 1rem;

    background: ${theme.color.main};
    border-radius: 0.22919rem;

    color: #fff;
    font-size: 0.6875rem;
  }

  .Toastify__toast-body {
    margin: 0;
    padding: 0;
  }

  .Toastify__toast--info {
    // info 토스트 디자인
  }

  .Toastify__toast--error {
    // error 토스트 디자인
    margin-top: 2rem;
    padding: 2rem 1rem;
    font-size: 0.8rem;
  }

  .Toastify__toast--success {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 21rem;
    height: 3.5625rem;
    min-height: 1.6875rem;
    max-height: 1.6875rem;
    margin-bottom: 4.87rem;
    padding: 1.5rem;

    background: #fff;
    border-radius: 0.75rem;
    border: 1px solid #6d6d6d;

    color: #000;
    font-size: 1rem;

    svg {
      fill: ${theme.color.main} !important;
    }
  }

  .Toastify__toast--warning {
    // warning 토스트 디자인
  }
`;
