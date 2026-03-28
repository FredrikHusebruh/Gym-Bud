
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Login" element={<LoginPage />} />

        <Route path="/Home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
