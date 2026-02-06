import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpForm from './pages/auth/SignupForm';
import GoalsRegisterPage from './pages/auth/OnboardingGoalsPage';
import LoginPage from './pages/auth/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/goalsRegister" element={<GoalsRegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
