import SearchBar from '@/components/SearchBar.vue';
import { State } from '@/types';
import { createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex, { Store } from 'vuex';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex);

describe('SearchBar.vue', () => {
  let vuetify;
  let state;
  let actions;
  let store: Store<State>;

  beforeEach(() => {
    vuetify = new Vuetify();
    actions = {
      loadSources: jest.fn(),
      toggleShowFavorites: jest.fn()
    };
    state = {
      showFavorites: false
    };
    store = new Vuex.Store({
      actions,
      state
    });
  });

  it('should load sources on button click', () => {
    const wrapper = mount(SearchBar, { store, localVue, vuetify });
    wrapper
      .findAll('.v-btn')
      .at(0)
      .trigger('click');

    expect(actions.loadSources).toHaveBeenCalled();
  });

  it('should toggle favorites on button click', () => {
    const wrapper = mount(SearchBar, { store, localVue, vuetify });
    wrapper
      .findAll('.v-btn')
      .at(1)
      .trigger('click');

    expect(actions.toggleShowFavorites).toHaveBeenCalled();
  });
});
