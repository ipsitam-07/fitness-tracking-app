import { Link, useLocation } from 'react-router-dom';
import { User, Zap, LogOut, Menu, X, ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useCallback } from 'react';
import { useAuth } from '@/store/stores';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useUI } from '@/store/stores';
import { cn } from '@/lib/utils';

import { APP_NAME, ROUTES, SIDEBAR_LINKS, SIDEBAR_UI_STRINGS } from '@/utils/constants';

export function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();

  //sidebar state from global state
  const { isMobileMenuOpen, isSidebarCollapsed, setMobileMenuOpen, toggleSidebarCollapse } =
    useUI();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, [setMobileMenuOpen]);

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-900 border border-border-light dark:border-white/10 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        aria-label={SIDEBAR_UI_STRINGS.OPEN_MENU}
      >
        <Menu className="w-6 h-6 text-foreground" />
      </button>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'h-full border-r flex flex-col shrink-0 z-50 border-border-light dark:border-white/10 bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out',

          isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64',
          'lg:relative fixed inset-y-0 left-0',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          'w-64',
        )}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between gap-3 border-b border-border-light dark:border-white/10">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-1.5 rounded-lg flex items-center justify-center bg-primary shrink-0">
              <Zap className="text-primary-foreground font-bold" size={20} />
            </div>
            {!isSidebarCollapsed && (
              <h1 className="text-xl font-bold tracking-tight text-foreground whitespace-nowrap">
                {APP_NAME}
              </h1>
            )}
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={closeMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label={SIDEBAR_UI_STRINGS.CLOSE_MENU}
          >
            <X className="w-5 h-5 text-foreground" />
          </button>

          {/* Desktop Collapse Button */}
          <button
            onClick={toggleSidebarCollapse}
            className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label={
              isSidebarCollapsed
                ? SIDEBAR_UI_STRINGS.EXPAND_SIDEBAR
                : SIDEBAR_UI_STRINGS.COLLAPSE_SIDEBAR
            }
          >
            <ChevronLeft
              className={cn(
                'w-5 h-5 text-foreground transition-transform duration-300',
                isSidebarCollapsed && 'rotate-180',
              )}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="grow px-4 py-6 space-y-2 overflow-y-auto">
          {SIDEBAR_LINKS.map((item) => {
            const Icon = item.ICON;
            const isActive = location.pathname === item.PATH;

            return (
              <Link
                key={item.PATH}
                to={item.PATH}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative',
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold shadow-[0_0_15px_rgba(19,236,128,0.3)]'
                    : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-white/10 hover:text-foreground',
                  isSidebarCollapsed && 'justify-center',
                )}
                title={isSidebarCollapsed ? item.LABEL : undefined}
              >
                <Icon size={20} className="shrink-0" />
                {!isSidebarCollapsed && <span>{item.LABEL}</span>}

                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap pointer-events-none z-50">
                    {item.LABEL}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-white" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border-light dark:border-white/10">
          <div
            className={cn(
              'flex items-center gap-3 p-3 rounded-xl border bg-white dark:bg-white/5 border-border-light dark:border-white/10',
              isSidebarCollapsed && 'flex-col',
            )}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 shrink-0">
              <User className="text-primary" size={20} />
            </div>

            {!isSidebarCollapsed && (
              <>
                <div className="grow overflow-hidden">
                  <p className="text-sm font-semibold truncate text-foreground">
                    {user?.name || SIDEBAR_UI_STRINGS.DEFAULT_USER}
                  </p>
                  <p className="text-[10px] truncate text-muted-foreground">
                    {SIDEBAR_UI_STRINGS.PREMIUM_MEMBER}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-red-500 transition-colors text-muted-foreground shrink-0"
                  onClick={handleLogout}
                  title={SIDEBAR_UI_STRINGS.LOGOUT}
                >
                  <LogOut size={18} />
                </Button>
              </>
            )}

            {isSidebarCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-red-500 transition-colors text-muted-foreground w-full"
                onClick={handleLogout}
                title={SIDEBAR_UI_STRINGS.LOGOUT}
              >
                <LogOut size={18} />
              </Button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
