import { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InvitationHeader } from '../../components/layout/InvitationHeader';
import Button from '../../components/common/Button';
import theme from '../../style/theme';
import Input from '../../components/common/Input';
import { InvitationInfo, InvitationState } from '../../atom/InvitationInfo';
import { useResetStepState } from '../../hooks/useResetStepState';
import ErrorPhrase from '../../components/common/ErrorPhrase';
import useValidation from '../../hooks/useValidation';
import { UserInfo } from '../../atom/UserInfo';
import ProgressBar from '../../components/common/ProgressBar';

const CreateNickName = () => {
  const [invitation, setInvitation] = useRecoilState<InvitationState>(InvitationInfo);
  const user = useRecoilValue(UserInfo);
  const {
    value: nickname,
    isValid,
    handleInputChange,
    validate,
  } = useValidation(invitation.nickname);

  const handleNextButtonClick = () => {
    if (validate()) {
      setInvitation((prev) => ({ ...prev, nickname, step: 1 }));
    }
  };

  useEffect(() => {
    if (!invitation.nickname && user.nickname) {
      setInvitation((prev) => ({ ...prev, nickname: user.nickname }));
    }
  }, [user.nickname, invitation.nickname, setInvitation]);

  useResetStepState();

  return (
    <Container>
      <InvitationHeader />
      <ProgressBar progress={invitation.step} />
      <MainContent>
        <NicknameForm>
          <InputLabel>초대하는 사람의 정보를 입력해주세요</InputLabel>
          <InputField>
            <div>닉네임</div>
            <NicknameInput
              width={'95%'}
              height={'3rem'}
              value={nickname}
              onChange={handleInputChange}
              placeholder="10자 내로 작성해주세요."
              maxLength={10}
            />
            {isValid === 0 && <ErrorPhrase message="닉네임을 입력해주세요" />}
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
  margin-top: 1rem;
  gap: 2.25rem;
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

const NextButton = styled(Button)`
  max-width: 440px;
  margin: 0 auto;
  margin-bottom: 2.625rem;
`;
