'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-100 rounded-lg overflow-hidden mx-2 sm:mx-0">
          <button
            className="w-full text-left p-3 sm:p-4 hover:bg-pink-50 transition-colors duration-200 focus-visible"
            onClick={() => toggleItem(index)}
            aria-expanded={openItems.includes(index)}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-ink-900 text-xs sm:text-sm pr-2">
                {item.question}
              </h3>
              <div
                className={cn(
                  'transition-transform duration-200 text-pink-500 text-base flex-shrink-0',
                  openItems.includes(index) ? 'rotate-45' : 'rotate-0'
                )}
              >
                +
              </div>
            </div>
          </button>
          <div
            className={cn(
              'overflow-hidden transition-all duration-300',
              openItems.includes(index) 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0'
            )}
          >
            <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-xs sm:text-sm text-ink-600 leading-snug">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}