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
                        className: '房号',
                        name: 'A311',
                    }, {
                        id: 2,
                        className: '房号',
                        name: 'A312'
                    }]
                }, {
                    id: 2,
                    className: '楼栋',
                    name: 'B栋',
                    child: [{
                        id: 1,
                        className: '房号',
                        name: 'B311',
                    }, {
                        id: 2,
                        className: '房号',
                        name: 'B312'
                    }]
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
    projectInfo({ commit }, params) {
        return {
            code: 1,
            data: {
                name: '伴山家园',
                number: '321321321',
                photos: '',
                intro: '简介',
                peitao: [1, 2, 3],
                wy_org: '物业公司',
                wy_charge: '张生',
                wy_contact: '186-09093-7411',
                address: '深圳市人大常委会',
                location: '1321,1231'
            }
        }
    },
    projectAdd({ commit }, params) {
        return {
            code: 1,
            msg: '添加成功'
        }
    },
    projectEdit({ commit }, params) {
        return {
            code: 1,
            msg: '编辑成功'
        }
    },
    projectMembers({ commit }, params) {
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
    projectLocks({ commit }, params) {
        const data = lodash.testData({
            id: 'box012x-door234',
            door_number: 'door234',
            box_number: 'box012x',
            source_number: 'ssb323',
            source_name: '伴山家园B323',
            passwod: '123323',
            company: 'SKT',
            avalid_date: '2017-08-09 2019-08-09',
            open_status: 1,
            status: 0,
            power: 80,
            last_open: '2017-08-09 08:09:52',
            bind_time: '2017-08-09 08:09:52',
            last_open_user: '张晓明'
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
    projectFloor({ commit }, params) {
        const data = lodash.testData({
            id: '555',
            name: 'B栋',
            total: '22层',
            members_count: '123/23',
            empty: '0',
            peitao: '电梯, 洗衣机, 冰箱, 空调',
            create_time: '2017-08-09 08:24'
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
    floorInfo({ commit }, params) {
        return {
            code: 1,
            data: {
                name: 'B3栋',
                number: 'k09873-b3',
                photos: '',
                intro: '简介',
                peitao: [1, 2],
                wy_org: 'XXX物业公司',
                wy_charge: '张晓明',
                wy_contact: '18664357411',
                address: '深圳市XXX',
                location: '321321,31321'
            }
        }
    },
    floorAdd({ commit }, params) {
        return {
            code: 1,
            msg: '添加成功'
        }
    },
    floorEdit({ commit }, params) {
        return {
            code: 1,
            msg: '编辑成功'
        }
    },
    floorMembers({ commit }, params) {
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
    floorLocks({ commit }, params) {
        const data = lodash.testData({
            id: 'box012x-door234',
            door_number: 'door234',
            box_number: 'box012x',
            source_number: 'ssb323',
            source_name: '伴山家园B323',
            passwod: '123323',
            company: 'SKT',
            avalid_date: '2017-08-09 2019-08-09',
            open_status: 1,
            status: 0,
            power: 80,
            last_open: '2017-08-09 08:09:52',
            bind_time: '2017-08-09 08:09:52',
            last_open_user: '张晓明'
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
    floorSource({ commit }, params) {
        const data = lodash.testData({
            id: '2222',
            project: '伴山家园',
            floor: 'b栋',
            house_number: '410',
            area: '100平米',
            house_type: '3室1厅',
            count: 20,
            rent_date: '2017-09-11',
            door_number: 'bx1-3123',
            door_box_number: 'BXS-sdfsfds',
            rent_pirce: '3800元'
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
    resourceInfo({ commit }, params) {
        return {
            code: 1,
            data: {
                id: 1231,
                name: 'B311房',
                area: '100',
                huxing: '1',
                peitao: [1, 2],
                status: true,
                photos: '',
                intro: '简介',
                project: '1,1,1,1',
                floor: 1,
            }
        }
    },
    resourceDelete({ commit }, params) {
        return {
            code: 1,
            msg: '删除成功'
        }
    },
    resourceAdd({ commit }, params) {
        return {
            code: 1,
            msg: '添加成功'
        }
    },
    resourceEdit({ commit }, params) {
        return {
            code: 1,
            msg: '编辑成功'
        }
    },
    resourceMembers({ commit }, params) {
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
        }, 3);
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
    resourceLocks({ commit }, params) {
        const data = lodash.testData({
            id: 'box012x-door234',
            door_number: 'door234',
            box_number: 'box012x',
            source_number: 'ssb323',
            source_name: '伴山家园B323',
            passwod: '123323',
            company: 'SKT',
            avalid_date: '2017-08-09 2019-08-09',
            open_status: 1,
            status: 0,
            power: 80,
            last_open: '2017-08-09 08:09:52',
            bind_time: '2017-08-09 08:09:52',
            last_open_user: '张晓明'
        }, 3);
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
    doorlockAdd({ commit }, params) {
        return {
            code: 1,
            msg: '添加成功'
        }
    },
    doorlockEdit({ commit }, params) {
        return {
            code: 1,
            msg: '编辑成功'
        }
    },
    doorlockInfo({ commit }, params) {
        return {
            code: 1,
            data: {
                id: 123321,
                start_time: '2017-09-01',
                end_time: '2018-09-01',
                door_number: 'st213321332',
                primary: 'SKT',
                box_number: 1,
                passwod: '',
                location: '1,1,1,1'
            }
        }
    },
    doorlockDelete({ commit }, params) {
        return {
            code: 1,
            msg: '删除成功'
        }
    },
    doorlockSource({ commit }, params) {
        const data = lodash.testData({
            id: 222,
            project: '伴山家园',
            floor: 'b栋',
            house_number: '410',
            area: '100平米',
            house_type: '3室1厅',
            count: 20,
            rent_date: '2017-09-11',
            door_number: 'bx1-3123',
            door_box_number: 'BXS-sdfsfds',
            rent_pirce: '3800元'
        }, 3);
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
    doorlockHistory({ commit }, params) {
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