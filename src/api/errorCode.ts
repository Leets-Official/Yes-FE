export const errorCode = (code: string) => {
  // 500 (서버 에러 발생 시, error-page에 적용될 객체)
  const errorMap = {
    INVITATION_NOT_FOUND: {
      message: '존재하지 않는 초대장입니다.',
      btn_message: '뒤로가기',
      action: () => window.history.back(),
    },
    INTERNAL_SERVER_ERROR: {
      message: '서버 오류가 발생했습니다.',
      btn_message: '새로고침',
      action: () => window.location.reload(),
    },
    default: {
      message: '예상치 못한 에러가 발생했습니다.',
      btn_message: '다시시도',
      action: () => window.location.reload(),
    },
  };

  if (code in errorMap) {
    return errorMap[code as keyof typeof errorMap];
  }

  return errorMap.default;
};
