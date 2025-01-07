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
    <Container>
      {/* TODO: 헤더 */}
      <div>헤더</div>
      <b>
        초대장 뒷면에 들어갈 <br /> 상세정보를 입력해주세요!
      </b>
      <ButtonWrapper>
        <Button color={theme.color.main} textColor="#fff" fullWidth>
          초대장 생성하기
        </Button>
      </ButtonWrapper>

      <AlignCenter>
        <InvitationBack title={title} location={location} message={message} />
        <Gap>
          <Field>
            <label>제목</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>

          <Field>
            <label>일정</label>
            <DateInputWrapper>
              <DateInput />년 <DateInput />월 <DateInput />일 <DateInput />시 <DateInput />분
            </DateInputWrapper>
          </Field>

          <Field>
            <label>장소</label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </Field>

          <MessageField>
            <label>문구</label>
            <TextArea value={message} onChange={(e) => setMessage(e.target.value)} />
          </MessageField>
        </Gap>
      </AlignCenter>
    </Container>
  );
};

export default CreateBack;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
  margin-bottom: 6.12rem;
  font-weight: 500;

  input,
  textarea {
    font-weight: 500;
  }

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

const AlignCenter = styled(Container)`
  align-items: center;
  gap: 1.81rem;
  z-index: 0;
`;

const Gap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.06rem;
`;

const Field = styled.div`
  display: flex;
  gap: 1.69rem;
  align-items: center;
  font-size: 0.875rem;

  label {
    color: #3e3e3e;
  }
`;

const MessageField = styled(Field)`
  align-items: flex-start;
  div {
    margin-top: 1.06rem;
  }
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
  width: 15.125rem;
  height: 2.3125rem;
  padding: 1px 1.5rem;
  font-size: 0.875rem;
`;
