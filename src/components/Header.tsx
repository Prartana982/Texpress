'use client';

import { useState } from 'react';
import { useCategory, Category } from "@/context/CategoryContext";
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';

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

  const { data: session } = useSession();

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
    <header className="sticky top-0 z-50 w-full border-b-4 border-black bg-neo-green py-3 shadow-neo-sm">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4">
        <div className="w-full flex justify-between items-center relative gap-4">
          <div className="flex-1 hidden md:block"></div>
          
          <div 
            className="text-2xl md:text-3xl font-black uppercase tracking-tighter border-4 border-black bg-white px-4 py-1 shadow-neo cursor-pointer transition-transform hover:-rotate-1 active:scale-95 mx-auto"
            onClick={() => { 
              setCategory('ALL'); 
              setDateFilter('ALL'); 
              setSelectedMonth('ALL');
            }}
          >
            Texpress
          </div>

          <div className="flex-1 flex justify-end items-center gap-2">
            {session ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block text-[10px] font-black uppercase bg-white border-2 border-black px-2 py-1 shadow-neo-xs truncate max-w-[120px]">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="neo-button text-[9px] font-black uppercase bg-red-400 border-2 border-black px-3 py-1 shadow-neo-xs hover:bg-black hover:text-white transition-all whitespace-nowrap"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="neo-button text-[9px] font-black uppercase bg-white border-2 border-black px-3 py-1 shadow-neo-xs hover:bg-black hover:text-white transition-all whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="neo-button text-[9px] font-black uppercase bg-black text-white border-2 border-black px-3 py-1 shadow-neo-xs hover:bg-white hover:text-black transition-all whitespace-nowrap"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>

        {session && (
          <div className="w-full space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
            {/* Categories - Scrollable */}
            <nav className="flex items-center gap-2 w-full overflow-x-auto no-scrollbar pb-1 -mx-2 px-2 scroll-smooth">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex-none text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all px-3 py-1.5 border-2 ${
                    category === cat 
                      ? 'bg-black text-white -translate-y-0.5 shadow-neo-xs border-black' 
                      : 'bg-white text-black border-black hover:bg-neo-green-dark hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>

            {/* Date Filters - More Compact */}
            <div className="flex items-center justify-center gap-3 border-t-2 border-black/10 pt-3">
              <span className="hidden sm:inline-block text-[9px] font-black uppercase tracking-widest opacity-50">Filter:</span>
              <div className="flex items-center justify-center gap-2">
                {dateOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setDateFilter(opt.value);
                      setSelectedMonth('ALL');
                      setIsMonthOpen(false);
                    }}
                    className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 border-2 transition-all ${
                      dateFilter === opt.value
                        ? 'bg-black text-white border-black shadow-neo-xs'
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
                    className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 border-2 transition-all flex items-center gap-2 ${
                      dateFilter === 'MONTH'
                        ? 'bg-black text-white border-black shadow-neo-xs'
                        : 'bg-white text-black border-black hover:bg-gray-100'
                    }`}
                  >
                    {selectedMonth === 'ALL' 
                      ? 'Month' 
                      : new Date(selectedMonth + "-02").toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    <span className={`text-[8px] transform transition-transform ${isMonthOpen ? 'rotate-180' : ''}`}>▼</span>
                  </button>

                  {isMonthOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-white border-4 border-black shadow-neo z-50 min-w-[140px] max-h-48 overflow-y-auto">
                      <button
                        onClick={() => {
                          setDateFilter('MONTH');
                          setSelectedMonth('ALL');
                          setIsMonthOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-[9px] font-black uppercase hover:bg-neo-green transition-colors border-b-2 border-black"
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
                          className="w-full text-left px-3 py-2 text-[9px] font-black uppercase hover:bg-neo-green transition-colors border-b-2 border-black last:border-b-0"
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
        )}
      </div>
    </header>
  );
}
