export interface AIProcessResult {
  summary: string;
  categories: string[];
}

export interface SummarizeResult {
  summary: string;
  keyTakeaway: string;
}

export async function summarizeArticle(title: string, description: string): Promise<SummarizeResult | null> {
  const apiKey = process.env.NVIDIA_API_KEY;
  const apiUrl = process.env.NVIDIA_API_URL || 'https://integrate.api.nvidia.com/v1/chat/completions';

  if (!apiKey) {
    console.warn('NVIDIA_API_KEY is not set. AI features for summarization will be disabled.');
    return null;
  }

  const prompt = `You are a technology news analyst.

Analyze the following article and return ONLY valid JSON.

Requirements:

* Generate a concise summary in 2-3 sentences.
* Generate a key takeaway in one sentence.
* Keep responses factual and neutral.
* Focus on information valuable to developers, students, and technology professionals.

Output format:

{
"summary": "string",
"keyTakeaway": "string"
}

Article Title:
${title}

Article Description:
${description}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-8b-instruct",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        top_p: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`NVIDIA API Error: ${response.status} ${errorText}`);
      return null;
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      console.error('NVIDIA API returned empty content');
      return null;
    }

    try {
      const jsonStr = content.match(/\{[\s\S]*\}/)?.[0] || content;
      const parsed = JSON.parse(jsonStr);
      
      return {
        summary: parsed.summary || 'Summary unavailable',
        keyTakeaway: parsed.keyTakeaway || 'Takeaway unavailable',
      };
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', content);
      return null;
    }
  } catch (error) {
    console.error('Error fetching from NVIDIA API:', error);
    return null;
  }
}

export async function processArticleWithAI(title: string, description: string): Promise<AIProcessResult | null> {
  const apiKey = process.env.NVIDIA_API_KEY;
  const apiUrl = process.env.NVIDIA_API_URL || 'https://integrate.api.nvidia.com/v1/chat/completions';

  if (!apiKey) {
    console.warn('NVIDIA_API_KEY is not set. AI features will be disabled.');
    return null;
  }

  const prompt = `Analyze this tech article.
Return JSON only:
{
  "summary": string (max 20 words),
  "categories": string[]
}
Title: ${title}
Description: ${description}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-8b-instruct",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        top_p: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`NVIDIA API Error: ${response.status} ${errorText}`);
      return null;
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      console.error('NVIDIA API returned empty content');
      return null;
    }

    // Attempt to parse JSON strictly or extract it if the model adds markdown
    try {
      const jsonStr = content.match(/\{[\s\S]*\}/)?.[0] || content;
      const parsed = JSON.parse(jsonStr);
      
      return {
        summary: parsed.summary || 'Summary unavailable',
        categories: Array.isArray(parsed.categories) ? parsed.categories : [],
      };
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', content);
      return null;
    }
  } catch (error) {
    console.error('Error fetching from NVIDIA API:', error);
    return null;
  }
}
