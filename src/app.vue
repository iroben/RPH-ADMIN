<template>
  <div class="ucorg-admin">
    <Menus name="fixedMenu"></Menus>
    <div class="login" v-if="isLogin">
      <router-view name="login"></router-view>
    </div>
    <div class="layout" v-if="!isLogin">
      <div class="layout-content">
        <div class="layout-content-main">
          <h2 class="layout-title">#&emsp;{{title}}</h2>
          <router-view></router-view>
        </div>
      </div>
      <div class="layout-copy">
        粤ICP备16050337号-1 Copyright 2015-2025 公租房系统
      </div>
      <Back-top ref="goTop"></Back-top>
    </div>
  </div>
</template>
<script>
import Menus from './views/menus';
export default {
  components: {
    Menus
  },
  data() {
    return {
      affixMenu: false
    }
  },
  computed: {
    siteName() {
      return this.$store.getters.siteName;
    },
    title() {
      return this.$route.meta.title || this.siteName;
    },
    userEmail() {
      return this.$store.getters.userEmail;
    },
    routeName() {
      return this.$route.name;
    },
    isLogin() {
      return this.routeName == 'login';
    }
  },
  mounted() {
    this.$router.afterEach(() => {
      if (this.$refs.mainMenu) {
        this.$refs.mainMenu.uptedeOpend();
      }
    });

    // 如果cookie 不存在UserEmail, 则跳转到登录
    const uemail_ = this.$cookie.get('uemail') || '';
    this.$store.commit('userEmail', uemail_);
    if (this.userEmail) {
      this.$store.dispatch('menus').catch(res => {
        if (res.code == 401) {
          this.goRouter('login');
        }
      });
    } else {
      this.goRouter('login');
    }
  },
  methods: {
    changeAffix(status) {
      this.affixMenu = status;
    }
  }
}
</script>
<style>
/*layout*/

.layout {
  background: #f5f7f9;
  position: relative;
}

.layout-content {
  padding: 15px;
}

.layout-content-main {
  width: 100%;
  border-radius: 5px;
  position: relative;
  padding: 15px;
  min-height: calc(100vh - 136px);
  overflow: hidden;
  background: #fff;
}
.layout-title{
  margin-bottom: 20px;
}
.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}

.layout-hide-text .layout-text {
  display: none;
}

.layout .ivu-col {
  transition: width .2s ease-in-out;
}




/* 分页 */

.pagination {
  position: relative;
  padding: 10px 0;
  height: 50px;
}

.pagination .ivu-page {
  float: right;
}

.pagination .ivu-page-total {
  position: absolute;
  left: 0;
}




/* tableFuncs */

.tableFuncs {
  position: absolute;
  right: 15px;
  top: 15px;
}





/* tableTools */

.refreshFilter {
  position: absolute;
  right: 0;
  top: -48px;
}

.tableTools {
  position: relative;
  border-top: 3px solid #e9eaec;
  padding: 15px 0;
}

.tableTools .ivu-form-item {
  margin-bottom: 0;
}

.tableTools .ivu-form-item-label {
  font-weight: 700;
}

.tool-label {
  color: #495060;
  line-height: 30px;
}

.tableTools .btnGroup {
  position: absolute;
  right: 0;
  top: -45px;
}




/*model-list*/

.del-header {
  color: #f60 !important;
  text-align: center;
}

.del-content {
  text-align: left;
}

.del-content-center {
  text-align: center;
}

.model-list {
  max-height: 300px;
  overflow-y: auto;
}

.model-list li {
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 8px;
  word-break: keep-all;
  white-space: nowrap;
  border-bottom: 1px solid #e9eaec;
}

.model-list li:last-child {
  border: none;
}

.model-list.half li {
  float: left;
  width: 50%;
}

.model-list li:before {
  content: '';
  display: inline-block;
  height: 10px;
  width: 10px;
  margin-right: 8px;
  overflow: hidden;
  border-radius: 100%;
  background-color: #19be6b;
}

.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vertical-center-modal .ivu-modal {
  top: 0;
}

.header-line{
  width: 100%;
  clear: both;
  height: 3px;
  background-color: #e9eaec;
}
/*font*/

.spe-modal-font {
  padding: 0 5px;
  font-size: 14px;
}

.color-danger {
  color: #ed3f14;
}

.color-info {
  color: #2d8cf0;
}

.stable table {
  width: 100%;
  border-collapse: collapse;
}

.stable th {
  background-color: #f8f8f9;
}

.stable th,
.stable td {
  padding: 0 10px;
  border: 1px solid #e9eaec;
  min-width: 0;
  height: 48px;
  box-sizing: border-box;
  text-align: left;
  text-overflow: ellipsis;
  vertical-align: middle;
  border-bottom: 1px solid #e9eaec;
}
</style>