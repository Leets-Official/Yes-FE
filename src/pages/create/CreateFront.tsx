import { useState } from 'react';
import styled from 'styled-components';
import { InvitationHeader } from '../../components/layout/InvitationHeader';
import Button from '../../components/common/Button';
import theme from '../../style/theme';
import { template } from '../../data/Template';
import TextArea from '../../components/common/TextArea';

const CreateFront = () => {
  // 텍스트 영역의 값들을 저장할 상태 (배열로 관리)
  const [textValues, setTextValues] = useState<string[]>(
    new Array(template.EXAMPLE2.text_cnt).fill(''),
  );

  // 텍스트 입력을 처리하는 함수
  const handleTextChange = (index: number, value: string) => {
    const updatedValues = [...textValues];
    updatedValues[index] = value;
    setTextValues(updatedValues);
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
    console.log('다음');
    // recoil 템플릿 정보 저장
  };

  return (
    <Container>
      <InvitationHeader />
      <MainContent>
        <MainTitle>초대장 앞면을 꾸며주세요!</MainTitle>
        <InvitationFront src={template.EXAMPLE2.template_src}>
          {template.EXAMPLE2.text_position_size.map((el, index) => {
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
          })}
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
