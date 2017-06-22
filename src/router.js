const routers = [{
    path: '/',
    name: 'home',
    meta: { title: '首页' },
    component: (resolve) => require(['./views/index.vue'], resolve)
}, {
    path: '/hsource',
    name: 'housing.resource',
    meta: { title: '房源管理' },
    component: (resolve) => require(['./views/housing.resource.vue'], resolve)
}, {
    path: '/members',
    name: 'members',
    meta: { title: '人员管理' },
    component: (resolve) => require(['./views/members.vue'], resolve)
}, {
    path: '/business/menbers',
    name: 'business.menbers',
    meta: { title: '人员审计' },
    component: (resolve) => require(['./views/business.menbers.vue'], resolve)
}, {
    path: '/business/repair',
    name: 'business.repair',
    meta: { title: '维修处理' },
    component: (resolve) => require(['./views/business.repair.vue'], resolve)
}, {
    path: '/business/renew',
    name: 'business.renew',
    meta: { title: '续租审批' },
    component: (resolve) => require(['./views/business.renew.vue'], resolve)
}, {
    path: '/business/checkout',
    name: 'business.checkout',
    meta: { title: '退房审批' },
    component: (resolve) => require(['./views/business.checkout.vue'], resolve)
}, {
    path: '/business/complaint',
    name: 'business.complaint',
    meta: { title: '投诉建议' },
    component: (resolve) => require(['./views/business.complaint.vue'], resolve)
}, {
    path: '/system/role',
    name: 'system.role',
    meta: { title: '角色管理' },
    component: (resolve) => require(['./views/system.role.vue'], resolve)
}, {
    path: '/system/user',
    name: 'system.user',
    meta: { title: '用户管理' },
    component: (resolve) => require(['./views/system.user.vue'], resolve)
}, {
    path: '/system/statistics',
    name: 'system.statistics',
    meta: { title: '统计管理' },
    component: (resolve) => require(['./views/system.statistics.vue'], resolve)
}, {
    path: '/system/msg',
    name: 'system.msg',
    meta: { title: '消息管理' },
    component: (resolve) => require(['./views/system.msg.vue'], resolve)
}, {
    path: '/system/lock',
    name: 'system.lock',
    meta: { title: '门锁管理' },
    component: (resolve) => require(['./views/system.lock.vue'], resolve)
}];
export default routers;
