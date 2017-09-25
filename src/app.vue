<template>
  <div class="ucorg-admin">
    <Menus name="fixedMenu"></Menus>
    <div class="login" v-if="isLogin">
      <router-view name="login"></router-view>
    </div>
    <div class="layout" v-if="!isLogin">
      <div class="layout-content">
        <Tabs class="mainTab" ref="mainTab" v-model="curActiveTab" type="card" closable :animated="false" @on-tab-remove="handleTabRemove">
          <Tab-pane :class="tab.name" :key="tab.name+tab.random" :closable="tab.name != 'home.index'" v-if="tab" v-for="(tab, index) in mainTabs" :name="tab.name+tab.random" :label="tab.title"></Tab-pane>
        </Tabs>
        <div style="display:none;">{{activeTabName}}
          <br> {{curActiveTab}}</div>
        <div class="layout-content-main">
          <div class="layout-title">
            <!-- <span class="main-title">
                            {{title}}
                        </span> -->
            <Breadcrumb>
              <BreadcrumbItem href="/" v-if="routeName != 'home.index'">
                <Icon type="ios-home-outline"></Icon> 首页
              </BreadcrumbItem>
              <BreadcrumbItem :key="item.href" v-for="item in breadcrumb" :href="item.href">
                {{item.name}}
              </BreadcrumbItem>
              <BreadcrumbItem>
                {{metaName}}
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <router-view></router-view>
        </div>
      </div>
      <div class="layout-copy">
        <a href="http://www.miitbeian.gov.cn/" target="_blank">粤ICP备17092891号-1 Copyright 2017-2027 房源管理系统</a>
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
      curActiveTab: 'home.index0',
      tabs: {
        "home.index": { "title": "首页", "name": "home.index" }
      },
      tabsAr: [],
      affixMenu: false
    }
  },
  computed: {
    activeTab() {
      return this.$store.getters.activeTab;
    },
    activeTabName() {
      const name = this.activeTab.name + this.activeTab.random;
      this.curActiveTab = name;
      return name;
    },
    breadcrumb() {
      return this.$store.getters.breadcrumb;
    },
    siteName() {
      return this.$store.getters.siteName;
    },
    metaName() {
      return this.$store.getters.metaName;
    },
    userEmail() {
      return this.$store.getters.userEmail;
    },
    routeName() {
      return this.$route.name;
    },
    isLogin() {
      return this.routeName == 'login';
    },
    mainTabs() {
      return this.$store.getters.mainTabs;
    },
    tabChange() {
      const tabChange = this.$store.getters.tabChange;
      if (tabChange && this.tabs[tabChange.name]) {
        this.tabs[tabChange.name]['title'] = tabChange.title
      }
      return tabChange;
    }
  },
  watch: {
    curActiveTab(name) {
      this.$store.commit('activeTab', name);
      let params = {
        noadd: true
      }
      this.$lodash.assign(params, this.activeTab.params);
      this.$router.push({
        name: this.activeTab.name,
        params: params,
        meta: this.activeTab.meta,
        query: this.activeTab.query
      });
    }
  },
  mounted() {
    // 如果cookie 不存在UserEmail, 则跳转到登录
    const uemail_ = this.$cookie.get('uemail') || ''; // || 'testEami@qq.com';
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
    handleTabRemove(name) {
      this.$store.commit('removeTab', name);
    },
    changeAffix(status) {
      this.affixMenu = status;
    },
    goRouter(name) { // 选中菜单, 跳转到指定路由
      this.$router.push({
        name: name
      })
    }
  }
}

</script>
<style>
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden
}










/*layout*/

.layout {
  background: #f5f7f9;
  position: relative;
}

.mainTab .ivu-tabs-bar {
  position: relative;
  z-index: 2;
  margin-bottom: 0;
}

.layout-content {
  padding: 10px;
}

.layout-content-main {
  position: relative;
  z-index: 1;
  width: 100%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  position: relative;
  padding: 15px;
  min-height: calc(100vh - 136px);
  overflow: hidden;
  background: #fff;
  border: 1px solid #dddee1;
  margin-top: -1px;
}

.layout-title {
  min-height: 26px;
  margin: 5px 0 14px;
}

.main-title {
  font-size: 18px;
  font-weight: 700;
  margin-right: 10px;
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
  border-top: 2px solid #e9eaec;
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

.clear {
  clear: both;
}

.header-line {
  width: 100%;
  clear: both;
  height: 2px;
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

.form-title {
  color: #495060;
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 10px;
}

.form-title .ivu-icon {
  position: relative;
  top: 2px;
  color: #2d8cf0;
  margin-right: 10px;
  font-size: 20px;
}

.ivu-breadcrumb {
  display: inline-block;
  margin-left: 5px;
}

</style>
