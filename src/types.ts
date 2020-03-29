export interface SourceResponse {
  status: string;
  sources: Source[];
}

export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface ArticleResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export enum ListType {
  All = 'everything',
  Headlines = 'top-headlines'
}

export interface RootState {
  sources: Source[],
  favorites: Source[],
  articles: Article[],
  showFavorites: boolean
}