import Vue from 'vue';
import Vuex, { MutationTree, StoreOptions } from 'vuex';
import { getArticles, getSources } from '../api/api';
import { Article, Source, State } from '../types';
import { ListType } from './../types';

Vue.use(Vuex);

export const state: State = {
  sources: [],
  favorites: [],
  articles: [],
  showFavorites: false,
  isLoading: false
};

export const mutations: MutationTree<State> = {
  setSources(context: State, sources: Source[]): void {
    context.sources = sources;
    context.showFavorites = false;
  },

  setArticles(context: State, articles: Article[]): void {
    context.articles = articles;
  },

  toggleFavorite(context: State, source: Source): void {
    const index = context.favorites.findIndex(
      (el: Source) => el.id === source.id
    );
    if (index >= 0) {
      context.favorites.splice(index, 1);
    } else {
      context.favorites.push(source);
    }
    localStorage.setItem('favorite-sources', JSON.stringify(context.favorites));
  },

  toggleShowFavorites(context: State): void {
    context.showFavorites = !context.showFavorites;
  },

  setInitialFavorites(context: State): void {
    const savedFavorites = localStorage.getItem('favorite-sources');
    if (savedFavorites) {
      context.favorites = JSON.parse(savedFavorites);
    }
  },

  setIsLoading(context: State, value: boolean): void {
    context.isLoading = value;
  }
};

export const actions = {
  async loadSources({ commit }, category: string): Promise<void> {
    commit('setIsLoading', true);
    const sources = await getSources(category);
    commit('setSources', sources);
    commit('setIsLoading', false);
  },

  async loadArticles(
    { commit },
    { source, type }: { source: string; type: ListType }
  ): Promise<void> {
    commit('setIsLoading', true);
    const articles = await getArticles(source, type);
    commit('setArticles', articles);
    commit('setIsLoading', false);
  },

  async toggleFavorite({ commit }, source: Source): Promise<void> {
    commit('toggleFavorite', source);
  },

  async toggleShowFavorites({ commit }): Promise<void> {
    commit('toggleShowFavorites');
  },

  async setInitialFavorites({ commit }): Promise<void> {
    commit('setInitialFavorites');
  },

  async setIsLoading({ commit }, value: boolean): Promise<void> {
    commit('setIsLoading', value);
  }
};

const store: StoreOptions<State> = { state, mutations, actions };

export default new Vuex.Store<State>(store);
