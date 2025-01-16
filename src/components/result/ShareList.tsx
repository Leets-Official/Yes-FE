import styled from 'styled-components';
import CopyLinkButton from './CopyLinkButton';
import KakoShareButton from './KaKaoShareButton';
import QRShareButton from './QRShareButton';

const ShareList = () => {
  return (
    <Container>
      <CopyLinkButton />
      <KakoShareButton />
      <QRShareButton />
    </Container>
  );
};

export default ShareList;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 3.56rem;
  gap: 2.69rem;
`;
