import apis from '../apis';

const state = {
  testName: 'test'
};

// getters
const getters = {
  testName: state => state.testName
};

// actions
const actions = {
  testApi({ state, commit }, params) {
    return apis.testApi(params).then(res => {
      commit('setTestName', res.name);
    });
  }
};

// mutations
const mutations = {
  setTestName($state, name) {
    $state.testName = name;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
