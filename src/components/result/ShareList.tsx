import styled, { css } from 'styled-components';
import CopyLinkButton from './CopyLinkButton';
import KakoShareButton from './KaKaoShareButton';
import QRShareButton from './QRShareButton';

const ShareList = ({
  ownerNickname,
  thumbnailUrl,
  size,
}: {
  ownerNickname: string;
  thumbnailUrl: string;
  size: 'small' | 'big';
}) => {
  return (
    <Container size={size}>
      <CopyLinkButton size={size} />
      <KakoShareButton size={size} ownerNickname={ownerNickname} thumbnailUrl={thumbnailUrl} />
      <QRShareButton size={size} />
    </Container>
  );
};

export default ShareList;

const Container = styled.div<{ size: 'small' | 'big' }>`
  display: flex;
  flex-direction: row;
  margin-top: 3.56rem;
  gap: 2.69rem;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          gap: 1.44rem;
        `;
      case 'big':
        return css`
          gap: 2.69rem;
        `;
    }
  }}
`;
