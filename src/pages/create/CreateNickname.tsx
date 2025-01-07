import styled from 'styled-components';
import { InvitationHeader } from '../../components/layout/InvitationHeader';
import Button from '../../components/common/Button';
import theme from '../../style/theme';
import Input from '../../components/common/Input';
import { useRecoilState } from 'recoil';
import { InvitationInfo, InvitationState } from '../../atom/InvitationInfo';

const CreateNickName = () => {
  const [invitation, setInvitation] = useRecoilState<InvitationState>(InvitationInfo);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
    setInvitation((prev) => ({ ...prev, nickname: nickname }));
  };

  // 다음단계
  const handleNextButtonClick = () => {
    setInvitation((prev) => ({ ...prev, step: 1 }));
  };

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
  padding: 0 1rem 1.6rem 1rem;
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
  padding: 0 1rem;
  box-sizing: border-box;
`;

const NextButton = styled(Button)`
  width: calc(100% - 1.5rem);
  max-width: 440px;
  margin: 0 auto;
`;
