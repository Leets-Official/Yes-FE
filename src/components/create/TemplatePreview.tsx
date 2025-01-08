import React from 'react';
import styled from 'styled-components';
import { TbPhotoPlus } from 'react-icons/tb';
import theme from '../../style/theme';
import { template } from './../../data/Template';

interface TemplatePreviewProps {
  isTemplate: boolean;
  selectedTemplate?: string;
  inputRef: React.RefObject<HTMLInputElement>;
  imageUrl?: string | null;
  handleTemplateClick: (key: string) => void;
  handleInputClick: () => void;
  handleImageFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  isTemplate,
  selectedTemplate,
  inputRef,
  imageUrl,
  handleTemplateClick,
  handleInputClick,
  handleImageFileChange,
}) => {
  return (
    <PreviewContainer>
      <div className="previews">
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
      </div>
      <SelectContainer>
        <ImageList>
          <ImageItemBox onClick={handleInputClick}>
            <TbPhotoPlus color="white" strokeWidth={1.5} size={17} />
            <input
              type="file"
              ref={inputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleImageFileChange}
            />
          </ImageItemBox>
          {Object.keys(template).map((key, index) => (
            <ImageItemBox key={index} onClick={() => handleTemplateClick(key)}>
              <ImageItem src={template[key as keyof typeof template].template_src} />
            </ImageItemBox>
          ))}
        </ImageList>
      </SelectContainer>
    </PreviewContainer>
  );
};

export default TemplatePreview;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 0.75rem;

  > .previews {
    display: flex;
    gap: 0.9rem;
  }
`;

const Preview = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-right: auto;
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
