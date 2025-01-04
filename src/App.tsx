import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login/Login';
import KakaoRedirectHandler from './pages/login/KakaoRedirectHandler';
import { Home } from './pages/Home';
import Result from './pages/Result';
import InvitationCreate from './pages/create/InvitationCreate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/oauth" element={<KakaoRedirectHandler />} />
        <Route path="/home" element={<Home />} />
        <Route path="/invitation/create" element={<InvitationCreate />} />
        <Route path="/result/:invitationId" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
