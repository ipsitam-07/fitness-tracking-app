import { LayoutDashboard, Dumbbell, Flag, User } from 'lucide-react';
export const FOOTER_TEXT = '@ 2026 FitTrack. All rights reserved.';
export const APP_NAME = 'FitTrack';
export const SIGNUP_HEADER = {
  MEMBER_TEXT: 'Already a member?',
  SIGN_IN_TEXT: 'Sign In',
};

export const LOGIN_TEXT = {
  WELCOME: 'Welcome Back!',
  WELCOME_SUBTEXT: 'Enter your details to access your dashboard.',
  EMAIL_LABEL: 'Email Address',
  EMAIL_PLACEHOLDER: 'name@example.com',
  PASSWORD_LABEL: 'Password',
  FORGOT_PASSWORD_LABEL: 'Forgot Password',
  LOGIN_ERROR: 'Invalid Email or Password',
  NO_ACCOUNT: "Don't have an account?",
  SIGN_UP: 'Sign Up',
};

export const SIGN_UP_TEXT = {
  PROGRESS_HEADING: 'Get Started',
  PROGRESS_SUB_HEADING: 'Step 1 of 2: Profile Setup',
  HEADING: 'Start Your Journey',
  SUB_HEADING: 'Join 50,000+ athletes reaching their fitness goals today.',
  NAME_LABEL: 'Full Name',
  NAME_PLACEHOLDER: 'John Doe',
  EMAIL_LABEL: 'Email Address',
  EMAIL_PLACEHOLDER: 'john@example.com',
  PASSWORD_LABEL: 'Password',
  PASSWORD_PLACEHOLDER: 'Min. 8 characters',
  SIGN_UP_IN_PROGRESS: 'Creating Account...',
  SIGN_UP_SUCCESS: 'Continue to Goals',
  SIGN_UP_ERROR: 'Signup failed. Please try again.',
  TERMS_TEXT: {
    AGREE_TEXT: 'By signing up, you agree to our',
    TERMS_TEXT: 'Terms of Service',
    AND: 'and',
    PRIVACY_TEXT: 'Privacy Policy',
  },
};

export const ACTIVE_GOALS = {
  HEADER: 'Active Goals',
  VIEW_ALL: 'View All',
  ADD_GOAL: 'Add New Goal',
};

export const DASHBOARD_HEADER = {
  WELCOME_TEXT: "Here's what's happening with your fitness today.",
  GREETINGS: 'Good Morning',
};

export const RECENT_WORKOUTS = {
  HEADER: 'Recent Workouts',
  SUB_HEADING: 'Log Workout',
  TABLE_HEAD: {
    TYPE: 'Type',
    DURATION: 'Duration',
    CALORIES: 'Calories',
    DATE: 'Date',
    ACTION: 'Action',
  },
  UNIT: 'kcal',
  ACTIONS: {
    EDIT: 'Edit',
    DELETE: 'Delete',
  },
  LOAD_MORE: 'Load more activities',
};

export const WEEKLY_ACTIVITY = {
  HEADER: 'Weekly Activity',
  THIS_WEEK: 'This Week',
  LAST_WEEK: 'Last Week',
  THIS_MONTH: 'This Month',
};

export const GOAL_TEXT = {
  FALLBACK_SUFFIX: 'Goal',

  ACTIONS: {
    EDIT: 'Edit',
    DELETE: 'Delete',
  },

  LABELS: {
    CURRENT: 'Current',
    TARGET: 'Target',
    ACHIEVED: 'achieved',
    DAYS_LEFT: 'days left',
    COMPLETED: 'Completed',
    START: 'Start',
    END: 'End',
  },
} as const;

export const GOAL_UNITS = {
  weight: 'kg',
  workout_count: 'workouts',
  calories: 'kcal',
  duration: 'min',
} as const;

export const GOAL_DATE_FORMAT = 'MMM dd, yyyy';

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  WORKOUT: '/workout',
  GOALS: '/goals',
  PROFILE: '/profile',
} as const;

export const SIDEBAR_LINKS = [
  { ICON: LayoutDashboard, LABEL: 'DASHBOARD', PATH: ROUTES.DASHBOARD },
  { ICON: Dumbbell, LABEL: 'WORKOUT', PATH: ROUTES.WORKOUT },
  { ICON: Flag, LABEL: 'GOALS', PATH: ROUTES.GOALS },
  { ICON: User, LABEL: 'PROFILE', PATH: ROUTES.PROFILE },
] as const;

export const SIDEBAR_UI_STRINGS = {
  LOGOUT: 'LOGOUT',
  PREMIUM_MEMBER: 'PREMIUM MEMBER',
  DEFAULT_USER: 'USER',
  OPEN_MENU: 'OPEN MENU',
  CLOSE_MENU: 'CLOSE MENU',
  EXPAND_SIDEBAR: 'EXPAND SIDEBAR',
  COLLAPSE_SIDEBAR: 'COLLAPSE SIDEBAR',
} as const;
