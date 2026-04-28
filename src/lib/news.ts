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
}

const parser = new Parser();

const RSS_FEEDS = [
  { name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
  { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
  { name: 'Wired', url: 'https://www.wired.com/feed/rss' },
  { name: 'Hacker News', url: 'https://news.ycombinator.com/rss' }
];

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  SOFTWARE: ['software', 'programming', 'code', 'developer', 'framework', 'library', 'api', 'backend', 'frontend', 'git', 'saas'],
  AI: ['ai', 'intelligence', 'artificial', 'model', 'neural', 'openai', 'claude', 'gemini', 'llm', 'machine learning', 'deep learning', 'chatgpt'],
  HARDWARE: ['hardware', 'chip', 'processor', 'nvidia', 'intel', 'amd', 'apple silicon', 'gadget', 'device', 'console', 'laptop', 'smartphone', 'gpu', 'cpu'],
  ARVR: ['ar', 'vr', 'mixed reality', 'vision pro', 'meta quest', 'metaverse', 'oculus', 'augmented reality', 'virtual reality', 'spatial computing'],
  CYBERSECURITY: ['security', 'cybersecurity', 'hack', 'breach', 'vulnerability', 'exploit', 'malware', 'ransomware', 'phishing', 'encryption', 'firewall'],
};

export async function getTechNews(category: string = 'LATEST'): Promise<Article[]> {
  try {
    const feedsToFetch = RSS_FEEDS;

    const feedPromises = feedsToFetch.map(async (feed) => {
      try {
        const parsedFeed = await parser.parseURL(feed.url);
        
        let items = parsedFeed.items;

        // Apply keyword filtering for specific categories
        if (category !== 'LATEST') {
          const keywords = CATEGORY_KEYWORDS[category] || [];
          items = items.filter(item => {
            const searchField = `${item.title} ${item.contentSnippet} ${item.content}`.toLowerCase();
            return keywords.some(keyword => searchField.includes(keyword.toLowerCase()));
          });
        }

        return items.map(item => ({
          title: item.title || '',
          description: item.contentSnippet || item.content || '',
          url: item.link || '',
          urlToImage: (item as any).enclosure?.url || extractImageFromContent(item.content || '') || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
          publishedAt: item.pubDate || new Date().toISOString(),
          source: { name: feed.name }
        }));
      } catch (e) {
        console.error(`Error fetching feed ${feed.name}:`, e);
        return [];
      }
    });

    const results = await Promise.all(feedPromises);
    const allArticles = results.flat().sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return allArticles.slice(0, 20); // Return top 20 latest articles
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
