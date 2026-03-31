
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'
import WorkoutPage from './pages/WorkoutPage'
import Profile from './pages/ProfilePage';
import Feed from './pages/FeedPage';


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

          <Route path="/Workout" element={
            <ProtectedRoute>
              <WorkoutPage />
            </ProtectedRoute>
        } />

          <Route path="/Profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
        } />

          <Route path="/Feed" element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
