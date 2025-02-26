import React, { useState } from 'react';
import styled from 'styled-components';
import { TbPhotoPlus } from 'react-icons/tb';
import { template } from './../../data/Template';
import Skeleton from '../common/Skeleton';

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
  const [isLoading, setIsLoading] = useState(true);

  return (
    <PreviewContainer>
      <div className="previews">
        <Preview>
          {isLoading && <Skeleton width="166px" height="207px" />}
          <PreviewFront
            src={
              isTemplate
                ? template[selectedTemplate as keyof typeof template]?.template_pre_src
                : imageUrl || ''
            }
            alt="템플릿이미지"
            isLoading={isLoading}
            onLoad={() => setIsLoading(false)}
          />
          <Text>앞면</Text>
        </Preview>
        <Preview>
          {isLoading && <Skeleton width="166px" height="207px" />}
          <PreviewBack
            isLoading={isLoading}
            isTemplate={isTemplate}
            bgColor={
              isTemplate ? template[selectedTemplate as keyof typeof template]?.bg_color : 'white'
            }
          />
          <Text>뒷면</Text>
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
              <ImageItem src={template[key as keyof typeof template].template_pre_src} />
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
  width: 100%;
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
  align-items: center;
`;

const PreviewFront = styled.img<{ isLoading: boolean }>`
  display: ${(props) => (props.isLoading ? 'none' : 'block')};
  width: 166px;
  height: 207px;
  border: 1px solid #676767;
  border-radius: 8px;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.25);
`;

const PreviewBack = styled.div<{ isLoading: boolean; isTemplate: boolean; bgColor: string }>`
  display: ${(props) => (props.isLoading ? 'none' : 'block')};
  width: 166px;
  height: 207px;
  border-radius: 8px;
  border: ${(props) => (props.isTemplate ? '1px solid #676767' : '1px solid #cfcdcd')};
  background-color: ${(props) => props.bgColor};
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.25);
`;

const Text = styled.p`
  margin-top: 0.5rem;
  font-size: 14px;
  color: #676767;
`;

const SelectContainer = styled.div`
  max-width: 90%;
  height: 4rem;
  padding: 0.5rem;
  margin-right: auto;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
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
  border: 1px solid #cfcdcd;
`;
