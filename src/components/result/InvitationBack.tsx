import styled from 'styled-components';

const InvitationBack = ({
  title,
  location,
  message,
}: {
  title: string;
  location: string;
  message: string;
}) => {
  return (
    <Container>
      <Content>
        <Title>{title}</Title>
        <InfoFeild>
          <b>일정</b>
          <DateTime>2025. 03. 12 오후 5시</DateTime>
        </InfoFeild>
        <InfoFeild>
          <b>장소</b>
          <Location>{location}</Location>
        </InfoFeild>
        <Message>{message}</Message>
      </Content>
    </Container>
  );
};

export default InvitationBack;

const Container = styled.div`
  //TODO: width height props로 받도록 함
  width: 14.8125rem;
  height: 18.375rem;
  border-radius: 0.5rem;
  // TODO: 템플릿 값을 참조하도록 설정
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
  gap: 0.25rem;
  margin-left: 1.63rem;
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

const Message = styled.div`
  display: flex;
  margin-left: 1.63rem;
`;
