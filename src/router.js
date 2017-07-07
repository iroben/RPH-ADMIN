const routers = [{
  path: '/test/form',
  name: 'test.form',
  meta: { title: '表单验证' }, // menus.js配置 一级菜单名称(test) + 二级名称(form)
  component: (resolve) => require(['./views/test/form.vue'], resolve)
}, {
  path: '/test/table',
  name: 'test.table',
  meta: { title: '表格填充' },
  component: (resolve) => require(['./views/test/table.vue'], resolve)
}, {
  path: '/',
  name: 'home',
  meta: { title: '首页' },
  component: (resolve) => require(['./views/index.vue'], resolve)
}, {
  path: '/login',
  name: 'login',
  meta: { title: '登录' },
  components: {
    login: (resolve) => require(['./views/login.vue'], resolve)
  }
}, {
  path: '/modify/passwd',
  name: 'modify.passwd',
  meta: { title: '修改密码' },
  component: (resolve) => require(['./views/passwd.vue'], resolve)
}, {
  path: '/house',
  name: 'house.index',
  meta: { title: '房源管理' },
  component: (resolve) => require(['./views/house/index.vue'], resolve)
}, {
  path: '/members',
  name: 'members.index',
  meta: { title: '人员管理' },
  component: (resolve) => require(['./views/members/index.vue'], resolve)
}, {
  path: '/business/menbers',
  name: 'business.menbers',
  meta: { title: '人员审计' },
  component: (resolve) => require(['./views/business/menbers.vue'], resolve)
}, {
  path: '/business/repair',
  name: 'business.repair',
  meta: { title: '维修处理' },
  component: (resolve) => require(['./views/business/repair.vue'], resolve)
}, {
  path: '/business/renew',
  name: 'business.renew',
  meta: { title: '续租审批' },
  component: (resolve) => require(['./views/business/renew.vue'], resolve)
}, {
  path: '/business/checkout',
  name: 'business.checkout',
  meta: { title: '退房审批' },
  component: (resolve) => require(['./views/business/checkout.vue'], resolve)
}, {
  path: '/business/complaint',
  name: 'business.complaint',
  meta: { title: '投诉建议' },
  component: (resolve) => require(['./views/business/complaint.vue'], resolve)
}, {
  path: '/system/role',
  name: 'system.role',
  meta: { title: '角色管理' },
  component: (resolve) => require(['./views/system/role.vue'], resolve)
}, {
  path: '/system/repair',
  name: 'system.repair',
  meta: { title: '维修处理' },
  component: (resolve) => require(['./views/system/repair.vue'], resolve)
}, {
  path: '/system/user',
  name: 'system.user',
  meta: { title: '用户管理' },
  component: (resolve) => require(['./views/system/user.vue'], resolve)
}, {
  path: '/system/statistics',
  name: 'system.statistics',
  meta: { title: '统计管理' },
  component: (resolve) => require(['./views/system/statistics.vue'], resolve)
}, {
  path: '/system/msg',
  name: 'system.msg',
  meta: { title: '消息管理' },
  component: (resolve) => require(['./views/system/msg.vue'], resolve)
}, {
  path: '/system/lock',
  name: 'system.lock',
  meta: { title: '门锁管理' },
  component: (resolve) => require(['./views/system/lock.vue'], resolve)
}];

export default routers;
