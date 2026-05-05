'use client';

import { useState, useEffect } from 'react';
import { Article } from '@/lib/news';

export default function NewsCard({ article }: { article: Article }) {
  const [imgSrc, setImgSrc] = useState(article.urlToImage);
  const [aiData, setAiData] = useState<{ summary: string; categories: string[] } | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    async function fetchAIData() {
      setLoadingAI(true);
      try {
        const res = await fetch('/api/ai-process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: article.title,
            description: article.description,
            url: article.url
          })
        });
        if (res.ok) {
          const data = await res.json();
          setAiData(data);
        }
      } catch (err) {
        console.error('Failed to fetch AI data:', err);
      } finally {
        setLoadingAI(false);
      }
    }
    fetchAIData();
  }, [article.url]);

  const displayCategories = aiData?.categories?.length ? aiData.categories : article.categories;
  const displaySummary = aiData?.summary || article.description;

  return (
    <div className="neo-box group flex flex-col h-full overflow-visible relative cursor-pointer" onClick={() => window.open(article.url, '_blank')}>
      <div className="relative h-64 w-full border-b-4 border-black overflow-hidden bg-gray-100">
        <img
          src={imgSrc}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
          onError={() => setImgSrc('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800')}
        />
        <div className="absolute top-4 left-4 bg-neo-green text-black text-[10px] font-black px-3 py-1 border-2 border-black shadow-neo-sm uppercase">
          {article.source.name}
        </div>
        <div className="absolute bottom-4 right-4 flex flex-wrap justify-end gap-1 max-w-[70%]">
          {displayCategories.map(cat => (
            <span key={cat} className="bg-white text-black text-[8px] font-bold px-1.5 py-0.5 border border-black shadow-neo-xs uppercase">
              {cat}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col bg-white">
        <div className="text-black font-black text-xs mb-3 italic tracking-widest uppercase flex justify-between">
          <span>
            // {new Date(article.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
          {loadingAI && <span className="animate-pulse text-neo-green-dark">AI Processing...</span>}
        </div>
        <h3 className="text-2xl font-black leading-none mb-4 uppercase tracking-tighter group-hover:text-neo-green-dark transition-colors underline decoration-4 decoration-black group-hover:decoration-neo-green">
          {article.title}
        </h3>
        <p className="font-bold text-gray-700 text-sm line-clamp-4 mb-6 flex-grow leading-relaxed">
          {displaySummary}
        </p>
        <div className="mt-auto">
          <div className="neo-button bg-black text-white group-hover:bg-neo-green group-hover:text-black inline-block w-full text-center uppercase tracking-widest text-sm">
            Read Article _
          </div>
        </div>
      </div>
    </div>
  );
}
