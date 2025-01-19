import { useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import InvitationBack from '../../components/result/InvitationBack';
import Button from '../../components/common/Button';
import theme from '../../style/theme';
import { InvitationHeader } from '../../components/layout/InvitationHeader';
import { useResetStepState } from '../../hooks/useResetStepState';

type DateField = 'year' | 'month' | 'day' | 'hour' | 'minute';

const CreateBack = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
  });

  // TODO: 세션 스토리지에 저장된 값 가져오기
  const backgroundColor = '#fff';
  const fontColor = '#000';

  const formattedDate = [
    date.year && `${date.year}년`,
    date.month && `${date.month}월`,
    date.day && `${date.day}일`,
    date.hour && `${date.hour}시`,
    date.minute && `${date.minute}분`,
  ]
    .filter(Boolean)
    .join(' ');

  const handleDateChange = (field: DateField) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  useResetStepState();

  return (
    <Container>
      <InvitationHeader />
      <b>
        초대장 뒷면에 들어갈 <br /> 상세정보를 입력해주세요!
      </b>
      <ButtonWrapper>
        {/* TODO: onClick 함수 수정 */}
        <Button color={theme.color.main} textColor="#fff" fullWidth onClick={() => {}}>
          초대장 생성하기
        </Button>
      </ButtonWrapper>

      <AlignCenter>
        <InvitationBack
          isInput
          size="small"
          title={title}
          location={location}
          description={description}
          date={formattedDate}
          backgroundColor={backgroundColor}
          fontColor={fontColor}
        />
        <Gap>
          <Field>
            <label>제목</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>

          <Field>
            <label>일정</label>
            <DateInputWrapper>
              <DateInput type="number" value={date.year} onChange={handleDateChange('year')} /> 년
              <DateInput type="number" value={date.month} onChange={handleDateChange('month')} /> 월
              <DateInput type="number" value={date.day} onChange={handleDateChange('day')} /> 일
              <DateInput type="number" value={date.hour} onChange={handleDateChange('hour')} /> 시
              <DateInput type="number" value={date.minute} onChange={handleDateChange('minute')} />
              분
            </DateInputWrapper>
          </Field>

          <Field>
            <label>장소</label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </Field>

          <DescriptionField>
            <label>문구</label>
            <TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
          </DescriptionField>
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
  height: 100vh;
  width: 100vw;
  max-width: 480px;
  box-sizing: border-box;
  padding: 0 5%;

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
  bottom: 2.7rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 90%;
`;

const AlignCenter = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 6.12rem;
  font-weight: 500;
  align-items: center;
  gap: 2.25rem;
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

const DescriptionField = styled(Field)`
  align-items: flex-start;
  div {
    margin-top: 1.06rem;
  }
`;

const DateInput = styled.input.attrs({ type: 'number' })`
  width: 2rem;
  border: none;
  text-align: right;
  margin-top: 0.03rem;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
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
  padding: 0 1.5rem;
  font-size: 0.875rem;
`;
