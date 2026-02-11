import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpForm from './pages/auth/SignupForm';
import GoalsRegisterPage from './pages/auth/OnboardingGoalsPage';
import LoginPage from './pages/auth/LoginPage';
import ProfilePage from './pages/profile/ProfilePage';
import { AuthGuard } from './routes/AuthGuard';
import DashboardPage from './pages/dashboard/Dashboard';
import WorkoutsPage from './pages/workout/Workout';
import GoalsPage from './pages/goals/GoalsPage';
import { Toaster } from './components/ui/sonner';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<AuthGuard />}>
          <Route path="/goalsRegister" element={<GoalsRegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />}></Route>
          <Route path="/workout" element={<WorkoutsPage />}></Route>
          <Route path="/goals" element={<GoalsPage />}></Route>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path="/" element={<DashboardPage />}></Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
