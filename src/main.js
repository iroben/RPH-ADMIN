import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import App from './app.vue';
import store from './store/index';
import 'iview/dist/styles/iview.css';

// use Model
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);

// 路由配置
const router = new VueRouter({
    mode: 'history',
    routes: Routers
});

// 路由进入与退出
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

// App实例
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
