// 라우팅 연결 ; 페이지 잇는 역할할
import React from 'react'
import 'leaflet/dist/leaflet.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ResultPage from './pages/ResultPage'
import InterestPage from './pages/InterestPage'
import SignupPage from './pages/SignupPage'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/results" element={<ResultPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/interests" element={<InterestPage />} />
    </Routes>
  </Router>
)

export default App