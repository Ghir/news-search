import { articlesResMock } from '@/mocks/articlesMock';
import { mutations } from '../index';
import { sourcesResMock } from './../../mocks/sourcesMock';

describe('mutations', () => {
  it('should set sources', () => {
    const state = {
      sources: [],
      showFavorites: true,
      favorites: [],
      articles: [],
      isLoading: false
    };
    mutations.setSources(state, sourcesResMock.sources);

    expect(state.sources).toEqual(sourcesResMock.sources);
  });

  it('should set articles', () => {
    const state = {
      sources: [],
      showFavorites: true,
      favorites: [],
      articles: [],
      isLoading: false
    };
    mutations.setArticles(state, articlesResMock.articles);

    expect(state.articles).toEqual(articlesResMock.articles);
  });

  it('should toggle favorite', () => {
    const state = {
      sources: [],
      showFavorites: true,
      favorites: [],
      articles: [],
      isLoading: false
    };

    const sources = sourcesResMock.sources[0];

    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: jest.fn(() => null)
      },
      writable: true
    });

    mutations.toggleFavorite(state, sources);

    expect(state.favorites).toContainEqual(sources);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'favorite-sources',
      JSON.stringify([sources])
    );
  });

  it('should toggle show favorites', () => {
    const state = {
      sources: [],
      showFavorites: true,
      favorites: [],
      articles: [],
      isLoading: false
    };
    mutations.toggleShowFavorites(state);

    expect(state.showFavorites).toBe(false);
  });

  it('should set initial favorites', () => {
    const state = {
      sources: [],
      showFavorites: true,
      favorites: [],
      articles: [],
      isLoading: false
    };
    const source = sourcesResMock.sources[0];

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: () => JSON.stringify([source])
      },
      writable: true
    });

    mutations.setInitialFavorites(state);

    expect(state.favorites).toContainEqual(source);
  });

  it('should set is loading', () => {
    const state = {
      sources: [],
      showFavorites: true,
      favorites: [],
      articles: [],
      isLoading: false
    };
    mutations.setIsLoading(state, true);

    expect(state.isLoading).toBe(true);
  });
});
