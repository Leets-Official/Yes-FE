import styled, { css } from 'styled-components';

const InvitationBack = ({
  size = 'big',
  title,
  date,
  location,
  description,
  isInput = false,
}: {
  size?: 'small' | 'big';
  title: string;
  date: string;
  location: string;
  description: string;
  isInput?: boolean;
}) => {
  return (
    <Container size={size}>
      <Content size={size}>
        <Title size={size} isInput={isInput}>
          {title}
        </Title>
        <Field size={size}>
          <Info size={size}>일정</Info>
          <Info size={size} isInput={isInput}>
            {date}
          </Info>
        </Field>
        <Field size={size}>
          <Info size={size}>장소</Info>
          <Info size={size} isInput={isInput}>
            {location}
          </Info>
        </Field>
        <Description size={size} isInput={isInput}>
          {description}
        </Description>
      </Content>
    </Container>
  );
};

export default InvitationBack;

const sizeStyles = {
  small: {
    container: css`
      width: 14.8125rem;
      height: 18.375rem;
      font-size: 0.625rem;
    `,
    contentGap: '1.25rem',
    fieldGap: '1.25rem',
    fontSize: '0.8125rem',
    titleFontSize: '1rem',
    marginTop: '1.75rem',
  },
  big: {
    container: css`
      width: 21.375rem;
      height: 26.6875rem;
      font-size: 1rem;
    `,
    contentGap: '2.37rem',
    fieldGap: '2.37rem',
    fontSize: '1rem',
    titleFontSize: '1.5rem',
    marginTop: '2.87rem',
  },
};

const Container = styled.div<{ size: 'small' | 'big' }>`
  ${({ size }) => sizeStyles[size].container}
  border-radius: 0.5rem;
  background-color: #ff8383;
  color: #fff;
  font-weight: 500;
`;

const Content = styled.div<{ size: 'small' | 'big' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ size }) => sizeStyles[size].marginTop};
  gap: ${({ size }) => sizeStyles[size].contentGap};
`;

const Field = styled.div<{ size: 'small' | 'big' }>`
  display: flex;
  align-items: center;
  gap: ${({ size }) => sizeStyles[size].fieldGap};
`;

const Info = styled.div<{ size: 'small' | 'big'; isInput?: boolean }>`
  display: flex;
  align-items: center;
  padding-left: 0.3rem;
  max-width: 12rem;
  font-weight: 500;
  font-size: ${({ size }) => sizeStyles[size].fontSize};

  ${({ isInput }) =>
    isInput &&
    css`
      width: 9.25rem;
      height: 1.5rem;
      border: 1px solid #fff;
      border-radius: 0.25rem;
    `}
`;

const Title = styled.div<{ size: 'small' | 'big'; isInput?: boolean }>`
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ size }) => sizeStyles[size].titleFontSize};

  ${({ isInput }) =>
    isInput &&
    css`
      width: 7.75rem;
      height: 1.9375rem;
      border: 1px solid #fff;
      border-radius: 0.25rem;
    `}
`;

const Description = styled(Info)<{ isInput?: boolean }>`
  display: flex;
  justify-content: center;
  white-space: pre-wrap;
  word-break: break-all;
  margin: 0 auto;

  ${({ isInput }) =>
    isInput &&
    css`
      width: 12rem;
      height: 4rem;
      border: 1px solid #fff;
      border-radius: 0.25rem;
    `}
`;
