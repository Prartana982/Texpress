'use client';

import { useEffect, useState, useMemo } from "react";
import { getTechNews, Article } from "@/lib/news";
import NewsCard from "@/components/NewsCard";
import { useCategory } from "@/context/CategoryContext";

export default function Home() {
  const { category, dateFilter } = useCategory();
  const [allNews, setAllNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      const data = await getTechNews();
      setAllNews(data);
      setLoading(false);
    }
    fetchNews();
  }, []);

  // Reset pagination when filter changes
  useEffect(() => {
    setVisibleCount(12);
  }, [category, dateFilter]);

  const filteredNews = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return allNews.filter(article => {
      // 1. Category logic
      const matchesCategory = category === 'ALL' || article.categories.includes(category);
      if (!matchesCategory) return false;

      // 2. Date logic
      if (dateFilter === 'ALL') return true;

      const pubDate = new Date(article.publishedAt);
      if (isNaN(pubDate.getTime())) return false;

      const diffInHrs = (now.getTime() - pubDate.getTime()) / (1000 * 60 * 60);

      switch (dateFilter) {
        case 'TODAY':
          return diffInHrs <= 24;
        case 'WEEK':
          return diffInHrs <= 24 * 7;
        case 'MONTH':
          return pubDate.getMonth() === currentMonth && pubDate.getFullYear() === currentYear;
        default:
          return true;
      }
    });
  }, [allNews, category, dateFilter]);

  const visibleArticles = useMemo(() => {
    return filteredNews.slice(0, visibleCount);
  }, [filteredNews, visibleCount]);

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
