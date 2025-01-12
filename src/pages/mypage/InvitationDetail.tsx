import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AttendeeList from '../../components/mypage/AttendeeList';

const data = {
  id: 0,
  img: '/image/template_example.png',
  title: '연말파티 초대장',
  date: '2024.12.25',
  location: '강남역 어딘가',
  made_date: '2024.12.14',
  attendees: ['나얌', '리락이', '쿠마마'],
};

const InvitationDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container>
      {/**플립 (추후 구현) */}
      <Invitation src={data.img} />
      <AttendeeList attendees={data.attendees} />
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

const Invitation = styled.img`
  border-radius: 8px;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.25);
`;
