import { Article } from '~/types/article';

export const getArticles = async (): Promise<Article[]> => {
  // Perform API request to fetch all articles
  const res = await fetch('https://hn.algolia.com/api/v1/search_by_date?query=mobile');

  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }
  const data = await res.json();

  const normalizedArticles = data
    ? data.hits
        .map((article: any) => ({
          id: article.objectID,
          title: article.title || article.story_title,
          url: article.story_url || article.url,
          created_at: article.created_at,
          author: article.author,
        }))
        .filter((article: Article) => article.url)
    : [];

  const uniqueArticles = [...new Set(normalizedArticles)] as Article[];
  console.log('data', JSON.stringify(uniqueArticles, null, 2));

  return uniqueArticles;
};
