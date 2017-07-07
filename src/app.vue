<template>
  <div class="layout" :title="routeName">
    <div v-if="routeName == 'login'">
      <router-view name="login"></router-view>
    </div>
    <Row type="flex" v-if="routeName != 'login'">
      <i-col span="3" class="layout-menu-left">
        <div class="layout-logo-left">UCORG</div>
        <Menu theme="dark" width="auto" :active-name="$route.name" :open-names="openNames" @on-select="goRouter" accordion ref="mainManu">
          <template v-for="menu in menuList">
            <Submenu :name="menu.name" v-if="menu.sublist && menu.sublist.length">
              <template slot="title">
                <Icon :type="menu.icon || 'ios-keypad'"></Icon>
                {{menu.txt}}
              </template>
              <Menu-item v-for="submenu in menu.sublist" :key="menu.name + '.' + submenu.name" :name="menu.name + '.' + submenu.name">{{submenu.txt}}</Menu-item>
            </Submenu>
            <Menu-item :name="menu.name + '.index'" :key="menu.name + '.index'" v-if="!menu.sublist || !menu.sublist.length">
              <Icon :type="menu.icon || 'ios-keypad'"></Icon>
              {{menu.txt}}
            </Menu-item>
          </template>
        </Menu>
      </i-col>
      <i-col span="21">
        <div class="layout-header">
          <div class="layout-header-in">
            <Row>
              <Col span="8">
              <Alert style="float:left" type="success" show-icon>用户: {{userEmail}}</Alert>
              </Col>
              <Col span="8" offset="8">
              <Dropdown class="header-avatar" placement="bottom-end" @on-click="dropDownClick">
                <Dropdown-menu slot="list">
                  <Dropdown-item name="home">机构首页</Dropdown-item>
                  <Dropdown-item name="modify.passwd">修改密码</Dropdown-item>
                  <Dropdown-item name="logout">退出系统</Dropdown-item>
                </Dropdown-menu>
                <div class="avatar">
                  <img src="../logo.png">
                </div>
              </Dropdown>
              <span @click="goRouter('modify.passwd')">
              <Tooltip class="header-icon" content="修改密码" placement="bottom">
                <Icon type="ios-locked-outline" size="24" ></Icon>
              </Tooltip>
              </span>
              <span @click="goRouter('home')">
                <Tooltip class="header-icon" content="机构首页" placement="bottom">
                  <Icon type="ios-home-outline" size="24"></Icon>
                </Tooltip>
              </span>
              </Col>
            </Row>
          </div>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <h2 class="layout-title">#&ensp;{{title}}</h2>
            <router-view></router-view>
          </div>
        </div>
        <div class="layout-copy">
          粤ICP备16050337号-1 Copyright 2015-2025
        </div>
      </i-col>
    </Row>
    <Back-top ref="goTop"></Back-top>
  </div>
</template>
<script>
import Menus from './menus';
export default {
  data() {
      return {
        menuList: Menus || []
      }
    },
    computed: {
      title() {
        return this.$route.meta.title || 'UCORG';
      },
      userEmail() {
        return this.$store.getters.userEmail;
      },
      routeName() {
        return this.$route.name;
      },
      openNames() {
        return [this.$route.name ? this.$route.name.split('.')[0] : ['']];
      }
    },
    mounted() {

      // 如果cookie 不存在UserEmail, 则跳转到登录
      const uemail_ = this.$cookie.get('uemail') || '';
      this.$store.commit('userEmail', uemail_);
      if (!this.userEmail) {
        this.goRouter('login');
      }

      // 根据路由名称展开上级菜单 
      // 如:business.menbers 展开对应name="business" 的菜单
      setTimeout(() => {
        if (!this.$refs.mainManu) {
          return;
        }
        this.$nextTick(function() {
          this.$refs.mainManu.updateOpened()
        });
      }, 500);
    },
    methods: {
      dropDownClick(name) {
        if (name == 'logout') {
          this.logout();
        } else {
          this.goRouter(name);
        }
      },
      logout() { // 退出登录
        this.$apis.logout().then(res => {
          this.goRouter('login');
          this.$cookie.delete('uemail');
        });
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
.layout {
  background: #f5f7f9;
  position: relative;
}

.layout-title {
  padding: 5px 0 15px;
}

.layout-content {
  padding: 15px;
}

.layout-content-main {
  position: relative;
  padding: 15px;
  min-height: 200px;
  overflow: hidden;
  background: #fff;
}

.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}

.layout-menu-left {
  background: #1c2438;
}

.layout-menu-left .ivu-menu-dark {
  height: 100vh;
  background: none;
}

.layout-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.layout-header-in {
  padding: 15px;
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  text-align: center;
  font-size: 22px;
  margin: 15px auto;
}

.layout-ceiling-main a {
  color: #9ba7b5;
}

.layout-hide-text .layout-text {
  display: none;
}

.layout .ivu-col {
  transition: width .2s ease-in-out;
}

.header-icon,
.header-avatar {
  cursor: pointer;
  padding-left: 10px;
  float: right;
}

.header-icon {
  padding: 5px 10px;
}

.layout .avatar {
  cursor: pointer;
  display: block;
  width: 30px;
  height: 30px;
  overflow: hidden;
  background-color: #eee;
}

.layout .avatar img {
  width: 100%;
}


/* 图片 */

.img-long img {
  width: 100%;
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

.tableTools {
  position: relative;
  border-top: 3px solid #e9eaec;
  padding: 15px 0;
}

.tool-label {
  color: #495060;
  line-height: 30px;
}


/*model-list*/

.model-list {
  max-height: 250px;
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
</style>
