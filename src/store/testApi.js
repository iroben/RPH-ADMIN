import lodash from '../methods.js';
const state = {

};

// getters
const getters = {


};

// actions
const actions = {
    members({ commit }, params) {
        const data = lodash.testData({
            id: '33333',
            name: '张晓明',
            house_number: 'B栋410',
            gender: '男',
            birth: '1991-04-15',
            card_id: 430726199104155779,
            org: '深圳大学',
            phone: '18664357434',
            door_status: 'open'
        });
        return {
            code: 1,
            data: {
                data: data,
                page: {
                    total: 100, // (int) 总条100条
                    page: 1, // (int)当前第1页
                    pagesize: 10, //  (int)每页显示10条
                    pages: 10 // (int) 共10页
                }
            }
        }
    },
    membersDelete({ commit }, params) {
        return {
            code: 1,
            msg: '删除成功'
        }
    },
    addMembers({ commit }, params) {
        return {
            code: 1,
            msg: '添加成功'
        }
    },
    projectTree({ commit }, params) {
        const data = [{
            id: 1,
            className: '区',
            name: '宝安区',
            child: [{
                id: 1,
                className: '项目',
                name: '伴山家园',
                child: [{
                    id: 1,
                    className: '楼栋',
                    name: 'A栋',
                    child: [{
                        id: 1,
                        className: '层',
                        name: '1层',
                    }, {
                        id: 2,
                        className: '层',
                        name: '2层'
                    }]
                }, {
                    id: 2,
                    className: '楼栋',
                    name: 'B栋'
                }]
            }, {
                className: '项目',
                id: 2,
                name: '四海新城'
            }],
        }, {
            id: 3,
            className: '区',
            name: '福田区',
            child: [{
                id: 1,
                className: '项目',
                name: 'C公寓'
            }, {
                id: 2,
                className: '项目',
                name: 'D公寓'
            }],
        }]
        return {
            code: 1,
            data: data
        }
    },
    subTree({ commit }, params) {
        const data = [{
            id: 1,
            className: '省份',
            name: '广东省',
            child: [{
                id: 1,
                className: '市',
                name: '深圳市',
                child: [{
                    id: 1,
                    className: '区',
                    name: '福田区'
                }, {
                    id: 2,
                    className: '区',
                    name: '宝安区'
                }]
            }],
        }, {
            id: 2,
            className: '省份',
            name: '湖南省',
            child: [{
                id: 1,
                className: '市',
                name: '长沙市',
                child: [{
                    id: 1,
                    className: '区',
                    name: '雨花区'
                }, {
                    id: 2,
                    className: '区',
                    name: '天心区'
                }]
            }],
        }]
        return {
            code: 1,
            data: data
        }
    },
    thirdTee({ commit }, params) {
        const data = [{
            id: 1,
            className: '项目',
            name: '半山家园',
            child: [{
                id: 1,
                className: '楼栋',
                name: 'A栋'
            }, {
                id: 2,
                className: '楼栋',
                name: 'B栋'
            }]
        }];
        return {
            code: 1,
            data: data
        }
    },
    membersInfo({ commit }, params) {
        return {
            code: 1,
            data: {
                id: '1',
                name: '张晓明',
                relation: '1',
                resource: '1,1,1',
                gender: 1,
                card_id: '430728199904155517',
                sugestion: '审核的建议信息',
                birth: '1990-04-16',
                phone: '18664357412',
                org: '腾讯科技有限公司'
            }
        }
    },
    membersLocation({ commit }, params) {
        return {
            code: 1,
            data: [{
                time: '2017-08-09',
                status: 1,
                status_msg: '入住中',
                location_msg: '半山家园,A栋,B311',
                location: '1,1,1,1'
            }, {
                time: '2016-07-09',
                status: 0,
                status_msg: '已退房',
                location_msg: '半山家园,A栋,B311',
                location: '1,1,1'
            }, {
                time: '2015-08-09',
                status: 0,
                status_msg: '已退房',
                location_msg: '半山家园,A栋,B311',
                location: '1,1,1'
            }]
        }
    },
    membersFamily({ commit }, params) {
        const data = lodash.testData({
            id: '555',
            name: '李双',
            house_number: 'B栋410',
            relation: '丈夫',
            status: 1,
            status_msg: '挂失中',
            gender: '男',
            birth: '1991-04-15',
            card_id: 430726199104155779,
            org: '深圳大学',
            phone: '18664357434',
            door_status: 'open'
        });
        return {
            code: 1,
            data: {
                data: data,
                page: {
                    total: 100, // (int) 总条100条
                    page: 1, // (int)当前第1页
                    pagesize: 10, //  (int)每页显示10条
                    pages: 10 // (int) 共10页
                }
            }
        }
    },
    membersLocationEdit({ commit }, params) {
        return {
            code: 1,
            msg: '编辑成功'
        }
    },
    membersLockHistory({ commit }, params) {
        const data = lodash.testData({
            id: '444',
            name: '张晓明',
            open_time: '2017-08-09 08:55',
            status: 1,
            status_msg: '开门',
            way: '指纹开锁'
        });
        return {
            code: 1,
            data: {
                data: data,
                page: {
                    total: 100, // (int) 总条100条
                    page: 1, // (int)当前第1页
                    pagesize: 10, //  (int)每页显示10条
                    pages: 10 // (int) 共10页
                }
            }
        }
    },

};

// mutations
const mutations = {

};

export default {
    state,
    getters,
    actions,
    mutations
};