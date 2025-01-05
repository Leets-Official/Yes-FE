import styled from 'styled-components';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import InvitationBack from '../../components/result/InvitationBack';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.25rem;

  b {
    text-align: left;
  }
`;

const AlignCenter = styled(InputContainer)`
  align-items: center;
  gap: 1.81rem;
`;

const Gap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.06rem;
`;

const InputField = styled.div`
  display: flex;
  gap: 1.69rem;
`;

const CreateBack = () => {
  return (
    <InputContainer>
      {/* TODO: 헤더 */}
      <div>헤더</div>
      <b>
        초대장 뒷면에 들어갈 <br /> 상세정보를 입력해주세요!
      </b>
      <AlignCenter>
        <InvitationBack />
        <Gap>
          <InputField>
            <div>제목</div>
            <Input width={'18.125rem'} height={'2.3125rem'} />
          </InputField>
          <InputField>
            <div>일정</div>
            <Input width={'18.125rem'} height={'2.3125rem'} />
          </InputField>
          <InputField>
            <div>장소</div>
            <Input width={'18.125rem'} height={'2.3125rem'} />
          </InputField>
          <InputField>
            <div>문구</div>
            <TextArea width={'18.125rem'} height={'7rem'} />
          </InputField>
        </Gap>
      </AlignCenter>
    </InputContainer>
  );
};

export default CreateBack;
