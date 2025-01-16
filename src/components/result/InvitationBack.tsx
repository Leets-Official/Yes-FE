import styled, { css } from 'styled-components';

const InvitationBack = ({
  size,
  title,
  date,
  location,
  description,
}: {
  size?: 'small' | 'big';
  title: string;
  date: string;
  location: string;
  description: string;
}) => {
  return (
    <Container size={size}>
      <Content size={size}>
        <Title size={size}>{title}</Title>
        <Field>
          <Info size={size}>일정</Info>
          <Info size={size}>{date}</Info>
        </Field>
        <Field>
          <Info size={size}>장소</Info>
          <Info size={size}>{location}</Info>
        </Field>
        <Description size={size}>{description}</Description>
      </Content>
    </Container>
  );
};

export default InvitationBack;

const Container = styled.div<{ size?: 'small' | 'big' }>`
  ${({ size }) =>
    size === 'small' &&
    css`
      width: 14.8125rem;
      height: 18.375rem;
      font-size: 0.625rem;
    `}

  ${({ size }) =>
    size === 'big' &&
    css`
      width: 21.375rem;
      height: 26.6875rem;
      font-size: 1rem;
    `}

  border-radius: 0.5rem;
  background-color: #ff8383;
  color: #fff;
  font-weight: 500;
`;

const Content = styled.div<{ size?: 'small' | 'big' }>`
  display: flex;
  flex-direction: column;
  margin-top: 2.87rem;
  font-size: 12px;

  ${({ size }) =>
    size === 'small' &&
    css`
      gap: 1.25rem;
    `}

  ${({ size }) =>
    size === 'big' &&
    css`
      gap: 2.37rem;
    `}
`;

const Field = styled.div<{ size?: 'small' | 'big' }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: 1.63rem;
  ${({ size }) =>
    size === 'small' &&
    css`
      gap: 1.25rem;
    `}

  ${({ size }) =>
    size === 'big' &&
    css`
      gap: 2.37rem;
    `}
`;

const Info = styled.div<{ size?: 'small' | 'big' }>`
  max-width: 12rem;
  font-weight: 500;

  ${({ size }) =>
    size === 'small' &&
    css`
      font-size: 0.8125rem;
    `}

  ${({ size }) =>
    size === 'big' &&
    css`
      font-size: 1rem;
    `}
`;

const Title = styled.div<{ size?: 'small' | 'big' }>`
  font-weight: 600;

  ${({ size }) =>
    size === 'small' &&
    css`
      font-size: 1rem;
    `}

  ${({ size }) =>
    size === 'big' &&
    css`
      font-size: 1.5rem;
    `}
`;

const Description = styled(Info)`
  width: 12rem;
  white-space: pre-wrap;
  word-break: break-all;
  margin: 0 auto;
`;
