import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import InvitationBack from '../../components/result/InvitationBack';
import Button from '../../components/common/Button';
import theme from '../../style/theme';
import { InvitationHeader } from '../../components/layout/InvitationHeader';
import { useResetStepState } from '../../hooks/useResetStepState';
import { template } from '../../data/Template';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { InvitationInfo } from '../../atom/InvitationInfo';
import useValidation from '../../hooks/useValidation';
import ErrorPhrase from '../../components/common/ErrorPhrase';

type DateField = 'year' | 'month' | 'day' | 'hour' | 'minute';

const CreateBack = () => {
  const navigate = useNavigate();
  const {
    value: title,
    isValid: isTitleValid,
    handleInputChange: handleTitleChange,
    validate: validateTitle,
  } = useValidation('');
  const {
    value: location,
    isValid: isLocationValid,
    handleInputChange: handleLocationChange,
    validate: validateLocation,
  } = useValidation('');
  const { value: description, handleInputChange: handleDescriptionChange } = useValidation('');
  const [date, setDate] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
  });
  const [backgroundColor, setBackgroundColor] = useState('#fff');
  const [fontColor, setFontColor] = useState('#000');
  const [invitation, setInvitation] = useRecoilState(InvitationInfo);

  const invitationId = 'invitationId'; // 초대장 임시 아이디

  useEffect(() => {
    const templateKey = invitation.templateKey || 'null';
    const isTemplate = !!invitation.templateKey;

    if (isTemplate) {
      setBackgroundColor(template[templateKey as string]?.bg_color || '#fff');
      setFontColor(template[templateKey as string]?.bg_text_color || '#000');
    } else {
      setBackgroundColor('#fff');
      setFontColor('#000');
    }
  }, [invitation.templateKey]);

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

  const handleCreateInvitation = () => {
    const isTitleValidated = validateTitle();
    const isLocationValidated = validateLocation();

    if (isTitleValidated && isLocationValidated) {
      // API 호출 및 상태 업데이트
      setInvitation((prev) => ({
        ...prev,
        title,
        location,
        description,
        step: 0,
      }));
      navigate(`/result/${invitationId}`);
    }
  };

  useResetStepState();

  return (
    <Container>
      <InvitationHeader />
      <b>
        초대장 뒷면에 들어갈 <br /> 상세정보를 입력해주세요!
      </b>
      <ButtonWrapper>
        <Button
          color={theme.color.main}
          textColor="#fff"
          fullWidth
          onClick={handleCreateInvitation}
        >
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
            <label>
              제목 <span>*</span>
            </label>
            <Input value={title} onChange={handleTitleChange} />
            {isTitleValid === 0 && <ErrorPhrase message="제목을 입력해주세요" />}
          </Field>

          <Field>
            <label>
              일정 <span>*</span>
            </label>
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
            <label>
              장소 <span>*</span>
            </label>
            <Input value={location} onChange={handleLocationChange} />
            {isLocationValid === 0 && <ErrorPhrase message="장소를 입력해주세요" />}
          </Field>

          <DescriptionField>
            <label>문구</label>
            <TextArea value={description} onChange={handleDescriptionChange} />
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
  margin-bottom: 12rem;
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
  width: 100%;
  max-width: 440px;
  box-sizing: border-box;
  padding: 0 5%;
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
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  font-size: 0.875rem;

  label {
    color: #787878;
  }
  span {
    color: ${theme.color.main};
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
  width: 18.4375rem;
  height: 2.3125rem;
  padding: 0 1.5rem;
  font-size: 0.875rem;
`;
