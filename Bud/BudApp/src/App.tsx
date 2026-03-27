
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
