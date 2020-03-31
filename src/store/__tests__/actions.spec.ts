import { sourcesResMock } from '@/mocks/sourcesMock';
import { getArticles, getSources } from '../../api/api';
import { actions } from '../index';
import { articlesResMock } from './../../mocks/articlesMock';
import { ListType } from '@/types';

jest.mock('../../api/api');
const mockedGetSources = getSources as jest.Mocked<any>;
const mockedAetArticles = getArticles as jest.Mocked<any>;

test('should load sources', async () => {
  mockedGetSources.mockResolvedValue(sourcesResMock.sources);

  const commit = jest.fn();
  await actions.loadSources({ commit }, '');

  expect(commit).toHaveBeenCalledWith('setSources', sourcesResMock.sources);
});

test('should load articles', async () => {
  mockedAetArticles.mockResolvedValue(articlesResMock.articles);

  const commit = jest.fn();
  await actions.loadArticles(
    { commit },
    { source: '', type: ListType.Headlines }
  );

  expect(commit).toHaveBeenCalledWith('setArticles', articlesResMock.articles);
});

test('should toggle favorite', async () => {
  const commit = jest.fn();
  const source = sourcesResMock.sources[0];
  await actions.toggleFavorite({ commit }, source);

  expect(commit).toHaveBeenCalledWith('toggleFavorite', source);
});

test('should show favorites', async () => {
  const commit = jest.fn();
  await actions.toggleShowFavorites({ commit });

  expect(commit).toHaveBeenCalledWith('toggleShowFavorites');
});

test('should set initial favorites', async () => {
  const commit = jest.fn();
  await actions.setInitialFavorites({ commit });

  expect(commit).toHaveBeenCalledWith('setInitialFavorites');
});

test('should set is loading', async () => {
  const commit = jest.fn();
  await actions.setIsLoading({ commit }, true);

  expect(commit).toHaveBeenCalledWith('setIsLoading', true);
});
