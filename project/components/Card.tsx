import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg sm:rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-3 sm:p-4',
        className
      )}
    >
      {children}
    </div>
  );
}