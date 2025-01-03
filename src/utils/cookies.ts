import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// set : 쿠키 생성 후, 저장
export const setCookie = (name: string, value: string, option?: any) =>
  cookies.set(name, value, { ...option });

// get : name과 일치하는 쿠기기 반환
export const getCookie = (name: string) => cookies.get(name);

// remove : name과 일치하는 쿠키 제거 (로그아웃 시 사용)
export const removeCookie = (name: string, option?: any) => cookies.remove(name, { ...option });
