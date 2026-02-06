import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignupHeader } from '@/components/auth/SignupHeader';
import { Footer } from '@/components/auth/Footer';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import '../../index.css';
import { signup } from '@/api/auth.api';
import { setToken } from '@/utils/storage';

function SignUpForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { token } = await signup(formData);
      setToken(token);
      navigate('/goalsRegister');
    } catch (error) {
      console.error('Signup failed', error);
      //toast
    }
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
        <SignupHeader />

        <main className="grow flex items-center justify-center p-6 bg-gradient-mesh">
          <div className="auth-card">
            {/* Progress Section */}
            <div className="mb-10">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    Get Started
                  </span>
                  <h3 className="text-foreground dark:text-white text-sm font-medium">
                    Step 1 of 2: Profile Setup
                  </h3>
                </div>
                <span className="text-sm font-bold text-foreground dark:text-white">50%</span>
              </div>
              <div className="w-full bg-border-light dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-1/2 rounded-full transition-all duration-500"></div>
              </div>
            </div>

            {/* Form Header */}
            <div className="mb-10 text-center">
              <h1 className="text-foreground dark:text-white text-3xl font-bold mb-3">
                Start Your Journey
              </h1>
              <p className="text-muted-foreground dark:text-gray-400 text-base">
                Join 50,000+ athletes reaching their fitness goals today.
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <Label
                  htmlFor="name"
                  className="block text-sm font-semibold text-foreground dark:text-white mb-2"
                >
                  Full Name
                </Label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-gray-500"
                    size={20}
                  />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 h-14 bg-background-light dark:bg-white/5 border border-border-light dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:outline focus:border-primary dark:text-white placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-semibold text-foreground dark:text-white mb-2"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-gray-500"
                    size={20}
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 h-14 bg-background-light dark:bg-white/5 border border-border-light dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:outline focus:border-primary dark:text-white placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <Label
                  htmlFor="password"
                  className="block text-sm font-semibold text-foreground dark:text-white mb-2"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-gray-500"
                    size={20}
                  />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
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
                className="w-full h-14 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(19,236,128,0.4)] transition-all transform active:scale-[0.98]"
              >
                Continue to Goals
                <ArrowRight size={20} />
              </Button>
            </form>

            {/* T&C Section */}
            <p className="mt-8 text-center text-xs text-muted-foreground dark:text-gray-500 leading-relaxed px-4">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="text-primary hover:underline font-semibold">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary hover:underline font-semibold">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default SignUpForm;
