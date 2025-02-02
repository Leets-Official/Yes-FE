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
import ErrorPhrase from '../../components/common/ErrorPhrase';
import DateInput from '../../components/common/DateInput';
import useCanvas from '../../hooks/useCanvas';
import { usePostInvitation } from '../../api/usePostInvitation';
import getISOString from '../../hooks/getISOString';

type DateField = 'year' | 'month' | 'day' | 'hour' | 'minute';

const CreateBack = () => {
  const navigate = useNavigate();

  const [backgroundColor, setBackgroundColor] = useState('#fff');
  const [fontColor, setFontColor] = useState('#000');
  const [invitation] = useRecoilState(InvitationInfo);

  const [isDateValid, setIsDateValid] = useState(false);
  const [isVisible, setIsVisible] = useState({
    title: false,
    date: false,
    location: false,
  });
  const [date, setDate] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
  });
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [invitationData, setInvitationData] = useState({
    ownerNickname: invitation.nickname || '',
    thumbnailUrl: '',
    title: '',
    schedule: '',
    location: '',
    remark: '',
  });

  const { canvasRef, uploadCanvasImage } = useCanvas(
    invitation.templateKey,
    invitation.contents || [],
  );
  const { postInvitation } = usePostInvitation();

  useEffect(() => {
    const isInputStarted = date.year || date.month || date.day || date.hour || date.minute;

    if (isInputStarted) {
      setIsVisible((prev) => ({
        ...prev,
        date: true,
      }));
    }
    console.log(date);

    setIsDateValid(
      !!(date.year && date.month && date.day && date.hour !== '' && date.minute !== ''),
    );

    setFormattedDate(
      [
        date.year && `${date.year}년`,
        date.month && `${date.month}월`,
        date.day && `${date.day}일`,
        date.hour && `${date.hour}시`,
        date.minute && `${date.minute}분`,
      ]
        .filter(Boolean)
        .join(' '),
    );

    const ISOschedule: string = getISOString(date) || '';

    setInvitationData((prev) => ({
      ...prev,
      schedule: ISOschedule,
    }));
  }, [date]);

  useEffect(() => {
    const isInputStarted = invitationData.title;

    if (isInputStarted) {
      setIsVisible((prev) => ({
        ...prev,
        title: true,
      }));
    }
  }, [invitationData.title]);

  useEffect(() => {
    const isInputStarted = invitationData.location;

    if (isInputStarted) {
      setIsVisible((prev) => ({
        ...prev,
        location: true,
      }));
    }
  }, [invitationData.location]);

  const onChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target;

      setInvitationData({
        ...invitationData,
        [key]: value,
      });
    };

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

  const handleDateChange = (field: DateField) => (value: string | number) => {
    setDate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateInvitation = async () => {
    if (!invitationData.title || !invitationData.location || !invitationData.schedule) return; // presigned URL 요청 & 파일 업로드

    const presignedUrl = await uploadCanvasImage();
    if (!presignedUrl) return;
    // 초대장 생성하기 API 요청
    const response = await postInvitation({
      ...invitationData,
      thumbnailUrl: presignedUrl.slice(0, presignedUrl.indexOf('?')),
    });
    navigate(`/result/${response.invitation.invitationId}`, { state: invitationData });
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
          title={invitationData.title}
          location={invitationData.location}
          description={invitationData.remark}
          date={formattedDate}
          backgroundColor={backgroundColor}
          fontColor={fontColor}
        />
        <Gap>
          <Field>
            <label>
              제목 <span>*</span>
            </label>
            <Input value={invitationData.title} onChange={onChange('title')} />
            {!invitationData.title && isVisible.title && (
              <ErrorPhrase message="제목을 입력해주세요" />
            )}
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
            {!isDateValid && isVisible.date && <ErrorPhrase message="일정을 입력해주세요" />}
          </Field>

          <Field>
            <label>
              장소 <span>*</span>
            </label>
            <Input value={invitationData.location} onChange={onChange('location')} />
            {!invitationData.location && isVisible.location && (
              <ErrorPhrase message="장소를 입력해주세요" />
            )}
          </Field>

          <DescriptionField>
            <label>문구</label>
            <TextArea value={invitationData.remark} onChange={onChange('remark')} />
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
