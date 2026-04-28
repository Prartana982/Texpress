'use client';

import { useCategory, Category } from "@/context/CategoryContext";

export default function Header() {
  const { category, setCategory } = useCategory();

  const categories: Category[] = [
    'ALL', 
    'AI / GenAI', 
    'Cybersecurity', 
    'AR/VR', 
    'Software Development', 
    'Hardware & Semiconductors', 
    'Cloud & DevOps', 
    'Data Science & Analytics', 
    'Blockchain & Web3', 
    'Startups & Business Tech', 
    'Consumer Tech'
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-black bg-neo-green py-4">
      <div className="container mx-auto px-4 flex flex-col items-center gap-6">
        <div 
          className="text-4xl font-black uppercase tracking-tighter border-4 border-black bg-white px-6 py-2 shadow-neo cursor-pointer transition-transform hover:-rotate-1 active:scale-95"
          onClick={() => setCategory('ALL')}
        >
          Texpress
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-3 w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`neo-button text-[10px] md:text-xs font-black uppercase tracking-widest transition-all px-4 py-2 border-2 ${
                category === cat 
                  ? 'bg-black text-white -translate-y-1 shadow-neo-sm border-black' 
                  : 'bg-white text-black border-black hover:bg-neo-green-dark hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
