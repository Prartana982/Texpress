import Parser from 'rss-parser';

export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  categories: string[];
}

const parser = new Parser();

const RSS_FEEDS = [
  { name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
  { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
  { name: 'Wired', url: 'https://www.wired.com/feed/rss' },
  { name: 'Hacker News', url: 'https://news.ycombinator.com/rss' }
];

export const CATEGORY_MAP: Record<string, string[]> = {
  "AI / GenAI": ["ai", "artificial intelligence", "genai", "openai", "chatgpt", "llm", "neural", "machine learning", "deep learning", "transformer", "diffusion", "claude", "gemini", "stable diffusion"],
  "Cybersecurity": ["cyber", "security", "hack", "malware", "ransomware", "breach", "exploit", "vulnerability", "encryption", "phishing", "firewall", "zero-day"],
  "AR/VR": ["ar", "vr", "mixed reality", "vision pro", "meta quest", "oculus", "augmented reality", "virtual reality", "spatial computing", "metaverse"],
  "Software Development": ["coding", "programming", "software", "development", "developer", "framework", "library", "react", "node", "typescript", "git", "api", "backend", "frontend"],
  "Hardware & Semiconductors": ["hardware", "chip", "semiconductor", "processor", "gpu", "cpu", "nvidia", "intel", "amd", "apple silicon", "tsmc", "arm"],
  "Cloud & DevOps": ["cloud", "aws", "azure", "google cloud", "devops", "kubernetes", "docker", "serverless", "infrastructure", "saas", "paas"],
  "Data Science & Analytics": ["data", "analytics", "big data", "sql", "dashboard", "visualization", "bi", "predictive", "statistics", "dataset"],
  "Blockchain & Web3": ["blockchain", "crypto", "bitcoin", "ethereum", "web3", "nft", "smart contract", "dao", "defi", "ledger", "mining"],
  "Startups & Business Tech": ["startup", "venture capital", "vc", "funding", "acquisition", "ipo", "founder", "unicorn", "enterprise", "business"],
  "Consumer Tech": ["smartphone", "iphone", "android", "gadget", "laptop", "wearable", "smartwatch", "tv", "audio", "camera", "tablet"]
};

function classifyArticle(title: string, description: string): string[] {
  const categories: string[] = [];
  const text = `${title} ${description}`.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_MAP)) {
    if (keywords.some(keyword => text.includes(keyword.toLowerCase()))) {
      categories.push(category);
    }
  }

  return categories.length > 0 ? categories : ["General Tech"];
}

export async function getTechNews(): Promise<Article[]> {
  try {
    const feedPromises = RSS_FEEDS.map(async (feed) => {
      try {
        const parsedFeed = await parser.parseURL(feed.url);
        
        return parsedFeed.items.map(item => {
          const title = item.title || '';
          const description = item.contentSnippet || item.content || '';
          
          return {
            title,
            description,
            url: item.link || '',
            urlToImage: (item as any).enclosure?.url || extractImageFromContent(item.content || '') || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
            publishedAt: item.pubDate || new Date().toISOString(),
            source: { name: feed.name },
            categories: classifyArticle(title, description)
          };
        });
      } catch (e) {
        console.error(`Error fetching feed ${feed.name}:`, e);
        return [];
      }
    });

    const results = await Promise.all(feedPromises);
    
    // Flatten, remove duplicates by URL, and sort by date
    const uniqueArticles = Array.from(
      new Map(results.flat().map(item => [item.url, item])).values()
    );

    const sortedArticles = uniqueArticles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return sortedArticles.slice(0, 30); // Return top 30 latest articles
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

function extractImageFromContent(content: string): string | null {
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = content.match(imgRegex);
  return match ? match[1] : null;
}
