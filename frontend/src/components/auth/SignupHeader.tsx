import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { APP_NAME, SIGNUP_HEADER } from '@/utils/constants';

interface HeaderProps {
  showAuthButtons?: boolean;
}

export function SignupHeader({ showAuthButtons = true }: HeaderProps) {
  return (
    <header className="w-full px-6 lg:px-40 py-5 flex items-center justify-between border-b border-border-light dark:border-white/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-3">
        <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center">
          <Zap className="text-primary-foreground font-bold" size={20} />
        </div>
        <h2 className="text-foreground dark:text-white text-xl font-bold tracking-tight">
          {APP_NAME}
        </h2>
      </Link>

      {showAuthButtons && (
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-sm text-muted-foreground dark:text-gray-400">
            {SIGNUP_HEADER.MEMBER_TEXT}
          </span>
          <Link
            to="/login"
            className="flex min-w-25 cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
          >
            {SIGNUP_HEADER.SIGN_IN_TEXT}
          </Link>
        </div>
      )}
    </header>
  );
}
