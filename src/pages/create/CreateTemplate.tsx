import { useState, useRef } from 'react';
import styled from 'styled-components';
import { InvitationHeader } from '../../components/layout/InvitationHeader';
import Button from '../../components/common/Button';
import theme from '../../style/theme';
import { TbPhotoPlus } from 'react-icons/tb';
import { template } from './../../data/Template';
import { useRecoilState } from 'recoil';
import { InvitationState, InvitationInfo } from './../../atom/InvitationInfo';

const CreateTemplate = () => {
  const [invitation, setInvitation] = useRecoilState<InvitationState>(InvitationInfo);

  const [isTemplate, setIsTemplate] = useState(true); // 제공 템플릿 사용 여부
  const [selectedTemplate, setSelectedTemplate] = useState<string>(invitation?.templateKey || ''); // 현재 선택된 템플릿
  const [imageUrl, setImageUrl] = useState<string | null>(null); // 이미지 URL
  const [imageFile, setImageFile] = useState<File | null>(null); // 이미지 파일
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
        };
        return updatedState;
      });
    } else {
      console.error('유효한 템플릿 또는 이미지를 선택해주세요.');
    }
    console.log('Updated Invitation State:', invitation); // 확인용
  };

  return (
    <Container>
      <InvitationHeader />
      <MainContent>
        <MainTitle>원하는 템플릿을 선택해주세요.</MainTitle>
        <SelectForm>
          <PreviewContainer>
            <Preview>
              <PreviewFront
                src={
                  isTemplate
                    ? template[selectedTemplate as keyof typeof template]?.template_src ||
                      template.EXAMPLE.template_src
                    : imageUrl || ''
                }
                alt="템플릿이미지"
              />
              <p>앞면</p>
            </Preview>
            <Preview>
              <PreviewBack
                isTemplate={isTemplate}
                bgColor={
                  isTemplate
                    ? template[selectedTemplate as keyof typeof template]?.bg_color ||
                      template.EXAMPLE.bg_color
                    : 'white'
                }
              />
              <p>뒷면</p>
            </Preview>
          </PreviewContainer>
          <SelectContainer>
            <ImageList>
              <ImageItemBox onClick={handleInputClick}>
                <TbPhotoPlus color="white" strokeWidth={1.5} size={17} />
                {/* 파일 input 요소 (숨겨짐) */}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleImageFileChange}
                />
              </ImageItemBox>
              {Object.keys(template).map((key, index) => {
                return (
                  <ImageItemBox key={index} onClick={() => handleTemplateClick(key)}>
                    <ImageItem src={template[key as keyof typeof template].template_src} />
                  </ImageItemBox>
                );
              })}
            </ImageList>
          </SelectContainer>
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
  padding: 0 1rem 1.6rem 1rem;
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

const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  gap: 0.75rem;
`;

const Preview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

const PreviewFront = styled.img`
  width: 166px;
  height: 207px;
  border-radius: 8px;
`;

const PreviewBack = styled.div<{ isTemplate: boolean; bgColor: string }>`
  width: 166px;
  height: 207px;

  border-radius: 8px;
  border: ${(props) => (props.isTemplate ? 'none' : '1px solid #cfcdcd')};
  background-color: ${(props) => props.bgColor};
`;

const SelectContainer = styled.div`
  max-width: 90%;
  height: 4rem;
  padding: 0.5rem;
  margin-left: 1rem;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.color.main};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #ffffff; // 스크롤바 트랙(배경) 색상
  }
`;

const ImageList = styled.div`
  display: flex;
  gap: 1rem;
`;

const ImageItemBox = styled.div<{ onClick: React.MouseEventHandler<HTMLDivElement> }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 49px;
  height: 38px;
  border-radius: 8px;
  background-color: #787878;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const ImageItem = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

const NextButton = styled(Button)`
  width: calc(100% - 1.5rem);
  max-width: 440px;
  margin: 0 auto;
`;
