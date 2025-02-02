import { useState, useEffect } from 'react';
import styled from 'styled-components';

const AttendeeList = ({ attendees, title }: { attendees: Guest[]; title: string }) => {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const generateColors = attendees.map(() => randomColor());
    setColors(generateColors);
  }, [attendees]); // attendees가 변경될 때만 색상 계산

  // 랜덤 색상 생성 함수
  const randomColor = () => {
    const r = Math.floor(Math.random() * 56) + 200; // 200 ~ 255
    const g = Math.floor(Math.random() * 56) + 200; // 200 ~ 255
    const b = Math.floor(Math.random() * 56) + 200; // 200 ~ 255

    // RGB 값으로 색상 생성
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <Container>
      <Title>{title}</Title>
      <AttendeeBox>
        {attendees.map((attendee, index) => (
          <AttendeeName key={attendee.guestId} color={colors[index]}>
            {attendee.nickname}
          </AttendeeName>
        ))}
      </AttendeeBox>
    </Container>
  );
};

export default AttendeeList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.063rem;
  margin-top: 3.563rem;
  margin-right: auto;
`;

const Title = styled.div`
  color: #3e3e3e;
  font-size: 16px;
  font-weight: 600;
`;

const AttendeeBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const AttendeeName = styled.div<{ color: string }>`
  font-size: 14px;
  width: auto;
  padding: 0.875rem 1.563rem;
  border-radius: 8px;
  background: ${(props) => props.color || '#FFE6E6'};
`;
