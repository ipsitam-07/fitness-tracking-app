import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { PRODUCT_TITLE } from '@/utils/constants';

export function LoginHeader() {
  return (
    <header className="w-full px-6 lg:px-40 py-5 flex items-center justify-between border-b border-border-light dark:border-white/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-3">
        <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center">
          <Zap className="text-primary-foreground font-bold" size={20} />
        </div>
        <h2 className="text-foreground dark:text-white text-xl font-bold tracking-tight">
          {PRODUCT_TITLE}
        </h2>
      </Link>
    </header>
  );
}
