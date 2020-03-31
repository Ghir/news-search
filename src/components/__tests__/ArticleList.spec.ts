import ArticleList from '@/components/ArticleList.vue';
import { articlesResMock } from '@/mocks/articlesMock';
import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex, { Store } from 'vuex';
import { State } from '@/types';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex);

describe('ArticleList.vue', () => {
  let vuetify;
  let state;
  let actions;
  let store: Store<State>;
  let wrapper: Wrapper<any>;

  beforeEach(() => {
    vuetify = new Vuetify();
    actions = {
      loadArticles: jest.fn()
    };
    state = {
      articles: articlesResMock.articles
    };
    store = new Vuex.Store({
      actions,
      state
    });
    wrapper = mount(ArticleList, {
      store,
      localVue,
      vuetify,
      stubs: ['router-link']
    });
  });

  it('should show the right number of articles', async () => {
    const articles = wrapper.findAll('.v-card');
    expect(articles.length).toBe(articlesResMock.articles.length);
  });

  it('should load headlines', async () => {
    expect(actions.loadArticles).toHaveBeenCalled();
  });

  it('should load all articles', async () => {
    wrapper
      .findAll('.v-btn')
      .at(1)
      .trigger('click');

    expect(actions.loadArticles).toHaveBeenCalled();
  });
});
