import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({ key: 'userPersist', storage: localStorage });

// 사용자 정보 인터페이스 (토큰은 cookie 별도 저장)
export interface UserState {
  isLoggedIn: boolean;
  userId: string;
  socialId: string;
  nickname: string;
}

// 사용자 정보 초기값
export const initialUserState: UserState = {
  isLoggedIn: false,
  userId: '',
  socialId: '',
  nickname: '',
};

// 사용자 정보 atom
export const UserInfo = atom<UserState>({
  key: 'UserInfo', // atom 고유 키
  default: initialUserState,
  effects_UNSTABLE: [persistAtom], // persistAtom을 통해 상태 지속화
});
