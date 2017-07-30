import lodash from './methods';
// Basic
const basic = [{
    icon: 'android-home',
    name: 'home',
    title: '首页'
}];

const members = [{
    icon: 'android-contact',
    name: 'members',
    title: '人员管理',
}];

const resource = [{
    icon: 'android-compass',
    name: 'resource',
    title: '房源管理',
}];

// System
const system = [{
    icon: 'android-settings',
    name: 'system',
    title: '系统管理',
    children: [{
        name: 'role',
        title: '角色管理',
    }, {
        name: 'account',
        title: '账户管理',
    }, {
        name: 'code',
        title: '代码管理'
    }]
}];


const menus = lodash.concat(basic, members, resource, system);
export default menus;