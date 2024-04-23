import { scheduleNotification } from '~/hooks/useLocalNotification';
import { Article, RequestType } from '~/types/article';

type ReturnResponse = {
  hits: Article[];
  page: number;
};

export const fetchWithPrevious = async ({
  previous,
  subject,
  pageParam = 0,
}: RequestType): Promise<{ data: Article[]; nextPage: number }> => {
  const data = await getArticles({ subject, pageParam });

  // If there is a previous article and the previous article is newer than the current article
  if (previous && previous[0].created_at < data.hits[0].created_at) {
    //Calling the scheduleNotification function
    scheduleNotification({ articleId: data.hits[0].id, articleTitle: data.hits[0].title });
  }
  return { data: data.hits, nextPage: data.page + 1 };
};

const getArticles = async ({ subject, pageParam }: RequestType): Promise<ReturnResponse> => {
  // Perform API request to fetch all articles
  const res = await fetch(
    `https://hn.algolia.com/api/v1/search_by_date?query=${subject || 'mobile'}&tags=story&pageParam=${pageParam}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }
  const data = await res.json();
  
  const normalizedArticles = data
    ? { 
        hits: data.hits
        .map((article: any) => ({
          id: article.objectID,
          title: article.title || article.story_title,
          url: article.story_url || article.url,
          created_at: article.created_at,
          author: article.author,
        }))
        .filter((article: Article) => article.url),
        page: data.page,
      }
    : { hits: [], page: 0};

  return normalizedArticles;
};
