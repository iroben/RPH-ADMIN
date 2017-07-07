# UCORG (优课在线机构后台)
> 请预先安装Node.js, npm, webpack

## 前端框架
* vueJs2.0 
* iView

### 安装依赖
```
$ npm install (如果安装太慢)
$ 或cnpm install(安装淘宝镜像) https://github.com/cnpm/cnpm
```

### 启动服务
```
$ npm run dev
```
### 编辑打包
```
$ npm run build
```

### SRC主要文件说明
```
* main.js 项目入口, 配置依赖, 注入相关公共模块;
* munus.js 菜单配置;
* methods.js 项目通用方法;
* validateRules.js  自定义表单验证;
* store/apiurl.js 接口配置;
* store/index.js 全局状态数据;
* store/apis.js axios全局配置;
```
```
本地开发与线上开发接口URL: const ajaxUrl = env === 'development' ? 'http://api.uooc.online:8088' : env === 'production' ? 'https://www.url.com' : 'https://debug.url.com';
```


### 已注入的模块, 模块内通过this访问相关
```
接口模块: Vue.use(apis);
this.$apis['funcName']
```
```
Vue.use(rules);
this.$rules['funcName']
```
```
Vue.use(lodash);
this.$lodash['funcName'] 访问自定义方法, 以及lodash模块方法方法
```
Lodash文档: https://lodash.com/docs

```
Vue.use(VueRouter);
router实例: this.$router,  获取路由参数: this.$route
```
文档: http://router.vuejs.org/zh-cn/essentials/getting-started.html

```
Vue.use(iView);
iview框架提供的相关方法如: this.$Message.error(config);
```
文档: https://www.iviewui.com/

```
Vue.use(VueCookie);
```
this.$cookie
文档: https://github.com/alfhen/vue-cookie
```
vuex模块: Vue.use(Vuex); 存储全局变量, 或其他需要全局存取的数据
GET: this.$store.getters, SET: this.$store.commit(), Fetch: this.$store.dispatch()
```
文档: https://vuex.vuejs.org/zh-cn/

### Response数据约定
```
$ response 
{
  code: 1, // 1: 数据正常, 401: 未登录, 其他: 系统弹出全局错误提示
  data: {
    data: [{ // 具体数据
      name: apple,
      price: $1
    },{
      name: banana,
      price: $2
    }],
    page: { // 分页
      total: 100, // (int) 总条100条
      page: 1,  // (int)当前第1页
      pagesize: 10, //  (int)每页显示10条
      pages: 10 // (int) 共10页
    }
  },
  msg: '添加成功'
}




