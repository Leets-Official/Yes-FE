import { useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import InvitationBack from '../../components/result/InvitationBack';
import Button from '../../components/common/Button';
import theme from '../../style/theme';

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

  const handleDateChange = (field: DateField) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <Container>
      {/* TODO: 헤더 */}
      <div>헤더</div>
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
          size="small"
          title={title}
          location={location}
          description={description}
          date={`${date.year}년 ${date.month}월 ${date.day}일 ${date.hour}시 ${date.minute}분`}
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
              <DateInput
                type="number"
                value={date.minute}
                onChange={handleDateChange('minute')}
              />{' '}
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

const DescriptionField = styled(Field)`
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
