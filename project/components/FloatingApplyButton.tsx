'use client';

import { useEffect, useState } from 'react';
import { Button } from './Button';

export function FloatingApplyButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 sm:hidden px-4">
      <Button onClick={scrollToForm} className="shadow-lg whitespace-nowrap" size="md">
        Apply Now
      </Button>
    </div>
  );
}