'use client';

import { useEffect, useState } from "react";
import { getTechNews, Article } from "@/lib/news";
import NewsCard from "@/components/NewsCard";
import { useCategory } from "@/context/CategoryContext";

export default function Home() {
  const { category } = useCategory();
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      const data = await getTechNews(category);
      setNews(data);
      setLoading(false);
    }
    fetchNews();
  }, [category]);

  return (
    <div className="space-y-16">
      <section className="text-left space-y-6">
        <div className="inline-block border-4 border-black bg-neo-green px-6 py-2 shadow-neo-lg -rotate-1">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-black">
            {category === 'LATEST' ? 'The Future' : category} <br/>is Now.
          </h1>
        </div>
        <p className="text-xl md:text-2xl font-bold border-4 border-black bg-white p-6 shadow-neo max-w-2xl rotate-1">
          Real-time {category.toLowerCase()} technology updates powered by global RSS feeds. Stay ahead of the curve with no-nonsense tech reporting.
        </p>
      </section>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="text-4xl font-black uppercase tracking-widest animate-pulse border-8 border-black p-8 bg-white shadow-neo">
            Loading {category} data...
          </div>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {news.map((article, idx) => (
            <NewsCard key={article.url || idx} article={article} />
          ))}
        </section>
      )}

      {!loading && news.length === 0 && (
        <div className="text-center py-20 border-8 border-black border-dashed bg-white shadow-neo">
          <p className="text-2xl font-black uppercase italic">No news updates found for {category}. The grid is silent.</p>
        </div>
      )}
    </div>
  );
}
