import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-right"
      expand={false}
      richColors={false}
      closeButton
      duration={4000}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white dark:group-[.toaster]:bg-gray-900 group-[.toaster]:text-foreground group-[.toaster]:border-2 group-[.toaster]:border-border-light dark:group-[.toaster]:border-white/10 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:p-4',
          title: 'group-[.toast]:text-sm group-[.toast]:font-bold group-[.toast]:text-foreground',
          description:
            'group-[.toast]:text-xs group-[.toast]:text-muted-foreground group-[.toast]:mt-1',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-white group-[.toast]:rounded-lg group-[.toast]:font-semibold group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:text-sm hover:group-[.toast]:opacity-90',
          cancelButton:
            'group-[.toast]:bg-gray-100 dark:group-[.toast]:bg-gray-800 group-[.toast]:text-foreground group-[.toast]:rounded-lg group-[.toast]:font-semibold group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:text-sm',
          closeButton:
            'group-[.toast]:bg-white dark:group-[.toast]:bg-gray-800 group-[.toast]:border group-[.toast]:border-border-light dark:group-[.toast]:border-white/10 group-[.toast]:text-foreground group-[.toast]:hover:bg-gray-50 dark:group-[.toast]:hover:bg-gray-700',
          success:
            'group-[.toast]:border-primary/30 dark:group-[.toast]:border-primary/20 group-[.toast]:bg-primary/5 dark:group-[.toast]:bg-primary/10',
          error:
            'group-[.toast]:border-red-300 dark:group-[.toast]:border-red-900/50 group-[.toast]:bg-red-50 dark:group-[.toast]:bg-red-950/30',
          warning:
            'group-[.toast]:border-yellow-300 dark:group-[.toast]:border-yellow-900/50 group-[.toast]:bg-yellow-50 dark:group-[.toast]:bg-yellow-950/30',
          info: 'group-[.toast]:border-blue-300 dark:group-[.toast]:border-blue-900/50 group-[.toast]:bg-blue-50 dark:group-[.toast]:bg-blue-950/30',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
