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

interface CategoryContextType {
  category: Category;
  setCategory: (category: Category) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<Category>('ALL');

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
