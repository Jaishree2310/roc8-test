import React from 'react';
import { FilterType } from '@/app/types/email';

interface FilterButtonProps {
  label: string;
  filterType: FilterType;
  currentFilter: FilterType;
  onClick: (filter: FilterType) => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
    label,
    filterType,
    currentFilter,
    onClick,
  }) => (
    <button
      onClick={() => onClick(filterType)}
      className={`
        px-4 py-1 rounded-full transition-colors
        ${currentFilter === filterType
          ? 'bg-filter-button text-text'
          : 'bg-transparent text-text hover:bg-filter-button/50'
        }
      `}
    >
      {label}
    </button>
  );