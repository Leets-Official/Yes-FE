import styled from 'styled-components';
import { InvitationHeader } from '../../components/layout/InvitationHeader';
import Button from '../../components/common/Button';
import theme from '../../style/theme';
import { template } from '../../data/Template';
import { InvitationState, InvitationInfo } from '../../atom/InvitationInfo';
import { useRecoilState } from 'recoil';
import { useResetStepState } from '../../hooks/useResetStepState';
import TemplateFront from '../../components/create/TemplateFront';
import ProgressBar from '../../components/common/ProgressBar';

const CreateFront = () => {
  const [invitation, setInvitation] = useRecoilState<InvitationState>(InvitationInfo);

  // 다음 단계로
  const handleNextButtonClick = () => {
    console.log('현재 저장 : ' + invitation);
    setInvitation((prev) => ({
      ...prev,
      step: 3,
    }));
  };

  useResetStepState();

  return (
    <Container>
      <InvitationHeader />
      <ProgressBar progress={invitation.step} />
      <MainContent>
        <MainTitle>초대장 앞면을 꾸며주세요!</MainTitle>
        <TemplateFront
          templateKey={invitation.templateKey as keyof typeof template}
          invitation={invitation}
          setInvitation={setInvitation}
        />
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

export default CreateFront;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  flex-grow: 1;

  margin-top: 1rem;
  gap: 1.75rem;
`;

const MainTitle = styled.div`
  color: #3e3e3e;
  font-family: 'Pretendard';
  font-size: 18px;
  font-weight: 600;
  margin-left: 0.25rem;
  margin-right: auto;
`;

const NextButton = styled(Button)`
  max-width: 440px;
  margin: 0 auto;
  margin-bottom: 2.625rem;
`;
