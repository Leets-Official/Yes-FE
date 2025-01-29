import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AttendeeList from '../../components/mypage/AttendeeList';
import { template } from '../../data/Template';
import ShareList from '../../components/result/ShareList';
import InvitationCard from '../../components/common/InvitationCard';
import { formatDate } from '../../utils/formatDate';

const data = {
  id: 0,
  img: '/image/Pre_Invi_Princess.png',
  templateKey: 'PRINCESS' as keyof typeof template,
  title: '연말파티 초대장',
  date: '2024.12.25',
  location: '강남역 어딘가',
  made_date: '2024.12.14',
  description: '몸만 와라 친구들아',
  attendees: ['나얌', '리락이', '쿠마마'],
  be_attendees: ['하이', '표옹옹'],
};

const InvitationDetail = () => {
  //const { id } = useParams<{ id: string }>();

  const [invitation, setInvitation] = useState<Invitation>({
    invitationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    createDate: '2025-01-29T09:02:06.444Z',
    title: '웰컴하우스',
    schedule: '2025-01-29T09:02:06.445Z',
    location: '우리집',
    thumbnailUrl: 'https://pbs.twimg.com/media/GLwiWDdaoAAP1id.jpg',
    remark: '와라',
  });

  useEffect(() => {
    // 초대장 상세조회 API
    // (참석자/불참석자 API) - 서버 미구현
  }, []);

  return (
    <Container>
      {/**플립되는 초대장 */}
      <InvitationCard
        title={invitation.title}
        imgURL={invitation.thumbnailUrl}
        date={formatDate(invitation.schedule)}
        location={invitation.location}
        description={invitation.remark}
        backgroundColor={template[data.templateKey].bg_color}
        fontColor={template[data.templateKey].bg_text_color}
      />
      {/**카카오톡 공유(링크, QR) = isMine인 경우에만...*/}
      <ShareList imgURL={data.img} />
      {/**참석자 명단 */}
      <AttendeeList attendees={data.attendees} title="참석자 목록" />
      {/**불참석자 명단 */}
      <AttendeeList attendees={data.be_attendees} title="불참석자 목록" />
    </Container>
  );
};

export default InvitationDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.313rem;
`;
