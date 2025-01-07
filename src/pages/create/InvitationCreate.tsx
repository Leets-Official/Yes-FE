import { useRecoilValue } from 'recoil';
import CreateFront from './CreateFront';
import { InvitationInfo } from './../../atom/InvitationInfo';
import CreateNickName from './CreateNickname';
import CreateTemplate from './CreateTemplate';
import CreateBack from './CreateBack';

const InvitationCreate = () => {
  const { step, isTemplate } = useRecoilValue(InvitationInfo);

  const renderStepComponent = () => {
    switch (step) {
      case 0:
        return <CreateNickName />;
      case 1:
        return <CreateTemplate />;
      case 2:
        // isTemplate 값에 따라 CreateFront 또는 CreateBack으로 이동
        return isTemplate ? <CreateFront /> : <CreateBack />;
      case 3:
        return <CreateBack />;
      default:
        return null;
    }
  };

  return <div>{renderStepComponent()}</div>;
};

export default InvitationCreate;
