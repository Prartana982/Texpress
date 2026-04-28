'use client';

import { useCategory, Category } from "@/context/CategoryContext";

export default function Header() {
  const { category, setCategory } = useCategory();

  const categories: Category[] = ['LATEST', 'SOFTWARE', 'AI', 'HARDWARE', 'ARVR', 'CYBERSECURITY'];

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-black bg-neo-green py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div 
          className="text-3xl font-black uppercase tracking-tighter border-4 border-black bg-white px-4 py-1 shadow-neo cursor-pointer"
          onClick={() => setCategory('LATEST')}
        >
          Texpress
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`neo-button text-xs font-bold uppercase tracking-wider transition-all px-3 py-1 ${
                category === cat 
                  ? 'bg-black text-white -translate-y-1 shadow-neo-sm' 
                  : 'bg-white hover:bg-black hover:text-white'
              }`}
            >
              {cat === 'ARVR' ? 'AR/VR' : cat}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
