import styled from 'styled-components';

const Container = styled.div`
  //TODO: width height props로 받도록 함
  width: 14.8125rem;
  height: 18.375rem;
  border-radius: 0.5rem;
  // TODO: 템플릿 값을 참조하여 설정
  background-color: #ff8383;
  color: #fff;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.87rem;
  gap: 1.25rem;
  font-size: 12px;
`;

const InfoFeild = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.25rem;
`;

const DateTime = styled.div`
  max-width: 12rem;
`;

const Location = styled.div`
  max-width: 12rem;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

const Style = styled.div``;

const InvitationBack = () => {
  return (
    <Container>
      <Content>
        <Title>제목</Title>
        <InfoFeild>
          <b>일정</b>
          <DateTime>2025. 03. 12 오후 5시</DateTime>
        </InfoFeild>
        <InfoFeild>
          <b>장소</b>
          <Location>영등포 12-3 000빌딩 4층 어쩌구저쩌구 길어지면?</Location>
        </InfoFeild>
        <Style>제발 아무것도 챙기지말고 몸만 와주길.</Style>
      </Content>
    </Container>
  );
};

export default InvitationBack;
