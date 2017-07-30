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



const routers = lodash.concat(basic, members);
export default routers;