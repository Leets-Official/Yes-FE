import styled from 'styled-components';

const InvitationBack = ({
  title,
  date,
  location,
  message,
}: {
  title: string;
  date: string;
  location: string;
  message: string;
}) => {
  return (
    <Container>
      <Content>
        <Title>{title}</Title>
        <Feild>
          <div>일정</div>
          <Info>{date}</Info>
        </Feild>
        <Feild>
          <div>장소</div>
          <Info>{location}</Info>
        </Feild>
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
  font-weight: 500;
  font-size: 0.625rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.87rem;
  gap: 1.25rem;
  font-size: 12px;
`;

const Feild = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: 1.63rem;
`;

const Info = styled.div`
  max-width: 12rem;
  font-weight: 500;
  font-size: 0.8125rem;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1rem;
`;

const Message = styled(Info)`
  width: 12rem;
  white-space: pre-wrap;
  word-break: break-all;
  margin: 0 auto;
`;
