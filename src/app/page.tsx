'use client';

import { useEffect, useState, useMemo } from "react";
import { getTechNews, Article } from "@/lib/news";
import NewsCard from "@/components/NewsCard";
import { useCategory } from "@/context/CategoryContext";

export default function Home() {
  const { category } = useCategory();
  const [allNews, setAllNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      const data = await getTechNews();
      setAllNews(data);
      setLoading(false);
    }
    fetchNews();
  }, []);

  const filteredNews = useMemo(() => {
    if (category === 'ALL') return allNews;
    return allNews.filter(article => article.categories.includes(category));
  }, [allNews, category]);

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
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredNews.map((article, idx) => (
            <NewsCard key={article.url || idx} article={article} />
          ))}
        </section>
      )}

      {!loading && filteredNews.length === 0 && (
        <div className="text-center py-20 border-8 border-black border-dashed bg-white shadow-neo">
          <p className="text-2xl font-black uppercase italic">No articles found in {category} right now. The grid is silent.</p>
        </div>
      )}
    </div>
  );
}
