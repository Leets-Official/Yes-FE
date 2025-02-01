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
import DateInput from '../../components/common/DateInput';
import useCanvas from '../../hooks/useCanvas';
import { usePostInvitation } from '../../api/usePostInvitation';

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
  const [isDateValid, setIsDateValid] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
  });
  const [invitationData, setInvitationData] = useState({
    ownerNickname: '',
    thumbnailUrl: '',
    title: '',
    schedule: '',
    location: '',
    remark: '',
  });

  const [backgroundColor, setBackgroundColor] = useState('#fff');
  const [fontColor, setFontColor] = useState('#000');
  const [invitation] = useRecoilState(InvitationInfo);

  const { canvasRef, uploadCanvasImage } = useCanvas(
    invitation.templateKey,
    invitation.contents || [],
  );

  useEffect(() => {
    const isInputStarted = date.year || date.month || date.day || date.hour || date.minute;

    if (isInputStarted) {
      setIsVisible(true);
    }

    if (date.year && date.month && date.day && date.hour && date.minute) {
      setIsDateValid(true);
    } else setIsDateValid(false);
  }, [date]);

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

  const handleDateChange = (field: DateField) => (value: string | number) => {
    setDate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateInvitation = async () => {
    const isTitleValidated = validateTitle();
    const isLocationValidated = validateLocation();

    if (isTitleValidated && isLocationValidated && isDateValid) {
      // presigned URL 요청 & 파일 업로드
      const presignedUrl = await uploadCanvasImage();
      console.log('presignedUrl1:', presignedUrl);

      // request data 세팅
      if (presignedUrl) {
        setInvitationData({
          ownerNickname: invitation.nickname,
          thumbnailUrl: presignedUrl,
          title,
          schedule: '', //formatted date로 수정
          location,
          remark: description,
        });
      }
      // 초대장 생성하기 API 요청
      const { invitationId } = await usePostInvitation(invitationData);
      navigate(`/result/${invitationId}`);
    }
  };

  useResetStepState();

  return (
    <Container>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
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
              <DateInput value={date.year} onChange={handleDateChange('year')} inputType="year" />{' '}
              년
              <DateInput
                value={date.month}
                onChange={handleDateChange('month')}
                inputType="month"
              />
              월
              <DateInput
                value={date.day}
                onChange={handleDateChange('day')}
                inputType="day"
                year={parseInt(date.year)}
                month={parseInt(date.month)}
              />
              일
              <DateInput value={date.hour} onChange={handleDateChange('hour')} inputType="hour" />
              시
              <DateInput
                value={date.minute}
                onChange={handleDateChange('minute')}
                inputType="minute"
              />
              분
            </DateInputWrapper>
            {!isDateValid && isVisible && <ErrorPhrase message="일정을 입력해주세요" />}
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
  width: calc(100% - 10%);
  max-width: 440px;
  box-sizing: border-box;
  padding: 0;
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
