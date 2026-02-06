import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpForm from './pages/auth/SignupForm';
import GoalsRegisterPage from './pages/auth/GoalsRegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/goalsRegister" element={<GoalsRegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
