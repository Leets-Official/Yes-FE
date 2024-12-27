import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import KakaoRedirectHandler from './pages/login/KakaoRedirectHandler';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/oauth" element={<KakaoRedirectHandler />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
