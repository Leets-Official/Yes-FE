import React, { useState } from 'react';
import styled from 'styled-components';
import TextArea from '../../components/common/TextArea';
import { template } from '../../data/Template';
import { InvitationInfo, InvitationState } from '../../atom/InvitationInfo';
import { useRecoilValue } from 'recoil';

interface TemplateFrontProps {
  templateKey: keyof typeof template;
  invitation: InvitationState;
  setInvitation: React.Dispatch<React.SetStateAction<InvitationState>>;
}

const TemplateFront: React.FC<TemplateFrontProps> = ({
  templateKey,
  invitation,
  setInvitation,
}) => {
  const { step } = useRecoilValue(InvitationInfo);
  // 텍스트 초기화 함수
  const initializeTextValues = () => {
    return new Array(template[templateKey].text_cnt).fill('');
  };

  const [textValues, setTextValues] = useState<string[]>(
    invitation.contents || initializeTextValues(),
  );

  // 텍스트 영역의 값 변경 처리 함수
  const handleTextChange = (index: number, value: string) => {
    const updatedValues = [...textValues];
    updatedValues[index] = value;
    setTextValues(updatedValues);

    setInvitation((prev) => ({
      ...prev,
      contents: updatedValues,
    }));
  };

  // 텍스트 영역의 크기에 맞는 maxLength 계산
  const calculateMaxLength = (width: number, height: number, fontSize: number = 16) => {
    const widthInPixels = width;
    const heightInPixels = height;

    // 한 글자의 평균 너비와 한 줄의 높이를 fontSize를 기준으로 계산
    const charsPerLine = Math.floor(widthInPixels / (fontSize * 0.6)); // 글자당 0.6배의 공간을 가정
    const linesPerArea = Math.floor(heightInPixels / (fontSize * 1.1)); // 줄 높이 1.1배로 가정

    return charsPerLine * linesPerArea;
  };

  return (
    <>
      <TemplateFrontContainer src={template[templateKey].template_src}>
        {template[templateKey].text_attr.map((el, index) => {
          const length = calculateMaxLength(el[2] as number, el[3] as number, el[4] as number);
          return (
            <InvitationText key={index} top={el[0] as number} left={el[1] as number}>
              <InvitationTextArea
                width={`${el[2]}px`}
                height={`${el[3]}px`}
                value={textValues[index]}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleTextChange(index, e.target.value)
                }
                maxLength={length}
                font={template[templateKey].font}
                fontSize={el[4] as number}
                fontColor={el[5] as string}
                step={step}
              />
            </InvitationText>
          );
        })}
      </TemplateFrontContainer>
    </>
  );
};

export default TemplateFront;

const TemplateFrontContainer = styled.div<{ src: string }>`
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  width: 321px;
  height: 401px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.25);
`;

const InvitationText = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
`;

const InvitationTextArea = styled(TextArea)<{
  font: string;
  fontSize: number;
  fontColor: string;
  step: number;
}>`
  overflow: hidden;
  background-color: inherit;
  padding: 0.2rem 0.25rem;
  box-sizing: border-box;
  text-align: center;
  font-size: 11px;
  border-radius: 4px;
  // 2단계 경우에만, textarea border 존재재
  border: ${(props) => (props.step == 2 ? '1px solid #787878' : 'none')};
  font-family: ${(props) => props.font};
  font-size: ${(props) => `${props.fontSize}px`};
  color: ${(props) => props.fontColor};
`;
