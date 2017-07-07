const routers = [{
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
  name: 'home',
  meta: { title: '首页' },
  component: (resolve) => require(['./views/index.vue'], resolve)
}, {
  path: '/test/form',
  name: 'test.form',
  meta: { title: '表单验证' }, // menus.js配置 一级菜单名称(test) + 二级名称(form)
  component: (resolve) => require(['./views/test/form.vue'], resolve)
}, {
  path: '/test/table',
  name: 'test.table',
  meta: { title: '表格填充' },
  component: (resolve) => require(['./views/test/table.vue'], resolve)
}];


export default routers;
