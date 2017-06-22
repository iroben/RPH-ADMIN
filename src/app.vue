<template>
  <div class="layout">
    <Row type="flex" style="height:100%">
      <i-col span="3" class="layout-menu-left">
        <div class="layout-logo-left">PRHousing</div>
        <Affix>
          <Menu theme="dark" width="auto" :active-name="$route.name" :open-names="openNames" @on-select="selectMenu" accordion ref="mainManu">
            <Menu-item name="housing.resource">
              <Icon type="ios-home"></Icon>
              房源管理
            </Menu-item>
            <Menu-item name="members">
              <Icon type="person-stalker"></Icon>
              人员管理
            </Menu-item>
            <Submenu name="business">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                业务管理
              </template>
              <Menu-item name="business.menbers">人员审核</Menu-item>
              <Menu-item name="business.repair">维修处理</Menu-item>
              <Menu-item name="business.renew">续租审批</Menu-item>
              <Menu-item name="business.checkout">退房审批</Menu-item>
              <Menu-item name="business.complaint">投诉建议</Menu-item>
            </Submenu>
            <Submenu name="system">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                系统管理
              </template>
              <Menu-item name="system.role">角色管理</Menu-item>
              <Menu-item name="system.user">用户管理</Menu-item>
              <Menu-item name="system.statistics">统计管理</Menu-item>
              <Menu-item name="system.msg">消息管理</Menu-item>
              <Menu-item name="system.lock">门锁管理</Menu-item>
            </Submenu>
          </Menu>
        </Affix>
      </i-col>
      <i-col span="21">
        <div class="layout-header">
          <div class="layout-header-in">
            <Row>
              <Col span="4">
              <div class="ivu-input-wrapper ivu-input-type" style="width: 200px;">
                <i class="ivu-icon ivu-icon-ios-search ivu-input-icon ivu-input-icon-normal" @click="search"></i>
                <input type="text" placeholder="请输入..." class="ivu-input" v-model="searchVal" @keyup.enter.prevent="search">
              </div>
              </Col>
              <Col span="8" offset="12">
              <Dropdown class="header-avatar" placement="bottom-end">
                <Dropdown-menu slot="list">
                  <Dropdown-item>我的消息</Dropdown-item>
                  <Dropdown-item>退出系统</Dropdown-item>
                  <Dropdown-item>退出系统</Dropdown-item>
                </Dropdown-menu>
                <div class="avatar">
                  <img src="../logo.png">
                </div>
              </Dropdown>
              <Tooltip class="header-icon" content="我的消息" placement="bottom">
                <Badge dot>
                  <Icon type="ios-bell-outline" size="24"></Icon>
                </Badge>
              </Tooltip>
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
          2011-2016 &copy; TalkingData
        </div>
      </i-col>
    </Row>
    <Back-top ref="goTop"></Back-top>
  </div>
</template>
<script>
export default {
  mounted() {
      // 根据路由名称展开上级菜单 如:business.menbers 展开对应name="business" 的菜单
      setTimeout(() => {
        this.$nextTick(function() {
          this.$refs.mainManu.updateOpened()
        });
      }, 500);
    },
    beforeDestroy() {

    },
    data() {
      return {
        searchVal: '',
        titleFixed: false
      }
    },
    computed: {
      title() {
        return this.$route.meta.title || 'PRHousing';
      },
      openNames() {
        return [this.$route.name ? this.$route.name.split('.')[0] : ['']];
      }
    },
    ruleValidate: {
      searchVal: [{
        required: true,
        message: '请输入内容',
        trigger: 'blur'
      }]
    },
    methods: {
      search() { // 搜索事件
        if (this.searchVal) {
          console.log('搜索:' + this.searchVal);
        }
      },
      fixedTitle(status) { // 固定顶部Title
        this.titleFixed = status;
      },
      goTop() { // 返回顶部
        this.$refs.goTop.back();
      },
      selectMenu(name) { // 选中菜单, 跳转到指定路由
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

.layout-breadcrumb {
  padding: 10px 15px 0;
}

.layout-title {
  padding: 5px 0 15px;
}

.layout-content {
  padding: 15px;
}

.layout-content-main {
  padding: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
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
  border-radius: 2px;
  overflow: hidden;
  background-color: #eee;
}

.layout .avatar img {
  width: 100%;
}

.page-bar {
  padding: 10px 0;
  height: 50px;
}

.page-bar-left {
  line-height: 30px;
  float: left;
}

.page-bar-right {
  float: right;
}
</style>
