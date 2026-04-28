'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Article } from '@/lib/news';

export default function NewsCard({ article }: { article: Article }) {
  const [imgSrc, setImgSrc] = useState(article.urlToImage);

  return (
    <div className="neo-box group flex flex-col h-full overflow-visible relative cursor-pointer" onClick={() => window.open(article.url, '_blank')}>
      <div className="relative h-64 w-full border-b-4 border-black overflow-hidden">
        <Image
          src={imgSrc}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
          onError={() => setImgSrc('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800')}
        />
        <div className="absolute top-4 left-4 bg-neo-green text-black text-[10px] font-black px-3 py-1 border-2 border-black shadow-neo-sm uppercase">
          {article.source.name}
        </div>
        <div className="absolute bottom-4 right-4 flex flex-wrap justify-end gap-1 max-w-[70%]">
          {article.categories.map(cat => (
            <span key={cat} className="bg-white text-black text-[8px] font-bold px-1.5 py-0.5 border border-black shadow-neo-xs uppercase">
              {cat}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col bg-white">
        <div className="text-black font-black text-xs mb-3 italic tracking-widest uppercase">
          // {new Date(article.publishedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
        <h3 className="text-2xl font-black leading-none mb-4 uppercase tracking-tighter group-hover:text-neo-green-dark transition-colors underline decoration-4 decoration-black group-hover:decoration-neo-green">
          {article.title}
        </h3>
        <p className="font-bold text-gray-700 text-sm line-clamp-4 mb-6 flex-grow leading-relaxed">
          {article.description}
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