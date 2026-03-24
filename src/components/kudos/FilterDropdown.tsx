'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@/components/icons/KudosIcons';
import { useI18n } from '@/libs/i18n/context';

interface FilterDropdownProps {
  label: string;
  options: { value: string; label: string }[];
  onFilter: (value: string | null) => void;
  selectedValue?: string | null;
}

export function FilterDropdown({ label, options, onFilter, selectedValue }: FilterDropdownProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: string | null) => {
    onFilter(value);
    setIsOpen(false);
  };

  const displayLabel = selectedValue
    ? options.find((o) => o.value === selectedValue)?.label || label
    : label;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 rounded border px-4 py-3 font-montserrat text-sm font-bold transition-colors
          ${isOpen
            ? 'border-[#FFEA9E] bg-[rgba(255,234,158,0.1)] text-[#FFEA9E]'
            : selectedValue
              ? 'border-[#FFEA9E] text-[#FFEA9E]'
              : 'border-[#998C5F] text-white hover:border-[#FFEA9E] hover:text-[#FFEA9E]'
          }
        `}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {displayLabel}
        <ChevronDownIcon size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute top-full z-20 mt-1 max-h-60 w-48 overflow-y-auto rounded-lg border border-[#998C5F] bg-[#00101A] py-1 shadow-lg"
        >
          <button
            role="option"
            aria-selected={!selectedValue}
            onClick={() => handleSelect(null)}
            className={`w-full px-4 py-2 text-left font-montserrat text-sm transition-colors
              ${!selectedValue ? 'bg-[rgba(255,234,158,0.1)] text-[#FFEA9E]' : 'text-white hover:bg-[rgba(255,234,158,0.05)]'}
            `}
          >
            {t('kudos.filter_all')}
          </button>
          {options.map((opt) => (
            <button
              key={opt.value}
              role="option"
              aria-selected={selectedValue === opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`w-full px-4 py-2 text-left font-montserrat text-sm transition-colors
                ${selectedValue === opt.value ? 'bg-[rgba(255,234,158,0.1)] text-[#FFEA9E]' : 'text-white hover:bg-[rgba(255,234,158,0.05)]'}
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
