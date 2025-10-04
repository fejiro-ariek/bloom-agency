import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  eyebrow?: string;
  title?: string;
}

export function Section({ children, className, id, eyebrow, title }: SectionProps) {
  return (
    <section 
      id={id}
      className={cn('py-4 sm:py-6 md:py-8', className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-lg">
        {(eyebrow || title) && (
          <div className="text-center mb-4 sm:mb-6">
            {eyebrow && (
              <div className="text-xs font-medium text-pink-500 uppercase tracking-wider mb-2">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-ink-900">
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}