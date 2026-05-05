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
  { name: 'Wired', url: 'https://www.wired.com/feed/rss' },
  { name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
  { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
  { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index' },
  { name: 'Engadget', url: 'https://www.engadget.com/rss.xml' }
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

function extractImageFromContent(item: any): string | null {
  // 1. Try media:content from Atom/RSS
  if (item['media:content']) {
    const media = item['media:content'];
    if (Array.isArray(media) && media[0]?.$.url) return media[0].$.url;
    if (media.$?.url) return media.$.url;
  }

  // 2. Try media:group (Common in some feeds like YouTube or Wired)
  if (item['media:group'] && item['media:group']['media:content']) {
    const media = item['media:group']['media:content'];
    if (Array.isArray(media) && media.length > 0) return media[0].$.url;
    if (media.$ && media.$.url) return media.$.url;
  }

  // 3. Try standard enclosure
  if (item.enclosure && item.enclosure.url) {
    return item.enclosure.url;
  }

  // 4. Try parsing <img> from any possible text field
  const content = (item.content || item.contentSnippet || item.summary || item.description || (item['content:encoded'] || '')).toString();
  const imgRegex = /<img[^>]+src=["']([^"'>]+)["']/;
  const match = content.match(imgRegex);
  if (match) {
    const url = match[1];
    return url.startsWith('//') ? `https:${url}` : url;
  }

  // 5. Try tech-specific metadata fields
  if (item['og:image']) return item['og:image'];
  if (item['twitter:image']) return item['twitter:image'];
  
  return null;
}

export async function getTechNews(): Promise<Article[]> {
  const isServer = typeof window === 'undefined';
  
  try {
    const feedPromises = RSS_FEEDS.map(async (feed) => {
      try {
        console.log(`Fetching ${feed.name} from ${feed.url}`);
        
        let xmlContent = '';
        
        if (isServer) {
          // Server-side: Direct fetch
          const response = await fetch(feed.url, { next: { revalidate: 3600 } });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          xmlContent = await response.text();
        } else {
          // Client-side: Use multiple specific strategies
          try {
            // Strategy 1: AllOrigins (standard)
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}&t=${Date.now()}`);
            if (response.ok) {
              const data = await response.json();
              xmlContent = data.contents;
            }
          } catch (e) {
            console.warn(`AllOrigins failed for ${feed.name}`);
          }

          if (!xmlContent) {
            try {
              // Strategy 2: RSS2JSON (often more stable for popular feeds)
              const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`);
              if (response.ok) {
                const data = await response.json();
                if (data.items) {
                  return data.items.map((item: any) => {
                    // Normalize rss2json item to look like rss-parser item for image extraction
                    const normalizedItem = {
                      ...item,
                      content: item.content || item.description,
                      enclosure: item.enclosure?.link ? { url: item.enclosure.link } : undefined
                    };
                    
                    const image = item.thumbnail || extractImageFromContent(normalizedItem);

                    return {
                      title: item.title || '',
                      description: (item.description || '').replace(/<[^>]*>?/gm, '').slice(0, 200) + '...',
                      url: item.link || '',
                      urlToImage: image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
                      publishedAt: item.pubDate || new Date().toISOString(),
                      source: { name: feed.name },
                      categories: classifyArticle(item.title, item.description)
                    };
                  });
                }
              }
            } catch (e) {
              console.warn(`Fallback failed for ${feed.name}`);
            }
          }
        }

        if (!xmlContent) {
          console.warn(`No content for ${feed.name}`);
          return [];
        }

        const parsedEntries = await parser.parseString(xmlContent.trim());
        console.log(`Found ${parsedEntries.items?.length || 0} items for ${feed.name}`);
        
        return (parsedEntries.items || []).map(item => {
          const title = item.title || '';
          const rawDescription = item.contentSnippet || item.content || item.description || '';
          const description = rawDescription.replace(/<[^>]*>?/gm, '').slice(0, 200) + '...';
          const pubDate = item.isoDate || item.pubDate || new Date().toISOString();
          
          return {
            title,
            description,
            url: item.link || '',
            urlToImage: extractImageFromContent(item) || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
            publishedAt: pubDate,
            source: { name: feed.name },
            categories: classifyArticle(title, description)
          };
        });
      } catch (e) {
        // Log locally but don't throw to prevent Promise.all failure
        console.warn(`Failed to fetch ${feed.name}:`, e);
        return [];
      }
    });

    const resultsByFeed = await Promise.all(feedPromises);
    const combined = resultsByFeed.flat().filter(a => a && a.title);

    // Deduplicate by URL
    const seen = new Set();
    const unique = combined.filter(a => {
      if (seen.has(a.url)) return false;
      seen.add(a.url);
      return true;
    });

    return unique.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch (error) {
    console.error("Critical error in getTechNews:", error);
    return [];
  }
}

