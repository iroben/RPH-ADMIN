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
        return {
            code: 1,
            data: {
                data: [{
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居'
                }, {
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗'
                }, {
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗'
                }, {
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道'
                }, {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                }, {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                }, {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                }, {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                }, {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                }, {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                }],
                page: { // 分页
                  total: 100, // 总条100条
                  page: 1, // 当前第一页
                  pagesize: 10, // 每页显示10条
                  pages: 10 // 共10页
                }
            }
        }
        // return apis.testApi(params).then(res => {
        //   commit('setTestName', res.name);
        // });
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
