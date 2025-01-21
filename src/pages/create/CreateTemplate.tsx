import { useState, useRef } from 'react';
import styled from 'styled-components';
import { InvitationHeader } from '../../components/layout/InvitationHeader';
import Button from '../../components/common/Button';
import theme from '../../style/theme';
import { useRecoilState } from 'recoil';
import { InvitationState, InvitationInfo } from './../../atom/InvitationInfo';
import TemplatePreview from '../../components/create/TemplatePreview';
import { useResetStepState } from '../../hooks/useResetStepState';

const CreateTemplate = () => {
  const [invitation, setInvitation] = useRecoilState<InvitationState>(InvitationInfo);

  const [isTemplate, setIsTemplate] = useState(invitation?.isTemplate); // 제공 템플릿 사용 여부
  const [selectedTemplate, setSelectedTemplate] = useState<string>(invitation?.templateKey || ''); // 현재 선택된 템플릿
  const [imageUrl, setImageUrl] = useState<string | null>(invitation?.imageUrl || ''); // 이미지 URL
  const [imageFile, setImageFile] = useState<File | null>(invitation?.imageFile || null); // 이미지 파일
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 템플릿 선택 핸들러 함수
  const handleTemplateClick = (templateKey: string) => {
    setSelectedTemplate(templateKey);
    setIsTemplate(true); // 템플릿 선택 상태
  };

  // 사용자 이미지 입력 핸들러 함수
  const handleInputClick = () => {
    fileInputRef.current?.click();
  };
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 1. 이미지 파일 저장
      setImageFile(file);
      // 2. 이미지 url 저장
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      // 3. 선택된 템플릿 > 사용자 이미지
      setIsTemplate(false);
    }
  };

  // 다음 단계로
  const handleNextButtonClick = () => {
    if (isTemplate) {
      // 템플릿 사용 상태 업데이트
      setInvitation((prev) => {
        const updatedState: InvitationState = {
          ...prev,
          isTemplate: true,
          templateKey: selectedTemplate,
          imageFile: undefined,
          imageUrl: '',
          step: 2,
        };
        return updatedState;
      });
    } else if (!isTemplate && (imageFile || imageUrl)) {
      // 사용자 이미지 사용 상태 업데이트
      setInvitation((prev) => {
        const updatedState: InvitationState = {
          ...prev,
          isTemplate: false,
          templateKey: '',
          imageFile: imageFile!,
          imageUrl: imageUrl!,
          step: 3,
        };
        return updatedState;
      });
    } else {
      console.error('유효한 템플릿 또는 이미지를 선택해주세요.');
    }
    console.log('Updated Invitation State:', invitation); // 확인용
  };

  useResetStepState();

  return (
    <Container>
      <InvitationHeader />
      <MainContent>
        <MainTitle>원하는 템플릿을 선택해주세요.</MainTitle>
        <SelectForm>
          <TemplatePreview
            isTemplate={isTemplate}
            selectedTemplate={selectedTemplate}
            inputRef={fileInputRef}
            imageUrl={imageUrl}
            handleTemplateClick={handleTemplateClick}
            handleInputClick={handleInputClick}
            handleImageFileChange={handleImageFileChange}
          />
        </SelectForm>
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

export default CreateTemplate;

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
  align-items: flex-start;
  width: 100%;
  flex-grow: 1;

  padding: 0 1.5rem;
  margin-top: 2.25rem;
  gap: 2.25rem;
`;

const MainTitle = styled.div`
  color: #3e3e3e;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  margin-left: 1rem;
`;

const SelectForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 2.1rem;
`;

const NextButton = styled(Button)`
  max-width: 440px;
  margin: 0 auto;
  margin-bottom: 2.625rem;
`;
