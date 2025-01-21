import styled from 'styled-components';
import ShareList from '../components/result/ShareList';
import { MyPageHeader } from '../components/layout/MyPageHeader';
import InvitationCard from '../components/common/InvitationCard';
import { template } from '../data/Template';
import { useEffect } from 'react';

// 임시 데이터 (서버 응답)
const data = {
  id: 0,
  imgURL: 'https://i.pinimg.com/736x/f9/d2/e5/f9d2e5eecb3109652fe71ca4cb0a2cd6.jpg',
  templateKey: 'ALIEN',
  title: '연말파티 초대장',
  date: '2024.12.25',
  location: '강남역 어딘가',
  description: '몸만 와라 친구들아',
  made_date: '2024.12.14',
};

const Result = () => {
  useEffect(() => {
    sessionStorage.removeItem('invitationPersist');
  }, []);

  return (
    <Container>
      <MyPageHeader />
      <Title>초대장 생성 완료!</Title>
      <InvitationCard
        //imgURL={data.imgURL}
        title={data.title}
        date={data.date}
        location={data.location}
        description={data.description}
        backgroundColor={template[data.templateKey].bg_color}
        fontColor={template[data.templateKey].bg_text_color}
      />
      <TouchMessage>초대장을 터치해주세요!</TouchMessage>
      <ShareList imgURL={data.imgURL} />
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
