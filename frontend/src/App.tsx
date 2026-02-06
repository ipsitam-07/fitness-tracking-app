import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpForm from './pages/auth/SignupForm';
import GoalsRegisterPage from './pages/auth/OnboardingGoalsPage';
import LoginPage from './pages/auth/LoginPage';
import ProfilePage from './pages/profile/ProfilePage';
import { AuthGuard } from './routes/AuthGuard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<AuthGuard />}>
          <Route path="/goalsRegister" element={<GoalsRegisterPage />} />

          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
