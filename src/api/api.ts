import { Source, ListType, SourceResponse, ArticleResponse } from "@/types";
import axios from "axios";
import { Article } from "../types";

const PUBLIC_KEY = "200bca92d3cf4773bdcc7f31d0f7daf9";

export default {
  async getSources(category: string): Promise<Source[]> {
    const { data }: { data: SourceResponse } = await axios({
      method: "get",
      url: "http://newsapi.org/v2/sources",
      params: { category },
      headers: {
        Authorization: PUBLIC_KEY
      }
    });

    return data.sources;
  },

  async getArticles(source: string, type: ListType): Promise<Article[]> {
    const { data }: { data: ArticleResponse } = await axios({
      method: "get",
      url: `http://newsapi.org/v2/${type}`,
      params: { sources: source },
      headers: {
        Authorization: PUBLIC_KEY
      }
    });

    return data.articles;
  }
};
