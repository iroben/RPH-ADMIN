import Vue from 'vue';
import Vuex from 'vuex';

/* modules */
import Test from './modules/store.test.js';

/* use Vuex*/
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

// states
const state = {};

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {

  // 更新Item的属性
  upOrItem(state, params) {
    for (let i in params) {
      if (params.hasOwnProperty(i) && i !== 'orItem') {
        params['orItem'][i] = params[i];
      }
    }
  }
};

export default new Vuex.Store({
  modules: { Test },
  state, getters, actions, mutations,
  strict: debug
});
