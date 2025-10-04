'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible disabled:pointer-events-none disabled:opacity-50',
          // Size variants
          {
            'px-3 py-1.5 text-xs': size === 'xs', 
            'px-4 py-2 text-sm': size === 'sm',
            'px-5 py-2.5 sm:px-6 sm:py-3 text-sm': size === 'md',
            'px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold': size === 'lg',
          },
          // Color variants
          {
            'bg-pink-500 text-white hover:bg-pink-600 shadow-md hover:shadow-lg hover:scale-105': variant === 'primary',
            'border border-ink-400 text-ink-600 hover:border-pink-500 hover:text-pink-500 bg-white hover:bg-pink-50': variant === 'ghost',
            'text-pink-500 hover:text-pink-600 underline-offset-4 hover:underline': variant === 'link',
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };