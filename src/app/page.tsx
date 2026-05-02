'use client';

import { useEffect, useState, useMemo } from "react";
import { getTechNews, Article } from "@/lib/news";
import NewsCard from "@/components/NewsCard";
import { useCategory } from "@/context/CategoryContext";
import { useSession } from "next-auth/react";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  const { data: session, status } = useSession();
  const { category, dateFilter, selectedMonth, setAvailableMonths } = useCategory();
  const [allNews, setAllNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      const data = await getTechNews();
      setAllNews(data);
      
      // Extract available months for the Header dropdown
      const months = new Set<string>();
      data.forEach(article => {
        const date = new Date(article.publishedAt);
        if (!isNaN(date.getTime())) {
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          months.add(monthKey);
        }
      });
      setAvailableMonths(Array.from(months).sort().reverse());
      
      setLoading(false);
    }
    fetchNews();
  }, [setAvailableMonths]);

  // Reset pagination when filter changes
  useEffect(() => {
    setVisibleCount(12);
  }, [category, dateFilter, selectedMonth]);

  const filteredNews = useMemo(() => {
    const now = new Date();
    
    // Safety check: if no news yet, return empty
    if (!allNews || allNews.length === 0) return [];

    return allNews.filter(article => {
      // 1. Category logic
      // CATEGORY_MAP in news.ts classifies articles into "General Tech" if no keywords match.
      // We should match if the selected category is in the article's categories list.
      const matchesCategory = category === 'ALL' || (article.categories && article.categories.includes(category));
      if (!matchesCategory) return false;

      // 2. Date Filtering Logic (MUTUALLY EXCLUSIVE)
      const pubDateString = article.publishedAt;
      const pubDate = new Date(pubDateString);
      
      if (isNaN(pubDate.getTime())) return false;

      // Reset hours for relative time comparisons if needed, but diffInHrs is fine
      // If a specific month is selected via "MONTH" filter dropdown
      if (dateFilter === 'MONTH') {
        if (selectedMonth && selectedMonth !== 'ALL') {
          // Normalize selectedMonth to YYYY-MM if it's not already
          const articleMonth = `${pubDate.getFullYear()}-${String(pubDate.getMonth() + 1).padStart(2, '0')}`;
          return articleMonth === selectedMonth;
        }
        // If dateFilter is MONTH but selectedMonth is ALL, show everything from the CURRENT calendar month
        return pubDate.getMonth() === now.getMonth() && pubDate.getFullYear() === now.getFullYear();
      }

      const diffInMs = now.getTime() - pubDate.getTime();
      const diffInHrs = diffInMs / (1000 * 60 * 60);

      switch (dateFilter) {
        case 'TODAY':
          // Within last 24 hours OR same calendar day
          return diffInHrs <= 24 || pubDate.toDateString() === now.toDateString();
        case 'WEEK':
          // Within last 7 days
          return diffInHrs <= 168; // 24 * 7
        case 'ALL':
        default:
          return true;
      }
    });
  }, [allNews, category, dateFilter, selectedMonth]);

  const visibleArticles = useMemo(() => {
    return filteredNews.slice(0, visibleCount);
  }, [filteredNews, visibleCount]);

  if (status === "loading") {
    return (
      <div className="flex justify-center py-20">
        <div className="text-4xl font-black uppercase tracking-widest animate-pulse border-8 border-black p-8 bg-white shadow-neo">
          Authenticating access...
        </div>
      </div>
    );
  }

  if (!session) {
    return <LandingPage />;
  }

  return (
    <div className="space-y-16">
      <section className="text-left space-y-6">
        <div className="inline-block border-4 border-black bg-neo-green px-6 py-2 shadow-neo-lg -rotate-1">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-black">
            {category === 'ALL' ? 'The Future' : category} <br/>is Now.
          </h1>
        </div>
        <p className="text-xl md:text-2xl font-bold border-4 border-black bg-white p-6 shadow-neo max-w-2xl rotate-1">
          {category === 'ALL' 
            ? "Real-time technology updates across all sectors." 
            : `Deep dive into ${category} with real-time updates.`} Powered by global RSS feeds.
        </p>
      </section>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="text-4xl font-black uppercase tracking-widest animate-pulse border-8 border-black p-8 bg-white shadow-neo">
            Scanning the grid...
          </div>
        </div>
      ) : (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {visibleArticles.map((article, idx) => (
              <NewsCard key={article.url || idx} article={article} />
            ))}
          </section>

          {filteredNews.length > visibleCount && (
            <div className="flex justify-center mt-12 pb-12">
              <button 
                onClick={() => setVisibleCount(prev => prev + 12)}
                className="neo-button bg-neo-green text-black text-xl font-black uppercase tracking-widest px-12 py-4 border-4 border-black hover:bg-black hover:text-white transition-all transform hover:-translate-y-1 active:translate-y-0"
              >
                Load More Articles _
              </button>
            </div>
          )}
        </>
      )}

      {!loading && filteredNews.length === 0 && (
        <div className="text-center py-20 border-8 border-black border-dashed bg-white shadow-neo">
          <p className="text-2xl font-black uppercase italic">No articles found for these filters. The grid is silent.</p>
        </div>
      )}
    </div>
  );
}
