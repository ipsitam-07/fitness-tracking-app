import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoginHeader } from '@/components/auth/LoginHeader';
import { Footer } from '@/components/auth/Footer';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import '../../index.css';
import { useLogin } from '@/hooks/useLogin';
import { LOGIN_TEXT } from '@/utils/constants';

function LoginPage() {
  const navigate = useNavigate();
  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    login.mutate(formData, {
      onSuccess: () => {
        navigate('/dashboard');
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="auth-bg">
        <LoginHeader />

        <main className="grow flex items-center justify-center p-6 bg-gradient-mesh">
          <div className="auth-card">
            {/* Header with Icon */}
            <div className="mb-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <LogIn className="text-primary" size={28} />
              </div>
              <h1 className="text-foreground dark:text-white text-3xl font-bold mb-3">
                {LOGIN_TEXT.WELCOME}
              </h1>
              <p className="text-muted-foreground text-base">{LOGIN_TEXT.WELCOME_SUBTEXT}</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <Label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  {LOGIN_TEXT.EMAIL_LABEL}
                </Label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={20}
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={LOGIN_TEXT.EMAIL_PLACEHOLDER}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 h-14 bg-background-light dark:bg-white/5 border border-border-light dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:outline focus:border-primary dark:text-white placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label
                    htmlFor="password"
                    className="block text-sm font-semibold text-foreground dark:text-white"
                  >
                    {LOGIN_TEXT.PASSWORD_LABEL}
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    {LOGIN_TEXT.FORGOT_PASSWORD_LABEL}
                  </Link>
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-gray-500"
                    size={20}
                  />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 h-14 bg-background-light dark:bg-white/5 border border-border-light dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:outline focus:border-primary dark:text-white placeholder:text-muted-foreground/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={login.isPending}
                className="w-full h-14 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(19,236,128,0.4)] transition-all transform active:scale-[0.98] mt-8"
              >
                {login.isPending ? 'Signing in...' : 'Sign In'}
                <LogIn size={20} />
              </Button>
              {login.isError && (
                <p className="text-sm text-red-500 mt-2">Invalid email or password</p>
              )}
            </form>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-sm text-muted-foreground dark:text-gray-400">
              {LOGIN_TEXT.NO_ACCOUNT}{' '}
              <Link to="/signup" className="text-primary hover:underline font-bold">
                {LOGIN_TEXT.SIGN_UP}
              </Link>
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default LoginPage;
