import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AttendeeList from '../../components/mypage/AttendeeList';
import { template } from '../../data/Template';

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
};

const InvitationDetail = () => {
  const { id } = useParams<{ id: string }>(); // API 구현 시 필요.

  const [isTouched, setIsTouched] = useState(false); // 카드를 뒤집는 상태

  const handleInvitationClick = () => {
    setIsTouched((prev) => !prev); // 카드를 클릭할 때마다 뒤집기 상태 변경
  };

  return (
    <Container>
      {/**플립되는 초대장 */}
      <Invitation isTouched={isTouched} onClick={handleInvitationClick}>
        {/* 초대장 앞면 */}
        <InvitationFront>
          <InvitationImage src={data.img} />
        </InvitationFront>

        {/* 초대장 뒷면 (컬러 지정 관련 회의 필요)*/}
        <InvitationBack
          bgColor={template[data.templateKey].bg_color}
          color={template[data.templateKey].bg_text_color}
        >
          <Title>{data.title}</Title>
          <Gap />
          <TextBox>
            <Text>일정</Text>
            <Text>{data.date}</Text>
          </TextBox>
          <TextBox>
            <Text>장소</Text>
            <Text>{data.location}</Text>
          </TextBox>
          <Gap />
          <Text>{data.description}</Text>
        </InvitationBack>
      </Invitation>
      {/**참석자 명단 */}
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

const Invitation = styled.div<{ isTouched: boolean }>`
  position: relative;
  width: 300px;
  height: 375px;
  transform-style: preserve-3d;
  transition: transform 0.8s ease;
  transform: ${({ isTouched }) => (isTouched ? 'rotateY(180deg)' : 'rotateY(0deg)')};
  border-radius: 8px;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.25);
`;

const DefaultInvitationStyle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  display: flex;
`;

const InvitationFront = styled(DefaultInvitationStyle)``;

const InvitationImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const InvitationBack = styled(DefaultInvitationStyle)<{ bgColor: string; color: string }>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  padding: 2.875rem 2.438rem;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  transform: rotateY(180deg);
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const TextBox = styled.div`
  display: flex;
  gap: 2.25rem;
  margin-bottom: 1.188rem;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const Gap = styled.div`
  height: 2.375rem;
`;
