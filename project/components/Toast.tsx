'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type = 'success', duration = 4000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300',
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
    >
      <div
        className={cn(
          'rounded-2xl p-4 shadow-lg border',
          type === 'success' 
            ? 'bg-pink-50 border-pink-200 text-pink-700' 
            : 'bg-red-50 border-red-200 text-red-700'
        )}
      >
        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="ml-3 text-current opacity-50 hover:opacity-75"
          >
            <span className="sr-only">Close</span>
            ×
          </button>
        </div>
      </div>
    </div>
  );
}