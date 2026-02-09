import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'mt-1 flex min-h-[80px] max-h-[200px] w-full resize-none rounded-xl border border-border-light dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-sm font-medium shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all overflow-y-auto',
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
