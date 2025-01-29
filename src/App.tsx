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
import ErrorPage from './pages/ErrorPage';
import ReceiveInvitation from './pages/ReceiveInvitation';
import { PrivateRoutes } from './routes/PrivateRoutes';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './pages/ErrorFallback';

function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login/*" element={<KakaoRedirectHandler />} />
            <Route path="/invitation/:invitationId" element={<ReceiveInvitation />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="/invitation/create" element={<InvitationCreate />} />
              <Route path="/result/:invitationId" element={<Result />} />
              <Route path="/mypage" element={<MyPage />}>
                <Route path="" element={<MyPageMain />} />
                <Route path="received" element={<InvitationList type="received" />} />
                <Route path="sent" element={<InvitationList type="sent" />} />
                <Route path="detail/:id" element={<InvitationDetail />} />
              </Route>
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <ToastContainer
            style={{ maxWidth: '300px' }}
            position="top-center" // 토스트 메시지 위치 설정
            autoClose={3000} // 자동 닫힘 시간 (밀리초)
            limit={2}
            pauseOnFocusLoss // 창 포커스가 사라질 때 멈춤
            theme="colored"
          />
        </BrowserRouter>
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default App;
