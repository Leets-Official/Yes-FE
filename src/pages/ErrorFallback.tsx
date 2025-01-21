import DefaultError from '../components/error/DefaultError';
import { errorCode } from '../api/errorCode';

interface FallbackUIProps {
  error: any; // 실제 에러 객체
  resetErrorBoundary: () => void; // 에러 초기화 함수 (사용 X)
}

const ErrorFallback = ({ error }: FallbackUIProps) => {
  const { message, btn_message, action } = errorCode(error.name);
  return <DefaultError message={message} btnText={btn_message} onClick={action} />;
};

export default ErrorFallback;
