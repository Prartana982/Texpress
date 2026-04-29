'use client';

import { useState } from 'react';
import { useCategory, Category } from "@/context/CategoryContext";

export default function Header() {
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const { 
    category, 
    setCategory, 
    dateFilter, 
    setDateFilter, 
    selectedMonth, 
    setSelectedMonth, 
    availableMonths 
  } = useCategory();

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
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-black bg-neo-green py-6 shadow-neo-sm">
      <div className="container mx-auto px-4 flex flex-col items-center gap-8">
        <div 
          className="text-5xl font-black uppercase tracking-tighter border-4 border-black bg-white px-8 py-2 shadow-neo cursor-pointer transition-transform hover:-rotate-1 active:scale-95"
          onClick={() => { 
            setCategory('ALL'); 
            setDateFilter('ALL'); 
            setSelectedMonth('ALL');
          }}
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
            <div className="flex flex-wrap items-center justify-center gap-2">
              {dateOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setDateFilter(opt.value);
                    setSelectedMonth('ALL');
                    setIsMonthOpen(false);
                  }}
                  className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1 border-2 transition-all ${
                    dateFilter === opt.value
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black hover:bg-gray-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}

              {/* Month Dropdown Button */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsMonthOpen(!isMonthOpen);
                  }}
                  className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1 border-2 transition-all flex items-center gap-2 ${
                    dateFilter === 'MONTH'
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black hover:bg-gray-100'
                  }`}
                >
                  {selectedMonth === 'ALL' 
                    ? 'Select Month' 
                    : new Date(selectedMonth + "-02").toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  <span className={`transform transition-transform ${isMonthOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>

                {isMonthOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white border-4 border-black shadow-neo z-50 min-w-[150px] max-h-48 overflow-y-auto">
                    <button
                      onClick={() => {
                        setDateFilter('MONTH');
                        setSelectedMonth('ALL');
                        setIsMonthOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-[10px] font-black uppercase hover:bg-neo-green transition-colors border-b-2 border-black"
                    >
                      This Month
                    </button>
                    {availableMonths.map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          setDateFilter('MONTH');
                          setSelectedMonth(m);
                          setIsMonthOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-[10px] font-black uppercase hover:bg-neo-green transition-colors border-b-2 border-black last:border-b-0"
                      >
                        {new Date(m + "-02").toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
