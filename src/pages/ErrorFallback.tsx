const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return <div onClick={resetErrorBoundary}>{error}</div>;
};

export default ErrorFallback;
