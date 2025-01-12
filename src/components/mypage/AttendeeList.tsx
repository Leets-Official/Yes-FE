import styled from 'styled-components';

const AttendeeList = ({ attendees }: { attendees: string[] }) => {
  const randomColor = () => {
    const r = Math.floor(Math.random() * 56) + 200; // 200 ~ 255
    const g = Math.floor(Math.random() * 56) + 200; // 200 ~ 255
    const b = Math.floor(Math.random() * 56) + 200; // 200 ~ 255

    // RGB 값으로 색상 생성
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <Container>
      <Title>참석자 목록</Title>
      {attendees.map((attendee, index) => (
        <AttendeeName key={index} color={randomColor()}>
          {attendee}
        </AttendeeName>
      ))}
    </Container>
  );
};

export default AttendeeList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.063rem;
  margin-top: 3.563rem;
  margin-right: auto;
`;

const Title = styled.div`
  color: #3e3e3e;
  font-size: 16px;
  font-weight: 600;
`;

const AttendeeName = styled.div<{ color: string }>`
  font-size: 14px;
  width: auto;
  padding: 0.875rem 1.563rem;
  border-radius: 8px;
  background: ${(props) => props.color || '#FFE6E6'};
`;
