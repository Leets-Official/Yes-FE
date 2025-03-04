import dayjs from 'dayjs'; // Day.js 라이브러리 사용
import styled from 'styled-components';
import ShareList from '../components/result/ShareList';
import { MyPageHeader } from '../components/layout/MyPageHeader';
import InvitationCard from '../components/common/InvitationCard';
import { useEffect, useState } from 'react';
import { useResetRecoilState } from 'recoil';
import { InvitationInfo } from '../atom/InvitationInfo';
import { useParams } from 'react-router-dom';
import { useGetInvitation } from '../api/useGetInvitation';
import { template } from '../data/Template';

const Result = () => {
  const resetInvitationInfo = useResetRecoilState(InvitationInfo);
  const { invitationId } = useParams<{ invitationId: string }>();
  const { invitation } = useGetInvitation(invitationId || '');
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    sessionStorage.removeItem('invitationPersist');
    resetInvitationInfo();
  }, []);

  useEffect(() => {
    if (invitation?.schedule) {
      const date = dayjs(invitation.schedule);
      const minutes = date.minute();

      setFormattedDate(
        minutes === 0 ? date.format('YYYY년 M월 D일 H시') : date.format('YYYY년 M월 D일 H시 m분'),
      );
    }
  }, [invitation]);

  console.log(formattedDate);

  if (!invitation) return null;

  return (
    <Container>
      <MyPageHeader />
      <Title>초대장 생성 완료!</Title>
      <InvitationCard
        imgURL={invitation?.thumbnailUrl || ''}
        title={invitation?.title || ''}
        date={formattedDate}
        location={invitation?.location || ''}
        description={invitation?.remark || ''}
        backgroundColor={template[invitation?.templateKey]?.bg_color || 'white'}
        fontColor={template[invitation?.templateKey]?.bg_text_color || 'black'}
      />
      <TouchMessage>초대장을 터치해주세요!</TouchMessage>
      <ShareList
        invitationTitle={invitation?.title || ''}
        ownerNickname={invitation?.ownerNickname || ''}
        thumbnailUrl={invitation?.thumbnailUrl || ''}
        size="big"
      />
    </Container>
  );
};

export default Result;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  max-width: 480px;
  box-sizing: border-box;
  padding: 0 5%;
`;

const Title = styled.div`
  color: #3e3e3e;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0.75rem 0 1.31rem 0;
`;

const TouchMessage = styled.div`
  color: #cfcdcd;
  font-size: 0.8125rem;
  font-weight: 500;
`;
