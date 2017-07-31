import Vue from 'vue';
import Vuex from 'vuex';
import apis from './apis';
import lodash from '../methods';
import config from '../config/config';
import VueCookie from 'vue-cookie';
import menus from '../menus';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const orgId = VueCookie.get('org_id');

// states
const state = {
  siteName: '房源管理系统',
  basicUrl: config.basicUrl,
  docUrl: config.docUrl,
  orgId: orgId || 0,
  userEmail: '', // 用户Email
  orgInfo: null, // 机构详情
  pageSize: 25, // 分页
  menus: [],
  error: null
};

// getters
const getters = {
  siteName: state => state.siteName,
  basicUrl: state => state.basicUrl,
  docUrl: state => state.docUrl,
  orgId: state => state.orgId,
  orgInfo: state => state.orgInfo,
  userEmail: state => state.userEmail,
  pageSize: state => state.pageSize,
  menus: state => state.menus,
  error: state => state.error
};

// actions
const actions = {
  orgInfo({ commit, state }) {
    return apis.infoProfile().then(res => {
      commit('orgInfo', res.data);
      return res;
    });
  },
  menus({ commit, state }) {
    commit('menus', menus);
  }
};

// mutations
const mutations = {
  menus(state, menus) {
    state.menus = menus;
  },
  orgId(state, id) {
    state.orgId = id;
  },
  orgInfo(state, info) {
    state.orgInfo = info;
  },
  userEmail(state, email) {
    state.userEmail = email;
  },
  upPageSize(state, pagesize) {
    state.pageSize = pagesize;
  },
  upError(state, error) {
    state.error = error;
  },
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
  state,
  getters,
  actions,
  mutations,
  strict: debug
});
