import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './pages/ErrorFallback';
import ErrorPage from './pages/ErrorPage';
import CustomToast from './components/common/CustomToast';

import Login from './pages/login/Login';
import KakaoRedirectHandler from './pages/login/KakaoRedirectHandler';
import Home from './pages/Home';
import ReceiveInvitation from './pages/ReceiveInvitation';
import InvitationCreate from './pages/create/InvitationCreate';
import Result from './pages/Result';
import MyPage from './pages/mypage/MyPage';
import MyPageMain from './pages/mypage/MyPageMain';
import InvitationList from './pages/mypage/InvitationList';
import InvitationDetail from './pages/mypage/InvitationDetail';
import PrivateRoutes from './routes/PrivateRoutes';

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
                <Route path="detail/:invitationId" element={<InvitationDetail />} />
              </Route>
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <CustomToast />
        </BrowserRouter>
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default App;
