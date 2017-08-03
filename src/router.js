import lodash from './methods';

// Basic
const basic = [{
  path: '/error',
  meta: { title: '访问异常' },
  component: (resolve) => require(['./views/error.vue'], resolve)
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
  path: '/',
  name: 'home.index',
  meta: { title: '首页' },
  component: (resolve) => require(['./views/home/index.vue'], resolve)
}];

// 人员管理
const members = [{
  path: '/members',
  name: 'members.index',
  meta: { title: '人员管理' },
  component: (resolve) => require(['./views/members/index.vue'], resolve)
}, {
  path: '/members/edit/:id',
  name: 'members.edit',
  meta: { title: '编辑人员' },
  component: (resolve) => require(['./views/members/members.edit.vue'], resolve)
}, {
  path: '/members/add',
  name: 'members.add',
  meta: { title: '新增人员' },
  component: (resolve) => require(['./views/members/members.edit.vue'], resolve)
}];

// 房源管理
const resource = [{
  path: '/resource',
  name: 'resource.index',
  meta: { title: '房源管理' },
  component: (resolve) => require(['./views/resource/index.vue'], resolve)
}, {
  path: '/resource/edit/:id',
  name: 'resource.edit',
  meta: { title: '编辑房源' },
  component: (resolve) => require(['./views/resource/resource.edit.vue'], resolve)
}, {
  path: '/resource/add',
  name: 'resource.add',
  meta: { title: '新增房源' },
  component: (resolve) => require(['./views/resource/resource.edit.vue'], resolve)
}, {
  path: '/project/add',
  name: 'project.add',
  meta: { title: '新增项目' },
  component: (resolve) => require(['./views/resource/project.edit.vue'], resolve)
}, {
  path: '/project/edit/:id',
  name: 'project.edit',
  meta: { title: '编辑项目' },
  component: (resolve) => require(['./views/resource/project.edit.vue'], resolve)
}, {
  path: '/floor/add',
  name: 'floor.add',
  meta: { title: '新增楼栋' },
  component: (resolve) => require(['./views/resource/floor.edit.vue'], resolve)
}, {
  path: '/floor/edit/:id',
  name: 'floor.edit',
  meta: { title: '编辑楼栋' },
  component: (resolve) => require(['./views/resource/floor.edit.vue'], resolve)
}];

// 门锁管理
const doorlock = [{
  path: '/doorlock',
  name: 'doorlock.index',
  meta: { title: '门锁管理' },
  component: (resolve) => require(['./views/doorlock/index.vue'], resolve)
}];

// 系统管理
const system = [{
  path: '/system/role',
  name: 'system.role',
  meta: { title: '角色管理' },
  component: (resolve) => require(['./views/system/role.vue'], resolve)
}, {
  path: '/system/account',
  name: 'system.account',
  meta: { title: '账户管理' },
  component: (resolve) => require(['./views/system/account.vue'], resolve)
}, {
  path: '/system/account/add',
  name: 'system.account.add',
  meta: { title: '添加账户' },
  component: (resolve) => require(['./views/system/account.edit.vue'], resolve)
}, {
  path: '/system/account/edit/:id',
  name: 'system.account.edit',
  meta: { title: '账户管理' },
  component: (resolve) => require(['./views/system/account.edit.vue'], resolve)
}];



const routers = lodash.concat(basic, members, resource, doorlock, system);
export default routers;