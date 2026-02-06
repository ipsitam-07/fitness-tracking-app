import { Globe, HeadphonesIcon } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full py-8 text-center bg-white dark:bg-background-dark border-t border-border-light dark:border-white/5">
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-4">
        <p className="text-muted-foreground dark:text-gray-400 text-sm">
          @ 2026 FitTrack. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Globe size={20} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <HeadphonesIcon size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
