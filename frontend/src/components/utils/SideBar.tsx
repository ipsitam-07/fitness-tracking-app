import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Dumbbell, Flag, User, Zap, LogOut } from 'lucide-react';
import { Button } from '../ui/button';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Dumbbell, label: 'Workout', path: '/workout' },
  { icon: Flag, label: 'Goals', path: '/goals' },
  { icon: User, label: 'Profile', path: '/profile' },
];
import { useAuthStore } from '@/store/auth.store';
import { useNavigate } from 'react-router-dom';

import { useCurrentUser } from '@/hooks/useCurrentUser';

export function Sidebar() {
  const location = useLocation();
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const { data: user } = useCurrentUser();
  return (
    <aside className="w-64 h-full border-r flex flex-col shrink-0 z-50 border-border bg-background-light">
      {/* Logo */}
      <div className="p-8 flex items-center gap-3">
        <div className="p-1.5 rounded-lg flex items-center justify-center bg-primary">
          <Zap className="text-primary-foreground font-bold" size={20} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-foreground">FitTrack</h1>
      </div>

      {/* Navigation */}

      <nav className="grow px-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
              style={{
                backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                color: isActive ? '#102219' : 'var(--muted-foreground)',
                fontWeight: isActive ? '600' : '400',
                boxShadow: isActive ? '0 0 15px rgba(19, 236, 128, 0.3)' : 'none',
              }}
            >
              <Icon size={20} />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Footer */}

      <div className="p-6 border-t border-border">
        <div className="flex items-center gap-3 p-3 rounded-xl border bg-foreground border-border">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted-foreground">
            <User className="text-primary" size={20} />
          </div>
          <div className="grow overflow-hidden">
            <p className="text-sm font-semibold truncate text-foreground">{user?.name}</p>
            <p className="text-[10px] truncate text-muted-foreground">Premium Member</p>
          </div>
          <Button
            className="hover:text-red-500 flex items-center justify-center transition-colors text-muted-foreground bg-transparent shadow-transparent hover:bg-transparent p-0"
            onClick={handleLogout}
          >
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </aside>
  );
}
