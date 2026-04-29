'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Category = 
  | 'ALL' 
  | 'AI / GenAI' 
  | 'Cybersecurity' 
  | 'AR/VR' 
  | 'Software Development' 
  | 'Hardware & Semiconductors' 
  | 'Cloud & DevOps' 
  | 'Data Science & Analytics' 
  | 'Blockchain & Web3' 
  | 'Startups & Business Tech' 
  | 'Consumer Tech' 
  | 'General Tech';

export type DateFilter = 'ALL' | 'TODAY' | 'WEEK' | 'MONTH';

interface CategoryContextType {
  category: Category;
  setCategory: (category: Category) => void;
  dateFilter: DateFilter;
  setDateFilter: (filter: DateFilter) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  availableMonths: string[];
  setAvailableMonths: (months: string[]) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<Category>('ALL');
  const [dateFilter, setDateFilter] = useState<DateFilter>('ALL');
  const [selectedMonth, setSelectedMonth] = useState<string>('ALL');
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);

  return (
    <CategoryContext.Provider value={{ 
      category, 
      setCategory, 
      dateFilter, 
      setDateFilter,
      selectedMonth,
      setSelectedMonth,
      availableMonths,
      setAvailableMonths
    }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
}
