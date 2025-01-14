import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login/Login';
import KakaoRedirectHandler from './pages/login/KakaoRedirectHandler';
import { Home } from './pages/Home';
import Result from './pages/Result';
import InvitationCreate from './pages/create/InvitationCreate';
import MyPage from './pages/mypage/MyPage';
import { RecoilRoot } from 'recoil';
import InvitationList from './pages/mypage/InvitationList';
import MyPageMain from './pages/mypage/MyPageMain';
import InvitationDetail from './pages/mypage/InvitationDetail';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login/oauth" element={<KakaoRedirectHandler />} />
          <Route path="/home" element={<Home />} />
          <Route path="/invitation/create" element={<InvitationCreate />} />
          <Route path="/result/:invitationId" element={<Result />} />
          <Route path="/mypage" element={<MyPage />}>
            <Route path="" element={<MyPageMain />} />
            <Route path="received" element={<InvitationList type="received" />} />
            <Route path="send" element={<InvitationList type="send" />} />
            <Route path="detail/:id" element={<InvitationDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
