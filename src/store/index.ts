import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import api from '../api/api';
import { Article, Source, RootState } from '../types';

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    sources: [],
    favorites: [],
    articles: [],
    showFavorites: false
  },

  mutations: {
    setSources(context, sources: Source[]): void {
      context.sources = sources;
      context.showFavorites = false;
    },

    setArticles(context, articles: Article[]): void {
      context.articles = articles;
    },

    toggleFavorite(context, source: Source): void {
      const index = context.favorites.findIndex((el: Source) => el.id === source.id);
      if (index >= 0) {
        context.favorites.splice(index, 1)
      } else {
        context.favorites.push(source);
      }
      localStorage.setItem('favorite-sources', JSON.stringify(context.favorites));
    },

    toggleShowFavorites(context): void {
      context.showFavorites = !context.showFavorites;
    },

    setInitialFavorites(context): void {
      const savedFavorites = localStorage.getItem('favorite-sources');
      if (savedFavorites) {
        context.favorites = JSON.parse(savedFavorites);
      }
    },
  },

  actions: {
    async loadSources({ commit }, category: string): Promise<void> {
      const sources = await api.getSources(category);
      commit('setSources', sources);
    },

    async loadArticles({ commit }, { source, type }): Promise<void> {
      const articles = await api.getArticles(source, type);
      commit('setArticles', articles);
    },

    async toggleFavorite({ commit }, source: Source): Promise<void> {
      commit('toggleFavorite', source);
    },

    async toggleShowFavorites({ commit }): Promise<void> {
      commit('toggleShowFavorites');
    },

    async setInitialFavorites({ commit }): Promise<void> {
      commit('setInitialFavorites');
    }
  }
}

export default new Vuex.Store<RootState>(store)