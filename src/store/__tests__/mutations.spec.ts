import { articlesResMock } from '@/mocks/articlesMock';
import { sourcesResMock } from '@/mocks/sourcesMock';
import { mutations } from '../index';

describe('mutations', () => {
  it('should set sources', () => {
    const state = {
      sources: [],
      showFavorites: true,
      favorites: [],
      articles: []
    };
    mutations.setSources(state, sourcesResMock.sources);

    expect(state.sources).toEqual(sourcesResMock.sources);
  });

  it('should set articles', () => {
    const state = {
      sources: [],
      showFavorites: true,
      favorites: [],
      articles: []
    };
    mutations.setArticles(state, articlesResMock.articles);

    expect(state.articles).toEqual(articlesResMock.articles);
  });

  it('should toggle favorite', () => {
    const state = {
      sources: [],
      showFavorites: true,
      favorites: [],
      articles: []
    };
    mutations.toggleFavorite(state, sourcesResMock.sources[0]);

    expect(state.favorites).toContain(sourcesResMock.sources[0]);
  });

  it('should toggle show favorites', () => {
    const state = {
      sources: [],
      showFavorites: true,
      favorites: [],
      articles: []
    };
    mutations.toggleShowFavorites(state);

    expect(state.showFavorites).toBe(false);
  });
});
