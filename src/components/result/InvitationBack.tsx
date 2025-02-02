import styled, { css } from 'styled-components';

const InvitationBack = ({
  size = 'big',
  title,
  date,
  location,
  description,
  isInput = false,
  backgroundColor = '#fff',
  fontColor = '#000',
}: {
  size?: 'small' | 'big';
  title: string;
  date: string;
  location: string;
  description: string;
  isInput?: boolean;
  backgroundColor: string;
  fontColor: string;
}) => {
  return (
    <Container size={size} backgroundColor={backgroundColor} fontColor={fontColor}>
      <Content size={size}>
        <Title size={size} isInput={isInput} fontColor={fontColor}>
          {title}
        </Title>
        <Field size={size}>
          <Info size={size} fontColor={fontColor}>
            일정
          </Info>
          <Info size={size} isInput={isInput} fontColor={fontColor} hasPadding>
            {date}
          </Info>
        </Field>
        <Field size={size}>
          <Info size={size} fontColor={fontColor}>
            장소
          </Info>
          <Info size={size} isInput={isInput} fontColor={fontColor} hasPadding>
            {location}
          </Info>
        </Field>
        <Description size={size} isInput={isInput} fontColor={fontColor}>
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
    contentPadding: '1.63rem',
    fieldGap: '0.88rem',
    fontSize: '0.625rem',
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
    contentPadding: '2.438rem',
    fieldGap: '2.37rem',
    fontSize: '1rem',
    titleFontSize: '1.5rem',
    marginTop: '2.87rem',
  },
};

const Container = styled.div<{ size: 'small' | 'big'; backgroundColor: string; fontColor: string }>`
  ${({ size }) => sizeStyles[size].container}
  border-radius: 0.5rem;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.fontColor};
  font-weight: 500;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.25);
`;

const Content = styled.div<{ size: 'small' | 'big' }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  box-sizing: border-box;
  padding: ${({ size }) => sizeStyles[size].contentPadding};
  gap: ${({ size }) => sizeStyles[size].contentGap};
`;

const Field = styled.div<{ size: 'small' | 'big' }>`
  display: flex;
  margin-right: auto;
  gap: ${({ size }) => sizeStyles[size].fieldGap};
`;

const Info = styled.div<{
  size: 'small' | 'big';
  isInput?: boolean;
  fontColor: string;
  hasPadding?: boolean;
}>`
  display: flex;
  align-items: center;
  max-width: 12rem;
  font-weight: 500;
  font-size: ${({ size }) => sizeStyles[size].fontSize};

  ${({ hasPadding }) =>
    hasPadding &&
    css`
      // box-sizing: border-box;
      padding-left: 0.2rem;
    `}

  ${({ isInput, fontColor }) =>
    isInput &&
    css`
      width: 9.25rem;
      height: 1.5rem;
      border: 1px solid ${fontColor};
      border-radius: 0.25rem;
    `}
`;

const Title = styled.div<{ size: 'small' | 'big'; isInput?: boolean; fontColor: string }>`
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ size }) => sizeStyles[size].titleFontSize};

  ${({ isInput, fontColor }) =>
    isInput &&
    css`
      width: 7.75rem;
      height: 1.9375rem;
      border: 1px solid ${fontColor};
      border-radius: 0.25rem;
    `}
`;

const Description = styled(Info)<{ isInput?: boolean; fontColor: string }>`
  display: flex;
  justify-content: center;
  white-space: pre-wrap;
  word-break: break-all;
  margin: 0 auto;

  ${({ isInput, fontColor }) =>
    isInput &&
    css`
      width: 11.1875rem;
      height: 4rem;
      border: 1px solid ${fontColor};
      border-radius: 0.25rem;
    `}
`;
