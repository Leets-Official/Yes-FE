import { useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import InvitationBack from '../../components/result/InvitationBack';
import Button from '../../components/common/Button';
import theme from '../../style/theme';

const CreateBack = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  return (
    <InputContainer>
      {/* TODO: 헤더 */}
      <div>헤더</div>
      <b>
        초대장 뒷면에 들어갈 <br /> 상세정보를 입력해주세요!
      </b>
      <ButtonWrapper>
        <Button color={theme.color.main} textColor="#fff" fullWidth>
          다음
        </Button>
      </ButtonWrapper>
      <AlignCenter>
        <InvitationBack title={title} location={location} message={message} />
        <Gap>
          <InputField>
            <div>제목</div>
            <Input
              width={'18.125rem'}
              height={'2.3125rem'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputField>
          <InputField>
            <div>일정</div>
            <DateInputWrapper>
              <DateInput />년 <DateInput />월 <DateInput />일 <DateInput />시 <DateInput />분
            </DateInputWrapper>
          </InputField>
          <InputField>
            <div>장소</div>
            <Input
              width={'18.125rem'}
              height={'2.3125rem'}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </InputField>
          <InputField>
            <div>문구</div>
            <TextArea
              width={'18.125rem'}
              height={'7rem'}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </InputField>
        </Gap>
      </AlignCenter>
    </InputContainer>
  );
};

export default CreateBack;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.25rem;

  b {
    text-align: left;
  }
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 21.375rem;
`;

const AlignCenter = styled(InputContainer)`
  align-items: center;
  gap: 1.81rem;
  z-index: 0;
`;

const Gap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.06rem;
`;

const InputField = styled.div`
  display: flex;
  gap: 1.69rem;
`;

const DateInput = styled.input`
  width: 2rem;
  border: none;
  text-align: right;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const DateInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #cfcdcd;
  border-radius: 8px;
  width: 18.125rem;
  height: 2.3125rem;
  padding: 1px 2px;
  gap: 0.2rem;
`;
