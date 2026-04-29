'use client';

import { useCategory, Category } from "@/context/CategoryContext";

export default function Header() {
  const { category, setCategory, dateFilter, setDateFilter } = useCategory();

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

  const dateOptions: { label: string, value: typeof dateFilter }[] = [
    { label: 'All Time', value: 'ALL' },
    { label: 'Today', value: 'TODAY' },
    { label: 'This Week', value: 'WEEK' },
    { label: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), value: 'MONTH' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-black bg-neo-green py-6 shadow-neo-sm">
      <div className="container mx-auto px-4 flex flex-col items-center gap-8">
        <div 
          className="text-5xl font-black uppercase tracking-tighter border-4 border-black bg-white px-8 py-2 shadow-neo cursor-pointer transition-transform hover:-rotate-1 active:scale-95"
          onClick={() => { setCategory('ALL'); setDateFilter('ALL'); }}
        >
          Texpress
        </div>

        <div className="w-full space-y-6">
          {/* Categories */}
          <nav className="flex flex-wrap items-center justify-center gap-3 w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`neo-button text-[10px] md:text-xs font-black uppercase tracking-widest transition-all px-4 py-2 border-2 ${
                  category === cat 
                    ? 'bg-black text-white -translate-y-1 shadow-neo-sm border-black' 
                    : 'bg-white text-black border-black hover:bg-neo-green-dark hover:text-white shadow-neo-xs'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Date Filters */}
          <div className="flex items-center justify-center gap-4 border-t-2 border-black/10 pt-4">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Filter by Date:</span>
            <div className="flex gap-2">
              {dateOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setDateFilter(opt.value)}
                  className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1 border-2 transition-all ${
                    dateFilter === opt.value
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black hover:bg-gray-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
