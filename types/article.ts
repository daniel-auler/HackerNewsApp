export type Article = {
  id: number;
  title: string;
  author: string;
  created_at: string;
  url: string;
};

export type NotificationProps = {
  articleId: number;
  articleTitle: string;
};

export type RequestType = {
  pageParam?: number;
  subject?: string;
  previous?: Article[];
};
