'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Category = 'LATEST' | 'SOFTWARE' | 'AI' | 'HARDWARE' | 'ARVR' | 'CYBERSECURITY';

interface CategoryContextType {
  category: Category;
  setCategory: (category: Category) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<Category>('LATEST');

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
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
