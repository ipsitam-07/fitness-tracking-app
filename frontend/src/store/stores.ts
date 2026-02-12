import { clearToken, getToken, setToken } from '@/utils/storage';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

//Types

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthSlice {
  // State
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;

  // Actions
  setAuth: (user: User, token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  hydrate: () => void;
}

export interface UISlice {
  // State
  isMobileMenuOpen: boolean;
  isSidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';

  // Modal states
  isWorkoutFormOpen: boolean;
  isGoalFormOpen: boolean;
  editingWorkoutId: string | null;
  editingGoalId: string | null;

  // Search & filters
  workoutSearchQuery: string;
  workoutTypeFilter: string;
  goalStatusFilter: 'active' | 'completed' | 'all';

  // Actions
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebarCollapse: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;

  // Modal actions
  openWorkoutForm: (workoutId?: string) => void;
  closeWorkoutForm: () => void;
  openGoalForm: (goalId?: string) => void;
  closeGoalForm: () => void;

  // Search & filter actions
  setWorkoutSearchQuery: (query: string) => void;
  setWorkoutTypeFilter: (type: string) => void;
  setGoalStatusFilter: (status: 'active' | 'completed' | 'all') => void;
  resetFilters: () => void;
}

export interface AppSlice {
  // State
  isLoading: boolean;
  error: string | null;

  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// Combined store type
export type StoreState = AuthSlice & UISlice & AppSlice;

//Slices

const createAuthSlice = (set: any): AuthSlice => ({
  isAuthenticated: false,
  user: null,
  token: null,

  setAuth: (user, token) => {
    setToken(token);
    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  setUser: (user) => set({ user }),

  logout: () => {
    clearToken();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  hydrate: () => {
    const token = getToken();
    if (token) {
      set({ token, isAuthenticated: true });
    }
  },
});

const createUISlice = (set: any): UISlice => ({
  isMobileMenuOpen: false,
  isSidebarCollapsed: false,
  theme: 'system',

  isWorkoutFormOpen: false,
  isGoalFormOpen: false,
  editingWorkoutId: null,
  editingGoalId: null,

  workoutSearchQuery: '',
  workoutTypeFilter: '',
  goalStatusFilter: 'active',

  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  toggleMobileMenu: () => set((state: UISlice) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
  toggleSidebarCollapse: () =>
    set((state: UISlice) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

  setTheme: (theme) => set({ theme }),

  openWorkoutForm: (workoutId) =>
    set({
      isWorkoutFormOpen: true,
      editingWorkoutId: workoutId || null,
    }),
  closeWorkoutForm: () =>
    set({
      isWorkoutFormOpen: false,
      editingWorkoutId: null,
    }),

  openGoalForm: (goalId) =>
    set({
      isGoalFormOpen: true,
      editingGoalId: goalId || null,
    }),
  closeGoalForm: () =>
    set({
      isGoalFormOpen: false,
      editingGoalId: null,
    }),

  setWorkoutSearchQuery: (query) => set({ workoutSearchQuery: query }),
  setWorkoutTypeFilter: (type) => set({ workoutTypeFilter: type }),
  setGoalStatusFilter: (status) => set({ goalStatusFilter: status }),

  resetFilters: () =>
    set({
      workoutSearchQuery: '',
      workoutTypeFilter: '',
      goalStatusFilter: 'active',
    }),
});

const createAppSlice = (set: any): AppSlice => ({
  isLoading: false,
  error: null,

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
});

//Main store

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        ...createAuthSlice(set),
        ...createUISlice(set),
        ...createAppSlice(set),
      }),
      {
        name: 'fittrack-storage',
        // Only persist auth and theme
        partialize: (state) => ({
          token: state.token,
          theme: state.theme,
          isSidebarCollapsed: state.isSidebarCollapsed,
        }),
      },
    ),
    { name: 'FitTrack Store' },
  ),
);

//Selectors

export const useAuth = () =>
  useStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      token: state.token,
      setAuth: state.setAuth,
      setUser: state.setUser,
      logout: state.logout,
      hydrate: state.hydrate,
    })),
  );

export const useUI = () =>
  useStore(
    useShallow((state) => ({
      isMobileMenuOpen: state.isMobileMenuOpen,
      isSidebarCollapsed: state.isSidebarCollapsed,
      theme: state.theme,
      setMobileMenuOpen: state.setMobileMenuOpen,
      toggleMobileMenu: state.toggleMobileMenu,
      setSidebarCollapsed: state.setSidebarCollapsed,
      toggleSidebarCollapse: state.toggleSidebarCollapse,
      setTheme: state.setTheme,
    })),
  );

export const useWorkoutForm = () =>
  useStore(
    useShallow((state) => ({
      isOpen: state.isWorkoutFormOpen,
      editingId: state.editingWorkoutId,
      open: state.openWorkoutForm,
      close: state.closeWorkoutForm,
    })),
  );

export const useGoalForm = () =>
  useStore(
    useShallow((state) => ({
      isOpen: state.isGoalFormOpen,
      editingId: state.editingGoalId,
      open: state.openGoalForm,
      close: state.closeGoalForm,
    })),
  );

export const useWorkoutFilters = () =>
  useStore(
    useShallow((state) => ({
      searchQuery: state.workoutSearchQuery,
      typeFilter: state.workoutTypeFilter,
      setSearchQuery: state.setWorkoutSearchQuery,
      setTypeFilter: state.setWorkoutTypeFilter,
    })),
  );

export const useGoalFilters = () =>
  useStore(
    useShallow((state) => ({
      statusFilter: state.goalStatusFilter,
      setStatusFilter: state.setGoalStatusFilter,
    })),
  );

export const useAppState = () =>
  useStore(
    useShallow((state) => ({
      isLoading: state.isLoading,
      error: state.error,
      setLoading: state.setLoading,
      setError: state.setError,
      clearError: state.clearError,
    })),
  );
//Helper hooks

export const useResetStore = () => {
  const logout = useStore((state) => state.logout);
  const resetFilters = useStore((state) => state.resetFilters);
  const clearError = useStore((state) => state.clearError);

  return () => {
    logout();
    resetFilters();
    clearError();
  };
};
