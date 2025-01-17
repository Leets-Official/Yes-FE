import styled from 'styled-components';
import { useState } from 'react';
import { InvitationHeader } from '../../components/layout/InvitationHeader';
import Button from '../../components/common/Button';
import theme from '../../style/theme';
import Input from '../../components/common/Input';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import { InvitationInfo, InvitationState } from '../../atom/InvitationInfo';
import { useResetStepState } from '../../hooks/useResetStepState';

const CreateNickName = () => {
  const [invitation, setInvitation] = useRecoilState<InvitationState>(InvitationInfo);
  const [isNotNull, setIsNotNull] = useState(-1); // -1 : 초기상태 , 0 : 유효성 검증 실패, 1 : 유효성 검증 성공

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
    setInvitation((prev) => ({ ...prev, nickname: nickname }));

    // 경고 문구 초기화
    if (nickname !== '') setIsNotNull(1);
    else setIsNotNull(0);
  };

  // 다음단계
  const handleNextButtonClick = () => {
    if (invitation.nickname === '') {
      setIsNotNull(0);
    } else {
      setIsNotNull(1);
      setInvitation((prev) => ({ ...prev, step: 1 }));
    }
  };

  useResetStepState();

  return (
    <Container>
      <InvitationHeader />
      <MainContent>
        <NicknameForm>
          <InputLabel>초대하는 사람의 정보를 입력해주세요</InputLabel>
          <InputField>
            <div>닉네임</div>
            <NicknameInput
              width={'95%'}
              height={'3rem'}
              value={invitation.nickname}
              onChange={handleInputChange}
              placeholder="10자 내로 작성해주세요."
              maxLength={10}
            />
            {isNotNull == 0 && (
              <ErrorPhrase>
                <IoAlertCircleOutline size={13} />
                <span>닉네임을 입력해주세요</span>
              </ErrorPhrase>
            )}
          </InputField>
        </NicknameForm>
      </MainContent>
      <NextButton
        color={theme.color.main}
        textColor="white"
        fullWidth={true}
        onClick={handleNextButtonClick}
      >
        다음
      </NextButton>
    </Container>
  );
};

export default CreateNickName;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  max-width: 480px;
  padding: 0 5%;
  box-sizing: border-box;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-grow: 1; /* 남은 공간을 차지하도록 설정 */
`;

const NicknameForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0 1.68rem;
  margin-top: 2.25rem;
  gap: 2.25rem;

  font-family: 'Pretendard';
`;

const InputLabel = styled.div`
  color: #3e3e3e;
  font-size: 18px;
  font-weight: 600;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 0.5rem;
  margin-left: 0.18rem;

  > div {
    font-weight: 400;
    font-size: 14px;
    color: #3e3e3e;
  }
`;

const NicknameInput = styled(Input)`
  width: 100%;
  margin: 0.5rem 0 0.813rem 0;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const ErrorPhrase = styled.div`
  display: flex;
  align-items: center;
  gap: 0.313rem;
  font-size: 0.875rem;
  font-weight: 500;
  > * {
    color: #ff8b8b;
  }
`;

const NextButton = styled(Button)`
  max-width: 440px;
  margin: 0 auto;
  margin-bottom: 2.625rem;
`;
