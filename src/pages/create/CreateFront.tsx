import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InvitationHeader } from '../../components/layout/InvitationHeader';
import Button from '../../components/common/Button';
import theme from '../../style/theme';
import { template } from '../../data/Template';
import TextArea from '../../components/common/TextArea';
import { InvitationState, InvitationInfo } from '../../atom/InvitationInfo';
import { useRecoilState } from 'recoil';

const CreateFront = () => {
  const [invitation, setInvitation] = useRecoilState<InvitationState>(InvitationInfo);

  // 텍스트 초기화 함수
  const initializeTextValues = () => {
    return new Array(template[invitation.templateKey! as keyof typeof template].text_cnt).fill('');
  };

  // 텍스트 영역의 값 관리
  const [textValues, setTextValues] = useState<string[]>(
    invitation.contents || initializeTextValues(),
  );

  // (뒤로가기 후 되돌아기) 템플릿 변경 시 텍스트 초기화
  useEffect(() => {
    const newTextValues = initializeTextValues();
    setTextValues(newTextValues);

    setInvitation((prev) => ({
      ...prev,
      contents: newTextValues,
    }));
  }, [invitation.templateKey]);

  // 텍스트 입력을 처리하는 함수
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
    const charsPerLine = Math.floor(widthInPixels / (fontSize * 1)); // 글자당 1배의 공간을 가정
    const linesPerArea = Math.floor(heightInPixels / (fontSize * 1.2)); // 줄 높이 1.2배로 가정

    return charsPerLine * linesPerArea;
  };

  // 다음 단계로
  const handleNextButtonClick = () => {
    console.log('현재 저장 : ' + invitation);
    setInvitation((prev) => ({
      ...prev,
      step: 3,
    }));
  };

  return (
    <Container>
      <InvitationHeader />
      <MainContent>
        <MainTitle>초대장 앞면을 꾸며주세요!</MainTitle>
        <InvitationFront
          src={template[invitation.templateKey as keyof typeof template].template_src}
        >
          {template[invitation.templateKey as keyof typeof template].text_position_size.map(
            (el, index) => {
              const length = calculateMaxLength(el[2], el[3], 16);
              return (
                <InvitationText key={index} top={el[0]} left={el[1]}>
                  <TextArea
                    width={`${el[2]}px`}
                    height={`${el[3]}px`}
                    value={textValues[index]}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleTextChange(index, e.target.value)
                    }
                    maxLength={length}
                  />
                </InvitationText>
              );
            },
          )}
        </InvitationFront>
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
  flex-grow: 1;

  padding: 0 1.5rem;
  margin-top: 2.25rem;
  gap: 2.25rem;
`;

const MainTitle = styled.div`
  color: #3e3e3e;
  font-family: 'Pretendard';
  font-size: 18px;
  font-weight: 600;
  margin-left: 2rem;
  margin-right: auto;
`;

const InvitationFront = styled.div<{ src: string }>`
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  width: 321px;
  height: 401px;
  border-radius: 8px;
`;

const InvitationText = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
`;

const NextButton = styled(Button)`
  width: calc(100% - 1.5rem);
  max-width: 440px;
  margin: 0 auto;
`;
